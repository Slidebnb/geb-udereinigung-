'use client';

import { signOut } from 'next-auth/react';
import { Bell, LogOut, Menu, Search } from 'lucide-react';

export default function AdminHeader({ user, onMenuToggle }: { user: { name?: string | null; email?: string | null }; onMenuToggle?: () => void }) {
  return (
    <header className="admin-header">
      <button onClick={onMenuToggle} className="admin-icon-button lg:hidden" aria-label="Navigation öffnen"><Menu size={20} /></button>
      <div className="admin-search"><Search size={17} /><input aria-label="Globale Suche" placeholder="Kunden, Objekte und Dokumente suchen" /></div>
      <div className="admin-header-actions">
        <button className="admin-icon-button" aria-label="Benachrichtigungen"><Bell size={18} /></button>
        <div className="admin-user"><span>{(user.name || user.email || 'A').charAt(0).toUpperCase()}</span><div><strong>{user.name || 'Administration'}</strong><small>{user.email}</small></div></div>
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="admin-icon-button" title="Abmelden" aria-label="Abmelden"><LogOut size={18} /></button>
      </div>
    </header>
  );
}
