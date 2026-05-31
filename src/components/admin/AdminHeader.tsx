'use client';

import { signOut } from 'next-auth/react';

export default function AdminHeader({ user }: { user: any }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <div className="text-gray-600 text-sm">Willkommen zurück, <span className="font-medium text-gray-800">{user?.name || user?.email}</span></div>
      <button
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1.5 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        Abmelden
      </button>
    </header>
  );
}
