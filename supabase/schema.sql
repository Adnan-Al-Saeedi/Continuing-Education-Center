-- ==============================================================================
-- مخطط قاعدة بيانات: المساعد الرقمي لمركز التعليم المستمر
-- Digital Assistant for Continuing Education Center Database Schema
-- ==============================================================================

-- تفعيل ملحقات UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. جدول قفل تسجيل المسؤول (لضمان وجود مسؤول واحد فقط)
CREATE TABLE IF NOT EXISTS public.admin_lock (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT single_admin_unique UNIQUE (email)
);

-- 2. جدول الإعدادات العامة (صف واحد فقط)
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university_name TEXT NOT NULL DEFAULT 'جامعة الفرات الأوسط التقنية',
    college_name TEXT NOT NULL DEFAULT 'الكلية التقنية الهندسية',
    center_name TEXT NOT NULL DEFAULT 'مركز التعليم المستمر',
    logo_url TEXT,
    sender_name TEXT NOT NULL DEFAULT 'مركز التعليم المستمر',
    reply_to TEXT NOT NULL DEFAULT 'continuing.edu@atu.edu.iq',
    days_before INTEGER NOT NULL DEFAULT 7,
    second_reminder BOOLEAN NOT NULL DEFAULT FALSE,
    second_reminder_days INTEGER NOT NULL DEFAULT 1,
    admin_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. جدول المحاضرين (دليل البريد الإلكتروني)
CREATE TABLE IF NOT EXISTS public.lecturers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    normalized_name TEXT NOT NULL,
    title TEXT, -- أ.د.، أ.م.د.، م.د.، م.م.، الخ
    department TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_lecturers_normalized_name ON public.lecturers(normalized_name);
CREATE INDEX IF NOT EXISTS idx_lecturers_email ON public.lecturers(email);

-- 4. جدول النشاطات العلمية (الدورات والورش)
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('course', 'workshop')), -- course = دورة, workshop = ورشة
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    lecturers_raw TEXT NOT NULL, -- النص الأصلي لأسماء المحاضرين كما ورد في الإكسل
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    location TEXT, -- القاعة أو المكان
    start_time TEXT, -- وقت البدء (مثال: 10:00 صباحاً)
    duration TEXT, -- المدة
    target_audience TEXT, -- الفئة المستهدفة
    notes TEXT,
    date_fixed BOOLEAN NOT NULL DEFAULT FALSE, -- هل تم تصحيح التاريخ المعكوس
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_activity_entry UNIQUE (type, title, start_date)
);
CREATE INDEX IF NOT EXISTS idx_activities_start_date ON public.activities(start_date);
CREATE INDEX IF NOT EXISTS idx_activities_type ON public.activities(type);

-- 5. جدول ربط النشاط بالمحاضرين
CREATE TABLE IF NOT EXISTS public.activity_lecturers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    lecturer_id UUID REFERENCES public.lecturers(id) ON DELETE SET NULL,
    raw_name TEXT NOT NULL, -- اسم المحاضر المفرد كما استُخرج من النص
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_activity_lecturer_pair UNIQUE (activity_id, raw_name)
);

-- 6. جدول الأسماء البديلة (لحفظ الربط اليدوي بين الاسم في النشاط والدليل)
CREATE TABLE IF NOT EXISTS public.name_aliases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    raw_name TEXT NOT NULL UNIQUE,
    lecturer_id UUID NOT NULL REFERENCES public.lecturers(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. جدول النماذج والوثائق
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    kind TEXT NOT NULL CHECK (kind IN ('file', 'link')), -- file أو link
    url TEXT NOT NULL,
    storage_path TEXT,
    file_size_bytes BIGINT DEFAULT 0,
    applies_to TEXT NOT NULL DEFAULT 'both' CHECK (applies_to IN ('courses', 'workshops', 'both')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. جدول قالب البريد الإلكتروني
CREATE TABLE IF NOT EXISTS public.email_template (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject TEXT NOT NULL DEFAULT 'تذكير: {{نوع_النشاط}} «{{عنوان_النشاط}}» بتاريخ {{تاريخ_البدء}}',
    body_html TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. جدول سجل الإرسال لمنع التكرار والمتابعة
CREATE TABLE IF NOT EXISTS public.send_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    lecturer_id UUID REFERENCES public.lecturers(id) ON DELETE SET NULL,
    recipient_name TEXT NOT NULL,
    email TEXT NOT NULL,
    reminder_type TEXT NOT NULL DEFAULT 'first' CHECK (reminder_type IN ('first', 'second', 'manual')),
    status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'pending')),
    error TEXT,
    attempts INTEGER NOT NULL DEFAULT 1,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_send_per_activity_lecturer UNIQUE (activity_id, lecturer_id, reminder_type)
);
CREATE INDEX IF NOT EXISTS idx_send_log_sent_at ON public.send_log(sent_at);
CREATE INDEX IF NOT EXISTS idx_send_log_status ON public.send_log(status);

