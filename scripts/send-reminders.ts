/**
 * سكربت الإرسال اليومي لتذكيرات النشاطات العلمية
 * Digital Assistant Daily Reminder Script
 * يُشغّل يومياً عبر GitHub Actions الساعة 08:00 صباحاً بتوقيت بغداد (05:00 UTC)
 */

import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// التحقق من المتغيرات البيئية الإلزامية
const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  SMTP_HOST = 'smtp.gmail.com',
  SMTP_PORT = '465',
  SMTP_USER,
  SMTP_PASS,
} = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ خطأ: المتغيرات البيئية لـ Supabase غير مكتملة (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)');
  process.exit(1);
}

if (!SMTP_USER || !SMTP_PASS) {
  console.error('❌ خطأ: بيانات خادم البريد SMTP غير مكتملة (SMTP_USER, SMTP_PASS)');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// إعداد خادم النقل البريدي
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT, 10),
  secure: parseInt(SMTP_PORT, 10) === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// دالة تأخير زمني (2 ثانية) لتجنب الحظر واحترام حدود خادم البريد
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// توحيد الحروف العربية للمطابقة الذكية
function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F\u0670]/g, '') // إزالة التشكيل
    .replace(/ـ/g, '') // إزالة التطويل
    .replace(/\b(د|م|ا\.د|أ\.د|م\.د|أ\.م\.د|ا\.م\.د|م\.م|المهندس|الدكتور|الدكتورة|الاستاذ|الأستاذ)\.?\s+/g, '') // إزالة الألقاب
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// استخراج تاريخ اليوم بتوقيت بغداد (Asia/Baghdad)
function getBaghdadDate(offsetDays = 0): string {
  const now = new Date();
  // تحويل إلى توقيت بغداد (UTC+3)
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const baghdadTime = new Date(utc + 3 * 3600000);
  baghdadTime.setDate(baghdadTime.getDate() + offsetDays);
  return baghdadTime.toISOString().split('T')[0];
}

// صياغة التاريخ واليوم بالعربية
function formatArabicDate(dateStr: string): { dateFormatted: string; dayName: string } {
  try {
    const d = new Date(dateStr);
    const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const dayName = dayNames[d.getDay()] || '';
    const dateFormatted = dateStr.replace(/-/g, '/');
    return { dateFormatted, dayName };
  } catch {
    return { dateFormatted: dateStr, dayName: '' };
  }
}

interface SummaryReport {
  sentCount: number;
  failedCount: number;
  missingEmailCount: number;
  skippedCount: number;
  missingLecturers: Array<{ name: string; activityTitle: string; department: string }>;
  sentLecturers: Array<{ name: string; email: string; activityTitle: string }>;
  failedLecturers: Array<{ name: string; email: string; activityTitle: string; error: string }>;
}

