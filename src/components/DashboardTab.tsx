import React, { useMemo } from 'react';
import { 
  Calendar, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Users, 
  Clock, 
  AlertCircle,
  FileSpreadsheet,
  MailCheck,
  Bell,
  Sparkles,
  Bot
} from 'lucide-react';
import { Activity, SendLog, Settings } from '../types';
import { formatArabicDateWithDay } from '../lib/arabicUtils';

interface DashboardTabProps {
  activities: Activity[];
  sendLogs: SendLog[];
  settings: Settings;
  conflictsCount: number;
  onNavigateToActivities: () => void;
  onNavigateToLogs: () => void;
  onSendNow: () => void;
  isSending: boolean;
  onToggleWhatsApp?: () => void;
  onToggleEmail?: () => void;
  onToggleMessagingService?: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  activities,
  sendLogs,
  settings,
  conflictsCount,
  onNavigateToActivities,
  onNavigateToLogs,
  onSendNow,
  isSending,
  onToggleWhatsApp,
  onToggleEmail,
  onToggleMessagingService,
}) => {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  // حساب عدد المحاضرين المدمجين في الخطة
  const uniqueLecturersCount = useMemo(() => {
    const set = new Set<string>();
    activities.forEach((a) => {
      if (a.lecturer_name) set.add(a.lecturer_name.trim());
      else if (a.lecturers_raw) {
        a.lecturers_raw.split('/').forEach((n) => {
          const trimmed = n.trim();
          if (trimmed) set.add(trimmed);
        });
      }
    });
    return set.size;
  }, [activities]);

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
  const sentWhatsAppCount = sendLogs.filter((l) => l.whatsapp_status === 'sent' || l.channel === 'both' || l.channel === 'whatsapp').length;

  return (
    <div className="space-y-6">
      
      {/* بطاقة الترحيب والملخص السريع بنمط أبل الأزرق الداكن الملكي مع مجسم الروبوت الذكي */}
      <div className="bg-gradient-to-l from-slate-950 via-blue-950 to-blue-900 rounded-3xl text-white p-6 sm:p-8 shadow-xl shadow-blue-950/15 relative overflow-hidden border border-blue-800/30">
        {/* هالات الإضاءة الخلفية */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/25 text-sky-200 text-xs font-semibold mb-3 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>المساعد الآلي الذكي لنظام الأنشطة والتذكير</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              مرحباً بكم في المساعد الرقمي لمركز التعليم المستمر
            </h2>
            <p className="mt-2 text-blue-100/90 text-sm sm:text-base leading-relaxed font-normal">
              يقوم النظام بقراءة خطة الأنشطة والمحاضرين المدمجة، وإرسال التذكيرات والنماذج الرسمية آلياً عبر البريد الإلكتروني والواتساب في نفس الوقت قبل {settings.days_before} أيام من موعد كل نشاط في تمام الساعة 08:00 صباحاً بتوقيت بغداد.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* زر اتخاذ الإجراء الرئيسي CTA باللون الذهبي/البرتقالي الملكي */}
              <button
                onClick={onSendNow}
                disabled={isSending}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 active:scale-98 transition-all cursor-pointer disabled:opacity-75 border border-amber-400/40"
              >
                <Send className={`w-4 h-4 ${isSending ? 'animate-spin' : ''}`} />
                <span>{isSending ? 'جارٍ الفحص والإرسال المزدوج...' : 'فحص الأنشطة وإرسال التذكيرات الآن'}</span>
              </button>

              <button
                onClick={onNavigateToActivities}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-all border border-white/20 backdrop-blur-sm cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-sky-300" />
                <span>دليل الأنشطة والمحاضرين</span>
              </button>

              {/* مفتاح تفعيل/إيقاف خدمة الواتساب السريع في البانر */}
              {onToggleWhatsApp && (
                <button
                  onClick={onToggleWhatsApp}
                  type="button"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all backdrop-blur-md cursor-pointer border ${
                    settings.whatsapp_enabled
                      ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border-emerald-400/30'
                      : 'bg-white/10 hover:bg-white/20 text-slate-300 border-white/20'
                  }`}
                  title="التحكم في تفعيل أو إيقاف خدمة إرسال الواتساب المتزامنة"
                >
                  <span className={`w-2 h-2 rounded-full ${settings.whatsapp_enabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></span>
                  <span>خدمة الواتساب: {settings.whatsapp_enabled ? 'مفعّلة (بريد + واتساب) 💬' : 'معطّلة (بريد فقط) ⚪'}</span>
                </button>
              )}
            </div>
          </div>

          {/* لوحة ومجسم الروبوت الذكي بتصميم أنيق ومعبر */}
          <div className="shrink-0 relative group">
            {/* توهج هالة الروبوت */}
            <div className="absolute -inset-2 bg-gradient-to-r from-sky-500/30 via-blue-500/20 to-indigo-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />
            
            <div className="relative rounded-3xl p-3 bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-2xl backdrop-blur-md flex flex-col items-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border border-white/15 shadow-inner bg-slate-950/60 flex items-center justify-center">
                <img
                  src="/src/assets/images/robot_assistant_1790793745648.jpg"
                  alt="مساعد الروبوت الذكي لمركز التعليم المستمر"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* شارة حالة الروبوت العائمة أسفل الصورة */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-sky-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    روبوت التذكير
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    جاهز 24/7
                  </span>
                </div>
              </div>

              {/* عبارة مرافقة أسفل الروبوت بتنسيق جذاب */}
              <div className="mt-2.5 text-center px-1">
                <div className="text-xs font-bold text-slate-100 flex items-center justify-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-sky-400" />
                  <span>المساعد الذكي للأنشطة والمحاضرين</span>
                </div>
                <div className="text-[11px] text-blue-200/80 mt-0.5">
                  أتمتة الفحص والإرسال المتزامن
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* لوحة التحكم الشاملة بخدمات الإرسال (الخدمة العامة، البريد الإلكتروني، والواتساب) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-900" />
              <span>مركز التحكم في تشغيل وإيقاف خدمات الرسائل</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              يمكنك التحكم الفردي أو الكلي بتشغيل وإيقاف قنوات التذكير الآلية (البريد الإلكتروني والواتساب) في أي وقت بنقرة واحدة.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
              settings.messaging_service_active
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-rose-50 text-rose-800 border-rose-300'
            }`}>
              {settings.messaging_service_active ? '● نظام التذكيرات قيد العمل' : '○ نظام التذكيرات متوقف مؤقتاً'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* بطاقة 1: الخدمة العامة للرسائل والتذكيرات */}
          <div className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
            settings.messaging_service_active
              ? 'bg-slate-50/80 border-slate-200/90'
              : 'bg-rose-50/50 border-rose-200/80'
          }`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${
                  settings.messaging_service_active ? 'bg-blue-950 text-white' : 'bg-rose-200 text-rose-800'
                }`}>
                  🔔
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">خدمة الرسائل العامة</h4>
                  <span className={`text-[10px] font-bold ${settings.messaging_service_active ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {settings.messaging_service_active ? 'مفعّلة وشغالة' : 'متوقفة مؤقتاً'}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              المفتاح العام لكافة التذكيرات اليومية الساعة 08:00 صباحاً وإرسال الرسائل الفوري.
            </p>
            {onToggleMessagingService && (
              <button
                type="button"
                onClick={onToggleMessagingService}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs border text-center ${
                  settings.messaging_service_active
                    ? 'bg-white hover:bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white border-emerald-600'
                }`}
              >
                {settings.messaging_service_active ? 'إيقاف خدمة الرسائل مؤقتاً ⏸️' : 'تشغيل خدمة الرسائل الآن 🔔'}
              </button>
            )}
          </div>

          {/* بطاقة 2: خدمة رسائل البريد الإلكتروني */}
          <div className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
            settings.email_enabled
              ? 'bg-blue-50/40 border-blue-200/70'
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${
                  settings.email_enabled ? 'bg-blue-900 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                }`}>
                  📧
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">رسائل البريد الإلكتروني</h4>
                  <span className={`text-[10px] font-bold ${settings.email_enabled ? 'text-blue-800' : 'text-slate-500'}`}>
                    {settings.email_enabled ? 'مفعّلة - جاهزة للإرسال' : 'معطّلة حالياً'}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              إرسال خطابات التذكير الرسمية بتنسيق HTML الأكاديمي مع المرفقات إلى إيميل المحاضر.
            </p>
            {onToggleEmail && (
              <button
                type="button"
                onClick={onToggleEmail}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs border text-center ${
                  settings.email_enabled
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                    : 'bg-blue-900 hover:bg-blue-800 text-white border-blue-900'
                }`}
              >
                {settings.email_enabled ? 'إيقاف رسائل البريد ⚪' : 'تشغيل رسائل البريد 📧'}
              </button>
            )}
          </div>

          {/* بطاقة 3: خدمة رسائل الواتساب */}
          <div className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
            settings.whatsapp_enabled
              ? 'bg-emerald-50/50 border-emerald-200/80'
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${
                  settings.whatsapp_enabled ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                }`}>
                  💬
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">رسائل الواتساب</h4>
                  <span className={`text-[10px] font-bold ${settings.whatsapp_enabled ? 'text-emerald-800' : 'text-slate-500'}`}>
                    {settings.whatsapp_enabled ? 'مفعّلة - إرسال متزامن' : 'معطّلة حالياً'}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              إرسال تذكيرات فورية عبر رقم الواتساب لكل محاضر مع روابط المحاضرة والملفات بالتزامن.
            </p>
            {onToggleWhatsApp && (
              <button
                type="button"
                onClick={onToggleWhatsApp}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs border text-center ${
                  settings.whatsapp_enabled
                    ? 'bg-white hover:bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
                }`}
              >
                {settings.whatsapp_enabled ? 'إيقاف تفعيل الواتساب ⚪' : 'تفعيل خدمة الواتساب 💬'}
              </button>
            )}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        
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
            <span className="text-xs font-medium">البريد المرسل</span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100">
              <CheckCircle2 className="w-4 h-4 text-blue-700" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{sentLogsCount}</div>
          <div className="text-xs text-slate-500 mt-1">سجل التذكيرات الناجحة</div>
        </div>

        {/* رسائل الواتساب */}
        <div 
          onClick={onNavigateToLogs}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:border-emerald-300 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">رسائل واتساب</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
              <span className="text-xs">💬</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{sentWhatsAppCount}</div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">
            <span>{settings.whatsapp_enabled ? 'مفعلة وتُرسل بالتزامن' : 'معطلة'}</span>
          </div>
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

        {/* المحاضرون في الخطة */}
        <div 
          onClick={onNavigateToActivities}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">المحاضرون في الخطة</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
              <Users className="w-4 h-4 text-emerald-700" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{uniqueLecturersCount}</div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">
            <span>مدمجون ضمن دليل الأنشطة</span>
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
