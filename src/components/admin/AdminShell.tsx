'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminShellProps {
  user: { name?: string | null; email?: string | null };
  children: React.ReactNode;
}

export default function AdminShell({ user, children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-app min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader user={user} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="admin-main flex-1 overflow-auto"><div className="admin-content">{children}</div></main>
      </div>
    </div>
  );
}
