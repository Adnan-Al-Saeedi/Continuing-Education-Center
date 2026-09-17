import React, { useState, useEffect } from 'react';
import { Bell, Clock, Send, ShieldCheck, LogOut, CheckCircle, AlertTriangle } from 'lucide-react';
import { Settings } from '../types';
import { useAuth } from '../context/AuthContext';
import { getSupabaseClient } from '../lib/supabase';

interface HeaderProps {
  settings: Settings;
  onSendNow: () => void;
  isSending: boolean;
}

export const Header: React.FC<HeaderProps> = ({ settings, onSendNow, isSending }) => {
  const { admin, logout } = useAuth();
  const [baghdadTime, setBaghdadTime] = useState<string>('');
  const [timeUntilCron, setTimeUntilCron] = useState<string>('');
  const isSupabaseConnected = !!getSupabaseClient();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // توقيت بغداد (UTC+3)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const bgDate = new Date(utc + 3 * 3600000);

      const hours = bgDate.getHours().toString().padStart(2, '0');
      const minutes = bgDate.getMinutes().toString().padStart(2, '0');
      const seconds = bgDate.getSeconds().toString().padStart(2, '0');
      setBaghdadTime(`${hours}:${minutes}:${seconds}`);

      // حساب الوقت المتبقي حتى الساعة 08:00 صباحاً بتوقيت بغداد
      const targetCron = new Date(bgDate);
      if (bgDate.getHours() >= 8) {
        targetCron.setDate(targetCron.getDate() + 1);
      }
      targetCron.setHours(8, 0, 0, 0);

      const diffMs = targetCron.getTime() - bgDate.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setTimeUntilCron(`${diffHrs} س و ${diffMins} د`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-2xl backdrop-saturate-180 border-b border-slate-200/70 sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* الشعار والعناوين الأكاديمية */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-950/15 overflow-hidden border border-blue-800/40">
              {settings.logo_url ? (
                <img src={settings.logo_url} alt="شعار الكلية" className="w-full h-full object-contain p-1" />
              ) : (
                <span className="tracking-tighter text-blue-100 font-black">CE</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200/60">
                  {settings.university_name}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {settings.college_name}
                </span>
              </div>
              <h1 className="text-lg font-bold text-slate-900 mt-0.5 tracking-tight">
                {settings.center_name}
              </h1>
            </div>
          </div>

          {/* التوقيت ومؤشر حالة النظام وأزرار الإجراءات */}
          <div className="flex items-center gap-3">
            
            {/* بطاقة توقيت بغداد وموعد الإرسال اليومي */}
            <div className="hidden md:flex items-center gap-3 bg-slate-50/80 border border-slate-200/80 rounded-xl px-3 py-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>بغداد:</span>
                <span className="font-mono font-bold text-slate-900">{baghdadTime}</span>
              </div>
              <div className="h-3 w-px bg-slate-200" />
              <div className="text-slate-600">
                <span>الإرسال القادم (08:00 ص):</span>{' '}
                <span className="font-semibold text-blue-900">{timeUntilCron}</span>
              </div>
            </div>

            {/* حالة اتصال قاعدة البيانات */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border bg-slate-50/80 border-slate-200/80 text-slate-700">
              {isSupabaseConnected ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-slate-700 font-medium">Supabase متصل</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-slate-700 font-medium">وضع المعاينة المحلي</span>
                </>
              )}
            </div>

            {/* زر إرسال الآن - زر اتخاذ الإجراء CTA الذهبي/البرتقالي الملكي */}
            <button
              id="send-now-header-btn"
              onClick={onSendNow}
              disabled={isSending}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-98 text-slate-950 text-sm font-bold transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 cursor-pointer border border-amber-400/40"
              title="فحص الأنشطة المستحقة وإرسال التذكيرات فوراً"
            >
              <Send className={`w-4 h-4 ${isSending ? 'animate-spin' : ''}`} />
              <span>{isSending ? 'جارٍ الإرسال...' : 'إرسال الآن'}</span>
            </button>

            {/* معلومات المسؤول وتسجيل الخروج */}
            {admin && (
              <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-sky-600 inline" />
                    مسؤول النظام
                  </div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[140px]" title={admin.email}>
                    {admin.email}
                  </div>
                </div>
                <button
                  id="logout-header-btn"
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
