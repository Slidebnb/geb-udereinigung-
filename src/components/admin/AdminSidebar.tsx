'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Calculator, ClipboardList, FileCog, FileText, FolderKanban, Inbox, LayoutDashboard, Package, Settings, Users, X } from 'lucide-react';

const nav = [
  { href: '/admin', label: 'Übersicht', icon: LayoutDashboard },
  { href: '/admin/anfragen', label: 'Anfragen', icon: Inbox },
  { href: '/admin/kunden', label: 'Kunden & Objekte', icon: Users },
  { href: '/admin/kalkulation', label: 'Kalkulation', icon: Calculator },
  { href: '/admin/dokumente', label: 'Angebote & Verträge', icon: FileText },
  { href: '/admin/generator', label: 'Dokument-Generator', icon: FileCog },
  { href: '/admin/objektdokumente', label: 'Objektdokumente', icon: ClipboardList },
  { href: '/admin/inventar', label: 'Material & Geräte', icon: Package },
  { href: '/admin/inhalte', label: 'Inhalte', icon: FolderKanban },
  { href: '/admin/einstellungen', label: 'Einstellungen', icon: Settings },
];

export default function AdminSidebar({ isOpen = false, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <aside className={`admin-sidebar fixed lg:sticky top-0 inset-y-0 left-0 z-50 h-screen w-[268px] shrink-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="admin-brand"><div className="admin-mark"><BarChart3 size={20} /></div><div><strong>HUWA</strong><span>BETRIEBSZENTRALE</span></div><button onClick={onClose} className="lg:hidden" aria-label="Menü schließen"><X size={20} /></button></div>
      <nav>
        {nav.map(item => {
          const active = item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return <Link key={item.href} href={item.href} onClick={onClose} className={active ? 'active' : ''}><Icon size={18} strokeWidth={1.8} /><span>{item.label}</span></Link>;
        })}
      </nav>
      <div className="admin-sidebar-footer"><Link href="/">Webseite öffnen</Link><span>Intern · geschützt</span></div>
    </aside>
  );
}
