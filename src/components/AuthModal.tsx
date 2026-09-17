import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight,
  Clock,
  Eye,
  EyeOff,
  Copy,
  Check,
  Sparkles,
  Info,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthenticated,
    hasRegisteredAdmin,
    isOtpPending,
    generatedOtp,
    pendingEmail,
    otpCountdown,
    otpAttemptsLeft,
    canResendOtp,
    resendCooldown,
    loginWithPassword,
    registerAdmin,
    verifyOtp,
    resendOtpCode,
    cancelOtp,
  } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(!hasRegisteredAdmin);
  const [email, setEmail] = useState('adn.ak21@atu.edu.iq');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpInfoNotice, setOtpInfoNotice] = useState<string | null>(null);
  const [copiedOtp, setCopiedOtp] = useState(false);

  // إذا كان المستخدم مصادقاً عليه، لا نظهر النافذة
  if (isAuthenticated) return null;

  // فحص قوة كلمة المرور
  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-zA-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    return score; // 0 to 4
  };

  const passStrength = calculatePasswordStrength(password);
  const getStrengthLabel = (score: number) => {
    if (score <= 1) return { text: 'ضعيفة', color: 'bg-rose-500', width: 'w-1/4' };
    if (score === 2) return { text: 'متوسطة', color: 'bg-amber-500', width: 'w-2/4' };
    if (score === 3) return { text: 'جيدة', color: 'bg-blue-500', width: 'w-3/4' };
    return { text: 'قوية جداً', color: 'bg-emerald-600', width: 'w-full' };
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    if (isRegisterMode) {
      if (password !== confirmPassword) {
        setErrorMessage('كلمتا المرور غير متطابقتين.');
        setIsLoading(false);
        return;
      }

      if (passStrength < 2) {
        setErrorMessage('يرجى اختيار كلمة مرور تجمع الحروف والأرقام بطول 8 محارف على الأقل.');
        setIsLoading(false);
        return;
      }

      const res = await registerAdmin(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'فشل التسجيل.');
      } else {
        setOtpInfoNotice(`تم إرسال رمز التحقق (OTP) إلى البريد: ${email}. تفقد صندوق البريد.`);
      }
    } else {
      const res = await loginWithPassword(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'فشل تسجيل الدخول.');
      } else {
        setOtpInfoNotice(`تم إرسال رمز التحقق المكون من 6 أرقام إلى بريدك.`);
      }
    }

    setIsLoading(false);
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.length !== 6) {
      setErrorMessage('يرجى إدخال رمز التحقق المكون من 6 أرقام كاملاً.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const res = await verifyOtp(otpInput);
    if (!res.success) {
      setErrorMessage(res.error || 'رمز التحقق غير صحيح.');
    }
    setIsLoading(false);
  };

  const handleResend = async () => {
    const res = await resendOtpCode();
    if (res.success) {
      setOtpInfoNotice('تم توليد وإرسال رمز تحقق جديد.');
      setErrorMessage(null);
    } else {
      setErrorMessage(res.error || 'تعذر إعادة الإرسال.');
    }
  };

  const handleAutoFillOtp = () => {
    if (generatedOtp) {
      setOtpInput(generatedOtp);
      setErrorMessage(null);
    }
  };

  const handleCopyOtp = () => {
    if (generatedOtp) {
      navigator.clipboard.writeText(generatedOtp);
      setCopiedOtp(true);
      setTimeout(() => setCopiedOtp(false), 2000);
    }
  };

  const minutesLeft = Math.floor(otpCountdown / 60);
  const secondsLeft = (otpCountdown % 60).toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* الترويسة الأكاديمية الملكية */}
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-blue-900 text-white p-6 text-center relative border-b border-blue-800/40">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-3 shadow-inner shadow-black/20">
            <ShieldCheck className="w-7 h-7 text-sky-400" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">بوابة مسؤول نظام التعليم المستمر</h2>
          <p className="text-xs text-blue-200/90 mt-1">
            الكلية التقنية الهندسية - مركز التعليم المستمر
          </p>
        </div>

        {/* جسم النافذة */}
        <div className="p-6">
          
          {isOtpPending ? (
            /* نموذج إدخال رمز التحقق OTP */
            <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-950 text-xs font-semibold mb-2 border border-blue-200/60">
                  <KeyRound className="w-3.5 h-3.5 text-sky-600" />
                  <span>التحقق الثنائي OTP</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">أدخل رمز التحقق (6 أرقام)</h3>
                <p className="text-xs text-slate-500 mt-1">
                  صلاحية الرمز 10 دقائق. متبقي لديك {otpAttemptsLeft} محاولات.
                </p>
              </div>

              {/* صندوق كشف الرمز التجريبي لتسهيل الدخول دون انتظار البريد */}
              <div className="p-3.5 bg-gradient-to-br from-amber-50/90 via-white to-blue-50/50 border border-amber-300/90 rounded-2xl text-xs space-y-2.5 shadow-xs">
                <div className="flex items-start gap-2 text-amber-950">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="block text-amber-950 font-bold mb-0.5">
                      تنويه بيئة الاستعراض الأكاديمية (محاكاة رمز OTP):
                    </strong>
                    <span className="text-slate-700">
                      نظراً لأن النظام يعمل حالياً في بيئة استعراض دون ربط خادم بريد SMTP خارجي، تم توليد رمز التحقق لمحاكاة الأمان:
                    </span>
                  </div>
                </div>

                {generatedOtp && (
                  <div className="bg-white border border-blue-200/80 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                    <div className="text-center sm:text-right">
                      <span className="text-[11px] text-slate-500 block">رمز التحقق الحالي:</span>
                      <span className="font-mono text-xl font-black text-blue-950 tracking-widest">
                        {generatedOtp}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleAutoFillOtp}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-lg font-bold text-xs shadow-xs transition-all cursor-pointer border border-amber-400/40"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>تعبئة تلقائية</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyOtp}
                        title="نسخ الرمز"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-all cursor-pointer"
                      >
                        {copiedOtp ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-blue-600" />
                            <span>تم النسخ</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>نسخ</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {otpInfoNotice && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{otpInfoNotice}</span>
                </div>
              )}

              {/* حقل إدخال الرمز */}
              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  autoFocus
                  required
                  className="w-full text-center tracking-[1em] text-2xl font-mono font-bold py-3 border border-slate-300 rounded-2xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* العداد ومحاولات إعادة الإرسال */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>صلاحية الرمز: {minutesLeft}:{secondsLeft}</span>
                </div>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResendOtp}
                  className="font-bold text-blue-700 hover:text-blue-950 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {canResendOtp ? 'إعادة إرسال الرمز' : `انتظر (${resendCooldown} ث)`}
                </button>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || otpInput.length !== 6}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 hover:from-blue-900 hover:to-blue-950 text-white font-bold text-sm shadow-md shadow-blue-950/20 transition-all cursor-pointer disabled:opacity-50 border border-blue-800/30"
              >
                {isLoading ? 'جارٍ التحقق...' : 'تأكيد الرمز والدخول إلى لوحة التحكم'}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    cancelOtp();
                    setOtpInput('');
                    setErrorMessage(null);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>الرجوع لتعديل البريد الإلكتروني أو كلمة المرور</span>
                </button>
              </div>
            </form>
          ) : (
            /* نموذج التسجيل / تسجيل الدخول بالبريد وكلمة المرور */
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {/* تبديل الوضع بين التسجيل والدخول إن لم يكن هناك مسؤول */}
              {!hasRegisteredAdmin ? (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <strong>إنشاء حساب مسؤول النظام لأول مرة:</strong>
                  <p className="mt-0.5">
                    يُسمح بإنشاء حساب مسؤول واحد فقط للمنظومة، ويُغلق التسجيل تلقائياً بعد إنشائه.
                  </p>
                </div>
              ) : (
                <div className="text-center mb-1">
                  <h3 className="text-sm font-bold text-slate-900">تسجيل الدخول لمسؤول النظام</h3>
                  <p className="text-xs text-slate-500">أدخل البريد الإلكتروني وكلمة المرور</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">البريد الإلكتروني الجامعي</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="adn.ak21@atu.edu.iq"
                    className="w-full pr-9 pl-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 font-mono transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">كلمة المرور</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8 محارف تجمع الحروف والأرقام..."
                    className="w-full pr-9 pl-9 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 font-mono transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {isRegisterMode && password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span>مؤشر قوة كلمة المرور:</span>
                      <span className="font-bold">{getStrengthLabel(passStrength).text}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStrengthLabel(passStrength).color} ${getStrengthLabel(passStrength).width} transition-all duration-300`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">تأكيد كلمة المرور</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="أعد إدخال كلمة المرور..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 font-mono transition-all"
                  />
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 hover:from-blue-900 hover:to-blue-950 text-white font-bold text-sm shadow-md shadow-blue-950/20 transition-all cursor-pointer disabled:opacity-50 border border-blue-800/30"
              >
                {isLoading
                  ? 'جارٍ المعالجة...'
                  : isRegisterMode
                  ? 'إنشاء حساب المسؤول وإرسال رمز التفعيل'
                  : 'دخول ومتابعة التحقق (OTP)'}
              </button>

              <p className="text-[11px] text-center text-slate-400">
                ملاحظة: في بيئة الاستعراض التجريبية، يظهر رمز التحقق المكون من 6 أرقام مباشرة على الشاشة مع زر تعبئة تلقائي لتسجيل الدخول فوراً.
              </p>

              {!hasRegisteredAdmin && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(!isRegisterMode)}
                    className="text-xs text-blue-800 hover:underline font-semibold cursor-pointer"
                  >
                    {isRegisterMode ? 'لديك حساب مسجل بالفعل؟ تسجيل الدخول' : 'تسجيل حساب المسؤول الجديد'}
                  </button>
                </div>
              )}
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
