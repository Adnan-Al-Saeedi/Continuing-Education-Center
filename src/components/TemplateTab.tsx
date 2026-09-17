import React, { useState, useMemo } from 'react';
import { 
  Mail, 
  Eye, 
  Send, 
  Code, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Save,
  CheckCircle2
} from 'lucide-react';
import { EmailTemplate, Activity, Lecturer, Settings, DocumentItem } from '../types';
import { composeEmail } from '../lib/emailComposer';
import { INITIAL_TEMPLATE } from '../lib/supabase';

interface TemplateTabProps {
  template: EmailTemplate;
  activities: Activity[];
  lecturers: Lecturer[];
  settings: Settings;
  documents: DocumentItem[];
  onSaveTemplate: (newTemplate: EmailTemplate) => void;
  onSendTestEmail: (testEmail: string, subject: string, bodyHtml: string) => Promise<boolean>;
}

export const TemplateTab: React.FC<TemplateTabProps> = ({
  template,
  activities,
  lecturers,
  settings,
  documents,
  onSaveTemplate,
  onSendTestEmail,
}) => {
  const [subject, setSubject] = useState(template.subject);
  const [bodyHtml, setBodyHtml] = useState(template.body_html);
  const [selectedActivityId, setSelectedActivityId] = useState<string>(activities[0]?.id || '');
  const [selectedLecturerId, setSelectedLecturerId] = useState<string>(lecturers[0]?.id || '');
  const [testEmailInput, setTestEmailInput] = useState(settings.admin_email || 'admin@atu.edu.iq');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // المتغيرات المدعومة في القالب
  const templateVariables = [
    { tag: '{{اسم_المحاضر}}', label: 'اسم المحاضر' },
    { tag: '{{اللقب}}', label: 'اللقب العلمي' },
    { tag: '{{نوع_النشاط}}', label: 'نوع النشاط (دورة / ورشة)' },
    { tag: '{{عنوان_النشاط}}', label: 'عنوان النشاط' },
    { tag: '{{القسم}}', label: 'القسم العلمي' },
    { tag: '{{تاريخ_البدء}}', label: 'تاريخ البدء' },
    { tag: '{{تاريخ_الانتهاء}}', label: 'تاريخ الانتهاء' },
    { tag: '{{يوم_البدء}}', label: 'يوم البدء (مثال: الأحد)' },
    { tag: '{{المكان}}', label: 'المكان / القاعة' },
    { tag: '{{الوقت}}', label: 'وقت البدء' },
    { tag: '{{المحاضرون_المشاركون}}', label: 'الزملاء المشاركون' },
    { tag: '{{اسم_الجامعة}}', label: 'اسم الجامعة' },
    { tag: '{{اسم_الكلية}}', label: 'اسم الكلية' },
    { tag: '{{قائمة_النماذج}}', label: 'قائمة النماذج والروابط' },
  ];

  // إدراج المتغير في مؤشر النص
  const insertVariable = (tag: string) => {
    setBodyHtml((prev) => prev + ` ${tag} `);
  };

  const handleSave = () => {
    onSaveTemplate({ subject, body_html: bodyHtml });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    if (confirm('هل تريد استعادة القالب الرسمي الافتراضي؟')) {
      setSubject(INITIAL_TEMPLATE.subject);
      setBodyHtml(INITIAL_TEMPLATE.body_html);
    }
  };

  // توليد المعاينة الحية على نشاط ومحاضر حقيقيين
  const previewData = useMemo(() => {
    const activity = activities.find((a) => a.id === selectedActivityId) || activities[0];
    const lecturer = lecturers.find((l) => l.id === selectedLecturerId) || lecturers[0];

    if (!activity || !lecturer) {
      return { subject: 'معاينة فارغة', html: '<p>يرجى إضافة نشاط ومحاضر للمعاينة</p>' };
    }

    const currentTemplate: EmailTemplate = { subject, body_html: bodyHtml };
    return composeEmail(
      activity,
      lecturer,
      ['م.م. سارة علي حسن'],
      settings,
      currentTemplate,
      documents
    );
  }, [activities, lecturers, selectedActivityId, selectedLecturerId, subject, bodyHtml, settings, documents]);

  const handleSendTest = async () => {
    if (!testEmailInput) return;
    setIsSendingTest(true);
    setTestResult(null);

    const success = await onSendTestEmail(testEmailInput, previewData.subject, previewData.html);
    setIsSendingTest(false);
    if (success) {
      setTestResult(`تم إرسال البريد التجريبي بنجاح إلى: ${testEmailInput}`);
    } else {
      setTestResult('حدث خطأ أثناء محاولة الإرسال التجريبي.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* الترويسة وأزرار الحفظ والاستعادة */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-900" />
            محرر قالب البريد الإلكتروني الأكاديمي
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            صياغة قالب HTML متوافق مع Gmail وOutlook والاتجاه من اليمين إلى اليسار (RTL).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetToDefault}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>الافتراضي</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 flex items-center gap-1.5 cursor-pointer border border-blue-800/30"
          >
            <Save className="w-4 h-4" />
            <span>{saveSuccess ? 'تم الحفظ!' : 'حفظ التعديلات'}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-900" />
          <span>تم حفظ قالب البريد الإلكتروني الجديد بنجاح وسيعتمد في جميع الإرسالات القادمة.</span>
        </div>
      )}

      {/* شريط المتغيرات القابلة للنقر */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4">
        <div className="text-xs font-bold text-slate-700 mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-900" />
          <span>انقر لإدراج المتغير التلقائي في القالب:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {templateVariables.map((v) => (
            <button
              key={v.tag}
              type="button"
              onClick={() => insertVariable(v.tag)}
              className="text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-900 hover:bg-blue-50 transition-colors cursor-pointer text-slate-700 font-mono"
              title={v.label}
            >
              {v.tag}
            </button>
          ))}
        </div>
      </div>

      {/* شبكة عمودين: المحرر والمعاينة الحية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* العمود الأول: المحرر */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              عنوان الرسالة (Subject)
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-slate-500" />
                <span>شفرة HTML للقالب</span>
              </label>
              <span className="text-[11px] text-slate-400">يدعم تنسيقات الجداول والأنماط المضمنة</span>
            </div>
            <textarea
              rows={18}
              value={bodyHtml}
              onChange={(e) => setBodyHtml(e.target.value)}
              className="w-full text-xs font-mono border border-slate-300 rounded-xl p-3 bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 leading-relaxed dir-ltr"
              spellCheck={false}
            />
          </div>
        </div>

        {/* العمود الثاني: المعاينة الحية والإرسال التجريبي */}
        <div className="space-y-4">
          
          {/* محدد بيانات المعاينة والإرسال التجريبي */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-900" />
                معاينة حية على بيانات حقيقية
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-500 text-[11px] mb-1">اختر النشاط للمعاينة:</label>
                <select
                  value={selectedActivityId}
                  onChange={(e) => setSelectedActivityId(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-1.5 bg-slate-50"
                >
                  {activities.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.type === 'course' ? 'دورة' : 'ورشة'}: {a.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 text-[11px] mb-1">اختر المحاضر للمعاينة:</label>
                <select
                  value={selectedLecturerId}
                  onChange={(e) => setSelectedLecturerId(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-1.5 bg-slate-50"
                >
                  {lecturers.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.full_name} ({l.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* صندوق الإرسال التجريبي */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <input
                type="email"
                placeholder="بريد المسؤول التجريبي..."
                value={testEmailInput}
                onChange={(e) => setTestEmailInput(e.target.value)}
                className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 font-mono"
              />
              <button
                type="button"
                onClick={handleSendTest}
                disabled={isSendingTest}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0 border border-blue-800/30"
              >
                <Send className={`w-3.5 h-3.5 ${isSendingTest ? 'animate-spin' : ''}`} />
                <span>{isSendingTest ? 'جارٍ الإرسال...' : 'إرسال تجريبي'}</span>
              </button>
            </div>

            {testResult && (
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 text-xs font-medium">
                {testResult}
              </div>
            )}
          </div>

          {/* شاشة العرض النهائية للرسالة */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="bg-slate-100 border-b border-slate-200 p-3 text-xs">
              <div className="text-slate-500">
                الموضوع المعاين:{' '}
                <span className="font-bold text-slate-900">{previewData.subject}</span>
              </div>
            </div>

            <div className="p-4 max-h-[500px] overflow-y-auto bg-slate-50/50">
              <div
                className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white"
                dangerouslySetInnerHTML={{ __html: previewData.html }}
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
