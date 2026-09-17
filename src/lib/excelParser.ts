/**
 * معالج ملفات Excel للاستيراد والتصدير
 * Excel Parser & Exporter using SheetJS (xlsx)
 */

import * as XLSX from 'xlsx';
import { Activity, Lecturer, DateConflictItem } from '../types';
import { parseDateToISO, normalizeArabic, splitLecturerNames, isDateReversed } from './arabicUtils';

export interface ActivityImportResult {
  activities: Activity[];
  conflicts: DateConflictItem[];
  coursesCount: number;
  workshopsCount: number;
  errors: string[];
}

export interface LecturerImportResult {
  lecturers: Lecturer[];
  duplicates: string[];
  invalidEmails: string[];
  errors: string[];
}

// 1. استيراد ومعالجة دليل النشاطات العلمية (الدورات والورش)
export async function parseActivitiesExcel(file: File): Promise<ActivityImportResult> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array', cellDates: true });

  const activities: Activity[] = [];
  const conflicts: DateConflictItem[] = [];
  const errors: string[] = [];
  let coursesCount = 0;
  let workshopsCount = 0;

  // البحث عن ورقة الدورات
  const coursesSheetName = workbook.SheetNames.find(
    s => s.includes('دورة') || s.includes('دورات') || s.toLowerCase().includes('course')
  );

  // البحث عن ورقة الورش
  const workshopsSheetName = workbook.SheetNames.find(
    s => s.includes('ورش') || s.includes('ورشة') || s.toLowerCase().includes('workshop')
  );

  if (!coursesSheetName && !workshopsSheetName) {
    // إذا لم تُسمَّ الأوراق، نستخدم الورقة الأولى كدورات والثانية كورش إن وُجدت
    if (workbook.SheetNames.length === 1) {
      errors.push('تنبيه: تم اعتماد الورقة الأولى للأنشطة. يفضل تسمية الأوراق «الدورات» و«الورش».');
    }
  }

  // دالة مساعدة لتنظيف مفاتيح الأعمدة
  const cleanKey = (key: string) => key.trim().replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');

  // معالجة ورقة الدورات
  const sheetToProcessCourses = coursesSheetName || workbook.SheetNames[0];
  if (sheetToProcessCourses) {
    const sheet = workbook.Sheets[sheetToProcessCourses];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const cleanedRow: Record<string, any> = {};
      Object.keys(row).forEach(k => {
        cleanedRow[cleanKey(k)] = row[k];
      });

      // استخراج الحقول بغض النظر عن الاختلافات الطفيفة في التسميات
      const title = cleanedRow['عنوان النشاط'] || cleanedRow['عنوان الدورة'] || cleanedRow['العنوان'] || cleanedRow['النشاط'] || '';
      if (!title || String(title).trim() === '') continue;

      const department = cleanedRow['القسم'] || cleanedRow['القسم العلمي'] || cleanedRow['الجهة'] || 'عام';
      const lecturersRaw = String(cleanedRow['اسم المحاضر (الأصيل حصراً)'] || cleanedRow['اسم المحاضر'] || cleanedRow['المحاضر'] || cleanedRow['المحاضرين'] || '').trim();

      const rawStart = cleanedRow['تاريخ البدء'] || cleanedRow['تاريخ بدء الدورة'] || cleanedRow['من تاريخ'] || cleanedRow['البدء'];
      const rawEnd = cleanedRow['تاريخ الانتهاء'] || cleanedRow['تاريخ انتهاء الدورة'] || cleanedRow['إلى تاريخ'] || cleanedRow['الانتهاء'];

      let startDate = parseDateToISO(rawStart);
      let endDate = parseDateToISO(rawEnd) || startDate;

      if (!startDate) {
        errors.push(`تخطي دورة «${title}»: لم يتم العثور على تاريخ بدء صالح.`);
        continue;
      }

      // فحص التاريخ المعكوس
      let dateFixed = false;
      const activityId = `course-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 5)}`;

      if (isDateReversed(startDate, endDate)) {
        // تاريخ البدء بعد الانتهاء
        conflicts.push({
          activityId,
          title,
          type: 'course',
          department,
          originalStart: startDate,
          originalEnd: endDate,
          correctedStart: endDate,
          correctedEnd: startDate,
        });

        // افتراضياً نعتمد التاريخ الأقدم كتاريخ للبدء لحين تأكيد المستخدم
        const temp = startDate;
        startDate = endDate;
        endDate = temp;
        dateFixed = true;
      }

      const parsedLecturers = splitLecturerNames(lecturersRaw);

      activities.push({
        id: activityId,
        type: 'course',
        title: String(title).trim(),
        department: String(department).trim(),
        lecturers_raw: lecturersRaw,
        start_date: startDate,
        end_date: endDate,
        location: String(cleanedRow['المكان'] || cleanedRow['القاعة'] || '').trim() || undefined,
        start_time: String(cleanedRow['وقت البدء'] || cleanedRow['الوقت'] || '').trim() || undefined,
        duration: String(cleanedRow['المدة'] || '').trim() || undefined,
        target_audience: String(cleanedRow['الفئة المستهدفة'] || '').trim() || undefined,
        notes: String(cleanedRow['ملاحظات'] || '').trim() || undefined,
        date_fixed: dateFixed,
        parsed_lecturers: parsedLecturers,
      });

      coursesCount++;
    }
  }

  // معالجة ورقة الورش
  const sheetToProcessWorkshops = workshopsSheetName || (workbook.SheetNames.length > 1 ? workbook.SheetNames[1] : null);
  if (sheetToProcessWorkshops && sheetToProcessWorkshops !== sheetToProcessCourses) {
    const sheet = workbook.Sheets[sheetToProcessWorkshops];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const cleanedRow: Record<string, any> = {};
      Object.keys(row).forEach(k => {
        cleanedRow[cleanKey(k)] = row[k];
      });

      const title = cleanedRow['عنوان الورشة'] || cleanedRow['عنوان النشاط'] || cleanedRow['العنوان'] || cleanedRow['الورشة'] || '';
      if (!title || String(title).trim() === '') continue;

      const department = cleanedRow['القسم'] || cleanedRow['القسم العلمي'] || cleanedRow['الجهة'] || 'عام';
      const lecturersRaw = String(cleanedRow['اسم المحاضر'] || cleanedRow['المحاضر'] || cleanedRow['المحاضرين'] || '').trim();

      const rawStart = cleanedRow['تاريخ بدء الورشة'] || cleanedRow['تاريخ البدء'] || cleanedRow['التاريخ'] || cleanedRow['تاريخ الورشة'];
      const startDate = parseDateToISO(rawStart);
      const endDate = parseDateToISO(cleanedRow['تاريخ الانتهاء']) || startDate;

      if (!startDate) {
        errors.push(`تخطي ورشة «${title}»: لم يتم العثور على تاريخ صالح.`);
        continue;
      }

      const activityId = `workshop-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 5)}`;
      const parsedLecturers = splitLecturerNames(lecturersRaw);

      activities.push({
        id: activityId,
        type: 'workshop',
        title: String(title).trim(),
        department: String(department).trim(),
        lecturers_raw: lecturersRaw,
        start_date: startDate,
        end_date: endDate,
        location: String(cleanedRow['المكان'] || cleanedRow['القاعة'] || '').trim() || undefined,
        start_time: String(cleanedRow['وقت البدء'] || cleanedRow['الوقت'] || '').trim() || undefined,
        duration: String(cleanedRow['المدة'] || 'يوم واحد').trim() || undefined,
        target_audience: String(cleanedRow['الفئة المستهدفة'] || '').trim() || undefined,
        notes: String(cleanedRow['ملاحظات'] || '').trim() || undefined,
        date_fixed: false,
        parsed_lecturers: parsedLecturers,
      });

      workshopsCount++;
    }
  }

  return {
    activities,
    conflicts,
    coursesCount,
    workshopsCount,
    errors,
  };
}

