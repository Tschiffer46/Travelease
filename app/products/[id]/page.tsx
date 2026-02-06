import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/AddToCartButton';

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
    <div className="min-h-screen bg-primary-50">
      {/* Navigation */}
      <nav className="border-b border-primary-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-900">
              TravelEase
            </Link>
            <div className="flex items-baseline space-x-4">
              <Link href="/products" className="text-primary-700 hover:text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
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
        <Link href="/products" className="text-primary-600 hover:text-primary-900 mb-4 inline-block">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mt-6">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-primary-400">No image available</div>
            )}
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="mb-4">
              {product.isLiquid && (
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  Liquid Product
                </span>
              )}
              <h1 className="text-3xl font-bold text-primary-900">{product.name}</h1>
              <p className="text-lg text-primary-600 mt-2">{product.brand}</p>
            </div>

            <div className="mb-6">
              <p className="text-3xl font-bold text-primary-900">
                {formatPrice(product.price, product.currency)}
              </p>
              <p className="text-sm text-primary-600 mt-1">Size: {product.size}</p>
              {product.isLiquid && product.sizeInMl && (
                <p className="text-sm text-primary-600">Volume: {product.sizeInMl}ml</p>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-primary-900 mb-2">Description</h2>
              <p className="text-primary-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-primary-600">
                Category: <span className="font-medium capitalize">{product.category}</span>
              </p>
              <p className="text-sm mt-2">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </p>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
