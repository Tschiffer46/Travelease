import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/AddToCartButton';
import Navigation from '@/components/Navigation';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link 
          href="/products" 
          className="inline-flex items-center text-gray-600 hover:text-rose-600 mb-8 group transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Products
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl flex items-center justify-center overflow-hidden shadow-xl relative">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-8xl opacity-20">🧴</div>
            )}
            {product.isLiquid && (
              <span className="absolute top-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                💧 Liquid {product.sizeInMl && `${product.sizeInMl}ml`}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
                {product.brand}
              </span>
              <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-600 capitalize text-lg">
                {product.category}
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4">
                <p className="text-5xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                  {formatPrice(product.price, product.currency)}
                </p>
                <p className="text-xl text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                  {product.size}
                </p>
              </div>
            </div>

            <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Product Details</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              {product.stock > 0 ? (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-lg">In Stock - {product.stock} available</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-lg">Out of Stock</span>
                </div>
              )}
            </div>

            <AddToCartButton product={product} />

            {product.isLiquid && (
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">✈️</div>
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2 text-lg">TSA Compliance</h3>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      This liquid product {product.sizeInMl && product.sizeInMl <= 100 ? 'meets' : 'may exceed'} TSA requirements for carry-on luggage. 
                      {product.sizeInMl && ` (${product.sizeInMl}ml - max 100ml per container)`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