// 2. استيراد ومعالجة دليل البريد الإلكتروني للمحاضرين
export async function parseLecturersExcel(file: File): Promise<LecturerImportResult> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  const lecturers: Lecturer[] = [];
  const duplicates: string[] = [];
  const invalidEmails: string[] = [];
  const errors: string[] = [];
  const seenEmails = new Set<string>();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleanKey = (key: string) => key.trim().replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    const cleanedRow: Record<string, any> = {};
    Object.keys(row).forEach(k => {
      cleanedRow[cleanKey(k)] = row[k];
    });

    const fullName = String(cleanedRow['الاسم'] || cleanedRow['الاسم الكامل'] || cleanedRow['اسم التدريسي'] || '').trim();
    if (!fullName) continue;

    const email = String(cleanedRow['البريد الإلكتروني'] || cleanedRow['البريد الالكتروني'] || cleanedRow['الايميل'] || cleanedRow['Email'] || '').trim();
    const department = String(cleanedRow['القسم'] || cleanedRow['القسم العلمي'] || 'عام').trim();
    const title = String(cleanedRow['اللقب العلمي'] || cleanedRow['اللقب'] || cleanedRow['المرتبة'] || '').trim();
    const phone = String(cleanedRow['الهاتف'] || cleanedRow['رقم الهاتف'] || cleanedRow['الموبايل'] || '').trim();

    if (!email || !emailRegex.test(email)) {
      invalidEmails.push(`${fullName} (${email || 'فارغ'})`);
      continue;
    }

    const lowerEmail = email.toLowerCase();
    if (seenEmails.has(lowerEmail)) {
      duplicates.push(`${fullName} (${email})`);
      continue;
    }

    seenEmails.add(lowerEmail);

    lecturers.push({
      id: `lecturer-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 5)}`,
      full_name: fullName,
      normalized_name: normalizeArabic(fullName),
      title: title || undefined,
      department: department,
      email: lowerEmail,
      phone: phone || undefined,
    });
  }

  return {
    lecturers,
    duplicates,
    invalidEmails,
    errors,
  };
}

