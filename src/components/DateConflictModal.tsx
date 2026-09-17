import React, { useState } from 'react';
import { AlertTriangle, ArrowLeftRight, Check, X, Calendar } from 'lucide-react';
import { DateConflictItem } from '../types';

interface DateConflictModalProps {
  isOpen: boolean;
  conflicts: DateConflictItem[];
  onClose: () => void;
  onApplyAllSwaps: () => void;
  onUpdateConflict: (activityId: string, start: string, end: string) => void;
}

export const DateConflictModal: React.FC<DateConflictModalProps> = ({
  isOpen,
  conflicts,
  onClose,
  onApplyAllSwaps,
  onUpdateConflict,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStart, setEditStart] = useState<string>('');
  const [editEnd, setEditEnd] = useState<string>('');

  if (!isOpen || conflicts.length === 0) return null;

  const startEdit = (conflict: DateConflictItem) => {
    setEditingId(conflict.activityId);
    setEditStart(conflict.correctedStart);
    setEditEnd(conflict.correctedEnd);
  };

  const saveEdit = (activityId: string) => {
    onUpdateConflict(activityId, editStart, editEnd);
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* الترويسة */}
        <div className="p-5 border-b border-slate-200 bg-amber-50/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                مراجعة التواريخ المعكوسة ({conflicts.length} دورة)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                تاريخ البدء بعد تاريخ الانتهاء. وفق الضوابط، يُعتمد التاريخ الأقدم تاريخاً للبدء.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* قائمة التعارضات */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100 space-y-4">
          {conflicts.map((item) => {
            const isEditing = editingId === item.activityId;
            return (
              <div key={item.activityId} className="pt-4 first:pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200/60 ml-2">
                      {item.department}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 inline">
                      {item.title}
                    </h4>
                  </div>

                  {!isEditing && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onUpdateConflict(item.activityId, item.correctedStart, item.correctedEnd);
                        }}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-blue-50 text-blue-950 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
                        title="اعتماد التبديل التلقائي (الأقدم للبدء)"
                      >
                        <ArrowLeftRight className="w-3 h-3 text-blue-800" />
                        <span>تبديل التاريخين</span>
                      </button>
                      <button
                        onClick={() => startEdit(item)}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                      >
                        تعديل يدوي
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-600 font-medium">تاريخ البدء:</label>
                      <input
                        type="date"
                        value={editStart}
                        onChange={(e) => setEditStart(e.target.value)}
                        className="text-xs border border-slate-300 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-600 font-medium">تاريخ الانتهاء:</label>
                      <input
                        type="date"
                        value={editEnd}
                        onChange={(e) => setEditEnd(e.target.value)}
                        className="text-xs border border-slate-300 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div className="flex items-center gap-2 mr-auto">
                      <button
                        onClick={() => saveEdit(item.activityId)}
                        className="p-1.5 px-3 rounded-lg bg-gradient-to-r from-blue-950 to-blue-900 text-white hover:from-blue-900 hover:to-blue-800 text-xs flex items-center gap-1 cursor-pointer font-bold border border-blue-800/30"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>حفظ</span>
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 px-3 rounded-lg text-slate-500 hover:bg-slate-200 text-xs cursor-pointer"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-500 block mb-0.5">في ملف الإكسل (معكوس):</span>
                      <span className="text-rose-700 line-through font-mono">
                        {item.originalStart} ⬅️ {item.originalEnd}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-0.5">التصحيح المقترح (الأقدم للبدء):</span>
                      <span className="text-blue-950 font-bold font-mono">
                        {item.correctedStart} ➡️ {item.correctedEnd}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ذيل الصندوق */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200/80 text-sm font-medium transition-colors cursor-pointer"
          >
            إغلاق المراجعة
          </button>
          <button
            onClick={onApplyAllSwaps}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-sm font-bold shadow-md shadow-amber-500/20 border border-amber-400/40 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>تبديل التاريخين تلقائياً للكل وحفظ</span>
          </button>
        </div>

      </div>
    </div>
  );
};
