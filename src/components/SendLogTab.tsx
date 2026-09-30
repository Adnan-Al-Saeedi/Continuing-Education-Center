import React, { useState, useMemo } from 'react';
import { 
  History, 
  Download, 
  RotateCw, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';
import { SendLog, SendStatus } from '../types';
import { exportSendLogToExcel } from '../lib/excelParser';

interface SendLogTabProps {
  sendLogs: SendLog[];
  onRetrySend: (logId: string) => Promise<void>;
  isRetrying: boolean;
}

export const SendLogTab: React.FC<SendLogTabProps> = ({
  sendLogs,
  onRetrySend,
  isRetrying,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | SendStatus>('all');
  const [channelFilter, setChannelFilter] = useState<'all' | 'email' | 'whatsapp' | 'both'>('all');
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const filteredLogs = useMemo(() => {
    return sendLogs.filter((log) => {
      if (statusFilter !== 'all' && log.status !== statusFilter) return false;
      if (channelFilter !== 'all') {
        if (channelFilter === 'both' && log.channel !== 'both') return false;
        if (channelFilter === 'whatsapp' && log.channel !== 'whatsapp' && log.channel !== 'both') return false;
        if (channelFilter === 'email' && log.channel !== 'email' && log.channel !== 'both') return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = log.recipient_name.toLowerCase().includes(q);
        const matchesEmail = log.email.toLowerCase().includes(q);
        const matchesPhone = (log.phone || '').includes(q);
        const matchesTitle = (log.activity_title || '').toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesTitle) return false;
      }

      return true;
    });
  }, [sendLogs, statusFilter, channelFilter, searchQuery]);

  const handleRetry = async (id: string) => {
    setRetryingId(id);
    await onRetrySend(id);
    setRetryingId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* الترويسة وتصدير الإكسل */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-900" />
            سجل الإرسال والتقارير الأوتوماتيكية (بريد إلكتروني وواتساب)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            توثيق كامل لكافة رسائل التذكير المرسلة عبر البريد الإلكتروني والواتساب بالتزامن مع إمكانية المراسلة الفورية وإعادة المحاولة.
          </p>
        </div>

        <button
          onClick={() => exportSendLogToExcel(sendLogs)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/15 cursor-pointer shrink-0 border border-blue-800/30"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>تصدير السجل إلى ملف Excel</span>
        </button>
      </div>

      {/* شريط البحث والتصفية */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث بالاسم، البريد، الهاتف، أو عنوان النشاط..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-9 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* فلتر القناة */}
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value as any)}
            className="border border-slate-200 rounded-xl px-3 py-2 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:bg-white"
          >
            <option value="all">كافة القنوات</option>
            <option value="both">📧+💬 بريد وواتساب متزامن</option>
            <option value="email">📧 بريد إلكتروني</option>
            <option value="whatsapp">💬 واتساب</option>
          </select>

          {/* فلتر الحالة */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              الكل ({sendLogs.length})
            </button>
            <button
              onClick={() => setStatusFilter('sent')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === 'sent' ? 'bg-white text-blue-950 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              الناجحة ({sendLogs.filter(l => l.status === 'sent').length})
            </button>
            <button
              onClick={() => setStatusFilter('failed')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === 'failed' ? 'bg-white text-rose-700 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              الفاشلة ({sendLogs.filter(l => l.status === 'failed').length})
            </button>
          </div>
        </div>
      </div>

      {/* جدول السجلات */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="p-3.5">المحاضر</th>
                <th className="p-3.5">وسيلة الاتصال</th>
                <th className="p-3.5">النشاط العلمي</th>
                <th className="p-3.5">القناة</th>
                <th className="p-3.5">وقت الإرسال</th>
                <th className="p-3.5">الحالة</th>
                <th className="p-3.5 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredLogs.map((log) => {
                const isItemRetrying = retryingId === log.id;
                return (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                      {log.recipient_name}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-mono text-slate-600">{log.email}</div>
                      {log.phone && (
                        <div className="font-mono text-[11px] text-slate-400" dir="ltr">{log.phone}</div>
                      )}
                    </td>
                    <td className="p-3.5 max-w-[260px]">
                      <div className="font-semibold text-slate-900">{log.activity_title || '—'}</div>
                      {log.error && (
                        <div className="text-[11px] text-rose-600 mt-0.5 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                          <span>سبب الفشل: {log.error}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        log.channel === 'both'
                          ? 'bg-purple-50 text-purple-800 border border-purple-200'
                          : log.channel === 'whatsapp'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-blue-50 text-blue-900 border border-blue-200'
                      }`}>
                        {log.channel === 'both' ? '📧 بريد + 💬 واتساب' : (log.channel === 'whatsapp' ? '💬 واتساب' : '📧 بريد إلكتروني')}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500 whitespace-nowrap">
                      {new Date(log.sent_at).toLocaleString('ar-IQ', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        log.status === 'sent'
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/60'
                          : log.status === 'failed'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                          : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                      }`}>
                        {log.status === 'sent' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {log.status === 'failed' && <XCircle className="w-3 h-3 text-rose-600" />}
                        {log.status === 'sent' ? 'ناجح' : (log.status === 'failed' ? 'فشل' : 'معلّق')}
                      </span>
                    </td>
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {log.whatsapp_url && (
                          <a
                            href={log.whatsapp_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition-all"
                            title="فتح محادثة واتساب مع المحاضر"
                          >
                            <span>واتساب 💬</span>
                          </a>
                        )}
                        <button
                          onClick={() => handleRetry(log.id)}
                          disabled={isItemRetrying || isRetrying}
                          className="px-2 py-1 rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-300 text-slate-600 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          title="إعادة إرسال الرسالة للمحاضر"
                        >
                          <RotateCw className={`w-3 h-3 ${isItemRetrying ? 'animate-spin' : ''}`} />
                          <span>إعادة</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 text-sm">
                    لا توجد سجلات تطابق البحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
