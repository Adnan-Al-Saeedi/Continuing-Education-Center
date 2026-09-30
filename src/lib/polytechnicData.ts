/**
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
  email_enabled: true,
  whatsapp_enabled: true,
  messaging_service_active: true,
  whatsapp_mode: 'direct',
};

export const POLYTECHNIC_ACTIVITIES: Activity[] = [
  {
    "id": "poly-act-1",
    "seq": 1,
    "type": "course",
    "raw_type": "دورة",
    "title": "الابتكار في تقنيات الطاقة منخفضة الكاربون",
    "department": "ميكانيك",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-13",
    "end_date": "2026-10-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اوراس خضير عبيس / مالك عبد الحسين محسن / زهرة حمود جلهام",
    "parsed_lecturers": [
      "اوراس خضير عبيس",
      "مالك عبد الحسين محسن",
      "زهرة حمود جلهام"
    ],
    "lecturer_name": "اوراس خضير عبيس",
    "lecturer_phone": "9647732311295",
    "lecturer_email": "malik.alhusayn.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "اوراس خضير عبيس",
        "specialty": "هندسة ميكانيك / حراريات"
      },
      {
        "name": "مالك عبد الحسين محسن",
        "phone": "9647732311295",
        "email": "malik.alhusayn.iba@atu.edu.iq",
        "specialty": "هندسة مواد/ معادن"
      },
      {
        "name": "زهرة حمود جلهام",
        "phone": "9647814026056",
        "email": "inb.zhr2@atu.edu.iq",
        "specialty": "هندسة ميكانيك / حراريات"
      }
    ]
  },
  {
    "id": "poly-act-2",
    "seq": 2,
    "type": "course",
    "raw_type": "دورة",
    "title": "المعادن والسبائك الذكية : الخصائص والمعالجات الحرارية",
    "department": "ميكانيك",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-06",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اوراس خضير عبيس / مالك عبد الحسين محسن / زهرة حمود جلهام",
    "parsed_lecturers": [
      "اوراس خضير عبيس",
      "مالك عبد الحسين محسن",
      "زهرة حمود جلهام"
    ],
    "lecturer_name": "اوراس خضير عبيس",
    "lecturer_phone": "9647732311295",
    "lecturer_email": "malik.alhusayn.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "اوراس خضير عبيس",
        "specialty": "هندسة ميكانيك / حراريات"
      },
      {
        "name": "مالك عبد الحسين محسن",
        "phone": "9647732311295",
        "email": "malik.alhusayn.iba@atu.edu.iq",
        "specialty": "هندسة مواد/ معادن"
      },
      {
        "name": "زهرة حمود جلهام",
        "phone": "9647814026056",
        "email": "inb.zhr2@atu.edu.iq",
        "specialty": "هندسة ميكانيك / حراريات"
      }
    ]
  },
  {
    "id": "poly-act-3",
    "seq": 3,
    "type": "course",
    "raw_type": "دورة",
    "title": "السبائك الذكية : التصنيع والتوصيف والتطبيقات المتقدمة",
    "department": "ميكانيك",
    "specialty": "هندسي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-26",
    "end_date": "2026-10-28",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "محمد علي جبر داخل / رائد سلمان سعيد",
    "parsed_lecturers": [
      "محمد علي جبر داخل",
      "رائد سلمان سعيد"
    ],
    "lecturer_name": "محمد علي جبر داخل",
    "lecturer_phone": "9647702736402",
    "lecturer_email": "mohammed.dakhil@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "محمد علي جبر داخل",
        "phone": "9647702736402",
        "email": "mohammed.dakhil@atu.edu.iq",
        "specialty": "هندسة معادن"
      },
      {
        "name": "رائد سلمان سعيد",
        "phone": "9647811371354",
        "email": "raed.saeed@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      }
    ]
  },
  {
    "id": "poly-act-4",
    "seq": 4,
    "type": "course",
    "raw_type": "دورة",
    "title": "التحول الرقمي في تقنيات تصنيع المعادن ودور علوم الحاسبات في تطويرها",
    "department": "ميكانيك",
    "specialty": "هندسي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-19",
    "end_date": "2026-10-21",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زينب عبد العباس محسن / نجلاء شاكرعزيز",
    "parsed_lecturers": [
      "زينب عبد العباس محسن",
      "نجلاء شاكرعزيز"
    ],
    "lecturer_name": "زينب عبد العباس محسن",
    "lecturer_phone": "9647725259081",
    "lecturer_email": "zainab.muhsen@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زينب عبد العباس محسن",
        "phone": "9647725259081",
        "email": "zainab.muhsen@atu.edu.iq",
        "specialty": "هندسة حاسبات / برامجيات"
      },
      {
        "name": "نجلاء شاكرعزيز",
        "phone": "9647723128916",
        "email": "najlaa.shemery@atu.edu.iq",
        "specialty": "تصنيع معادن"
      }
    ]
  },
  {
    "id": "poly-act-5",
    "seq": 5,
    "type": "course",
    "raw_type": "دورة",
    "title": "التصنيع المستدام",
    "department": "ميكانيك",
    "specialty": "هندسي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-25",
    "end_date": "2026-10-27",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زهير حسن عبد الله / نوال عبد الله عمران",
    "parsed_lecturers": [
      "زهير حسن عبد الله",
      "نوال عبد الله عمران"
    ],
    "lecturer_name": "زهير حسن عبد الله",
    "lecturer_phone": "9647702684846",
    "lecturer_email": "nawal_omran@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زهير حسن عبد الله",
        "specialty": "الهندسة الصناعية"
      },
      {
        "name": "نوال عبد الله عمران",
        "phone": "9647702684846",
        "email": "nawal_omran@atu.edu.iq",
        "specialty": "مكائن والات زراعية"
      }
    ]
  },
  {
    "id": "poly-act-6",
    "seq": 6,
    "type": "course",
    "raw_type": "دورة",
    "title": "تكنلوجيا التصنيع الرقمي المؤتمت",
    "department": "ميكانيك",
    "specialty": "هندسي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-27",
    "end_date": "2026-09-29",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "محمد علي جبر داخل / رائد سلمان سعيد",
    "parsed_lecturers": [
      "محمد علي جبر داخل",
      "رائد سلمان سعيد"
    ],
    "lecturer_name": "محمد علي جبر داخل",
    "lecturer_phone": "9647702736402",
    "lecturer_email": "mohammed.dakhil@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "محمد علي جبر داخل",
        "phone": "9647702736402",
        "email": "mohammed.dakhil@atu.edu.iq",
        "specialty": "هندسة معادن"
      },
      {
        "name": "رائد سلمان سعيد",
        "phone": "9647811371354",
        "email": "raed.saeed@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      }
    ]
  },
  {
    "id": "poly-act-7",
    "seq": 7,
    "type": "course",
    "raw_type": "دورة",
    "title": "الميكانيك التطبيقي التنبؤي للأنظمة الصناعية عالية التعقيد",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-15",
    "end_date": "2026-11-19",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "بشار ضياء حسين / ساره سالم حسن / علي جاسم عطية",
    "parsed_lecturers": [
      "بشار ضياء حسين",
      "ساره سالم حسن",
      "علي جاسم عطية"
    ],
    "lecturer_name": "بشار ضياء حسين",
    "lecturer_phone": "9647809443996",
    "lecturer_email": "bashar.hussein@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "بشار ضياء حسين",
        "phone": "9647809443996",
        "email": "bashar.hussein@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      },
      {
        "name": "ساره سالم حسن",
        "phone": "9647735722475",
        "email": "sara.hassan.iba101@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      },
      {
        "name": "علي جاسم عطية",
        "phone": "9647804643608",
        "email": "ali.atiyah.iba115@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      }
    ]
  },
  {
    "id": "poly-act-8",
    "seq": 8,
    "type": "course",
    "raw_type": "دورة",
    "title": "تطبيقات الذكاء الاصطناعي في الأنظمة الميكانيكية والكهربائية الخاصة بمحركات الاحتراق الداخلي ( ice)",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-02-07",
    "end_date": "2027-02-11",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زينة صلاح حسن / راقية جواد ناجي / ساره سالم حسن / علي جاسم عطية",
    "parsed_lecturers": [
      "زينة صلاح حسن",
      "راقية جواد ناجي",
      "ساره سالم حسن",
      "علي جاسم عطية"
    ],
    "lecturer_name": "زينة صلاح حسن",
    "lecturer_phone": "9647803865847",
    "lecturer_email": "zinah.hasan@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زينة صلاح حسن",
        "phone": "9647803865847",
        "email": "zinah.hasan@atu.edu.iq",
        "specialty": "القدرة الكهربائية"
      },
      {
        "name": "راقية جواد ناجي",
        "specialty": "إدارة صناعية"
      },
      {
        "name": "ساره سالم حسن",
        "phone": "9647735722475",
        "email": "sara.hassan.iba101@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      },
      {
        "name": "علي جاسم عطية",
        "phone": "9647804643608",
        "email": "ali.atiyah.iba115@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      }
    ]
  },
  {
    "id": "poly-act-9",
    "seq": 9,
    "type": "course",
    "raw_type": "دورة",
    "title": "تقنيات النانو في تطوير المواد المعدنية والبوليمرية",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-06",
    "end_date": "2026-09-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اسراء عدنان نجم / زهراء كاظم روضان / دريد عبد الرزاق حمد",
    "parsed_lecturers": [
      "اسراء عدنان نجم",
      "زهراء كاظم روضان",
      "دريد عبد الرزاق حمد"
    ],
    "lecturer_name": "اسراء عدنان نجم",
    "lecturer_phone": "9647773489775",
    "lecturer_email": "durid.hamad.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "اسراء عدنان نجم",
        "specialty": "هندسة مواد"
      },
      {
        "name": "زهراء كاظم روضان",
        "specialty": "فيزياء مواد"
      },
      {
        "name": "دريد عبد الرزاق حمد",
        "phone": "9647773489775",
        "email": "durid.hamad.iba@atu.edu.iq",
        "specialty": "هندسة معادن"
      }
    ]
  },
  {
    "id": "poly-act-10",
    "seq": 10,
    "type": "course",
    "raw_type": "دورة",
    "title": "الذكاء الاصطناعي في تشخيص الأعطال الميكانيكية",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-13",
    "end_date": "2026-09-17",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "علاء شاكر عبيده / رائد قائد عجمي / ليث سليم كمال",
    "parsed_lecturers": [
      "علاء شاكر عبيده",
      "رائد قائد عجمي",
      "ليث سليم كمال"
    ],
    "lecturer_name": "علاء شاكر عبيده",
    "lecturer_phone": "9647816080007",
    "lecturer_email": "raied.ajmi.iba112@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "علاء شاكر عبيده",
        "specialty": "ميكانيك تطبيقي"
      },
      {
        "name": "رائد قائد عجمي",
        "phone": "9647816080007",
        "email": "raied.ajmi.iba112@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      },
      {
        "name": "ليث سليم كمال",
        "specialty": "اتمته ميكانيكية"
      }
    ]
  },
  {
    "id": "poly-act-11",
    "seq": 11,
    "type": "course",
    "raw_type": "دورة",
    "title": "برنامج EES لحل المعادلات والتطبيقات في الهندسة الحرارية باستخدام الحاسوب",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-11",
    "end_date": "2026-10-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "حميدة مسلم عبد الحسين / الاء مجيد شنين / ساره يحيى حاتم",
    "parsed_lecturers": [
      "حميدة مسلم عبد الحسين",
      "الاء مجيد شنين",
      "ساره يحيى حاتم"
    ],
    "lecturer_name": "حميدة مسلم عبد الحسين",
    "lecturer_phone": "9647708015920",
    "lecturer_email": "hameedahmuslim@gmail.com",
    "lecturers_details": [
      {
        "name": "حميدة مسلم عبد الحسين",
        "phone": "9647708015920",
        "email": "hameedahmuslim@gmail.com",
        "specialty": "هندسة ميكانيك / حراريات"
      },
      {
        "name": "الاء مجيد شنين",
        "specialty": "امن سيبراني"
      },
      {
        "name": "ساره يحيى حاتم",
        "phone": "9647881184225",
        "email": "sarah.assad@atu.edu.iq",
        "specialty": "هندسة ميكانيك / حراريات"
      }
    ]
  },
  {
    "id": "poly-act-12",
    "seq": 12,
    "type": "course",
    "raw_type": "دورة",
    "title": "اهم اعطال جهاز التكييف المنزلي وكيفية إصلاحه",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-25",
    "end_date": "2026-10-29",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "علي عاصم عبد الرزاق / حميدة مسلم عبد الحسين / احمد كريم كاظم",
    "parsed_lecturers": [
      "علي عاصم عبد الرزاق",
      "حميدة مسلم عبد الحسين",
      "احمد كريم كاظم"
    ],
    "lecturer_name": "علي عاصم عبد الرزاق",
    "lecturer_phone": "9647721903176",
    "lecturer_email": "ali.net2009@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "علي عاصم عبد الرزاق",
        "phone": "9647721903176",
        "email": "ali.net2009@atu.edu.iq",
        "specialty": "هندسة ميكانيك / حراريات"
      },
      {
        "name": "حميدة مسلم عبد الحسين",
        "phone": "9647708015920",
        "email": "hameedahmuslim@gmail.com",
        "specialty": "هندسة ميكانيك / حراريات"
      },
      {
        "name": "احمد كريم كاظم",
        "phone": "9647719570199",
        "email": "ahmed.kadhom.iba102@atu.edu.iq",
        "specialty": "هندسة ميكانيك / حراريات"
      }
    ]
  },
  {
    "id": "poly-act-13",
    "seq": 13,
    "type": "course",
    "raw_type": "دورة",
    "title": "توظيف الهندسة الميكانيكية في تطوير التقنيات الزراعية الحديثة",
    "department": "وحدة التعليم المستمر",
    "specialty": "هندسي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-27",
    "end_date": "2026-12-29",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ساره سالم حسن / محمد نوري سعيد",
    "parsed_lecturers": [
      "ساره سالم حسن",
      "محمد نوري سعيد"
    ],
    "lecturer_name": "ساره سالم حسن",
    "lecturer_phone": "9647735722475",
    "lecturer_email": "sara.hassan.iba101@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ساره سالم حسن",
        "phone": "9647735722475",
        "email": "sara.hassan.iba101@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      },
      {
        "name": "محمد نوري سعيد",
        "specialty": "البستنة وهندسة الحدائق"
      }
    ]
  },
  {
    "id": "poly-act-14",
    "seq": 14,
    "type": "course",
    "raw_type": "دورة",
    "title": "الهندسة الميكانيكية التطبيقية في الزراعة الدقيقة والتقننيات الحديثة",
    "department": "وحدة التعليم المستمر",
    "specialty": "هندسي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-02-07",
    "end_date": "2026-02-09",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ساره سالم حسن / محمد نوري سعيد",
    "parsed_lecturers": [
      "ساره سالم حسن",
      "محمد نوري سعيد"
    ],
    "lecturer_name": "ساره سالم حسن",
    "lecturer_phone": "9647735722475",
    "lecturer_email": "sara.hassan.iba101@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ساره سالم حسن",
        "phone": "9647735722475",
        "email": "sara.hassan.iba101@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      },
      {
        "name": "محمد نوري سعيد",
        "specialty": "البستنة وهندسة الحدائق"
      }
    ]
  },
  {
    "id": "poly-act-15",
    "seq": 15,
    "type": "course",
    "raw_type": "دورة",
    "title": "المواد المستدامة المستخدمة في صناعة الخرسانة",
    "department": "المساحة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-01",
    "end_date": "2026-11-05",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "محمد كريم عبد / مصلح عامر صالح / سلسبيل كريم برهان / زينب علي حسين جاسم",
    "parsed_lecturers": [
      "محمد كريم عبد",
      "مصلح عامر صالح",
      "سلسبيل كريم برهان",
      "زينب علي حسين جاسم"
    ],
    "lecturer_name": "محمد كريم عبد",
    "lecturer_phone": "9647723964094",
    "lecturer_email": "salsabeel.burhan.bi12@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "محمد كريم عبد",
        "specialty": "هندسة مواد"
      },
      {
        "name": "مصلح عامر صالح",
        "specialty": "هندسة مواد"
      },
      {
        "name": "سلسبيل كريم برهان",
        "phone": "9647723964094",
        "email": "salsabeel.burhan.bi12@atu.edu.iq",
        "specialty": "هندسة بايوماتك"
      },
      {
        "name": "زينب علي حسين جاسم",
        "phone": "9647887833387",
        "email": "zainab.jassim.iba@atu.edu.iq",
        "specialty": "هندسة جيوتكنيك"
      }
    ]
  },
  {
    "id": "poly-act-16",
    "seq": 16,
    "type": "course",
    "raw_type": "دورة",
    "title": "تاريخ العمارة ( دراسة تطور العمارة عبر العصور )",
    "department": "المساحة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-13",
    "end_date": "2026-12-17",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "محمد كريم عبد / مصلح عامر صالح / حسين يوسف جبار / ساره شاكر فاضل",
    "parsed_lecturers": [
      "محمد كريم عبد",
      "مصلح عامر صالح",
      "حسين يوسف جبار",
      "ساره شاكر فاضل"
    ],
    "lecturer_name": "محمد كريم عبد",
    "lecturer_phone": "9647816153361",
    "lecturer_email": "sarah.fadhil.iba1@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "محمد كريم عبد",
        "specialty": "هندسة مواد"
      },
      {
        "name": "مصلح عامر صالح",
        "specialty": "هندسة مواد"
      },
      {
        "name": "حسين يوسف جبار",
        "specialty": "هندسة مدني"
      },
      {
        "name": "ساره شاكر فاضل",
        "phone": "9647816153361",
        "email": "sarah.fadhil.iba1@atu.edu.iq",
        "specialty": "هندسة معماري"
      }
    ]
  },
  {
    "id": "poly-act-17",
    "seq": 17,
    "type": "course",
    "raw_type": "دورة",
    "title": "اسياسيات الاستشعار عن بعد وتحليل الصور الفضائية",
    "department": "المساحة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-25",
    "end_date": "2026-10-29",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "بشير سليم جاسم / زهراء موسى كاظم / اثير عسكر إسماعيل / صادق فرج هنوع",
    "parsed_lecturers": [
      "بشير سليم جاسم",
      "زهراء موسى كاظم",
      "اثير عسكر إسماعيل",
      "صادق فرج هنوع"
    ],
    "lecturer_name": "بشير سليم جاسم",
    "lecturer_phone": "9647724851028",
    "lecturer_email": "basheer.jasim@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "بشير سليم جاسم",
        "phone": "9647724851028",
        "email": "basheer.jasim@atu.edu.iq",
        "specialty": "هندسة جيوماتك"
      },
      {
        "name": "زهراء موسى كاظم",
        "phone": "9647803183200",
        "email": "zahraa.musa@atu.edu.iq",
        "specialty": "هندسة جيوماتك"
      },
      {
        "name": "اثير عسكر إسماعيل",
        "phone": "9647805978091",
        "email": "atheerasker@gmail.com",
        "specialty": "تخطيط حضري واقليمي"
      },
      {
        "name": "صادق فرج هنوع",
        "phone": "9647800189877",
        "email": "sadiq.hanoaa@atu.edu.iq",
        "specialty": "هندسة استشعار عن بعد"
      }
    ]
  },
  {
    "id": "poly-act-18",
    "seq": 18,
    "type": "course",
    "raw_type": "دورة",
    "title": "اسياسيات نظم المعلومات الجغرافية وتحليل البيانات المكانية",
    "department": "المساحة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "بشير سليم جاسم / زهراء موسى كاظم / اثير عسكر إسماعيل / صادق فرج هنوع",
    "parsed_lecturers": [
      "بشير سليم جاسم",
      "زهراء موسى كاظم",
      "اثير عسكر إسماعيل",
      "صادق فرج هنوع"
    ],
    "lecturer_name": "بشير سليم جاسم",
    "lecturer_phone": "9647724851028",
    "lecturer_email": "basheer.jasim@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "بشير سليم جاسم",
        "phone": "9647724851028",
        "email": "basheer.jasim@atu.edu.iq",
        "specialty": "هندسة جيوماتك"
      },
      {
        "name": "زهراء موسى كاظم",
        "phone": "9647803183200",
        "email": "zahraa.musa@atu.edu.iq",
        "specialty": "هندسة جيوماتك"
      },
      {
        "name": "اثير عسكر إسماعيل",
        "phone": "9647805978091",
        "email": "atheerasker@gmail.com",
        "specialty": "تخطيط حضري واقليمي"
      },
      {
        "name": "صادق فرج هنوع",
        "phone": "9647800189877",
        "email": "sadiq.hanoaa@atu.edu.iq",
        "specialty": "هندسة مساحة"
      }
    ]
  },
  {
    "id": "poly-act-19",
    "seq": 19,
    "type": "course",
    "raw_type": "دورة",
    "title": "تلوث التربة وطرق معالجتها",
    "department": "المساحة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-15",
    "end_date": "2026-11-19",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زينب علي حسين جاسم / ساره شاكر فاضل / هبة غلاب دخيل / عمار احمد شاكر",
    "parsed_lecturers": [
      "زينب علي حسين جاسم",
      "ساره شاكر فاضل",
      "هبة غلاب دخيل",
      "عمار احمد شاكر"
    ],
    "lecturer_name": "زينب علي حسين جاسم",
    "lecturer_phone": "9647887833387",
    "lecturer_email": "zainab.jassim.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زينب علي حسين جاسم",
        "phone": "9647887833387",
        "email": "zainab.jassim.iba@atu.edu.iq",
        "specialty": "هندسة جيوتكنيك"
      },
      {
        "name": "ساره شاكر فاضل",
        "phone": "9647816153361",
        "email": "sarah.fadhil.iba1@atu.edu.iq",
        "specialty": "عندسة معماري"
      },
      {
        "name": "هبة غلاب دخيل",
        "specialty": "علوم جيولوجيا"
      },
      {
        "name": "عمار احمد شاكر",
        "specialty": "هندسة انشاءات"
      }
    ]
  },
  {
    "id": "poly-act-20",
    "seq": 20,
    "type": "course",
    "raw_type": "دورة",
    "title": "حساب الكميات لغرض اعداد الكشوفات التخمينية",
    "department": "المساحة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-10",
    "end_date": "2026-09-14",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "مخلد مراد عبيد / اروى هادي محمد / سلسبيل كريم برهان / ميثاق كوكب هادي",
    "parsed_lecturers": [
      "مخلد مراد عبيد",
      "اروى هادي محمد",
      "سلسبيل كريم برهان",
      "ميثاق كوكب هادي"
    ],
    "lecturer_name": "مخلد مراد عبيد",
    "lecturer_phone": "9647810245245",
    "lecturer_email": "mukhallad.murad.iku@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "مخلد مراد عبيد",
        "phone": "9647810245245",
        "email": "mukhallad.murad.iku@atu.edu.iq",
        "specialty": "هندسة انشاءات"
      },
      {
        "name": "اروى هادي محمد",
        "phone": "9647813494312",
        "email": "eng.arwahadi1991@gmail.com",
        "specialty": "هندسة مساحة"
      },
      {
        "name": "سلسبيل كريم برهان",
        "phone": "9647723964094",
        "email": "salsabeel.burhan.bi12@atu.edu.iq",
        "specialty": "هندسة بايوماتك"
      },
      {
        "name": "ميثاق كوكب هادي",
        "phone": "9647821540440",
        "email": "methaqmousewi@gmail.com",
        "specialty": "هندسة مساحة"
      }
    ]
  },
  {
    "id": "poly-act-21",
    "seq": 21,
    "type": "course",
    "raw_type": "دورة",
    "title": "التحول الرقمي في الاداء الوظيفي",
    "department": "شبكات وبرمجيات الحاسوب",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-01",
    "end_date": "2026-11-05",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "عمار وسام عبدالزهراء / عدنان عذاب كعيشيش / ياسر حسن جاسم / نداء غالب علي",
    "parsed_lecturers": [
      "عمار وسام عبدالزهراء",
      "عدنان عذاب كعيشيش",
      "ياسر حسن جاسم",
      "نداء غالب علي"
    ],
    "lecturer_name": "عمار وسام عبدالزهراء",
    "lecturer_phone": "9647800354540",
    "lecturer_email": "smartcomputing300@gmail.com",
    "lecturers_details": [
      {
        "name": "عمار وسام عبدالزهراء",
        "phone": "9647800354540",
        "email": "smartcomputing300@gmail.com",
        "specialty": "برمجيات"
      },
      {
        "name": "عدنان عذاب كعيشيش",
        "phone": "9647713741154",
        "email": "adn.ak21@atu.edu.iq",
        "specialty": "برمجيات"
      },
      {
        "name": "ياسر حسن جاسم",
        "phone": "9647816891686",
        "email": "yasser.jassem@atu.edu.iq",
        "specialty": "برمجيات"
      },
      {
        "name": "نداء غالب علي",
        "phone": "9647802428549",
        "email": "inb.nedaa10@atu.edu.iq",
        "specialty": "تكنولوجيا المعلومات"
      }
    ]
  },
  {
    "id": "poly-act-22",
    "seq": 22,
    "type": "course",
    "raw_type": "دورة",
    "title": "أساسيات الأمن السيبراني وحماية المعلومات",
    "department": "شبكات وبرمجيات الحاسوب",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-03-07",
    "end_date": "2027-03-11",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "عمار وسام عبدالزهراء / عدنان عذاب كعيشيش / ياسر حسن جاسم / علي خالد محمدعلي",
    "parsed_lecturers": [
      "عمار وسام عبدالزهراء",
      "عدنان عذاب كعيشيش",
      "ياسر حسن جاسم",
      "علي خالد محمدعلي"
    ],
    "lecturer_name": "عمار وسام عبدالزهراء",
    "lecturer_phone": "9647800354540",
    "lecturer_email": "smartcomputing300@gmail.com",
    "lecturers_details": [
      {
        "name": "عمار وسام عبدالزهراء",
        "phone": "9647800354540",
        "email": "smartcomputing300@gmail.com",
        "specialty": "برمجيات"
      },
      {
        "name": "عدنان عذاب كعيشيش",
        "phone": "9647713741154",
        "email": "adn.ak21@atu.edu.iq",
        "specialty": "برمجيات"
      },
      {
        "name": "ياسر حسن جاسم",
        "phone": "9647816891686",
        "email": "yasser.jassem@atu.edu.iq",
        "specialty": "برمجيات"
      },
      {
        "name": "علي خالد محمدعلي",
        "email": "ali.khalid@atu.edu.iq",
        "specialty": "برمجيات"
      }
    ]
  },
  {
    "id": "poly-act-23",
    "seq": 23,
    "type": "course",
    "raw_type": "دورة",
    "title": "تصميم العروض الرقمية الحديثة باستخدام Microsoft Power Point",
    "department": "شبكات وبرمجيات الحاسوب",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-27",
    "end_date": "2026-10-29",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "خنساء عزيز عبيس / صبا حسين جابر / ضياء صالح حماد",
    "parsed_lecturers": [
      "خنساء عزيز عبيس",
      "صبا حسين جابر",
      "ضياء صالح حماد"
    ],
    "lecturer_name": "خنساء عزيز عبيس",
    "lecturer_phone": "9647724166133",
    "lecturer_email": "inb.khanssa@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "خنساء عزيز عبيس",
        "phone": "9647724166133",
        "email": "inb.khanssa@atu.edu.iq",
        "specialty": "معلوماتية"
      },
      {
        "name": "صبا حسين جابر",
        "specialty": "برمجيات"
      },
      {
        "name": "ضياء صالح حماد",
        "phone": "9647722242843",
        "email": "dhiyaa_alshammari@atu.edu.iq",
        "specialty": "برمجيات"
      }
    ]
  },
  {
    "id": "poly-act-24",
    "seq": 24,
    "type": "course",
    "raw_type": "دورة",
    "title": "دورة في الذكاء الاصطناعي والتكنولوجيا الحديثة",
    "department": "شبكات وبرمجيات الحاسوب",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-11",
    "end_date": "2026-10-13",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رؤى مجيد عزيز / وفاء محمد رضا / بيمان حسين / علي صلاح مهدي",
    "parsed_lecturers": [
      "رؤى مجيد عزيز",
      "وفاء محمد رضا",
      "بيمان حسين",
      "علي صلاح مهدي"
    ],
    "lecturer_name": "رؤى مجيد عزيز",
    "lecturer_phone": "9647726574022",
    "lecturer_email": "ruaa.humady@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "رؤى مجيد عزيز",
        "phone": "9647726574022",
        "email": "ruaa.humady@atu.edu.iq",
        "specialty": "هندسة تقنيات الحاسوب"
      },
      {
        "name": "وفاء محمد رضا",
        "phone": "9647802428213",
        "email": "inb.wfa@atu.edu.iq",
        "specialty": "هندسة الكترونيك واتصالات"
      },
      {
        "name": "بيمان حسين",
        "phone": "9647723734539",
        "email": "inb.beman10@atu.edu.iq",
        "specialty": "برمجيات"
      },
      {
        "name": "علي صلاح مهدي",
        "phone": "9647825338591",
        "email": "ali.khafaja@atu.edu.iq",
        "specialty": "اتصالات"
      }
    ]
  },
  {
    "id": "poly-act-25",
    "seq": 25,
    "type": "course",
    "raw_type": "دورة",
    "title": "دورة في هندسة الأوامر (Prompt Engineering)",
    "department": "شبكات وبرمجيات الحاسوب",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-06",
    "end_date": "2026-12-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رؤى مجيد عزيز / اسراء عيسى عبد / علي صلاح مهدي",
    "parsed_lecturers": [
      "رؤى مجيد عزيز",
      "اسراء عيسى عبد",
      "علي صلاح مهدي"
    ],
    "lecturer_name": "رؤى مجيد عزيز",
    "lecturer_phone": "9647726574022",
    "lecturer_email": "ruaa.humady@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "رؤى مجيد عزيز",
        "phone": "9647726574022",
        "email": "ruaa.humady@atu.edu.iq",
        "specialty": "هندسة تقنيات الحاسوب"
      },
      {
        "name": "اسراء عيسى عبد",
        "email": "israa.abed@atu.edu.iq",
        "specialty": "علوم رياضيات"
      },
      {
        "name": "علي صلاح مهدي",
        "email": "ali.khafaja@atu.edu.iq",
        "specialty": "اتصالات"
      }
    ]
  },
  {
    "id": "poly-act-26",
    "seq": 26,
    "type": "course",
    "raw_type": "دورة",
    "title": "التعامل مع الصور باستخدام لغة بايثون",
    "department": "شبكات وبرمجيات الحاسوب",
    "specialty": "هندسي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-06",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "حافظ علي شباط / خمائل راقم رحيم",
    "parsed_lecturers": [
      "حافظ علي شباط",
      "خمائل راقم رحيم"
    ],
    "lecturer_name": "حافظ علي شباط",
    "lecturer_phone": "",
    "lecturer_email": "khmrakrah@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "حافظ علي شباط",
        "specialty": "ذكاء اصطناعي"
      },
      {
        "name": "خمائل راقم رحيم",
        "email": "khmrakrah@atu.edu.iq",
        "specialty": "ذكاء اصطناعي"
      }
    ]
  },
  {
    "id": "poly-act-27",
    "seq": 27,
    "type": "course",
    "raw_type": "دورة",
    "title": "التهديدات ونقاط الضعف في مجال الامن السيبراني",
    "department": "شبكات وبرمجيات الحاسوب",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-02-07",
    "end_date": "2027-02-11",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "علي خالد محمدعلي / ضياء صالح حماد / نداء غالب علي / زينب صاحب ظاهر",
    "parsed_lecturers": [
      "علي خالد محمدعلي",
      "ضياء صالح حماد",
      "نداء غالب علي",
      "زينب صاحب ظاهر"
    ],
    "lecturer_name": "علي خالد محمدعلي",
    "lecturer_phone": "9647722242843",
    "lecturer_email": "ali.khalid@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "علي خالد محمدعلي",
        "email": "ali.khalid@atu.edu.iq",
        "specialty": "ذكاء اصطناعي"
      },
      {
        "name": "ضياء صالح حماد",
        "phone": "9647722242843",
        "email": "dhiyaa_alshammari@atu.edu.iq",
        "specialty": "ذكاء اصطناعي"
      },
      {
        "name": "نداء غالب علي",
        "phone": "9647802428549",
        "email": "inb.nedaa10@atu.edu.iq",
        "specialty": "تكنولوجيا المعلومات"
      },
      {
        "name": "زينب صاحب ظاهر",
        "specialty": "امن البيانات والمعلومات"
      }
    ]
  },
  {
    "id": "poly-act-28",
    "seq": 28,
    "type": "course",
    "raw_type": "دورة",
    "title": "الرياضيات التطبيقية من النظرية الى ذكاء الالة والاتصالات والالكترونيات",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-06",
    "end_date": "2026-10-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ايمان جواد ناجي / حوراء نعمه جاسم / رسل نوري سعيد",
    "parsed_lecturers": [
      "ايمان جواد ناجي",
      "حوراء نعمه جاسم",
      "رسل نوري سعيد"
    ],
    "lecturer_name": "ايمان جواد ناجي",
    "lecturer_phone": "9647802428220",
    "lecturer_email": "eman.naji@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ايمان جواد ناجي",
        "phone": "9647802428220",
        "email": "eman.naji@atu.edu.iq",
        "specialty": "تحليل دالي + نظم ديناميكية"
      },
      {
        "name": "حوراء نعمه جاسم",
        "phone": "9647729288808",
        "email": "hawraa.jasim.iba9@atu.edu.iq",
        "specialty": "هندسة كهرباء - الكترونيك واتصالات"
      },
      {
        "name": "رسل نوري سعيد",
        "phone": "9647800680902",
        "email": "rusul.saeed.iba12@atu.edu.iq",
        "specialty": "هندسة كهرباء - الكترونيك واتصالات"
      }
    ]
  },
  {
    "id": "poly-act-29",
    "seq": 29,
    "type": "course",
    "raw_type": "دورة",
    "title": "توصيف جهاز الميكروويف",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-03-14",
    "end_date": "2027-03-18",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ذو الفقار حميد عبد الرضا / سارة خماس جوي / حسن فرحان رشك",
    "parsed_lecturers": [
      "ذو الفقار حميد عبد الرضا",
      "سارة خماس جوي",
      "حسن فرحان رشك"
    ],
    "lecturer_name": "ذو الفقار حميد عبد الرضا",
    "lecturer_phone": "9647803777077",
    "lecturer_email": "thoalfukar@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ذو الفقار حميد عبد الرضا",
        "phone": "9647803777077",
        "email": "thoalfukar@atu.edu.iq",
        "specialty": "هندسة حاسبات"
      },
      {
        "name": "سارة خماس جوي",
        "phone": "9647722116533",
        "email": "sarah.lami@atu.edu.iq",
        "specialty": "هندسة الالكترونيك واتصالات"
      },
      {
        "name": "حسن فرحان رشك",
        "specialty": "هندسة كهرباء"
      }
    ]
  },
  {
    "id": "poly-act-30",
    "seq": 30,
    "type": "course",
    "raw_type": "دورة",
    "title": "تطبيقات تقنية النانو في تحقيق الاستدامة في الطاقة والبيئة ضمن تقنيات الالكترونيات والاتصالات",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-27",
    "end_date": "2026-10-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اسماء عدنان نجم / رسل نوري سعيد / علا باسم فاضل",
    "parsed_lecturers": [
      "اسماء عدنان نجم",
      "رسل نوري سعيد",
      "علا باسم فاضل"
    ],
    "lecturer_name": "اسماء عدنان نجم",
    "lecturer_phone": "9647811029720",
    "lecturer_email": "asmaa.najm@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "اسماء عدنان نجم",
        "phone": "9647811029720",
        "email": "asmaa.najm@atu.edu.iq",
        "specialty": "فيزياء نانوتكنولوجي"
      },
      {
        "name": "رسل نوري سعيد",
        "phone": "9647800680902",
        "email": "rusul.saeed.iba12@atu.edu.iq",
        "specialty": "هندسة الكترونيك واتصالات"
      },
      {
        "name": "علا باسم فاضل",
        "phone": "9647814637041",
        "email": "ola.fadhil.iba100@atu.edu.iq",
        "specialty": "هندسة الكترونيك واتصالات"
      }
    ]
  },
  {
    "id": "poly-act-31",
    "seq": 31,
    "type": "course",
    "raw_type": "دورة",
    "title": "تطبيق التعلم العميق في انظمة الطاقة الذكية",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-08",
    "end_date": "2026-11-12",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زهراء حسن هادي / سكينة عباس فاضل / خولة يحيى رباط",
    "parsed_lecturers": [
      "زهراء حسن هادي",
      "سكينة عباس فاضل",
      "خولة يحيى رباط"
    ],
    "lecturer_name": "زهراء حسن هادي",
    "lecturer_phone": "9647718739628",
    "lecturer_email": "zahraa.hadi.iba105@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زهراء حسن هادي",
        "phone": "9647718739628",
        "email": "zahraa.hadi.iba105@atu.edu.iq",
        "specialty": "هندسة القدرة الكهربائية"
      },
      {
        "name": "سكينة عباس فاضل",
        "phone": "9647709466604",
        "email": "sakena.fadhel.iba102@atu.edu.iq",
        "specialty": "هندسة الكترونيك واتصالات"
      },
      {
        "name": "خولة يحيى رباط",
        "phone": "9647818506664",
        "email": "kahww.7788@gmail.com",
        "specialty": "هندسة كهرباء"
      }
    ]
  },
  {
    "id": "poly-act-32",
    "seq": 32,
    "type": "course",
    "raw_type": "دورة",
    "title": "انظمة اتصالات RF/FSO الهجينة",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-13",
    "end_date": "2026-12-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رويدة عبد الامير / حسين علي محمد / زيدون وليد",
    "parsed_lecturers": [
      "رويدة عبد الامير",
      "حسين علي محمد",
      "زيدون وليد"
    ],
    "lecturer_name": "رويدة عبد الامير",
    "lecturer_phone": "9647723623627",
    "lecturer_email": "ruwaida.abdulkareem.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "رويدة عبد الامير",
        "phone": "9647723623627",
        "email": "ruwaida.abdulkareem.iba@atu.edu.iq",
        "specialty": "اتصالات"
      },
      {
        "name": "حسين علي محمد",
        "specialty": "اتصالات"
      },
      {
        "name": "زيدون وليد",
        "specialty": "هندسة كهرباء"
      }
    ]
  },
  {
    "id": "poly-act-33",
    "seq": 33,
    "type": "course",
    "raw_type": "دورة",
    "title": "التوأم الرقمي Digital Twin ودوره في الانظمة",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-06",
    "end_date": "2026-12-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سكينة عباس فاضل / زهراء حسن هادي / علاء هادي / سعد صلاح",
    "parsed_lecturers": [
      "سكينة عباس فاضل",
      "زهراء حسن هادي",
      "علاء هادي",
      "سعد صلاح"
    ],
    "lecturer_name": "سكينة عباس فاضل",
    "lecturer_phone": "9647709466604",
    "lecturer_email": "sakena.fadhel.iba102@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "سكينة عباس فاضل",
        "phone": "9647709466604",
        "email": "sakena.fadhel.iba102@atu.edu.iq",
        "specialty": "هندسة الكترونيك واتصالات"
      },
      {
        "name": "زهراء حسن هادي",
        "phone": "9647718739628",
        "email": "zahraa.hadi.iba105@atu.edu.iq",
        "specialty": "هندسة القدرة الكهربائية"
      },
      {
        "name": "علاء هادي",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "سعد صلاح",
        "specialty": "هندسة الكترونيك واتصالات"
      }
    ]
  },
  {
    "id": "poly-act-34",
    "seq": 34,
    "type": "course",
    "raw_type": "دورة",
    "title": "السلامة المختبرية والتعامل الامن مع المواد الكيمياوية",
    "department": "مدني",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-15",
    "end_date": "2026-11-19",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اركان راضي علي / ليث كريم عبيس / منار حامد جاسم",
    "parsed_lecturers": [
      "اركان راضي علي",
      "ليث كريم عبيس",
      "منار حامد جاسم"
    ],
    "lecturer_name": "اركان راضي علي",
    "lecturer_phone": "9647831226783",
    "lecturer_email": "manar.jasim@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "اركان راضي علي",
        "specialty": "موارد مائية"
      },
      {
        "name": "ليث كريم عبيس",
        "specialty": "هندسة كيمياوية"
      },
      {
        "name": "منار حامد جاسم",
        "phone": "9647831226783",
        "email": "manar.jasim@atu.edu.iq",
        "specialty": "هندسة مدنية انشاءات"
      }
    ]
  },
  {
    "id": "poly-act-35",
    "seq": 35,
    "type": "course",
    "raw_type": "دورة",
    "title": "التحريات الجيوتقنية للتربة والفحوصات المختبرية ودورها في تقليل مخاطر الفشل",
    "department": "مدني",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-06",
    "end_date": "2026-12-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "منار حامد جاسم / ليث كريم عبيس / زهير كريم حمزة",
    "parsed_lecturers": [
      "منار حامد جاسم",
      "ليث كريم عبيس",
      "زهير كريم حمزة"
    ],
    "lecturer_name": "منار حامد جاسم",
    "lecturer_phone": "9647831226783",
    "lecturer_email": "manar.jasim@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "منار حامد جاسم",
        "phone": "9647831226783",
        "email": "manar.jasim@atu.edu.iq",
        "specialty": "هندسة مدنية انشاءات"
      },
      {
        "name": "ليث كريم عبيس",
        "specialty": "هندسة كيمياوية"
      },
      {
        "name": "زهير كريم حمزة",
        "specialty": "هندسة مدنية انشاءات"
      }
    ]
  },
  {
    "id": "poly-act-36",
    "seq": 36,
    "type": "course",
    "raw_type": "دورة",
    "title": "تصميم الخلطات الخرسانية وفقا للكود الامريكي",
    "department": "مدني",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-11",
    "end_date": "2026-10-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رباب جلوب دخن / هدى زهير عبد الغني / انسام علي هاشم",
    "parsed_lecturers": [
      "رباب جلوب دخن",
      "هدى زهير عبد الغني",
      "انسام علي هاشم"
    ],
    "lecturer_name": "رباب جلوب دخن",
    "lecturer_phone": "9647818648926",
    "lecturer_email": "rababdekhn@gmail.com",
    "lecturers_details": [
      {
        "name": "رباب جلوب دخن",
        "phone": "9647818648926",
        "email": "rababdekhn@gmail.com",
        "specialty": "انشاءات"
      },
      {
        "name": "هدى زهير عبد الغني",
        "phone": "9647801715581",
        "email": "inb.huda@atu.edu.iq",
        "specialty": "مواد بناء"
      },
      {
        "name": "انسام علي هاشم",
        "phone": "9647723731712",
        "email": "ansamly2@atu.edu.iq",
        "specialty": "مواد بناء"
      }
    ]
  },
  {
    "id": "poly-act-37",
    "seq": 37,
    "type": "course",
    "raw_type": "دورة",
    "title": "المواد المستدامة هي الحل الامثل لتقليل الاثر البيئي",
    "department": "مدني",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-01",
    "end_date": "2026-11-05",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "انسام علي هاشم / ريام ضياء محمد / رباب جلوب دخن",
    "parsed_lecturers": [
      "انسام علي هاشم",
      "ريام ضياء محمد",
      "رباب جلوب دخن"
    ],
    "lecturer_name": "انسام علي هاشم",
    "lecturer_phone": "9647723731712",
    "lecturer_email": "ansamly2@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "انسام علي هاشم",
        "phone": "9647723731712",
        "email": "ansamly2@atu.edu.iq",
        "specialty": "مواد بناء"
      },
      {
        "name": "ريام ضياء محمد",
        "specialty": "موارد مائية"
      },
      {
        "name": "رباب جلوب دخن",
        "phone": "9647818648926",
        "email": "rababdekhn@gmail.com",
        "specialty": "انشاءات"
      }
    ]
  },
  {
    "id": "poly-act-38",
    "seq": 38,
    "type": "course",
    "raw_type": "دورة",
    "title": "التحول نحو البناء المستدام والتقنيات الخضراء",
    "department": "مدني",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-21",
    "end_date": "2026-12-25",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "فاطمة اسعد مهدي / زهراء احمد عبد النبي / ولاء محمد جواد",
    "parsed_lecturers": [
      "فاطمة اسعد مهدي",
      "زهراء احمد عبد النبي",
      "ولاء محمد جواد"
    ],
    "lecturer_name": "فاطمة اسعد مهدي",
    "lecturer_phone": "9647723708754",
    "lecturer_email": "fatima.mahdi.iba101@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "فاطمة اسعد مهدي",
        "phone": "9647723708754",
        "email": "fatima.mahdi.iba101@atu.edu.iq",
        "specialty": "هندسة موارد مائية"
      },
      {
        "name": "زهراء احمد عبد النبي",
        "phone": "9647719028764",
        "email": "zahraa.abduinaby.iba107@atu.edu.iq",
        "specialty": "هندسة عمارة"
      },
      {
        "name": "ولاء محمد جواد",
        "specialty": "هندسة طرق ونقل"
      }
    ]
  },
  {
    "id": "poly-act-39",
    "seq": 39,
    "type": "course",
    "raw_type": "دورة",
    "title": "تنمية المساحات الخضراء وفق نماذج حصاد المياه ضمن حدود بلدية الحلة",
    "department": "مدني",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اركان راضي علي / زهراء احمد عبد النبي / فاطمة اسعد مهدي",
    "parsed_lecturers": [
      "اركان راضي علي",
      "زهراء احمد عبد النبي",
      "فاطمة اسعد مهدي"
    ],
    "lecturer_name": "اركان راضي علي",
    "lecturer_phone": "9647719028764",
    "lecturer_email": "zahraa.abduinaby.iba107@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "اركان راضي علي",
        "specialty": "موارد مائية"
      },
      {
        "name": "زهراء احمد عبد النبي",
        "phone": "9647719028764",
        "email": "zahraa.abduinaby.iba107@atu.edu.iq",
        "specialty": "هندسة عمارة"
      },
      {
        "name": "فاطمة اسعد مهدي",
        "phone": "9647723708754",
        "email": "fatima.mahdi.iba101@atu.edu.iq",
        "specialty": "هندسة موارد مائية"
      }
    ]
  },
  {
    "id": "poly-act-40",
    "seq": 40,
    "type": "course",
    "raw_type": "دورة",
    "title": "الميكانيك التطبيقي الذكي لتحويل الزراعة التقليدية إلى زراعة رقمية",
    "department": "وحدة التعليم المستمر",
    "specialty": "هندسي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-05-09",
    "end_date": "2027-05-13",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "بشار ضياء حسين / ساره سالم حسن / محمد نوري سعيد",
    "parsed_lecturers": [
      "بشار ضياء حسين",
      "ساره سالم حسن",
      "محمد نوري سعيد"
    ],
    "lecturer_name": "بشار ضياء حسين",
    "lecturer_phone": "9647809443996",
    "lecturer_email": "bashar.hussein@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "بشار ضياء حسين",
        "phone": "9647809443996",
        "email": "bashar.hussein@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      },
      {
        "name": "ساره سالم حسن",
        "phone": "9647735722475",
        "email": "sara.hassan.iba101@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      },
      {
        "name": "محمد نوري سعيد",
        "specialty": "البستنة وهندسة الحدائق"
      }
    ]
  },
  {
    "id": "poly-act-41",
    "seq": 41,
    "type": "course",
    "raw_type": "دورة",
    "title": "القانون الدولي في ظل التحول الرقمي",
    "department": "الإدارة القانونية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-06",
    "end_date": "2026-12-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "هاني عبد الله عمران / قاسم ماضي حمزة / شيماء طرام لفته / مشتاق طالب مهنة",
    "parsed_lecturers": [
      "هاني عبد الله عمران",
      "قاسم ماضي حمزة",
      "شيماء طرام لفته",
      "مشتاق طالب مهنة"
    ],
    "lecturer_name": "هاني عبد الله عمران",
    "lecturer_phone": "9647802428207",
    "lecturer_email": "hani.omran@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "هاني عبد الله عمران",
        "phone": "9647802428207",
        "email": "hani.omran@atu.edu.iq",
        "specialty": "قانون دولي"
      },
      {
        "name": "قاسم ماضي حمزة",
        "phone": "9647601041133",
        "email": "qasim.hamzah@atu.edu.iq",
        "specialty": "قانون عام"
      },
      {
        "name": "شيماء طرام لفته",
        "phone": "9647738084100",
        "email": "sheimaa.lafta@atu.edu.iq",
        "specialty": "قانون عام"
      },
      {
        "name": "مشتاق طالب مهنة",
        "phone": "9647801516534",
        "email": "dktwrmshtaqtalb@gmail.com",
        "specialty": "قانون دولي"
      }
    ]
  },
  {
    "id": "poly-act-42",
    "seq": 42,
    "type": "course",
    "raw_type": "دورة",
    "title": "القيود القانونية التي تهدد الحقوق والحريات في ظل التحول الرقمي",
    "department": "الإدارة القانونية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-03-01",
    "end_date": "2027-07-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زهير محمد هاشم / نغم عبد الحسين خليل / اسعد دخيل / رجاء حسين عباس",
    "parsed_lecturers": [
      "زهير محمد هاشم",
      "نغم عبد الحسين خليل",
      "اسعد دخيل",
      "رجاء حسين عباس"
    ],
    "lecturer_name": "زهير محمد هاشم",
    "lecturer_phone": "9647731953404",
    "lecturer_email": "zuohair.hamza@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زهير محمد هاشم",
        "phone": "9647731953404",
        "email": "zuohair.hamza@atu.edu.iq",
        "specialty": "قانون جنائي"
      },
      {
        "name": "نغم عبد الحسين خليل",
        "phone": "9647826274979",
        "email": "nagham.khalil@atu.edu.iq",
        "specialty": "قانون عام"
      },
      {
        "name": "اسعد دخيل",
        "phone": "9647725235990",
        "email": "asaad.hadi@atu.edu.iq",
        "specialty": "علوم سياسية"
      },
      {
        "name": "رجاء حسين عباس",
        "phone": "9647830995803",
        "email": "rajaaalessmaeely@gmail.com",
        "specialty": "قانون دولي"
      }
    ]
  },
  {
    "id": "poly-act-43",
    "seq": 43,
    "type": "course",
    "raw_type": "دورة",
    "title": "المسؤولية المدنية الناشئة عن استخدام الذكاء الاصطناعي",
    "department": "الإدارة القانونية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-31",
    "end_date": "2027-02-04",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "محمود عبد عباس مغير / حسين محسن / نبا علي خليل / عباس لطيف حسين",
    "parsed_lecturers": [
      "محمود عبد عباس مغير",
      "حسين محسن",
      "نبا علي خليل",
      "عباس لطيف حسين"
    ],
    "lecturer_name": "محمود عبد عباس مغير",
    "lecturer_phone": "9647815589575",
    "lecturer_email": "mahmood.abas@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "محمود عبد عباس مغير",
        "phone": "9647815589575",
        "email": "mahmood.abas@atu.edu.iq",
        "specialty": "قانون خاص"
      },
      {
        "name": "حسين محسن",
        "specialty": "قانون خاص"
      },
      {
        "name": "نبا علي خليل",
        "specialty": "تكنلوجيا المعلومات"
      },
      {
        "name": "عباس لطيف حسين",
        "specialty": "قانون دولي"
      }
    ]
  },
  {
    "id": "poly-act-44",
    "seq": 44,
    "type": "course",
    "raw_type": "دورة",
    "title": "القانون الجنائي الدولي والجرائم السيبرانية",
    "department": "الإدارة القانونية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-03-14",
    "end_date": "2027-03-18",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "هاني عبد الله عمران / اسيل حاتم تومان / زينب حسين جدوع / فاضل ناجح",
    "parsed_lecturers": [
      "هاني عبد الله عمران",
      "اسيل حاتم تومان",
      "زينب حسين جدوع",
      "فاضل ناجح"
    ],
    "lecturer_name": "هاني عبد الله عمران",
    "lecturer_phone": "9647802428207",
    "lecturer_email": "hani.omran@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "هاني عبد الله عمران",
        "phone": "9647802428207",
        "email": "hani.omran@atu.edu.iq",
        "specialty": "قانون دولي"
      },
      {
        "name": "اسيل حاتم تومان",
        "specialty": "قانون جنائي"
      },
      {
        "name": "زينب حسين جدوع",
        "phone": "9647723668013",
        "email": "zainab.jadooe.iba@atu.edu.iq",
        "specialty": "قانون عام"
      },
      {
        "name": "فاضل ناجح",
        "specialty": "قانون عام"
      }
    ]
  },
  {
    "id": "poly-act-45",
    "seq": 45,
    "type": "course",
    "raw_type": "دورة",
    "title": "توظيف التقنيات الحديثة في الدراسات القرانية واللغوية",
    "department": "الإدارة القانونية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-03-28",
    "end_date": "2027-04-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "قاسم كاظم محمد / نبيل شاكر عبد الحسين / علي محسن جبر / انعام حسين راضي",
    "parsed_lecturers": [
      "قاسم كاظم محمد",
      "نبيل شاكر عبد الحسين",
      "علي محسن جبر",
      "انعام حسين راضي"
    ],
    "lecturer_name": "قاسم كاظم محمد",
    "lecturer_phone": "9647802428471",
    "lecturer_email": "qasim.kadhummohammad@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "قاسم كاظم محمد",
        "phone": "9647802428471",
        "email": "qasim.kadhummohammad@atu.edu.iq",
        "specialty": "اللغة العربية"
      },
      {
        "name": "نبيل شاكر عبد الحسين",
        "specialty": "اللغة العربية"
      },
      {
        "name": "علي محسن جبر",
        "specialty": "علوم قران"
      },
      {
        "name": "انعام حسين راضي",
        "phone": "9647725964474",
        "email": "inam.obaid.iba@atu.edu.iq",
        "specialty": "إدارة صناعية"
      }
    ]
  },
  {
    "id": "poly-act-46",
    "seq": 46,
    "type": "course",
    "raw_type": "دورة",
    "title": "اثر تبني مؤشرات محاسبة الاستدامة وانعكاسها على تحسين عملية التدقيق",
    "department": "محاسبة",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-06-09",
    "end_date": "2026-06-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "جنان عبد العباس باقر / ليث علي حمادي / مرتضى محمد شاني / محمد ديكان عبد الحسين",
    "parsed_lecturers": [
      "جنان عبد العباس باقر",
      "ليث علي حمادي",
      "مرتضى محمد شاني",
      "محمد ديكان عبد الحسين"
    ],
    "lecturer_name": "جنان عبد العباس باقر",
    "lecturer_phone": "9647725085691",
    "lecturer_email": "layth.hammadi@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "جنان عبد العباس باقر",
        "specialty": "محاسبة مالية ودولية"
      },
      {
        "name": "ليث علي حمادي",
        "phone": "9647725085691",
        "email": "layth.hammadi@atu.edu.iq",
        "specialty": "محاسبة مالية"
      },
      {
        "name": "مرتضى محمد شاني",
        "specialty": "محاسبة مالية"
      },
      {
        "name": "محمد ديكان عبد الحسين",
        "specialty": "تدقيق"
      }
    ]
  },
  {
    "id": "poly-act-47",
    "seq": 47,
    "type": "course",
    "raw_type": "دورة",
    "title": "اثر استخدام الذكاء الاصطناعي في عملية التدقيق وانعكاسها على تحسين جودة القوائم المالية",
    "department": "محاسبة",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-20",
    "end_date": "2026-09-24",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ليث علي حمادي / مرتضى محمد شاني / محمد ديكان عبد الحسين / جنان عبد العباس باقر",
    "parsed_lecturers": [
      "ليث علي حمادي",
      "مرتضى محمد شاني",
      "محمد ديكان عبد الحسين",
      "جنان عبد العباس باقر"
    ],
    "lecturer_name": "ليث علي حمادي",
    "lecturer_phone": "9647725085691",
    "lecturer_email": "layth.hammadi@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ليث علي حمادي",
        "phone": "9647725085691",
        "email": "layth.hammadi@atu.edu.iq",
        "specialty": "محاسبة مالية"
      },
      {
        "name": "مرتضى محمد شاني",
        "specialty": "محاسبة مالية"
      },
      {
        "name": "محمد ديكان عبد الحسين",
        "specialty": "تدقيق"
      },
      {
        "name": "جنان عبد العباس باقر",
        "specialty": "محاسبة مالية ودولية"
      }
    ]
  },
  {
    "id": "poly-act-48",
    "seq": 48,
    "type": "course",
    "raw_type": "دورة",
    "title": "التحليل الاستراتيجي للتكاليف في دعم الإدارة العليا في المنظمة",
    "department": "محاسبة",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رقية كاظم حمزة / زينب زهير مهدي / سناء كامل عبيس / سرى علاء جواد",
    "parsed_lecturers": [
      "رقية كاظم حمزة",
      "زينب زهير مهدي",
      "سناء كامل عبيس",
      "سرى علاء جواد"
    ],
    "lecturer_name": "رقية كاظم حمزة",
    "lecturer_phone": "9647711853669",
    "lecturer_email": "zainab.mahde.iba16@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "رقية كاظم حمزة",
        "specialty": "إدارة صناعية"
      },
      {
        "name": "زينب زهير مهدي",
        "phone": "9647711853669",
        "email": "zainab.mahde.iba16@atu.edu.iq",
        "specialty": "محاسبة كلف و إدارية"
      },
      {
        "name": "سناء كامل عبيس",
        "phone": "9647710628974",
        "email": "sanaa.al-mansoory.iba@atu.edu.iq",
        "specialty": "محاسبة"
      },
      {
        "name": "سرى علاء جواد",
        "specialty": "علوم مالية ومصرفية"
      }
    ]
  },
  {
    "id": "poly-act-49",
    "seq": 49,
    "type": "course",
    "raw_type": "دورة",
    "title": "إدارة الأداء باستخدام مؤشرات المحاسبة المالية في المصارف",
    "department": "محاسبة",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-08",
    "end_date": "2026-11-12",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رقية كاظم حمزة / زينب زهير مهدي / سناء كامل عبيس / سحر عبد الحسين مجيد",
    "parsed_lecturers": [
      "رقية كاظم حمزة",
      "زينب زهير مهدي",
      "سناء كامل عبيس",
      "سحر عبد الحسين مجيد"
    ],
    "lecturer_name": "رقية كاظم حمزة",
    "lecturer_phone": "9647711853669",
    "lecturer_email": "zainab.mahde.iba16@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "رقية كاظم حمزة",
        "specialty": "إدارة صناعية"
      },
      {
        "name": "زينب زهير مهدي",
        "phone": "9647711853669",
        "email": "zainab.mahde.iba16@atu.edu.iq",
        "specialty": "محاسبة كلف وإدارية"
      },
      {
        "name": "سناء كامل عبيس",
        "phone": "9647710628974",
        "email": "sanaa.al-mansoory.iba@atu.edu.iq",
        "specialty": "محاسبة"
      },
      {
        "name": "سحر عبد الحسين مجيد",
        "specialty": "علوم مالية ومصرفية"
      }
    ]
  },
  {
    "id": "poly-act-50",
    "seq": 50,
    "type": "course",
    "raw_type": "دورة",
    "title": "التحليل المالي والنقدي ودوره في اتخاذ القرارات الإدارية والاقتصادية",
    "department": "محاسبة",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-06",
    "end_date": "2026-12-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "منى عبد صكبان / سهير ضياء حسين / غصون ثمود محمد / جمانة علي باقر",
    "parsed_lecturers": [
      "منى عبد صكبان",
      "سهير ضياء حسين",
      "غصون ثمود محمد",
      "جمانة علي باقر"
    ],
    "lecturer_name": "منى عبد صكبان",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "منى عبد صكبان",
        "specialty": "علوم مالية ومصرفية"
      },
      {
        "name": "سهير ضياء حسين",
        "specialty": "علوم مالية ومصرفية"
      },
      {
        "name": "غصون ثمود محمد",
        "specialty": "علوم مالية ونقدية"
      },
      {
        "name": "جمانة علي باقر",
        "specialty": "علوم مالية ونقدية"
      }
    ]
  },
  {
    "id": "poly-act-51",
    "seq": 51,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور المعلومات المحاسبية في تحليل المؤشرات الاقتصادية",
    "department": "محاسبة",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-03",
    "end_date": "2027-01-07",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "جمانة علي باقر / غصون ثمود محمد / منى عبد صكبان / سهير ضياء حسين",
    "parsed_lecturers": [
      "جمانة علي باقر",
      "غصون ثمود محمد",
      "منى عبد صكبان",
      "سهير ضياء حسين"
    ],
    "lecturer_name": "جمانة علي باقر",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "جمانة علي باقر",
        "specialty": "علوم مالية ونقدية"
      },
      {
        "name": "غصون ثمود محمد",
        "specialty": "علوم مالية ونقدية"
      },
      {
        "name": "منى عبد صكبان",
        "specialty": "علوم مالية ومصرفية"
      },
      {
        "name": "سهير ضياء حسين",
        "specialty": "علوم مالية ومصرفية"
      }
    ]
  },
  {
    "id": "poly-act-52",
    "seq": 52,
    "type": "course",
    "raw_type": "دورة",
    "title": "القيادة الإدارية وإدارة فريق العمل",
    "department": "إدارة مواد",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-11",
    "end_date": "2026-10-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "حسن جبر / هاشم جبار / نهاية عبيد / ساره سنان",
    "parsed_lecturers": [
      "حسن جبر",
      "هاشم جبار",
      "نهاية عبيد",
      "ساره سنان"
    ],
    "lecturer_name": "حسن جبر",
    "lecturer_phone": "",
    "lecturer_email": "nihaya.abbas.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "حسن جبر",
        "specialty": "إدارة مواد"
      },
      {
        "name": "هاشم جبار",
        "specialty": "إدارة مواد"
      },
      {
        "name": "نهاية عبيد",
        "email": "nihaya.abbas.iba@atu.edu.iq",
        "specialty": "إدارة مواد"
      },
      {
        "name": "ساره سنان",
        "specialty": "اقتصاد"
      }
    ]
  },
  {
    "id": "poly-act-53",
    "seq": 53,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور الذكاء الاصطناعي في إدارة المشروعات الصغيرة",
    "department": "إدارة مواد",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-27",
    "end_date": "2026-10-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "جوان فاضل / حيدر حمودي / رياض نجم / زهراء محمود",
    "parsed_lecturers": [
      "جوان فاضل",
      "حيدر حمودي",
      "رياض نجم",
      "زهراء محمود"
    ],
    "lecturer_name": "جوان فاضل",
    "lecturer_phone": "9647732221397",
    "lecturer_email": "almimar.kadhim@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "جوان فاضل",
        "specialty": "إدارة مواد"
      },
      {
        "name": "حيدر حمودي",
        "phone": "9647732221397",
        "email": "almimar.kadhim@atu.edu.iq",
        "specialty": "إدارة مواد"
      },
      {
        "name": "رياض نجم",
        "phone": "9647806395391",
        "email": "reyadh.obaid@atu.edu.iq",
        "specialty": "إدارة صناعية"
      },
      {
        "name": "زهراء محمود",
        "phone": "9647741961318",
        "email": "zahra.al-murshidi@atu.edu.iq",
        "specialty": "إدارة صناعية"
      }
    ]
  },
  {
    "id": "poly-act-54",
    "seq": 54,
    "type": "course",
    "raw_type": "دورة",
    "title": "التفكير الريادي وتوليد الأفكار الإبداعية",
    "department": "إدارة مواد",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-20",
    "end_date": "2026-09-24",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ليلى منصور / انفال سمير / نور رياض / جنان عبد العباس باقر",
    "parsed_lecturers": [
      "ليلى منصور",
      "انفال سمير",
      "نور رياض",
      "جنان عبد العباس باقر"
    ],
    "lecturer_name": "ليلى منصور",
    "lecturer_phone": "9647806348343",
    "lecturer_email": "layla.mazhar.bib10@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ليلى منصور",
        "phone": "9647806348343",
        "email": "layla.mazhar.bib10@atu.edu.iq",
        "specialty": "ريادة الاعمال"
      },
      {
        "name": "انفال سمير",
        "specialty": "إدارة صناعية"
      },
      {
        "name": "نور رياض",
        "specialty": "إدارة صناعية"
      },
      {
        "name": "جنان عبد العباس باقر",
        "specialty": "ريادة الاعمال"
      }
    ]
  },
  {
    "id": "poly-act-55",
    "seq": 55,
    "type": "course",
    "raw_type": "دورة",
    "title": "تصويب الأخطاء اللغوية الشائعة في الكتابة والتعبير",
    "department": "إدارة مواد",
    "specialty": "اداري",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-16",
    "end_date": "2026-11-18",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "علاء فليح / علي محسن جبر",
    "parsed_lecturers": [
      "علاء فليح",
      "علي محسن جبر"
    ],
    "lecturer_name": "علاء فليح",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "علاء فليح",
        "specialty": "اللغة العربية"
      },
      {
        "name": "علي محسن جبر",
        "specialty": "علوم قران"
      }
    ]
  },
  {
    "id": "poly-act-56",
    "seq": 56,
    "type": "course",
    "raw_type": "دورة",
    "title": "ريادة الاعمال الرقمية والتجارة الالكترونية",
    "department": "إدارة مواد",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-01",
    "end_date": "2026-11-05",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ليلى منصور / جنان عبد العباس باقر / ساره سنان / هاشم جبار",
    "parsed_lecturers": [
      "ليلى منصور",
      "جنان عبد العباس باقر",
      "ساره سنان",
      "هاشم جبار"
    ],
    "lecturer_name": "ليلى منصور",
    "lecturer_phone": "9647806348343",
    "lecturer_email": "layla.mazhar.bib10@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ليلى منصور",
        "phone": "9647806348343",
        "email": "layla.mazhar.bib10@atu.edu.iq",
        "specialty": "ريادة الاعمال"
      },
      {
        "name": "جنان عبد العباس باقر",
        "specialty": "ريادة الاعمال"
      },
      {
        "name": "ساره سنان",
        "specialty": "اقتصاد"
      },
      {
        "name": "هاشم جبار",
        "specialty": "إدارة اعمال"
      }
    ]
  },
  {
    "id": "poly-act-57",
    "seq": 57,
    "type": "course",
    "raw_type": "دورة",
    "title": "فاعلية الجهات الإدارية في مكافحة الفساد المالي والإداري",
    "department": "إدارة مواد",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-18",
    "end_date": "2026-10-22",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "جوان فاضل / زينا محمد / رضاء عبد الخضر / حسن جبر",
    "parsed_lecturers": [
      "جوان فاضل",
      "زينا محمد",
      "رضاء عبد الخضر",
      "حسن جبر"
    ],
    "lecturer_name": "جوان فاضل",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "جوان فاضل",
        "specialty": "إدارة اعمال"
      },
      {
        "name": "زينا محمد",
        "specialty": "محاسبة"
      },
      {
        "name": "رضاء عبد الخضر",
        "specialty": "محاسبة"
      },
      {
        "name": "حسن جبر",
        "specialty": "إدارة اعمال"
      }
    ]
  },
  {
    "id": "poly-act-58",
    "seq": 58,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور الأدارة في مكافحة جرائم الفساد الاداري والمالي في ظل التحول الرقمي",
    "department": "الادلة الجنائية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-20",
    "end_date": "2026-09-24",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زهير محمد هاشم / اسيل حاتم تومان / اسعد دخيل هادي / احمد فاضل ناجي",
    "parsed_lecturers": [
      "زهير محمد هاشم",
      "اسيل حاتم تومان",
      "اسعد دخيل هادي",
      "احمد فاضل ناجي"
    ],
    "lecturer_name": "زهير محمد هاشم",
    "lecturer_phone": "9647731953404",
    "lecturer_email": "zuohair.hamza@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زهير محمد هاشم",
        "phone": "9647731953404",
        "email": "zuohair.hamza@atu.edu.iq",
        "specialty": "قانون"
      },
      {
        "name": "اسيل حاتم تومان",
        "specialty": "قانون"
      },
      {
        "name": "اسعد دخيل هادي",
        "phone": "9647725235990",
        "email": "asaad.hadi@atu.edu.iq",
        "specialty": "قانون"
      },
      {
        "name": "احمد فاضل ناجي",
        "specialty": "قانون"
      }
    ]
  },
  {
    "id": "poly-act-59",
    "seq": 59,
    "type": "course",
    "raw_type": "دورة",
    "title": "استخدام العلوم الهندسية والطبية في كشف الادلة الجنائية",
    "department": "الادلة الجنائية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-27",
    "end_date": "2026-10-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "عباس رزاق عبد / دريد عبد الرزاق حمد / رائد قائد عجمي / علي صلاح وهاب",
    "parsed_lecturers": [
      "عباس رزاق عبد",
      "دريد عبد الرزاق حمد",
      "رائد قائد عجمي",
      "علي صلاح وهاب"
    ],
    "lecturer_name": "عباس رزاق عبد",
    "lecturer_phone": "9647800719405",
    "lecturer_email": "inb.abs3@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "عباس رزاق عبد",
        "phone": "9647800719405",
        "email": "inb.abs3@atu.edu.iq",
        "specialty": "طبي"
      },
      {
        "name": "دريد عبد الرزاق حمد",
        "phone": "9647773489775",
        "email": "durid.hamad.iba@atu.edu.iq",
        "specialty": "هندسي"
      },
      {
        "name": "رائد قائد عجمي",
        "phone": "9647816080007",
        "email": "raied.ajmi.iba112@atu.edu.iq",
        "specialty": "هندسي"
      },
      {
        "name": "علي صلاح وهاب",
        "phone": "9647875630448",
        "email": "elyaali207@gmail.com",
        "specialty": "قانون"
      }
    ]
  },
  {
    "id": "poly-act-60",
    "seq": 60,
    "type": "course",
    "raw_type": "دورة",
    "title": "المسؤولية القانونية للمستجيب الاول واجبات مأمور الضبط القضائي في مسرح الجريمة",
    "department": "الادلة الجنائية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "احمد رعد عزيز / زيد احمد خليل / فاضل محمد احمد / احمد فاضل ناجي",
    "parsed_lecturers": [
      "احمد رعد عزيز",
      "زيد احمد خليل",
      "فاضل محمد احمد",
      "احمد فاضل ناجي"
    ],
    "lecturer_name": "احمد رعد عزيز",
    "lecturer_phone": "9647832432643",
    "lecturer_email": "ahmed.azeez.iba113@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "احمد رعد عزيز",
        "phone": "9647832432643",
        "email": "ahmed.azeez.iba113@atu.edu.iq",
        "specialty": "قانون"
      },
      {
        "name": "زيد احمد خليل",
        "phone": "9647713534665",
        "email": "zaidaltufail@gmail.com",
        "specialty": "قانون"
      },
      {
        "name": "فاضل محمد احمد",
        "phone": "9647822033307",
        "email": "fadhel.ahmed.iba107@atu.edu.iq",
        "specialty": "قانون"
      },
      {
        "name": "احمد فاضل ناجي",
        "specialty": "قانون"
      }
    ]
  },
  {
    "id": "poly-act-61",
    "seq": 61,
    "type": "course",
    "raw_type": "دورة",
    "title": "البصمة الوراثية كأثبات جنائي",
    "department": "الادلة الجنائية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-11",
    "end_date": "2026-10-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "علي صلاح وهاب / احمد عبد الرسول عبد الرضا / كوثر عبد الحسين علوان / فاضل محمد احمد",
    "parsed_lecturers": [
      "علي صلاح وهاب",
      "احمد عبد الرسول عبد الرضا",
      "كوثر عبد الحسين علوان",
      "فاضل محمد احمد"
    ],
    "lecturer_name": "علي صلاح وهاب",
    "lecturer_phone": "9647875630448",
    "lecturer_email": "elyaali207@gmail.com",
    "lecturers_details": [
      {
        "name": "علي صلاح وهاب",
        "phone": "9647875630448",
        "email": "elyaali207@gmail.com",
        "specialty": "قانون"
      },
      {
        "name": "احمد عبد الرسول عبد الرضا",
        "phone": "9647829012707",
        "email": "ahmed.jaber.iba114@atu.edu.iq",
        "specialty": "قانون"
      },
      {
        "name": "كوثر عبد الحسين علوان",
        "phone": "9647725707862",
        "email": "kawthar.alwan.iba@atu.edu.iq",
        "specialty": "قانون"
      },
      {
        "name": "فاضل محمد احمد",
        "phone": "9647822033307",
        "email": "fadhel.ahmed.iba107@atu.edu.iq",
        "specialty": "قانون"
      }
    ]
  },
  {
    "id": "poly-act-62",
    "seq": 62,
    "type": "course",
    "raw_type": "دورة",
    "title": "حقوق المتهم والمجني عليه اثناء الفحص الطبي الشرعي",
    "department": "الادلة الجنائية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-18",
    "end_date": "2026-10-22",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "عباس رزاق عبد / احمد رعد عزيز / زيد احمد خليل / احمد عبد الرسول عبد الرضا",
    "parsed_lecturers": [
      "عباس رزاق عبد",
      "احمد رعد عزيز",
      "زيد احمد خليل",
      "احمد عبد الرسول عبد الرضا"
    ],
    "lecturer_name": "عباس رزاق عبد",
    "lecturer_phone": "9647800719405",
    "lecturer_email": "inb.abs3@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "عباس رزاق عبد",
        "phone": "9647800719405",
        "email": "inb.abs3@atu.edu.iq",
        "specialty": "طبي"
      },
      {
        "name": "احمد رعد عزيز",
        "phone": "9647832432643",
        "email": "ahmed.azeez.iba113@atu.edu.iq",
        "specialty": "قانون"
      },
      {
        "name": "زيد احمد خليل",
        "phone": "9647713534665",
        "email": "zaidaltufail@gmail.com",
        "specialty": "قانون"
      },
      {
        "name": "احمد عبد الرسول عبد الرضا",
        "phone": "9647829012707",
        "email": "ahmed.jaber.iba114@atu.edu.iq",
        "specialty": "قانون"
      }
    ]
  },
  {
    "id": "poly-act-63",
    "seq": 63,
    "type": "course",
    "raw_type": "دورة",
    "title": "الاخطاء الطبية بين المسؤولية المدنية والجنائية",
    "department": "الادلة الجنائية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-25",
    "end_date": "2026-10-29",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "عباس رزاق عبد / زيد احمد خليل / احمد فاضل ناجي / كوثر عبد الحسين علوان",
    "parsed_lecturers": [
      "عباس رزاق عبد",
      "زيد احمد خليل",
      "احمد فاضل ناجي",
      "كوثر عبد الحسين علوان"
    ],
    "lecturer_name": "عباس رزاق عبد",
    "lecturer_phone": "9647800719405",
    "lecturer_email": "inb.abs3@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "عباس رزاق عبد",
        "phone": "9647800719405",
        "email": "inb.abs3@atu.edu.iq",
        "specialty": "طبي"
      },
      {
        "name": "زيد احمد خليل",
        "phone": "9647713534665",
        "email": "zaidaltufail@gmail.com",
        "specialty": "قانون"
      },
      {
        "name": "احمد فاضل ناجي",
        "specialty": "قانون"
      },
      {
        "name": "كوثر عبد الحسين علوان",
        "phone": "9647725707862",
        "email": "kawthar.alwan.iba@atu.edu.iq",
        "specialty": "قانون"
      }
    ]
  },
  {
    "id": "poly-act-64",
    "seq": 64,
    "type": "course",
    "raw_type": "دورة",
    "title": "الهندسة الطبية الرقمية",
    "department": "الأجهزة الطبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-18",
    "end_date": "2026-10-22",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "محمد ازهر رزاق / حيدر فاضل عبد السادة / حسام حسن محمد",
    "parsed_lecturers": [
      "محمد ازهر رزاق",
      "حيدر فاضل عبد السادة",
      "حسام حسن محمد"
    ],
    "lecturer_name": "محمد ازهر رزاق",
    "lecturer_phone": "9647801687294",
    "lecturer_email": "coj.moh6@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "محمد ازهر رزاق",
        "phone": "9647801687294",
        "email": "coj.moh6@atu.edu.iq",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "حيدر فاضل عبد السادة",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "حسام حسن محمد",
        "specialty": "هندسة كهرباء"
      }
    ]
  },
  {
    "id": "poly-act-65",
    "seq": 65,
    "type": "course",
    "raw_type": "دورة",
    "title": "اساسيات برنامج الماتلاب",
    "department": "الأجهزة الطبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-25",
    "end_date": "2026-10-29",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "حسين علي محمد / دلائل سعد عبد الزهرة / اشراق مرزة حسن",
    "parsed_lecturers": [
      "حسين علي محمد",
      "دلائل سعد عبد الزهرة",
      "اشراق مرزة حسن"
    ],
    "lecturer_name": "حسين علي محمد",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "حسين علي محمد",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "دلائل سعد عبد الزهرة",
        "specialty": "رياضيات"
      },
      {
        "name": "اشراق مرزة حسن",
        "specialty": "حاسبات"
      }
    ]
  },
  {
    "id": "poly-act-66",
    "seq": 66,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور الطاقات المتجددة والشبكة الذكية لتطوير واقع الطاقة الكهربائية",
    "department": "الأجهزة الطبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-20",
    "end_date": "2026-09-24",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "حسام حسن محمد / هبة زهير / محمد مصدق شلاه",
    "parsed_lecturers": [
      "حسام حسن محمد",
      "هبة زهير",
      "محمد مصدق شلاه"
    ],
    "lecturer_name": "حسام حسن محمد",
    "lecturer_phone": "9647730085060",
    "lecturer_email": "heba.abdalkareem@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "حسام حسن محمد",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "هبة زهير",
        "phone": "9647730085060",
        "email": "heba.abdalkareem@atu.edu.iq",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "محمد مصدق شلاه",
        "specialty": "هندسة كهرباء"
      }
    ]
  },
  {
    "id": "poly-act-67",
    "seq": 67,
    "type": "course",
    "raw_type": "دورة",
    "title": "التحكم بتشغيل وصيانة الأجهزة الطبية الحديثة",
    "department": "الأجهزة الطبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-27",
    "end_date": "2026-10-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "باسم جبار مجيد / زيد علي حمود / عبد الحسين عبد الزهرة",
    "parsed_lecturers": [
      "باسم جبار مجيد",
      "زيد علي حمود",
      "عبد الحسين عبد الزهرة"
    ],
    "lecturer_name": "باسم جبار مجيد",
    "lecturer_phone": "9647822285663",
    "lecturer_email": "basim.majeed@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "باسم جبار مجيد",
        "phone": "9647822285663",
        "email": "basim.majeed@atu.edu.iq",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "زيد علي حمود",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "عبد الحسين عبد الزهرة",
        "phone": "9647888007744",
        "email": "abdul.abd@atu.edu.iq",
        "specialty": "هندسة كهرباء"
      }
    ]
  },
  {
    "id": "poly-act-68",
    "seq": 68,
    "type": "course",
    "raw_type": "دورة",
    "title": "اساسيات البيولوجيا الطبية لقسم تقنيات الأجهزة الطبية",
    "department": "الأجهزة الطبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "امير قصي عباس / غيث علي / علي عبد الكريم",
    "parsed_lecturers": [
      "امير قصي عباس",
      "غيث علي",
      "علي عبد الكريم"
    ],
    "lecturer_name": "امير قصي عباس",
    "lecturer_phone": "9647728261076",
    "lecturer_email": "ameer.abbas.iba1@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "امير قصي عباس",
        "phone": "9647728261076",
        "email": "ameer.abbas.iba1@atu.edu.iq",
        "specialty": "علوم حياة"
      },
      {
        "name": "غيث علي",
        "specialty": "علوم حياة"
      },
      {
        "name": "علي عبد الكريم",
        "specialty": "علوم حياة"
      }
    ]
  },
  {
    "id": "poly-act-69",
    "seq": 69,
    "type": "course",
    "raw_type": "دورة",
    "title": "تصميم دوائر المرشحات الالكترونية باستخدام مكبر العمليات ذو الموصلية الانتقالية ota",
    "department": "الأجهزة الطبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-11",
    "end_date": "2026-10-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "عبد الحسين عبد الزهرة / محمد مصدق شلاه / زيد علي حمود",
    "parsed_lecturers": [
      "عبد الحسين عبد الزهرة",
      "محمد مصدق شلاه",
      "زيد علي حمود"
    ],
    "lecturer_name": "عبد الحسين عبد الزهرة",
    "lecturer_phone": "9647888007744",
    "lecturer_email": "abdul.abd@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "عبد الحسين عبد الزهرة",
        "phone": "9647888007744",
        "email": "abdul.abd@atu.edu.iq",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "محمد مصدق شلاه",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "زيد علي حمود",
        "specialty": "هندسة كهرباء"
      }
    ]
  },
  {
    "id": "poly-act-70",
    "seq": 70,
    "type": "course",
    "raw_type": "دورة",
    "title": "الكيمياء الصيدلانية وتطبيقاتها في تحضير الادوية",
    "department": "الصيدلة",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-11",
    "end_date": "2026-10-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "بارق عبد اللطيف / حسام عادل / طيبة صالح / حوراء صلاح",
    "parsed_lecturers": [
      "بارق عبد اللطيف",
      "حسام عادل",
      "طيبة صالح",
      "حوراء صلاح"
    ],
    "lecturer_name": "بارق عبد اللطيف",
    "lecturer_phone": "9647732616549",
    "lecturer_email": "teeba.kadhim.iba111@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "بارق عبد اللطيف",
        "specialty": "طبي"
      },
      {
        "name": "حسام عادل",
        "specialty": "علوم"
      },
      {
        "name": "طيبة صالح",
        "phone": "9647732616549",
        "email": "teeba.kadhim.iba111@atu.edu.iq",
        "specialty": "علوم"
      },
      {
        "name": "حوراء صلاح",
        "specialty": "علوم"
      }
    ]
  },
  {
    "id": "poly-act-71",
    "seq": 71,
    "type": "course",
    "raw_type": "دورة",
    "title": "الأسباب المايكروبية للاجهاض وطرق التشخيص المختبرية",
    "department": "الصيدلة",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "خود عبد المجيد / سيف أنور / زينب عبودي عباس / اقبال زهو",
    "parsed_lecturers": [
      "خود عبد المجيد",
      "سيف أنور",
      "زينب عبودي عباس",
      "اقبال زهو"
    ],
    "lecturer_name": "خود عبد المجيد",
    "lecturer_phone": "9647816833294",
    "lecturer_email": "zainab.abbas.iba114@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "خود عبد المجيد",
        "specialty": "طبي"
      },
      {
        "name": "سيف أنور",
        "specialty": "طبي"
      },
      {
        "name": "زينب عبودي عباس",
        "phone": "9647816833294",
        "email": "zainab.abbas.iba114@atu.edu.iq",
        "specialty": "علوم"
      },
      {
        "name": "اقبال زهو",
        "phone": "9647725247246",
        "email": "iqbal.abed.iba@atu.edu.iq",
        "specialty": "علوم"
      }
    ]
  },
  {
    "id": "poly-act-72",
    "seq": 72,
    "type": "course",
    "raw_type": "دورة",
    "title": "استخدام الأجهزة الحديثة في التشخيص الجزيئي للمرضات الميكروبية",
    "department": "الصيدلة",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-27",
    "end_date": "2026-10-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "بارق عبد اللطيف / حوراء احمد / هالة حسين / حوراء صلاح",
    "parsed_lecturers": [
      "بارق عبد اللطيف",
      "حوراء احمد",
      "هالة حسين",
      "حوراء صلاح"
    ],
    "lecturer_name": "بارق عبد اللطيف",
    "lecturer_phone": "9647800766228",
    "lecturer_email": "halahussein430@gmail.com",
    "lecturers_details": [
      {
        "name": "بارق عبد اللطيف",
        "specialty": "طبي"
      },
      {
        "name": "حوراء احمد",
        "specialty": "طبي"
      },
      {
        "name": "هالة حسين",
        "phone": "9647800766228",
        "email": "halahussein430@gmail.com",
        "specialty": "طبي"
      },
      {
        "name": "حوراء صلاح",
        "specialty": "طبي"
      }
    ]
  },
  {
    "id": "poly-act-73",
    "seq": 73,
    "type": "course",
    "raw_type": "دورة",
    "title": "علم النباتات الطبية واستخداماتها الدوائية",
    "department": "الصيدلة",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-20",
    "end_date": "2026-09-24",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "عبير فاضل / اقبال زهو / مروة علي / قصي جنابي",
    "parsed_lecturers": [
      "عبير فاضل",
      "اقبال زهو",
      "مروة علي",
      "قصي جنابي"
    ],
    "lecturer_name": "عبير فاضل",
    "lecturer_phone": "9647725247246",
    "lecturer_email": "iqbal.abed.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "عبير فاضل",
        "specialty": "طبي"
      },
      {
        "name": "اقبال زهو",
        "phone": "9647725247246",
        "email": "iqbal.abed.iba@atu.edu.iq",
        "specialty": "علوم"
      },
      {
        "name": "مروة علي",
        "specialty": "طبي"
      },
      {
        "name": "قصي جنابي",
        "specialty": "طبي"
      }
    ]
  },
  {
    "id": "poly-act-74",
    "seq": 74,
    "type": "course",
    "raw_type": "دورة",
    "title": "اسياسيات شبكات الحاسوب",
    "department": "الصيدلة",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-13",
    "end_date": "2026-09-17",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "وفاء محمد / هدى فلاح / سيف أنور / خلود عبد المجيد",
    "parsed_lecturers": [
      "وفاء محمد",
      "هدى فلاح",
      "سيف أنور",
      "خلود عبد المجيد"
    ],
    "lecturer_name": "وفاء محمد",
    "lecturer_phone": "9647810965598",
    "lecturer_email": "huda.falah@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "وفاء محمد",
        "specialty": "هندسي"
      },
      {
        "name": "هدى فلاح",
        "phone": "9647810965598",
        "email": "huda.falah@atu.edu.iq",
        "specialty": "اللغة الإنكليزية"
      },
      {
        "name": "سيف أنور",
        "specialty": "طبي"
      },
      {
        "name": "خلود عبد المجيد",
        "phone": "9647814263880",
        "email": "khuloodmajeed91@gmail.com",
        "specialty": "طبي"
      }
    ]
  },
  {
    "id": "poly-act-75",
    "seq": 75,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور الاحياء المجهرية في معالجة التلوث البيئي",
    "department": "تمريض",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-06",
    "end_date": "2026-09-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "مريم صادق عيسى / انتصار خليف فليفل / حنان سليم / ياسر وسام عبد الزهراء",
    "parsed_lecturers": [
      "مريم صادق عيسى",
      "انتصار خليف فليفل",
      "حنان سليم",
      "ياسر وسام عبد الزهراء"
    ],
    "lecturer_name": "مريم صادق عيسى",
    "lecturer_phone": "9647810060775",
    "lecturer_email": "intisar.khlaif@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "مريم صادق عيسى",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "انتصار خليف فليفل",
        "phone": "9647810060775",
        "email": "intisar.khlaif@atu.edu.iq",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "حنان سليم",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "ياسر وسام عبد الزهراء",
        "specialty": "علوم زراعية"
      }
    ]
  },
  {
    "id": "poly-act-76",
    "seq": 76,
    "type": "course",
    "raw_type": "دورة",
    "title": "استخدام تقنية التصوير المقطعي الدقيق كبديل للتقطيع النسيجي في الاجنه",
    "department": "تمريض",
    "specialty": "طبي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-06",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رباب عدنان حمزة / نور محمد ابراهيم",
    "parsed_lecturers": [
      "رباب عدنان حمزة",
      "نور محمد ابراهيم"
    ],
    "lecturer_name": "رباب عدنان حمزة",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "رباب عدنان حمزة",
        "specialty": "تشريح وانسجة"
      },
      {
        "name": "نور محمد ابراهيم",
        "specialty": "اجنة"
      }
    ]
  },
  {
    "id": "poly-act-77",
    "seq": 77,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور التمريض في الكشف عن مرض باركنسون باستخدام التعلم العميق عبر الكتابة اليدوية",
    "department": "تمريض",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-01",
    "end_date": "2026-11-03",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "محمد فارس / صلاح سعيد هاشم / ليث عبد الامير",
    "parsed_lecturers": [
      "محمد فارس",
      "صلاح سعيد هاشم",
      "ليث عبد الامير"
    ],
    "lecturer_name": "محمد فارس",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "محمد فارس",
        "specialty": "حاسبات"
      },
      {
        "name": "صلاح سعيد هاشم",
        "specialty": "تمريض"
      },
      {
        "name": "ليث عبد الامير",
        "specialty": "تمريض"
      }
    ]
  },
  {
    "id": "poly-act-78",
    "seq": 78,
    "type": "course",
    "raw_type": "دورة",
    "title": "تاثير اللغة الانكليزية على التفكير والسلوك النفسي",
    "department": "تمريض",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-28",
    "end_date": "2026-09-30",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ايناس حيدر / نهى قاسم سهيل / عواطف حميد",
    "parsed_lecturers": [
      "ايناس حيدر",
      "نهى قاسم سهيل",
      "عواطف حميد"
    ],
    "lecturer_name": "ايناس حيدر",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "ايناس حيدر",
        "specialty": "انكليزي"
      },
      {
        "name": "نهى قاسم سهيل",
        "specialty": "انكليزي"
      },
      {
        "name": "عواطف حميد",
        "specialty": "علم نفس"
      }
    ]
  },
  {
    "id": "poly-act-79",
    "seq": 79,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور مضدات الاكسدة للوقاية من الامراض المزمنة",
    "department": "تمريض",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-27",
    "end_date": "2026-10-29",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سوسن حسن / حسين عدنان حسين / عبير حسن",
    "parsed_lecturers": [
      "سوسن حسن",
      "حسين عدنان حسين",
      "عبير حسن"
    ],
    "lecturer_name": "سوسن حسن",
    "lecturer_phone": "9647738072261",
    "lecturer_email": "abbeer.madlom.iba104@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "سوسن حسن",
        "specialty": "كيمياء حياتية سريرية"
      },
      {
        "name": "حسين عدنان حسين",
        "specialty": "كيمياء حياتية"
      },
      {
        "name": "عبير حسن",
        "phone": "9647738072261",
        "email": "abbeer.madlom.iba104@atu.edu.iq",
        "specialty": "كيمياء عضوية"
      }
    ]
  },
  {
    "id": "poly-act-80",
    "seq": 80,
    "type": "course",
    "raw_type": "دورة",
    "title": "تاتير المضادات الحيوية على تكوين البروتين داخل الجسم",
    "department": "مختبرات طبية",
    "specialty": "طبي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-13",
    "end_date": "2026-12-17",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رؤى وهاب / وسام فارس",
    "parsed_lecturers": [
      "رؤى وهاب",
      "وسام فارس"
    ],
    "lecturer_name": "رؤى وهاب",
    "lecturer_phone": "9647601017371",
    "lecturer_email": "roaa.mohammed@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "رؤى وهاب",
        "phone": "9647601017371",
        "email": "roaa.mohammed@atu.edu.iq",
        "specialty": "كيمياء"
      },
      {
        "name": "وسام فارس",
        "specialty": "علوم حياة"
      }
    ]
  },
  {
    "id": "poly-act-81",
    "seq": 81,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور البكتيريا في الالتهابات المجاري البولية واليات تشخيصها",
    "department": "مختبرات طبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-03",
    "end_date": "2027-01-07",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زينب ناصر نبات / مها حميد اسماعيل / مها عادل حسين",
    "parsed_lecturers": [
      "زينب ناصر نبات",
      "مها حميد اسماعيل",
      "مها عادل حسين"
    ],
    "lecturer_name": "زينب ناصر نبات",
    "lecturer_phone": "9647831394533",
    "lecturer_email": "zainab.nabat@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زينب ناصر نبات",
        "phone": "9647831394533",
        "email": "zainab.nabat@atu.edu.iq",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "مها حميد اسماعيل",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "مها عادل حسين",
        "phone": "9647800441299",
        "email": "maha.hussain.iba100@atu.edu.iq",
        "specialty": "احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-82",
    "seq": 82,
    "type": "course",
    "raw_type": "دورة",
    "title": "الفسلجة الرقمية ( فهم وضائف الجسم من خلال البرمجة )",
    "department": "مختبرات طبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-11",
    "end_date": "2026-10-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "حيدر حسين / سيف عبيد / ود عبد الخالق عبد زيد / علي موجد",
    "parsed_lecturers": [
      "حيدر حسين",
      "سيف عبيد",
      "ود عبد الخالق عبد زيد",
      "علي موجد"
    ],
    "lecturer_name": "حيدر حسين",
    "lecturer_phone": "9647812044586",
    "lecturer_email": "wid.abdzaid@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "حيدر حسين",
        "specialty": "طفيليات بيطرية"
      },
      {
        "name": "سيف عبيد",
        "specialty": "شبكات الحاسوب"
      },
      {
        "name": "ود عبد الخالق عبد زيد",
        "phone": "9647812044586",
        "email": "wid.abdzaid@atu.edu.iq",
        "specialty": "فسلجة دم"
      },
      {
        "name": "علي موجد",
        "specialty": "فسلجة طبية"
      }
    ]
  },
  {
    "id": "poly-act-83",
    "seq": 83,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور تقنيات الذكاء الرقمي في تحليل تاثير البكتيريا على الوظائف الفسيولوجية للمعدة",
    "department": "مختبرات طبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-20",
    "end_date": "2026-09-24",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سارة عبد الكريم مخيف / ود عبد الخالق عبد زيد / ايات رحيم خلف",
    "parsed_lecturers": [
      "سارة عبد الكريم مخيف",
      "ود عبد الخالق عبد زيد",
      "ايات رحيم خلف"
    ],
    "lecturer_name": "سارة عبد الكريم مخيف",
    "lecturer_phone": "9647804734690",
    "lecturer_email": "sarah.mukheef@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "سارة عبد الكريم مخيف",
        "phone": "9647804734690",
        "email": "sarah.mukheef@atu.edu.iq",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "ود عبد الخالق عبد زيد",
        "phone": "9647812044586",
        "email": "wid.abdzaid@atu.edu.iq",
        "specialty": "فسلجة دم"
      },
      {
        "name": "ايات رحيم خلف",
        "specialty": "احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-84",
    "seq": 84,
    "type": "course",
    "raw_type": "دورة",
    "title": "واستخدام تقنيات الذكاء الاصطناعي في تشخيص الامراض البكتيرية والفطرية",
    "department": "مختبرات طبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-25",
    "end_date": "2026-10-29",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "وسام فارس / منى غافل / سارة عبد الكريم / انتصار مرزوك",
    "parsed_lecturers": [
      "وسام فارس",
      "منى غافل",
      "سارة عبد الكريم",
      "انتصار مرزوك"
    ],
    "lecturer_name": "وسام فارس",
    "lecturer_phone": "9647804734690",
    "lecturer_email": "sarah.mukheef@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "وسام فارس",
        "specialty": "علوم حياة"
      },
      {
        "name": "منى غافل",
        "specialty": "علوم حياة"
      },
      {
        "name": "سارة عبد الكريم",
        "phone": "9647804734690",
        "email": "sarah.mukheef@atu.edu.iq",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "انتصار مرزوك",
        "specialty": "فطريات"
      }
    ]
  },
  {
    "id": "poly-act-85",
    "seq": 85,
    "type": "course",
    "raw_type": "دورة",
    "title": "توظيف الذكاء الاصطناعي والتعلم الالي في اكتشاف المواد الكيميائية",
    "department": "مختبرات طبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سيف عبد حسين / رؤى وهاب / رواء رحيم كريم",
    "parsed_lecturers": [
      "سيف عبد حسين",
      "رؤى وهاب",
      "رواء رحيم كريم"
    ],
    "lecturer_name": "سيف عبد حسين",
    "lecturer_phone": "9647601017371",
    "lecturer_email": "roaa.mohammed@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "سيف عبد حسين",
        "specialty": "الحاسبات"
      },
      {
        "name": "رؤى وهاب",
        "phone": "9647601017371",
        "email": "roaa.mohammed@atu.edu.iq",
        "specialty": "كيمياء عضوية"
      },
      {
        "name": "رواء رحيم كريم",
        "phone": "9647711962186",
        "email": "rawaa.raheem@atu.edu.iq",
        "specialty": "كيمياء تحليلية"
      }
    ]
  },
  {
    "id": "poly-act-86",
    "seq": 86,
    "type": "course",
    "raw_type": "دورة",
    "title": "تقييم الفاعلية التثبيطية لمستخلص الكركم والزنجبيل على الكائنات الممرضة",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-06",
    "end_date": "2026-12-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ابتسام محمد حسين / نجلاء جواد حساني / حيدر فرحان عبد الله / بلال نجم عبد",
    "parsed_lecturers": [
      "ابتسام محمد حسين",
      "نجلاء جواد حساني",
      "حيدر فرحان عبد الله",
      "بلال نجم عبد"
    ],
    "lecturer_name": "ابتسام محمد حسين",
    "lecturer_phone": "9647831691033",
    "lecturer_email": "inb.ebts@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ابتسام محمد حسين",
        "phone": "9647831691033",
        "email": "inb.ebts@atu.edu.iq",
        "specialty": "مقاومة احيائية"
      },
      {
        "name": "نجلاء جواد حساني",
        "phone": "9647819426402",
        "email": "najlaajawad66.iba@atu.edu.iq",
        "specialty": "كيمياء"
      },
      {
        "name": "حيدر فرحان عبد الله",
        "phone": "9647724202768",
        "email": "haider.abdullah.iba3@atu.edu.iq",
        "specialty": "علوم بيئة"
      },
      {
        "name": "بلال نجم عبد",
        "specialty": "صحة المجتمع"
      }
    ]
  },
  {
    "id": "poly-act-87",
    "seq": 87,
    "type": "course",
    "raw_type": "دورة",
    "title": "التلوث النووي وسبل الوقاية منه",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-11",
    "end_date": "2026-10-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زينب كريم جواد / ميسون كوشي جاسم / اسيل حافظ جواد / اياد عباس عناد",
    "parsed_lecturers": [
      "زينب كريم جواد",
      "ميسون كوشي جاسم",
      "اسيل حافظ جواد",
      "اياد عباس عناد"
    ],
    "lecturer_name": "زينب كريم جواد",
    "lecturer_phone": "9647703452610",
    "lecturer_email": "inb.znb5@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زينب كريم جواد",
        "phone": "9647703452610",
        "email": "inb.znb5@atu.edu.iq",
        "specialty": "علوم حياة"
      },
      {
        "name": "ميسون كوشي جاسم",
        "email": "maysoon.hussein.iba@atu.edu.iq",
        "specialty": "علوم حياة"
      },
      {
        "name": "اسيل حافظ جواد",
        "phone": "9647813437240",
        "email": "aseel.abbod.iba@atu.edu.iq",
        "specialty": "صحة المجتمع"
      },
      {
        "name": "اياد عباس عناد",
        "specialty": "صحة المجتمع"
      }
    ]
  },
  {
    "id": "poly-act-88",
    "seq": 88,
    "type": "course",
    "raw_type": "دورة",
    "title": "الجسيمات النانوية كناقلات للقاحات والعلاجات المناعية",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-20",
    "end_date": "2026-12-24",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "دعاء حسن هادي / بلال عصام فاضل / ايناس عباس خير الله / علي كريم حميد",
    "parsed_lecturers": [
      "دعاء حسن هادي",
      "بلال عصام فاضل",
      "ايناس عباس خير الله",
      "علي كريم حميد"
    ],
    "lecturer_name": "دعاء حسن هادي",
    "lecturer_phone": "9647811146242",
    "lecturer_email": "duaa.hadi.iba13@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "دعاء حسن هادي",
        "phone": "9647811146242",
        "email": "duaa.hadi.iba13@atu.edu.iq",
        "specialty": "مناعة"
      },
      {
        "name": "بلال عصام فاضل",
        "phone": "9647723767902",
        "email": "isambilal090@gmail.com",
        "specialty": "مناعة"
      },
      {
        "name": "ايناس عباس خير الله",
        "email": "inas.khairualla@atu.edu.iq",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "علي كريم حميد",
        "specialty": "فسلجة"
      }
    ]
  },
  {
    "id": "poly-act-89",
    "seq": 89,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور هرمون الميلاتونين في تنظيم النوم وتاثير استخدام الحاسوب على افرازه",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سالينا عبد العباس ناصر / علي سامر سليم / علي كريم حميد / سارة عبد الخالق",
    "parsed_lecturers": [
      "سالينا عبد العباس ناصر",
      "علي سامر سليم",
      "علي كريم حميد",
      "سارة عبد الخالق"
    ],
    "lecturer_name": "سالينا عبد العباس ناصر",
    "lecturer_phone": "9647819165118",
    "lecturer_email": "dr.salina8@gmail.com",
    "lecturers_details": [
      {
        "name": "سالينا عبد العباس ناصر",
        "phone": "9647819165118",
        "email": "dr.salina8@gmail.com",
        "specialty": "فسلجة طبية"
      },
      {
        "name": "علي سامر سليم",
        "phone": "9647711112624",
        "email": "ali.selim.iba105@atu.edu.iq",
        "specialty": "حاسبات"
      },
      {
        "name": "علي كريم حميد",
        "specialty": "فسلجة طبية"
      },
      {
        "name": "سارة عبد الخالق",
        "specialty": "فسلجة"
      }
    ]
  },
  {
    "id": "poly-act-90",
    "seq": 90,
    "type": "course",
    "raw_type": "دورة",
    "title": "الميكروبات المسببة لالتهابات المسالك البولية",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-25",
    "end_date": "2026-10-29",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ايناس عباس خير الله / شهد سعد محمد / سوزان راضي حسين / شيماء عبد الجبار",
    "parsed_lecturers": [
      "ايناس عباس خير الله",
      "شهد سعد محمد",
      "سوزان راضي حسين",
      "شيماء عبد الجبار"
    ],
    "lecturer_name": "ايناس عباس خير الله",
    "lecturer_phone": "9647814640434",
    "lecturer_email": "inas.khairualla@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ايناس عباس خير الله",
        "email": "inas.khairualla@atu.edu.iq",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "شهد سعد محمد",
        "phone": "9647814640434",
        "email": "shahadmostfa674@gmail.com",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "سوزان راضي حسين",
        "phone": "9647813961398",
        "email": "suzan.hussain.iba103@atu.edu.iq",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "شيماء عبد الجبار",
        "phone": "9647829304616",
        "email": "shymaa.saeed@atu.edu.iq",
        "specialty": "احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-91",
    "seq": 91,
    "type": "course",
    "raw_type": "دورة",
    "title": "استخدام تقنيات النانوية في تشخيص الامراض المناعية",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-15",
    "end_date": "2026-11-19",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "دعاء حسن هادي / بلال عصام فاضل / نائل عباس كاظم / ثناء عبد المهدي",
    "parsed_lecturers": [
      "دعاء حسن هادي",
      "بلال عصام فاضل",
      "نائل عباس كاظم",
      "ثناء عبد المهدي"
    ],
    "lecturer_name": "دعاء حسن هادي",
    "lecturer_phone": "9647811146242",
    "lecturer_email": "duaa.hadi.iba13@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "دعاء حسن هادي",
        "phone": "9647811146242",
        "email": "duaa.hadi.iba13@atu.edu.iq",
        "specialty": "مناعة نانو"
      },
      {
        "name": "بلال عصام فاضل",
        "phone": "9647723767902",
        "email": "isambilal090@gmail.com",
        "specialty": "مناعة"
      },
      {
        "name": "نائل عباس كاظم",
        "phone": "9647725660581",
        "email": "naiel.alkhafaji@atu.edu.iq",
        "specialty": "مناعة"
      },
      {
        "name": "ثناء عبد المهدي",
        "specialty": "فسلجة"
      }
    ]
  },
  {
    "id": "poly-act-92",
    "seq": 92,
    "type": "course",
    "raw_type": "دورة",
    "title": "ادارة العلاقات الدولية في العصر الرقمي",
    "department": "الادارة القانونية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-01",
    "end_date": "2026-11-05",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "هاني عبد الله عمران / قاسم ماضي حمزة / شيماء طرام لفتة",
    "parsed_lecturers": [
      "هاني عبد الله عمران",
      "قاسم ماضي حمزة",
      "شيماء طرام لفتة"
    ],
    "lecturer_name": "هاني عبد الله عمران",
    "lecturer_phone": "9647802428207",
    "lecturer_email": "hani.omran@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "هاني عبد الله عمران",
        "phone": "9647802428207",
        "email": "hani.omran@atu.edu.iq",
        "specialty": "دكتوراه قانون دولي"
      },
      {
        "name": "قاسم ماضي حمزة",
        "phone": "9647601041133",
        "email": "qasim.hamzah@atu.edu.iq",
        "specialty": "دكتوراه قانون عام"
      },
      {
        "name": "شيماء طرام لفتة",
        "phone": "9647738084100",
        "email": "sheimaa.lafta@atu.edu.iq",
        "specialty": "دكتوراه قانون عام"
      }
    ]
  },
  {
    "id": "poly-act-93",
    "seq": 93,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور هيئة النزاهة في مكافحة الفساد الاداري والمالي",
    "department": "الادارة القانونية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زهير محمد هاشم / نغم عبد الحسين خليل / انعام حسين راضي",
    "parsed_lecturers": [
      "زهير محمد هاشم",
      "نغم عبد الحسين خليل",
      "انعام حسين راضي"
    ],
    "lecturer_name": "زهير محمد هاشم",
    "lecturer_phone": "9647731953404",
    "lecturer_email": "zuohair.hamza@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زهير محمد هاشم",
        "phone": "9647731953404",
        "email": "zuohair.hamza@atu.edu.iq",
        "specialty": "دكتوراه قانون دولي"
      },
      {
        "name": "نغم عبد الحسين خليل",
        "phone": "9647826274979",
        "email": "nagham.khalil@atu.edu.iq",
        "specialty": "دكتوراه قانون عام"
      },
      {
        "name": "انعام حسين راضي",
        "phone": "9647725964474",
        "email": "inam.obaid.iba@atu.edu.iq",
        "specialty": "دكتوراه قانون دولي"
      }
    ]
  },
  {
    "id": "poly-act-94",
    "seq": 94,
    "type": "course",
    "raw_type": "دورة",
    "title": "المواجهة التشريعية لجرائم المعلوماتية",
    "department": "الادارة القانونية",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-02-07",
    "end_date": "2027-02-11",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "مشتاق طالب مهنة / رجاء حسين عباس / وفاء محمد طاهر",
    "parsed_lecturers": [
      "مشتاق طالب مهنة",
      "رجاء حسين عباس",
      "وفاء محمد طاهر"
    ],
    "lecturer_name": "مشتاق طالب مهنة",
    "lecturer_phone": "9647801516534",
    "lecturer_email": "dktwrmshtaqtalb@gmail.com",
    "lecturers_details": [
      {
        "name": "مشتاق طالب مهنة",
        "phone": "9647801516534",
        "email": "dktwrmshtaqtalb@gmail.com",
        "specialty": "دكتوراه قانون دولي"
      },
      {
        "name": "رجاء حسين عباس",
        "phone": "9647830995803",
        "email": "rajaaalessmaeely@gmail.com",
        "specialty": "قانون عام"
      },
      {
        "name": "وفاء محمد طاهر",
        "specialty": "قانون عام"
      }
    ]
  },
  {
    "id": "poly-act-95",
    "seq": 95,
    "type": "course",
    "raw_type": "دورة",
    "title": "تحسين اداء الخلايا الشمسية باستخدام مواد معدنية وسبائك مبتكرة",
    "department": "ميكانيك",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-15",
    "end_date": "2026-11-19",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اوراس خضير عبيس / مالك عبد الحسين محسن / زهرة حمود جلهام",
    "parsed_lecturers": [
      "اوراس خضير عبيس",
      "مالك عبد الحسين محسن",
      "زهرة حمود جلهام"
    ],
    "lecturer_name": "اوراس خضير عبيس",
    "lecturer_phone": "9647732311295",
    "lecturer_email": "malik.alhusayn.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "اوراس خضير عبيس",
        "specialty": "هندسة ميكانيك حراريات"
      },
      {
        "name": "مالك عبد الحسين محسن",
        "phone": "9647732311295",
        "email": "malik.alhusayn.iba@atu.edu.iq",
        "specialty": "هندسة مواد / معادن حياتية"
      },
      {
        "name": "زهرة حمود جلهام",
        "phone": "9647814026056",
        "email": "inb.zhr2@atu.edu.iq",
        "specialty": "هندسة ميكانيك / حراريات"
      }
    ]
  },
  {
    "id": "poly-act-96",
    "seq": 96,
    "type": "course",
    "raw_type": "دورة",
    "title": "مصادر الطاقة البديلة والمتجددة",
    "department": "ميكانيك",
    "specialty": "هندسي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-26",
    "end_date": "2026-10-28",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "عباس فخري عبد الامير / رائد سلمان سعيد",
    "parsed_lecturers": [
      "عباس فخري عبد الامير",
      "رائد سلمان سعيد"
    ],
    "lecturer_name": "عباس فخري عبد الامير",
    "lecturer_phone": "9647812023064",
    "lecturer_email": "abbasfakhri83@gmail.com",
    "lecturers_details": [
      {
        "name": "عباس فخري عبد الامير",
        "phone": "9647812023064",
        "email": "abbasfakhri83@gmail.com",
        "specialty": "هندسة قدرة كهربائية"
      },
      {
        "name": "رائد سلمان سعيد",
        "phone": "9647811371354",
        "email": "raed.saeed@atu.edu.iq",
        "specialty": "هندسة ميكانيك تطبيقي"
      }
    ]
  },
  {
    "id": "poly-act-97",
    "seq": 97,
    "type": "course",
    "raw_type": "دورة",
    "title": "السلامة الكيميائية وادارة المخاطر في المختبرات",
    "department": "الصيدلة",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-10",
    "end_date": "2027-01-14",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "طيبة صالح كاظم / حسام عادل محمد / حوراء صلاح مهدي",
    "parsed_lecturers": [
      "طيبة صالح كاظم",
      "حسام عادل محمد",
      "حوراء صلاح مهدي"
    ],
    "lecturer_name": "طيبة صالح كاظم",
    "lecturer_phone": "9647732616549",
    "lecturer_email": "teeba.kadhim.iba111@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "طيبة صالح كاظم",
        "phone": "9647732616549",
        "email": "teeba.kadhim.iba111@atu.edu.iq",
        "specialty": "علوم كيمياء"
      },
      {
        "name": "حسام عادل محمد",
        "specialty": "علوم كيمياء"
      },
      {
        "name": "حوراء صلاح مهدي",
        "specialty": "علوم احياء"
      }
    ]
  },
  {
    "id": "poly-act-98",
    "seq": 98,
    "type": "course",
    "raw_type": "دورة",
    "title": "اسرار الحياة المجهرية : رحلة في عالم البكتيري",
    "department": "الصيدلة",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-03",
    "end_date": "2027-01-07",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "بارق عبد اللطيف صبر / سيف انور جعفر / حوراء احمد علي",
    "parsed_lecturers": [
      "بارق عبد اللطيف صبر",
      "سيف انور جعفر",
      "حوراء احمد علي"
    ],
    "lecturer_name": "بارق عبد اللطيف صبر",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "بارق عبد اللطيف صبر",
        "specialty": "احياء مجهرية طبية"
      },
      {
        "name": "سيف انور جعفر",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "حوراء احمد علي",
        "specialty": "احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-99",
    "seq": 99,
    "type": "course",
    "raw_type": "دورة",
    "title": "دراسة وتحليل انظمة التوزيع الشعاعية باستخدام اجهزة FACT باعتماد على تقنيات الاستدلال الهجينة",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-19",
    "end_date": "2027-01-21",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "خولة يحيى رباط",
    "parsed_lecturers": [
      "خولة يحيى رباط"
    ],
    "lecturer_name": "خولة يحيى رباط",
    "lecturer_phone": "9647818506664",
    "lecturer_email": "kahww.7788@gmail.com",
    "lecturers_details": [
      {
        "name": "خولة يحيى رباط",
        "phone": "9647818506664",
        "email": "kahww.7788@gmail.com",
        "specialty": "ماجستير هندسة كهرباء"
      }
    ]
  },
  {
    "id": "poly-act-100",
    "seq": 100,
    "type": "course",
    "raw_type": "دورة",
    "title": "دورة تحليل اداء الترميز الزمني - المكاني (stbc) في قنوات اللاسلكية المختلفة",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-04-04",
    "end_date": "2027-04-06",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رسل نوري سعيد / حوراء نعمة جاسم / احمد محمد علي علي",
    "parsed_lecturers": [
      "رسل نوري سعيد",
      "حوراء نعمة جاسم",
      "احمد محمد علي علي"
    ],
    "lecturer_name": "رسل نوري سعيد",
    "lecturer_phone": "9647800680902",
    "lecturer_email": "rusul.saeed.iba12@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "رسل نوري سعيد",
        "phone": "9647800680902",
        "email": "rusul.saeed.iba12@atu.edu.iq",
        "specialty": "الكترونيك واتصالات"
      },
      {
        "name": "حوراء نعمة جاسم",
        "phone": "9647729288808",
        "email": "hawraa.jasim.iba9@atu.edu.iq",
        "specialty": "الكترونيك واتصالات"
      },
      {
        "name": "احمد محمد علي علي",
        "specialty": "الكترونيك واتصالات"
      }
    ]
  },
  {
    "id": "poly-act-101",
    "seq": 101,
    "type": "course",
    "raw_type": "دورة",
    "title": "من الذرة الى الابتكار تقنيات النانو ودورها في المجالات الهندسية",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-08",
    "end_date": "2026-12-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سارة خماس جوي",
    "parsed_lecturers": [
      "سارة خماس جوي"
    ],
    "lecturer_name": "سارة خماس جوي",
    "lecturer_phone": "9647722116533",
    "lecturer_email": "sarah.lami@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "سارة خماس جوي",
        "phone": "9647722116533",
        "email": "sarah.lami@atu.edu.iq",
        "specialty": "الكترونيك واتصالات"
      }
    ]
  },
  {
    "id": "poly-act-102",
    "seq": 102,
    "type": "course",
    "raw_type": "دورة",
    "title": "الطاقة الشمسية للاستخدام المنزلي",
    "department": "الاجهزة طبية",
    "specialty": "هندسي",
    "duration": "1 يوم",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-31",
    "end_date": "2027-02-04",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "غيث علي عبد الرحيم / علي عبد الكريم",
    "parsed_lecturers": [
      "غيث علي عبد الرحيم",
      "علي عبد الكريم"
    ],
    "lecturer_name": "غيث علي عبد الرحيم",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "غيث علي عبد الرحيم",
        "specialty": "هندسة كهربائية والكترونية"
      },
      {
        "name": "علي عبد الكريم",
        "specialty": "هندسة كهرباء"
      }
    ]
  },
  {
    "id": "poly-act-103",
    "seq": 103,
    "type": "course",
    "raw_type": "دورة",
    "title": "حوكمة الشركات ودورها في تحقيق المعلومات المحاسبية في سوق الارواق المالية",
    "department": "المحاسبة",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-10-11",
    "end_date": "2027-10-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "جنان عبد العباس باقر / مرتضى محمد شاني / سهاد داخل جعفر",
    "parsed_lecturers": [
      "جنان عبد العباس باقر",
      "مرتضى محمد شاني",
      "سهاد داخل جعفر"
    ],
    "lecturer_name": "جنان عبد العباس باقر",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "جنان عبد العباس باقر",
        "specialty": "محاسبة"
      },
      {
        "name": "مرتضى محمد شاني",
        "specialty": "محاسبة"
      },
      {
        "name": "سهاد داخل جعفر",
        "specialty": "محاسبة"
      }
    ]
  },
  {
    "id": "poly-act-104",
    "seq": 104,
    "type": "course",
    "raw_type": "دورة",
    "title": "استخدام نسبة التحليل المالي كمؤشر الى الوعاء الضريبي مقبول لمصلحة المدقق",
    "department": "المحاسبة",
    "specialty": "اداري",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-10-25",
    "end_date": "2027-10-29",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "جنان عبد العباس باقر / ليث علي حمادي / محمد ديكان عبد الامير",
    "parsed_lecturers": [
      "جنان عبد العباس باقر",
      "ليث علي حمادي",
      "محمد ديكان عبد الامير"
    ],
    "lecturer_name": "جنان عبد العباس باقر",
    "lecturer_phone": "9647725085691",
    "lecturer_email": "layth.hammadi@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "جنان عبد العباس باقر",
        "specialty": "محاسبة"
      },
      {
        "name": "ليث علي حمادي",
        "phone": "9647725085691",
        "email": "layth.hammadi@atu.edu.iq",
        "specialty": "محاسبة"
      },
      {
        "name": "محمد ديكان عبد الامير",
        "specialty": "تدقيق"
      }
    ]
  },
  {
    "id": "poly-act-105",
    "seq": 105,
    "type": "course",
    "raw_type": "دورة",
    "title": "هندسة الجيوتكنك والجغرافية البشرية",
    "department": "المساحة",
    "specialty": "هندسي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-25",
    "end_date": "2027-01-27",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "حوراء كريم سليم / زينب علي حسين جاسم",
    "parsed_lecturers": [
      "حوراء كريم سليم",
      "زينب علي حسين جاسم"
    ],
    "lecturer_name": "حوراء كريم سليم",
    "lecturer_phone": "9647819471347",
    "lecturer_email": "amzhrahwra30@gmail.com",
    "lecturers_details": [
      {
        "name": "حوراء كريم سليم",
        "phone": "9647819471347",
        "email": "amzhrahwra30@gmail.com",
        "specialty": "جغرافية بشرية"
      },
      {
        "name": "زينب علي حسين جاسم",
        "phone": "9647887833387",
        "email": "zainab.jassim.iba@atu.edu.iq",
        "specialty": "هندسة الجيوتكنك"
      }
    ]
  },
  {
    "id": "poly-act-106",
    "seq": 106,
    "type": "course",
    "raw_type": "دورة",
    "title": "دورة الخرسانة القادرة على الاصلاح الذاتي",
    "department": "المدني",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-15",
    "end_date": "2026-11-19",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "هدى زهير عبد الغني / انسام علي هاشم / رباب جلوب دخن",
    "parsed_lecturers": [
      "هدى زهير عبد الغني",
      "انسام علي هاشم",
      "رباب جلوب دخن"
    ],
    "lecturer_name": "هدى زهير عبد الغني",
    "lecturer_phone": "9647801715581",
    "lecturer_email": "inb.huda@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "هدى زهير عبد الغني",
        "phone": "9647801715581",
        "email": "inb.huda@atu.edu.iq",
        "specialty": "مواد انشائية"
      },
      {
        "name": "انسام علي هاشم",
        "phone": "9647723731712",
        "email": "ansamly2@atu.edu.iq",
        "specialty": "مواد بناء"
      },
      {
        "name": "رباب جلوب دخن",
        "phone": "9647818648926",
        "email": "rababdekhn@gmail.com",
        "specialty": "انشاءات"
      }
    ]
  },
  {
    "id": "poly-act-107",
    "seq": 107,
    "type": "course",
    "raw_type": "دورة",
    "title": "فيروس داء الكلب وطرق الانتقال والتشخيص والوقاية الصحية",
    "department": "المختبرات الطبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-02-21",
    "end_date": "2027-02-25",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زينب ناصر نبات / مها حميد اسماعيل / مها عادل حسين / سارة عبد الكريم مخيف",
    "parsed_lecturers": [
      "زينب ناصر نبات",
      "مها حميد اسماعيل",
      "مها عادل حسين",
      "سارة عبد الكريم مخيف"
    ],
    "lecturer_name": "زينب ناصر نبات",
    "lecturer_phone": "9647831394533",
    "lecturer_email": "zainab.nabat@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زينب ناصر نبات",
        "phone": "9647831394533",
        "email": "zainab.nabat@atu.edu.iq",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "مها حميد اسماعيل",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "مها عادل حسين",
        "phone": "9647800441299",
        "email": "maha.hussain.iba100@atu.edu.iq",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "سارة عبد الكريم مخيف",
        "phone": "9647804734690",
        "email": "sarah.mukheef@atu.edu.iq",
        "specialty": "احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-108",
    "seq": 108,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور المركبات الكيميائية في تنشيط نمو الاحياء المجهرية وتاثيرها على فسلجة الدم",
    "department": "المختبرات الطبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-06",
    "end_date": "2026-09-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ايات رحيم خلف / رواء رحيم كريم / ود عبد الخالق عبد زيد",
    "parsed_lecturers": [
      "ايات رحيم خلف",
      "رواء رحيم كريم",
      "ود عبد الخالق عبد زيد"
    ],
    "lecturer_name": "ايات رحيم خلف",
    "lecturer_phone": "9647711962186",
    "lecturer_email": "rawaa.raheem@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ايات رحيم خلف",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "رواء رحيم كريم",
        "phone": "9647711962186",
        "email": "rawaa.raheem@atu.edu.iq",
        "specialty": "كيمياء"
      },
      {
        "name": "ود عبد الخالق عبد زيد",
        "phone": "9647812044586",
        "email": "wid.abdzaid@atu.edu.iq",
        "specialty": "احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-109",
    "seq": 109,
    "type": "course",
    "raw_type": "دورة",
    "title": "السموم الفطرية وتاثيرها على صحة الانسان",
    "department": "المختبرات الطبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-31",
    "end_date": "2027-02-04",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "انتصار مرزوك / حيدر حسين / علي موجد",
    "parsed_lecturers": [
      "انتصار مرزوك",
      "حيدر حسين",
      "علي موجد"
    ],
    "lecturer_name": "انتصار مرزوك",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "انتصار مرزوك",
        "specialty": "مقاومة احيائية"
      },
      {
        "name": "حيدر حسين",
        "specialty": "طفيليات"
      },
      {
        "name": "علي موجد",
        "specialty": "فسلجة طبية"
      }
    ]
  },
  {
    "id": "poly-act-110",
    "seq": 110,
    "type": "course",
    "raw_type": "دورة",
    "title": "استخدام تقنيات الذكاء الالصطناعي في تطوير المواد الحيوية السيراميكية",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-04-26",
    "end_date": "2027-04-30",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زهراء كاظم روضان / الاء سهيل نجم / الاء مجيد شنين / علاء شاكر عبيده",
    "parsed_lecturers": [
      "زهراء كاظم روضان",
      "الاء سهيل نجم",
      "الاء مجيد شنين",
      "علاء شاكر عبيده"
    ],
    "lecturer_name": "زهراء كاظم روضان",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "زهراء كاظم روضان",
        "specialty": "فيزياء /مواد"
      },
      {
        "name": "الاء سهيل نجم",
        "specialty": "مواد / سيراميك"
      },
      {
        "name": "الاء مجيد شنين",
        "specialty": "امن سيبراني"
      },
      {
        "name": "علاء شاكر عبيده",
        "specialty": "ميكانيك تطبيقي"
      }
    ]
  },
  {
    "id": "poly-act-111",
    "seq": 111,
    "type": "course",
    "raw_type": "دورة",
    "title": "لهندسة الميكانيكية التطبيقية للأنظمة الحرارية: تحليل وتصميم متقدم",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-04-19",
    "end_date": "2027-04-23",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سارة يحيى حاتم / سارة سالم حسن / احمد كريم كاظم",
    "parsed_lecturers": [
      "سارة يحيى حاتم",
      "سارة سالم حسن",
      "احمد كريم كاظم"
    ],
    "lecturer_name": "سارة يحيى حاتم",
    "lecturer_phone": "9647881184225",
    "lecturer_email": "sarah.assad@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "سارة يحيى حاتم",
        "phone": "9647881184225",
        "email": "sarah.assad@atu.edu.iq",
        "specialty": "ميكانيك حراريات"
      },
      {
        "name": "سارة سالم حسن",
        "phone": "9647735722475",
        "email": "sara.hassan.iba101@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      },
      {
        "name": "احمد كريم كاظم",
        "phone": "9647719570199",
        "email": "ahmed.kadhom.iba102@atu.edu.iq",
        "specialty": "ميكانيك حراريات"
      }
    ]
  },
  {
    "id": "poly-act-112",
    "seq": 112,
    "type": "course",
    "raw_type": "دورة",
    "title": "تصميم انظمة الطاقة والهندسة الكهربائية مع انظمة الراديتر والتحكم الرياضي",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-05-03",
    "end_date": "2027-05-07",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "علاء حسين مجيد / زينة صلاح حسن / حميدة مسلم عبد الحسين",
    "parsed_lecturers": [
      "علاء حسين مجيد",
      "زينة صلاح حسن",
      "حميدة مسلم عبد الحسين"
    ],
    "lecturer_name": "علاء حسين مجيد",
    "lecturer_phone": "9647803865847",
    "lecturer_email": "zinah.hasan@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "علاء حسين مجيد",
        "specialty": "تبولوجيا ديناميكي"
      },
      {
        "name": "زينة صلاح حسن",
        "phone": "9647803865847",
        "email": "zinah.hasan@atu.edu.iq",
        "specialty": "قدرة كهربائية"
      },
      {
        "name": "حميدة مسلم عبد الحسين",
        "phone": "9647708015920",
        "email": "hameedahmuslim@gmail.com",
        "specialty": "حراريات"
      }
    ]
  },
  {
    "id": "poly-act-113",
    "seq": 113,
    "type": "course",
    "raw_type": "دورة",
    "title": "القلق والضغوط النفسية كمحركات سلوك الغش الامتحاني",
    "department": "التمريض",
    "specialty": "طبي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-15",
    "end_date": "2026-11-17",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "عواطف حميد صالح",
    "parsed_lecturers": [
      "عواطف حميد صالح"
    ],
    "lecturer_name": "عواطف حميد صالح",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "عواطف حميد صالح",
        "specialty": "علم نفس"
      }
    ]
  },
  {
    "id": "poly-act-114",
    "seq": 114,
    "type": "course",
    "raw_type": "دورة",
    "title": "تطبيقات AI لتحليل الصور الطبية وتشخيص الامراض",
    "department": "التمريض",
    "specialty": "طبي",
    "duration": "1 يوم",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-13",
    "end_date": "2026-12-17",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "محمد فارس ناجي / رباب عدنان حمزة / مريم صادق عيسى",
    "parsed_lecturers": [
      "محمد فارس ناجي",
      "رباب عدنان حمزة",
      "مريم صادق عيسى"
    ],
    "lecturer_name": "محمد فارس ناجي",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "محمد فارس ناجي",
        "specialty": "ماجستير حاسبات"
      },
      {
        "name": "رباب عدنان حمزة",
        "specialty": "ماجستير تشريح وانسجة"
      },
      {
        "name": "مريم صادق عيسى",
        "specialty": "ماجستير احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-115",
    "seq": 115,
    "type": "course",
    "raw_type": "دورة",
    "title": "دراسة المصطلحات الانكليزية في علم الوراثة والخلية",
    "department": "التمريض",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-27",
    "end_date": "2026-12-31",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ايناس حيدر / نهى قاسم سهيل / انتصار خليف فليفل",
    "parsed_lecturers": [
      "ايناس حيدر",
      "نهى قاسم سهيل",
      "انتصار خليف فليفل"
    ],
    "lecturer_name": "ايناس حيدر",
    "lecturer_phone": "9647810060775",
    "lecturer_email": "intisar.khlaif@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ايناس حيدر",
        "specialty": "انكليزي"
      },
      {
        "name": "نهى قاسم سهيل",
        "specialty": "انكليزي"
      },
      {
        "name": "انتصار خليف فليفل",
        "phone": "9647810060775",
        "email": "intisar.khlaif@atu.edu.iq",
        "specialty": "احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-116",
    "seq": 116,
    "type": "course",
    "raw_type": "دورة",
    "title": "الاسس التيبولوجية لمرض الذئبة الحمامي الجهازي",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-15",
    "end_date": "2026-11-19",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سوزان راضي حسين / اسيل حافظ جواد / ميسون كوشي جاسم",
    "parsed_lecturers": [
      "سوزان راضي حسين",
      "اسيل حافظ جواد",
      "ميسون كوشي جاسم"
    ],
    "lecturer_name": "سوزان راضي حسين",
    "lecturer_phone": "9647813961398",
    "lecturer_email": "suzan.hussain.iba103@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "سوزان راضي حسين",
        "phone": "9647813961398",
        "email": "suzan.hussain.iba103@atu.edu.iq",
        "specialty": "الاحياء المجهرية"
      },
      {
        "name": "اسيل حافظ جواد",
        "phone": "9647813437240",
        "email": "aseel.abbod.iba@atu.edu.iq",
        "specialty": "صحة المجتمع"
      },
      {
        "name": "ميسون كوشي جاسم",
        "email": "maysoon.hussein.iba@atu.edu.iq",
        "specialty": "علوم حياة"
      }
    ]
  },
  {
    "id": "poly-act-117",
    "seq": 117,
    "type": "course",
    "raw_type": "دورة",
    "title": "اضطراب المناعة في التهاب المفاصل الروماتويدي وعلاقته بتنظيم الكورتيزول",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-13",
    "end_date": "2026-12-17",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "شهد سعد محمد / سالينا عبد العباس ناصر / علي كريم حميد",
    "parsed_lecturers": [
      "شهد سعد محمد",
      "سالينا عبد العباس ناصر",
      "علي كريم حميد"
    ],
    "lecturer_name": "شهد سعد محمد",
    "lecturer_phone": "9647814640434",
    "lecturer_email": "shahadmostfa674@gmail.com",
    "lecturers_details": [
      {
        "name": "شهد سعد محمد",
        "phone": "9647814640434",
        "email": "shahadmostfa674@gmail.com",
        "specialty": "مناعة سريرية"
      },
      {
        "name": "سالينا عبد العباس ناصر",
        "phone": "9647819165118",
        "email": "dr.salina8@gmail.com",
        "specialty": "فسلجة طبية"
      },
      {
        "name": "علي كريم حميد",
        "specialty": "فسلجة طبية"
      }
    ]
  },
  {
    "id": "poly-act-118",
    "seq": 118,
    "type": "course",
    "raw_type": "دورة",
    "title": "السكر التراكمي (HbA1c ) ودوره في فسلجة الدم وتاثيره على الجهاز المناعي",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-06",
    "end_date": "2026-12-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سارة عبد الخالق / شهد سعد محمد / شيماء عبد الجبار",
    "parsed_lecturers": [
      "سارة عبد الخالق",
      "شهد سعد محمد",
      "شيماء عبد الجبار"
    ],
    "lecturer_name": "سارة عبد الخالق",
    "lecturer_phone": "9647814640434",
    "lecturer_email": "shahadmostfa674@gmail.com",
    "lecturers_details": [
      {
        "name": "سارة عبد الخالق",
        "specialty": "فسلجة طبية"
      },
      {
        "name": "شهد سعد محمد",
        "phone": "9647814640434",
        "email": "shahadmostfa674@gmail.com",
        "specialty": "مناعة سريرية"
      },
      {
        "name": "شيماء عبد الجبار",
        "phone": "9647829304616",
        "email": "shymaa.saeed@atu.edu.iq",
        "specialty": "الاحياء المجهرية"
      }
    ]
  },
  {
    "id": "poly-act-119",
    "seq": 119,
    "type": "course",
    "raw_type": "دورة",
    "title": "الطب النانوي في علاج امراض المناعة الذاتية",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-03",
    "end_date": "2027-01-07",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "دعاء حسن هادي / بلال عصام فاضل / علي كريم حميد",
    "parsed_lecturers": [
      "دعاء حسن هادي",
      "بلال عصام فاضل",
      "علي كريم حميد"
    ],
    "lecturer_name": "دعاء حسن هادي",
    "lecturer_phone": "9647811146242",
    "lecturer_email": "duaa.hadi.iba13@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "دعاء حسن هادي",
        "phone": "9647811146242",
        "email": "duaa.hadi.iba13@atu.edu.iq",
        "specialty": "مناعة نانو"
      },
      {
        "name": "بلال عصام فاضل",
        "phone": "9647723767902",
        "email": "isambilal090@gmail.com",
        "specialty": "مناعة سريرية"
      },
      {
        "name": "علي كريم حميد",
        "specialty": "فسلجة"
      }
    ]
  },
  {
    "id": "poly-act-120",
    "seq": 120,
    "type": "course",
    "raw_type": "دورة",
    "title": "مكافحة العدوى والسيطرة عليها في المستشفيات",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-17",
    "end_date": "2027-01-21",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اسيل حافظ جواد / زينب كريم جواد / ميسون كوشي جاسم",
    "parsed_lecturers": [
      "اسيل حافظ جواد",
      "زينب كريم جواد",
      "ميسون كوشي جاسم"
    ],
    "lecturer_name": "اسيل حافظ جواد",
    "lecturer_phone": "9647813437240",
    "lecturer_email": "aseel.abbod.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "اسيل حافظ جواد",
        "phone": "9647813437240",
        "email": "aseel.abbod.iba@atu.edu.iq",
        "specialty": "صحة المجتمع"
      },
      {
        "name": "زينب كريم جواد",
        "phone": "9647703452610",
        "email": "inb.znb5@atu.edu.iq",
        "specialty": "علوم حياة"
      },
      {
        "name": "ميسون كوشي جاسم",
        "email": "maysoon.hussein.iba@atu.edu.iq",
        "specialty": "علوم حياة"
      }
    ]
  },
  {
    "id": "poly-act-121",
    "seq": 121,
    "type": "course",
    "raw_type": "دورة",
    "title": "التاثيرات الفيسولوجية لمرض السكري على وظائف الجهاز العصبي",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-03-14",
    "end_date": "2027-03-18",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ثناء عبد المهدي / سوزان راضي حسين / علي كريم حميد",
    "parsed_lecturers": [
      "ثناء عبد المهدي",
      "سوزان راضي حسين",
      "علي كريم حميد"
    ],
    "lecturer_name": "ثناء عبد المهدي",
    "lecturer_phone": "9647813961398",
    "lecturer_email": "suzan.hussain.iba103@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ثناء عبد المهدي",
        "specialty": "علوم حياة"
      },
      {
        "name": "سوزان راضي حسين",
        "phone": "9647813961398",
        "email": "suzan.hussain.iba103@atu.edu.iq",
        "specialty": "علوم حياة"
      },
      {
        "name": "علي كريم حميد",
        "specialty": "فسلجة"
      }
    ]
  },
  {
    "id": "poly-act-122",
    "seq": 122,
    "type": "course",
    "raw_type": "دورة",
    "title": "التشخيص المختبري لبعض الطفيليات الدموية في الانسان",
    "department": "المختبرات الطبية",
    "specialty": "طبي",
    "duration": "3 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-28",
    "end_date": "2026-12-30",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "حيدر حسين عبيد / انتصار مرزوك حسين / علي موجد فضيل",
    "parsed_lecturers": [
      "حيدر حسين عبيد",
      "انتصار مرزوك حسين",
      "علي موجد فضيل"
    ],
    "lecturer_name": "حيدر حسين عبيد",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "حيدر حسين عبيد",
        "specialty": "طفيليات بيطرية"
      },
      {
        "name": "انتصار مرزوك حسين",
        "specialty": "مقاومة احيائية"
      },
      {
        "name": "علي موجد فضيل",
        "specialty": "فسلجة طبية"
      }
    ]
  },
  {
    "id": "poly-act-123",
    "seq": 123,
    "type": "course",
    "raw_type": "دورة",
    "title": "الاختبارات البيوكيميائية في الكشف عن البكتيريا المرضية المرتبطة بالجروح",
    "department": "المختبرات الطبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-04-04",
    "end_date": "2027-04-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ايات رحيم خلف / رواء رحيم كريم / رؤى وهاب",
    "parsed_lecturers": [
      "ايات رحيم خلف",
      "رواء رحيم كريم",
      "رؤى وهاب"
    ],
    "lecturer_name": "ايات رحيم خلف",
    "lecturer_phone": "9647711962186",
    "lecturer_email": "rawaa.raheem@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ايات رحيم خلف",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "رواء رحيم كريم",
        "phone": "9647711962186",
        "email": "rawaa.raheem@atu.edu.iq",
        "specialty": "كيمياء تحليلية"
      },
      {
        "name": "رؤى وهاب",
        "phone": "9647601017371",
        "email": "roaa.mohammed@atu.edu.iq",
        "specialty": "كيمياء عضوية"
      }
    ]
  },
  {
    "id": "poly-act-124",
    "seq": 124,
    "type": "course",
    "raw_type": "دورة",
    "title": "دور بكتريا المعدة في امراض الجهاز الهظمي",
    "department": "المختبرات الطبية",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-05",
    "end_date": "2026-12-09",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "مها حميد اسماعيل / منى غافل عبد / زينب ناصر نبات",
    "parsed_lecturers": [
      "مها حميد اسماعيل",
      "منى غافل عبد",
      "زينب ناصر نبات"
    ],
    "lecturer_name": "مها حميد اسماعيل",
    "lecturer_phone": "9647831394533",
    "lecturer_email": "zainab.nabat@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "مها حميد اسماعيل",
        "specialty": "علوم حياة"
      },
      {
        "name": "منى غافل عبد",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "زينب ناصر نبات",
        "phone": "9647831394533",
        "email": "zainab.nabat@atu.edu.iq",
        "specialty": "احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-125",
    "seq": 125,
    "type": "course",
    "raw_type": "دورة",
    "title": "استخدام جداول الاكسل في تحليل اداء الشبكات ومراقبة حركة المرور",
    "department": "الصيدلة",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-27",
    "end_date": "2026-10-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "وفاء محمد بريسم / حوراء احمد علي / حوراء صلاح مهدي / اقبال زهو عبد",
    "parsed_lecturers": [
      "وفاء محمد بريسم",
      "حوراء احمد علي",
      "حوراء صلاح مهدي",
      "اقبال زهو عبد"
    ],
    "lecturer_name": "وفاء محمد بريسم",
    "lecturer_phone": "9647816774691",
    "lecturer_email": "wafaa333mohammed@gmail.com",
    "lecturers_details": [
      {
        "name": "وفاء محمد بريسم",
        "phone": "9647816774691",
        "email": "wafaa333mohammed@gmail.com",
        "specialty": "علوم حاسبات"
      },
      {
        "name": "حوراء احمد علي",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "حوراء صلاح مهدي",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "اقبال زهو عبد",
        "phone": "9647725247246",
        "email": "iqbal.abed.iba@atu.edu.iq",
        "specialty": "زراعة"
      }
    ]
  },
  {
    "id": "poly-act-126",
    "seq": 126,
    "type": "course",
    "raw_type": "دورة",
    "title": "الاعراض الجانبية لاستخدام ادوية التخسيس",
    "department": "الصيدلة",
    "specialty": "طبي",
    "duration": "5 أيام",
    "cost": "25000",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-18",
    "end_date": "2026-09-23",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "خلود عبد المجيد / هالة حسين عبد علي / عبير فاضل ابراهيم / طيبة صالح كاظم",
    "parsed_lecturers": [
      "خلود عبد المجيد",
      "هالة حسين عبد علي",
      "عبير فاضل ابراهيم",
      "طيبة صالح كاظم"
    ],
    "lecturer_name": "خلود عبد المجيد",
    "lecturer_phone": "9647814263880",
    "lecturer_email": "khuloodmajeed91@gmail.com",
    "lecturers_details": [
      {
        "name": "خلود عبد المجيد",
        "phone": "9647814263880",
        "email": "khuloodmajeed91@gmail.com",
        "specialty": "مقاومة احيائية"
      },
      {
        "name": "هالة حسين عبد علي",
        "phone": "9647800766228",
        "email": "halahussein430@gmail.com",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "عبير فاضل ابراهيم",
        "specialty": "ادوية وسموم"
      },
      {
        "name": "طيبة صالح كاظم",
        "phone": "9647732616549",
        "email": "teeba.kadhim.iba111@atu.edu.iq",
        "specialty": "كيمياء عضوية"
      }
    ]
  },
  {
    "id": "poly-act-127",
    "seq": 127,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "تكامل التقنيات الرقمية مع الاجهزة الطبية والانظمة الديناميكية",
    "department": "الاجهزة طبية",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-06",
    "end_date": "2026-09-06",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زيد علي حمود / علي عبد الكريم",
    "parsed_lecturers": [
      "زيد علي حمود",
      "علي عبد الكريم"
    ],
    "lecturer_name": "زيد علي حمود",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "زيد علي حمود",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "علي عبد الكريم",
        "specialty": "علوم حياة"
      }
    ]
  },
  {
    "id": "poly-act-128",
    "seq": 128,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "توظيف ادوات الذكاء الاصطناعي والنمذجة الرياضية في التحول الرقمي",
    "department": "الاجهزة طبية",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-13",
    "end_date": "2026-09-13",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "دلائل سعد عبد الزهرة / حسين علي محمد",
    "parsed_lecturers": [
      "دلائل سعد عبد الزهرة",
      "حسين علي محمد"
    ],
    "lecturer_name": "دلائل سعد عبد الزهرة",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "دلائل سعد عبد الزهرة",
        "specialty": "رياضيات تشفير"
      },
      {
        "name": "حسين علي محمد",
        "specialty": "هندسة كهربائية والكترونية"
      }
    ]
  },
  {
    "id": "poly-act-129",
    "seq": 129,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "الانظمة الانشائية المقاومة للزلازل",
    "department": "المساحة",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-06",
    "end_date": "2026-12-06",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سلسبيل كريم برهان / مخلد مراد عبيد",
    "parsed_lecturers": [
      "سلسبيل كريم برهان",
      "مخلد مراد عبيد"
    ],
    "lecturer_name": "سلسبيل كريم برهان",
    "lecturer_phone": "9647723964094",
    "lecturer_email": "salsabeel.burhan.bi12@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "سلسبيل كريم برهان",
        "phone": "9647723964094",
        "email": "salsabeel.burhan.bi12@atu.edu.iq",
        "specialty": "هندسة مواد"
      },
      {
        "name": "مخلد مراد عبيد",
        "phone": "9647810245245",
        "email": "mukhallad.murad.iku@atu.edu.iq",
        "specialty": "هندسة انشاءات"
      }
    ]
  },
  {
    "id": "poly-act-130",
    "seq": 130,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "نظم المعلومات الجغرافية",
    "department": "المساحة",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-01",
    "end_date": "2026-12-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "بشير سليم جاسم / اثير عسكر اسماعيل",
    "parsed_lecturers": [
      "بشير سليم جاسم",
      "اثير عسكر اسماعيل"
    ],
    "lecturer_name": "بشير سليم جاسم",
    "lecturer_phone": "9647724851028",
    "lecturer_email": "basheer.jasim@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "بشير سليم جاسم",
        "phone": "9647724851028",
        "email": "basheer.jasim@atu.edu.iq",
        "specialty": "هندسة جيوماتيك"
      },
      {
        "name": "اثير عسكر اسماعيل",
        "phone": "9647805978091",
        "email": "atheerasker@gmail.com",
        "specialty": "تخطيط حضري"
      }
    ]
  },
  {
    "id": "poly-act-131",
    "seq": 131,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "مقدمة عن نظام The wimax System",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-08",
    "end_date": "2026-11-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رسل نوري سعيد / محمد جاسم محمد",
    "parsed_lecturers": [
      "رسل نوري سعيد",
      "محمد جاسم محمد"
    ],
    "lecturer_name": "رسل نوري سعيد",
    "lecturer_phone": "9647800680902",
    "lecturer_email": "rusul.saeed.iba12@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "رسل نوري سعيد",
        "phone": "9647800680902",
        "email": "rusul.saeed.iba12@atu.edu.iq",
        "specialty": "هندسة الالكترونيك واتصالات"
      },
      {
        "name": "محمد جاسم محمد",
        "specialty": "هندسة الالكترونيك واتصالات"
      }
    ]
  },
  {
    "id": "poly-act-132",
    "seq": 132,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "اللغة العربية في عصر الذكاء الاصطناعي و التكنولوجيا",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-20",
    "end_date": "2026-09-20",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "نور عايد عبد الله / بلقيس بشار جابر",
    "parsed_lecturers": [
      "نور عايد عبد الله",
      "بلقيس بشار جابر"
    ],
    "lecturer_name": "نور عايد عبد الله",
    "lecturer_phone": "9647803557567",
    "lecturer_email": "noor.serkal.iba14@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "نور عايد عبد الله",
        "phone": "9647803557567",
        "email": "noor.serkal.iba14@atu.edu.iq",
        "specialty": "اللغة العربية"
      },
      {
        "name": "بلقيس بشار جابر",
        "specialty": "اللغة العربية"
      }
    ]
  },
  {
    "id": "poly-act-133",
    "seq": 133,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "استدامة المباني : الاستراتيجيات ذكية لتقليل الكلفة والاثر البيئي",
    "department": "مدني",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-21",
    "end_date": "2026-09-21",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رباب جلوب دخن / هدى زهير عبد الغني",
    "parsed_lecturers": [
      "رباب جلوب دخن",
      "هدى زهير عبد الغني"
    ],
    "lecturer_name": "رباب جلوب دخن",
    "lecturer_phone": "9647818648926",
    "lecturer_email": "rababdekhn@gmail.com",
    "lecturers_details": [
      {
        "name": "رباب جلوب دخن",
        "phone": "9647818648926",
        "email": "rababdekhn@gmail.com",
        "specialty": "انشاءات"
      },
      {
        "name": "هدى زهير عبد الغني",
        "phone": "9647801715581",
        "email": "inb.huda@atu.edu.iq",
        "specialty": "مواد انشائية"
      }
    ]
  },
  {
    "id": "poly-act-134",
    "seq": 134,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "طرق الترميم الذاتي للخرسانة",
    "department": "مدني",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-26",
    "end_date": "2026-11-26",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "انسام علي هاشم / هدى زهير عبد الغني",
    "parsed_lecturers": [
      "انسام علي هاشم",
      "هدى زهير عبد الغني"
    ],
    "lecturer_name": "انسام علي هاشم",
    "lecturer_phone": "9647723731712",
    "lecturer_email": "ansamly2@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "انسام علي هاشم",
        "phone": "9647723731712",
        "email": "ansamly2@atu.edu.iq",
        "specialty": "مواد بناء"
      },
      {
        "name": "هدى زهير عبد الغني",
        "phone": "9647801715581",
        "email": "inb.huda@atu.edu.iq",
        "specialty": "مواد انشائية"
      }
    ]
  },
  {
    "id": "poly-act-135",
    "seq": 135,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "تحسين كفاءة أنظمة التبريد والتكييف والشبكات الكهربائية",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-30",
    "end_date": "2026-11-30",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زينة صلاح حسن / الاء مجيد شنين",
    "parsed_lecturers": [
      "زينة صلاح حسن",
      "الاء مجيد شنين"
    ],
    "lecturer_name": "زينة صلاح حسن",
    "lecturer_phone": "9647803865847",
    "lecturer_email": "zinah.hasan@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زينة صلاح حسن",
        "phone": "9647803865847",
        "email": "zinah.hasan@atu.edu.iq",
        "specialty": "هندسة كهرباء"
      },
      {
        "name": "الاء مجيد شنين",
        "specialty": "امن سيبراني"
      }
    ]
  },
  {
    "id": "poly-act-136",
    "seq": 136,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "الامن السيبراني في عمليات التصنيع",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-22",
    "end_date": "2026-11-22",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "راقية جواد ناجي / بشار ضياء حسين",
    "parsed_lecturers": [
      "راقية جواد ناجي",
      "بشار ضياء حسين"
    ],
    "lecturer_name": "راقية جواد ناجي",
    "lecturer_phone": "9647809443996",
    "lecturer_email": "bashar.hussein@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "راقية جواد ناجي",
        "specialty": "إدارة صناعية"
      },
      {
        "name": "بشار ضياء حسين",
        "phone": "9647809443996",
        "email": "bashar.hussein@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      }
    ]
  },
  {
    "id": "poly-act-137",
    "seq": 137,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "استخدام تقنيات التقوية الرطبة البوليمرية في صناعة الورق",
    "department": "ميكانيك",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-07-12",
    "end_date": "2026-07-12",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "نجلاء شاكرعزيز",
    "parsed_lecturers": [
      "نجلاء شاكرعزيز"
    ],
    "lecturer_name": "نجلاء شاكرعزيز",
    "lecturer_phone": "9647723128916",
    "lecturer_email": "najlaa.shemery@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "نجلاء شاكرعزيز",
        "phone": "9647723128916",
        "email": "najlaa.shemery@atu.edu.iq",
        "specialty": "هندسة انتاج والمعادن"
      }
    ]
  },
  {
    "id": "poly-act-138",
    "seq": 138,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "ادوات تحسين الجودة",
    "department": "الميكانيك",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-08",
    "end_date": "2026-11-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زهير حسن عبد الله / زهرة حمود جلهام",
    "parsed_lecturers": [
      "زهير حسن عبد الله",
      "زهرة حمود جلهام"
    ],
    "lecturer_name": "زهير حسن عبد الله",
    "lecturer_phone": "9647814026056",
    "lecturer_email": "inb.zhr2@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زهير حسن عبد الله",
        "specialty": "هندسة صناعية"
      },
      {
        "name": "زهرة حمود جلهام",
        "phone": "9647814026056",
        "email": "inb.zhr2@atu.edu.iq",
        "specialty": "حراريات"
      }
    ]
  },
  {
    "id": "poly-act-139",
    "seq": 139,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "من النظرية الى التطبيق : حلول ميكانيكية ذكية للصناعة الحديثة",
    "department": "وحدة التعليم المستمر",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-04-04",
    "end_date": "2027-04-04",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ساره سالم حسن",
    "parsed_lecturers": [
      "ساره سالم حسن"
    ],
    "lecturer_name": "ساره سالم حسن",
    "lecturer_phone": "9647735722475",
    "lecturer_email": "sara.hassan.iba101@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ساره سالم حسن",
        "phone": "9647735722475",
        "email": "sara.hassan.iba101@atu.edu.iq",
        "specialty": "هندسة ميكانيك تطبيقي"
      }
    ]
  },
  {
    "id": "poly-act-140",
    "seq": 140,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "استراتيجيات ميكانيكية متقدمة لتطوير الاداء وفق مؤشرات قياس معتمدة ( KPIS)",
    "department": "وحدة التعليم المستمر",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-05-02",
    "end_date": "2027-05-02",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ساره سالم حسن",
    "parsed_lecturers": [
      "ساره سالم حسن"
    ],
    "lecturer_name": "ساره سالم حسن",
    "lecturer_phone": "9647735722475",
    "lecturer_email": "sara.hassan.iba101@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ساره سالم حسن",
        "phone": "9647735722475",
        "email": "sara.hassan.iba101@atu.edu.iq",
        "specialty": "هندسة ميكانيك تطبيقي"
      }
    ]
  },
  {
    "id": "poly-act-141",
    "seq": 141,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "الميكانيك الحراري وتطبيقاته في البيوت المحمية والزراعة المحمية",
    "department": "وحدة التعليم المستمر",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-03-14",
    "end_date": "2027-03-14",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ساره سالم حسن / محمد نوري سعيد",
    "parsed_lecturers": [
      "ساره سالم حسن",
      "محمد نوري سعيد"
    ],
    "lecturer_name": "ساره سالم حسن",
    "lecturer_phone": "9647735722475",
    "lecturer_email": "sara.hassan.iba101@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ساره سالم حسن",
        "phone": "9647735722475",
        "email": "sara.hassan.iba101@atu.edu.iq",
        "specialty": "ميكانيك تطبيقي"
      },
      {
        "name": "محمد نوري سعيد",
        "specialty": "البستنة وهندسة الحدائق"
      }
    ]
  },
  {
    "id": "poly-act-142",
    "seq": 142,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "ورشة التحول الرقمي في المؤسسات والتعليم",
    "department": "شبكات وبرمجيات الحاسوب",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-03-22",
    "end_date": "2027-03-22",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رؤى مجيد عزيز / وفاء محمدرضا / زينب صاحب",
    "parsed_lecturers": [
      "رؤى مجيد عزيز",
      "وفاء محمدرضا",
      "زينب صاحب"
    ],
    "lecturer_name": "رؤى مجيد عزيز",
    "lecturer_phone": "9647726574022",
    "lecturer_email": "ruaa.humady@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "رؤى مجيد عزيز",
        "phone": "9647726574022",
        "email": "ruaa.humady@atu.edu.iq",
        "specialty": "هندسة تقنيات الحاسوب"
      },
      {
        "name": "وفاء محمدرضا",
        "phone": "9647802428213",
        "email": "inb.wfa@atu.edu.iq",
        "specialty": "هندسة الكترونيات"
      },
      {
        "name": "زينب صاحب",
        "specialty": "برمجيات"
      }
    ]
  },
  {
    "id": "poly-act-143",
    "seq": 143,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "بناء نماذج التعلم العميق",
    "department": "شبكات وبرمجيات الحاسوب",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-09",
    "end_date": "2026-11-09",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "حافظ علي شباط / خمائل راقم رحيم",
    "parsed_lecturers": [
      "حافظ علي شباط",
      "خمائل راقم رحيم"
    ],
    "lecturer_name": "حافظ علي شباط",
    "lecturer_phone": "9647713694068",
    "lecturer_email": "khmrakrah@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "حافظ علي شباط",
        "specialty": "ذكاء اصطناعي"
      },
      {
        "name": "خمائل راقم رحيم",
        "phone": "9647713694068",
        "email": "khmrakrah@atu.edu.iq",
        "specialty": "ذكاء اصطناعي"
      }
    ]
  },
  {
    "id": "poly-act-144",
    "seq": 144,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "اخلاقيات مهنة التدقيق والمحاسبة",
    "department": "المحاسبة",
    "specialty": "اداري",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-02-14",
    "end_date": "2027-02-14",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "محمد ديكان عبد الامير / ليث علي حمادي / مرتضى محمد شاني",
    "parsed_lecturers": [
      "محمد ديكان عبد الامير",
      "ليث علي حمادي",
      "مرتضى محمد شاني"
    ],
    "lecturer_name": "محمد ديكان عبد الامير",
    "lecturer_phone": "9647725085691",
    "lecturer_email": "layth.hammadi@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "محمد ديكان عبد الامير",
        "specialty": "تدقيق"
      },
      {
        "name": "ليث علي حمادي",
        "phone": "9647725085691",
        "email": "layth.hammadi@atu.edu.iq",
        "specialty": "محاسبة مالية"
      },
      {
        "name": "مرتضى محمد شاني",
        "specialty": "محاسبة مالية"
      }
    ]
  },
  {
    "id": "poly-act-145",
    "seq": 145,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "استخدام الذكاء الاصطناعي في المحاسبة المالية والتدقيق",
    "department": "المحاسبة",
    "specialty": "اداري",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-24",
    "end_date": "2027-01-24",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "محمد ديكان عبد الامير / ليث علي حمادي / مرتضى محمد شاني",
    "parsed_lecturers": [
      "محمد ديكان عبد الامير",
      "ليث علي حمادي",
      "مرتضى محمد شاني"
    ],
    "lecturer_name": "محمد ديكان عبد الامير",
    "lecturer_phone": "9647725085691",
    "lecturer_email": "layth.hammadi@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "محمد ديكان عبد الامير",
        "specialty": "تدقيق"
      },
      {
        "name": "ليث علي حمادي",
        "phone": "9647725085691",
        "email": "layth.hammadi@atu.edu.iq",
        "specialty": "محاسبة مالية"
      },
      {
        "name": "مرتضى محمد شاني",
        "specialty": "محاسبة مالية"
      }
    ]
  },
  {
    "id": "poly-act-146",
    "seq": 146,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "مفهوم العدوان في عالم متغير",
    "department": "ادارة القانونية",
    "specialty": "اداري",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-04",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "هاني عبد الله عمران / قاسم ماضي حمزة",
    "parsed_lecturers": [
      "هاني عبد الله عمران",
      "قاسم ماضي حمزة"
    ],
    "lecturer_name": "هاني عبد الله عمران",
    "lecturer_phone": "9647802428207",
    "lecturer_email": "hani.omran@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "هاني عبد الله عمران",
        "phone": "9647802428207",
        "email": "hani.omran@atu.edu.iq",
        "specialty": "قانون دولي"
      },
      {
        "name": "قاسم ماضي حمزة",
        "phone": "9647601041133",
        "email": "qasim.hamzah@atu.edu.iq",
        "specialty": "قانون عام"
      }
    ]
  },
  {
    "id": "poly-act-147",
    "seq": 147,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "الشراكة بين القطاع العام والقطاع الخاص في ادارة المرافق العامة",
    "department": "ادارة القانونية",
    "specialty": "اداري",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-08",
    "end_date": "2026-11-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "نغم عبد الحسين خليل / انعام حسين راضي",
    "parsed_lecturers": [
      "نغم عبد الحسين خليل",
      "انعام حسين راضي"
    ],
    "lecturer_name": "نغم عبد الحسين خليل",
    "lecturer_phone": "9647826274979",
    "lecturer_email": "nagham.khalil@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "نغم عبد الحسين خليل",
        "phone": "9647826274979",
        "email": "nagham.khalil@atu.edu.iq",
        "specialty": "قانون"
      },
      {
        "name": "انعام حسين راضي",
        "phone": "9647725964474",
        "email": "inam.obaid.iba@atu.edu.iq",
        "specialty": "ادارة صناعية"
      }
    ]
  },
  {
    "id": "poly-act-148",
    "seq": 148,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "طرق جمع العينات الطبية من مسرح الجريمة",
    "department": "ادلة جنائية",
    "specialty": "اداري",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-08",
    "end_date": "2026-11-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "عباس رزاق عبد",
    "parsed_lecturers": [
      "عباس رزاق عبد"
    ],
    "lecturer_name": "عباس رزاق عبد",
    "lecturer_phone": "9647800719405",
    "lecturer_email": "inb.abs3@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "عباس رزاق عبد",
        "phone": "9647800719405",
        "email": "inb.abs3@atu.edu.iq",
        "specialty": "ادوية وسموم"
      }
    ]
  },
  {
    "id": "poly-act-149",
    "seq": 149,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "الخبرة الفنية ودورها في الاثباتات الجنائية",
    "department": "ادلة جنائية",
    "specialty": "اداري",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-01",
    "end_date": "2026-11-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "احمد رعد عزيز",
    "parsed_lecturers": [
      "احمد رعد عزيز"
    ],
    "lecturer_name": "احمد رعد عزيز",
    "lecturer_phone": "9647832432643",
    "lecturer_email": "ahmed.azeez.iba113@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "احمد رعد عزيز",
        "phone": "9647832432643",
        "email": "ahmed.azeez.iba113@atu.edu.iq",
        "specialty": "قانون"
      }
    ]
  },
  {
    "id": "poly-act-150",
    "seq": 150,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "دراسة مجهرية لاليات موت الخلايا النسيجية عن السموم البكتيرية",
    "department": "تمريض",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-15",
    "end_date": "2026-11-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رباب عدنان حمزة / مريم صادق عيسى",
    "parsed_lecturers": [
      "رباب عدنان حمزة",
      "مريم صادق عيسى"
    ],
    "lecturer_name": "رباب عدنان حمزة",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "رباب عدنان حمزة",
        "specialty": "تشريح وانسجة"
      },
      {
        "name": "مريم صادق عيسى",
        "specialty": "احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-151",
    "seq": 151,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "دراسة الاثار البيوكيميائية للامراض",
    "department": "تمريض",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-02",
    "end_date": "2026-12-02",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سوسن حسن",
    "parsed_lecturers": [
      "سوسن حسن"
    ],
    "lecturer_name": "سوسن حسن",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "سوسن حسن",
        "specialty": "كيمياء حياتية"
      }
    ]
  },
  {
    "id": "poly-act-152",
    "seq": 152,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "التعامل مع أنظمة التشغيل وإدارة الملفات",
    "department": "الصيدلة",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-26",
    "end_date": "2026-10-26",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "وفاء محمد / هالة حسين",
    "parsed_lecturers": [
      "وفاء محمد",
      "هالة حسين"
    ],
    "lecturer_name": "وفاء محمد",
    "lecturer_phone": "9647800766228",
    "lecturer_email": "halahussein430@gmail.com",
    "lecturers_details": [
      {
        "name": "وفاء محمد",
        "specialty": "هندسي"
      },
      {
        "name": "هالة حسين",
        "phone": "9647800766228",
        "email": "halahussein430@gmail.com",
        "specialty": "طبي"
      }
    ]
  },
  {
    "id": "poly-act-153",
    "seq": 153,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "الامراض المعدية وطرق الوقاية منها",
    "department": "الصيدلة",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-20",
    "end_date": "2026-10-20",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "حوراء احمد / زينب عبودي عباس",
    "parsed_lecturers": [
      "حوراء احمد",
      "زينب عبودي عباس"
    ],
    "lecturer_name": "حوراء احمد",
    "lecturer_phone": "9647816833294",
    "lecturer_email": "zainab.abbas.iba114@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "حوراء احمد",
        "specialty": "طبي"
      },
      {
        "name": "زينب عبودي عباس",
        "phone": "9647816833294",
        "email": "zainab.abbas.iba114@atu.edu.iq",
        "specialty": "علوم"
      }
    ]
  },
  {
    "id": "poly-act-154",
    "seq": 154,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "التلوث الفطري للفواكه المجففة والمسكرات",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-10",
    "end_date": "2026-11-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ابتسام محمد حسين / شيماء عبد الجبار سعيد",
    "parsed_lecturers": [
      "ابتسام محمد حسين",
      "شيماء عبد الجبار سعيد"
    ],
    "lecturer_name": "ابتسام محمد حسين",
    "lecturer_phone": "9647831691033",
    "lecturer_email": "inb.ebts@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ابتسام محمد حسين",
        "phone": "9647831691033",
        "email": "inb.ebts@atu.edu.iq",
        "specialty": "احياء مجهرية"
      },
      {
        "name": "شيماء عبد الجبار سعيد",
        "phone": "9647829304616",
        "email": "shymaa.saeed@atu.edu.iq",
        "specialty": "مقاومة احيائية"
      }
    ]
  },
  {
    "id": "poly-act-155",
    "seq": 155,
    "type": "workshop",
    "raw_type": "ورشة",
    "title": "التعامل مع حالات الطوارئ الصحية في الأماكن العامة",
    "department": "صحة المجتمع",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-15",
    "end_date": "2026-12-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اسيل حافظ جواد / ايناس عباس",
    "parsed_lecturers": [
      "اسيل حافظ جواد",
      "ايناس عباس"
    ],
    "lecturer_name": "اسيل حافظ جواد",
    "lecturer_phone": "9647813437240",
    "lecturer_email": "aseel.abbod.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "اسيل حافظ جواد",
        "phone": "9647813437240",
        "email": "aseel.abbod.iba@atu.edu.iq",
        "specialty": "صحة مجتمع"
      },
      {
        "name": "ايناس عباس",
        "email": "inas.khairualla@atu.edu.iq",
        "specialty": "صحة مجتمع"
      }
    ]
  },
  {
    "id": "poly-act-156",
    "seq": 156,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "دور الاحياء المجهريه في صحه الانسان ومكافحة الأمراض المعدية",
    "department": "قسم تقنيات المختبرات الطبيه",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-25",
    "end_date": "2027-01-25",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "مها حميد اسماعيل",
    "parsed_lecturers": [
      "مها حميد اسماعيل"
    ],
    "lecturer_name": "مها حميد اسماعيل",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "مها حميد اسماعيل",
        "specialty": "ماجستير احياء مجهريه"
      }
    ]
  },
  {
    "id": "poly-act-157",
    "seq": 157,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "اثر تبني مؤشرات محاسبه الاستدامه في تعزيز الأداء المالي",
    "department": "المحاسبه",
    "specialty": "اداري",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-04",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ليث علي حمادي",
    "parsed_lecturers": [
      "ليث علي حمادي"
    ],
    "lecturer_name": "ليث علي حمادي",
    "lecturer_phone": "9647725085691",
    "lecturer_email": "layth.hammadi@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ليث علي حمادي",
        "phone": "9647725085691",
        "email": "layth.hammadi@atu.edu.iq",
        "specialty": "محاسبه ماليه"
      }
    ]
  },
  {
    "id": "poly-act-158",
    "seq": 158,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "ندوه عن مرض انواع التهاب الكبد الفيروسي",
    "department": "قسم تقنيات صحة مجتمع",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-01-10",
    "end_date": "2027-01-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ايناس عباس خيرالله",
    "parsed_lecturers": [
      "ايناس عباس خيرالله"
    ],
    "lecturer_name": "ايناس عباس خيرالله",
    "lecturer_phone": "",
    "lecturer_email": "inas.khairualla@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ايناس عباس خيرالله",
        "email": "inas.khairualla@atu.edu.iq",
        "specialty": "احياء مجهريه طبيه"
      }
    ]
  },
  {
    "id": "poly-act-159",
    "seq": 159,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "التقنيات الحديثه في تشخيص الميكروبات",
    "department": "تقنيات صحة المجتمع",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-04",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "شيماء عبد الجبار سعيد",
    "parsed_lecturers": [
      "شيماء عبد الجبار سعيد"
    ],
    "lecturer_name": "شيماء عبد الجبار سعيد",
    "lecturer_phone": "9647829304616",
    "lecturer_email": "shymaa.saeed@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "شيماء عبد الجبار سعيد",
        "phone": "9647829304616",
        "email": "shymaa.saeed@atu.edu.iq",
        "specialty": "احياءً مجهريه طبيه"
      }
    ]
  },
  {
    "id": "poly-act-160",
    "seq": 160,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "\"متبقيات المبيدات في النباتات الطبية وأثرها على فعالية المستخلصات الصيدلانية\".",
    "department": "تقنيات الصيدلة",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-01",
    "end_date": "2026-11-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اقبال زهو عبد",
    "parsed_lecturers": [
      "اقبال زهو عبد"
    ],
    "lecturer_name": "اقبال زهو عبد",
    "lecturer_phone": "9647725247246",
    "lecturer_email": "iqbal.abed.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "اقبال زهو عبد",
        "phone": "9647725247246",
        "email": "iqbal.abed.iba@atu.edu.iq",
        "specialty": "علوم زراعية"
      }
    ]
  },
  {
    "id": "poly-act-161",
    "seq": 161,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "دور البكتريا النافعة في تعزيز الصحة ومكافحة الأمراض",
    "department": "تقنيات المختبرات الطبية",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-02-28",
    "end_date": "2027-02-28",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ايات رحيم خلف",
    "parsed_lecturers": [
      "ايات رحيم خلف"
    ],
    "lecturer_name": "ايات رحيم خلف",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "ايات رحيم خلف",
        "specialty": "علوم حياة / احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-162",
    "seq": 162,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "التكامل بين الذكاء الاصطناعي وإدارة السجلات الطبية الإلكترونية",
    "department": "الاجهزة الطبية",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-25",
    "end_date": "2026-10-25",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "دلائل سعد عبدالزهره",
    "parsed_lecturers": [
      "دلائل سعد عبدالزهره"
    ],
    "lecturer_name": "دلائل سعد عبدالزهره",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "دلائل سعد عبدالزهره",
        "specialty": "رياضيات/ تشفير"
      }
    ]
  },
  {
    "id": "poly-act-163",
    "seq": 163,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "التوازن بين المناعة والهرمونات وتأثيره على الخصوبة",
    "department": "صحه مجتمع",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-17",
    "end_date": "2026-11-17",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "شهد سعد محمد",
    "parsed_lecturers": [
      "شهد سعد محمد"
    ],
    "lecturer_name": "شهد سعد محمد",
    "lecturer_phone": "9647814640434",
    "lecturer_email": "shahadmostfa674@gmail.com",
    "lecturers_details": [
      {
        "name": "شهد سعد محمد",
        "phone": "9647814640434",
        "email": "shahadmostfa674@gmail.com",
        "specialty": "مناعه سريريه"
      }
    ]
  },
  {
    "id": "poly-act-164",
    "seq": 164,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "التفاعلات المناعية في الدم: رؤية فسيولوجية",
    "department": "تقنيات المختبرات الطبية",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-06",
    "end_date": "2026-12-06",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ود عبدالخالق عبدزيد",
    "parsed_lecturers": [
      "ود عبدالخالق عبدزيد"
    ],
    "lecturer_name": "ود عبدالخالق عبدزيد",
    "lecturer_phone": "9647812044586",
    "lecturer_email": "wid.abdzaid@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ود عبدالخالق عبدزيد",
        "phone": "9647812044586",
        "email": "wid.abdzaid@atu.edu.iq",
        "specialty": "فسلجة دم"
      }
    ]
  },
  {
    "id": "poly-act-165",
    "seq": 165,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "التغذيه الصحيه والتحصيل الدراسي للطالب",
    "department": "صحه المجتمع",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-20",
    "end_date": "2026-09-20",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اسيل حافظ جواد",
    "parsed_lecturers": [
      "اسيل حافظ جواد"
    ],
    "lecturer_name": "اسيل حافظ جواد",
    "lecturer_phone": "9647813437240",
    "lecturer_email": "aseel.abbod.iba@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "اسيل حافظ جواد",
        "phone": "9647813437240",
        "email": "aseel.abbod.iba@atu.edu.iq",
        "specialty": "طبي صحه مجتمع"
      }
    ]
  },
  {
    "id": "poly-act-166",
    "seq": 166,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "الفحص الوراثي قبل الزواج للحد من الأمراض باستخدام الذكاء الاصطناعي",
    "department": "تقنيات المختبرات الطبية",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-30",
    "end_date": "2026-09-30",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سيف عبيد حسين",
    "parsed_lecturers": [
      "سيف عبيد حسين"
    ],
    "lecturer_name": "سيف عبيد حسين",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "سيف عبيد حسين",
        "specialty": "هندسة حاسبات"
      }
    ]
  },
  {
    "id": "poly-act-167",
    "seq": 167,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "ندوة الطاقة المتجددة والبيئة",
    "department": "تقنيات ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-02",
    "end_date": "2026-11-02",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زينه صلاح حسن",
    "parsed_lecturers": [
      "زينه صلاح حسن"
    ],
    "lecturer_name": "زينه صلاح حسن",
    "lecturer_phone": "9647803865847",
    "lecturer_email": "zinah.hasan@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زينه صلاح حسن",
        "phone": "9647803865847",
        "email": "zinah.hasan@atu.edu.iq",
        "specialty": "ماجستير هندسة القدرة الكهربائية"
      }
    ]
  },
  {
    "id": "poly-act-169",
    "seq": 169,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "“تطبيقات النانو تكنولوجي في تطوير أنظمة السيارات: من كفاءة المحرك إلى تقنيات التبريد والطاقة”",
    "department": "تقنيات ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-01",
    "end_date": "2026-10-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "اسراء عدنان نجم",
    "parsed_lecturers": [
      "اسراء عدنان نجم"
    ],
    "lecturer_name": "اسراء عدنان نجم",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "اسراء عدنان نجم",
        "specialty": "هندسة مواد /مواد سيراميكية"
      }
    ]
  },
  {
    "id": "poly-act-170",
    "seq": 170,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "تطور صناعة السيارات من محركات الاحتراق الداخلي إلى السيارات الكهربائية",
    "department": "تقنيات ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-18",
    "end_date": "2026-11-18",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ليث سليم كمال",
    "parsed_lecturers": [
      "ليث سليم كمال"
    ],
    "lecturer_name": "ليث سليم كمال",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "ليث سليم كمال",
        "specialty": "هندسة ميكانيك/اتمته ميكانيكية"
      }
    ]
  },
  {
    "id": "poly-act-171",
    "seq": 171,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "بكتيريا Helicobacter pylori وتأثيرها الحيوي على صحة الجهاز الهضمي واستراتيجيات التشخيص والعلاجات الحديثة لمواجهة المقاومة الدوائية",
    "department": "تقنيات المختبرات الطبية",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-13",
    "end_date": "2026-10-13",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ساره عبد الكريم مخيف",
    "parsed_lecturers": [
      "ساره عبد الكريم مخيف"
    ],
    "lecturer_name": "ساره عبد الكريم مخيف",
    "lecturer_phone": "9647804734690",
    "lecturer_email": "sarah.mukheef@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ساره عبد الكريم مخيف",
        "phone": "9647804734690",
        "email": "sarah.mukheef@atu.edu.iq",
        "specialty": "دكتوراه احياء مجهرية"
      }
    ]
  },
  {
    "id": "poly-act-172",
    "seq": 172,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "انواع المواد المعقمة المستخدمة للقضاء على البكتريا والفطريات الممرضة للانسان والنبات",
    "department": "تقنيات صحة المجتمع",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-05-03",
    "end_date": "2027-05-03",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ابتسام محمد حسين / شيماء عبد الجبار سعيد",
    "parsed_lecturers": [
      "ابتسام محمد حسين",
      "شيماء عبد الجبار سعيد"
    ],
    "lecturer_name": "ابتسام محمد حسين",
    "lecturer_phone": "9647831691033",
    "lecturer_email": "inb.ebts@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ابتسام محمد حسين",
        "phone": "9647831691033",
        "email": "inb.ebts@atu.edu.iq",
        "specialty": "مقاومة احيائية"
      },
      {
        "name": "شيماء عبد الجبار سعيد",
        "phone": "9647829304616",
        "email": "shymaa.saeed@atu.edu.iq",
        "specialty": "احياء مجهرية طبية"
      }
    ]
  },
  {
    "id": "poly-act-173",
    "seq": 173,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "ندوة عن الاستدامة ودورها في تطوير المواد والتقنيات الحديثة",
    "department": "تقنيات ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-17",
    "end_date": "2026-11-17",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زهراء كاظم روضان",
    "parsed_lecturers": [
      "زهراء كاظم روضان"
    ],
    "lecturer_name": "زهراء كاظم روضان",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "زهراء كاظم روضان",
        "specialty": "فيزياء مواد"
      }
    ]
  },
  {
    "id": "poly-act-174",
    "seq": 174,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "اهم الاعطال في منظومات التبريد",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-05-18",
    "end_date": "2027-05-18",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "علي عاصم عبد الرزاق",
    "parsed_lecturers": [
      "علي عاصم عبد الرزاق"
    ],
    "lecturer_name": "علي عاصم عبد الرزاق",
    "lecturer_phone": "9647721903176",
    "lecturer_email": "ali.net2009@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "علي عاصم عبد الرزاق",
        "phone": "9647721903176",
        "email": "ali.net2009@atu.edu.iq",
        "specialty": "تبريد وتكييف"
      }
    ]
  },
  {
    "id": "poly-act-175",
    "seq": 175,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "استخدام التقنيات الحديثة في تشخيص الميكروبات",
    "department": "تقنيات صحة المجتمع",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-04",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ابتسام محمد حسين / شيماء عبد الجبار",
    "parsed_lecturers": [
      "ابتسام محمد حسين",
      "شيماء عبد الجبار"
    ],
    "lecturer_name": "ابتسام محمد حسين",
    "lecturer_phone": "9647831691033",
    "lecturer_email": "inb.ebts@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ابتسام محمد حسين",
        "phone": "9647831691033",
        "email": "inb.ebts@atu.edu.iq",
        "specialty": "مقاومه إحيائية"
      },
      {
        "name": "شيماء عبد الجبار",
        "phone": "9647829304616",
        "email": "shymaa.saeed@atu.edu.iq",
        "specialty": "احياءً مجهريه طبية"
      }
    ]
  },
  {
    "id": "poly-act-176",
    "seq": 176,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "الاجزاء الميكانيكية التصميميه التي تدخل في عملية الاشعال في محركات الاحتراق الداخلي",
    "department": "تقنيات ميكانيك القدره",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-01",
    "end_date": "2026-11-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "علي جاسم عطيه لفته",
    "parsed_lecturers": [
      "علي جاسم عطيه لفته"
    ],
    "lecturer_name": "علي جاسم عطيه لفته",
    "lecturer_phone": "9647804643608",
    "lecturer_email": "ali.atiyah.iba115@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "علي جاسم عطيه لفته",
        "phone": "9647804643608",
        "email": "ali.atiyah.iba115@atu.edu.iq",
        "specialty": "ماجستير هندسه ميكانيك تصميم تطبيقي"
      }
    ]
  },
  {
    "id": "poly-act-177",
    "seq": 177,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "اخلاقيات البحث العلمي",
    "department": "تقنيات الميكانيك",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-13",
    "end_date": "2026-10-13",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "نوال عبدالله عمران / نجلاء شاكر عزيز",
    "parsed_lecturers": [
      "نوال عبدالله عمران",
      "نجلاء شاكر عزيز"
    ],
    "lecturer_name": "نوال عبدالله عمران",
    "lecturer_phone": "9647702684846",
    "lecturer_email": "nawal_omran@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "نوال عبدالله عمران",
        "phone": "9647702684846",
        "email": "nawal_omran@atu.edu.iq",
        "specialty": "هندسة انتاج و مكائن والالات زراعية"
      },
      {
        "name": "نجلاء شاكر عزيز",
        "phone": "9647723128916",
        "email": "najlaa.shemery@atu.edu.iq"
      }
    ]
  },
  {
    "id": "poly-act-178",
    "seq": 178,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "الرقابة على الجودة",
    "department": "التقنيات الميكانيكية",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-23",
    "end_date": "2026-09-23",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زهير حسن عبدالله",
    "parsed_lecturers": [
      "زهير حسن عبدالله"
    ],
    "lecturer_name": "زهير حسن عبدالله",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "زهير حسن عبدالله",
        "specialty": "هندسة صناعية"
      }
    ]
  },
  {
    "id": "poly-act-179",
    "seq": 179,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "قانون انضباط الموضفين و تطبيقاته في التعليم العالي",
    "department": "الاجهزة الطبية",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-09-10",
    "end_date": "2026-09-10",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "زيد خضر جاسم",
    "parsed_lecturers": [
      "زيد خضر جاسم"
    ],
    "lecturer_name": "زيد خضر جاسم",
    "lecturer_phone": "9647730551186",
    "lecturer_email": "zaid.bermany@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "زيد خضر جاسم",
        "phone": "9647730551186",
        "email": "zaid.bermany@atu.edu.iq",
        "specialty": "القانون"
      }
    ]
  },
  {
    "id": "poly-act-180",
    "seq": 180,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "نظرية الفوضى في الدوائر الالكترونية",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-03-06",
    "end_date": "2027-03-06",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "احمد محمدعلي علي",
    "parsed_lecturers": [
      "احمد محمدعلي علي"
    ],
    "lecturer_name": "احمد محمدعلي علي",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "احمد محمدعلي علي",
        "specialty": "دكتوراه هندسة كهربائية والكترونية"
      }
    ]
  },
  {
    "id": "poly-act-181",
    "seq": 181,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "الاسس الفسيولوجية للالم",
    "department": "تقنيات صحة المجتمع",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-12-13",
    "end_date": "2026-12-13",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سالينا عبد العباس ناصر / شهد سعد محمد",
    "parsed_lecturers": [
      "سالينا عبد العباس ناصر",
      "شهد سعد محمد"
    ],
    "lecturer_name": "سالينا عبد العباس ناصر",
    "lecturer_phone": "9647819165118",
    "lecturer_email": "dr.salina8@gmail.com",
    "lecturers_details": [
      {
        "name": "سالينا عبد العباس ناصر",
        "phone": "9647819165118",
        "email": "dr.salina8@gmail.com",
        "specialty": "ماجستير فسلجة طبية /مناعة"
      },
      {
        "name": "شهد سعد محمد",
        "phone": "9647814640434",
        "email": "shahadmostfa674@gmail.com"
      }
    ]
  },
  {
    "id": "poly-act-182",
    "seq": 182,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "الطاقة المتجددة، مصادرها، واستخداماتها وفوائدها في الحاضر والمستقبل",
    "department": "قسم تقنيات الاجهزة الطبية",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-11-01",
    "end_date": "2026-11-01",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "باسم جبار مجيد",
    "parsed_lecturers": [
      "باسم جبار مجيد"
    ],
    "lecturer_name": "باسم جبار مجيد",
    "lecturer_phone": "9647822285663",
    "lecturer_email": "basim.majeed@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "باسم جبار مجيد",
        "phone": "9647822285663",
        "email": "basim.majeed@atu.edu.iq",
        "specialty": "هندسة الطاقة المتجددة"
      }
    ]
  },
  {
    "id": "poly-act-183",
    "seq": 183,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "تلوث المياة بالمعادن الثقيله وتأثيرها على صحة الدماغ",
    "department": "المختبرات الطبيه",
    "specialty": "طبي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-06",
    "end_date": "2026-10-06",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "رؤى وهاب محمد",
    "parsed_lecturers": [
      "رؤى وهاب محمد"
    ],
    "lecturer_name": "رؤى وهاب محمد",
    "lecturer_phone": "9647601017371",
    "lecturer_email": "roaa.mohammed@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "رؤى وهاب محمد",
        "phone": "9647601017371",
        "email": "roaa.mohammed@atu.edu.iq",
        "specialty": "كيمياء عضويه"
      }
    ]
  },
  {
    "id": "poly-act-184",
    "seq": 184,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "السخانات الشمسية المنزلية",
    "department": "الالكترونيك",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-02-15",
    "end_date": "2027-02-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "سعد صلاح حميد",
    "parsed_lecturers": [
      "سعد صلاح حميد"
    ],
    "lecturer_name": "سعد صلاح حميد",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "سعد صلاح حميد",
        "specialty": "الكترونيك/اتصالات"
      }
    ]
  },
  {
    "id": "poly-act-185",
    "seq": 185,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "أسس حساب القدرة اللازمة لتصميم الانظمة الشمسية",
    "department": "ميكانيك القدرة",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-03-08",
    "end_date": "2027-03-08",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "حميده مسلم عبدالحسين",
    "parsed_lecturers": [
      "حميده مسلم عبدالحسين"
    ],
    "lecturer_name": "حميده مسلم عبدالحسين",
    "lecturer_phone": "9647708015920",
    "lecturer_email": "hameedahmuslim@gmail.com",
    "lecturers_details": [
      {
        "name": "حميده مسلم عبدالحسين",
        "phone": "9647708015920",
        "email": "hameedahmuslim@gmail.com",
        "specialty": "هندسة تقنيات حراريات"
      }
    ]
  },
  {
    "id": "poly-act-186",
    "seq": 186,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "استخدام برامج المحاكاة الالكترونية واهميتها في سوق العمل",
    "department": "تقنيات الأجهزة الطبية",
    "specialty": "هندسي",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2027-02-15",
    "end_date": "2027-02-15",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "عمار علي عباس",
    "parsed_lecturers": [
      "عمار علي عباس"
    ],
    "lecturer_name": "عمار علي عباس",
    "lecturer_phone": "",
    "lecturer_email": "",
    "lecturers_details": [
      {
        "name": "عمار علي عباس",
        "specialty": "ماجستير هندسة كهربائية"
      }
    ]
  },
  {
    "id": "poly-act-187",
    "seq": 187,
    "type": "workshop",
    "raw_type": "ندوة",
    "title": "الابتكار الاداري كمدخل لتحقيق الميزة التنافسية",
    "department": "قسم ادارة المواد",
    "specialty": "اداري",
    "duration": "1 أيام",
    "cost": "مجاني",
    "target_audience": "موظفين+تدريسيين",
    "start_date": "2026-10-04",
    "end_date": "2026-10-04",
    "location": "القاعة المركزية - كلية البوليتكنك",
    "start_time": "10:00 صباحاً",
    "date_fixed": false,
    "lecturers_raw": "ليلى منصور / حوان فاضل",
    "parsed_lecturers": [
      "ليلى منصور",
      "حوان فاضل"
    ],
    "lecturer_name": "ليلى منصور",
    "lecturer_phone": "9647806348343",
    "lecturer_email": "layla.mazhar.bib10@atu.edu.iq",
    "lecturers_details": [
      {
        "name": "ليلى منصور",
        "phone": "9647806348343",
        "email": "layla.mazhar.bib10@atu.edu.iq",
        "specialty": "ريادة الاعمال / إدارة الاعمال"
      },
      {
        "name": "حوان فاضل"
      }
    ]
  }
];

export const POLYTECHNIC_LECTURERS: Lecturer[] = [
  {
    "id": "lec-1",
    "full_name": "اوراس خضير عبيس",
    "normalized_name": "اوراس خضير عبيس",
    "department": "ميكانيك",
    "email": "",
    "phone": "",
    "specialty": "هندسة ميكانيك / حراريات"
  },
  {
    "id": "lec-2",
    "full_name": "مالك عبد الحسين محسن",
    "normalized_name": "مالك عبد الحسين محسن",
    "department": "كلية البوليتكنك",
    "email": "malik.alhusayn.iba@atu.edu.iq",
    "phone": "9647732311295",
    "specialty": "هندسة مواد/ معادن"
  },
  {
    "id": "lec-3",
    "full_name": "زهرة حمود جلهام",
    "normalized_name": "زهره حمود جلهام",
    "department": "كلية البوليتكنك",
    "email": "inb.zhr2@atu.edu.iq",
    "phone": "9647814026056",
    "specialty": "هندسة ميكانيك / حراريات"
  },
  {
    "id": "lec-4",
    "full_name": "محمد علي جبر داخل",
    "normalized_name": "محمد علي جبر داخل",
    "department": "ميكانيك",
    "email": "mohammed.dakhil@atu.edu.iq",
    "phone": "9647702736402",
    "specialty": "هندسة معادن"
  },
  {
    "id": "lec-5",
    "full_name": "رائد سلمان سعيد",
    "normalized_name": "رائد سلمان سعيد",
    "department": "كلية البوليتكنك",
    "email": "raed.saeed@atu.edu.iq",
    "phone": "9647811371354",
    "specialty": "ميكانيك تطبيقي"
  },
  {
    "id": "lec-6",
    "full_name": "زينب عبد العباس محسن",
    "normalized_name": "زينب عبد العباس محسن",
    "department": "ميكانيك",
    "email": "zainab.muhsen@atu.edu.iq",
    "phone": "9647725259081",
    "specialty": "هندسة حاسبات / برامجيات"
  },
  {
    "id": "lec-7",
    "full_name": "نجلاء شاكرعزيز",
    "normalized_name": "نجلاء شاكرعزيز",
    "department": "كلية البوليتكنك",
    "email": "najlaa.shemery@atu.edu.iq",
    "phone": "9647723128916",
    "specialty": "تصنيع معادن"
  },
  {
    "id": "lec-8",
    "full_name": "زهير حسن عبد الله",
    "normalized_name": "زهير حسن عبد الله",
    "department": "ميكانيك",
    "email": "",
    "phone": "",
    "specialty": "الهندسة الصناعية"
  },
  {
    "id": "lec-9",
    "full_name": "نوال عبد الله عمران",
    "normalized_name": "نوال عبد الله عمران",
    "department": "كلية البوليتكنك",
    "email": "nawal_omran@atu.edu.iq",
    "phone": "9647702684846",
    "specialty": "مكائن والات زراعية"
  },
  {
    "id": "lec-10",
    "full_name": "بشار ضياء حسين",
    "normalized_name": "بشار ضياء حسين",
    "department": "ميكانيك القدرة",
    "email": "bashar.hussein@atu.edu.iq",
    "phone": "9647809443996",
    "specialty": "ميكانيك تطبيقي"
  },
  {
    "id": "lec-11",
    "full_name": "ساره سالم حسن",
    "normalized_name": "ساره سالم حسن",
    "department": "كلية البوليتكنك",
    "email": "sara.hassan.iba101@atu.edu.iq",
    "phone": "9647735722475",
    "specialty": "ميكانيك تطبيقي"
  },
  {
    "id": "lec-12",
    "full_name": "علي جاسم عطية",
    "normalized_name": "علي جاسم عطيه",
    "department": "كلية البوليتكنك",
    "email": "ali.atiyah.iba115@atu.edu.iq",
    "phone": "9647804643608",
    "specialty": "ميكانيك تطبيقي"
  },
  {
    "id": "lec-13",
    "full_name": "زينة صلاح حسن",
    "normalized_name": "زينه صلاح حسن",
    "department": "ميكانيك القدرة",
    "email": "zinah.hasan@atu.edu.iq",
    "phone": "9647803865847",
    "specialty": "القدرة الكهربائية"
  },
  {
    "id": "lec-14",
    "full_name": "راقية جواد ناجي",
    "normalized_name": "راقيه جواد ناجي",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "إدارة صناعية"
  },
  {
    "id": "lec-15",
    "full_name": "اسراء عدنان نجم",
    "normalized_name": "اسراء عدنان نجم",
    "department": "ميكانيك القدرة",
    "email": "",
    "phone": "",
    "specialty": "هندسة مواد"
  },
  {
    "id": "lec-16",
    "full_name": "زهراء كاظم روضان",
    "normalized_name": "زهراء كاظم روضان",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "فيزياء مواد"
  },
  {
    "id": "lec-17",
    "full_name": "دريد عبد الرزاق حمد",
    "normalized_name": "دريد عبد الرزاق حمد",
    "department": "كلية البوليتكنك",
    "email": "durid.hamad.iba@atu.edu.iq",
    "phone": "9647773489775",
    "specialty": "هندسة معادن"
  },
  {
    "id": "lec-18",
    "full_name": "علاء شاكر عبيده",
    "normalized_name": "علاء شاكر عبيده",
    "department": "ميكانيك القدرة",
    "email": "",
    "phone": "",
    "specialty": "ميكانيك تطبيقي"
  },
  {
    "id": "lec-19",
    "full_name": "رائد قائد عجمي",
    "normalized_name": "رائد قائد عجمي",
    "department": "كلية البوليتكنك",
    "email": "raied.ajmi.iba112@atu.edu.iq",
    "phone": "9647816080007",
    "specialty": "ميكانيك تطبيقي"
  },
  {
    "id": "lec-20",
    "full_name": "ليث سليم كمال",
    "normalized_name": "ليث سليم كمال",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "اتمته ميكانيكية"
  },
  {
    "id": "lec-21",
    "full_name": "حميدة مسلم عبد الحسين",
    "normalized_name": "حميده مسلم عبد الحسين",
    "department": "ميكانيك القدرة",
    "email": "hameedahmuslim@gmail.com",
    "phone": "9647708015920",
    "specialty": "هندسة ميكانيك / حراريات"
  },
  {
    "id": "lec-22",
    "full_name": "الاء مجيد شنين",
    "normalized_name": "الاء مجيد شنين",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "امن سيبراني"
  },
  {
    "id": "lec-23",
    "full_name": "ساره يحيى حاتم",
    "normalized_name": "ساره يحيي حاتم",
    "department": "كلية البوليتكنك",
    "email": "sarah.assad@atu.edu.iq",
    "phone": "9647881184225",
    "specialty": "هندسة ميكانيك / حراريات"
  },
  {
    "id": "lec-24",
    "full_name": "علي عاصم عبد الرزاق",
    "normalized_name": "علي عاصم عبد الرزاق",
    "department": "ميكانيك القدرة",
    "email": "ali.net2009@atu.edu.iq",
    "phone": "9647721903176",
    "specialty": "هندسة ميكانيك / حراريات"
  },
  {
    "id": "lec-25",
    "full_name": "احمد كريم كاظم",
    "normalized_name": "احمد كريم كاظم",
    "department": "كلية البوليتكنك",
    "email": "ahmed.kadhom.iba102@atu.edu.iq",
    "phone": "9647719570199",
    "specialty": "هندسة ميكانيك / حراريات"
  },
  {
    "id": "lec-26",
    "full_name": "محمد نوري سعيد",
    "normalized_name": "محمد نوري سعيد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "البستنة وهندسة الحدائق"
  },
  {
    "id": "lec-27",
    "full_name": "محمد كريم عبد",
    "normalized_name": "محمد كريم عبد",
    "department": "المساحة",
    "email": "",
    "phone": "",
    "specialty": "هندسة مواد"
  },
  {
    "id": "lec-28",
    "full_name": "مصلح عامر صالح",
    "normalized_name": "مصلح عامر صالح",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة مواد"
  },
  {
    "id": "lec-29",
    "full_name": "سلسبيل كريم برهان",
    "normalized_name": "سلسبيل كريم برهان",
    "department": "كلية البوليتكنك",
    "email": "salsabeel.burhan.bi12@atu.edu.iq",
    "phone": "9647723964094",
    "specialty": "هندسة بايوماتك"
  },
  {
    "id": "lec-30",
    "full_name": "زينب علي حسين جاسم",
    "normalized_name": "زينب علي حسين جاسم",
    "department": "كلية البوليتكنك",
    "email": "zainab.jassim.iba@atu.edu.iq",
    "phone": "9647887833387",
    "specialty": "هندسة جيوتكنيك"
  },
  {
    "id": "lec-31",
    "full_name": "حسين يوسف جبار",
    "normalized_name": "حسين يوسف جبار",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة مدني"
  },
  {
    "id": "lec-32",
    "full_name": "ساره شاكر فاضل",
    "normalized_name": "ساره شاكر فاضل",
    "department": "كلية البوليتكنك",
    "email": "sarah.fadhil.iba1@atu.edu.iq",
    "phone": "9647816153361",
    "specialty": "هندسة معماري"
  },
  {
    "id": "lec-33",
    "full_name": "بشير سليم جاسم",
    "normalized_name": "بشير سليم جاسم",
    "department": "المساحة",
    "email": "basheer.jasim@atu.edu.iq",
    "phone": "9647724851028",
    "specialty": "هندسة جيوماتك"
  },
  {
    "id": "lec-34",
    "full_name": "زهراء موسى كاظم",
    "normalized_name": "زهراء موسي كاظم",
    "department": "كلية البوليتكنك",
    "email": "zahraa.musa@atu.edu.iq",
    "phone": "9647803183200",
    "specialty": "هندسة جيوماتك"
  },
  {
    "id": "lec-35",
    "full_name": "اثير عسكر إسماعيل",
    "normalized_name": "اثير عسكر اسماعيل",
    "department": "كلية البوليتكنك",
    "email": "atheerasker@gmail.com",
    "phone": "9647805978091",
    "specialty": "تخطيط حضري واقليمي"
  },
  {
    "id": "lec-36",
    "full_name": "صادق فرج هنوع",
    "normalized_name": "صادق فرج هنوع",
    "department": "كلية البوليتكنك",
    "email": "sadiq.hanoaa@atu.edu.iq",
    "phone": "9647800189877",
    "specialty": "هندسة استشعار عن بعد"
  },
  {
    "id": "lec-37",
    "full_name": "هبة غلاب دخيل",
    "normalized_name": "هبه غلاب دخيل",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم جيولوجيا"
  },
  {
    "id": "lec-38",
    "full_name": "عمار احمد شاكر",
    "normalized_name": "عمار احمد شاكر",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة انشاءات"
  },
  {
    "id": "lec-39",
    "full_name": "مخلد مراد عبيد",
    "normalized_name": "مخلد مراد عبيد",
    "department": "المساحة",
    "email": "mukhallad.murad.iku@atu.edu.iq",
    "phone": "9647810245245",
    "specialty": "هندسة انشاءات"
  },
  {
    "id": "lec-40",
    "full_name": "اروى هادي محمد",
    "normalized_name": "اروي هادي محمد",
    "department": "كلية البوليتكنك",
    "email": "eng.arwahadi1991@gmail.com",
    "phone": "9647813494312",
    "specialty": "هندسة مساحة"
  },
  {
    "id": "lec-41",
    "full_name": "ميثاق كوكب هادي",
    "normalized_name": "ميثاق كوكب هادي",
    "department": "كلية البوليتكنك",
    "email": "methaqmousewi@gmail.com",
    "phone": "9647821540440",
    "specialty": "هندسة مساحة"
  },
  {
    "id": "lec-42",
    "full_name": "عمار وسام عبدالزهراء",
    "normalized_name": "عمار وسام عبدالزهراء",
    "department": "شبكات وبرمجيات الحاسوب",
    "email": "smartcomputing300@gmail.com",
    "phone": "9647800354540",
    "specialty": "برمجيات"
  },
  {
    "id": "lec-43",
    "full_name": "عدنان عذاب كعيشيش",
    "normalized_name": "عدنان عذاب كعيشيش",
    "department": "كلية البوليتكنك",
    "email": "adn.ak21@atu.edu.iq",
    "phone": "9647713741154",
    "specialty": "برمجيات"
  },
  {
    "id": "lec-44",
    "full_name": "ياسر حسن جاسم",
    "normalized_name": "ياسر حسن جاسم",
    "department": "كلية البوليتكنك",
    "email": "yasser.jassem@atu.edu.iq",
    "phone": "9647816891686",
    "specialty": "برمجيات"
  },
  {
    "id": "lec-45",
    "full_name": "نداء غالب علي",
    "normalized_name": "نداء غالب علي",
    "department": "كلية البوليتكنك",
    "email": "inb.nedaa10@atu.edu.iq",
    "phone": "9647802428549",
    "specialty": "تكنولوجيا المعلومات"
  },
  {
    "id": "lec-46",
    "full_name": "علي خالد محمدعلي",
    "normalized_name": "علي خالد محمدعلي",
    "department": "كلية البوليتكنك",
    "email": "ali.khalid@atu.edu.iq",
    "phone": "",
    "specialty": "برمجيات"
  },
  {
    "id": "lec-47",
    "full_name": "خنساء عزيز عبيس",
    "normalized_name": "خنساء عزيز عبيس",
    "department": "شبكات وبرمجيات الحاسوب",
    "email": "inb.khanssa@atu.edu.iq",
    "phone": "9647724166133",
    "specialty": "معلوماتية"
  },
  {
    "id": "lec-48",
    "full_name": "صبا حسين جابر",
    "normalized_name": "صبا حسين جابر",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "برمجيات"
  },
  {
    "id": "lec-49",
    "full_name": "ضياء صالح حماد",
    "normalized_name": "ضياء صالح حماد",
    "department": "كلية البوليتكنك",
    "email": "dhiyaa_alshammari@atu.edu.iq",
    "phone": "9647722242843",
    "specialty": "برمجيات"
  },
  {
    "id": "lec-50",
    "full_name": "رؤى مجيد عزيز",
    "normalized_name": "رؤي مجيد عزيز",
    "department": "شبكات وبرمجيات الحاسوب",
    "email": "ruaa.humady@atu.edu.iq",
    "phone": "9647726574022",
    "specialty": "هندسة تقنيات الحاسوب"
  },
  {
    "id": "lec-51",
    "full_name": "وفاء محمد رضا",
    "normalized_name": "وفاء محمد رضا",
    "department": "كلية البوليتكنك",
    "email": "inb.wfa@atu.edu.iq",
    "phone": "9647802428213",
    "specialty": "هندسة الكترونيك واتصالات"
  },
  {
    "id": "lec-52",
    "full_name": "بيمان حسين",
    "normalized_name": "بيمان حسين",
    "department": "كلية البوليتكنك",
    "email": "inb.beman10@atu.edu.iq",
    "phone": "9647723734539",
    "specialty": "برمجيات"
  },
  {
    "id": "lec-53",
    "full_name": "علي صلاح مهدي",
    "normalized_name": "علي صلاح مهدي",
    "department": "كلية البوليتكنك",
    "email": "ali.khafaja@atu.edu.iq",
    "phone": "9647825338591",
    "specialty": "اتصالات"
  },
  {
    "id": "lec-54",
    "full_name": "اسراء عيسى عبد",
    "normalized_name": "اسراء عيسي عبد",
    "department": "كلية البوليتكنك",
    "email": "israa.abed@atu.edu.iq",
    "phone": "",
    "specialty": "علوم رياضيات"
  },
  {
    "id": "lec-55",
    "full_name": "حافظ علي شباط",
    "normalized_name": "حافظ علي شباط",
    "department": "شبكات وبرمجيات الحاسوب",
    "email": "",
    "phone": "",
    "specialty": "ذكاء اصطناعي"
  },
  {
    "id": "lec-56",
    "full_name": "خمائل راقم رحيم",
    "normalized_name": "خمائل راقم رحيم",
    "department": "كلية البوليتكنك",
    "email": "khmrakrah@atu.edu.iq",
    "phone": "9647713694068",
    "specialty": "ذكاء اصطناعي"
  },
  {
    "id": "lec-57",
    "full_name": "زينب صاحب ظاهر",
    "normalized_name": "زينب صاحب ظاهر",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "امن البيانات والمعلومات"
  },
  {
    "id": "lec-58",
    "full_name": "ايمان جواد ناجي",
    "normalized_name": "ايمان جواد ناجي",
    "department": "الالكترونيك",
    "email": "eman.naji@atu.edu.iq",
    "phone": "9647802428220",
    "specialty": "تحليل دالي + نظم ديناميكية"
  },
  {
    "id": "lec-59",
    "full_name": "حوراء نعمه جاسم",
    "normalized_name": "حوراء نعمه جاسم",
    "department": "كلية البوليتكنك",
    "email": "hawraa.jasim.iba9@atu.edu.iq",
    "phone": "9647729288808",
    "specialty": "هندسة كهرباء - الكترونيك واتصالات"
  },
  {
    "id": "lec-60",
    "full_name": "رسل نوري سعيد",
    "normalized_name": "رسل نوري سعيد",
    "department": "كلية البوليتكنك",
    "email": "rusul.saeed.iba12@atu.edu.iq",
    "phone": "9647800680902",
    "specialty": "هندسة كهرباء - الكترونيك واتصالات"
  },
  {
    "id": "lec-61",
    "full_name": "ذو الفقار حميد عبد الرضا",
    "normalized_name": "ذو الفقار حميد عبد الرضا",
    "department": "الالكترونيك",
    "email": "thoalfukar@atu.edu.iq",
    "phone": "9647803777077",
    "specialty": "هندسة حاسبات"
  },
  {
    "id": "lec-62",
    "full_name": "سارة خماس جوي",
    "normalized_name": "ساره خماس جوي",
    "department": "كلية البوليتكنك",
    "email": "sarah.lami@atu.edu.iq",
    "phone": "9647722116533",
    "specialty": "هندسة الالكترونيك واتصالات"
  },
  {
    "id": "lec-63",
    "full_name": "حسن فرحان رشك",
    "normalized_name": "حسن فرحان رشك",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-64",
    "full_name": "اسماء عدنان نجم",
    "normalized_name": "اسماء عدنان نجم",
    "department": "الالكترونيك",
    "email": "asmaa.najm@atu.edu.iq",
    "phone": "9647811029720",
    "specialty": "فيزياء نانوتكنولوجي"
  },
  {
    "id": "lec-65",
    "full_name": "علا باسم فاضل",
    "normalized_name": "علا باسم فاضل",
    "department": "كلية البوليتكنك",
    "email": "ola.fadhil.iba100@atu.edu.iq",
    "phone": "9647814637041",
    "specialty": "هندسة الكترونيك واتصالات"
  },
  {
    "id": "lec-66",
    "full_name": "زهراء حسن هادي",
    "normalized_name": "زهراء حسن هادي",
    "department": "الالكترونيك",
    "email": "zahraa.hadi.iba105@atu.edu.iq",
    "phone": "9647718739628",
    "specialty": "هندسة القدرة الكهربائية"
  },
  {
    "id": "lec-67",
    "full_name": "سكينة عباس فاضل",
    "normalized_name": "سكينه عباس فاضل",
    "department": "كلية البوليتكنك",
    "email": "sakena.fadhel.iba102@atu.edu.iq",
    "phone": "9647709466604",
    "specialty": "هندسة الكترونيك واتصالات"
  },
  {
    "id": "lec-68",
    "full_name": "خولة يحيى رباط",
    "normalized_name": "خوله يحيي رباط",
    "department": "كلية البوليتكنك",
    "email": "kahww.7788@gmail.com",
    "phone": "9647818506664",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-69",
    "full_name": "رويدة عبد الامير",
    "normalized_name": "رويده عبد الامير",
    "department": "الالكترونيك",
    "email": "ruwaida.abdulkareem.iba@atu.edu.iq",
    "phone": "9647723623627",
    "specialty": "اتصالات"
  },
  {
    "id": "lec-70",
    "full_name": "حسين علي محمد",
    "normalized_name": "حسين علي محمد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "اتصالات"
  },
  {
    "id": "lec-71",
    "full_name": "زيدون وليد",
    "normalized_name": "زيدون وليد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-72",
    "full_name": "علاء هادي",
    "normalized_name": "علاء هادي",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-73",
    "full_name": "سعد صلاح",
    "normalized_name": "سعد صلاح",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة الكترونيك واتصالات"
  },
  {
    "id": "lec-74",
    "full_name": "اركان راضي علي",
    "normalized_name": "اركان راضي علي",
    "department": "مدني",
    "email": "",
    "phone": "",
    "specialty": "موارد مائية"
  },
  {
    "id": "lec-75",
    "full_name": "ليث كريم عبيس",
    "normalized_name": "ليث كريم عبيس",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة كيمياوية"
  },
  {
    "id": "lec-76",
    "full_name": "منار حامد جاسم",
    "normalized_name": "منار حامد جاسم",
    "department": "كلية البوليتكنك",
    "email": "manar.jasim@atu.edu.iq",
    "phone": "9647831226783",
    "specialty": "هندسة مدنية انشاءات"
  },
  {
    "id": "lec-77",
    "full_name": "زهير كريم حمزة",
    "normalized_name": "زهير كريم حمزه",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة مدنية انشاءات"
  },
  {
    "id": "lec-78",
    "full_name": "رباب جلوب دخن",
    "normalized_name": "رباب جلوب دخن",
    "department": "مدني",
    "email": "rababdekhn@gmail.com",
    "phone": "9647818648926",
    "specialty": "انشاءات"
  },
  {
    "id": "lec-79",
    "full_name": "هدى زهير عبد الغني",
    "normalized_name": "هدي زهير عبد الغني",
    "department": "كلية البوليتكنك",
    "email": "inb.huda@atu.edu.iq",
    "phone": "9647801715581",
    "specialty": "مواد بناء"
  },
  {
    "id": "lec-80",
    "full_name": "انسام علي هاشم",
    "normalized_name": "انسام علي هاشم",
    "department": "كلية البوليتكنك",
    "email": "ansamly2@atu.edu.iq",
    "phone": "9647723731712",
    "specialty": "مواد بناء"
  },
  {
    "id": "lec-81",
    "full_name": "ريام ضياء محمد",
    "normalized_name": "ريام ضياء محمد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "موارد مائية"
  },
  {
    "id": "lec-82",
    "full_name": "فاطمة اسعد مهدي",
    "normalized_name": "فاطمه اسعد مهدي",
    "department": "مدني",
    "email": "fatima.mahdi.iba101@atu.edu.iq",
    "phone": "9647723708754",
    "specialty": "هندسة موارد مائية"
  },
  {
    "id": "lec-83",
    "full_name": "زهراء احمد عبد النبي",
    "normalized_name": "زهراء احمد عبد النبي",
    "department": "كلية البوليتكنك",
    "email": "zahraa.abduinaby.iba107@atu.edu.iq",
    "phone": "9647719028764",
    "specialty": "هندسة عمارة"
  },
  {
    "id": "lec-84",
    "full_name": "ولاء محمد جواد",
    "normalized_name": "ولاء محمد جواد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة طرق ونقل"
  },
  {
    "id": "lec-85",
    "full_name": "هاني عبد الله عمران",
    "normalized_name": "هاني عبد الله عمران",
    "department": "الإدارة القانونية",
    "email": "hani.omran@atu.edu.iq",
    "phone": "9647802428207",
    "specialty": "قانون دولي"
  },
  {
    "id": "lec-86",
    "full_name": "قاسم ماضي حمزة",
    "normalized_name": "قاسم ماضي حمزه",
    "department": "كلية البوليتكنك",
    "email": "qasim.hamzah@atu.edu.iq",
    "phone": "9647601041133",
    "specialty": "قانون عام"
  },
  {
    "id": "lec-87",
    "full_name": "شيماء طرام لفته",
    "normalized_name": "شيماء طرام لفته",
    "department": "كلية البوليتكنك",
    "email": "sheimaa.lafta@atu.edu.iq",
    "phone": "9647738084100",
    "specialty": "قانون عام"
  },
  {
    "id": "lec-88",
    "full_name": "مشتاق طالب مهنة",
    "normalized_name": "مشتاق طالب مهنه",
    "department": "كلية البوليتكنك",
    "email": "dktwrmshtaqtalb@gmail.com",
    "phone": "9647801516534",
    "specialty": "قانون دولي"
  },
  {
    "id": "lec-89",
    "full_name": "زهير محمد هاشم",
    "normalized_name": "زهير محمد هاشم",
    "department": "الإدارة القانونية",
    "email": "zuohair.hamza@atu.edu.iq",
    "phone": "9647731953404",
    "specialty": "قانون جنائي"
  },
  {
    "id": "lec-90",
    "full_name": "نغم عبد الحسين خليل",
    "normalized_name": "نغم عبد الحسين خليل",
    "department": "كلية البوليتكنك",
    "email": "nagham.khalil@atu.edu.iq",
    "phone": "9647826274979",
    "specialty": "قانون عام"
  },
  {
    "id": "lec-91",
    "full_name": "اسعد دخيل",
    "normalized_name": "اسعد دخيل",
    "department": "كلية البوليتكنك",
    "email": "asaad.hadi@atu.edu.iq",
    "phone": "9647725235990",
    "specialty": "علوم سياسية"
  },
  {
    "id": "lec-92",
    "full_name": "رجاء حسين عباس",
    "normalized_name": "رجاء حسين عباس",
    "department": "كلية البوليتكنك",
    "email": "rajaaalessmaeely@gmail.com",
    "phone": "9647830995803",
    "specialty": "قانون دولي"
  },
  {
    "id": "lec-93",
    "full_name": "محمود عبد عباس مغير",
    "normalized_name": "محمود عبد عباس مغير",
    "department": "الإدارة القانونية",
    "email": "mahmood.abas@atu.edu.iq",
    "phone": "9647815589575",
    "specialty": "قانون خاص"
  },
  {
    "id": "lec-94",
    "full_name": "حسين محسن",
    "normalized_name": "حسين محسن",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "قانون خاص"
  },
  {
    "id": "lec-95",
    "full_name": "نبا علي خليل",
    "normalized_name": "نبا علي خليل",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "تكنلوجيا المعلومات"
  },
  {
    "id": "lec-96",
    "full_name": "عباس لطيف حسين",
    "normalized_name": "عباس لطيف حسين",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "قانون دولي"
  },
  {
    "id": "lec-97",
    "full_name": "اسيل حاتم تومان",
    "normalized_name": "اسيل حاتم تومان",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "قانون جنائي"
  },
  {
    "id": "lec-98",
    "full_name": "زينب حسين جدوع",
    "normalized_name": "زينب حسين جدوع",
    "department": "كلية البوليتكنك",
    "email": "zainab.jadooe.iba@atu.edu.iq",
    "phone": "9647723668013",
    "specialty": "قانون عام"
  },
  {
    "id": "lec-99",
    "full_name": "فاضل ناجح",
    "normalized_name": "فاضل ناجح",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "قانون عام"
  },
  {
    "id": "lec-100",
    "full_name": "قاسم كاظم محمد",
    "normalized_name": "قاسم كاظم محمد",
    "department": "الإدارة القانونية",
    "email": "qasim.kadhummohammad@atu.edu.iq",
    "phone": "9647802428471",
    "specialty": "اللغة العربية"
  },
  {
    "id": "lec-101",
    "full_name": "نبيل شاكر عبد الحسين",
    "normalized_name": "نبيل شاكر عبد الحسين",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "اللغة العربية"
  },
  {
    "id": "lec-102",
    "full_name": "علي محسن جبر",
    "normalized_name": "علي محسن جبر",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم قران"
  },
  {
    "id": "lec-103",
    "full_name": "انعام حسين راضي",
    "normalized_name": "انعام حسين راضي",
    "department": "كلية البوليتكنك",
    "email": "inam.obaid.iba@atu.edu.iq",
    "phone": "9647725964474",
    "specialty": "إدارة صناعية"
  },
  {
    "id": "lec-104",
    "full_name": "جنان عبد العباس باقر",
    "normalized_name": "جنان عبد العباس باقر",
    "department": "محاسبة",
    "email": "",
    "phone": "",
    "specialty": "محاسبة مالية ودولية"
  },
  {
    "id": "lec-105",
    "full_name": "ليث علي حمادي",
    "normalized_name": "ليث علي حمادي",
    "department": "كلية البوليتكنك",
    "email": "layth.hammadi@atu.edu.iq",
    "phone": "9647725085691",
    "specialty": "محاسبة مالية"
  },
  {
    "id": "lec-106",
    "full_name": "مرتضى محمد شاني",
    "normalized_name": "مرتضي محمد شاني",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "محاسبة مالية"
  },
  {
    "id": "lec-107",
    "full_name": "محمد ديكان عبد الحسين",
    "normalized_name": "محمد ديكان عبد الحسين",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "تدقيق"
  },
  {
    "id": "lec-108",
    "full_name": "رقية كاظم حمزة",
    "normalized_name": "رقيه كاظم حمزه",
    "department": "محاسبة",
    "email": "",
    "phone": "",
    "specialty": "إدارة صناعية"
  },
  {
    "id": "lec-109",
    "full_name": "زينب زهير مهدي",
    "normalized_name": "زينب زهير مهدي",
    "department": "كلية البوليتكنك",
    "email": "zainab.mahde.iba16@atu.edu.iq",
    "phone": "9647711853669",
    "specialty": "محاسبة كلف و إدارية"
  },
  {
    "id": "lec-110",
    "full_name": "سناء كامل عبيس",
    "normalized_name": "سناء كامل عبيس",
    "department": "كلية البوليتكنك",
    "email": "sanaa.al-mansoory.iba@atu.edu.iq",
    "phone": "9647710628974",
    "specialty": "محاسبة"
  },
  {
    "id": "lec-111",
    "full_name": "سرى علاء جواد",
    "normalized_name": "سري علاء جواد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم مالية ومصرفية"
  },
  {
    "id": "lec-112",
    "full_name": "سحر عبد الحسين مجيد",
    "normalized_name": "سحر عبد الحسين مجيد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم مالية ومصرفية"
  },
  {
    "id": "lec-113",
    "full_name": "منى عبد صكبان",
    "normalized_name": "مني عبد صكبان",
    "department": "محاسبة",
    "email": "",
    "phone": "",
    "specialty": "علوم مالية ومصرفية"
  },
  {
    "id": "lec-114",
    "full_name": "سهير ضياء حسين",
    "normalized_name": "سهير ضياء حسين",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم مالية ومصرفية"
  },
  {
    "id": "lec-115",
    "full_name": "غصون ثمود محمد",
    "normalized_name": "غصون ثمود محمد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم مالية ونقدية"
  },
  {
    "id": "lec-116",
    "full_name": "جمانة علي باقر",
    "normalized_name": "جمانه علي باقر",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم مالية ونقدية"
  },
  {
    "id": "lec-117",
    "full_name": "حسن جبر",
    "normalized_name": "حسن جبر",
    "department": "إدارة مواد",
    "email": "",
    "phone": "",
    "specialty": "إدارة مواد"
  },
  {
    "id": "lec-118",
    "full_name": "هاشم جبار",
    "normalized_name": "هاشم جبار",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "إدارة مواد"
  },
  {
    "id": "lec-119",
    "full_name": "نهاية عبيد",
    "normalized_name": "نهايه عبيد",
    "department": "كلية البوليتكنك",
    "email": "nihaya.abbas.iba@atu.edu.iq",
    "phone": "",
    "specialty": "إدارة مواد"
  },
  {
    "id": "lec-120",
    "full_name": "ساره سنان",
    "normalized_name": "ساره سنان",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "اقتصاد"
  },
  {
    "id": "lec-121",
    "full_name": "جوان فاضل",
    "normalized_name": "جوان فاضل",
    "department": "إدارة مواد",
    "email": "",
    "phone": "",
    "specialty": "إدارة مواد"
  },
  {
    "id": "lec-122",
    "full_name": "حيدر حمودي",
    "normalized_name": "حيدر حمودي",
    "department": "كلية البوليتكنك",
    "email": "almimar.kadhim@atu.edu.iq",
    "phone": "9647732221397",
    "specialty": "إدارة مواد"
  },
  {
    "id": "lec-123",
    "full_name": "رياض نجم",
    "normalized_name": "رياض نجم",
    "department": "كلية البوليتكنك",
    "email": "reyadh.obaid@atu.edu.iq",
    "phone": "9647806395391",
    "specialty": "إدارة صناعية"
  },
  {
    "id": "lec-124",
    "full_name": "زهراء محمود",
    "normalized_name": "زهراء محمود",
    "department": "كلية البوليتكنك",
    "email": "zahra.al-murshidi@atu.edu.iq",
    "phone": "9647741961318",
    "specialty": "إدارة صناعية"
  },
  {
    "id": "lec-125",
    "full_name": "ليلى منصور",
    "normalized_name": "ليلي منصور",
    "department": "إدارة مواد",
    "email": "layla.mazhar.bib10@atu.edu.iq",
    "phone": "9647806348343",
    "specialty": "ريادة الاعمال"
  },
  {
    "id": "lec-126",
    "full_name": "انفال سمير",
    "normalized_name": "انفال سمير",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "إدارة صناعية"
  },
  {
    "id": "lec-127",
    "full_name": "نور رياض",
    "normalized_name": "نور رياض",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "إدارة صناعية"
  },
  {
    "id": "lec-128",
    "full_name": "علاء فليح",
    "normalized_name": "علاء فليح",
    "department": "إدارة مواد",
    "email": "",
    "phone": "",
    "specialty": "اللغة العربية"
  },
  {
    "id": "lec-129",
    "full_name": "زينا محمد",
    "normalized_name": "زينا محمد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "محاسبة"
  },
  {
    "id": "lec-130",
    "full_name": "رضاء عبد الخضر",
    "normalized_name": "رضاء عبد الخضر",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "محاسبة"
  },
  {
    "id": "lec-131",
    "full_name": "اسعد دخيل هادي",
    "normalized_name": "اسعد دخيل هادي",
    "department": "كلية البوليتكنك",
    "email": "asaad.hadi@atu.edu.iq",
    "phone": "9647725235990",
    "specialty": "قانون"
  },
  {
    "id": "lec-132",
    "full_name": "احمد فاضل ناجي",
    "normalized_name": "احمد فاضل ناجي",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "قانون"
  },
  {
    "id": "lec-133",
    "full_name": "عباس رزاق عبد",
    "normalized_name": "عباس رزاق عبد",
    "department": "الادلة الجنائية",
    "email": "inb.abs3@atu.edu.iq",
    "phone": "9647800719405",
    "specialty": "طبي"
  },
  {
    "id": "lec-134",
    "full_name": "علي صلاح وهاب",
    "normalized_name": "علي صلاح وهاب",
    "department": "كلية البوليتكنك",
    "email": "elyaali207@gmail.com",
    "phone": "9647875630448",
    "specialty": "قانون"
  },
  {
    "id": "lec-135",
    "full_name": "احمد رعد عزيز",
    "normalized_name": "احمد رعد عزيز",
    "department": "الادلة الجنائية",
    "email": "ahmed.azeez.iba113@atu.edu.iq",
    "phone": "9647832432643",
    "specialty": "قانون"
  },
  {
    "id": "lec-136",
    "full_name": "زيد احمد خليل",
    "normalized_name": "زيد احمد خليل",
    "department": "كلية البوليتكنك",
    "email": "zaidaltufail@gmail.com",
    "phone": "9647713534665",
    "specialty": "قانون"
  },
  {
    "id": "lec-137",
    "full_name": "فاضل محمد احمد",
    "normalized_name": "فاضل محمد احمد",
    "department": "كلية البوليتكنك",
    "email": "fadhel.ahmed.iba107@atu.edu.iq",
    "phone": "9647822033307",
    "specialty": "قانون"
  },
  {
    "id": "lec-138",
    "full_name": "احمد عبد الرسول عبد الرضا",
    "normalized_name": "احمد عبد الرسول عبد الرضا",
    "department": "كلية البوليتكنك",
    "email": "ahmed.jaber.iba114@atu.edu.iq",
    "phone": "9647829012707",
    "specialty": "قانون"
  },
  {
    "id": "lec-139",
    "full_name": "كوثر عبد الحسين علوان",
    "normalized_name": "كوثر عبد الحسين علوان",
    "department": "كلية البوليتكنك",
    "email": "kawthar.alwan.iba@atu.edu.iq",
    "phone": "9647725707862",
    "specialty": "قانون"
  },
  {
    "id": "lec-140",
    "full_name": "محمد ازهر رزاق",
    "normalized_name": "محمد ازهر رزاق",
    "department": "الأجهزة الطبية",
    "email": "coj.moh6@atu.edu.iq",
    "phone": "9647801687294",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-141",
    "full_name": "حيدر فاضل عبد السادة",
    "normalized_name": "حيدر فاضل عبد الساده",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-142",
    "full_name": "حسام حسن محمد",
    "normalized_name": "حسام حسن محمد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-143",
    "full_name": "دلائل سعد عبد الزهرة",
    "normalized_name": "دلائل سعد عبد الزهره",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "رياضيات"
  },
  {
    "id": "lec-144",
    "full_name": "اشراق مرزة حسن",
    "normalized_name": "اشراق مرزه حسن",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "حاسبات"
  },
  {
    "id": "lec-145",
    "full_name": "هبة زهير",
    "normalized_name": "هبه زهير",
    "department": "كلية البوليتكنك",
    "email": "heba.abdalkareem@atu.edu.iq",
    "phone": "9647730085060",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-146",
    "full_name": "محمد مصدق شلاه",
    "normalized_name": "محمد مصدق شلاه",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-147",
    "full_name": "باسم جبار مجيد",
    "normalized_name": "باسم جبار مجيد",
    "department": "الأجهزة الطبية",
    "email": "basim.majeed@atu.edu.iq",
    "phone": "9647822285663",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-148",
    "full_name": "زيد علي حمود",
    "normalized_name": "زيد علي حمود",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-149",
    "full_name": "عبد الحسين عبد الزهرة",
    "normalized_name": "عبد الحسين عبد الزهره",
    "department": "كلية البوليتكنك",
    "email": "abdul.abd@atu.edu.iq",
    "phone": "9647888007744",
    "specialty": "هندسة كهرباء"
  },
  {
    "id": "lec-150",
    "full_name": "امير قصي عباس",
    "normalized_name": "امير قصي عباس",
    "department": "الأجهزة الطبية",
    "email": "ameer.abbas.iba1@atu.edu.iq",
    "phone": "9647728261076",
    "specialty": "علوم حياة"
  },
  {
    "id": "lec-151",
    "full_name": "غيث علي",
    "normalized_name": "غيث علي",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم حياة"
  },
  {
    "id": "lec-152",
    "full_name": "علي عبد الكريم",
    "normalized_name": "علي عبد الكريم",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم حياة"
  },
  {
    "id": "lec-153",
    "full_name": "بارق عبد اللطيف",
    "normalized_name": "بارق عبد اللطيف",
    "department": "الصيدلة",
    "email": "",
    "phone": "",
    "specialty": "طبي"
  },
  {
    "id": "lec-154",
    "full_name": "حسام عادل",
    "normalized_name": "حسام عادل",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم"
  },
  {
    "id": "lec-155",
    "full_name": "طيبة صالح",
    "normalized_name": "طيبه صالح",
    "department": "كلية البوليتكنك",
    "email": "teeba.kadhim.iba111@atu.edu.iq",
    "phone": "9647732616549",
    "specialty": "علوم"
  },
  {
    "id": "lec-156",
    "full_name": "حوراء صلاح",
    "normalized_name": "حوراء صلاح",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم"
  },
  {
    "id": "lec-157",
    "full_name": "خود عبد المجيد",
    "normalized_name": "خود عبد المجيد",
    "department": "الصيدلة",
    "email": "",
    "phone": "",
    "specialty": "طبي"
  },
  {
    "id": "lec-158",
    "full_name": "سيف أنور",
    "normalized_name": "سيف انور",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "طبي"
  },
  {
    "id": "lec-159",
    "full_name": "زينب عبودي عباس",
    "normalized_name": "زينب عبودي عباس",
    "department": "كلية البوليتكنك",
    "email": "zainab.abbas.iba114@atu.edu.iq",
    "phone": "9647816833294",
    "specialty": "علوم"
  },
  {
    "id": "lec-160",
    "full_name": "اقبال زهو",
    "normalized_name": "اقبال زهو",
    "department": "كلية البوليتكنك",
    "email": "iqbal.abed.iba@atu.edu.iq",
    "phone": "9647725247246",
    "specialty": "علوم"
  },
  {
    "id": "lec-161",
    "full_name": "حوراء احمد",
    "normalized_name": "حوراء احمد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "طبي"
  },
  {
    "id": "lec-162",
    "full_name": "هالة حسين",
    "normalized_name": "هاله حسين",
    "department": "كلية البوليتكنك",
    "email": "halahussein430@gmail.com",
    "phone": "9647800766228",
    "specialty": "طبي"
  },
  {
    "id": "lec-163",
    "full_name": "عبير فاضل",
    "normalized_name": "عبير فاضل",
    "department": "الصيدلة",
    "email": "",
    "phone": "",
    "specialty": "طبي"
  },
  {
    "id": "lec-164",
    "full_name": "مروة علي",
    "normalized_name": "مروه علي",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "طبي"
  },
  {
    "id": "lec-165",
    "full_name": "قصي جنابي",
    "normalized_name": "قصي جنابي",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "طبي"
  },
  {
    "id": "lec-166",
    "full_name": "وفاء محمد",
    "normalized_name": "وفاء محمد",
    "department": "الصيدلة",
    "email": "",
    "phone": "",
    "specialty": "هندسي"
  },
  {
    "id": "lec-167",
    "full_name": "هدى فلاح",
    "normalized_name": "هدي فلاح",
    "department": "كلية البوليتكنك",
    "email": "huda.falah@atu.edu.iq",
    "phone": "9647810965598",
    "specialty": "اللغة الإنكليزية"
  },
  {
    "id": "lec-168",
    "full_name": "خلود عبد المجيد",
    "normalized_name": "خلود عبد المجيد",
    "department": "كلية البوليتكنك",
    "email": "khuloodmajeed91@gmail.com",
    "phone": "9647814263880",
    "specialty": "طبي"
  },
  {
    "id": "lec-169",
    "full_name": "مريم صادق عيسى",
    "normalized_name": "مريم صادق عيسي",
    "department": "تمريض",
    "email": "",
    "phone": "",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-170",
    "full_name": "انتصار خليف فليفل",
    "normalized_name": "انتصار خليف فليفل",
    "department": "كلية البوليتكنك",
    "email": "intisar.khlaif@atu.edu.iq",
    "phone": "9647810060775",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-171",
    "full_name": "حنان سليم",
    "normalized_name": "حنان سليم",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-172",
    "full_name": "ياسر وسام عبد الزهراء",
    "normalized_name": "ياسر وسام عبد الزهراء",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم زراعية"
  },
  {
    "id": "lec-173",
    "full_name": "رباب عدنان حمزة",
    "normalized_name": "رباب عدنان حمزه",
    "department": "تمريض",
    "email": "",
    "phone": "",
    "specialty": "تشريح وانسجة"
  },
  {
    "id": "lec-174",
    "full_name": "نور محمد ابراهيم",
    "normalized_name": "نور محمد ابراهيم",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "اجنة"
  },
  {
    "id": "lec-175",
    "full_name": "محمد فارس",
    "normalized_name": "محمد فارس",
    "department": "تمريض",
    "email": "",
    "phone": "",
    "specialty": "حاسبات"
  },
  {
    "id": "lec-176",
    "full_name": "صلاح سعيد هاشم",
    "normalized_name": "صلاح سعيد هاشم",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "تمريض"
  },
  {
    "id": "lec-177",
    "full_name": "ليث عبد الامير",
    "normalized_name": "ليث عبد الامير",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "تمريض"
  },
  {
    "id": "lec-178",
    "full_name": "ايناس حيدر",
    "normalized_name": "ايناس حيدر",
    "department": "تمريض",
    "email": "",
    "phone": "",
    "specialty": "انكليزي"
  },
  {
    "id": "lec-179",
    "full_name": "نهى قاسم سهيل",
    "normalized_name": "نهي قاسم سهيل",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "انكليزي"
  },
  {
    "id": "lec-180",
    "full_name": "عواطف حميد",
    "normalized_name": "عواطف حميد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علم نفس"
  },
  {
    "id": "lec-181",
    "full_name": "سوسن حسن",
    "normalized_name": "سوسن حسن",
    "department": "تمريض",
    "email": "",
    "phone": "",
    "specialty": "كيمياء حياتية سريرية"
  },
  {
    "id": "lec-182",
    "full_name": "حسين عدنان حسين",
    "normalized_name": "حسين عدنان حسين",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "كيمياء حياتية"
  },
  {
    "id": "lec-183",
    "full_name": "عبير حسن",
    "normalized_name": "عبير حسن",
    "department": "كلية البوليتكنك",
    "email": "abbeer.madlom.iba104@atu.edu.iq",
    "phone": "9647738072261",
    "specialty": "كيمياء عضوية"
  },
  {
    "id": "lec-184",
    "full_name": "رؤى وهاب",
    "normalized_name": "رؤي وهاب",
    "department": "مختبرات طبية",
    "email": "roaa.mohammed@atu.edu.iq",
    "phone": "9647601017371",
    "specialty": "كيمياء"
  },
  {
    "id": "lec-185",
    "full_name": "وسام فارس",
    "normalized_name": "وسام فارس",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم حياة"
  },
  {
    "id": "lec-186",
    "full_name": "زينب ناصر نبات",
    "normalized_name": "زينب ناصر نبات",
    "department": "مختبرات طبية",
    "email": "zainab.nabat@atu.edu.iq",
    "phone": "9647831394533",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-187",
    "full_name": "مها حميد اسماعيل",
    "normalized_name": "مها حميد اسماعيل",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-188",
    "full_name": "مها عادل حسين",
    "normalized_name": "مها عادل حسين",
    "department": "كلية البوليتكنك",
    "email": "maha.hussain.iba100@atu.edu.iq",
    "phone": "9647800441299",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-189",
    "full_name": "حيدر حسين",
    "normalized_name": "حيدر حسين",
    "department": "مختبرات طبية",
    "email": "",
    "phone": "",
    "specialty": "طفيليات بيطرية"
  },
  {
    "id": "lec-190",
    "full_name": "سيف عبيد",
    "normalized_name": "سيف عبيد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "شبكات الحاسوب"
  },
  {
    "id": "lec-191",
    "full_name": "ود عبد الخالق عبد زيد",
    "normalized_name": "ود عبد الخالق عبد زيد",
    "department": "كلية البوليتكنك",
    "email": "wid.abdzaid@atu.edu.iq",
    "phone": "9647812044586",
    "specialty": "فسلجة دم"
  },
  {
    "id": "lec-192",
    "full_name": "علي موجد",
    "normalized_name": "علي موجد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "فسلجة طبية"
  },
  {
    "id": "lec-193",
    "full_name": "سارة عبد الكريم مخيف",
    "normalized_name": "ساره عبد الكريم مخيف",
    "department": "مختبرات طبية",
    "email": "sarah.mukheef@atu.edu.iq",
    "phone": "9647804734690",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-194",
    "full_name": "ايات رحيم خلف",
    "normalized_name": "ايات رحيم خلف",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-195",
    "full_name": "منى غافل",
    "normalized_name": "مني غافل",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم حياة"
  },
  {
    "id": "lec-196",
    "full_name": "سارة عبد الكريم",
    "normalized_name": "ساره عبد الكريم",
    "department": "كلية البوليتكنك",
    "email": "sarah.mukheef@atu.edu.iq",
    "phone": "9647804734690",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-197",
    "full_name": "انتصار مرزوك",
    "normalized_name": "انتصار مرزوك",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "فطريات"
  },
  {
    "id": "lec-198",
    "full_name": "سيف عبد حسين",
    "normalized_name": "سيف عبد حسين",
    "department": "مختبرات طبية",
    "email": "",
    "phone": "",
    "specialty": "الحاسبات"
  },
  {
    "id": "lec-199",
    "full_name": "رواء رحيم كريم",
    "normalized_name": "رواء رحيم كريم",
    "department": "كلية البوليتكنك",
    "email": "rawaa.raheem@atu.edu.iq",
    "phone": "9647711962186",
    "specialty": "كيمياء تحليلية"
  },
  {
    "id": "lec-200",
    "full_name": "ابتسام محمد حسين",
    "normalized_name": "ابتسام محمد حسين",
    "department": "صحة المجتمع",
    "email": "inb.ebts@atu.edu.iq",
    "phone": "9647831691033",
    "specialty": "مقاومة احيائية"
  },
  {
    "id": "lec-201",
    "full_name": "نجلاء جواد حساني",
    "normalized_name": "نجلاء جواد حساني",
    "department": "كلية البوليتكنك",
    "email": "najlaajawad66.iba@atu.edu.iq",
    "phone": "9647819426402",
    "specialty": "كيمياء"
  },
  {
    "id": "lec-202",
    "full_name": "حيدر فرحان عبد الله",
    "normalized_name": "حيدر فرحان عبد الله",
    "department": "كلية البوليتكنك",
    "email": "haider.abdullah.iba3@atu.edu.iq",
    "phone": "9647724202768",
    "specialty": "علوم بيئة"
  },
  {
    "id": "lec-203",
    "full_name": "بلال نجم عبد",
    "normalized_name": "بلال نجم عبد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "صحة المجتمع"
  },
  {
    "id": "lec-204",
    "full_name": "زينب كريم جواد",
    "normalized_name": "زينب كريم جواد",
    "department": "صحة المجتمع",
    "email": "inb.znb5@atu.edu.iq",
    "phone": "9647703452610",
    "specialty": "علوم حياة"
  },
  {
    "id": "lec-205",
    "full_name": "ميسون كوشي جاسم",
    "normalized_name": "ميسون كوشي جاسم",
    "department": "كلية البوليتكنك",
    "email": "maysoon.hussein.iba@atu.edu.iq",
    "phone": "",
    "specialty": "علوم حياة"
  },
  {
    "id": "lec-206",
    "full_name": "اسيل حافظ جواد",
    "normalized_name": "اسيل حافظ جواد",
    "department": "كلية البوليتكنك",
    "email": "aseel.abbod.iba@atu.edu.iq",
    "phone": "9647813437240",
    "specialty": "صحة المجتمع"
  },
  {
    "id": "lec-207",
    "full_name": "اياد عباس عناد",
    "normalized_name": "اياد عباس عناد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "صحة المجتمع"
  },
  {
    "id": "lec-208",
    "full_name": "دعاء حسن هادي",
    "normalized_name": "دعاء حسن هادي",
    "department": "صحة المجتمع",
    "email": "duaa.hadi.iba13@atu.edu.iq",
    "phone": "9647811146242",
    "specialty": "مناعة"
  },
  {
    "id": "lec-209",
    "full_name": "بلال عصام فاضل",
    "normalized_name": "بلال عصام فاضل",
    "department": "كلية البوليتكنك",
    "email": "isambilal090@gmail.com",
    "phone": "9647723767902",
    "specialty": "مناعة"
  },
  {
    "id": "lec-210",
    "full_name": "ايناس عباس خير الله",
    "normalized_name": "ايناس عباس خير الله",
    "department": "كلية البوليتكنك",
    "email": "inas.khairualla@atu.edu.iq",
    "phone": "",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-211",
    "full_name": "علي كريم حميد",
    "normalized_name": "علي كريم حميد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "فسلجة"
  },
  {
    "id": "lec-212",
    "full_name": "سالينا عبد العباس ناصر",
    "normalized_name": "سالينا عبد العباس ناصر",
    "department": "صحة المجتمع",
    "email": "dr.salina8@gmail.com",
    "phone": "9647819165118",
    "specialty": "فسلجة طبية"
  },
  {
    "id": "lec-213",
    "full_name": "علي سامر سليم",
    "normalized_name": "علي سامر سليم",
    "department": "كلية البوليتكنك",
    "email": "ali.selim.iba105@atu.edu.iq",
    "phone": "9647711112624",
    "specialty": "حاسبات"
  },
  {
    "id": "lec-214",
    "full_name": "سارة عبد الخالق",
    "normalized_name": "ساره عبد الخالق",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "فسلجة"
  },
  {
    "id": "lec-215",
    "full_name": "شهد سعد محمد",
    "normalized_name": "شهد سعد محمد",
    "department": "كلية البوليتكنك",
    "email": "shahadmostfa674@gmail.com",
    "phone": "9647814640434",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-216",
    "full_name": "سوزان راضي حسين",
    "normalized_name": "سوزان راضي حسين",
    "department": "كلية البوليتكنك",
    "email": "suzan.hussain.iba103@atu.edu.iq",
    "phone": "9647813961398",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-217",
    "full_name": "شيماء عبد الجبار",
    "normalized_name": "شيماء عبد الجبار",
    "department": "كلية البوليتكنك",
    "email": "shymaa.saeed@atu.edu.iq",
    "phone": "9647829304616",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-218",
    "full_name": "نائل عباس كاظم",
    "normalized_name": "نائل عباس كاظم",
    "department": "كلية البوليتكنك",
    "email": "naiel.alkhafaji@atu.edu.iq",
    "phone": "9647725660581",
    "specialty": "مناعة"
  },
  {
    "id": "lec-219",
    "full_name": "ثناء عبد المهدي",
    "normalized_name": "ثناء عبد المهدي",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "فسلجة"
  },
  {
    "id": "lec-220",
    "full_name": "شيماء طرام لفتة",
    "normalized_name": "شيماء طرام لفته",
    "department": "كلية البوليتكنك",
    "email": "sheimaa.lafta@atu.edu.iq",
    "phone": "9647738084100",
    "specialty": "دكتوراه قانون عام"
  },
  {
    "id": "lec-221",
    "full_name": "وفاء محمد طاهر",
    "normalized_name": "وفاء محمد طاهر",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "قانون عام"
  },
  {
    "id": "lec-222",
    "full_name": "عباس فخري عبد الامير",
    "normalized_name": "عباس فخري عبد الامير",
    "department": "ميكانيك",
    "email": "abbasfakhri83@gmail.com",
    "phone": "9647812023064",
    "specialty": "هندسة قدرة كهربائية"
  },
  {
    "id": "lec-223",
    "full_name": "طيبة صالح كاظم",
    "normalized_name": "طيبه صالح كاظم",
    "department": "الصيدلة",
    "email": "teeba.kadhim.iba111@atu.edu.iq",
    "phone": "9647732616549",
    "specialty": "علوم كيمياء"
  },
  {
    "id": "lec-224",
    "full_name": "حسام عادل محمد",
    "normalized_name": "حسام عادل محمد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم كيمياء"
  },
  {
    "id": "lec-225",
    "full_name": "حوراء صلاح مهدي",
    "normalized_name": "حوراء صلاح مهدي",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "علوم احياء"
  },
  {
    "id": "lec-226",
    "full_name": "بارق عبد اللطيف صبر",
    "normalized_name": "بارق عبد اللطيف صبر",
    "department": "الصيدلة",
    "email": "",
    "phone": "",
    "specialty": "احياء مجهرية طبية"
  },
  {
    "id": "lec-227",
    "full_name": "سيف انور جعفر",
    "normalized_name": "سيف انور جعفر",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-228",
    "full_name": "حوراء احمد علي",
    "normalized_name": "حوراء احمد علي",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-229",
    "full_name": "حوراء نعمة جاسم",
    "normalized_name": "حوراء نعمه جاسم",
    "department": "كلية البوليتكنك",
    "email": "hawraa.jasim.iba9@atu.edu.iq",
    "phone": "9647729288808",
    "specialty": "الكترونيك واتصالات"
  },
  {
    "id": "lec-230",
    "full_name": "احمد محمد علي علي",
    "normalized_name": "احمد محمد علي علي",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "الكترونيك واتصالات"
  },
  {
    "id": "lec-231",
    "full_name": "غيث علي عبد الرحيم",
    "normalized_name": "غيث علي عبد الرحيم",
    "department": "الاجهزة طبية",
    "email": "",
    "phone": "",
    "specialty": "هندسة كهربائية والكترونية"
  },
  {
    "id": "lec-232",
    "full_name": "سهاد داخل جعفر",
    "normalized_name": "سهاد داخل جعفر",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "محاسبة"
  },
  {
    "id": "lec-233",
    "full_name": "محمد ديكان عبد الامير",
    "normalized_name": "محمد ديكان عبد الامير",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "تدقيق"
  },
  {
    "id": "lec-234",
    "full_name": "حوراء كريم سليم",
    "normalized_name": "حوراء كريم سليم",
    "department": "المساحة",
    "email": "amzhrahwra30@gmail.com",
    "phone": "9647819471347",
    "specialty": "جغرافية بشرية"
  },
  {
    "id": "lec-235",
    "full_name": "الاء سهيل نجم",
    "normalized_name": "الاء سهيل نجم",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "مواد / سيراميك"
  },
  {
    "id": "lec-236",
    "full_name": "سارة يحيى حاتم",
    "normalized_name": "ساره يحيي حاتم",
    "department": "ميكانيك القدرة",
    "email": "sarah.assad@atu.edu.iq",
    "phone": "9647881184225",
    "specialty": "ميكانيك حراريات"
  },
  {
    "id": "lec-237",
    "full_name": "سارة سالم حسن",
    "normalized_name": "ساره سالم حسن",
    "department": "كلية البوليتكنك",
    "email": "sara.hassan.iba101@atu.edu.iq",
    "phone": "9647735722475",
    "specialty": "ميكانيك تطبيقي"
  },
  {
    "id": "lec-238",
    "full_name": "علاء حسين مجيد",
    "normalized_name": "علاء حسين مجيد",
    "department": "ميكانيك القدرة",
    "email": "",
    "phone": "",
    "specialty": "تبولوجيا ديناميكي"
  },
  {
    "id": "lec-239",
    "full_name": "عواطف حميد صالح",
    "normalized_name": "عواطف حميد صالح",
    "department": "التمريض",
    "email": "",
    "phone": "",
    "specialty": "علم نفس"
  },
  {
    "id": "lec-240",
    "full_name": "محمد فارس ناجي",
    "normalized_name": "محمد فارس ناجي",
    "department": "التمريض",
    "email": "",
    "phone": "",
    "specialty": "ماجستير حاسبات"
  },
  {
    "id": "lec-241",
    "full_name": "حيدر حسين عبيد",
    "normalized_name": "حيدر حسين عبيد",
    "department": "المختبرات الطبية",
    "email": "",
    "phone": "",
    "specialty": "طفيليات بيطرية"
  },
  {
    "id": "lec-242",
    "full_name": "انتصار مرزوك حسين",
    "normalized_name": "انتصار مرزوك حسين",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "مقاومة احيائية"
  },
  {
    "id": "lec-243",
    "full_name": "علي موجد فضيل",
    "normalized_name": "علي موجد فضيل",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "فسلجة طبية"
  },
  {
    "id": "lec-244",
    "full_name": "منى غافل عبد",
    "normalized_name": "مني غافل عبد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-245",
    "full_name": "وفاء محمد بريسم",
    "normalized_name": "وفاء محمد بريسم",
    "department": "الصيدلة",
    "email": "wafaa333mohammed@gmail.com",
    "phone": "9647816774691",
    "specialty": "علوم حاسبات"
  },
  {
    "id": "lec-246",
    "full_name": "اقبال زهو عبد",
    "normalized_name": "اقبال زهو عبد",
    "department": "كلية البوليتكنك",
    "email": "iqbal.abed.iba@atu.edu.iq",
    "phone": "9647725247246",
    "specialty": "زراعة"
  },
  {
    "id": "lec-247",
    "full_name": "هالة حسين عبد علي",
    "normalized_name": "هاله حسين عبد علي",
    "department": "كلية البوليتكنك",
    "email": "halahussein430@gmail.com",
    "phone": "9647800766228",
    "specialty": "احياء مجهرية"
  },
  {
    "id": "lec-248",
    "full_name": "عبير فاضل ابراهيم",
    "normalized_name": "عبير فاضل ابراهيم",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "ادوية وسموم"
  },
  {
    "id": "lec-249",
    "full_name": "اثير عسكر اسماعيل",
    "normalized_name": "اثير عسكر اسماعيل",
    "department": "كلية البوليتكنك",
    "email": "atheerasker@gmail.com",
    "phone": "9647805978091",
    "specialty": "تخطيط حضري"
  },
  {
    "id": "lec-250",
    "full_name": "محمد جاسم محمد",
    "normalized_name": "محمد جاسم محمد",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "هندسة الالكترونيك واتصالات"
  },
  {
    "id": "lec-251",
    "full_name": "نور عايد عبد الله",
    "normalized_name": "نور عايد عبد الله",
    "department": "الالكترونيك",
    "email": "noor.serkal.iba14@atu.edu.iq",
    "phone": "9647803557567",
    "specialty": "اللغة العربية"
  },
  {
    "id": "lec-252",
    "full_name": "بلقيس بشار جابر",
    "normalized_name": "بلقيس بشار جابر",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "اللغة العربية"
  },
  {
    "id": "lec-253",
    "full_name": "وفاء محمدرضا",
    "normalized_name": "وفاء محمدرضا",
    "department": "كلية البوليتكنك",
    "email": "inb.wfa@atu.edu.iq",
    "phone": "9647802428213",
    "specialty": "هندسة الكترونيات"
  },
  {
    "id": "lec-254",
    "full_name": "زينب صاحب",
    "normalized_name": "زينب صاحب",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": "برمجيات"
  },
  {
    "id": "lec-255",
    "full_name": "شيماء عبد الجبار سعيد",
    "normalized_name": "شيماء عبد الجبار سعيد",
    "department": "كلية البوليتكنك",
    "email": "shymaa.saeed@atu.edu.iq",
    "phone": "9647829304616",
    "specialty": "مقاومة احيائية"
  },
  {
    "id": "lec-256",
    "full_name": "ايناس عباس",
    "normalized_name": "ايناس عباس",
    "department": "كلية البوليتكنك",
    "email": "inas.khairualla@atu.edu.iq",
    "phone": "",
    "specialty": "صحة مجتمع"
  },
  {
    "id": "lec-257",
    "full_name": "ايناس عباس خيرالله",
    "normalized_name": "ايناس عباس خيرالله",
    "department": "قسم تقنيات صحة مجتمع",
    "email": "inas.khairualla@atu.edu.iq",
    "phone": "",
    "specialty": "احياء مجهريه طبيه"
  },
  {
    "id": "lec-258",
    "full_name": "دلائل سعد عبدالزهره",
    "normalized_name": "دلائل سعد عبدالزهره",
    "department": "الاجهزة الطبية",
    "email": "",
    "phone": "",
    "specialty": "رياضيات/ تشفير"
  },
  {
    "id": "lec-259",
    "full_name": "ود عبدالخالق عبدزيد",
    "normalized_name": "ود عبدالخالق عبدزيد",
    "department": "تقنيات المختبرات الطبية",
    "email": "wid.abdzaid@atu.edu.iq",
    "phone": "9647812044586",
    "specialty": "فسلجة دم"
  },
  {
    "id": "lec-260",
    "full_name": "سيف عبيد حسين",
    "normalized_name": "سيف عبيد حسين",
    "department": "تقنيات المختبرات الطبية",
    "email": "",
    "phone": "",
    "specialty": "هندسة حاسبات"
  },
  {
    "id": "lec-261",
    "full_name": "زينه صلاح حسن",
    "normalized_name": "زينه صلاح حسن",
    "department": "تقنيات ميكانيك القدرة",
    "email": "zinah.hasan@atu.edu.iq",
    "phone": "9647803865847",
    "specialty": "ماجستير هندسة القدرة الكهربائية"
  },
  {
    "id": "lec-262",
    "full_name": "ساره عبد الكريم مخيف",
    "normalized_name": "ساره عبد الكريم مخيف",
    "department": "تقنيات المختبرات الطبية",
    "email": "sarah.mukheef@atu.edu.iq",
    "phone": "9647804734690",
    "specialty": "دكتوراه احياء مجهرية"
  },
  {
    "id": "lec-263",
    "full_name": "علي جاسم عطيه لفته",
    "normalized_name": "علي جاسم عطيه لفته",
    "department": "تقنيات ميكانيك القدره",
    "email": "ali.atiyah.iba115@atu.edu.iq",
    "phone": "9647804643608",
    "specialty": "ماجستير هندسه ميكانيك تصميم تطبيقي"
  },
  {
    "id": "lec-264",
    "full_name": "نوال عبدالله عمران",
    "normalized_name": "نوال عبدالله عمران",
    "department": "تقنيات الميكانيك",
    "email": "nawal_omran@atu.edu.iq",
    "phone": "9647702684846",
    "specialty": "هندسة انتاج و مكائن والالات زراعية"
  },
  {
    "id": "lec-265",
    "full_name": "نجلاء شاكر عزيز",
    "normalized_name": "نجلاء شاكر عزيز",
    "department": "كلية البوليتكنك",
    "email": "najlaa.shemery@atu.edu.iq",
    "phone": "9647723128916",
    "specialty": ""
  },
  {
    "id": "lec-266",
    "full_name": "زهير حسن عبدالله",
    "normalized_name": "زهير حسن عبدالله",
    "department": "التقنيات الميكانيكية",
    "email": "",
    "phone": "",
    "specialty": "هندسة صناعية"
  },
  {
    "id": "lec-267",
    "full_name": "زيد خضر جاسم",
    "normalized_name": "زيد خضر جاسم",
    "department": "الاجهزة الطبية",
    "email": "zaid.bermany@atu.edu.iq",
    "phone": "9647730551186",
    "specialty": "القانون"
  },
  {
    "id": "lec-268",
    "full_name": "احمد محمدعلي علي",
    "normalized_name": "احمد محمدعلي علي",
    "department": "ميكانيك القدرة",
    "email": "",
    "phone": "",
    "specialty": "دكتوراه هندسة كهربائية والكترونية"
  },
  {
    "id": "lec-269",
    "full_name": "رؤى وهاب محمد",
    "normalized_name": "رؤي وهاب محمد",
    "department": "المختبرات الطبيه",
    "email": "roaa.mohammed@atu.edu.iq",
    "phone": "9647601017371",
    "specialty": "كيمياء عضويه"
  },
  {
    "id": "lec-270",
    "full_name": "سعد صلاح حميد",
    "normalized_name": "سعد صلاح حميد",
    "department": "الالكترونيك",
    "email": "",
    "phone": "",
    "specialty": "الكترونيك/اتصالات"
  },
  {
    "id": "lec-271",
    "full_name": "حميده مسلم عبدالحسين",
    "normalized_name": "حميده مسلم عبدالحسين",
    "department": "ميكانيك القدرة",
    "email": "hameedahmuslim@gmail.com",
    "phone": "9647708015920",
    "specialty": "هندسة تقنيات حراريات"
  },
  {
    "id": "lec-272",
    "full_name": "عمار علي عباس",
    "normalized_name": "عمار علي عباس",
    "department": "تقنيات الأجهزة الطبية",
    "email": "",
    "phone": "",
    "specialty": "ماجستير هندسة كهربائية"
  },
  {
    "id": "lec-273",
    "full_name": "حوان فاضل",
    "normalized_name": "حوان فاضل",
    "department": "كلية البوليتكنك",
    "email": "",
    "phone": "",
    "specialty": ""
  }
];

export const POLYTECHNIC_ALIASES = [];
