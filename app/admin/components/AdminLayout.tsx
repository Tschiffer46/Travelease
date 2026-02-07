'use client';

import AdminSidebar from './AdminSidebar';
import AdminBreadcrumbs from './AdminBreadcrumbs';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
}

export default function AdminLayout({ children, title, actions }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <AdminBreadcrumbs />
                {title && (
                  <h1 className="mt-2 text-2xl font-bold text-gray-900">{title}</h1>
                )}
              </div>
              {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
