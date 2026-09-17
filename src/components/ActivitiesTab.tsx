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
  Users
} from 'lucide-react';
import { Activity, ActivityType, DateConflictItem } from '../types';
import { parseActivitiesExcel, downloadActivitiesTemplate } from '../lib/excelParser';
import { formatArabicDateWithDay } from '../lib/arabicUtils';

interface ActivitiesTabProps {
  activities: Activity[];
  conflicts: DateConflictItem[];
  onImportActivities: (imported: Activity[], newConflicts: DateConflictItem[]) => void;
  onAddActivity: (activity: Activity) => void;
  onUpdateActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
  onOpenConflicts: () => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({
  activities,
  conflicts,
  onImportActivities,
  onAddActivity,
  onUpdateActivity,
  onDeleteActivity,
  onOpenConflicts,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | ActivityType>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // حالة النافذة المنبثقة لإضافة / تعديل نشاط
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // استخراج قائمة الأقسام الفريدة للفلترة
  const departments = useMemo(() => {
    const set = new Set<string>();
    activities.forEach((a) => {
      if (a.department) set.add(a.department);
    });
    return Array.from(set);
  }, [activities]);

  // معالجة رفع ملف Excel
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage(null);

    try {
      const result = await parseActivitiesExcel(file);
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

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(query);
        const matchesLecturers = act.lecturers_raw.toLowerCase().includes(query);
        const matchesDept = act.department.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLecturers && !matchesDept) return false;
      }

      return true;
    });
  }, [activities, typeFilter, deptFilter, searchQuery]);

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
    const lecturers_raw = formData.get('lecturers_raw') as string;
    const start_date = formData.get('start_date') as string;
    const end_date = formData.get('end_date') as string || start_date;
    const location = formData.get('location') as string;
    const start_time = formData.get('start_time') as string;
    const duration = formData.get('duration') as string;
    const target_audience = formData.get('target_audience') as string;
    const notes = formData.get('notes') as string;

    if (editingActivity) {
      onUpdateActivity({
        ...editingActivity,
        type,
        title,
        department,
        lecturers_raw,
        start_date,
        end_date,
        location,
        start_time,
        duration,
        target_audience,
        notes,
      });
    } else {
      const newAct: Activity = {
        id: `act-${Date.now()}`,
        type,
        title,
        department,
        lecturers_raw,
        start_date,
        end_date,
        location,
        start_time,
        duration,
        target_audience,
        notes,
        date_fixed: false,
      };
      onAddActivity(newAct);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* قسم الاستيراد وتنزيل القالب */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-900" />
              استيراد دليل النشاطات العلمية (Excel)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              يدعم ورقتي «الدورات» و«الورش». يقوم النظام تلقائياً بتحديث السجلات وفحص التواريخ المعكوسة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={downloadActivitiesTemplate}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>تنزيل نموذج Excel فارغ</span>
            </button>

            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 cursor-pointer border border-blue-800/30">
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'جارٍ المعالجة...' : 'رفع ملف Excel'}</span>
              <input
                type="file"
                accept=".xlsx, .xls"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>

        {uploadMessage && (
          <div className={`mt-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
            uploadMessage.isError ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-blue-50 text-blue-900 border border-blue-200'
          }`}>
            {uploadMessage.isError ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
            <span>{uploadMessage.text}</span>
          </div>
        )}
      </div>

      {/* شريط تنبيه التعارضات إن وُجدت */}
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

      {/* شريط التصفية والبحث وإضافة نشاط */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          
          {/* البحث */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث بالعنوان، المحاضر، أو القسم..."
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
              الورش ({activities.filter(a => a.type === 'workshop').length})
            </button>
          </div>

          {/* تصفية القسم */}
          {departments.length > 0 && (
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none text-slate-700 cursor-pointer"
            >
              <option value="all">جميع الأقسام ({departments.length})</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          )}

        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 cursor-pointer shrink-0 border border-blue-800/30"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة نشاط يدوياً</span>
        </button>
      </div>

      {/* جدول الأنشطة */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-semibold">
                <th className="p-3.5">النوع</th>
                <th className="p-3.5">عنوان النشاط</th>
                <th className="p-3.5">القسم</th>
                <th className="p-3.5">المحاضر</th>
                <th className="p-3.5">التاريخ</th>
                <th className="p-3.5">المكان والوقت</th>
                <th className="p-3.5 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {filteredActivities.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                      act.type === 'course' ? 'bg-blue-50 text-blue-900 border border-blue-200/60' : 'bg-sky-50 text-sky-800 border border-sky-200/60'
                    }`}>
                      {act.type === 'course' ? 'دورة' : 'ورشة'}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 max-w-[280px]">
                    <div>{act.title}</div>
                    {act.notes && (
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">{act.notes}</div>
                    )}
                  </td>
                  <td className="p-3.5 text-slate-600 whitespace-nowrap">{act.department}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{act.lecturers_raw}</span>
                    </div>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="font-medium text-slate-900">
                      {formatArabicDateWithDay(act.start_date)}
                    </div>
                    {act.end_date && act.end_date !== act.start_date && (
                      <div className="text-[11px] text-slate-500">
                        إلى: {act.end_date.replace(/-/g, '/')}
                      </div>
                    )}
                  </td>
                  <td className="p-3.5 whitespace-nowrap text-slate-600">
                    <div>{act.location || '—'}</div>
                    <div className="text-[11px] text-slate-400">{act.start_time || '—'}</div>
                  </td>
                  <td className="p-3.5 text-center whitespace-nowrap">
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
              ))}

              {filteredActivities.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 text-sm">
                    لا توجد أنشطة تطابق معايير البحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* نافذة إضافة / تعديل نشاط */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in">
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
                  <label className="block text-slate-700 font-semibold mb-1">القسم العلمي *</label>
                  <input
                    type="text"
                    name="department"
                    required
                    defaultValue={editingActivity?.department || 'قسم هندسة تقنيات الحاسوب'}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
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

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  أسماء المحاضرين (افصل بينها بـ /) *
                </label>
                <input
                  type="text"
                  name="lecturers_raw"
                  required
                  defaultValue={editingActivity?.lecturers_raw || ''}
                  className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  placeholder="مثال: م.د. أحمد كاظم / م.م. سارة علي"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">تاريخ البدء *</label>
                  <input
                    type="date"
                    name="start_date"
                    required
                    defaultValue={editingActivity?.start_date || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">تاريخ الانتهاء</label>
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
                    placeholder="مثال: قاعة المؤتمرات 1"
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

    </div>
  );
};