-- ==============================================================================
-- سياسات الأمان (Row Level Security - RLS)
-- ==============================================================================

ALTER TABLE public.admin_lock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lecturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_lecturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.name_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_template ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.send_log ENABLE ROW LEVEL SECURITY;

-- دوال مساعدة للتحقق من هوية المسؤول المسجّل
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_lock WHERE admin_user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- سياسات الجداول: السماح بالقراءة والتعديل فقط للمسؤول المسجل
CREATE POLICY "Admin full access on settings" ON public.settings
    FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin full access on lecturers" ON public.lecturers
    FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin full access on activities" ON public.activities
    FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin full access on activity_lecturers" ON public.activity_lecturers
    FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin full access on name_aliases" ON public.name_aliases
    FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin full access on documents" ON public.documents
    FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin full access on email_template" ON public.email_template
    FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin full access on send_log" ON public.send_log
    FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

-- جدول admin_lock: يُسمح لأول مستخدم فقط بالتسجيل، ويُقفل بعدها
CREATE POLICY "Allow first user registration in admin_lock" ON public.admin_lock
    FOR INSERT TO authenticated
    WITH CHECK (
        (SELECT count(*) FROM public.admin_lock) = 0
        AND auth.uid() = admin_user_id
    );

CREATE POLICY "Admin read admin_lock" ON public.admin_lock
    FOR SELECT TO authenticated
    USING (admin_user_id = auth.uid());

-- Trigger لمنع إنشاء أكثر من حساب مسؤول في قاعدة البيانات قطعياً
CREATE OR REPLACE FUNCTION public.check_single_admin_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT count(*) FROM public.admin_lock) >= 1 THEN
        RAISE EXCEPTION 'التسجيل مغلق: يوجد مسؤول نظام مسجل مسبقاً ولا يُسمح بإنشاء حساب ثانٍ.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_single_admin
BEFORE INSERT ON public.admin_lock
FOR EACH ROW EXECUTE FUNCTION public.check_single_admin_trigger();

-- إدخال إعدادات وقالب بريد افتراضي
INSERT INTO public.settings (university_name, college_name, center_name, sender_name, reply_to, days_before)
SELECT 'جامعة الفرات الأوسط التقنية', 'الكلية التقنية الهندسية', 'مركز التعليم المستمر', 'مركز التعليم المستمر', 'continuing.edu@atu.edu.iq', 7
WHERE NOT EXISTS (SELECT 1 FROM public.settings);

INSERT INTO public.email_template (subject, body_html)
SELECT 
    'تذكير: {{نوع_النشاط}} «{{عنوان_النشاط}}» بتاريخ {{تاريخ_البدء}}',
    '<div dir="rtl" style="font-family: Arial, Tahoma, sans-serif; line-height: 1.8; color: #1e293b; max-width: 650px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
      <!-- الترويسة -->
      <div style="background: linear-gradient(135deg, #047857 0%, #065f46 100%); color: #ffffff; padding: 24px; text-align: center;">
        <h2 style="margin: 0; font-size: 20px; font-weight: bold;">{{اسم_الجامعة}}</h2>
        <h3 style="margin: 4px 0 0 0; font-size: 17px; font-weight: normal; opacity: 0.95;">{{اسم_الكلية}} - {{اسم_المركز}}</h3>
      </div>

      <!-- نص التحية -->
      <div style="padding: 24px;">
        <p style="font-size: 16px; margin: 0 0 16px 0;">
          تحية طيبة سعادة <strong>{{اللقب}} {{اسم_المحاضر}}</strong> المحترم،
        </p>
        <p style="font-size: 15px; color: #334155; margin: 0 0 20px 0;">
          نود تذكيركم بموعد إقامة <strong>{{نوع_النشاط}}</strong> الموسوم:
        </p>

        <!-- صندوق تفاصيل النشاط -->
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

        <!-- النماذج والوثائق المطلوبة -->
        <div style="margin-bottom: 24px;">
          <h4 style="margin: 0 0 10px 0; font-size: 15px; color: #0f172a;">📋 النماذج والوثائق المطلوب إكمالها:</h4>
          {{قائمة_النماذج}}
        </div>

        <p style="font-size: 14px; color: #475569; margin: 0 0 20px 0;">
          نرجو من سيادتكم الاطلاع وتجهيز المتطلبات في الموعد المحدد لضمان انسيابية العمل وتوثيق النشاط بالشكل الأصولي.
        </p>

        <!-- التوقيع -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 14px; color: #334155;">
          <p style="margin: 0; font-weight: bold;">مع التقدير والاعتزاز،</p>
          <p style="margin: 4px 0 0 0; color: #065f46; font-weight: bold;">إدارة {{اسم_المركز}}</p>
          <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748b;">{{اسم_الكلية}} - {{اسم_الجامعة}}</p>
        </div>
      </div>
    </div>'
WHERE NOT EXISTS (SELECT 1 FROM public.email_template);
