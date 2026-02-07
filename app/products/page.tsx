import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';
import Navigation from '@/components/Navigation';

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

  const categories = [
    { name: 'All Products', slug: '' },
    { name: 'Skincare', slug: 'skincare' },
    { name: 'Haircare', slug: 'haircare' },
    { name: 'Personal Hygiene', slug: 'personal hygiene' },
    { name: 'Cosmetics', slug: 'cosmetics' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {category ? (
              <span className="capitalize">{category}</span>
            ) : (
              'All Products'
            )}
          </h1>
          <p className="text-lg text-gray-600">
            {products.length} product{products.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug ? `/products?category=${encodeURIComponent(cat.slug)}` : '/products'}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  (category === cat.slug || (!category && cat.slug === ''))
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-rose-300'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-12">
          <form action="/products" method="get" className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search for products, brands..."
                defaultValue={search}
                className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-200 rounded-full focus:ring-4 focus:ring-rose-100 focus:border-rose-300 outline-none transition-all"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full hover:shadow-lg transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search or filters</p>
            <Link href="/products" className="inline-block bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              View All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center relative overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-6xl opacity-20">🧴</div>
                  )}
                  {product.isLiquid && (
                    <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      💧 Liquid
                    </span>
                  )}
                  {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-1">
                    {product.brand}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price, product.currency)}
                    </p>
                    <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {product.size}
                    </p>
                  </div>
                  {product.stock > 0 && (
                    <div className="flex items-center text-sm text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                      In stock
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
