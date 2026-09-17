import React from 'react';
import { 
  Calendar, 
  Send, 
  CheckCircle2, 
  XCircle, 
  UserX, 
  ArrowUpRight, 
  Clock, 
  AlertCircle,
  FileSpreadsheet,
  MailCheck
} from 'lucide-react';
import { Activity, Lecturer, SendLog, Settings } from '../types';
import { formatArabicDateWithDay } from '../lib/arabicUtils';

interface DashboardTabProps {
  activities: Activity[];
  lecturers: Lecturer[];
  sendLogs: SendLog[];
  settings: Settings;
  unmatchedCount: number;
  conflictsCount: number;
  onNavigateToActivities: () => void;
  onNavigateToLecturers: () => void;
  onNavigateToLogs: () => void;
  onSendNow: () => void;
  isSending: boolean;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  activities,
  lecturers,
  sendLogs,
  settings,
  unmatchedCount,
  conflictsCount,
  onNavigateToActivities,
  onNavigateToLecturers,
  onNavigateToLogs,
  onSendNow,
  isSending,
}) => {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  // حساب الأنشطة لهذا الأسبوع (خلال 7 أيام)
  const in7Days = new Date();
  in7Days.setDate(in7Days.getDate() + 7);
  const in7DaysStr = in7Days.toISOString().split('T')[0];

  // حساب الأنشطة للأسبوع القادم (من 8 إلى 14 يوم)
  const in14Days = new Date();
  in14Days.setDate(in14Days.getDate() + 14);
  const in14DaysStr = in14Days.toISOString().split('T')[0];

  const thisWeekActivities = activities.filter(
    (a) => a.start_date >= todayStr && a.start_date <= in7DaysStr
  );

  const nextWeekActivities = activities.filter(
    (a) => a.start_date > in7DaysStr && a.start_date <= in14DaysStr
  );

  const sentLogsCount = sendLogs.filter((l) => l.status === 'sent').length;
  const failedLogsCount = sendLogs.filter((l) => l.status === 'failed').length;

  return (
    <div className="space-y-6">
      
      {/* بطاقة الترحيب والملخص السريع بنمط أبل الأزرق الداكن الملكي */}
      <div className="bg-gradient-to-l from-slate-950 via-blue-950 to-blue-900 rounded-3xl text-white p-6 sm:p-8 shadow-xl shadow-blue-950/15 relative overflow-hidden border border-blue-800/30">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-xs font-semibold mb-3 border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
            <span>مساعد أوتوماتيكي مدعوم بـ GitHub Actions & Supabase</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            مرحباً بكم في المساعد الرقمي لمركز التعليم المستمر
          </h2>
          <p className="mt-2 text-blue-100/90 text-sm sm:text-base leading-relaxed font-normal">
            يقوم النظام بمطابقة دليل الأنشطة مع دليل البريد الإلكتروني للمحاضرين، وإرسال التذكيرات والنماذج الرسمية المطلوبة آلياً قبل {settings.days_before} أيام من بدء كل نشاط في تمام الساعة 08:00 صباحاً بتوقيت بغداد.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* زر اتخاذ الإجراء الرئيسي CTA باللون الذهبي/البرتقالي الملكي */}
            <button
              onClick={onSendNow}
              disabled={isSending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 active:scale-98 transition-all cursor-pointer disabled:opacity-75 border border-amber-400/40"
            >
              <Send className={`w-4 h-4 ${isSending ? 'animate-spin' : ''}`} />
              <span>{isSending ? 'جارٍ الفحص والإرسال...' : 'فحص الأنشطة وإرسال التذكيرات الآن'}</span>
            </button>

            <button
              onClick={onNavigateToActivities}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-all border border-white/20 backdrop-blur-sm cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-sky-300" />
              <span>استيراد دليل الأنشطة Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* تنبيه بالتعارضات في التواريخ إن وجدت */}
      {conflictsCount > 0 && (
        <div className="bg-amber-50/90 border border-amber-300/90 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                تنبيه: تم اكتشاف {conflictsCount} نشاط بتواريخ معكوسة (تاريخ البدء بعد تاريخ الانتهاء)
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                يمكنك مراجعة هذه الحالات واعتماد التاريخ الأقدم للبدء أو تعديلها يدوياً.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToActivities}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs font-bold hover:from-amber-500 hover:to-amber-600 transition-all shrink-0 cursor-pointer shadow-xs"
          >
            مراجعة التواريخ
          </button>
        </div>
      )}

      {/* شبكة الإحصائيات الرقمية (KPIs) بنمط أبل */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* نشاطات هذا الأسبوع */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">نشاطات هذا الأسبوع</span>
            <div className="p-2 bg-blue-50 text-blue-900 rounded-xl border border-blue-100">
              <Calendar className="w-4 h-4 text-blue-700" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{thisWeekActivities.length}</div>
          <div className="text-xs text-blue-800 mt-1 flex items-center gap-1 font-semibold">
            <span>مستحقة للإرسال حالياً</span>
          </div>
        </div>

        {/* نشاطات الأسبوع القادم */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">نشاطات الأسبوع القادم</span>
            <div className="p-2 bg-sky-50 text-sky-700 rounded-xl border border-sky-100">
              <Clock className="w-4 h-4 text-sky-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{nextWeekActivities.length}</div>
          <div className="text-xs text-slate-500 mt-1">خلال 8-14 يوماً</div>
        </div>

        {/* الرسائل المرسلة */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">الرسائل المرسلة</span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100">
              <CheckCircle2 className="w-4 h-4 text-blue-700" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{sentLogsCount}</div>
          <div className="text-xs text-slate-500 mt-1">سجل التذكيرات الناجحة</div>
        </div>

        {/* الرسائل الفاشلة */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">الرسائل الفاشلة</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{failedLogsCount}</div>
          <div className="text-xs text-slate-500 mt-1">تحتاج إلى إعادة محاولة</div>
        </div>

        {/* محاضرون بلا بريد */}
        <div 
          onClick={onNavigateToLecturers}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:border-rose-300 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">محاضرون بلا بريد</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
              <UserX className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600 tracking-tight">{unmatchedCount}</div>
          <div className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-0.5">
            <span>انقر للمطابقة الذكية</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

      </div>

      {/* قسمان: جدول النشاطات القادمة + آخر التذكيرات المرسلة */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* النشاطات المستحقة والقادمة */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-900" />
              <h3 className="font-bold text-slate-900 text-sm">
                النشاطات المستحقة والقادمة (الجدول الزمني)
              </h3>
            </div>
            <button
              onClick={onNavigateToActivities}
              className="text-xs text-blue-800 font-bold hover:text-blue-950 transition-colors cursor-pointer"
            >
              عرض كامل الدليل ({activities.length})
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {activities.slice(0, 5).map((act) => {
              const isDue = act.start_date <= in7DaysStr && act.start_date >= todayStr;
              return (
                <div key={act.id} className="p-4 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        act.type === 'course' ? 'bg-blue-50 text-blue-900 border border-blue-200/60' : 'bg-sky-50 text-sky-800 border border-sky-200/60'
                      }`}>
                        {act.type === 'course' ? 'دورة تدريبية' : 'ورشة عمل'}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{act.department}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {act.title}
                    </h4>
                    <div className="text-xs text-slate-600">
                      المحاضر: <span className="font-medium text-slate-800">{act.lecturers_raw}</span>
                    </div>
                  </div>

                  <div className="text-left shrink-0">
                    <div className="text-xs font-semibold text-slate-700">
                      {formatArabicDateWithDay(act.start_date)}
                    </div>
                    {isDue && (
                      <span className="inline-block mt-1 text-[11px] font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
                        مستحق الإرسال
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {activities.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-sm">
                لا توجد نشاطات مسجلة حالياً. يرجى استيراد دليل الأنشطة من ملف Excel.
              </div>
            )}
          </div>
        </div>

        {/* آخر عمليات الإرسال */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <MailCheck className="w-4 h-4 text-blue-900" />
              <h3 className="font-bold text-slate-900 text-sm">
                آخر عمليات الإرسال
              </h3>
            </div>
            <button
              onClick={onNavigateToLogs}
              className="text-xs text-blue-800 font-bold hover:text-blue-950 transition-colors cursor-pointer"
            >
              عرض السجل
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {sendLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-3.5 hover:bg-slate-50/70 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">{log.recipient_name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    log.status === 'sent' ? 'bg-blue-50 text-blue-900 border border-blue-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                  }`}>
                    {log.status === 'sent' ? 'تم الإرسال' : 'فشل'}
                  </span>
                </div>
                <div className="text-xs text-slate-500 truncate" title={log.activity_title}>
                  {log.activity_title}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {new Date(log.sent_at).toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}

            {sendLogs.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                لم يتم إرسال أي تذكيرات بعد.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
