'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const nav = [
  { href: '/portal', label: 'Dashboard', icon: '📊' },
  { href: '/portal/protokolle', label: 'Meine Protokolle', icon: '📋' },
  { href: '/portal/kontakt', label: 'Kontakt', icon: '📞' },
];

interface PortalSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export default function PortalSidebar({ user }: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-[#0C2340] text-white flex flex-col shrink-0 min-h-screen">
      <div className="p-5 border-b border-[#1B3E62]">
        <div className="font-bold text-lg text-[#4BB8F5]">HUWA</div>
        <div className="text-blue-300 text-xs mt-0.5">Kunden-Portal</div>
      </div>

      <div className="px-5 py-4 border-b border-[#1B3E62]">
        <div className="text-xs text-blue-300 mb-1">Eingeloggt als</div>
        <div className="text-sm font-medium text-white truncate">{user.name || user.email}</div>
        {user.name && <div className="text-xs text-blue-400 truncate">{user.email}</div>}
      </div>

      <nav className="flex-1 py-4">
        {nav.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
              pathname === item.href
                ? 'bg-[#1B3E62] text-[#4BB8F5]'
                : 'text-blue-200 hover:text-white hover:bg-[#1B3E62]/60'
            }`}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#1B3E62] space-y-2">
        <Link
          href="/"
          className="text-blue-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
        >
          ← Zur Webseite
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/portal/login' })}
          className="text-blue-300 hover:text-red-300 text-xs flex items-center gap-1.5 transition-colors"
        >
          Abmelden
        </button>
      </div>
    </aside>
  );
}
