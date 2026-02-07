'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminBreadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  const breadcrumbs = paths.map((path, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/');
    const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    return { href, label };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link href="/" className="hover:text-gray-900">
        Home
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center space-x-2">
          <span>/</span>
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-gray-900">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