async function run() {
  console.log('🚀 بدء تشغيل المساعد الرقمي لإرسال التذكيرات...');

  // 1. جلب الإعدادات
  const { data: settings, error: settingsError } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single();

  if (settingsError || !settings) {
    console.error('❌ تعذر قراءة الإعدادات من قاعدة البيانات:', settingsError);
    process.exit(1);
  }

  const daysBefore = settings.days_before || 7;
  const targetDate = getBaghdadDate(daysBefore);
  const todayDate = getBaghdadDate(0);

  console.log(`📅 تاريخ اليوم (بغداد): ${todayDate}`);
  console.log(`🎯 التاريخ المستهدف (+${daysBefore} أيام): ${targetDate}`);

  // 2. جلب قالب البريد
  const { data: template } = await supabase
    .from('email_template')
    .select('*')
    .limit(1)
    .single();

  // 3. جلب جميع المحاضرين والأسماء البديلة
  const { data: lecturers = [] } = await supabase.from('lecturers').select('*');
  const { data: aliases = [] } = await supabase.from('name_aliases').select('*');
  const aliasMap = new Map<string, string>();
  aliases?.forEach((a) => aliasMap.set(normalizeArabic(a.raw_name), a.lecturer_id));

  // 4. جلب النماذج والوثائق
  const { data: documents = [] } = await supabase.from('documents').select('*');

  // 5. جلب النشاطات التي تستحق الإرسال (تاريخ بدئها = التاريخ المستهدف، أو التي فاتت ولم تبدأ بعد)
  const { data: activities, error: actError } = await supabase
    .from('activities')
    .select('*')
    .gte('start_date', todayDate)
    .lte('start_date', targetDate);

  if (actError) {
    console.error('❌ تعذر جلب النشاطات:', actError);
    process.exit(1);
  }

  console.log(`📋 عدد النشاطات المشمولة في النطاق الزمني: ${activities?.length || 0}`);

  const report: SummaryReport = {
    sentCount: 0,
    failedCount: 0,
    missingEmailCount: 0,
    skippedCount: 0,
    missingLecturers: [],
    sentLecturers: [],
    failedLecturers: [],
  };

  for (const activity of activities || []) {
    const isTargetDay = activity.start_date === targetDate;
    const isCatchUp = activity.start_date < targetDate && activity.start_date >= todayDate;

    // تقسيم أسماء المحاضرين
    const rawNames = activity.lecturers_raw
      .split(/[/,،]+/)
      .map((n: string) => n.trim())
      .filter((n: string) => n.length > 0);

    const docList = (documents || []).filter(
      (d) => d.applies_to === 'both' || (activity.type === 'course' && d.applies_to === 'courses') || (activity.type === 'workshop' && d.applies_to === 'workshops')
    );

    for (const rawName of rawNames) {
      const normalizedRaw = normalizeArabic(rawName);

      // البحث عن المحاضر إما بالاسم البديل أو المطابقة المباشرة
      let matchedLecturer = null;
      if (aliasMap.has(normalizedRaw)) {
        const lecturerId = aliasMap.get(normalizedRaw);
        matchedLecturer = lecturers?.find((l) => l.id === lecturerId);
      }

      if (!matchedLecturer) {
        matchedLecturer = lecturers?.find(
          (l) => l.normalized_name === normalizedRaw || normalizeArabic(l.full_name) === normalizedRaw
        );
      }

      if (!matchedLecturer || !matchedLecturer.email) {
        report.missingEmailCount++;
        report.missingLecturers.push({
          name: rawName,
          activityTitle: activity.title,
          department: activity.department,
        });
        console.warn(`⚠️ محاضر بلا بريد: ${rawName} في النشاط «${activity.title}»`);
        continue;
      }

      // التحقق هل تم الإرسال سابقاً لهذا المحاضر عن هذا النشاط
      const { data: existingLog } = await supabase
        .from('send_log')
        .select('id')
        .eq('activity_id', activity.id)
        .eq('lecturer_id', matchedLecturer.id)
        .eq('reminder_type', 'first')
        .eq('status', 'sent')
        .maybeSingle();

      if (existingLog) {
        report.skippedCount++;
        continue;
      }

      // بناء قائمة المحاضرين المشاركين (الزملاء عدا الحالي)
      const otherLecturers = rawNames.filter((n: string) => n !== rawName).join('، ') || 'لا يوجد مشاركون آخرون';

      // بناء قائمة النماذج
      let docsHtml = '';
      if (docList.length > 0) {
        docsHtml = `<ul style="margin: 8px 0; padding-right: 20px; font-size: 14px; color: #1e293b;">` +
          docList.map((d) => `
            <li style="margin-bottom: 6px;">
              <strong>${d.name}</strong> ${d.description ? `(${d.description})` : ''} - 
              <a href="${d.url}" style="color: #047857; text-decoration: underline;" target="_blank">تحميل / فتح النموذج</a>
            </li>
          `).join('') + `</ul>`;
      } else {
        docsHtml = '<p style="font-size: 14px; color: #64748b; margin: 6px 0;">لا توجد نماذج مرفقة مطلوبة لهذا النشاط.</p>';
      }

      const { dateFormatted: startDateFmt, dayName: startDay } = formatArabicDate(activity.start_date);
      const { dateFormatted: endDateFmt } = formatArabicDate(activity.end_date);

      // استبدال المتغيرات في القالب
      const activityTypeLabel = activity.type === 'course' ? 'الدورة التدريبية' : 'ورشة العمل';

      let body = template?.body_html || '';
      body = body
        .replace(/{{اسم_المحاضر}}/g, matchedLecturer.full_name)
        .replace(/{{اللقب}}/g, matchedLecturer.title || '')
        .replace(/{{نوع_النشاط}}/g, activityTypeLabel)
        .replace(/{{عنوان_النشاط}}/g, activity.title)
        .replace(/{{القسم}}/g, activity.department)
        .replace(/{{تاريخ_البدء}}/g, startDateFmt)
        .replace(/{{تاريخ_الانتهاء}}/g, endDateFmt)
        .replace(/{{يوم_البدء}}/g, startDay)
        .replace(/{{المكان}}/g, activity.location || 'يُحدد لاحقاً في الكلية')
        .replace(/{{الوقت}}/g, activity.start_time || '10:00 صباحاً')
        .replace(/{{المحاضرون_المشاركون}}/g, otherLecturers)
        .replace(/{{اسم_الجامعة}}/g, settings.university_name)
        .replace(/{{اسم_الكلية}}/g, settings.college_name)
        .replace(/{{اسم_المركز}}/g, settings.center_name)
        .replace(/{{قائمة_النماذج}}/g, docsHtml);

      let subject = template?.subject || 'تذكير: {{نوع_النشاط}} «{{عنوان_النشاط}}» بتاريخ {{تاريخ_البدء}}';
      subject = subject
        .replace(/{{نوع_النشاط}}/g, activityTypeLabel)
        .replace(/{{عنوان_النشاط}}/g, activity.title)
        .replace(/{{تاريخ_البدء}}/g, startDateFmt);

      try {
        console.log(`✉️ جارٍ إرسال البريد إلى: ${matchedLecturer.full_name} (${matchedLecturer.email})...`);

        await transporter.sendMail({
          from: `"${settings.sender_name}" <${SMTP_USER}>`,
          to: matchedLecturer.email,
          replyTo: settings.reply_to,
          subject,
          html: body,
        });

        // تسجيل النجاح في send_log
        await supabase.from('send_log').insert({
          activity_id: activity.id,
          lecturer_id: matchedLecturer.id,
          recipient_name: matchedLecturer.full_name,
          email: matchedLecturer.email,
          reminder_type: 'first',
          status: 'sent',
          attempts: 1,
        });

        report.sentCount++;
        report.sentLecturers.push({
          name: matchedLecturer.full_name,
          email: matchedLecturer.email,
          activityTitle: activity.title,
        });

        console.log(`✅ تم الإرسال بنجاح إلى: ${matchedLecturer.full_name}`);
        // انتظار ثانيتين بين كل رسالة
        await sleep(2000);
      } catch (err: any) {
        console.error(`❌ فشل الإرسال إلى ${matchedLecturer.email}:`, err.message);

        await supabase.from('send_log').insert({
          activity_id: activity.id,
          lecturer_id: matchedLecturer.id,
          recipient_name: matchedLecturer.full_name,
          email: matchedLecturer.email,
          reminder_type: 'first',
          status: 'failed',
          error: err.message,
          attempts: 1,
        });

        report.failedCount++;
        report.failedLecturers.push({
          name: matchedLecturer.full_name,
          email: matchedLecturer.email,
          activityTitle: activity.title,
          error: err.message,
        });
      }
    }
  }

  // 6. إرسال الملخص اليومي إلى بريد مسؤول النظام
  const adminRecipient = settings.admin_email || SMTP_USER;
  console.log(`📊 إرسال التقرير اليومي إلى مسؤول النظام (${adminRecipient})...`);

  const summarySubject = `تقرير التذكيرات اليومية - ${todayDate} (تم إرسال ${report.sentCount}، فشل ${report.failedCount}، بلا بريد ${report.missingEmailCount})`;
  const summaryHtml = `
    <div dir="rtl" style="font-family: Arial, Tahoma, sans-serif; line-height: 1.8; color: #1e293b; max-width: 650px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #047857; margin-top: 0;">ملخص تشغيل المساعد الرقمي لمركز التعليم المستمر</h2>
      <p style="color: #64748b;">تاريخ التشغيل: ${todayDate} | النطاق المستهدف: حتى ${targetDate}</p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #f1f5f9;">
          <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: right;">الحالة</th>
          <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: right;">العدد</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #cbd5e1; color: #047857; font-weight: bold;">الرسائل المرسلة بنجاح</td>
          <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">${report.sentCount}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #cbd5e1; color: #b91c1c;">الرسائل الفاشلة</td>
          <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">${report.failedCount}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #cbd5e1; color: #d97706;">محاضرون لم يُعثر على بريد لهم</td>
          <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">${report.missingEmailCount}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #cbd5e1; color: #64748b;">تم تخطيها (أُرسلت مسبقاً)</td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;">${report.skippedCount}</td>
        </tr>
      </table>

      ${
        report.missingLecturers.length > 0
          ? `<h3 style="color: #d97706; margin-bottom: 8px;">⚠️ قائمة المحاضرين غير المعثور على بريد لهم:</h3>
             <ul style="padding-right: 20px; font-size: 14px;">
               ${report.missingLecturers
                 .map((m) => `<li><strong>${m.name}</strong> - نشاط: «${m.activityTitle}» (قسم ${m.department})</li>`)
                 .join('')}
             </ul>
             <p style="font-size: 13px; color: #64748b;">يرجى الدخول إلى شاشة «المحاضرون» في لوحة التحكم لربط هذه الأسماء بالبريد الإلكتروني.</p>`
          : ''
      }

      ${
        report.failedLecturers.length > 0
          ? `<h3 style="color: #b91c1c; margin-bottom: 8px;">❌ الرسائل الفاشلة:</h3>
             <ul style="padding-right: 20px; font-size: 14px;">
               ${report.failedLecturers
                 .map((f) => `<li><strong>${f.name}</strong> (${f.email}) - سبب الفشل: ${f.error}</li>`)
                 .join('')}
             </ul>`
          : ''
      }

      <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #94a3b8;">
        تم توليد هذه الرسالة آلياً بواسطة المساعد الرقمي لمركز التعليم المستمر.
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"${settings.sender_name}" <${SMTP_USER}>`,
      to: adminRecipient,
      subject: summarySubject,
      html: summaryHtml,
    });
    console.log('✅ تم إرسال التقرير اليومي إلى المسؤول بنجاح.');
  } catch (err: any) {
    console.error('❌ تعذر إرسال التقرير اليومي للمسؤول:', err.message);
  }

  console.log('🏁 اكتمل تنفيذ مهام الإرسال اليومي.');
}

run().catch((err) => {
  console.error('💥 خطأ غير متوقع أثناء التنفيذ:', err);
  process.exit(1);
});
