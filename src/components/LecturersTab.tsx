import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Upload, 
  Download, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Mail, 
  Phone, 
  Link as LinkIcon, 
  Check, 
  AlertCircle, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Lecturer, NameAlias, UnmatchedLecturer } from '../types';
import { parseLecturersExcel, downloadLecturersTemplate } from '../lib/excelParser';
import { normalizeArabic } from '../lib/arabicUtils';

interface LecturersTabProps {
  lecturers: Lecturer[];
  aliases: NameAlias[];
  unmatchedLecturers: UnmatchedLecturer[];
  onImportLecturers: (imported: Lecturer[]) => void;
  onAddLecturer: (lecturer: Lecturer) => void;
  onUpdateLecturer: (lecturer: Lecturer) => void;
  onDeleteLecturer: (id: string) => void;
  onBindAlias: (rawName: string, lecturerId: string) => void;
}

export const LecturersTab: React.FC<LecturersTabProps> = ({
  lecturers,
  aliases,
  unmatchedLecturers,
  onImportLecturers,
  onAddLecturer,
  onUpdateLecturer,
  onDeleteLecturer,
  onBindAlias,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'directory' | 'unmatched'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // حالة النافذة المنبثقة لإضافة / تعديل محاضر
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLecturer, setEditingLecturer] = useState<Lecturer | null>(null);

  // حالة البحث اليدوي للربط
  const [manualLinkQuery, setManualLinkQuery] = useState<Record<string, string>>({});

  // معالجة رفع ملف إكسل المحاضرين
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage(null);

    try {
      const result = await parseLecturersExcel(file);
      onImportLecturers(result.lecturers);

      let msg = `تم استيراد ${result.lecturers.length} محاضر بنجاح.`;
      if (result.duplicates.length > 0) {
        msg += ` (تم تخطي ${result.duplicates.length} بريد مكرر).`;
      }
      if (result.invalidEmails.length > 0) {
        msg += ` ⚠️ توجد ${result.invalidEmails.length} صيغة بريد غير صالحة.`;
      }

      setUploadMessage({ text: msg, isError: false });
    } catch (err: any) {
      console.error(err);
      setUploadMessage({ text: `فشل استيراد الملف: ${err.message || 'صيغة غير صالحة'}`, isError: true });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // تصفية المحاضرين
  const filteredLecturers = useMemo(() => {
    if (!searchQuery.trim()) return lecturers;
    const q = searchQuery.toLowerCase();
    return lecturers.filter(
      (l) =>
        l.full_name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.department.toLowerCase().includes(q) ||
        (l.title && l.title.toLowerCase().includes(q))
    );
  }, [lecturers, searchQuery]);

  const openAddModal = () => {
    setEditingLecturer(null);
    setIsModalOpen(true);
  };

  const openEditModal = (lec: Lecturer) => {
    setEditingLecturer(lec);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const full_name = (formData.get('full_name') as string).trim();
    const title = (formData.get('title') as string).trim();
    const department = (formData.get('department') as string).trim();
    const email = (formData.get('email') as string).trim().toLowerCase();
    const phone = (formData.get('phone') as string).trim();

    if (editingLecturer) {
      onUpdateLecturer({
        ...editingLecturer,
        full_name,
        normalized_name: normalizeArabic(full_name),
        title: title || undefined,
        department,
        email,
        phone: phone || undefined,
      });
    } else {
      const newLec: Lecturer = {
        id: `lec-${Date.now()}`,
        full_name,
        normalized_name: normalizeArabic(full_name),
        title: title || undefined,
        department,
        email,
        phone: phone || undefined,
      };
      onAddLecturer(newLec);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* الترويسة وأزرار الاستيراد والتصدير */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-900" />
              دليل البريد الإلكتروني للمحاضرين
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              يحتوي على قاعدة بيانات البريد الجامعي الرسمي واللقب العلمي والقسم لتوجيه التذكيرات بدقة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={downloadLecturersTemplate}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>تنزيل نموذج Excel فارغ</span>
            </button>

            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 cursor-pointer border border-blue-800/30">
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'جارٍ الاستيراد...' : 'رفع دليل المحاضرين Excel'}</span>
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
            {uploadMessage.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
            <span>{uploadMessage.text}</span>
          </div>
        )}
      </div>

      {/* التبويب الفرعي: الدليل الكامل / أسماء غير مطابقة */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveSubTab('directory')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'directory'
                ? 'bg-white text-blue-950 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            دليل المحاضرين المسجلين ({lecturers.length})
          </button>
          <button
            onClick={() => setActiveSubTab('unmatched')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'unmatched'
                ? 'bg-white text-rose-700 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>أسماء غير مطابقة (بلا بريد)</span>
            {unmatchedLecturers.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                {unmatchedLecturers.length}
              </span>
            )}
          </button>
        </div>

        {activeSubTab === 'directory' && (
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 cursor-pointer border border-blue-800/30"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة محاضر يدوياً</span>
          </button>
        )}
      </div>

      {/* المحتوى بحسب التبويب النشط */}
      {activeSubTab === 'directory' ? (
        <div className="space-y-4">
          
          {/* مربع البحث */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم، البريد الإلكتروني، أو القسم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* جدول المحاضرين */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="p-3.5">الاسم واللقب العلمي</th>
                    <th className="p-3.5">القسم</th>
                    <th className="p-3.5">البريد الإلكتروني</th>
                    <th className="p-3.5">رقم الهاتف</th>
                    <th className="p-3.5 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredLecturers.map((lec) => (
                    <tr key={lec.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                        {lec.title && (
                          <span className="text-blue-900 font-semibold ml-1.5">{lec.title}</span>
                        )}
                        {lec.full_name}
                      </td>
                      <td className="p-3.5 text-slate-600 whitespace-nowrap">{lec.department}</td>
                      <td className="p-3.5 whitespace-nowrap">
                        <a
                          href={`mailto:${lec.email}`}
                          className="font-mono text-blue-950 font-medium hover:text-blue-700 hover:underline flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{lec.email}</span>
                        </a>
                      </td>
                      <td className="p-3.5 text-slate-500 whitespace-nowrap">
                        {lec.phone ? (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span className="font-mono">{lec.phone}</span>
                          </span>
                        ) : '—'}
                      </td>
                      <td className="p-3.5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => openEditModal(lec)}
                            className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="تعديل المحاضر"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`هل أنت متأكد من حذف ${lec.full_name}؟`)) {
                                onDeleteLecturer(lec.id);
                              }
                            }}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="حذف المحاضر"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredLecturers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500 text-sm">
                        لا يوجد محاضرون مطابقون للبحث.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* شاشة الأسماء غير المطابقة والمطابقة الذكية */
        <div className="space-y-4">
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900">
            <h4 className="font-bold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-700" />
              المطابقة الذكية لأسماء المحاضرين
            </h4>
            <p className="leading-relaxed text-rose-800">
              تعرض هذه الشاشة الأسماء الواردة في دليل الأنشطة والتي لم يُعثر لها على بريد إلكتروني مباشر. 
              يقترح النظام الأسماء الأكثر شبهاً لغوياً مع نسبة التطابق. بمجرد ربط الاسم، سيحفظ النظام هذا الربط في جدول الأسماء البديلة (Aliases) ويستخدمه تلقائياً في كل المرات اللاحقة.
            </p>
          </div>

          {unmatchedLecturers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
              <CheckCircle2 className="w-12 h-12 text-blue-900 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">جميع الأسماء مطابقة بنجاح!</h3>
              <p className="text-xs text-slate-500 mt-1">
                تم العثور على بريد إلكتروني لكل محاضري الدورات والورش المسجلة في النظام.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {unmatchedLecturers.map((unmatched, idx) => {
                const manualQ = manualLinkQuery[unmatched.raw_name] || '';
                const filteredSearchLecturers = manualQ.trim()
                  ? lecturers.filter((l) => l.full_name.includes(manualQ) || l.email.includes(manualQ)).slice(0, 4)
                  : [];

                return (
                  <div
                    key={`${unmatched.raw_name}-${idx}`}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{unmatched.raw_name}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                            {unmatched.department}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          وارد في النشاط: <span className="font-medium text-slate-700">«{unmatched.activity_title}»</span>
                        </div>
                      </div>
                    </div>

                    {/* اقتراحات المطابقة الذكية */}
                    <div>
                      <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-900" />
                        <span>أقرب الأسماء المطابقة المقترحة آلياً:</span>
                      </div>

                      {unmatched.suggestions.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {unmatched.suggestions.map(({ lecturer, similarity }) => (
                            <div
                              key={lecturer.id}
                              className="border border-slate-200/90 hover:border-blue-500 rounded-xl p-3 bg-slate-50/50 hover:bg-blue-50/40 transition-colors flex flex-col justify-between gap-2"
                            >
                              <div>
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-slate-900 text-xs">{lecturer.full_name}</span>
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                    similarity >= 75 ? 'bg-blue-100 text-blue-950 font-bold' : 'bg-amber-100 text-amber-900'
                                  }`}>
                                    {similarity}% تطابق
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-500 font-mono mt-1 truncate" title={lecturer.email}>
                                  {lecturer.email}
                                </div>
                                <div className="text-[11px] text-slate-400 mt-0.5">{lecturer.department}</div>
                              </div>

                              <button
                                onClick={() => onBindAlias(unmatched.raw_name, lecturer.id)}
                                className="w-full mt-1 py-1.5 px-2 rounded-lg bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs border border-blue-800/30"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>تأكيد الربط وحفظ البديل</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl">
                          لا توجد اقتراحات قريبة بنسبة عالية. يمكنك البحث اليدوي أدناه لربطه.
                        </div>
                      )}
                    </div>

                    {/* خيار البحث اليدوي للربط بأي محاضر آخر */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 max-w-md">
                        <input
                          type="text"
                          placeholder="أو ابحث يدوياً في دليل المحاضرين لربطه..."
                          value={manualQ}
                          onChange={(e) =>
                            setManualLinkQuery((prev) => ({
                              ...prev,
                              [unmatched.raw_name]: e.target.value,
                            }))
                          }
                          className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      {filteredSearchLecturers.length > 0 && (
                        <div className="mt-2 space-y-1.5 max-w-md bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
                          {filteredSearchLecturers.map((lec) => (
                            <div
                              key={lec.id}
                              className="flex items-center justify-between text-xs p-1.5 hover:bg-slate-50 rounded-lg"
                            >
                              <div>
                                <span className="font-bold text-slate-800">{lec.full_name}</span>
                                <span className="text-slate-400 font-mono text-[11px] mr-2">({lec.email})</span>
                              </div>
                              <button
                                onClick={() => {
                                  onBindAlias(unmatched.raw_name, lec.id);
                                  setManualLinkQuery((prev) => ({ ...prev, [unmatched.raw_name]: '' }));
                                }}
                                className="px-2.5 py-1 rounded bg-blue-950 text-white text-[11px] font-bold hover:bg-blue-900 transition-colors cursor-pointer"
                              >
                                ربط
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* نافذة إضافة / تعديل محاضر */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingLecturer ? 'تعديل بيانات المحاضر' : 'إضافة محاضر جديد'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">الاسم الكامل *</label>
                <input
                  type="text"
                  name="full_name"
                  required
                  defaultValue={editingLecturer?.full_name || ''}
                  className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  placeholder="مثال: أحمد كاظم جواد"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">اللقب العلمي</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingLecturer?.title || ''}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                    placeholder="مثال: م.د. أو أ.د."
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">القسم العلمي *</label>
                  <input
                    type="text"
                    name="department"
                    required
                    defaultValue={editingLecturer?.department || 'قسم هندسة تقنيات الحاسوب'}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">البريد الإلكتروني الجامعي *</label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={editingLecturer?.email || ''}
                  className="w-full border border-slate-300 rounded-xl p-2 bg-white font-mono"
                  placeholder="username@atu.edu.iq"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">رقم الهاتف (اختياري)</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={editingLecturer?.phone || ''}
                  className="w-full border border-slate-300 rounded-xl p-2 bg-white font-mono"
                  placeholder="07701234567"
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
                  حفظ المحاضر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
