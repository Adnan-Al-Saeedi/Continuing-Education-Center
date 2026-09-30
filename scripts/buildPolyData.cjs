const fs = require('fs');
const XLSX = require('xlsx');

function cleanText(str) {
  if (!str) return '';
  return String(str).trim();
}

function parseDateToISO(value) {
  if (!value) return '';
  if (typeof value === 'number') {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const targetDate = new Date(excelEpoch.getTime() + value * 86400000);
    return targetDate.toISOString().split('T')[0];
  }
  const str = String(value).trim().replace(/\//g, '-');
  const parts = str.split('-');
  if (parts.length === 3) {
    let [y, m, d] = parts;
    if (y.length === 4) {
      return y + '-' + m.padStart(2, '0') + '-' + d.padStart(2, '0');
    }
  }
  return str;
}

const csvText = fs.readFileSync('raw_activities.csv', 'utf8');
const wb = XLSX.read(csvText, { type: 'string', raw: true });
const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: '' });

const activities = [];
const lecturersMap = new Map();
let currentAct = null;

for (let i = 5; i < data.length; i++) {
  const row = data[i];
  const seq = cleanText(row[0]);
  const rawType = cleanText(row[1]);
  const title = cleanText(row[2]);
  const dept = cleanText(row[3]);
  const actSpecialty = cleanText(row[4]);
  const duration = cleanText(row[5]);
  const cost = cleanText(row[6]);
  const targetAudience = cleanText(row[7]);
  const lecturerName = cleanText(row[8]);
  const lecturerPhone = cleanText(row[9]);
  const lecturerEmail = cleanText(row[10]);
  const lecturerSpecialty = cleanText(row[11]);
  const startDateRaw = row[12];
  const endDateRaw = row[13];

  if (title) {
    let type = 'course';
    if (rawType.includes('ورش') || rawType.includes('ندوة') || rawType.includes('workshop')) {
      type = 'workshop';
    } else if (rawType.includes('دورة') || rawType.includes('course')) {
      type = 'course';
    }

    const startDate = parseDateToISO(startDateRaw);
    const endDate = parseDateToISO(endDateRaw) || startDate;

    currentAct = {
      id: 'poly-act-' + (seq || (activities.length + 1)),
      seq: seq ? parseInt(seq, 10) : activities.length + 1,
      type,
      raw_type: rawType,
      title,
      department: dept,
      specialty: actSpecialty,
      duration: duration ? duration + (duration.includes('يوم') ? '' : ' أيام') : '1 يوم',
      cost: cost || 'مجاني',
      target_audience: targetAudience || 'موظفين+تدريسيين',
      start_date: startDate,
      end_date: endDate,
      location: 'القاعة المركزية - كلية البوليتكنك',
      start_time: '10:00 صباحاً',
      date_fixed: false,
      lecturers_raw: lecturerName,
      parsed_lecturers: lecturerName ? [lecturerName] : [],
      lecturer_name: lecturerName,
      lecturer_phone: lecturerPhone,
      lecturer_email: lecturerEmail,
      lecturers_details: lecturerName ? [{
        name: lecturerName,
        phone: lecturerPhone || undefined,
        email: lecturerEmail || undefined,
        specialty: lecturerSpecialty || undefined
      }] : []
    };
    activities.push(currentAct);
  } else if (lecturerName && currentAct) {
    currentAct.lecturers_raw += ' / ' + lecturerName;
    currentAct.parsed_lecturers.push(lecturerName);
    currentAct.lecturers_details.push({
      name: lecturerName,
      phone: lecturerPhone || undefined,
      email: lecturerEmail || undefined,
      specialty: lecturerSpecialty || undefined
    });
    if (!currentAct.lecturer_phone && lecturerPhone) {
      currentAct.lecturer_phone = lecturerPhone;
    }
    if (!currentAct.lecturer_email && lecturerEmail) {
      currentAct.lecturer_email = lecturerEmail;
    }
  }

  if (lecturerName) {
    if (!lecturersMap.has(lecturerName)) {
      lecturersMap.set(lecturerName, {
        id: 'lec-' + (lecturersMap.size + 1),
        full_name: lecturerName,
        normalized_name: lecturerName.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').trim(),
        department: dept || 'كلية البوليتكنك',
        email: lecturerEmail || '',
        phone: lecturerPhone || '',
        specialty: lecturerSpecialty || actSpecialty || ''
      });
    } else {
      const existing = lecturersMap.get(lecturerName);
      if (!existing.phone && lecturerPhone) existing.phone = lecturerPhone;
      if (!existing.email && lecturerEmail) existing.email = lecturerEmail;
      if (!existing.specialty && lecturerSpecialty) existing.specialty = lecturerSpecialty;
      if (!existing.department && dept) existing.department = dept;
    }
  }
}

console.log('Processed', activities.length, 'activities and', lecturersMap.size, 'lecturers.');

const lecturersArray = Array.from(lecturersMap.values());

const outContent = `/**
 * بيانات خطة كلية البوليتكنك - بابل للعام الدراسي 2026-2027
 * الخطة المقترحة للتعليم المستمر - جامعة الفرات الأوسط التقنية
 * مسؤول شعبة التعليم المستمر: م.د. محمد نوري سعيد
 * مصدر البيانات المعتمد: 187 نشاطاً بكافة الأعمدة والمحاضرين
 */

import { Activity, Lecturer, Settings } from '../types';

export const POLYTECHNIC_SETTINGS: Settings = {
  university_name: 'جامعة الفرات الأوسط التقنية',
  college_name: 'كلية البوليتكنك - بابل',
  center_name: 'شعبة التعليم المستمر',
  logo_url: '',
  sender_name: 'شعبة التعليم المستمر - كلية البوليتكنك - بابل',
  reply_to: 'continuing.edu.poly@atu.edu.iq',
  days_before: 7,
  second_reminder: true,
  second_reminder_days: 1,
  admin_email: 'adn.ak21@atu.edu.iq',
  data_source_url: '',
  last_sync_time: new Date().toISOString(),
  whatsapp_enabled: true,
  whatsapp_mode: 'direct',
};

export const POLYTECHNIC_ACTIVITIES: Activity[] = ` + JSON.stringify(activities, null, 2) + `;

export const POLYTECHNIC_LECTURERS: Lecturer[] = ` + JSON.stringify(lecturersArray, null, 2) + `;

export const POLYTECHNIC_ALIASES = [];
`;

fs.writeFileSync('src/lib/polytechnicData.ts', outContent, 'utf8');
console.log('Successfully wrote src/lib/polytechnicData.ts with', activities.length, 'activities.');
