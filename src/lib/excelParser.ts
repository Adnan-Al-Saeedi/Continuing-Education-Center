/**
 * معالج ملفات Excel وروابط الجداول السحابية (Google Sheets / CSV) للاستيراد والتصدير
 * Excel & Cloud Sheets Parser & Exporter using SheetJS (xlsx)
 */

import * as XLSX from 'xlsx';
import { Activity, Lecturer, DateConflictItem, ActivityType } from '../types';
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

/**
 * تحويل رابط مشاركة Google Sheets إلى رابط تصدير CSV مباشر
 */
export function formatGoogleSheetUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';

  const match = trimmed.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const id = match[1];
    const gidMatch = trimmed.match(/[#&?]gid=([0-9]+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
    return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv${gidParam}`;
  }
  return trimmed;
}

/**
 * معالجة كتاب عمل Excel أو بيانات جدولية محولة واستخراج الأنشطة
 */
export function parseActivitiesWorkbook(workbook: XLSX.WorkBook): ActivityImportResult {
  const activities: Activity[] = [];
  const conflicts: DateConflictItem[] = [];
  const errors: string[] = [];
  let coursesCount = 0;
  let workshopsCount = 0;

  const cleanKey = (key: string) => key.trim().replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');

  // فحص ما إذا كانت هناك أوراق منفصلة للدورات والورش
  const coursesSheetName = workbook.SheetNames.find(
    s => s.includes('دورة') || s.includes('دورات') || s.toLowerCase().includes('course')
  );
  const workshopsSheetName = workbook.SheetNames.find(
    s => s.includes('ورش') || s.includes('ورشة') || s.toLowerCase().includes('workshop')
  );

  const processSheetRows = (sheet: XLSX.WorkSheet, defaultType: 'course' | 'workshop' | 'auto') => {
    // قراءة شبكة الخلايا كمصفوفة ثنائية الأبعاد للكشف عن الترويسات المركبة
    const rawGrid: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    if (!rawGrid || rawGrid.length === 0) return;

    // البحث عن صف الترويسة الأفضل من أول 30 صفاً بنظام النقاط الذكي
    let headerIdx = -1;
    let bestScore = 0;
    const headerKeywords = [
      'عنوان النشاط', 'عنوان الدورة', 'عنوان الورشة', 'نوع النشاط', 'اسم النشاط',
      'عنوان', 'اسم الدورة', 'اسم الورشة', 'القسم', 'المحاضر', 'تاريخ', 'تنفيذ',
      'تخصص', 'مدة', 'تكلفة', 'كلفة', 'whatsapp', 'mail', 'هاتف', 'بريد', 'أيام'
    ];

    for (let i = 0; i < Math.min(30, rawGrid.length); i++) {
      const rowStr = rawGrid[i].map(c => String(c).trim().toLowerCase()).join(' ');
      let score = 0;
      headerKeywords.forEach(kw => {
        if (rowStr.includes(kw.toLowerCase())) score++;
      });
      if (score > bestScore) {
        bestScore = score;
        headerIdx = i;
      }
    }

    if (headerIdx === -1 || bestScore < 2) {
      headerIdx = 0;
    }

    const headerRow = rawGrid[headerIdx].map(c => String(c).trim());
    const nextRow = rawGrid[headerIdx + 1] ? rawGrid[headerIdx + 1].map(c => String(c).trim()) : [];
    const nextRowStr = nextRow.join(' ').toLowerCase();

    // فحص هل الصف التالي هو ترويسة فرعية مركبة (مثل Whats APP, E.Mail, من, الى)
    const isSubheader = 
      nextRowStr.includes('whats') || 
      nextRowStr.includes('mail') || 
      nextRowStr.includes('هاتف') || 
      nextRowStr.includes('من') || 
      nextRowStr.includes('الى') ||
      nextRowStr.includes('إلى') ||
      nextRowStr.includes('تخصص') ||
      nextRowStr.includes('دقيق');

    const dataStartIdx = isSubheader ? headerIdx + 2 : headerIdx + 1;

    // بناء خريطة الأعمدة مع دعم مطابقة العناوين
    const colMap: Record<number, string> = {};
    const maxCols = Math.max(headerRow.length, nextRow.length);

    for (let c = 0; c < maxCols; c++) {
      const h = headerRow[c] || '';
      const s = isSubheader ? (nextRow[c] || '') : '';
      const combined = (h + ' ' + s).trim().toLowerCase();

      if (combined.includes('عنوان') || combined.includes('اسم الدورة') || combined.includes('اسم الورشة') || combined.includes('اسم النشاط') || combined.includes('موضوع') || combined === 'النشاط' || combined.includes('title')) {
        colMap[c] = 'title';
      } else if (combined.includes('نوع') || combined === 'النوع' || combined.includes('type')) {
        colMap[c] = 'type';
      } else if (combined.includes('قسم') || combined.includes('الجهة') || combined.includes('dept')) {
        colMap[c] = 'department';
      } else if (
        combined.includes('تخصص النشاط') || 
        combined.includes('مجال') || 
        (combined.includes('تخصص') && !combined.includes('محاضر') && !combined.includes('دقيق'))
      ) {
        colMap[c] = 'specialty';
      } else if (combined.includes('مدة') || combined.includes('أيام') || combined.includes('ايام') || combined.includes('days')) {
        colMap[c] = 'duration';
      } else if (combined.includes('تكلفة') || combined.includes('كلفة') || combined.includes('أجور') || combined.includes('اجور') || combined.includes('رسوم') || combined.includes('cost')) {
        colMap[c] = 'cost';
      } else if (combined.includes('فئة') || combined.includes('مستهدف') || combined.includes('target') || combined.includes('audience')) {
        colMap[c] = 'target_audience';
      } else if (combined.includes('whats') || combined.includes('هاتف') || combined.includes('موبايل') || combined.includes('جوال') || combined.includes('phone') || combined.includes('mobile')) {
        colMap[c] = 'lecturer_whatsapp';
      } else if (combined.includes('mail') || combined.includes('بريد') || combined.includes('ايميل')) {
        colMap[c] = 'lecturer_email';
      } else if (combined.includes('دقيق') || (combined.includes('تخصص') && combined.includes('محاضر')) || combined.includes('لقب') || combined.includes('مرتبة')) {
        colMap[c] = 'lecturer_specialty';
      } else if (combined.includes('اسم المحاضر') || combined.includes('المحاضر') || combined.includes('تدريسي') || combined.includes('مدرب') || combined.includes('lecturer')) {
        colMap[c] = 'lecturer_name';
      } else if (s === 'من' || combined.includes('بدء') || combined.includes('من تاريخ') || combined.includes('تاريخ البدء') || (h.includes('تنفيذ') && !s) || (combined.includes('تاريخ') && !s && !combined.includes('انتهاء'))) {
        colMap[c] = 'start_date';
      } else if (s === 'الى' || s === 'إلى' || combined.includes('انتهاء') || combined.includes('الى تاريخ') || combined.includes('تاريخ الانتهاء') || combined.includes('إلى') || combined.includes('الى')) {
        colMap[c] = 'end_date';
      } else if (h === 'ت' || h.includes('تسلسل') || h === '#' || h.includes('الرقم') || h === 'no' || h === 'seq') {
        colMap[c] = 'seq';
      } else if (combined.includes('مكان') || combined.includes('قاعة') || combined.includes('location')) {
        colMap[c] = 'location';
      } else if (combined.includes('وقت') || combined.includes('ساعة') || combined.includes('time')) {
        colMap[c] = 'start_time';
      }
    }

    let lastActivity: Activity | null = null;

    for (let rowIndex = dataStartIdx; rowIndex < rawGrid.length; rowIndex++) {
      const row = rawGrid[rowIndex];
      if (!row || row.length === 0) continue;

      const rowData: Record<string, any> = {};
      row.forEach((val: any, cIdx: number) => {
        const fieldKey = colMap[cIdx];
        if (fieldKey) {
          rowData[fieldKey] = val;
        }
      });

      const title = String(rowData['title'] || '').trim();
      const lecturerName = String(rowData['lecturer_name'] || '').trim();
      const lecturerPhone = String(rowData['lecturer_whatsapp'] || '').trim();
      const lecturerEmail = String(rowData['lecturer_email'] || '').trim();
      const lecturerSpecialty = String(rowData['lecturer_specialty'] || '').trim();

      // سطر جديد يبدأ نشاطاً
      if (title) {
        let type: ActivityType = 'course';
        const rawType = String(rowData['type'] || '').trim().toLowerCase();

        if (defaultType === 'auto') {
          if (
            rawType.includes('ورش') || 
            rawType.includes('workshop') || 
            rawType.includes('ندوة') || 
            rawType.includes('حلقة') || 
            rawType.includes('سمينار') || 
            rawType.includes('seminar')
          ) {
            type = 'workshop';
          } else if (rawType.includes('دورة') || rawType.includes('course')) {
            type = 'course';
          } else {
            const rawDuration = String(rowData['duration'] || '').trim();
            if (rawDuration.includes('يوم واحد') || rawDuration === '1' || title.includes('ورشة') || title.includes('ندوة')) {
              type = 'workshop';
            } else {
              type = 'course';
            }
          }
        } else {
          type = defaultType;
        }

        const rawStart = rowData['start_date'];
        let rawEnd = rowData['end_date'];

        let startDate = parseDateToISO(rawStart);
        let endDate = parseDateToISO(rawEnd);

        // إذا كان حقل التاريخ يحوي مجالاً زمنياً مثل 2026/10/13 - 2026/10/15
        if (rawStart && typeof rawStart === 'string' && (rawStart.includes(' - ') || rawStart.includes(' – ') || rawStart.includes(' الى ') || rawStart.includes(' إلى '))) {
          const parts = rawStart.split(/\s*[-–]\s*|\s+إلى\s+|\s+الى\s+/);
          if (parts.length >= 2) {
            startDate = parseDateToISO(parts[0]) || startDate;
            endDate = parseDateToISO(parts[1]) || startDate;
          }
        }

        if (!endDate) {
          endDate = startDate;
        }

        // تاريخ افتراضي في حال خلو السجل لتفادي استبعاد أنشطة المستخدم الصالحة
        if (!startDate) {
          startDate = '2026-10-15';
          endDate = '2026-10-15';
        }

        const seq = rowData['seq'] ? String(rowData['seq']).trim() : String(activities.length + 1);
        const department = String(rowData['department'] || 'كلية البوليتكنك').trim();
        const specialty = String(rowData['specialty'] || '').trim() || undefined;
        const duration = String(rowData['duration'] || '').trim() || (type === 'course' ? '5 أيام' : '1 يوم');
        const cost = String(rowData['cost'] || '').trim() || (type === 'course' ? '25000' : 'مجاني');
        const targetAudience = String(rowData['target_audience'] || '').trim() || 'موظفين+تدريسيين';

        let dateFixed = false;
        const activityId = `${type}-${Date.now()}-${rowIndex}-${Math.random().toString(36).substr(2, 5)}`;

        if (isDateReversed(startDate, endDate)) {
          conflicts.push({
            activityId,
            title,
            type,
            department,
            originalStart: startDate,
            originalEnd: endDate,
            correctedStart: endDate,
            correctedEnd: startDate,
          });

          const temp = startDate;
          startDate = endDate;
          endDate = temp;
          dateFixed = true;
        }

        const parsedLecturers = splitLecturerNames(lecturerName);

        const newAct: Activity = {
          id: activityId,
          seq,
          type,
          raw_type: rawType || (type === 'course' ? 'دورة' : 'ورشة'),
          title,
          department,
          specialty,
          duration: duration ? duration + (duration.includes('يوم') ? '' : ' أيام') : undefined,
          cost,
          target_audience: targetAudience,
          lecturers_raw: lecturerName,
          start_date: startDate,
          end_date: endDate,
          location: String(rowData['location'] || '').trim() || 'القاعة المخصصة في الكلية',
          start_time: String(rowData['start_time'] || '').trim() || '10:00 صباحاً',
          notes: String(rowData['notes'] || '').trim() || undefined,
          date_fixed: dateFixed,
          parsed_lecturers: parsedLecturers,
          lecturer_name: lecturerName || undefined,
          lecturer_email: lecturerEmail || undefined,
          lecturer_phone: lecturerPhone || undefined,
          lecturer_title: lecturerSpecialty || undefined,
          lecturers_details: lecturerName ? [{
            name: lecturerName,
            phone: lecturerPhone || undefined,
            email: lecturerEmail || undefined,
            specialty: lecturerSpecialty || undefined,
          }] : []
        };

        activities.push(newAct);
        lastActivity = newAct;

        if (type === 'course') coursesCount++;
        else workshopsCount++;
      } else if (lecturerName && lastActivity) {
        // سطر تكميلي لمحاضر إضافي في نفس النشاط
        lastActivity.lecturers_raw += ' / ' + lecturerName;
        if (!lastActivity.parsed_lecturers) lastActivity.parsed_lecturers = [];
        lastActivity.parsed_lecturers.push(lecturerName);

        if (!lastActivity.lecturers_details) lastActivity.lecturers_details = [];
        lastActivity.lecturers_details.push({
          name: lecturerName,
          phone: lecturerPhone || undefined,
          email: lecturerEmail || undefined,
          specialty: lecturerSpecialty || undefined,
        });

        // إذا لم يكن لدى النشاط رقم هاتف أو بريد للمحاضر الأول، نأخذه من المحاضر الإضافي
        if (!lastActivity.lecturer_phone && lecturerPhone) {
          lastActivity.lecturer_phone = lecturerPhone;
        }
        if (!lastActivity.lecturer_email && lecturerEmail) {
          lastActivity.lecturer_email = lecturerEmail;
        }
      }
    }
  };

  if (coursesSheetName && workshopsSheetName && coursesSheetName !== workshopsSheetName) {
    processSheetRows(workbook.Sheets[coursesSheetName], 'course');
    processSheetRows(workbook.Sheets[workshopsSheetName], 'workshop');
  } else {
    const targetSheetName = coursesSheetName || workshopsSheetName || workbook.SheetNames[0];
    if (targetSheetName && workbook.Sheets[targetSheetName]) {
      processSheetRows(workbook.Sheets[targetSheetName], 'auto');
    }
    // في حال كانت الورقة الأولى فارغة، نفحص سائر أوراق الملف
    if (activities.length === 0) {
      for (const name of workbook.SheetNames) {
        if (name !== targetSheetName && workbook.Sheets[name]) {
          processSheetRows(workbook.Sheets[name], 'auto');
          if (activities.length > 0) break;
        }
      }
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

// 1. استيراد ومعالجة دليل النشاطات العلمية من ملف (File) مع دعم UTF-8 الكامل لملفات CSV وExcel
export async function parseActivitiesExcel(file: File): Promise<ActivityImportResult> {
  const isCsv = file.name.toLowerCase().endsWith('.csv') || file.type.includes('csv');
  let workbook: XLSX.WorkBook;
  if (isCsv) {
    const text = await file.text();
    workbook = XLSX.read(text, { type: 'string', cellDates: true });
  } else {
    const data = await file.arrayBuffer();
    workbook = XLSX.read(data, { type: 'array', cellDates: true, codepage: 65001 });
  }
  return parseActivitiesWorkbook(workbook);
}

// 2. استيراد ومعالجة دليل النشاطات من رابط مباشر أو Google Sheets مع دعم UTF-8
export async function fetchAndParseFromUrl(rawUrl: string): Promise<ActivityImportResult> {
  const exportUrl = formatGoogleSheetUrl(rawUrl);
  if (!exportUrl) {
    throw new Error('الرابط المدخل غير صالح. يرجى إدخال رابط جدول بيانات أو Google Sheets صحيح.');
  }

  try {
    const res = await fetch(exportUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain, */*'
      }
    });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('لم يتم العثور على الملف في الرابط المحدد (404). تأكد من صحة الرابط.');
      } else if (res.status === 401 || res.status === 403) {
        throw new Error('الملف مقيّد الوصول. يرجى جعل أذونات مشاركة Google Sheet على «أي شخص لديه الرابط يمكنه العرض Anyone with the link».');
      }
      throw new Error(`استجاب الخادم برمز الحالة: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type') || '';
    let workbook: XLSX.WorkBook;
    if (exportUrl.includes('format=csv') || contentType.includes('text') || contentType.includes('csv')) {
      const text = await res.text();
      workbook = XLSX.read(text, { type: 'string', cellDates: true });
    } else {
      const data = await res.arrayBuffer();
      workbook = XLSX.read(data, { type: 'array', cellDates: true, codepage: 65001 });
    }

    return parseActivitiesWorkbook(workbook);
  } catch (err: any) {
    if (err.message && err.message.includes('Failed to fetch')) {
      throw new Error('تعذر الوصول المباشر للرابط بسبب قيود المتصفح (CORS) أو انقطاع الاتصال. يمكنك تصدير الملف كـ CSV أو Excel ورفعه عبر زر «استيراد ملف Excel» أو التأكد من نشر الجدول للويب (Publish to the web).');
    }
    throw err;
  }
}

