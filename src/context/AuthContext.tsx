/**
 * سياق المصادقة وإدارة جلسة مسؤول النظام
 * Admin Authentication Context with OTP & Inactivity Timeout
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

export interface AdminUser {
  id: string;
  email: string;
  isSuperAdmin: boolean;
  registeredAt: string;
}

interface AuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  hasRegisteredAdmin: boolean;
  isOtpPending: boolean;
  generatedOtp: string;
  pendingEmail: string | null;
  otpCountdown: number;
  otpAttemptsLeft: number;
  canResendOtp: boolean;
  resendCooldown: number;
  loginWithPassword: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  registerAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (code: string) => Promise<{ success: boolean; error?: string }>;
  resendOtpCode: () => Promise<{ success: boolean; error?: string }>;
  cancelOtp: () => void;
  logout: () => void;
  resetSessionTimer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 دقيقة من عدم النشاط

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('ce_admin_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [hasRegisteredAdmin, setHasRegisteredAdmin] = useState<boolean>(() => {
    return localStorage.getItem('ce_admin_account') !== null;
  });

  const [isOtpPending, setIsOtpPending] = useState<boolean>(false);
  const [pendingUser, setPendingUser] = useState<{ email: string; passHash: string } | null>(null);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [otpCountdown, setOtpCountdown] = useState<number>(600); // 10 دقائق (600 ثانية)
  const [resendCooldown, setResendCooldown] = useState<number>(60);
  const [otpAttemptsLeft, setOtpAttemptsLeft] = useState<number>(5);

  const lastActivityRef = useRef<number>(Date.now());

  // التحقق من انتهاء مهلة عدم النشاط (30 دقيقة)
  useEffect(() => {
    if (!admin) return;

    const interval = setInterval(() => {
      const inactiveDuration = Date.now() - lastActivityRef.current;
      if (inactiveDuration >= INACTIVITY_TIMEOUT_MS) {
        console.warn('انتهت مهلة الجلسة بسبب عدم النشاط (30 دقيقة). تم تسجيل الخروج تلقائياً.');
        logout();
      }
    }, 15000);

    const handleUserActivity = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, [admin]);

  // عداد صلاحية رمز التحقق (10 دقائق) ومؤقت إعادة الإرسال (60 ثانية)
  useEffect(() => {
    let timer: any;
    if (isOtpPending) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpPending]);

  // توليد رمز تحقق عشوائي من 6 أرقام
  const generateNewOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpCountdown(600);
    setResendCooldown(60);
    setOtpAttemptsLeft(5);
    console.log(`🔑 [رمز التحقق OTP]: ${code} (صالح لمدة 10 دقائق)`);
    return code;
  };

  const registerAdmin = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (hasRegisteredAdmin) {
      return { success: false, error: 'التسجيل مغلق: يوجد مسؤول نظام مسجل مسبقاً.' };
    }

    if (!email || !pass || pass.length < 8) {
      return { success: false, error: 'كلمة المرور يجب ألا تقل عن 8 محارف وتجمع الحروف والأرقام.' };
    }

    const code = generateNewOtp();
    setPendingUser({ email, passHash: btoa(pass) });
    setIsOtpPending(true);

    return { success: true };
  };

  const loginWithPassword = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const accountStr = localStorage.getItem('ce_admin_account');
    if (!accountStr) {
      // لم يتم تسجيل مسؤول بعد
      return { success: false, error: 'لم يتم إنشاء حساب مسؤول النظام بعد. يرجى التسجيل أولاً.' };
    }

    const stored = JSON.parse(accountStr);
    if (stored.email.toLowerCase() !== email.toLowerCase() || stored.passHash !== btoa(pass)) {
      return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' };
    }

    // طلب رمز التحقق OTP كخطوة ثانية للحماية الأكاديمية
    const code = generateNewOtp();
    setPendingUser({ email, passHash: btoa(pass) });
    setIsOtpPending(true);

    return { success: true };
  };

  const verifyOtp = async (code: string): Promise<{ success: boolean; error?: string }> => {
    if (otpCountdown <= 0) {
      return { success: false, error: 'انتهت صلاحية الرمز (10 دقائق). يرجى طلب رمز جديد.' };
    }

    if (otpAttemptsLeft <= 1) {
      setIsOtpPending(false);
      setPendingUser(null);
      return { success: false, error: 'تم تجاوز الحد الأقصى للمحاولات (5 محاولات). يرجى إعادة المحاولة لاحقاً.' };
    }

    if (code.trim() !== generatedOtp.trim()) {
      setOtpAttemptsLeft((prev) => prev - 1);
      return {
        success: false,
        error: `رمز التحقق غير صحيح. متبقي لديك ${otpAttemptsLeft - 1} محاولات.`,
      };
    }

    // اعتماد تسجيل الحساب في التخزين المحلي إن كان جديداً
    if (!hasRegisteredAdmin && pendingUser) {
      const newAccount = {
        id: 'admin-primary',
        email: pendingUser.email,
        passHash: pendingUser.passHash,
        registeredAt: new Date().toISOString(),
      };
      localStorage.setItem('ce_admin_account', JSON.stringify(newAccount));
      setHasRegisteredAdmin(true);
    }

    const sessionUser: AdminUser = {
      id: 'admin-primary',
      email: pendingUser?.email || 'admin@atu.edu.iq',
      isSuperAdmin: true,
      registeredAt: new Date().toISOString(),
    };

    setAdmin(sessionUser);
    localStorage.setItem('ce_admin_session', JSON.stringify(sessionUser));
    setIsOtpPending(false);
    setPendingUser(null);
    lastActivityRef.current = Date.now();

    return { success: true };
  };

  const resendOtpCode = async (): Promise<{ success: boolean; error?: string }> => {
    if (resendCooldown > 0) {
      return { success: false, error: `يرجى الانتظار ${resendCooldown} ثانية قبل إعادة الإرسال.` };
    }

    generateNewOtp();
    return { success: true };
  };

  const cancelOtp = () => {
    setIsOtpPending(false);
    setPendingUser(null);
    setGeneratedOtp('');
    setOtpAttemptsLeft(5);
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('ce_admin_session');
  };

  const resetSessionTimer = () => {
    lastActivityRef.current = Date.now();
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        hasRegisteredAdmin,
        isOtpPending,
        generatedOtp,
        pendingEmail: pendingUser?.email || null,
        otpCountdown,
        otpAttemptsLeft,
        canResendOtp: resendCooldown === 0,
        resendCooldown,
        loginWithPassword,
        registerAdmin,
        verifyOtp,
        resendOtpCode,
        cancelOtp,
        logout,
        resetSessionTimer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
