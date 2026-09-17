/**
 * تهيئة عميل Supabase وإدارة مستودع البيانات
 * Supabase Client & Local Persistence Adapter
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Activity, Lecturer, Settings, DocumentItem, EmailTemplate, SendLog, NameAlias } from '../types';
import { normalizeArabic } from './arabicUtils';

// قراءة المتغيرات من البيئة أو التخزين المحلي
const getEnvUrl = () => import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('app_supabase_url') || '';
const getEnvKey = () => import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('app_supabase_key') || '';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const url = getEnvUrl();
  const key = getEnvKey();

  if (!url || !key || url.includes('your-project-id')) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    } catch (e) {
      console.warn('تعذر تهيئة عميل Supabase:', e);
      return null;
    }
  }

  return supabaseInstance;
}

export function saveSupabaseConfig(url: string, key: string) {
  localStorage.setItem('app_supabase_url', url.trim());
  localStorage.setItem('app_supabase_key', key.trim());
  supabaseInstance = null; // إعادة التهيئة
}

export async function testSupabaseConnection(url: string, key: string): Promise<{ success: boolean; message: string }> {
  try {
    const client = createClient(url.trim(), key.trim());
    const { data, error } = await client.from('settings').select('count').limit(1);
    if (error && error.code !== 'PGRST116') {
      return { success: false, message: `خطأ في الاتصال: ${error.message}` };
    }
    return { success: true, message: 'تم الاتصال بقاعدة بيانات Supabase بنجاح!' };
  } catch (err: any) {
    return { success: false, message: err.message || 'فشل الاتصال بقاعدة البيانات' };
  }
}

// ==============================================================================
// البيانات الافتراضية الأولية لوضع المعاينة (Seed Data)
// ==============================================================================

export const INITIAL_SETTINGS: Settings = {
  university_name: 'جامعة الفرات الأوسط التقنية',
  college_name: 'الكلية التقنية الهندسية - النجف',
  center_name: 'مركز التعليم المستمر',
  logo_url: '',
  sender_name: 'مركز التعليم المستمر - الكلية التقنية',
  reply_to: 'continuing.edu@atu.edu.iq',
  days_before: 7,
  second_reminder: false,
  second_reminder_days: 1,
  admin_email: 'adn.ak21@atu.edu.iq',
};

export const INITIAL_TEMPLATE: EmailTemplate = {
  subject: 'تذكير: {{نوع_النشاط}} «{{عنوان_النشاط}}» بتاريخ {{تاريخ_البدء}}',
  body_html: `<div dir="rtl" style="font-family: Arial, Tahoma, sans-serif; line-height: 1.8; color: #1e293b; max-width: 650px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #047857 0%, #065f46 100%); color: #ffffff; padding: 24px; text-align: center;">
    <h2 style="margin: 0; font-size: 20px; font-weight: bold;">{{اسم_الجامعة}}</h2>
    <h3 style="margin: 4px 0 0 0; font-size: 16px; font-weight: normal; opacity: 0.95;">{{اسم_الكلية}} - {{اسم_المركز}}</h3>
  </div>

  <div style="padding: 24px;">
    <p style="font-size: 16px; margin: 0 0 16px 0;">
      تحية طيبة سعادة <strong>{{اللقب}} {{اسم_المحاضر}}</strong> المحترم،
    </p>
    <p style="font-size: 15px; color: #334155; margin: 0 0 20px 0;">
      نود تذكيركم بموعد إقامة <strong>{{نوع_النشاط}}</strong> الموسوم:
    </p>

    <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
      <h4 style="margin: 0 0 12px 0; color: #065f46; font-size: 17px; text-align: center;">« {{عنوان_النشاط}} »</h4>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 8px; color: #64748b; width: 30%;">القسم العلمي:</td>
          <td style="padding: 6px 8px; font-weight: bold;">{{القسم}}</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; color: #64748b;">تاريخ البدء:</td>
          <td style="padding: 6px 8px; font-weight: bold; color: #047857;">{{يوم_البدء}} {{تاريخ_البدء}}</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; color: #64748b;">تاريخ الانتهاء:</td>
          <td style="padding: 6px 8px;">{{تاريخ_الانتهاء}}</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; color: #64748b;">المكان / القاعة:</td>
          <td style="padding: 6px 8px;">{{المكان}}</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; color: #64748b;">الوقت:</td>
          <td style="padding: 6px 8px;">{{الوقت}}</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; color: #64748b;">المحاضرون المشاركون:</td>
          <td style="padding: 6px 8px; color: #0f172a;">{{المحاضرون_المشاركون}}</td>
        </tr>
      </table>
    </div>

    <div style="margin-bottom: 24px;">
      <h4 style="margin: 0 0 10px 0; font-size: 15px; color: #0f172a;">📋 النماذج والوثائق المطلوب إكمالها:</h4>
      {{قائمة_النماذج}}
    </div>

    <p style="font-size: 14px; color: #475569; margin: 0 0 20px 0;">
      نرجو من سيادتكم الاطلاع وتجهيز المتطلبات في الموعد المحدد لضمان انسيابية العمل وتوثيق النشاط بالشكل الأصولي.
    </p>

    <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 14px; color: #334155;">
      <p style="margin: 0; font-weight: bold;">مع التقدير والاعتزاز،</p>
      <p style="margin: 4px 0 0 0; color: #065f46; font-weight: bold;">إدارة {{اسم_المركز}}</p>
      <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748b;">{{اسم_الكلية}} - {{اسم_الجامعة}}</p>
    </div>
  </div>
</div>`,
};

// تاريخ ديناميكي لاختبار التذكيرات (+7 أيام من اليوم)
const getFutureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const INITIAL_LECTURERS: Lecturer[] = [
  {
    id: 'lec-1',
    full_name: 'أحمد كاظم جواد',
    normalized_name: normalizeArabic('أحمد كاظم جواد'),
    title: 'م.د.',
    department: 'قسم هندسة تقنيات الحاسوب',
    email: 'a.kadhim@atu.edu.iq',
    phone: '07701234567',
  },
  {
    id: 'lec-2',
    full_name: 'سارة علي حسن',
    normalized_name: normalizeArabic('سارة علي حسن'),
    title: 'م.م.',
    department: 'قسم هندسة تقنيات الحاسوب',
    email: 's.ali@atu.edu.iq',
    phone: '07801234567',
  },
  {
    id: 'lec-3',
    full_name: 'علي حسين العبيدي',
    normalized_name: normalizeArabic('علي حسين العبيدي'),
    title: 'أ.م.د.',
    department: 'قسم التقنيات الميكانيكية',
    email: 'ali.h@atu.edu.iq',
    phone: '07709876543',
  },
  {
    id: 'lec-4',
    full_name: 'حسن مجيد كريم',
    normalized_name: normalizeArabic('حسن مجيد كريم'),
    title: 'أ.د.',
    department: 'قسم هندسة البناء والإنشاءات',
    email: 'hassan.m@atu.edu.iq',
    phone: '07501122334',
  },
  {
    id: 'lec-5',
    full_name: 'زينب عادل الشمري',
    normalized_name: normalizeArabic('زينب عادل الشمري'),
    title: 'م.د.',
    department: 'قسم الأجهزة الطبية',
    email: 'zainab.a@atu.edu.iq',
    phone: '07802233445',
  },
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    type: 'course',
    title: 'تطبيقات الذكاء الاصطناعي في التعليم الجامعي',
    department: 'قسم هندسة تقنيات الحاسوب',
    lecturers_raw: 'م.د. أحمد كاظم جواد / م.م. سارة علي حسن',
    start_date: getFutureDate(7), // تبدأ بعد 7 أيام بالضبط لتكون مستحقة للتذكير اليوم!
    end_date: getFutureDate(11),
    location: 'مختبر الشبكات والذكاء الاصطناعي',
    start_time: '10:00 صباحاً',
    duration: '5 أيام',
    target_audience: 'التدريسيون والباحثون',
    notes: 'الدورة حضورية في بناية قسم الحاسوب',
    date_fixed: false,
    parsed_lecturers: ['م.د. أحمد كاظم جواد', 'م.م. سارة علي حسن'],
  },
  {
    id: 'act-2',
    type: 'workshop',
    title: 'استراتيجيات النشر في مجلات Scopus و Clarivate',
    department: 'قسم هندسة البناء والإنشاءات',
    lecturers_raw: 'أ.د. حسن مجيد كريم',
    start_date: getFutureDate(7), // مستحقة للتذكير
    end_date: getFutureDate(7),
    location: 'قاعة المؤتمرات الكبرى',
    start_time: '11:00 صباحاً',
    duration: 'يوم واحد',
    target_audience: 'طلبة الدراسات العليا والباحثين',
    notes: '',
    date_fixed: false,
    parsed_lecturers: ['أ.د. حسن مجيد كريم'],
  },
  {
    id: 'act-3',
    type: 'course',
    title: 'الصيانة الوقائية والتحكم في المحركات الصناعية',
    department: 'قسم التقنيات الميكانيكية',
    lecturers_raw: 'أ.م.د. علي حسين العبيدي / م. مهند رضا',
    start_date: getFutureDate(14),
    end_date: getFutureDate(18),
    location: 'ورشة الميكانيك المركزية',
    start_time: '09:30 صباحاً',
    duration: '5 أيام',
    target_audience: 'الكوادر الفنية والمهندسون',
    notes: '',
    date_fixed: false,
    parsed_lecturers: ['أ.م.د. علي حسين العبيدي', 'م. مهند رضا'],
  },
  {
    id: 'act-conflict-1',
    type: 'course',
    title: 'معايير جودة المختبرات الأكاديمية GLP (تاريخ معكوس للمراجعة)',
    department: 'قسم الأجهزة الطبية',
    lecturers_raw: 'م.د. زينب عادل الشمري',
    start_date: '2026-11-20', // معكوس عمداً لتمكين مراجعة التواريخ المعكوسة
    end_date: '2026-11-15',
    location: 'قاعة السمينار',
    start_time: '10:30 صباحاً',
    duration: '5 أيام',
    target_audience: 'مسؤولو المختبرات',
    notes: 'حالة اختبارية لتاريخ البدء اللاحق لتاريخ الانتهاء',
    date_fixed: false,
    parsed_lecturers: ['م.د. زينب عادل الشمري'],
  },
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'استمارة معلومات نشاط التعليم المستمر',
    description: 'استمارة بيانات الدورة والمحاضرين معتمدة لدى شعبة التعليم المستمر',
    kind: 'link',
    url: 'https://docs.google.com/forms/d/e/sample-form-continuing-edu/viewform',
    applies_to: 'both',
  },
  {
    id: 'doc-2',
    name: 'خطة المنهاج التدريبي وساعات المحاضرات (Word)',
    description: 'تعبأ من قبل المحاضر الأصيل قبل بدء الدورة',
    kind: 'link',
    url: 'https://drive.google.com/file/d/sample-curriculum-template/view',
    applies_to: 'courses',
  },
  {
    id: 'doc-3',
    name: 'استمارة تقييم ورشة العمل من المشاركين (Google Form)',
    description: 'رابط استبيان يتم توزيعه في نهاية الورشة',
    kind: 'link',
    url: 'https://docs.google.com/forms/d/e/sample-workshop-evaluation/viewform',
    applies_to: 'workshops',
  },
];

export const INITIAL_ALIASES: NameAlias[] = [
  { raw_name: 'أحمد كاظم', lecturer_id: 'lec-1' },
  { raw_name: 'د. احمد كاظم', lecturer_id: 'lec-1' },
  { raw_name: 'حسن مجيد', lecturer_id: 'lec-4' },
];

export const INITIAL_SEND_LOGS: SendLog[] = [
  {
    id: 'log-1',
    activity_id: 'act-1',
    activity_title: 'تطبيقات الذكاء الاصطناعي في التعليم الجامعي',
    activity_type: 'course',
    lecturer_id: 'lec-1',
    recipient_name: 'أحمد كاظم جواد',
    email: 'a.kadhim@atu.edu.iq',
    reminder_type: 'first',
    status: 'sent',
    attempts: 1,
    sent_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

// دالة مساعدة لحفظ وقراءة البيانات المحلية
export const localStore = {
  getSettings: (): Settings => {
    const data = localStorage.getItem('ce_settings');
    return data ? JSON.parse(data) : INITIAL_SETTINGS;
  },
  setSettings: (settings: Settings) => localStorage.setItem('ce_settings', JSON.stringify(settings)),

  getTemplate: (): EmailTemplate => {
    const data = localStorage.getItem('ce_template');
    return data ? JSON.parse(data) : INITIAL_TEMPLATE;
  },
  setTemplate: (template: EmailTemplate) => localStorage.setItem('ce_template', JSON.stringify(template)),

  getLecturers: (): Lecturer[] => {
    const data = localStorage.getItem('ce_lecturers');
    return data ? JSON.parse(data) : INITIAL_LECTURERS;
  },
  setLecturers: (lecturers: Lecturer[]) => localStorage.setItem('ce_lecturers', JSON.stringify(lecturers)),

  getActivities: (): Activity[] => {
    const data = localStorage.getItem('ce_activities');
    return data ? JSON.parse(data) : INITIAL_ACTIVITIES;
  },
  setActivities: (activities: Activity[]) => localStorage.setItem('ce_activities', JSON.stringify(activities)),

  getDocuments: (): DocumentItem[] => {
    const data = localStorage.getItem('ce_documents');
    return data ? JSON.parse(data) : INITIAL_DOCUMENTS;
  },
  setDocuments: (documents: DocumentItem[]) => localStorage.setItem('ce_documents', JSON.stringify(documents)),

  getAliases: (): NameAlias[] => {
    const data = localStorage.getItem('ce_aliases');
    return data ? JSON.parse(data) : INITIAL_ALIASES;
  },
  setAliases: (aliases: NameAlias[]) => localStorage.setItem('ce_aliases', JSON.stringify(aliases)),

  getSendLogs: (): SendLog[] => {
    const data = localStorage.getItem('ce_send_logs');
    return data ? JSON.parse(data) : INITIAL_SEND_LOGS;
  },
  setSendLogs: (logs: SendLog[]) => localStorage.setItem('ce_send_logs', JSON.stringify(logs)),
  addSendLog: (log: SendLog) => {
    const logs = localStore.getSendLogs();
    logs.unshift(log);
    localStore.setSendLogs(logs);
  },
};
