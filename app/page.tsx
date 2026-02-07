'use client';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedProductsShowcase from '@/components/FeaturedProductsShowcase';
import AirportRulesSection from '@/components/AirportRulesSection';
import DestinationInspirationSection from '@/components/DestinationInspirationSection';
import ShopSection from '@/components/ShopSection';
import ShoppingCart from '@/components/ShoppingCart';
import BackToTop from '@/components/BackToTop';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { Mail, CreditCard, ShieldCheck } from 'lucide-react';
import { products } from '@/lib/products';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Showcase */}
      <FeaturedProductsShowcase products={products} />

      {/* European Airport Liquid Rules */}
      <AirportRulesSection />

      {/* Destination Inspiration */}
      <DestinationInspirationSection />

      {/* Shop Section */}
      <ShopSection products={products} />

      {/* Shopping Cart (Floating) */}
      <ShoppingCart />

      {/* Back to Top Button */}
      <BackToTop />

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
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-bold text-lg mb-4">Shop</h4>
              <ul className="space-y-3">
                <li><a href="#shop" className="text-gray-400 hover:text-white transition-colors">All Products</a></li>
                <li><a href="#featured" className="text-gray-400 hover:text-white transition-colors">Featured</a></li>
                <li><a href="#airport-rules" className="text-gray-400 hover:text-white transition-colors">Airport Rules</a></li>
                <li><a href="#destination" className="text-gray-400 hover:text-white transition-colors">Destination Guide</a></li>
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
              <form onSubmit={(e) => { e.preventDefault(); }} className="flex gap-2">
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
      </footer>
    </div>
  );
}
