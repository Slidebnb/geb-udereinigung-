'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
  badge?: boolean;
  children?: { href: string; label: string; icon: string }[];
}

interface NavGroup {
  label: string | null;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: null,
    items: [
      { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
    ],
  },
  {
    label: 'Inhalt',
    items: [
      { href: '/admin/homepage', label: 'Startseite', icon: '🏠' },
      {
        href: '/admin/blog',
        label: 'Blog',
        icon: '✍️',
        children: [
          { href: '/admin/blog/ki-erstellen', label: 'KI-Generator', icon: '🤖' },
          { href: '/admin/blog/themenplaner', label: 'Themenplaner', icon: '📋' },
        ],
      },
      { href: '/admin/testimonials', label: 'Bewertungen', icon: '⭐' },
    ],
  },
  {
    label: 'Kunden & Anfragen',
    items: [
      { href: '/admin/anfragen', label: 'Anfragen', icon: '📬', badge: true },
      { href: '/admin/kunden', label: 'Kunden', icon: '👥' },
      { href: '/admin/newsletter', label: 'Newsletter', icon: '📧' },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { href: '/admin/social', label: 'Social Media', icon: '📸' },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/admin/einstellungen', label: 'Einstellungen', icon: '⚙️' },
    ],
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);
  const [blogOpen, setBlogOpen] = useState(pathname.startsWith('/admin/blog'));

  useEffect(() => {
    fetch('/api/admin/requests')
      .then(r => r.json())
      .then(d => {
        const count =
          (d.contactRequests?.filter((r: { status: string }) => r.status === 'neu').length ?? 0) +
          (d.quoteRequests?.filter((r: { status: string }) => r.status === 'neu').length ?? 0);
        setPendingCount(count);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/admin/blog')) setBlogOpen(true);
  }, [pathname]);

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + '/');

  const renderItem = (item: NavItem) => {
    if (item.children) {
      const active = isActive(item);
      return (
        <div key={item.href}>
          <button
            onClick={() => setBlogOpen(o => !o)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg mx-2 transition-colors ${
              active ? 'bg-white/15 text-white' : 'text-blue-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            <span className={`text-xs transition-transform duration-200 ${blogOpen ? 'rotate-90' : ''}`}>▶</span>
          </button>
          {blogOpen && (
            <div className="ml-6 mt-0.5 space-y-0.5">
              <Link
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-2.5 px-4 py-2 text-xs rounded-lg mx-2 transition-colors ${
                  pathname === item.href ? 'bg-white/15 text-white font-medium' : 'text-blue-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>📝</span> Alle Artikel
              </Link>
              {item.children.map(child => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className={`flex items-center gap-2.5 px-4 py-2 text-xs rounded-lg mx-2 transition-colors ${
                    pathname === child.href ? 'bg-white/15 text-white font-medium' : 'text-blue-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{child.icon}</span> {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    const active = isActive(item);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClose}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg mx-2 transition-colors ${
          active ? 'bg-white/15 text-white' : 'text-blue-200 hover:text-white hover:bg-white/10'
        }`}
        aria-current={active ? 'page' : undefined}
      >
        <span className="text-base">{item.icon}</span>
        <span className="flex-1">{item.label}</span>
        {item.badge && pendingCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
            {pendingCount > 9 ? '9+' : pendingCount}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-primary text-white flex flex-col shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-primary font-bold text-sm">H</div>
            <div>
              <div className="font-bold text-white text-sm leading-tight">HUWA Admin</div>
              <div className="text-blue-300 text-xs leading-tight">Gebäudereinigung</div>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-blue-300 hover:text-white p-1 rounded"
          aria-label="Menü schließen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto space-y-0.5">
        {navGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-2' : ''}>
            {group.label && (
              <div className="px-6 pt-3 pb-1 text-xs font-semibold text-blue-400 uppercase tracking-widest">
                {group.label}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map(item => renderItem(item))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="text-blue-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors px-2 py-1 rounded hover:bg-white/10"
        >
          ← Zur Webseite
        </Link>
      </div>
    </aside>
  );
}
