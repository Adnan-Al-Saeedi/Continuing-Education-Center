/**
 * محرك تجميع وصياغة رسائل البريد الإلكتروني الأكاديمية
 * Academic Email Composer & Template Variable Replacer
 */

import { Activity, Lecturer, Settings, DocumentItem, EmailTemplate } from '../types';
import { formatArabicDateWithDay } from './arabicUtils';

export interface ComposedEmail {
  subject: string;
  html: string;
  recipientEmail: string;
  recipientName: string;
  isOver10MB: boolean;
}

export function composeEmail(
  activity: Activity,
  lecturer: Lecturer,
  otherLecturers: string[],
  settings: Settings,
  template: EmailTemplate,
  documents: DocumentItem[]
): ComposedEmail {
  const activityTypeLabel = activity.type === 'course' ? 'الدورة التدريبية' : 'ورشة العمل';

  // تصفية النماذج التي تنطبق على هذا النشاط
  const applicableDocs = documents.filter(
    (d) =>
      d.applies_to === 'both' ||
      (activity.type === 'course' && d.applies_to === 'courses') ||
      (activity.type === 'workshop' && d.applies_to === 'workshops')
  );

  // حساب الحجم الكلي للملفات (10 ميغابايت = 10 * 1024 * 1024 بايت)
  const totalSizeBytes = applicableDocs.reduce((acc, d) => acc + (d.file_size_bytes || 0), 0);
  const isOver10MB = totalSizeBytes > 10 * 1024 * 1024;

  let docsHtml = '';
  if (applicableDocs.length > 0) {
    docsHtml = `
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px; margin: 12px 0;">
        <p style="margin: 0 0 8px 0; font-weight: bold; color: #166534; font-size: 14px;">
          ${isOver10MB ? '🔗 روابط تحميل النماذج (نظراً لتجاوز الحجم الإجمالي 10MB):' : '📎 المرفقات وروابط النماذج المعتمدة:'}
        </p>
        <ul style="margin: 0; padding-right: 20px; font-size: 14px; color: #1e293b;">
          ${applicableDocs
            .map(
              (d) => `
            <li style="margin-bottom: 6px;">
              <strong>${d.name}</strong> ${d.description ? `<span style="color: #64748b;">(${d.description})</span>` : ''} - 
              <a href="${d.url}" style="color: #047857; text-decoration: underline; font-weight: 500;" target="_blank">
                ${d.kind === 'file' ? 'تحميل الملف' : 'فتح الرابط'}
              </a>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    `;
  } else {
    docsHtml = '<p style="color: #64748b; font-size: 14px; margin: 6px 0;">لا توجد وثائق أو استمارات مطلوبة لهذا النشاط.</p>';
  }

  const startDateFmt = activity.start_date.replace(/-/g, '/');
  const endDateFmt = activity.end_date ? activity.end_date.replace(/-/g, '/') : startDateFmt;
  const startDay = formatArabicDateWithDay(activity.start_date).split(' ')[0] || '';

  const othersText = otherLecturers.length > 0 ? otherLecturers.join('، ') : 'لا يوجد مشاركون آخرون (المحاضر المنفرد)';

  // استبدال المتغيرات في نص الرسالة
  let body = template.body_html || '';
  body = body
    .replace(/{{اسم_المحاضر}}/g, lecturer.full_name)
    .replace(/{{اللقب}}/g, lecturer.title || '')
    .replace(/{{نوع_النشاط}}/g, activityTypeLabel)
    .replace(/{{عنوان_النشاط}}/g, activity.title)
    .replace(/{{القسم}}/g, activity.department)
    .replace(/{{تاريخ_البدء}}/g, startDateFmt)
    .replace(/{{تاريخ_الانتهاء}}/g, endDateFmt)
    .replace(/{{يوم_البدء}}/g, startDay)
    .replace(/{{المكان}}/g, activity.location || 'القاعة المخصصة في الكلية')
    .replace(/{{الوقت}}/g, activity.start_time || '10:00 صباحاً')
    .replace(/{{المحاضرون_المشاركون}}/g, othersText)
    .replace(/{{اسم_الجامعة}}/g, settings.university_name)
    .replace(/{{اسم_الكلية}}/g, settings.college_name)
    .replace(/{{اسم_المركز}}/g, settings.center_name)
    .replace(/{{قائمة_النماذج}}/g, docsHtml);

  // استبدال المتغيرات في عنوان الرسالة
  let subject = template.subject || 'تذكير: {{نوع_النشاط}} «{{عنوان_النشاط}}» بتاريخ {{تاريخ_البدء}}';
  subject = subject
    .replace(/{{نوع_النشاط}}/g, activityTypeLabel)
    .replace(/{{عنوان_النشاط}}/g, activity.title)
    .replace(/{{تاريخ_البدء}}/g, startDateFmt);

  return {
    subject,
    html: body,
    recipientEmail: lecturer.email,
    recipientName: lecturer.full_name,
    isOver10MB,
  };
}