// 3. استيراد ومعالجة دليل البريد الإلكتروني للمحاضرين
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
    const specialty = String(cleanedRow['التخصص'] || cleanedRow['الاختصاص'] || '').trim() || undefined;

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
      specialty: specialty,
    });
  }

  return {
    lecturers,
    duplicates,
    invalidEmails,
    errors,
  };
}

// 4. تصدير قالب دليل النشاطات العلمية كملف Excel حقيقي بمطابقة عناوين الأعمدة الرسمية
export function downloadActivitiesTemplate() {
  const wb = XLSX.utils.book_new();

  // نموذج رسمي مطابق تماماً لمصدر بيانات الخطة المقترحة 2026-2027
  const activitiesSample = [
    {
      'ت': 1,
      'نوع النشاط': 'دورة',
      'عنوان النشاط': 'الابتكار في تقنيات الطاقة منخفضة الكاربون',
      'القسم': 'ميكانيك',
      'تخصص النشاط': 'هندسي',
      'المدة (بالأيام)': 5,
      'تكلفة النشاط': 25000,
      'الفئة المستهدفة': 'موظفين+تدريسيين',
      'اسم المحاضر': 'اوراس خضير عبيس',
      'Whats APP': '9647732311295',
      'E.Mail': 'malik.alhusayn.iba@atu.edu.iq',
      'التخصّص الدقيق للمحاضر': 'هندسة ميكانيك / حراريات',
      'تاريخ التنفيذ (من)': '2026/10/13',
      'تاريخ التنفيذ (الى)': '2026/10/15',
    },
    {
      'ت': '',
      'نوع النشاط': '',
      'عنوان النشاط': '',
      'القسم': '',
      'تخصص النشاط': '',
      'المدة (بالأيام)': '',
      'تكلفة النشاط': '',
      'الفئة المستهدفة': '',
      'اسم المحاضر': 'مالك عبد الحسين محسن',
      'Whats APP': '9647732311295',
      'E.Mail': 'malik.alhusayn.iba@atu.edu.iq',
      'التخصّص الدقيق للمحاضر': 'هندسة مواد/ معادن',
      'تاريخ التنفيذ (من)': '',
      'تاريخ التنفيذ (الى)': '',
    },
    {
      'ت': 2,
      'نوع النشاط': 'ورشة عمل',
      'عنوان النشاط': 'معايير النشر الرصين في مستوعبات Scopus وتفادي المجلات المفترسة',
      'القسم': 'شعبة التعليم المستمر',
      'تخصص النشاط': 'عام',
      'المدة (بالأيام)': 1,
      'تكلفة النشاط': 'مجاني',
      'الفئة المستهدفة': 'طلبة الدراسات العليا والتدريسيون',
      'اسم المحاضر': 'محمد نوري سعيد',
      'Whats APP': '9647801122334',
      'E.Mail': 'mohammed.nouri@atu.edu.iq',
      'التخصّص الدقيق للمحاضر': 'نظم الحاسبات والشبكات',
      'تاريخ التنفيذ (من)': '2026/10/25',
      'تاريخ التنفيذ (الى)': '2026/10/25',
    },
  ];

  const ws = XLSX.utils.json_to_sheet(activitiesSample);
  XLSX.utils.book_append_sheet(wb, ws, 'الخطة_المقترحة');
  XLSX.writeFile(wb, 'قالب_الخطة_المقترحة_كلية_البوليتكنك.xlsx');
}

