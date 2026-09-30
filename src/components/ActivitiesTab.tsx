import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  Clock, 
  Filter, 
  CheckCircle, 
  Users, 
  DollarSign, 
  Briefcase, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { Activity, ActivityType, DateConflictItem } from '../types';
import { 
  parseActivitiesExcel, 
  downloadActivitiesTemplate, 
  exportActivitiesToExcel 
} from '../lib/excelParser';
import { formatArabicDateWithDay } from '../lib/arabicUtils';
import { composeWhatsAppMessage } from '../lib/emailComposer';
import { DocumentItem, Settings } from '../types';

interface ActivitiesTabProps {
  activities: Activity[];
  conflicts: DateConflictItem[];
  settings?: Settings;
  documents?: DocumentItem[];
  dataSourceUrl?: string;
  lastSyncTime?: string;
  onImportActivities: (imported: Activity[], newConflicts: DateConflictItem[]) => void;
  onAddActivity: (activity: Activity) => void;
  onUpdateActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
  onClearAllActivities: () => void;
  onOpenConflicts: () => void;
  onUpdateDataSourceUrl?: (url: string) => void;
  onReloadPolytechnic?: () => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({
  activities,
  conflicts,
  settings,
  documents = [],
  dataSourceUrl = '',
  lastSyncTime,
  onImportActivities,
  onAddActivity,
  onUpdateActivity,
  onDeleteActivity,
  onClearAllActivities,
  onOpenConflicts,
  onUpdateDataSourceUrl,
  onReloadPolytechnic,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | ActivityType>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  
  // رفع ملف
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // حالة النافذة المنبثقة لإضافة / تعديل نشاط
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // حالة نافذة تأكيد حذف جميع النشاطات
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);

  // استخراج قائمة الأقسام الفريدة للفلترة
  const departments = useMemo(() => {
    const set = new Set<string>();
    activities.forEach((a) => {
      if (a.department) set.add(a.department);
    });
    return Array.from(set);
  }, [activities]);

  // استخراج قائمة التخصصات الفريدة
  const specialties = useMemo(() => {
    const set = new Set<string>();
    activities.forEach((a) => {
      if (a.specialty) set.add(a.specialty);
    });
    return Array.from(set);
  }, [activities]);

  // معالجة رفع ملف Excel محلي
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage(null);

    try {
      const result = await parseActivitiesExcel(file);
      if (result.activities.length === 0) {
        throw new Error('لم يتم العثور على أية أنشطة صالحة في الملف المرفوع. تأكد من احتواء الملف على أعمدة الأنشطة والعناوين.');
      }
      onImportActivities(result.activities, result.conflicts);

      const msg = `تم استيراد ${result.activities.length} نشاط بنجاح (${result.coursesCount} دورة، ${result.workshopsCount} ورشة).` +
        (result.conflicts.length > 0 ? ` ⚠️ تم رصد ${result.conflicts.length} دورة بتواريخ معكوسة.` : '');

      setUploadMessage({ text: msg, isError: false });
    } catch (err: any) {
      console.error(err);
      setUploadMessage({ text: `فشل استيراد الملف: ${err.message || 'صيغة غير صالحة'}`, isError: true });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // تصفية الأنشطة
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      if (typeFilter !== 'all' && act.type !== typeFilter) return false;
      if (deptFilter !== 'all' && act.department !== deptFilter) return false;
      if (specialtyFilter !== 'all' && act.specialty !== specialtyFilter) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(query);
        const matchesLecturers = act.lecturers_raw.toLowerCase().includes(query);
        const matchesDept = act.department.toLowerCase().includes(query);
        const matchesSpecialty = act.specialty ? act.specialty.toLowerCase().includes(query) : false;
        if (!matchesTitle && !matchesLecturers && !matchesDept && !matchesSpecialty) return false;
      }

      return true;
    });
  }, [activities, typeFilter, deptFilter, specialtyFilter, searchQuery]);

  const openAddModal = () => {
    setEditingActivity(null);
    setIsModalOpen(true);
  };

  const openEditModal = (act: Activity) => {
    setEditingActivity(act);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const type = formData.get('type') as ActivityType;
    const title = formData.get('title') as string;
    const department = formData.get('department') as string;
    const specialty = (formData.get('specialty') as string) || undefined;
    const lecturers_raw = formData.get('lecturers_raw') as string;
    const start_date = formData.get('start_date') as string;
    const end_date = formData.get('end_date') as string || start_date;
    const location = (formData.get('location') as string) || undefined;
    const start_time = (formData.get('start_time') as string) || undefined;
    const duration = (formData.get('duration') as string) || undefined;
    const cost = (formData.get('cost') as string) || undefined;
    const target_audience = (formData.get('target_audience') as string) || undefined;
    const notes = (formData.get('notes') as string) || undefined;

    const lecturer_name = (formData.get('lecturer_name') as string) || lecturers_raw;
    const lecturer_title = (formData.get('lecturer_title') as string) || undefined;
    const lecturer_email = (formData.get('lecturer_email') as string) || undefined;
    const lecturer_phone = (formData.get('lecturer_phone') as string) || undefined;

    if (editingActivity) {
      onUpdateActivity({
        ...editingActivity,
        type,
        title,
        department,
        specialty,
        lecturers_raw,
        start_date,
        end_date,
        location,
        start_time,
        duration,
        cost,
        target_audience,
        notes,
        lecturer_name,
        lecturer_title,
        lecturer_email,
        lecturer_phone,
      });
    } else {
      const newAct: Activity = {
        id: `act-${Date.now()}`,
        type,
        title,
        department,
        specialty,
        lecturers_raw,
        start_date,
        end_date,
        location,
        start_time,
        duration,
        cost,
        target_audience,
        notes,
        date_fixed: false,
        lecturer_name,
        lecturer_title,
        lecturer_email,
        lecturer_phone,
      };
      onAddActivity(newAct);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* قسم استيراد وتصدير ملفات Excel والقالب الرسمي */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-900" />
              استيراد أو تصدير ملف Excel محلي
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              يدعم ملفات (.xlsx, .xls, .csv). يقوم النظام تلقائياً برصد الدورات والورش والتخصصات وفحص التواريخ المعكوسة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onReloadPolytechnic && (
              <button
                onClick={onReloadPolytechnic}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer shrink-0"
                title="إعادة تحميل خطة كلية البوليتكنك - بابل 2026-2027 المدمجة"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-800" />
                <span>خطة كلية البوليتكنك الرسمية (2026-2027)</span>
              </button>
            )}

            <button
              onClick={() => exportActivitiesToExcel(activities)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
              title="تصدير الخطة الحالية إلى ملف Excel بالأعمدة المطابقة"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>تصدير الخطة إلى Excel ({activities.length})</span>
            </button>

            <button
              onClick={downloadActivitiesTemplate}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>تنزيل نموذج Excel فارغ</span>
            </button>

            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer border border-slate-800">
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'جارٍ المعالجة...' : 'رفع ملف Excel / CSV'}</span>
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>

        {uploadMessage && (
          <div className={`mt-4 p-3 rounded-2xl text-xs font-medium flex items-center gap-2 ${
            uploadMessage.isError ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-blue-50 text-blue-900 border border-blue-200'
          }`}>
            {uploadMessage.isError ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
            <span>{uploadMessage.text}</span>
          </div>
        )}
      </div>

      {/* 3. شريط تنبيه التعارضات إن وُجدت */}
      {conflicts.length > 0 && (
        <div className="bg-amber-50/90 border border-amber-300/90 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                يوجد {conflicts.length} دورة بتواريخ معكوسة تحتاج لمراجعتك
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                تاريخ البدء بعد تاريخ الانتهاء. يمكنك تبديل التاريخين تلقائياً أو تعديلها يدوياً.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenConflicts}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs font-bold hover:from-amber-500 hover:to-amber-600 transition-all cursor-pointer shadow-xs"
          >
            فتح شاشة المراجعة ({conflicts.length})
          </button>
        </div>
      )}

      {/* 4. شريط التصفية والبحث وإضافة نشاط وحذف الكل */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          
          {/* البحث */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث بالعنوان، المحاضر، القسم، أو التخصص..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* تصفية النوع */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                typeFilter === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              الكل ({activities.length})
            </button>
            <button
              onClick={() => setTypeFilter('course')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                typeFilter === 'course' ? 'bg-white text-blue-900 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              الدورات ({activities.filter(a => a.type === 'course').length})
            </button>
            <button
              onClick={() => setTypeFilter('workshop')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                typeFilter === 'workshop' ? 'bg-white text-sky-800 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              الورش والندوات ({activities.filter(a => a.type === 'workshop').length})
            </button>
          </div>

          {/* تصفية القسم */}
          {departments.length > 0 && (
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:bg-white"
            >
              <option value="all">كافة الأقسام ({departments.length})</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          )}

          {/* تصفية التخصص إن وجد */}
          {specialties.length > 0 && (
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:bg-white"
            >
              <option value="all">كافة التخصصات ({specialties.length})</option>
              {specialties.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}
        </div>

        {/* أزرار الإجراءات الرئيسية */}
        <div className="flex items-center gap-2">
          {/* زر حذف جميع النشاطات */}
          {activities.length > 0 && (
            <button
              type="button"
              id="delete-all-activities-btn"
              onClick={() => setIsDeleteAllModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/80 text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
              title="حذف كافة النشاطات الحالية من قاعدة البيانات"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>حذف الكل ({activities.length})</span>
            </button>
          )}

          {/* زر إضافة نشاط يدوياً */}
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 cursor-pointer shrink-0 border border-blue-800/30"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة نشاط يدوياً</span>
          </button>
        </div>
      </div>

      {/* 5. جدول عرض الأنشطة - مطابقة كاملة لعناوين أعمدة مصدر البيانات */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-3 bg-slate-50/70 border-b border-slate-200/80 flex items-center justify-between">
          <div className="text-xs text-slate-700 font-semibold flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>مطابقة تامة لعناوين الأعمدة وفق خطة كلية البوليتكنك الرسمية</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {filteredActivities.length} نشاط معروض
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 text-center whitespace-nowrap w-10">ت</th>
                <th className="p-3 whitespace-nowrap">نوع النشاط</th>
                <th className="p-3 whitespace-nowrap min-w-[200px]">عنوان النشاط</th>
                <th className="p-3 whitespace-nowrap">القسم</th>
                <th className="p-3 whitespace-nowrap">تخصص النشاط</th>
                <th className="p-3 text-center whitespace-nowrap">المدة (بالأيام)</th>
                <th className="p-3 text-center whitespace-nowrap">تكلفة النشاط</th>
                <th className="p-3 whitespace-nowrap">الفئة المستهدفة</th>
                <th className="p-3 whitespace-nowrap min-w-[170px]">اسم المحاضر</th>
                <th className="p-3 whitespace-nowrap min-w-[140px]">Whats APP</th>
                <th className="p-3 whitespace-nowrap min-w-[170px]">E.Mail</th>
                <th className="p-3 whitespace-nowrap min-w-[160px]">التخصّص الدقيق للمحاضر</th>
                <th className="p-3 whitespace-nowrap min-w-[130px]">تاريخ التنفيذ (من – الى)</th>
                <th className="p-3 text-center whitespace-nowrap w-16">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredActivities.map((act, index) => {
                const rawDuration = act.duration ? String(act.duration).replace(/[^0-9]/g, '') : (act.type === 'course' ? '5' : '1');
                const rawCost = act.cost || (act.type === 'course' ? '25000' : 'مجاني');
                const hasLecturerDetails = act.lecturers_details && act.lecturers_details.length > 0;

                return (
                  <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* 1. ت */}
                    <td className="p-3 text-center font-bold text-slate-600 bg-slate-50/50">
                      {act.seq || index + 1}
                    </td>

                    {/* 2. نوع النشاط */}
                    <td className="p-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        act.type === 'course' 
                          ? 'bg-blue-50 text-blue-900 border border-blue-200/60' 
                          : 'bg-sky-50 text-sky-900 border border-sky-200/60'
                      }`}>
                        {act.raw_type || (act.type === 'course' ? 'دورة' : 'ورشة عمل')}
                      </span>
                    </td>

                    {/* 3. عنوان النشاط */}
                    <td className="p-3 font-bold text-slate-900">
                      <div className="leading-snug">{act.title}</div>
                      {act.notes && (
                        <div className="text-[11px] text-slate-500 font-normal mt-0.5">{act.notes}</div>
                      )}
                    </td>

                    {/* 4. القسم */}
                    <td className="p-3 text-slate-700 whitespace-nowrap font-medium">
                      {act.department}
                    </td>

                    {/* 5. تخصص النشاط */}
                    <td className="p-3 whitespace-nowrap">
                      {act.specialty ? (
                        <span className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded bg-slate-100 text-slate-700">
                          {act.specialty}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* 6. المدة (بالأيام) */}
                    <td className="p-3 text-center whitespace-nowrap font-mono font-semibold text-slate-700">
                      {rawDuration}
                    </td>

                    {/* 7. تكلفة النشاط */}
                    <td className="p-3 text-center whitespace-nowrap font-semibold">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] ${
                        rawCost === 'مجاني' 
                          ? 'bg-slate-100 text-slate-700' 
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                      }`}>
                        {rawCost}
                      </span>
                    </td>

                    {/* 8. الفئة المستهدفة */}
                    <td className="p-3 text-slate-700 whitespace-nowrap text-[11px]">
                      {act.target_audience || 'موظفين+تدريسيين'}
                    </td>

                    {/* 9. اسم المحاضر */}
                    <td className="p-3">
                      {hasLecturerDetails ? (
                        <div className="space-y-1.5">
                          {act.lecturers_details!.map((lec, lIdx) => (
                            <div key={lIdx} className="flex items-center gap-1.5 text-slate-800 font-medium">
                              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className={lIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-700'}>
                                {lec.name}
                              </span>
                              {lIdx === 0 && act.lecturers_details!.length > 1 && (
                                <span className="text-[9px] px-1 py-0.2 rounded bg-blue-100 text-blue-800 font-bold">الأصيل</span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{act.lecturer_name || act.lecturers_raw}</span>
                        </div>
                      )}
                    </td>

                    {/* 10. Whats APP */}
                    <td className="p-3">
                      {hasLecturerDetails ? (
                        <div className="space-y-1.5">
                          {act.lecturers_details!.map((lec, lIdx) => {
                            const phone = lec.phone || (lIdx === 0 ? act.lecturer_phone : '');
                            if (!phone) return <div key={lIdx} className="text-slate-400 text-[11px]">—</div>;
                            return (
                              <div key={lIdx} className="flex items-center gap-1.5">
                                <span className="font-mono text-slate-700 text-[11px]" dir="ltr">
                                  {phone}
                                </span>
                                {settings?.whatsapp_enabled && (
                                  <a
                                    href={composeWhatsAppMessage(
                                      act,
                                      lec.name,
                                      lec.specialty || act.lecturer_title,
                                      phone,
                                      settings,
                                      documents
                                    ).whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold transition-all shadow-2xs"
                                    title={`إرسال تذكير واتساب إلى ${lec.name}`}
                                  >
                                    <span>💬</span>
                                  </a>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : act.lecturer_phone ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-slate-700 text-[11px]" dir="ltr">
                            {act.lecturer_phone}
                          </span>
                          {settings?.whatsapp_enabled && (
                            <a
                              href={composeWhatsAppMessage(
                                act,
                                act.lecturer_name || act.lecturers_raw,
                                act.lecturer_title,
                                act.lecturer_phone,
                                settings,
                                documents
                              ).whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold transition-all shadow-2xs"
                              title="إرسال تذكير واتساب"
                            >
                              <span>💬</span>
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* 11. E.Mail */}
                    <td className="p-3">
                      {hasLecturerDetails ? (
                        <div className="space-y-1.5">
                          {act.lecturers_details!.map((lec, lIdx) => {
                            const email = lec.email || (lIdx === 0 ? act.lecturer_email : '');
                            if (!email) return <div key={lIdx} className="text-slate-400 text-[11px]">—</div>;
                            return (
                              <div key={lIdx} className="text-[11px] text-blue-700 font-mono" dir="ltr">
                                <a href={`mailto:${email}`} className="hover:underline">
                                  {email}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      ) : act.lecturer_email ? (
                        <div className="text-[11px] text-blue-700 font-mono" dir="ltr">
                          <a href={`mailto:${act.lecturer_email}`} className="hover:underline">
                            {act.lecturer_email}
                          </a>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* 12. التخصّص الدقيق للمحاضر */}
                    <td className="p-3 text-slate-700 text-[11px]">
                      {hasLecturerDetails ? (
                        <div className="space-y-1.5">
                          {act.lecturers_details!.map((lec, lIdx) => (
                            <div key={lIdx} className="truncate max-w-[180px]" title={lec.specialty || '—'}>
                              {lec.specialty || '—'}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="truncate max-w-[180px] block" title={act.lecturer_title || '—'}>
                          {act.lecturer_title || '—'}
                        </span>
                      )}
                    </td>

                    {/* 13. تاريخ التنفيذ (من – الى) */}
                    <td className="p-3 whitespace-nowrap text-[11px]">
                      <div className="font-semibold text-slate-900 font-mono" dir="ltr">
                        {act.start_date ? act.start_date.replace(/-/g, '/') : '—'}
                      </div>
                      {act.end_date && act.end_date !== act.start_date && (
                        <div className="text-slate-500 font-mono mt-0.5" dir="ltr">
                          {act.end_date.replace(/-/g, '/')}
                        </div>
                      )}
                    </td>

                    {/* 14. الإجراءات */}
                    <td className="p-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openEditModal(act)}
                          className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="تعديل النشاط"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`هل أنت متأكد من حذف نشاط «${act.title}»؟`)) {
                              onDeleteActivity(act.id);
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="حذف النشاط"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredActivities.length === 0 && (
                <tr>
                  <td colSpan={14} className="p-8 text-center text-slate-500 text-sm">
                    لا توجد أنشطة تطابق معايير البحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. نافذة إضافة / تعديل نشاط */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingActivity ? 'تعديل بيانات النشاط' : 'إضافة نشاط علمي جديد'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">نوع النشاط *</label>
                  <select
                    name="type"
                    defaultValue={editingActivity?.type || 'course'}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  >
                    <option value="course">دورة تدريبية</option>
                    <option value="workshop">ورشة عمل</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">القسم *</label>
                  <input
                    type="text"
                    name="department"
                    required
                    defaultValue={editingActivity?.department || 'قسم تقنيات الحاسوب ونظم المعلومات'}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                    placeholder="مثال: ميكانيك، كهرباء، إلكترونيك"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">عنوان النشاط *</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingActivity?.title || ''}
                  className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  placeholder="مثال: تطبيقات الذكاء الاصطناعي في التعليم..."
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">تخصص النشاط</label>
                  <input
                    type="text"
                    name="specialty"
                    defaultValue={editingActivity?.specialty || ''}
                    placeholder="مثال: هندسي، علمي، إداري"
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">المدة (بالأيام)</label>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={editingActivity?.duration || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                    placeholder="5 أو 3 أو 1"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">تكلفة النشاط</label>
                  <input
                    type="text"
                    name="cost"
                    defaultValue={editingActivity?.cost || ''}
                    placeholder="25000 أو مجاني"
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">الفئة المستهدفة</label>
                <input
                  type="text"
                  name="target_audience"
                  defaultValue={editingActivity?.target_audience || ''}
                  className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  placeholder="موظفين+تدريسيين"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">اسم المحاضر *</label>
                  <input
                    type="text"
                    name="lecturer_name"
                    required
                    defaultValue={editingActivity?.lecturer_name || editingActivity?.lecturers_raw || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                    placeholder="مثال: محمد نوري سعيد"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">التخصّص الدقيق للمحاضر</label>
                  <input
                    type="text"
                    name="lecturer_title"
                    defaultValue={editingActivity?.lecturer_title || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                    placeholder="مثال: هندسة ميكانيك / حراريات"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Whats APP (رقم الهاتف)</label>
                  <input
                    type="tel"
                    name="lecturer_phone"
                    defaultValue={editingActivity?.lecturer_phone || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white font-mono"
                    placeholder="9647701234567"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">E.Mail (البريد الإلكتروني)</label>
                  <input
                    type="email"
                    name="lecturer_email"
                    defaultValue={editingActivity?.lecturer_email || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white font-mono"
                    placeholder="name@atu.edu.iq"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  المحاضرون المشاركون (إن وجدوا)
                </label>
                <input
                  type="text"
                  name="lecturers_raw"
                  defaultValue={editingActivity?.lecturers_raw || ''}
                  className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  placeholder="مثال: مالك عبد الحسين محسن / زهرة حمود جلهام"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">تاريخ التنفيذ (من) *</label>
                  <input
                    type="date"
                    name="start_date"
                    required
                    defaultValue={editingActivity?.start_date || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">تاريخ التنفيذ (الى)</label>
                  <input
                    type="date"
                    name="end_date"
                    defaultValue={editingActivity?.end_date || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">المكان / القاعة</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={editingActivity?.location || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                    placeholder="مثال: قاعة المؤتمرات الكبرى"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">الوقت</label>
                  <input
                    type="text"
                    name="start_time"
                    defaultValue={editingActivity?.start_time || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                    placeholder="مثال: 10:00 صباحاً"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">المدة</label>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={editingActivity?.duration || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                    placeholder="مثال: 5 أيام أو يوم واحد"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">الفئة المستهدفة</label>
                  <input
                    type="text"
                    name="target_audience"
                    defaultValue={editingActivity?.target_audience || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                    placeholder="التدريسيون والباحثون"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">ملاحظات إضافية</label>
                <textarea
                  name="notes"
                  rows={2}
                  defaultValue={editingActivity?.notes || ''}
                  className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-bold cursor-pointer shadow-md shadow-blue-950/15 border border-blue-800/30"
                >
                  حفظ النشاط
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. نافذة تأكيد حذف جميع النشاطات */}
      {isDeleteAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 shadow-inner">
                <Trash2 className="w-7 h-7 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                حذف جميع النشاطات المسجلة
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                هل أنت متأكد من رغبتك في حذف كافة النشاطات ({activities.length} نشاط)؟ 
                سيتم مسح جميع سجلات الدورات وورش العمل نهائياً من قاعدة البيانات المحلية، ولن تتمكن من استرجاعها إلا بإعادة استيرادها مجدداً من الرابط أو ملف Excel.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeleteAllModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  id="confirm-delete-all-btn"
                  onClick={() => {
                    onClearAllActivities();
                    setIsDeleteAllModalOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all cursor-pointer border border-rose-700"
                >
                  نعم، حذف الكل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
