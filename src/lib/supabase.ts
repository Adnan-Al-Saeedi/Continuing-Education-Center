/**
 * تهيئة عميل Supabase وإدارة مستودع البيانات
 * Supabase Client & Local Persistence Adapter
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Activity, Lecturer, Settings, DocumentItem, EmailTemplate, SendLog, NameAlias } from '../types';
import { 
  POLYTECHNIC_SETTINGS, 
  POLYTECHNIC_LECTURERS, 
  POLYTECHNIC_ACTIVITIES, 
  POLYTECHNIC_ALIASES 
} from './polytechnicData';

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
    const { error } = await client.from('settings').select('count').limit(1);
    if (error && error.code !== 'PGRST116') {
      return { success: false, message: `خطأ في الاتصال: ${error.message}` };
    }
    return { success: true, message: 'تم الاتصال بقاعدة بيانات Supabase بنجاح!' };
  } catch (err: any) {
    return { success: false, message: err.message || 'فشل الاتصال بقاعدة البيانات' };
  }
}

// ==============================================================================
// البيانات الافتراضية الأولية - خطة كلية البوليتكنك - بابل 2026-2027
// ==============================================================================

export const INITIAL_SETTINGS: Settings = POLYTECHNIC_SETTINGS;
export const INITIAL_LECTURERS: Lecturer[] = POLYTECHNIC_LECTURERS;
export const INITIAL_ACTIVITIES: Activity[] = POLYTECHNIC_ACTIVITIES;
export const INITIAL_ALIASES: NameAlias[] = POLYTECHNIC_ALIASES;

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

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'استمارة الأمر الإداري لإقامة النشاط العلمي (PDF)',
    description: 'النموذج الرسمي المعتمد لطلب إصدار الأمر الإداري للنشاط',
    kind: 'link',
    url: 'https://drive.google.com/file/d/sample-admin-order/view',
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

export const INITIAL_SEND_LOGS: SendLog[] = [
  {
    id: 'log-1',
    activity_id: 'poly-act-001',
    activity_title: 'تطبيقات الذكاء الاصطناعي التوليدي في التعليم الجامعي وتصميم المحتوى الرقمي',
    activity_type: 'course',
    lecturer_id: 'lec-poly-1',
    recipient_name: 'محمد نوري سعيد',
    email: 'mohammed.nouri@atu.edu.iq',
    reminder_type: 'first',
    status: 'sent',
    attempts: 1,
    sent_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

const DATASET_VERSION_KEY = 'ce_polytechnic_version';
const CURRENT_VERSION = '2026_polytechnic_v2';

// فحص الترقية التلقائية إلى خطة كلية البوليتكنك - بابل 2026-2027
function ensurePolytechnicDefaults(): void {
  try {
    const version = localStorage.getItem(DATASET_VERSION_KEY);
    const existingSettings = localStorage.getItem('ce_settings');
    
    // إذا لم تكن النسخة محدثة أو كان الاسم يحتوي على الكلية القديمة
    if (version !== CURRENT_VERSION || (existingSettings && existingSettings.includes('النجف'))) {
      localStorage.setItem('ce_settings', JSON.stringify(INITIAL_SETTINGS));
      localStorage.setItem('ce_activities', JSON.stringify(INITIAL_ACTIVITIES));
      localStorage.setItem('ce_lecturers', JSON.stringify(INITIAL_LECTURERS));
      localStorage.setItem('ce_aliases', JSON.stringify(INITIAL_ALIASES));
      localStorage.setItem(DATASET_VERSION_KEY, CURRENT_VERSION);
    }
  } catch (e) {
    console.warn('تعذر تحديث نسخة التخزين المحلي:', e);
  }
}

// تشغيل الفحص عند الاستيراد
ensurePolytechnicDefaults();

// دالة مساعدة لحفظ وقراءة البيانات المحلية
export const localStore = {
  getSettings: (): Settings => {
    ensurePolytechnicDefaults();
    const data = localStorage.getItem('ce_settings');
    if (!data) return INITIAL_SETTINGS;
    try {
      const parsed = JSON.parse(data);
      return {
        ...INITIAL_SETTINGS,
        ...parsed,
        email_enabled: parsed.email_enabled !== undefined ? parsed.email_enabled : true,
        whatsapp_enabled: parsed.whatsapp_enabled !== undefined ? parsed.whatsapp_enabled : true,
        messaging_service_active: parsed.messaging_service_active !== undefined ? parsed.messaging_service_active : true,
      };
    } catch {
      return INITIAL_SETTINGS;
    }
  },
  setSettings: (settings: Settings) => localStorage.setItem('ce_settings', JSON.stringify(settings)),

  getTemplate: (): EmailTemplate => {
    const data = localStorage.getItem('ce_template');
    return data ? JSON.parse(data) : INITIAL_TEMPLATE;
  },
  setTemplate: (template: EmailTemplate) => localStorage.setItem('ce_template', JSON.stringify(template)),

  getLecturers: (): Lecturer[] => {
    ensurePolytechnicDefaults();
    const data = localStorage.getItem('ce_lecturers');
    return data ? JSON.parse(data) : INITIAL_LECTURERS;
  },
  setLecturers: (lecturers: Lecturer[]) => localStorage.setItem('ce_lecturers', JSON.stringify(lecturers)),

  getActivities: (): Activity[] => {
    ensurePolytechnicDefaults();
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

  // إعادة التعيين اليدوية إلى خطة كلية البوليتكنك الرسمية
  resetToPolytechnic: () => {
    localStorage.setItem('ce_settings', JSON.stringify(INITIAL_SETTINGS));
    localStorage.setItem('ce_activities', JSON.stringify(INITIAL_ACTIVITIES));
    localStorage.setItem('ce_lecturers', JSON.stringify(INITIAL_LECTURERS));
    localStorage.setItem('ce_aliases', JSON.stringify(INITIAL_ALIASES));
    localStorage.setItem(DATASET_VERSION_KEY, CURRENT_VERSION);
  }
};
