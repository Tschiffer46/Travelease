import Link from 'next/link';
import Navigation from '@/components/Navigation';
import DestinationSearch from '@/components/DestinationSearch';

export default function Home() {
  const categories = [
    { 
      name: 'Skincare', 
      slug: 'skincare',
      emoji: '✨',
      description: 'Face creams, sunscreen & more'
    },
    { 
      name: 'Haircare', 
      slug: 'haircare',
      emoji: '💆‍♀️',
      description: 'Shampoo, conditioner & styling'
    },
    { 
      name: 'Personal Hygiene', 
      slug: 'personal hygiene',
      emoji: '🧼',
      description: 'Toothpaste, deodorant & essentials'
    },
    { 
      name: 'Cosmetics', 
      slug: 'cosmetics',
      emoji: '💄',
      description: 'Makeup & beauty products'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-white opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block text-gray-900">Travel Smart,</span>
              <span className="block bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                Pack Light
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Curated collection of premium travel-sized beauty and hygiene products
              from well-known brands for Nordic travelers
            </p>
            
            {/* Destination Search */}
            <div className="mt-12 max-w-2xl mx-auto">
              <DestinationSearch />
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Shop All Products
              </Link>
              <Link
                href="#categories"
                className="w-full sm:w-auto text-gray-700 px-10 py-4 rounded-full text-lg font-semibold border-2 border-gray-300 hover:border-rose-500 hover:text-rose-600 transition-all duration-200"
              >
                Browse by Category
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600">Find everything you need for your journey</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${encodeURIComponent(category.slug)}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-rose-50 to-pink-100 p-8 flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4">{category.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.description}</p>
                <div className="mt-4 inline-flex items-center text-rose-600 font-medium group-hover:gap-2 transition-all">
                  Shop now 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-1 group-hover:ml-2 transition-all">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why TravelEase?</h2>
            <p className="text-lg text-gray-600">Travel smarter with our unique features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white text-3xl mb-6">
                ✈️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">TSA Compliant</h3>
              <p className="text-gray-600 leading-relaxed">
                Smart liquid calculator ensures you stay within TSA's 1L limits. 
                Travel stress-free knowing your carry-on is compliant.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white text-3xl mb-6">
                🌍
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Climate-Smart Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized product recommendations based on your destination's 
                weather. Pack exactly what you need, nothing more.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white text-3xl mb-6">
                🌟
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Brands</h3>
              <p className="text-gray-600 leading-relaxed">
                Curated selection from trusted brands like Nivea, Bioderma, 
                Pantene, and more. Quality you can rely on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to travel light?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Start building your perfect travel kit today
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-rose-600 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              © 2026 TravelEase. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Premium travel-sized products for modern travelers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
