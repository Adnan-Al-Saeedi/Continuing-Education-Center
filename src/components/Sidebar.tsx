import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  FileText, 
  Mail, 
  History, 
  Settings as SettingsIcon,
  AlertCircle
} from 'lucide-react';

export type TabType = 'dashboard' | 'activities' | 'lecturers' | 'documents' | 'template' | 'logs' | 'settings';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unmatchedCount: number;
  conflictsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  unmatchedCount,
  conflictsCount,
}) => {
  const menuItems = [
    {
      id: 'dashboard' as TabType,
      label: 'الرئيسية',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'activities' as TabType,
      label: 'دليل النشاطات',
      icon: CalendarDays,
      badge: conflictsCount > 0 ? (
        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {conflictsCount}
        </span>
      ) : null,
    },
    {
      id: 'lecturers' as TabType,
      label: 'دليل المحاضرين',
      icon: Users,
      badge: unmatchedCount > 0 ? (
        <span className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full font-bold">
          {unmatchedCount}
        </span>
      ) : null,
    },
    {
      id: 'documents' as TabType,
      label: 'النماذج والوثائق',
      icon: FileText,
      badge: null,
    },
    {
      id: 'template' as TabType,
      label: 'قالب البريد الإلكتروني',
      icon: Mail,
      badge: null,
    },
    {
      id: 'logs' as TabType,
      label: 'سجل الإرسال والتقارير',
      icon: History,
      badge: null,
    },
    {
      id: 'settings' as TabType,
      label: 'الإعدادات العامة',
      icon: SettingsIcon,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 bg-[#f5f5f7]/90 backdrop-blur-xl border-l border-slate-200/70 flex flex-col shrink-0 min-h-[calc(100vh-5rem)]">
      <div className="p-4 flex-1 space-y-1.5">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          القائمة الرئيسية
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}-btn`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                isActive
                  ? 'bg-white text-blue-950 font-bold shadow-xs border border-slate-200/80 ring-1 ring-black/[0.03]'
                  : 'text-slate-600 hover:bg-black/[0.04] hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-900' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge}
            </button>
          );
        })}
      </div>

      {/* تنويه الأمان وسياسة الخصوصية */}
      <div className="p-4 border-t border-slate-200/60 bg-white/40 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 text-blue-950 font-bold mb-1">
          <span>نظام مشفر ومحمي</span>
        </div>
        <p className="leading-relaxed text-[11px] text-slate-500">
          تُحفظ أسرار SMTP ومفاتيح الخدمة في GitHub Secrets حصراً.
        </p>
      </div>
    </aside>
  );
};
