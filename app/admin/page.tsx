import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';
import AdminLayout from './components/AdminLayout';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [
    productCount,
    activeProducts,
    draftProducts,
    discontinuedProducts,
    orderCount,
    totalRevenue,
    lowStockProducts,
    stockMovements
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { status: 'active' } }),
    prisma.product.count({ where: { status: 'draft' } }),
    prisma.product.count({ where: { status: 'discontinued' } }),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: 'cancelled' } },
    }),
    prisma.product.findMany({
      where: { stock: { lt: 10 } },
      take: 5,
      orderBy: { stock: 'asc' },
      include: { categoryRel: true, brandRel: true },
    }),
    prisma.stockMovement.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { product: true },
    }),
  ]);

  return (
    <AdminLayout
      title="Dashboard"
      actions={
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Product
        </Link>
      }
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-600">Total Products</div>
            <div className="text-2xl">📦</div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{productCount}</div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-green-600">Active: {activeProducts}</span>
            <span className="text-gray-500">Draft: {draftProducts}</span>
            <span className="text-red-600">Disc: {discontinuedProducts}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-600">Low Stock Alerts</div>
            <div className="text-2xl">⚠️</div>
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">{lowStockProducts.length}</div>
          <div className="text-xs text-gray-500">Products with stock &lt; 10</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-600">Total Orders</div>
            <div className="text-2xl">🛒</div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{orderCount}</div>
          <div className="text-xs text-gray-500">All time orders</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-600">Revenue</div>
            <div className="text-2xl">💰</div>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {formatPrice(totalRevenue._sum.total || 0)}
          </div>
          <div className="text-xs text-gray-500">Excluding cancelled orders</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
          </div>
          <div className="p-6">
            {lowStockProducts.length === 0 ? (
              <p className="text-gray-500 text-sm">All products are well-stocked ✓</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        {product.brandRel?.name || product.brand} • {product.categoryRel?.name || product.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.stock === 0
                          ? 'bg-red-100 text-red-800'
                          : product.stock < 5
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.stock} left
                      </span>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-blue-600 hover:text-blue-700 text-xs"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Stock Movements */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Stock Movements</h2>
              <Link href="/admin/inventory" className="text-sm text-blue-600 hover:text-blue-700">
                View All →
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stockMovements.length === 0 ? (
              <p className="text-gray-500 text-sm">No stock movements yet</p>
            ) : (
              <div className="space-y-3">
                {stockMovements.map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{movement.product.name}</p>
                      <p className="text-xs text-gray-500">{movement.notes || 'No notes'}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${
                        movement.type === 'IN' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {movement.type === 'IN' ? '+' : '-'}{movement.quantity}
                      </p>
                      <p className="text-xs text-gray-500">{movement.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/products/new"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="text-xl">+</span>
            Add Product
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <span className="text-xl">🏷️</span>
            Manage Categories
          </Link>
          <Link
            href="/admin/brands"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <span className="text-xl">⭐</span>
            Manage Brands
          </Link>
          <Link
            href="/admin/inventory"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="text-xl">📊</span>
            Update Inventory
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
