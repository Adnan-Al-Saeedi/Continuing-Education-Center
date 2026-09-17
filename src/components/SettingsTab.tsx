import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  Database, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ShieldCheck, 
  FileCode,
  Sliders,
  Mail
} from 'lucide-react';
import { Settings } from '../types';
import { saveSupabaseConfig, testSupabaseConnection } from '../lib/supabase';

interface SettingsTabProps {
  settings: Settings;
  onSaveSettings: (newSettings: Settings) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState<Settings>(settings);
  const [supabaseUrl, setSupabaseUrl] = useState<string>(
    localStorage.getItem('app_supabase_url') || import.meta.env.VITE_SUPABASE_URL || ''
  );
  const [supabaseKey, setSupabaseKey] = useState<string>(
    localStorage.getItem('app_supabase_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  );

  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof Settings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    if (supabaseUrl && supabaseKey) {
      saveSupabaseConfig(supabaseUrl, supabaseKey);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleTestConnection = async () => {
    if (!supabaseUrl || !supabaseKey) {
      setTestResult({ success: false, message: 'يرجى إدخال عنوان URL ومفتاح Anon Key الخاص بـ Supabase أولاً.' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);
    const result = await testSupabaseConnection(supabaseUrl, supabaseKey);
    setTestResult(result);
    setIsTesting(false);
  };

  return (
    <div className="space-y-6">
      
      {/* الترويسة */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-blue-900" />
            الإعدادات العامة والربط التقني
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            تخصيص هوية المؤسسة الأكاديمية وضبط توقيت التذكيرات ومعلومات الاتصال بقاعدة البيانات.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 flex items-center gap-2 cursor-pointer shrink-0 border border-blue-800/30"
        >
          <Save className="w-4 h-4" />
          <span>{saveSuccess ? 'تم حفظ التغييرات!' : 'حفظ جميع الإعدادات'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-900" />
          <span>تم حفظ كافة الإعدادات بنجاح في قاعدة البيانات والتخزين المحلي.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. هوية المؤسسة والكلية والمركز */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
            <Sliders className="w-4 h-4 text-blue-900" />
            هوية المؤسسة والمركز (تظهر في الترويسة وقالب البريد)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">اسم الجامعة *</label>
              <input
                type="text"
                value={formData.university_name}
                onChange={(e) => handleChange('university_name', e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">اسم الكلية / المعهد *</label>
              <input
                type="text"
                value={formData.college_name}
                onChange={(e) => handleChange('college_name', e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">اسم المركز *</label>
              <input
                type="text"
                value={formData.center_name}
                onChange={(e) => handleChange('center_name', e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">رابط الشعار (Logo URL)</label>
              <input
                type="url"
                value={formData.logo_url || ''}
                onChange={(e) => handleChange('logo_url', e.target.value)}
                placeholder="https://.../logo.png"
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">بريد استلام تقرير الملخص اليومي (Admin Email)</label>
              <input
                type="email"
                value={formData.admin_email || ''}
                onChange={(e) => handleChange('admin_email', e.target.value)}
                placeholder="admin@atu.edu.iq"
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* 2. إعدادات الإرسال ومواعيد التذكير */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
            <Mail className="w-4 h-4 text-blue-900" />
            إعدادات التذكير والبريد الصادر
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">اسم المرسل (Sender Name) *</label>
              <input
                type="text"
                value={formData.sender_name}
                onChange={(e) => handleChange('sender_name', e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">البريد لاستقبال الردود (Reply-To) *</label>
              <input
                type="email"
                value={formData.reply_to}
                onChange={(e) => handleChange('reply_to', e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                عدد الأيام قبل بدء النشاط للتذكير الأول *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={formData.days_before}
                  onChange={(e) => handleChange('days_before', parseInt(e.target.value, 10) || 7)}
                  required
                  className="w-28 border border-slate-300 rounded-xl p-2.5 bg-white font-mono font-bold focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <span className="text-slate-500">أيام قبل النشاط (افتراضياً: 7 أيام)</span>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                تفعيل تذكير ثانٍ إضافي قبل يوم واحد
              </label>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="second_reminder_chk"
                  checked={formData.second_reminder}
                  onChange={(e) => handleChange('second_reminder', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-900 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="second_reminder_chk" className="text-xs text-slate-700 cursor-pointer font-medium">
                  إرسال تذكير ثانٍ للمحاضر قبل يوم واحد (24 ساعة) من بدء النشاط
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 3. إعدادات قاعدة بيانات Supabase */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-900" />
              ربط قاعدة بيانات Supabase (للمزامنة السحابية الدائمة)
            </h4>
            <span className="text-[11px] text-slate-400">الخطة المجانية Free Tier</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            لربط التطبيق بمشروع Supabase الخاص بك، أنشئ مشروعاً جديداً في Supabase، ثم شغّل ملف <code className="bg-blue-50 px-1.5 py-0.5 rounded text-blue-900 font-mono">supabase/schema.sql</code> في SQL Editor، ثم الصق مفاتيح المشروع أدناه:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Project URL (VITE_SUPABASE_URL)
              </label>
              <input
                type="url"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://xxxxxxxxxxxx.supabase.co"
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Anon Public Key (VITE_SUPABASE_ANON_KEY)
              </label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 flex items-center gap-2 cursor-pointer disabled:opacity-50 border border-blue-800/30"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'جارٍ التحقق...' : 'اختبار الاتصال بـ Supabase'}</span>
            </button>
          </div>

          {testResult && (
            <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              testResult.success ? 'bg-blue-50 text-blue-900 border border-blue-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-900" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
              <span>{testResult.message}</span>
            </div>
          )}
        </div>

        {/* تنويه عن GitHub Secrets */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 text-xs text-slate-700 space-y-2">
          <h4 className="font-bold flex items-center gap-2 text-slate-900">
            <ShieldCheck className="w-4 h-4 text-blue-900" />
            تأمين بيانات الاعتماد ومفاتيح SMTP في GitHub Secrets
          </h4>
          <p className="leading-relaxed text-slate-600">
            وفق الضوابط الأمنية الصارمة، لا يتم تضمين كلمات مرور البريد SMTP أو مفتاح <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">service_role</code> في شيفرة الواجهة المنشورة. يتم حفظها في إعدادات المستودع في GitHub عبر:
            <br />
            <strong>Settings ➡️ Secrets and variables ➡️ Actions</strong>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] pt-1">
            <span className="p-1.5 bg-white border border-slate-200 rounded">SUPABASE_URL</span>
            <span className="p-1.5 bg-white border border-slate-200 rounded">SUPABASE_SERVICE_ROLE_KEY</span>
            <span className="p-1.5 bg-white border border-slate-200 rounded">SMTP_HOST</span>
            <span className="p-1.5 bg-white border border-slate-200 rounded">SMTP_PORT</span>
            <span className="p-1.5 bg-white border border-slate-200 rounded">SMTP_USER</span>
            <span className="p-1.5 bg-white border border-slate-200 rounded">SMTP_PASS</span>
          </div>
        </div>

      </form>
    </div>
  );
};