// تصدير كافة الأنشطة الحالية إلى Excel بعناوين أعمدة مطابقة لمصدر البيانات
export function exportActivitiesToExcel(activities: Activity[]) {
  const wb = XLSX.utils.book_new();

  const exportRows: any[] = [];

  activities.forEach((act, idx) => {
    const rawDuration = act.duration ? String(act.duration).replace(/[^0-9]/g, '') : (act.type === 'course' ? '5' : '1');
    const rawCost = act.cost || (act.type === 'course' ? '25000' : 'مجاني');
    const rawType = act.raw_type || (act.type === 'course' ? 'دورة' : 'ورشة عمل');

    // إذا كانت هناك تفاصيل متعددة للمحاضرين
    if (act.lecturers_details && act.lecturers_details.length > 0) {
      act.lecturers_details.forEach((lec, lIdx) => {
        exportRows.push({
          'ت': lIdx === 0 ? (act.seq || idx + 1) : '',
          'نوع النشاط': lIdx === 0 ? rawType : '',
          'عنوان النشاط': lIdx === 0 ? act.title : '',
          'القسم': lIdx === 0 ? act.department : '',
          'تخصص النشاط': lIdx === 0 ? (act.specialty || '') : '',
          'المدة (بالأيام)': lIdx === 0 ? rawDuration : '',
          'تكلفة النشاط': lIdx === 0 ? rawCost : '',
          'الفئة المستهدفة': lIdx === 0 ? (act.target_audience || 'موظفين+تدريسيين') : '',
          'اسم المحاضر': lec.name,
          'Whats APP': lec.phone || (lIdx === 0 ? act.lecturer_phone : '') || '',
          'E.Mail': lec.email || (lIdx === 0 ? act.lecturer_email : '') || '',
          'التخصّص الدقيق للمحاضر': lec.specialty || (lIdx === 0 ? act.lecturer_title : '') || '',
          'تاريخ التنفيذ (من)': lIdx === 0 ? (act.start_date ? act.start_date.replace(/-/g, '/') : '') : '',
          'تاريخ التنفيذ (الى)': lIdx === 0 ? (act.end_date ? act.end_date.replace(/-/g, '/') : (act.start_date ? act.start_date.replace(/-/g, '/') : '')) : '',
        });
      });
    } else {
      exportRows.push({
        'ت': act.seq || idx + 1,
        'نوع النشاط': rawType,
        'عنوان النشاط': act.title,
        'القسم': act.department,
        'تخصص النشاط': act.specialty || '',
        'المدة (بالأيام)': rawDuration,
        'تكلفة النشاط': rawCost,
        'الفئة المستهدفة': act.target_audience || 'موظفين+تدريسيين',
        'اسم المحاضر': act.lecturer_name || act.lecturers_raw,
        'Whats APP': act.lecturer_phone || '',
        'E.Mail': act.lecturer_email || '',
        'التخصّص الدقيق للمحاضر': act.lecturer_title || '',
        'تاريخ التنفيذ (من)': act.start_date ? act.start_date.replace(/-/g, '/') : '',
        'تاريخ التنفيذ (الى)': act.end_date ? act.end_date.replace(/-/g, '/') : (act.start_date ? act.start_date.replace(/-/g, '/') : ''),
      });
    }
  });

  const ws = XLSX.utils.json_to_sheet(exportRows);
  XLSX.utils.book_append_sheet(wb, ws, 'الخطة_المقترحة');
  XLSX.writeFile(wb, `خطة_الأنشطة_المقترحة_${new Date().toISOString().split('T')[0]}.xlsx`);
}

