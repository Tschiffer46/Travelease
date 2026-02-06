import Link from 'next/link';
import DestinationSearch from '@/components/DestinationSearch';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-primary-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-900">
                TravelEase
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/products" className="text-primary-700 hover:text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                  Products
                </Link>
                <Link href="/cart" className="text-primary-700 hover:text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                  Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary-900 sm:text-6xl">
            Travel Smart, Pack Light
          </h1>
          <p className="mt-6 text-lg leading-8 text-primary-600">
            Premium travel-sized beauty and hygiene products for the modern traveler
          </p>
          
          {/* Destination Search */}
          <div className="mt-10 max-w-2xl mx-auto">
            <DestinationSearch />
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/products"
              className="rounded-md bg-primary-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-900"
            >
              Browse Products
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-primary-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-primary-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {['Skincare', 'Haircare', 'Personal Hygiene', 'Cosmetics'].map((category) => (
              <Link
                key={category}
                href={`/products?category=${category.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-accent-100 to-accent-200">
                  <div className="flex items-center justify-center p-6">
                    <h3 className="text-xl font-semibold text-primary-900 group-hover:text-accent-700 transition-colors">
                      {category}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary-900 mb-6 text-center">Why TravelEase?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">✈️</div>
              <h3 className="font-semibold text-primary-900 mb-2">TSA Compliant</h3>
              <p className="text-primary-600 text-sm">
                Smart liquid calculator ensures you stay within 1L limits
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-semibold text-primary-900 mb-2">Climate-Smart</h3>
              <p className="text-primary-600 text-sm">
                Get personalized product recommendations based on your destination's weather
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="font-semibold text-primary-900 mb-2">Premium Brands</h3>
              <p className="text-primary-600 text-sm">
                Curated selection from well-known, trusted brands
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-primary-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-primary-500">
            © 2026 TravelEase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
