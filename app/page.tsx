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
  Facebook,
  Instagram,
  Twitter,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

export default function Home() {
  const categories = [
    { 
      name: 'Skincare', 
      slug: 'skincare',
      icon: Sparkles,
      description: 'Face creams, sunscreen & more'
    },
    { 
      name: 'Haircare', 
      slug: 'haircare',
      icon: Wind,
      description: 'Shampoo, conditioner & styling'
    },
    { 
      name: 'Personal Hygiene', 
      slug: 'personal hygiene',
      icon: Droplets,
      description: 'Toothpaste, deodorant & essentials'
    },
    { 
      name: 'Cosmetics', 
      slug: 'cosmetics',
      icon: Zap,
      description: 'Makeup & beauty products'
    }
  ];

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
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
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
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                />
                <button className="w-12 h-12 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Subscribe">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
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
      </footer>
    </div>
  );
}