// 5. تصدير قالب دليل البريد الإلكتروني للمحاضرين
export function downloadLecturersTemplate() {
  const wb = XLSX.utils.book_new();

  const lecturersData = [
    {
      'الاسم': 'محمد نوري سعيد',
      'اللقب العلمي': 'م.د.',
      'القسم': 'شعبة التعليم المستمر',
      'التخصص': 'هندسي - نظم الحوسبة وشبكات الحاسوب',
      'البريد الإلكتروني': 'mohammed.nouri@atu.edu.iq',
      'الهاتف': '07801122334',
    },
    {
      'الاسم': 'علاء حميد شريف',
      'اللقب العلمي': 'أ.د.',
      'القسم': 'قسم تقنيات الهندسة الكهربائية والقدرة',
      'التخصص': 'هندسي - شبكات القدرة والطاقات المتجددة',
      'البريد الإلكتروني': 'alaa.hameed@atu.edu.iq',
      'الهاتف': '07804561230',
    },
  ];

  const ws = XLSX.utils.json_to_sheet(lecturersData);
  XLSX.utils.book_append_sheet(wb, ws, 'المحاضرون');
  XLSX.writeFile(wb, 'دليل_المحاضرين_نموذج_كلية_البوليتكنك.xlsx');
}

// 6. تصدير سجل الإرسال إلى ملف Excel
export function exportSendLogToExcel(logs: any[]) {
  const wb = XLSX.utils.book_new();
  const exportData = logs.map((log, index) => ({
    'ت': index + 1,
    'اسم المحاضر': log.recipient_name,
    'البريد الإلكتروني': log.email,
    'رقم هاتف الواتساب': log.phone || '—',
    'النشاط العلمي': log.activity_title || '—',
    'نوع النشاط': log.activity_type === 'course' ? 'دورة' : (log.activity_type === 'workshop' ? 'ورشة' : '—'),
    'قناة الإرسال': log.channel === 'both' ? '📧 بريد + 💬 واتساب' : (log.channel === 'whatsapp' ? '💬 واتساب' : '📧 بريد إلكتروني'),
    'تاريخ الإرسال': log.sent_at ? new Date(log.sent_at).toLocaleString('ar-IQ') : '—',
    'حالة البريد': log.status === 'sent' ? 'نجح' : (log.status === 'failed' ? 'فشل' : 'معلّق'),
    'حالة الواتساب': log.whatsapp_status === 'sent' ? 'نجح' : (log.whatsapp_status === 'failed' ? 'فشل' : '—'),
    'نوع التذكير': log.reminder_type === 'first' ? 'التذكير الأول (7 أيام)' : (log.reminder_type === 'second' ? 'تذكير ثانٍ (يوم واحد)' : 'يدوي'),
    'سبب الخطأ (إن وجد)': log.error || '—',
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, ws, 'سجل_الإرسال');
  XLSX.writeFile(wb, `سجل_إرسال_التذكيرات_${new Date().toISOString().split('T')[0]}.xlsx`);
}
