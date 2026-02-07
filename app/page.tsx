<<<<<<< HEAD
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import DestinationSearch from '@/components/DestinationSearch';
=======
'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import DestinationSearch from '@/components/DestinationSearch';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Wind, 
  Droplets, 
  Zap,
  Plane, 
  MapPin, 
  Award,
  ArrowRight,
  Mail,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
>>>>>>> copilot/create-ecommerce-website

export default function Home() {
  const categories = [
    { 
      name: 'Skincare', 
      slug: 'skincare',
<<<<<<< HEAD
      emoji: '✨',
=======
      icon: Sparkles,
>>>>>>> copilot/create-ecommerce-website
      description: 'Face creams, sunscreen & more'
    },
    { 
      name: 'Haircare', 
      slug: 'haircare',
<<<<<<< HEAD
      emoji: '💆‍♀️',
=======
      icon: Wind,
>>>>>>> copilot/create-ecommerce-website
      description: 'Shampoo, conditioner & styling'
    },
    { 
      name: 'Personal Hygiene', 
      slug: 'personal hygiene',
<<<<<<< HEAD
      emoji: '🧼',
=======
      icon: Droplets,
>>>>>>> copilot/create-ecommerce-website
      description: 'Toothpaste, deodorant & essentials'
    },
    { 
      name: 'Cosmetics', 
      slug: 'cosmetics',
<<<<<<< HEAD
      emoji: '💄',
=======
      icon: Zap,
>>>>>>> copilot/create-ecommerce-website
      description: 'Makeup & beauty products'
    }
  ];

<<<<<<< HEAD
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
=======
  const features = [
    {
      icon: Plane,
      title: 'TSA Compliant',
      description: 'Smart liquid calculator ensures you stay within TSA\'s 1L limits. Travel stress-free knowing your carry-on is compliant.'
    },
    {
      icon: MapPin,
      title: 'Climate-Smart Recommendations',
      description: 'Get personalized product recommendations based on your destination\'s weather. Pack exactly what you need, nothing more.'
    },
    {
      icon: Award,
      title: 'Premium Brands',
      description: 'Curated selection from trusted brands like Nivea, Bioderma, Pantene, and more. Quality you can rely on.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B496510_1px,transparent_1px),linear-gradient(to_bottom,#1B496510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <Container className="relative py-20 sm:py-32">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block font-serif text-text mb-2">Travel Smart,</span>
              <span className="block text-primary-500 font-serif">
                Pack Light
              </span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Curated collection of premium travel-sized beauty and hygiene products
              from well-known brands for Nordic travelers
            </motion.p>
            
            {/* Destination Search */}
            <motion.div 
              className="mt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <DestinationSearch />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/products">
                <Button size="lg" variant="primary">
                  Shop All Products
                </Button>
              </Link>
              <Link href="#categories">
                <Button size="lg" variant="outline">
                  Browse by Category
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-text mb-4">Shop by Category</h2>
            <p className="text-lg text-text-secondary">Find everything you need for your journey</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/products?category=${encodeURIComponent(category.slug)}`}>
                    <Card hover className="group cursor-pointer">
                      <div className="aspect-[4/5] bg-gradient-to-br from-primary-50 to-accent-50 p-8 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow">
                          <Icon className="w-10 h-10 text-primary-500" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-text mb-2 group-hover:text-primary-500 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-text-secondary mb-4">{category.description}</p>
                        <div className="inline-flex items-center text-primary-500 font-semibold group-hover:gap-2 transition-all">
                          Shop now 
                          <ArrowRight className="w-5 h-5 ml-1 group-hover:ml-2 transition-all" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-secondary">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-text mb-4">Why TravelEase?</h2>
            <p className="text-lg text-text-secondary">Travel smarter with our unique features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={feature.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg mb-6">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 py-20">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%]"></div>
        <Container className="relative text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Ready to travel light?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Start building your perfect travel kit today
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50 hover:text-primary-700 shadow-lg">
              Browse Products
            </Button>
          </Link>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-text text-white">
        <Container className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">TravelEase</h3>
              <p className="text-gray-400 mb-6">
                Premium travel-sized products for modern travelers. Pack smart, travel light.
              </p>
              {/* Social links removed until actual profiles are available */}
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-bold text-lg mb-4">Shop</h4>
              <ul className="space-y-3">
                <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="/products?category=skincare" className="text-gray-400 hover:text-white transition-colors">Skincare</Link></li>
                <li><Link href="/products?category=haircare" className="text-gray-400 hover:text-white transition-colors">Haircare</Link></li>
                <li><Link href="/products?category=cosmetics" className="text-gray-400 hover:text-white transition-colors">Cosmetics</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-lg mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">Get travel tips and exclusive offers</p>
              <form onSubmit={(e) => { e.preventDefault(); /* Newsletter signup will be implemented */ }} className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  required
                  className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                />
                <button type="submit" className="w-12 h-12 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Subscribe">
                  <Mail className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span>© 2026 TravelEase. All rights reserved.</span>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <CreditCard className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-400">Secure Payments</span>
              </div>
            </div>
          </div>
        </Container>
>>>>>>> copilot/create-ecommerce-website
      </footer>
    </div>
  );
}
