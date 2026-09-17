import React, { useState } from 'react';
import { 
  FileText, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  ExternalLink, 
  UploadCloud, 
  AlertCircle,
  FileCheck2,
  Paperclip
} from 'lucide-react';
import { DocumentItem, AppliesTo, DocumentKind } from '../types';

interface DocumentsTabProps {
  documents: DocumentItem[];
  onAddDocument: (doc: DocumentItem) => void;
  onDeleteDocument: (id: string) => void;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  onAddDocument,
  onDeleteDocument,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docKind, setDocKind] = useState<DocumentKind>('link');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // حساب الحجم الكلي للملفات
  const totalSizeBytes = documents.reduce((acc, d) => acc + (d.file_size_bytes || 0), 0);
  const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);
  const isOver10MB = totalSizeBytes > 10 * 1024 * 1024;

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = (formData.get('name') as string).trim();
    const description = (formData.get('description') as string).trim();
    const applies_to = formData.get('applies_to') as AppliesTo;

    let url = '';
    let fileSizeBytes = 0;

    if (docKind === 'link') {
      url = (formData.get('url') as string).trim();
    } else {
      if (uploadedFile) {
        url = URL.createObjectURL(uploadedFile);
        fileSizeBytes = uploadedFile.size;
      } else {
        url = 'https://drive.google.com/sample-file';
      }
    }

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      name,
      description: description || undefined,
      kind: docKind,
      url,
      file_size_bytes: fileSizeBytes,
      applies_to,
    };

    onAddDocument(newDoc);
    setIsModalOpen(false);
    setUploadedFile(null);
  };

  return (
    <div className="space-y-6">
      
      {/* بطاقة الشرح والتنبيه على حجم المرفقات */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-900" />
            النماذج والوثائق والاستمارات المطلوبة
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            يتم تضمين هذه النماذج تلقائياً في نص الرسالة المرسلة للمحاضر بحسب نوع نشاطه (دورة، ورشة، أو كلاهما).
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 cursor-pointer shrink-0 border border-blue-800/30"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة نموذج أو رابط جديد</span>
        </button>
      </div>

      {/* مؤشر الحجم الكلي */}
      <div className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
        isOver10MB ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-blue-50/70 border-blue-200 text-blue-950'
      }`}>
        <div className="flex items-center gap-2.5">
          {isOver10MB ? <AlertCircle className="w-4 h-4 text-amber-700" /> : <Paperclip className="w-4 h-4 text-blue-900" />}
          <span>
            الحجم الإجمالي للملفات المرفقة: <strong>{totalSizeMB} ميغابايت</strong>.
            {isOver10MB 
              ? ' نظراً لتجاوز الحد الأقصى (10MB)، ستُرسل الملفات كروابط تحميل مباشرة بدلاً من المرفقات الثقيلة لتجنب الارتداد البريدي.' 
              : ' سيتم إرسال الملفات كمرفقات وروابط تحميل مباشرة بحسب الإعدادات.'}
          </span>
        </div>
      </div>

      {/* شبكة النماذج */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-blue-500/60 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                  doc.kind === 'file' ? 'bg-blue-50 text-blue-900 border border-blue-200/60' : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {doc.kind === 'file' ? 'ملف مرفق' : 'رابط خارجي (Google / Form)'}
                </span>

                <span className="text-[11px] text-slate-500 font-medium">
                  {doc.applies_to === 'courses' ? 'للدورات فقط' : (doc.applies_to === 'workshops' ? 'للورش فقط' : 'للدورات والورش')}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {doc.name}
              </h4>

              {doc.description && (
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                  {doc.description}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
              <a
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>معاينة / فتح</span>
              </a>

              <button
                onClick={() => {
                  if (confirm(`هل أنت متأكد من حذف نموذج «${doc.name}»؟`)) {
                    onDeleteDocument(doc.id);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="حذف النموذج"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {documents.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-500 text-sm">
            لا توجد نماذج مضافة حتى الآن. انقر على «إضافة نموذج أو رابط جديد» للبدء.
          </div>
        )}
      </div>

      {/* نافذة إضافة نموذج أو رابط */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">إضافة نموذج أو استمارة رسمية</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">اسم النموذج / الاستمارة *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="مثال: استمارة المنهاج التدريبي وساعات المحاضرات"
                  className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">الوصف أو التعليمات</label>
                <input
                  type="text"
                  name="description"
                  placeholder="مثال: تعبأ من قبل المحاضر الأصيل قبل بدء الدورة"
                  className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">نوع المورد *</label>
                  <select
                    value={docKind}
                    onChange={(e) => setDocKind(e.target.value as DocumentKind)}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  >
                    <option value="link">رابط خارجي (Google Form / Drive / Jotform)</option>
                    <option value="file">رفع ملف (PDF / Word / Excel)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">يُرسل إلى من؟ *</label>
                  <select
                    name="applies_to"
                    defaultValue="both"
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  >
                    <option value="both">كلاهما (الدورات والورش)</option>
                    <option value="courses">الدورات التدريبية فقط</option>
                    <option value="workshops">ورش العمل فقط</option>
                  </select>
                </div>
              </div>

              {docKind === 'link' ? (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">رابط الاستمارة (URL) *</label>
                  <input
                    type="url"
                    name="url"
                    required
                    placeholder="https://docs.google.com/forms/..."
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white font-mono"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">اختر الملف (PDF, DOCX, XLSX) *</label>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.xlsx,.xls"
                    required
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-white"
                  />
                </div>
              )}

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
                  حفظ النموذج
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
