'use client';

import { signOut } from 'next-auth/react';

interface AdminHeaderProps {
  user: any;
  onMenuToggle?: () => void;
}

export default function AdminHeader({ user, onMenuToggle }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        {/* Hamburger – mobile only */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
          aria-label="Navigation öffnen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="text-gray-600 text-sm">
          Willkommen, <span className="font-medium text-gray-800">{user?.name || user?.email}</span>
        </div>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1.5 transition-colors shrink-0"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        <span className="hidden sm:inline">Abmelden</span>
      </button>
    </header>
  );
}
