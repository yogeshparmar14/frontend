'use client';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/redux';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { navByRole, type NavEntry } from '@/config/nav';

export default function Sidebar() {
  const { user } = useAppSelector((s) => s.auth);
  const pathname = usePathname();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  // Simple inline icons (no external deps)
  const IcDashboard = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M3 13h8V3H3v10zM13 21h8v-6h-8v6zM13 3v8h8V3h-8zM3 21h8v-4H3v4z"/>
    </svg>
  );
  const IcChevron = ({ open }: { open: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? 'rotate-90' : ''}`}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
  const IcBag = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M6 2l3 3h6l3-3"/><path d="M3 7h18l-1 13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L3 7z"/><path d="M16 11a4 4 0 0 1-8 0"/>
    </svg>
  );
  const IcStore = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M3 9l1-5h16l1 5"/><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M9 22V12h6v10"/>
    </svg>
  );
  const IcStack = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <polygon points="12 2 22 7 12 12 2 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  );
  const IcUser = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const isActive = (href: string) => pathname === href;

  const getIcon = (name?: NavEntry['icon']) => {
    switch (name) {
      case 'dashboard':
        return IcDashboard;
      case 'bag':
        return IcBag;
      case 'store':
        return IcStore;
      case 'stack':
        return IcStack;
      case 'user':
        return IcUser;
      default:
        return null;
    }
  };

  const toggle = (key: string) => setOpenMap((m) => ({ ...m, [key]: !m[key] }));

  return (
    <aside className="w-64 border-r h-full p-3 bg-white flex flex-col">
      {/* Brand */}
      <div className="mb-3 flex items-center gap-2 px-2">
        <div className="h-7 w-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">d</div>
        <div className="font-semibold">Antdesk</div>
      </div>

      <nav className="flex flex-col gap-1 overflow-y-auto">
        {(user ? navByRole[user.role] : []).map((entry) => {
          const key = entry.label;
          const hasChildren = !!entry.children && entry.children.length > 0;
          const icon = getIcon(entry.icon);

          if (!hasChildren && entry.href) {
            return (
              <Link
                key={key}
                href={entry.href}
                className={`flex items-center gap-2 px-2 py-2 rounded-md ${isActive(entry.href) ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-100'}`}
              >
                {icon}
                <span>{entry.label}</span>
              </Link>
            );
          }

          return (
            <div key={key}>
              <button
                onClick={() => toggle(key)}
                className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100"
              >
                <span className="flex items-center gap-2">
                  {icon}
                  <span>{entry.label}</span>
                </span>
                <IcChevron open={!!openMap[key]} />
              </button>
              {!!openMap[key] && entry.children && (
                <div className="ml-7 mt-1 mb-1 flex flex-col text-sm text-gray-600">
                  {entry.children.map((c) => (
                    <Link key={c.label} href={c.href} className="py-1 hover:text-gray-900">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 text-xs text-gray-500 px-2">
        AntdDesk Digital
        <div>
          Want to get more inspiration?{' '}
          <a href="#" className="text-teal-700 hover:underline">Visit here</a>
        </div>
      </div>
    </aside>
  );
}
