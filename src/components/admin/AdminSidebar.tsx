'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/homepage', label: 'Startseite', icon: '🏠' },
  { href: '/admin/anfragen', label: 'Anfragen', icon: '📬' },
  { href: '/admin/email-vorlagen', label: 'E-Mail Vorlagen', icon: '✉️' },
  { href: '/admin/blog', label: 'Blog', icon: '✍️' },
  { href: '/admin/testimonials', label: 'Bewertungen', icon: '⭐' },
  { href: '/admin/einstellungen', label: 'Einstellungen', icon: '⚙️' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 bg-primary text-white flex flex-col shrink-0">
      <div className="p-5 border-b border-blue-800">
        <div className="font-bold text-lg">HUWA Admin</div>
        <div className="text-blue-300 text-xs">Steuerung & Marketing</div>
      </div>
      <nav className="flex-1 py-4">
        {nav.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
              pathname === item.href ? 'bg-blue-800 text-accent' : 'text-blue-200 hover:text-white hover:bg-blue-800/50'
            }`}
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