// 3. تصدير قالب دليل النشاطات العلمية كملف Excel حقيقي
export function downloadActivitiesTemplate() {
  const wb = XLSX.utils.book_new();

  // ورقة الدورات
  const coursesData = [
    {
      'ت': 1,
      'عنوان النشاط': 'تطبيقات الذكاء الاصطناعي في التعليم الجامعي',
      'القسم': 'قسم هندسة تقنيات الحاسوب',
      'اسم المحاضر (الأصيل حصراً)': 'م.د. أحمد كاظم جواد / م.م. سارة علي',
      'تاريخ البدء': '2026/10/18',
      'تاريخ الانتهاء': '2026/10/22',
      'المكان': 'مختبر الحاسوب المركزي',
      'وقت البدء': '10:00 صباحاً',
      'المدة': '5 أيام',
      'الفئة المستهدفة': 'التدريسيون والباحثون',
      'ملاحظات': '',
    },
    {
      'ت': 2,
      'عنوان النشاط': 'السلامة المهنية وإدارة المخاطر في المختبرات',
      'القسم': 'قسم التقنيات الميكانيكية',
      'اسم المحاضر (الأصيل حصراً)': 'أ.م.د. علي حسين العبيدي',
      'تاريخ البدء': '2026/11/01',
      'تاريخ الانتهاء': '2026/11/05',
      'المكان': 'قاعة السلامة العامة',
      'وقت البدء': '09:30 صباحاً',
      'المدة': '5 أيام',
      'الفئة المستهدفة': 'مسؤولو المختبرات الهندسية',
      'ملاحظات': '',
    },
  ];

  // ورقة الورش
  const workshopsData = [
    {
      'ت': 1,
      'عنوان الورشة': 'استخدام منصات النشر العلمي ومعايير Scopus',
      'القسم': 'قسم هندسة البناء والإنشاءات',
      'اسم المحاضر': 'أ.د. حسن مجيد كريم',
      'تاريخ بدء الورشة': '2026/10/25',
      'المكان': 'قاعة المؤتمرات الكبرى',
      'وقت البدء': '11:00 صباحاً',
      'المدة': 'يوم واحد',
      'الفئة المستهدفة': 'طلبة الدراسات العليا والتدريسيون',
      'ملاحظات': '',
    },
  ];

  const wsCourses = XLSX.utils.json_to_sheet(coursesData);
  const wsWorkshops = XLSX.utils.json_to_sheet(workshopsData);

  XLSX.utils.book_append_sheet(wb, wsCourses, 'الدورات');
  XLSX.utils.book_append_sheet(wb, wsWorkshops, 'الورش');

  XLSX.writeFile(wb, 'دليل_النشاطات_العلمية_نموذج.xlsx');
}

