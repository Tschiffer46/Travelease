'use client';

import Link from 'next/link';
<<<<<<< HEAD
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
=======
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
>>>>>>> copilot/create-ecommerce-website
              TravelEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
<<<<<<< HEAD
              className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
=======
              className="text-text-secondary hover:text-primary-500 transition-colors font-medium"
>>>>>>> copilot/create-ecommerce-website
            >
              Products
            </Link>
            <Link 
              href="/products?category=skincare" 
<<<<<<< HEAD
              className="text-gray-700 hover:text-rose-600 transition-colors"
=======
              className="text-text-secondary hover:text-primary-500 transition-colors"
>>>>>>> copilot/create-ecommerce-website
            >
              Skincare
            </Link>
            <Link 
              href="/products?category=haircare" 
<<<<<<< HEAD
              className="text-gray-700 hover:text-rose-600 transition-colors"
=======
              className="text-text-secondary hover:text-primary-500 transition-colors"
>>>>>>> copilot/create-ecommerce-website
            >
              Haircare
            </Link>
            <Link 
              href="/products?category=cosmetics" 
<<<<<<< HEAD
              className="text-gray-700 hover:text-rose-600 transition-colors"
=======
              className="text-text-secondary hover:text-primary-500 transition-colors"
>>>>>>> copilot/create-ecommerce-website
            >
              Cosmetics
            </Link>
            <Link 
              href="/cart" 
<<<<<<< HEAD
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-full transition-colors font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
=======
              className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 font-medium"
            >
              <ShoppingBag className="w-5 h-5" />
>>>>>>> copilot/create-ecommerce-website
              Cart
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
<<<<<<< HEAD
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
=======
            className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-primary-50 hover:text-primary-500 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
>>>>>>> copilot/create-ecommerce-website
          </button>
        </div>

        {/* Mobile menu */}
<<<<<<< HEAD
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
            <Link 
              href="/products" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Products
            </Link>
            <Link 
              href="/products?category=skincare" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Skincare
            </Link>
            <Link 
              href="/products?category=haircare" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Haircare
            </Link>
            <Link 
              href="/products?category=cosmetics" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cosmetics
            </Link>
            <Link 
              href="/cart" 
              className="block px-4 py-2 bg-rose-500 text-white rounded-lg text-center font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              View Cart
            </Link>
          </div>
        )}
=======
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
>>>>>>> copilot/create-ecommerce-website
      </div>
    </nav>
  );
}
