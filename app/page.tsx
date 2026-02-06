import Link from 'next/link';

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
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">
                Where are you traveling?
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g., Barcelona in July"
                  className="flex-1 px-4 py-3 border border-primary-300 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-accent-600 text-white font-medium rounded-md hover:bg-accent-700 transition-colors">
                  Get Recommendations
                </button>
              </div>
            </div>
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
