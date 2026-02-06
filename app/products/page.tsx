import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const { category, search } = params;

  // Build where clause
  const where: any = {};
  if (category) {
    where.category = category;
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { brand: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
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
            <Link href="/" className="text-2xl font-bold text-primary-900">
              TravelEase
            </Link>
            <div className="flex items-baseline space-x-4">
              <Link href="/products" className="text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                Products
              </Link>
              <Link href="/cart" className="text-primary-700 hover:text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Products</h1>
          <p className="mt-2 text-primary-600">Browse our collection of travel-sized products</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Link
            href="/products"
            className={`px-4 py-2 rounded-md ${
              !category
                ? 'bg-primary-900 text-white'
                : 'bg-white text-primary-700 hover:bg-primary-100'
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${cat}`}
              className={`px-4 py-2 rounded-md capitalize ${
                category === cat
                  ? 'bg-primary-900 text-white'
                  : 'bg-white text-primary-700 hover:bg-primary-100'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="mb-8">
          <form action="/products" method="get">
            <input
              type="text"
              name="search"
              placeholder="Search products..."
              defaultValue={search}
              className="w-full max-w-md px-4 py-2 border border-primary-300 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </form>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-primary-600 text-lg">No products found.</p>
            <p className="text-primary-500 mt-2">Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-primary-400 text-sm">No image</div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-primary-900 group-hover:text-accent-700">
                        {product.name}
                      </h3>
                      <p className="text-xs text-primary-500 mt-1">{product.brand}</p>
                    </div>
                    {product.isLiquid && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Liquid
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-semibold text-primary-900">
                      {formatPrice(product.price, product.currency)}
                    </p>
                    <p className="text-sm text-primary-600">{product.size}</p>
                  </div>
                  <div className="mt-2">
                    {product.stock > 0 ? (
                      <span className="text-xs text-green-600">In stock</span>
                    ) : (
                      <span className="text-xs text-red-600">Out of stock</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
