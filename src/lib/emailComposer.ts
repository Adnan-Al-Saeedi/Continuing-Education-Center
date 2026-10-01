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

export interface ComposedWhatsApp {
  text: string;
  recipientPhone: string;
  recipientName: string;
  whatsappUrl: string;
}

/**
 * تهيئة رقم الهاتف بالصيغة الدولية لواتساب (دعم الأرقام العراقية 07xxxxxxxx)
 */
export function formatIraqiPhoneNumber(rawPhone: string): string {
  let cleaned = rawPhone.replace(/\D/g, '');
  if (!cleaned) return '';
  if (cleaned.startsWith('07') && cleaned.length === 11) {
    cleaned = '964' + cleaned.substring(1);
  } else if (cleaned.startsWith('7') && cleaned.length === 10) {
    cleaned = '964' + cleaned;
  } else if (!cleaned.startsWith('964') && cleaned.length === 10) {
    cleaned = '964' + cleaned;
  }
  return cleaned;
}

/**
 * تحويل شفرة HTML إلى نص متوافق تماماً مع WhatsApp Markdown
 */
export function convertHtmlToWhatsApp(html: string): string {
  let text = html;

  // إزالة وسوم الأنماط والسكربتات
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  // تحويل العناوين
  text = text.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, '\n*$1*\n');

  // تحويل الخطوط العريضة والمائلة
  text = text.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi, '*$2*');
  text = text.replace(/<(em|i)[^>]*>([\s\S]*?)<\/(em|i)>/gi, '_$2_');

  // تحويل الروابط
  text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '$2: $1');

  // تحويل صفوف وأعمدة الجداول
  text = text.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (_, rowContent) => {
    const cells: string[] = [];
    const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
    let match;
    while ((match = cellRegex.exec(rowContent)) !== null) {
      const cellText = match[1].replace(/<[^>]+>/g, '').trim();
      if (cellText) cells.push(cellText);
    }
    if (cells.length === 2) {
      return `• *${cells[0]}* ${cells[1]}\n`;
    } else if (cells.length > 0) {
      return `• ${cells.join(' - ')}\n`;
    }
    return '\n';
  });

  // تحويل عناصر القوائم
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '• $1\n');

  // استبدال الفواصل والفقرات
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<\/div>/gi, '\n');

  // إزالة بقية وسوم الـ HTML
  text = text.replace(/<[^>]+>/g, '');

  // فك رموز الكيانات
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // تنظيف الأسطر الفارغة الزائدة
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  return text;
}

/**
 * صياغة رسالة واتساب الأكاديمية الرسمية وتوليد رابط الإرسال المباشر
 * مطابقة تماماً لقالب رسالة البريد الإلكتروني المعتمد
 */
export function composeWhatsAppMessage(
  activity: Activity,
  lecturerName: string,
  lecturerTitle: string | undefined,
  lecturerPhone: string,
  settings: Settings,
  documents: DocumentItem[],
  template?: EmailTemplate,
  otherLecturers: string[] = []
): ComposedWhatsApp {
  const formattedPhone = formatIraqiPhoneNumber(lecturerPhone);
  const activityTypeLabel = activity.type === 'course' ? 'الدورة التدريبية' : 'ورشة العمل';
  const startDateFmt = activity.start_date.replace(/-/g, '/');
  const endDateFmt = activity.end_date ? activity.end_date.replace(/-/g, '/') : startDateFmt;
  const startDay = formatArabicDateWithDay(activity.start_date).split(' ')[0] || '';
  const othersText = otherLecturers.length > 0 ? otherLecturers.join('، ') : 'لا يوجد مشاركون آخرون (المحاضر المنفرد)';

  const applicableDocs = documents.filter(
    (d) =>
      d.applies_to === 'both' ||
      (activity.type === 'course' && d.applies_to === 'courses') ||
      (activity.type === 'workshop' && d.applies_to === 'workshops')
  );

  let docsText = '';
  if (applicableDocs.length > 0) {
    docsText = applicableDocs
      .map((d) => `• *${d.name}*${d.description ? ` (${d.description})` : ''}:\n  🔗 ${d.url}`)
      .join('\n\n');
  } else {
    docsText = 'لا توجد وثائق أو استمارات مطلوبة لهذا النشاط.';
  }

  let messageText = '';

  // إذا تم توفير قالب مخصص تم تعديله بواسطة المستخدم
  if (template?.body_html && template.body_html.trim().length > 50) {
    let customBody = template.body_html
      .replace(/{{اسم_المحاضر}}/g, lecturerName)
      .replace(/{{اللقب}}/g, lecturerTitle || '')
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
      .replace(/{{قائمة_النماذج}}/g, docsText);

    messageText = convertHtmlToWhatsApp(customBody);
  } else {
    // القالب الأكاديمي الرسمي المطابق تماماً لرسالة البريد الإلكتروني
    messageText = 
`*${settings.university_name}*
*${settings.college_name} - ${settings.center_name}*
────────────────────────
تحية طيبة سعادة *${lecturerTitle ? lecturerTitle + ' ' : ''}${lecturerName}* المحترم،

نود تذكيركم بموعد إقامة *${activityTypeLabel}* الموسوم:

« *${activity.title}* »

• *القسم العلمي:* ${activity.department}
• *تاريخ البدء:* ${startDay} ${startDateFmt}
• *تاريخ الانتهاء:* ${endDateFmt}
• *المكان / القاعة:* ${activity.location || 'القاعة المخصصة في الكلية'}
• *الوقت:* ${activity.start_time || '10:00 صباحاً'}
• *المحاضرون المشاركون:* ${othersText}

📋 *النماذج والوثائق المطلوب إكمالها:*
${docsText}

نرجو من سيادتكم الاطلاع وتجهيز المتطلبات في الموعد المحدد لضمان انسيابية العمل وتوثيق النشاط بالشكل الأصولي.
────────────────────────
مع التقدير والاعتزاز،
*إدارة ${settings.center_name}*
_${settings.college_name} - ${settings.university_name}_`;
  }

  const encoded = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encoded}`;

  return {
    text: messageText,
    recipientPhone: formattedPhone,
    recipientName: lecturerName,
    whatsappUrl,
  };
}
