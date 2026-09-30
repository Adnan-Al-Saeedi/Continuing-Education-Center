import React, { useState, useRef } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ShieldCheck, 
  FileCode,
  Sliders,
  Mail,
  Globe,
  Sparkles,
  Link as LinkIcon,
  Bell,
  Upload,
  Image as ImageIcon,
  Trash2,
  X
} from 'lucide-react';
import { Settings } from '../types';

interface SettingsTabProps {
  settings: Settings;
  onSaveSettings: (newSettings: Settings) => void;
  onReloadPolytechnic?: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  onSaveSettings,
  onReloadPolytechnic,
}) => {
  const [formData, setFormData] = useState<Settings>(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);

  const handleLogoFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setLogoError('يرجى اختيار ملف صورة صالح (PNG, JPG, JPEG, SVG, WebP)');
      return;
    }
    setLogoError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return;

      // For SVG or small files (< 120KB), keep as-is
      if (file.type === 'image/svg+xml' || file.size < 120000) {
        handleChange('logo_url', result);
        return;
      }

      // Optimize/scale down image if larger to ensure fast performance & fitting cleanly in localStorage
      const img = new Image();
      img.onload = () => {
        const maxDim = 400; // 400px is optimal for crisp university logo badges
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimized = canvas.toDataURL('image/png', 0.92);
          handleChange('logo_url', optimized);
        } else {
          handleChange('logo_url', result);
        }
      };
      img.onerror = () => {
        handleChange('logo_url', result);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleLogoFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingLogo(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleLogoFileUpload(file);
    }
  };

  const handleRemoveLogo = () => {
    handleChange('logo_url', '');
    setLogoError(null);
    if (logoFileInputRef.current) {
      logoFileInputRef.current.value = '';
    }
  };

  const handleChange = (field: keyof Settings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* الترويسة */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-blue-900" />
            الإعدادات العامة وهوية المؤسسة
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            تخصيص هوية المؤسسة الأكاديمية وتحميل الشعار وتوقيت التذكيرات الآلية.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onReloadPolytechnic && (
            <button
              type="button"
              onClick={onReloadPolytechnic}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              title="استعادة بيانات وإعدادات كلية البوليتكنك - بابل الرسمية"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-900" />
              <span>استعادة بيانات كلية البوليتكنك (2026-2027)</span>
            </button>
          )}

          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 flex items-center gap-2 cursor-pointer shrink-0 border border-blue-800/30"
          >
            <Save className="w-4 h-4" />
            <span>{saveSuccess ? 'تم حفظ التغييرات!' : 'حفظ جميع الإعدادات'}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-950 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-900" />
          <span>تم حفظ كافة الإعدادات بنجاح في قاعدة البيانات والتخزين المحلي.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. هوية المؤسسة والكلية والمركز */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
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
              <label className="block text-slate-700 font-semibold mb-1">اسم الشعبة / المركز *</label>
              <input
                type="text"
                value={formData.center_name}
                onChange={(e) => handleChange('center_name', e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-slate-800 font-bold text-xs">
                  شعار الكلية / المركز (تحميل صورة الشعار)
                </label>
                <span className="text-[11px] text-slate-400">
                  يظهر في الترويسة العليا وفي رسائل التذكير
                </span>
              </div>
              
              {/* مدخل ملف الصورة المخفي */}
              <input 
                type="file"
                ref={logoFileInputRef}
                onChange={handleFileChange}
                accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                className="hidden"
              />

              {formData.logo_url ? (
                /* بطاقة معاينة الشعار المحمّل */
                <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center p-1.5 overflow-hidden shrink-0">
                      <img 
                        src={formData.logo_url} 
                        alt="معاينة الشعار" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>تم تحميل صورة الشعار بنجاح</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        صورة الشعار مفعلة وجاهزة وتظهر فوراً في ترويسة التطبيق والتقارير.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => logoFileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200/80 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>تغيير صورة الشعار</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all cursor-pointer"
                      title="حذف الشعار"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* منطقة السحب والإفلات لاختيار الشعار */
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDraggingLogo(true); }}
                  onDragLeave={() => setIsDraggingLogo(false)}
                  onDrop={handleDrop}
                  onClick={() => logoFileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDraggingLogo 
                      ? 'border-blue-600 bg-blue-50/70 scale-[1.01]' 
                      : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50/70 bg-white'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-900 mb-2 shadow-2xs">
                    <Upload className="w-6 h-6 text-blue-900" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    انقر هنا لاختيار صورة الشعار من جهازك، أو اسحب الصورة وأفلتها هنا
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    صيغ الصور المدعومة: PNG, JPG, JPEG, SVG, WebP (يتم التحجيم والضبط التلقائي)
                  </div>
                </div>
              )}

              {logoError && (
                <div className="mt-2 text-xs text-rose-600 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{logoError}</span>
                </div>
              )}

              {/* خيار إضافي مرن لإدخال رابط يدوي عند الحاجة */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowManualUrl(!showManualUrl)}
                  className="text-[11px] text-slate-500 hover:text-blue-700 font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>{showManualUrl ? 'إخفاء خيار الرابط الخارجي' : 'أو إدخال رابط الشعار يدوياً (Logo URL)'}</span>
                </button>
                {showManualUrl && (
                  <div className="mt-2">
                    <input
                      type="url"
                      value={formData.logo_url || ''}
                      onChange={(e) => handleChange('logo_url', e.target.value)}
                      placeholder="https://.../logo.png"
                      className="w-full border border-slate-300 rounded-xl p-2 text-xs bg-white font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1 text-xs">
                بريد استلام تقرير الملخص اليومي (Admin Email)
              </label>
              <input
                type="email"
                value={formData.admin_email || ''}
                onChange={(e) => handleChange('admin_email', e.target.value)}
                placeholder="adn.ak21@atu.edu.iq"
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-mono text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* 3. إعدادات الإرسال ومفاتيح تفعيل وتعطيل الخدمات */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-900" />
                الخدمة العامة للرسائل والتذكيرات الآلية
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                المفتاح الرئيسي لتشغيل أو إيقاف التذكيرات التلقائية الصباحية وفحص الأنشطة المستحقة.
              </p>
            </div>

            {/* مفتاح الخدمة العامة بنمط أبل */}
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.messaging_service_active}
                onChange={(e) => handleChange('messaging_service_active', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className="ms-3 text-xs font-bold text-slate-800">
                {formData.messaging_service_active ? 'مفعّلة 🔔' : 'متوقفة ⏸️'}
              </span>
            </label>
          </div>

          {/* مفتاح خدمة البريد الإلكتروني المستقل */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-blue-50/40 border border-blue-200/60 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center text-sm">
                📧
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">خدمة رسائل البريد الإلكتروني</h5>
                <p className="text-[11px] text-slate-500">إرسال خطابات التذكير الرسمية والمرفقات إلى البريد الإلكتروني للمحاضرين.</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.email_enabled}
                onChange={(e) => handleChange('email_enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-xs font-bold text-slate-800">
                {formData.email_enabled ? 'مفعّلة 📧' : 'معطّلة ⚪'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
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

        {/* 4. خدمة إرسال التذكيرات عبر واتساب (WhatsApp Messaging) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                خدمة الإرسال عبر واتساب (WhatsApp Messaging)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                إرسال رسائل التذكير والمرفقات إلى رقم هاتف المحاضر عبر واتساب بالتزامن مع إرسال البريد الإلكتروني.
              </p>
            </div>

            {/* مفتاح التفعيل / الإيقاف الرئيسي لواتساب بنمط أبل */}
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.whatsapp_enabled}
                onChange={(e) => handleChange('whatsapp_enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className="ms-3 text-xs font-bold text-slate-800">
                {formData.whatsapp_enabled ? 'مفعّلة 💬' : 'معطّلة ⚪'}
              </span>
            </label>
          </div>

          {formData.whatsapp_enabled ? (
            <div className="space-y-4 pt-1 animate-in fade-in">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>الخدمة مفعّلة: سيتم إرسال رسائل التذكير الأكاديمية إلى أرقام هواتف المحاضرين عبر واتساب بالتزامن مع البريد الإلكتروني.</span>
              </div>

              {/* نمط الإرسال */}
              <div className="text-xs space-y-2">
                <label className="block text-slate-700 font-semibold">نمط إرسال الواتساب</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => handleChange('whatsapp_mode', 'direct')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      (formData.whatsapp_mode || 'direct') === 'direct'
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>واتساب المباشر (Direct WhatsApp Web / App)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      توليد روابط محادثة واتساب الرسمية (wa.me) معبأة مسبقاً بالنص والمرفقات للأرقام المعتمدة مع إمكانية الإرسال الفوري بنقرة زر واحدة دون الحاجة لاشتراكات أو بوابات مدفوعة.
                    </p>
                  </div>

                  <div
                    onClick={() => handleChange('whatsapp_mode', 'api')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.whatsapp_mode === 'api'
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>بوابة WhatsApp Cloud API (أتمتة سحابية)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      ربط بوابة API مخصصة (مثل Meta Cloud API أو UltraMsg أو Twilio) للإرسال التلقائي عبر السيرفر دون تدخل بشري.
                    </p>
                  </div>
                </div>
              </div>

              {formData.whatsapp_mode === 'api' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">عنوان بوابة API (Webhook / URL)</label>
                    <input
                      type="url"
                      value={formData.whatsapp_api_url || ''}
                      onChange={(e) => handleChange('whatsapp_api_url', e.target.value)}
                      placeholder="https://api.ultramsg.com/instance... أو Meta API"
                      className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">مفتاح المصادقة (API Token / Key)</label>
                    <input
                      type="password"
                      value={formData.whatsapp_api_token || ''}
                      onChange={(e) => handleChange('whatsapp_api_token', e.target.value)}
                      placeholder="Token..."
                      className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* معاينة شكل رسالة الواتساب */}
              <div className="pt-2">
                <label className="block text-slate-700 font-semibold text-xs mb-2">
                  معاينة نموذج رسالة الواتساب الأكاديمية الرسمية:
                </label>
                <div className="p-4 bg-emerald-950/5 border border-emerald-200/80 rounded-2xl text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-line max-w-lg shadow-inner">
                  {`السلام عليكم ورحمة الله وبركاته،
تحية طيبة سعادة *م.د. محمد نوري سعيد* المحترم،

نود تذكيركم بموعد إقامة *الدورة التدريبية*:
📌 *«تطبيقات الذكاء الاصطناعي التوليدي في التعليم الجامعي»*

🏛️ *القسم العلمي:* قسم تقنيات الحاسوب ونظم المعلومات
📅 *تاريخ البدء:* 2026/10/18
⏳ *تاريخ الانتهاء:* 2026/10/22
📍 *المكان:* مختبر الذكاء الاصطناعي والحوسبة السحابية
⏰ *الوقت:* 10:00 صباحاً

📋 *النماذج والوثائق المطلوبة:*
1. *استمارة الأمر الإداري*: https://drive.google.com/...

مع التقدير والاعتزاز،
*${formData.sender_name || formData.center_name}*
_${formData.college_name} - ${formData.university_name}_`}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500">
              خدمة الواتساب معطلة حالياً. عند إرسال التذكيرات، سيتم الإرسال عبر البريد الإلكتروني فقط. قم بتفعيل المفتاح أعلاه لإرسال الإشعارات عبر واتساب والبريد معاً في نفس الوقت.
            </div>
          )}
        </div>

        {/* تنويه عن GitHub Secrets */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-5 text-xs text-slate-700 space-y-2">
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
            <span className="p-1.5 bg-white border border-slate-200 rounded-lg">SUPABASE_URL</span>
            <span className="p-1.5 bg-white border border-slate-200 rounded-lg">SUPABASE_SERVICE_ROLE_KEY</span>
            <span className="p-1.5 bg-white border border-slate-200 rounded-lg">SMTP_HOST</span>
            <span className="p-1.5 bg-white border border-slate-200 rounded-lg">SMTP_PORT</span>
            <span className="p-1.5 bg-white border border-slate-200 rounded-lg">SMTP_USER</span>
            <span className="p-1.5 bg-white border border-slate-200 rounded-lg">SMTP_PASS</span>
          </div>
        </div>

      </form>
    </div>
  );
};
