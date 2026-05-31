'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/homepage', label: 'Startseite', icon: '🏠' },
  { href: '/admin/anfragen', label: 'Anfragen', icon: '📬' },
  { href: '/admin/kunden', label: 'Kunden', icon: '👥' },
  { href: '/admin/blog', label: 'Blog', icon: '✍️' },
  { href: '/admin/blog/ki-erstellen', label: 'KI Blog', icon: '🤖' },
  { href: '/admin/blog/themenplaner', label: 'Themenplaner', icon: '📋' },
  { href: '/admin/social', label: 'Social Media', icon: '📸' },
  { href: '/admin/testimonials', label: 'Bewertungen', icon: '⭐' },
  { href: '/admin/einstellungen', label: 'Einstellungen', icon: '⚙️' },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 lg:w-56 bg-primary text-white flex flex-col shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="p-5 border-b border-blue-800 flex items-center justify-between">
        <div>
          <div className="font-bold text-lg">HUWA Admin</div>
          <div className="text-blue-300 text-xs">Steuerung & Marketing</div>
        </div>
        {/* Close button – only visible on mobile */}
        <button
          onClick={onClose}
          className="lg:hidden text-blue-300 hover:text-white p-1"
          aria-label="Menü schließen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        {nav.map(item => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
              pathname === item.href ? 'bg-blue-800 text-accent' : 'text-blue-200 hover:text-white hover:bg-blue-800/50'
            }`}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-blue-800">
        <Link href="/" className="text-blue-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors">
          ← Zur Webseite
        </Link>
      </div>
    </aside>
  );
}
