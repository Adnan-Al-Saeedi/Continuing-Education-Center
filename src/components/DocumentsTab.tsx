import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  AlertCircle,
  FileCheck2,
  Paperclip,
  Search,
  Filter,
  RotateCcw,
  AlertTriangle,
  X,
  CheckCircle2,
  FileCode,
  Globe
} from 'lucide-react';
import { DocumentItem, AppliesTo, DocumentKind } from '../types';

interface DocumentsTabProps {
  documents: DocumentItem[];
  onAddDocument: (doc: DocumentItem) => void;
  onUpdateDocument: (doc: DocumentItem) => void;
  onDeleteDocument: (id: string) => void;
  onResetDocuments?: () => void;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  onAddDocument,
  onUpdateDocument,
  onDeleteDocument,
  onResetDocuments,
}) => {
  // حالات النوافذ المنبثقة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);
  const [docToDelete, setDocToDelete] = useState<DocumentItem | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // حالات حقول النموذج
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formKind, setFormKind] = useState<DocumentKind>('link');
  const [formAppliesTo, setFormAppliesTo] = useState<AppliesTo>('both');
  const [formUrl, setFormUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // البحث والتصفية
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'courses' | 'workshops' | 'both'>('all');

  // حساب الحجم الكلي للملفات
  const totalSizeBytes = documents.reduce((acc, d) => acc + (d.file_size_bytes || 0), 0);
  const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);
  const isOver10MB = totalSizeBytes > 10 * 1024 * 1024;

  // فتح نافذة الإضافة
  const handleOpenAddModal = () => {
    setEditingDoc(null);
    setFormName('');
    setFormDescription('');
    setFormKind('link');
    setFormAppliesTo('both');
    setFormUrl('');
    setUploadedFile(null);
    setIsModalOpen(true);
  };

  // فتح نافذة التعديل مع تعبئة البيانات السابقة
  const handleOpenEditModal = (doc: DocumentItem) => {
    setEditingDoc(doc);
    setFormName(doc.name);
    setFormDescription(doc.description || '');
    setFormKind(doc.kind);
    setFormAppliesTo(doc.applies_to);
    setFormUrl(doc.url);
    setUploadedFile(null);
    setIsModalOpen(true);
  };

  // إغلاق نافذة الإضافة/التعديل
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDoc(null);
    setUploadedFile(null);
  };

  // معالجة حفظ النموذج (إضافة أو تعديل)
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = formName.trim();
    if (!name) return;

    let finalUrl = formUrl.trim();
    let fileSizeBytes = editingDoc ? (editingDoc.file_size_bytes || 0) : 0;

    if (formKind === 'file') {
      if (uploadedFile) {
        finalUrl = URL.createObjectURL(uploadedFile);
        fileSizeBytes = uploadedFile.size;
      } else if (!finalUrl) {
        finalUrl = 'https://drive.google.com/sample-file';
      }
    }

    if (editingDoc) {
      // تعديل نموذج حالي
      const updatedDoc: DocumentItem = {
        ...editingDoc,
        name,
        description: formDescription.trim() || undefined,
        kind: formKind,
        applies_to: formAppliesTo,
        url: finalUrl,
        file_size_bytes: fileSizeBytes,
      };
      onUpdateDocument(updatedDoc);
    } else {
      // إضافة نموذج جديد
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        name,
        description: formDescription.trim() || undefined,
        kind: formKind,
        applies_to: formAppliesTo,
        url: finalUrl,
        file_size_bytes: fileSizeBytes,
      };
      onAddDocument(newDoc);
    }

    handleCloseModal();
  };

  // تأكيد وتنفيذ الحذف بدون استخدام window.confirm
  const handleConfirmDelete = () => {
    if (docToDelete) {
      onDeleteDocument(docToDelete.id);
      setDocToDelete(null);
    }
  };

  // تصفية النماذج حسب البحث ونوع النشاط
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // تصفية حسب نوع النشاط
      if (filterType !== 'all') {
        if (doc.applies_to !== filterType && doc.applies_to !== 'both') {
          return false;
        }
      }

      // تصفية حسب نص البحث
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchName = doc.name.toLowerCase().includes(query);
        const matchDesc = (doc.description || '').toLowerCase().includes(query);
        const matchUrl = doc.url.toLowerCase().includes(query);
        return matchName || matchDesc || matchUrl;
      }

      return true;
    });
  }, [documents, filterType, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* بطاقة الشرح والإجراءات الرئيسية */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200/60">
            <FileCheck2 className="w-3.5 h-3.5 text-blue-900" />
            <span>إدارة وتخصيص الاستمارات الرسمية المرفقة</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-900" />
            النماذج والوثائق والاستمارات المطلوبة
          </h3>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            يتم تضمين هذه النماذج تلقائياً في نص رسائل التذكير الصادرة عبر البريد الإلكتروني والواتساب بحسب نوع نشاط المحاضر (دورة، ورشة، أو كلاهما). يمكنك إضافة وتعديل وحذف أي نموذج بحرية تامة.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {onResetDocuments && (
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all border border-slate-200 cursor-pointer"
              title="استعادة النماذج الرسمية الافتراضية الأربعة لكلية البوليتكنك"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span>استعادة النماذج الرسمية</span>
            </button>
          )}

          <button
            onClick={handleOpenAddModal}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 cursor-pointer border border-blue-800/30 active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة نموذج أو رابط جديد</span>
          </button>
        </div>
      </div>

      {/* شريط البحث وتصفية النماذج وإحصائيات الحجم */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* حقل البحث */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم أو الرابط أو الوصف..."
              className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* أزرار تصفية النوع */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              الكل ({documents.length})
            </button>
            <button
              onClick={() => setFilterType('courses')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterType === 'courses'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              للدورات ({documents.filter((d) => d.applies_to === 'courses' || d.applies_to === 'both').length})
            </button>
            <button
              onClick={() => setFilterType('workshops')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterType === 'workshops'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              للورش ({documents.filter((d) => d.applies_to === 'workshops' || d.applies_to === 'both').length})
            </button>
          </div>
        </div>

        {/* تنبيه حجم المرفقات الإجمالي */}
        <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
          isOver10MB ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-blue-50/70 border-blue-200/80 text-blue-950'
        }`}>
          <div className="flex items-center gap-2">
            {isOver10MB ? <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" /> : <Paperclip className="w-4 h-4 text-blue-900 shrink-0" />}
            <span>
              إجمالي حجم المرفقات المخزنة: <strong>{totalSizeMB} ميغابايت</strong>.
              {isOver10MB 
                ? ' تجاوز الحد الأقصى (10MB)، لذا ستُرسل كروابط سحابية آمنة في متن الرسالة لتجنب ارتداد البريد.' 
                : ' تُرسل الاستمارات المرفقة كروابط ومرفقات معتمدة بحسب إعدادات النظام.'}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-600 shrink-0">
            عدد النماذج: {filteredDocuments.length}
          </span>
        </div>
      </div>

      {/* شبكة بطاقات النماذج والاستمارات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-blue-500/70 hover:shadow-md transition-all group"
          >
            <div>
              {/* شارات نوع المورد والجمهور المستهدف */}
              <div className="flex items-center justify-between mb-3 gap-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] ${
                  doc.kind === 'file' 
                    ? 'bg-blue-50 text-blue-900 border border-blue-200/70' 
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {doc.kind === 'file' ? <Paperclip className="w-3 h-3 text-blue-800" /> : <Globe className="w-3 h-3 text-slate-600" />}
                  <span>{doc.kind === 'file' ? 'ملف مرفق' : 'رابط سحابي / استمارة'}</span>
                </span>

                <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                  doc.applies_to === 'courses'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                    : doc.applies_to === 'workshops'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                }`}>
                  {doc.applies_to === 'courses' ? 'للدورات التدريبية' : (doc.applies_to === 'workshops' ? 'لورش العمل' : 'مشترك (دورات + ورش)')}
                </span>
              </div>

              {/* اسم النموذج */}
              <h4 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug group-hover:text-blue-900 transition-colors">
                {doc.name}
              </h4>

              {/* وصف أو تعليمات الاستمارة */}
              {doc.description && (
                <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                  {doc.description}
                </p>
              )}

              {/* عرض مختصر للرابط */}
              <div className="text-[11px] font-mono text-slate-400 truncate mb-3 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                {doc.url}
              </div>
            </div>

            {/* شريط الإجراءات: فتح/معاينة + تعديل + حذف */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2 gap-2">
              <a
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 hover:underline cursor-pointer"
                title="فتح الرابط في نافذة جديدة"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>معاينة / فتح</span>
              </a>

              <div className="flex items-center gap-1">
                {/* زر التعديل المفعّل */}
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(doc)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                  title="تعديل بيانات النموذج"
                >
                  <Edit3 className="w-3.5 h-3.5 text-blue-900" />
                  <span>تعديل</span>
                </button>

                {/* زر الحذف المفعّل بنافذة تأكيد داخلية آمنة */}
                <button
                  type="button"
                  onClick={() => setDocToDelete(doc)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="حذف النموذج"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredDocuments.length === 0 && (
          <div className="col-span-full bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">
              {searchQuery || filterType !== 'all' ? 'لا توجد نتائج مطابقة لبحثك' : 'لا توجد نماذج مضافة حتى الآن'}
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {searchQuery || filterType !== 'all' 
                ? 'جرّب تغيير كلمات البحث أو إلغاء التصفية لإظهار كافة النماذج.' 
                : 'يمكنك إضافة النماذج والاستمارات الخاصة بالكلية أو استعادة النماذج الرسمية المعتمدة بضغطة زر.'}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-800 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة نموذج جديد</span>
              </button>
              {onResetDocuments && (
                <button
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>استعادة النماذج الرسمية</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* نافذة منبثقة موحدة لإضافة أو تعديل نموذج */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold">
                  {editingDoc ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {editingDoc ? 'تعديل النموذج أو الاستمارة الرسمية' : 'إضافة نموذج أو استمارة رسمية جديدة'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {editingDoc ? 'تحديث بيانات النموذج والرابط المعتمد للمحاضرين' : 'سيتم إدراج هذا النموذج تلقائياً في قوالب الإرسال'}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleCloseModal} 
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-4 text-xs">
              {/* اسم النموذج */}
              <div>
                <label className="block text-slate-800 font-bold mb-1.5">
                  اسم النموذج / الاستمارة <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  placeholder="مثال: استمارة المنهاج التدريبي وساعات المحاضرات"
                  className="w-full border border-slate-300 rounded-xl p-2.5 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 focus:outline-hidden"
                />
              </div>

              {/* الوصف أو التعليمات */}
              <div>
                <label className="block text-slate-800 font-bold mb-1.5">
                  الوصف أو التعليمات الموجهة للمحاضر
                </label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="مثال: تعبأ وتوقع من قبل المحاضر الأصيل قبل بدء الدورة"
                  className="w-full border border-slate-300 rounded-xl p-2.5 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 focus:outline-hidden"
                />
              </div>

              {/* نوع المورد والجمهور المستهدف */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 font-bold mb-1.5">
                    نوع المورد <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formKind}
                    onChange={(e) => setFormKind(e.target.value as DocumentKind)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 focus:outline-hidden"
                  >
                    <option value="link">رابط خارجي (Google Form / Drive / استمارة)</option>
                    <option value="file">ملف مرفق (PDF / Word / Excel)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1.5">
                    يُرسل إلى من؟ <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formAppliesTo}
                    onChange={(e) => setFormAppliesTo(e.target.value as AppliesTo)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 focus:outline-hidden"
                  >
                    <option value="both">كلاهما (الدورات التدريبية وورش العمل)</option>
                    <option value="courses">الدورات التدريبية فقط</option>
                    <option value="workshops">ورش العمل فقط</option>
                  </select>
                </div>
              </div>

              {/* الرابط أو رفع الملف */}
              {formKind === 'link' ? (
                <div>
                  <label className="block text-slate-800 font-bold mb-1.5">
                    رابط الاستمارة أو المستند (URL) <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      value={formUrl}
                      onChange={(e) => setFormUrl(e.target.value)}
                      required
                      placeholder="https://docs.google.com/forms/d/..."
                      className="w-full pl-3 pr-9 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-800 text-xs font-mono focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 focus:outline-hidden dir-ltr text-left"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    يمكنك وضع رابط Google Drive أو Google Forms أو استمارة رسمية من موقع الكلية.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-slate-800 font-bold mb-1.5">
                    اختر الملف المرفق (PDF, DOCX, XLSX) {editingDoc ? '(اختياري في حال التعديل)' : '*'}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.xlsx,.xls"
                    required={!editingDoc && !formUrl}
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-slate-50 text-slate-700 text-xs file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-900 file:text-white hover:file:bg-blue-800 cursor-pointer"
                  />
                  {formUrl && (
                    <div className="text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded-lg truncate">
                      الرابط الحالي: {formUrl}
                    </div>
                  )}
                </div>
              )}

              {/* أزرار الإجراءات */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-bold cursor-pointer shadow-md shadow-blue-950/15 border border-blue-800/30 transition-all active:scale-98"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingDoc ? 'حفظ التعديلات' : 'إضافة النموذج'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة تأكيد حذف النموذج المخصصة (تعمل 100% داخل iframe وبدون confirm) */}
      {docToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-rose-50/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-rose-700">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">تأكيد حذف النموذج</h3>
                  <p className="text-[11px] text-rose-700">عملية الحذف نهائية وتحدث فوراً</p>
                </div>
              </div>
              <button
                onClick={() => setDocToDelete(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                هل أنت متأكد من رغبتك في حذف هذا النموذج؟ لن يتم إرفاقه أو تضمين رابطه في رسائل التذكير المستقبلية للمحاضرين:
              </p>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-900 shrink-0" />
                  <span>{docToDelete.name}</span>
                </div>
                {docToDelete.description && (
                  <p className="text-[11px] text-slate-500 pr-5">
                    {docToDelete.description}
                  </p>
                )}
                <div className="text-[11px] font-mono text-slate-400 truncate pr-5">
                  {docToDelete.url}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setDocToDelete(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer transition-colors"
                >
                  إلغاء التراجع
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 cursor-pointer transition-all active:scale-98"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>نعم، حذف النموذج نهائياً</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تأكيد استعادة النماذج الرسمية الافتراضية */}
      {isResetConfirmOpen && onResetDocuments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-amber-50/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-amber-800">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">استعادة النماذج الرسمية الافتراضية</h3>
                  <p className="text-[11px] text-amber-700">إعادة تعيين قائمة الاستمارات</p>
                </div>
              </div>
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                سيتم استعادة النماذج والاستمارات الرسمية الأربعة المعتمدة لكلية البوليتكنك (أمر إداري، منهاج تدريبي، استمارة تقييم ورشة، واستمارة السيرة الذاتية). هل تود المتابعة؟
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onResetDocuments();
                    setIsResetConfirmOpen(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold shadow-md shadow-blue-950/20 cursor-pointer transition-all active:scale-98"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>تأكيد الاستعادة</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
