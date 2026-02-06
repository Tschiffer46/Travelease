import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';

// Mark as dynamic since we need database access
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const { category } = params;

  const where: any = {};
  if (category) {
    where.category = category;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const categories = ['skincare', 'haircare', 'personal hygiene', 'cosmetics'];

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
                <Link href="/admin" className="text-primary-700 hover:text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/admin/products" className="text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Products</h1>
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 transition-colors"
          >
            + Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Link
            href="/admin/products"
            className={`px-4 py-2 rounded-md ${
              !category
                ? 'bg-primary-900 text-white'
                : 'bg-white text-primary-700 hover:bg-primary-100'
            }`}
          >
            All ({products.length})
          </Link>
          {categories.map((cat) => {
            const count = products.filter(p => p.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/admin/products?category=${cat}`}
                className={`px-4 py-2 rounded-md capitalize ${
                  category === cat
                    ? 'bg-primary-900 text-white'
                    : 'bg-white text-primary-700 hover:bg-primary-100'
                }`}
              >
                {cat} ({count})
              </Link>
            );
          })}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-primary-200">
              <thead className="bg-primary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-primary-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-primary-200">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-primary-600">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-primary-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-accent-100 to-accent-200 rounded"></div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-primary-900">{product.name}</div>
                            <div className="text-sm text-primary-500">{product.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800 capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900">
                        {formatPrice(product.price, product.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock === 0
                            ? 'bg-red-100 text-red-800'
                            : product.stock < 10
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                        {product.isLiquid ? (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            Liquid ({product.sizeInMl}ml)
                          </span>
                        ) : (
                          <span className="text-primary-600">Solid</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-accent-600 hover:text-accent-900 mr-4"
                        >
                          Edit
                        </Link>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