// 4. تصدير قالب دليل البريد الإلكتروني للمحاضرين
export function downloadLecturersTemplate() {
  const wb = XLSX.utils.book_new();

  const lecturersData = [
    {
      'الاسم': 'أحمد كاظم جواد',
      'اللقب العلمي': 'م.د.',
      'القسم': 'قسم هندسة تقنيات الحاسوب',
      'البريد الإلكتروني': 'a.kadhim@atu.edu.iq',
      'الهاتف': '07701234567',
    },
    {
      'الاسم': 'سارة علي حسن',
      'اللقب العلمي': 'م.م.',
      'القسم': 'قسم هندسة تقنيات الحاسوب',
      'البريد الإلكتروني': 's.ali@atu.edu.iq',
      'الهاتف': '07801234567',
    },
    {
      'الاسم': 'علي حسين العبيدي',
      'اللقب العلمي': 'أ.م.د.',
      'القسم': 'قسم التقنيات الميكانيكية',
      'البريد الإلكتروني': 'ali.h@atu.edu.iq',
      'الهاتف': '07709876543',
    },
    {
      'الاسم': 'حسن مجيد كريم',
      'اللقب العلمي': 'أ.د.',
      'القسم': 'قسم هندسة البناء والإنشاءات',
      'البريد الإلكتروني': 'hassan.m@atu.edu.iq',
      'الهاتف': '07501122334',
    },
  ];

  const ws = XLSX.utils.json_to_sheet(lecturersData);
  XLSX.utils.book_append_sheet(wb, ws, 'المحاضرون');
  XLSX.writeFile(wb, 'دليل_البريد_الإلكتروني_للمحاضرين_نموذج.xlsx');
}

// 5. تصدير سجل الإرسال إلى ملف Excel
export function exportSendLogToExcel(logs: any[]) {
  const wb = XLSX.utils.book_new();
  const exportData = logs.map((log, index) => ({
    'ت': index + 1,
    'اسم المحاضر': log.recipient_name,
    'البريد الإلكتروني': log.email,
    'النشاط العلمي': log.activity_title || '—',
    'نوع النشاط': log.activity_type === 'course' ? 'دورة' : (log.activity_type === 'workshop' ? 'ورشة' : '—'),
    'تاريخ الإرسال': log.sent_at ? new Date(log.sent_at).toLocaleString('ar-IQ') : '—',
    'الحالة': log.status === 'sent' ? 'نجح' : (log.status === 'failed' ? 'فشل' : 'معلّق'),
    'نوع التذكير': log.reminder_type === 'first' ? 'التذكير الأول (7 أيام)' : (log.reminder_type === 'second' ? 'تذكير ثانٍ (يوم واحد)' : 'يدوي'),
    'سبب الخطأ (إن وجد)': log.error || '—',
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, ws, 'سجل_الإرسال');
  XLSX.writeFile(wb, `سجل_إرسال_التذكيرات_${new Date().toISOString().split('T')[0]}.xlsx`);
}
