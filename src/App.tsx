/**
 * المساعد الرقمي لمركز التعليم المستمر - التطبيق الرئيسي
 * Digital Assistant for Continuing Education Center
 * 
 * @license Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Sidebar, TabType } from './components/Sidebar';
import { DashboardTab } from './components/DashboardTab';
import { ActivitiesTab } from './components/ActivitiesTab';
import { LecturersTab } from './components/LecturersTab';
import { DocumentsTab } from './components/DocumentsTab';
import { TemplateTab } from './components/TemplateTab';
import { SendLogTab } from './components/SendLogTab';
import { SettingsTab } from './components/SettingsTab';
import { DateConflictModal } from './components/DateConflictModal';
import { AuthModal } from './components/AuthModal';

import { 
  Activity, 
  Lecturer, 
  Settings, 
  DocumentItem, 
  EmailTemplate, 
  SendLog, 
  NameAlias,
  DateConflictItem,
  UnmatchedLecturer 
} from './types';

import { 
  localStore, 
  getSupabaseClient 
} from './lib/supabase';

import { 
  normalizeArabic, 
  calculateSimilarity, 
  splitLecturerNames, 
  isDateReversed 
} from './lib/arabicUtils';

import { composeEmail } from './lib/emailComposer';

function MainApp() {
  const { isAuthenticated } = useAuth();

  // الحالة العامة للتطبيق
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [settings, setSettings] = useState<Settings>(localStore.getSettings);
  const [activities, setActivities] = useState<Activity[]>(localStore.getActivities);
  const [lecturers, setLecturers] = useState<Lecturer[]>(localStore.getLecturers);
  const [documents, setDocuments] = useState<DocumentItem[]>(localStore.getDocuments);
  const [template, setTemplate] = useState<EmailTemplate>(localStore.getTemplate);
  const [aliases, setAliases] = useState<NameAlias[]>(localStore.getAliases);
  const [sendLogs, setSendLogs] = useState<SendLog[]>(localStore.getSendLogs);

  const [isConflictModalOpen, setIsConflictModalOpen] = useState<boolean>(false);
  const [isSendingNow, setIsSendingNow] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showNotification = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // المزامنة مع التخزين المحلي عند التحديث
  useEffect(() => {
    localStore.setSettings(settings);
  }, [settings]);

  useEffect(() => {
    localStore.setActivities(activities);
  }, [activities]);

  useEffect(() => {
    localStore.setLecturers(lecturers);
  }, [lecturers]);

  useEffect(() => {
    localStore.setDocuments(documents);
  }, [documents]);

  useEffect(() => {
    localStore.setTemplate(template);
  }, [template]);

  useEffect(() => {
    localStore.setAliases(aliases);
  }, [aliases]);

  useEffect(() => {
    localStore.setSendLogs(sendLogs);
  }, [sendLogs]);

  // 1. حساب تعارضات التواريخ المعكوسة (Start Date > End Date)
  const dateConflicts = useMemo<DateConflictItem[]>(() => {
    const list: DateConflictItem[] = [];
    activities.forEach((act) => {
      if (isDateReversed(act.start_date, act.end_date)) {
        list.push({
          activityId: act.id,
          title: act.title,
          type: act.type,
          department: act.department,
          originalStart: act.start_date,
          originalEnd: act.end_date,
          correctedStart: act.end_date,
          correctedEnd: act.start_date,
        });
      }
    });
    return list;
  }, [activities]);

  // 2. خريطة الأسماء البديلة المحفوظة (Normalized Raw -> Lecturer ID)
  const aliasMap = useMemo(() => {
    const map = new Map<string, string>();
    aliases.forEach((a) => {
      map.set(normalizeArabic(a.raw_name), a.lecturer_id);
    });
    return map;
  }, [aliases]);

  // 3. حساب المحاضرين غير المطابقين (المستخرجين من الأنشطة ولا يوجد لهم بريد)
  const unmatchedLecturers = useMemo<UnmatchedLecturer[]>(() => {
    const unmatchedMap = new Map<string, UnmatchedLecturer>();

    activities.forEach((act) => {
      const names = splitLecturerNames(act.lecturers_raw);

      names.forEach((rawName) => {
        const normRaw = normalizeArabic(rawName);
        if (!normRaw) return;

        // فحص وجود تطابق مباشر أو بديل
        let matched = false;
        if (aliasMap.has(normRaw)) {
          const lecId = aliasMap.get(normRaw);
          if (lecturers.some((l) => l.id === lecId && l.email)) {
            matched = true;
          }
        }

        if (!matched) {
          const directLec = lecturers.find(
            (l) => l.normalized_name === normRaw || normalizeArabic(l.full_name) === normRaw
          );
          if (directLec && directLec.email) {
            matched = true;
          }
        }

        if (!matched && !unmatchedMap.has(normRaw)) {
          // حساب أفضل 3 اقتراحات تطابق تقريبي (Fuzzy Matching)
          const suggestions = lecturers
            .map((lec) => ({
              lecturer: lec,
              similarity: calculateSimilarity(rawName, lec.full_name),
            }))
            .filter((s) => s.similarity >= 35)
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 3);

          unmatchedMap.set(normRaw, {
            raw_name: rawName,
            normalized_raw: normRaw,
            activity_title: act.title,
            department: act.department,
            activity_id: act.id,
            suggestions,
          });
        }
      });
    });

    return Array.from(unmatchedMap.values());
  }, [activities, lecturers, aliasMap]);

  // معالجة تبديل التاريخين المعكوسين تلقائياً للكل
  const handleApplyAllSwaps = () => {
    setActivities((prev) =>
      prev.map((act) => {
        if (isDateReversed(act.start_date, act.end_date)) {
          return {
            ...act,
            start_date: act.end_date,
            end_date: act.start_date,
            date_fixed: true,
          };
        }
        return act;
      })
    );
    setIsConflictModalOpen(false);
    showNotification(`تم تصحيح وتبديل تواريخ ${dateConflicts.length} نشاط بنجاح مع اعتماد التاريخ الأقدم للبدء.`);
  };

  // معالجة تعديل تاريخ تعارض مفرد
  const handleUpdateConflict = (activityId: string, start: string, end: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === activityId) {
          return {
            ...act,
            start_date: start,
            end_date: end,
            date_fixed: true,
          };
        }
        return act;
      })
    );
    showNotification('تم تحديث تاريخ النشاط.');
  };

  // ربط وحفظ اسم بديل (Alias)
  const handleBindAlias = (rawName: string, lecturerId: string) => {
    const existingIndex = aliases.findIndex((a) => a.raw_name === rawName);
    if (existingIndex >= 0) {
      const updated = [...aliases];
      updated[existingIndex] = { raw_name: rawName, lecturer_id: lecturerId };
      setAliases(updated);
    } else {
      setAliases((prev) => [...prev, { raw_name: rawName, lecturer_id: lecturerId }]);
    }

    const lecturer = lecturers.find((l) => l.id === lecturerId);
    showNotification(`تم ربط «${rawName}» بالمحاضر «${lecturer?.full_name}» وحفظ الاسم البديل للمستقبل.`);
  };

  // استيراد الأنشطة من ملف Excel
  const handleImportActivities = (imported: Activity[], newConflicts: DateConflictItem[]) => {
    setActivities((prev) => {
      // دمج وتحديث السجلات الموجودة بدون تكرار
      const existingMap = new Map<string, Activity>();
      prev.forEach((a) => existingMap.set(`${a.type}-${a.title}-${a.start_date}`, a));

      imported.forEach((a) => {
        existingMap.set(`${a.type}-${a.title}-${a.start_date}`, a);
      });

      return Array.from(existingMap.values());
    });

    if (newConflicts.length > 0) {
      setIsConflictModalOpen(true);
    }
  };

  // استيراد المحاضرين من ملف Excel
  const handleImportLecturers = (imported: Lecturer[]) => {
    setLecturers((prev) => {
      const emailMap = new Map<string, Lecturer>();
      prev.forEach((l) => emailMap.set(l.email.toLowerCase(), l));
      imported.forEach((l) => emailMap.set(l.email.toLowerCase(), l));
      return Array.from(emailMap.values());
    });
  };

  // تنفيذ منطق الإرسال التلقائي أو الفوري
  const handleSendNow = async () => {
    setIsSendingNow(true);
    showNotification('جارٍ فحص الأنشطة المستحقة ومطابقة المحاضرين...', 'info');

    // تاريخ اليوم + تاريخ الاستحقاق
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + settings.days_before);
    const targetDateStr = targetDate.toISOString().split('T')[0];

    // استخراج الأنشطة التي تبدأ في هذا النطاق
    const eligibleActivities = activities.filter(
      (a) => a.start_date >= todayStr && a.start_date <= targetDateStr
    );

    let sent = 0;
    let failed = 0;
    let missingEmail = 0;
    let skipped = 0;

    const newLogs: SendLog[] = [];

    for (const act of eligibleActivities) {
      const names = splitLecturerNames(act.lecturers_raw);

      for (const rawName of names) {
        const normRaw = normalizeArabic(rawName);

        // البحث عن المحاضر
        let matchedLec = null;
        if (aliasMap.has(normRaw)) {
          matchedLec = lecturers.find((l) => l.id === aliasMap.get(normRaw));
        }
        if (!matchedLec) {
          matchedLec = lecturers.find(
            (l) => l.normalized_name === normRaw || normalizeArabic(l.full_name) === normRaw
          );
        }

        if (!matchedLec || !matchedLec.email) {
          missingEmail++;
          continue;
        }

        // فحص هل أُرسل سابقاً
        const alreadySent = sendLogs.some(
          (log) =>
            log.activity_id === act.id &&
            log.lecturer_id === matchedLec.id &&
            log.reminder_type === 'first' &&
            log.status === 'sent'
        );

        if (alreadySent) {
          skipped++;
          continue;
        }

        const others = names.filter((n) => n !== rawName);
        const emailData = composeEmail(act, matchedLec, others, settings, template, documents);

        // محاكاة الإرسال وتسجيل النجاح في send_log
        const logItem: SendLog = {
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          activity_id: act.id,
          activity_title: act.title,
          activity_type: act.type,
          lecturer_id: matchedLec.id,
          recipient_name: matchedLec.full_name,
          email: matchedLec.email,
          reminder_type: 'first',
          status: 'sent',
          attempts: 1,
          sent_at: new Date().toISOString(),
        };

        newLogs.push(logItem);
        sent++;
      }
    }

    if (newLogs.length > 0) {
      setSendLogs((prev) => [...newLogs, ...prev]);
    }

    setIsSendingNow(false);
    showNotification(
      `اكتمل الإرسال: تم إرسال ${sent} رسالة بنجاح، تخطي ${skipped} مكررة، ${missingEmail} بدون بريد.`
    );
  };

  // إرسال تجريبي إلى بريد مسؤول النظام
  const handleSendTestEmail = async (testEmail: string, testSubject: string, testHtml: string): Promise<boolean> => {
    // محاكاة إرسال بريد تجريبي وتسجيله
    const logItem: SendLog = {
      id: `log-test-${Date.now()}`,
      activity_id: activities[0]?.id || 'test-act',
      activity_title: 'إرسال تجريبي لمعاينة القالب',
      activity_type: 'course',
      recipient_name: 'مسؤول النظام (تجريبي)',
      email: testEmail,
      reminder_type: 'manual',
      status: 'sent',
      attempts: 1,
      sent_at: new Date().toISOString(),
    };

    setSendLogs((prev) => [logItem, ...prev]);
    return true;
  };

  // إعادة إرسال رسالة فاشلة
  const handleRetrySend = async (logId: string) => {
    const log = sendLogs.find((l) => l.id === logId);
    if (!log) return;

    // محاكاة إعادة الإرسال وتحديث الحالة إلى sent
    setSendLogs((prev) =>
      prev.map((item) => {
        if (item.id === logId) {
          return {
            ...item,
            status: 'sent',
            error: undefined,
            attempts: item.attempts + 1,
            sent_at: new Date().toISOString(),
          };
        }
        return item;
      })
    );

    showNotification(`تمت إعادة إرسال التذكير بنجاح إلى: ${log.recipient_name}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col font-['Cairo',sans-serif] text-[#1d1d1f]">
      
      {/* نافذة التحقق والمصادقة الإلزامية للمسؤول */}
      <AuthModal />

      {/* الترويسة الرئيسية */}
      <Header 
        settings={settings} 
        onSendNow={handleSendNow} 
        isSending={isSendingNow} 
      />

      {/* شريط الإشعارات المنبثقة */}
      {notification && (
        <div className="fixed bottom-5 left-5 z-50 animate-in slide-in-from-bottom-5">
          <div className={`px-4 py-3 rounded-2xl shadow-xl text-xs font-bold text-white flex items-center gap-2.5 ${
            notification.type === 'error' 
              ? 'bg-rose-600 shadow-rose-600/20' 
              : notification.type === 'info' 
              ? 'bg-slate-900' 
              : 'bg-gradient-to-r from-blue-950 to-blue-900 border border-blue-800/30 shadow-blue-950/20'
          }`}>
            <span>{notification.text}</span>
          </div>
        </div>
      )}

      {/* جسم الصفحة الرئيسي */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* القائمة الجانبية RTL */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          unmatchedCount={unmatchedLecturers.length}
          conflictsCount={dateConflicts.length}
        />

        {/* مساحة المحتوى للتبويب النشط */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <DashboardTab
              activities={activities}
              lecturers={lecturers}
              sendLogs={sendLogs}
              settings={settings}
              unmatchedCount={unmatchedLecturers.length}
              conflictsCount={dateConflicts.length}
              onNavigateToActivities={() => setCurrentTab('activities')}
              onNavigateToLecturers={() => setCurrentTab('lecturers')}
              onNavigateToLogs={() => setCurrentTab('logs')}
              onSendNow={handleSendNow}
              isSending={isSendingNow}
            />
          )}

          {currentTab === 'activities' && (
            <ActivitiesTab
              activities={activities}
              conflicts={dateConflicts}
              onImportActivities={handleImportActivities}
              onAddActivity={(act) => setActivities((prev) => [act, ...prev])}
              onUpdateActivity={(act) =>
                setActivities((prev) => prev.map((a) => (a.id === act.id ? act : a)))
              }
              onDeleteActivity={(id) =>
                setActivities((prev) => prev.filter((a) => a.id !== id))
              }
              onClearAllActivities={() => {
                setActivities([]);
                showNotification('تم حذف جميع النشاطات بنجاح.', 'info');
              }}
              onOpenConflicts={() => setIsConflictModalOpen(true)}
            />
          )}

          {currentTab === 'lecturers' && (
            <LecturersTab
              lecturers={lecturers}
              aliases={aliases}
              unmatchedLecturers={unmatchedLecturers}
              onImportLecturers={handleImportLecturers}
              onAddLecturer={(lec) => setLecturers((prev) => [lec, ...prev])}
              onUpdateLecturer={(lec) =>
                setLecturers((prev) => prev.map((l) => (l.id === lec.id ? lec : l)))
              }
              onDeleteLecturer={(id) =>
                setLecturers((prev) => prev.filter((l) => l.id !== id))
              }
              onBindAlias={handleBindAlias}
            />
          )}

          {currentTab === 'documents' && (
            <DocumentsTab
              documents={documents}
              onAddDocument={(doc) => setDocuments((prev) => [doc, ...prev])}
              onDeleteDocument={(id) =>
                setDocuments((prev) => prev.filter((d) => d.id !== id))
              }
            />
          )}

          {currentTab === 'template' && (
            <TemplateTab
              template={template}
              activities={activities}
              lecturers={lecturers}
              settings={settings}
              documents={documents}
              onSaveTemplate={(newTpl) => setTemplate(newTpl)}
              onSendTestEmail={handleSendTestEmail}
            />
          )}

          {currentTab === 'logs' && (
            <SendLogTab
              sendLogs={sendLogs}
              onRetrySend={handleRetrySend}
              isRetrying={false}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsTab
              settings={settings}
              onSaveSettings={(newSet) => setSettings(newSet)}
            />
          )}
        </main>

      </div>

      {/* نافذة مراجعة التواريخ المعكوسة */}
      <DateConflictModal
        isOpen={isConflictModalOpen}
        conflicts={dateConflicts}
        onClose={() => setIsConflictModalOpen(false)}
        onApplyAllSwaps={handleApplyAllSwaps}
        onUpdateConflict={handleUpdateConflict}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
