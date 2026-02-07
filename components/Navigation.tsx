'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-lg shadow-md' 
        : 'bg-white/95 backdrop-blur-md shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-serif font-bold text-primary-500 transition-colors group-hover:text-primary-600">
              TravelEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-text-secondary hover:text-primary-500 transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              href="/products?category=skincare" 
              className="text-text-secondary hover:text-primary-500 transition-colors"
            >
              Skincare
            </Link>
            <Link 
              href="/products?category=haircare" 
              className="text-text-secondary hover:text-primary-500 transition-colors"
            >
              Haircare
            </Link>
            <Link 
              href="/products?category=cosmetics" 
              className="text-text-secondary hover:text-primary-500 transition-colors"
            >
              Cosmetics
            </Link>
            <Link 
              href="/cart" 
              className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 font-medium"
            >
              <ShoppingBag className="w-5 h-5" />
              Cart
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-primary-50 hover:text-primary-500 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-primary-100">
                <Link 
                  href="/products" 
                  className="block px-4 py-2 text-text-secondary hover:bg-primary-50 hover:text-primary-500 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Products
                </Link>
                <Link 
                  href="/products?category=skincare" 
                  className="block px-4 py-2 text-text-secondary hover:bg-primary-50 hover:text-primary-500 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Skincare
                </Link>
                <Link 
                  href="/products?category=haircare" 
                  className="block px-4 py-2 text-text-secondary hover:bg-primary-50 hover:text-primary-500 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Haircare
                </Link>
                <Link 
                  href="/products?category=cosmetics" 
                  className="block px-4 py-2 text-text-secondary hover:bg-primary-50 hover:text-primary-500 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cosmetics
                </Link>
                <Link 
                  href="/cart" 
                  className="block px-4 py-2 bg-primary-500 text-white rounded-lg text-center font-medium hover:bg-primary-600 transition-colors mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View Cart
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
