import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';

// Mark as dynamic since we need database access
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [productCount, orderCount, totalRevenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: {
          not: 'cancelled',
        },
      },
    }),
  ]);

  const recentProducts = await prisma.product.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const lowStockProducts = await prisma.product.findMany({
    where: {
      stock: {
        lt: 10,
      },
    },
    take: 5,
    orderBy: {
      stock: 'asc',
    },
  });

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Navigation */}
      <nav className="border-b border-primary-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-primary-900">
                TravelEase Admin
              </Link>
              <div className="flex items-baseline space-x-4">
                <Link href="/admin" className="text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/admin/products" className="text-primary-700 hover:text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                  Products
                </Link>
                <Link href="/admin/orders" className="text-primary-700 hover:text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                  Orders
                </Link>
              </div>
            </div>
            <Link href="/" className="text-primary-700 hover:text-primary-900 text-sm">
              ← Back to Store
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-600 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-primary-900">{productCount}</p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-primary-900">{orderCount}</p>
              </div>
              <div className="text-4xl">🛒</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-primary-900">
                  {formatPrice(totalRevenue._sum.total || 0)}
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary-900">Recent Products</h2>
              <Link
                href="/admin/products"
                className="text-sm text-accent-600 hover:text-accent-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentProducts.length === 0 ? (
                <p className="text-primary-600 text-sm">No products yet</p>
              ) : (
                recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between py-2 border-b border-primary-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-primary-900">{product.name}</p>
                      <p className="text-xs text-primary-600">{product.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary-900">
                        {formatPrice(product.price, product.currency)}
                      </p>
                      <p className="text-xs text-primary-600">Stock: {product.stock}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-4">Low Stock Alert</h2>
            <div className="space-y-3">
              {lowStockProducts.length === 0 ? (
                <p className="text-primary-600 text-sm">All products are well-stocked</p>
              ) : (
                lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between py-2 border-b border-primary-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-primary-900">{product.name}</p>
                      <p className="text-xs text-primary-600">{product.brand}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        product.stock === 0 
                          ? 'bg-red-100 text-red-800' 
                          : product.stock < 5 
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.stock} left
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-primary-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/products/new"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-accent-600 text-white rounded-md hover:bg-accent-700 transition-colors"
            >
              <span className="text-xl">+</span>
              Add New Product
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-700 text-white rounded-md hover:bg-primary-800 transition-colors"
            >
              <span className="text-xl">📋</span>
              View Orders
            </Link>
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-100 text-primary-900 rounded-md hover:bg-primary-200 transition-colors"
            >
              <span className="text-xl">📊</span>
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
