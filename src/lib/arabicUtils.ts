/**
 * أدوات المعالجة الذكية للنصوص العربية وتطبيع الأسماء
 * Arabic Text Processing & Fuzzy Name Matching Utilities
 */

// 1. إزالة التشكيل والتطويل والألقاب وتوحيد الأحرف العربية
export function normalizeArabic(text: string): string {
  if (!text) return '';

  return text
    // إزالة التشكيل (الحركات)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // إزالة التطويل (الكشيدة)
    .replace(/ـ+/g, '')
    // توحيد الهمزات والألف
    .replace(/[أإآء]/g, 'ا')
    // توحيد التاء المربوطة
    .replace(/ة/g, 'ه')
    // توحيد الألف المقصورة والياء
    .replace(/ى/g, 'ي')
    // إزالة الألقاب الأكاديمية والمهنية الشائعة في الجامعات العراقية
    .replace(/\b(أ\.د|ا\.د|أ\.م\.د|ا\.م\.د|م\.د|م\.م|م|د|المهندس|المهندسة|الدكتور|الدكتورة|الاستاذ|الأستاذ|السيد|السيدة)\.?\s+/gi, '')
    // إزالة علامات الترقيم والأقواس
    .replace(/[()\[\]{}.,:;،؛\/\\_]/g, ' ')
    // توحيد المسافات
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// 2. تقسيم أسماء المحاضرين من حقل نصي واحد (قد يفصل بينها / أو ، أو و أو سطر جديد)
export function splitLecturerNames(rawText: string): string[] {
  if (!rawText) return [];

  // تقسيم بالنص / أو ، أو , أو ؛
  const segments = rawText.split(/[\/\n,،؛]+/);

  const results: string[] = [];
  for (const seg of segments) {
    const trimmed = seg.trim();
    if (!trimmed) continue;

    // التحقق إن كان هناك " و " فاصلة بين اسمين مركبين
    // نتجنب تقسيم الأسماء مثل "عبد الوهاب" أو "نور الهدى"
    if (/\s+و\s+/.test(trimmed) && !trimmed.includes('عبد الوهاب') && !trimmed.includes('ضياء الدين')) {
      const subParts = trimmed.split(/\s+و\s+/);
      for (const sp of subParts) {
        if (sp.trim()) results.push(sp.trim());
      }
    } else {
      results.push(trimmed);
    }
  }

  return results;
}

// 3. حساب المسافة اللغوية (Levenshtein Distance)
export function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // حذف
          dp[i][j - 1] + 1,    // إضافة
          dp[i - 1][j - 1] + 1 // استبدال
        );
      }
    }
  }

  return dp[m][n];
}

// 4. حساب نسبة التشابه (Similarity Score: 0 to 100%)
export function calculateSimilarity(name1: string, name2: string): number {
  const norm1 = normalizeArabic(name1);
  const norm2 = normalizeArabic(name2);

  if (norm1 === norm2) return 100;
  if (!norm1 || !norm2) return 0;

  // فحص الاحتواء المباشر (Substrings)
  if (norm1.includes(norm2) || norm2.includes(norm1)) {
    const minLen = Math.min(norm1.length, norm2.length);
    const maxLen = Math.max(norm1.length, norm2.length);
    return Math.round((minLen / maxLen) * 95);
  }

  // تجزئة الاسم إلى كلمات وفحص تطابق الكلمات (مثلاً الاسم الثلاثي إذا تطابقت كلمتان)
  const words1 = norm1.split(' ').filter(w => w.length > 1);
  const words2 = norm2.split(' ').filter(w => w.length > 1);
  let matchedWords = 0;

  for (const w1 of words1) {
    if (words2.some(w2 => w2 === w1 || levenshteinDistance(w1, w2) <= 1)) {
      matchedWords++;
    }
  }

  const wordScore = (matchedWords / Math.max(words1.length, words2.length)) * 100;

  const maxLen = Math.max(norm1.length, norm2.length);
  const distance = levenshteinDistance(norm1, norm2);
  const charScore = Math.max(0, (1 - distance / maxLen) * 100);

  return Math.round(Math.max(wordScore, charScore));
}

// 5. صياغة التاريخ العربي مع اسم اليوم
export function formatArabicDateWithDay(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const dayName = dayNames[d.getDay()] || '';
    const formatted = dateStr.replace(/-/g, '/');
    return `${dayName} ${formatted}`;
  } catch {
    return dateStr;
  }
}

// 6. التحقق من التواريخ المعكوسة
export function isDateReversed(startDate: string, endDate: string): boolean {
  if (!startDate || !endDate) return false;
  return new Date(startDate).getTime() > new Date(endDate).getTime();
}

// 7. تحويل التاريخ من صيغ مختلفة (نص أو أرقام Excel) إلى YYYY-MM-DD
export function parseDateToISO(value: any): string {
  if (!value) return '';

  // إذا كان رقم تسلسلي من Excel
  if (typeof value === 'number') {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const targetDate = new Date(excelEpoch.getTime() + value * 86400000);
    return targetDate.toISOString().split('T')[0];
  }

  // إذا كان كائن Date
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toISOString().split('T')[0];
  }

  const str = String(value).trim();
  // التعامل مع YYYY/MM/DD أو YYYY-MM-DD
  const ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (ymdMatch) {
    const y = ymdMatch[1];
    const m = ymdMatch[2].padStart(2, '0');
    const d = ymdMatch[3].padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // التعامل مع DD/MM/YYYY أو DD-MM-YYYY
  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dmyMatch) {
    const d = dmyMatch[1].padStart(2, '0');
    const m = dmyMatch[2].padStart(2, '0');
    const y = dmyMatch[3];
    return `${y}-${m}-${d}`;
  }

  return str;
}
