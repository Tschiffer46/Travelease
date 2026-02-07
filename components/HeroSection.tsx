'use client';

import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B496510_1px,transparent_1px),linear-gradient(to_bottom,#1B496510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <Container className="relative py-20 sm:py-32">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary-500/10 text-primary-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Plane className="w-4 h-4" />
            <span className="text-sm font-semibold">Premium Travel-Sized Products</span>
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block font-serif text-text mb-2">Travel in Style,</span>
            <span className="block text-primary-500 font-serif">
              Pack with TravelEase
            </span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Premium travel-sized beauty and hygiene products from well-known brands. 
            Everything you need for your journey, perfectly sized for carry-on luggage.
          </motion.p>

          <motion.div 
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="#shop"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Start Shopping
            </a>
            <a 
              href="#airport-rules"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-full border-2 border-primary-500 text-primary-500 hover:bg-primary-50 hover:border-primary-600 transition-all duration-200"
            >
              Learn Airport Rules
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
