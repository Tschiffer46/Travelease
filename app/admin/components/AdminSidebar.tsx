'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Products', href: '/admin/products', icon: '📦' },
  { name: 'Categories', href: '/admin/categories', icon: '🏷️' },
  { name: 'Brands', href: '/admin/brands', icon: '⭐' },
  { name: 'Suppliers', href: '/admin/suppliers', icon: '🏢' },
  { name: 'Inventory', href: '/admin/inventory', icon: '📊' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      >
        {isCollapsed ? '☰' : '✕'}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-transform ${
          isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
        } ${isCollapsed && 'lg:w-20'} ${!isCollapsed && 'lg:w-64'} w-64 bg-gray-800`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              {!isCollapsed && (
                <span className="text-xl font-bold text-white">TravelEase</span>
              )}
            </Link>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block text-white hover:bg-gray-700 p-1 rounded"
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  title={item.name}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && <span className="font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
              title="Back to Store"
            >
              <span className="text-xl">←</span>
              {!isCollapsed && <span className="font-medium">Back to Store</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}
