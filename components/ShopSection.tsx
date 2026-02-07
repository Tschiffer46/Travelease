'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Filter } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/CartContext';

interface ShopSectionProps {
  products: Product[];
}

export default function ShopSection({ products }: ShopSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { addToCart } = useCart();

  const categories = ['All', 'Skincare', 'Haircare', 'Hygiene', 'Cosmetics'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <section id="shop" className="py-20 bg-background-secondary">
      <Container>
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary-500/10 text-primary-700">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm font-semibold">Shop Our Collection</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-text mb-4">
            Browse All Products
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Find everything you need for your journey. All products are TSA-compliant 
            and perfectly sized for carry-on luggage.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mr-2">
            <Filter className="w-5 h-5 text-text-secondary" />
            <span className="font-semibold text-text-secondary">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-text-secondary hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card hover className="h-full flex flex-col">
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center relative">
                  <div className="text-6xl">
                    {product.category === 'Skincare' && '🧴'}
                    {product.category === 'Haircare' && '💇'}
                    {product.category === 'Hygiene' && '🧼'}
                    {product.category === 'Cosmetics' && '💄'}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 text-primary-600 shadow-sm">
                      {product.size}
                    </span>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-text mb-1 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3 font-semibold">{product.brand}</p>
                  
                  {product.description && (
                    <p className="text-xs text-text-tertiary mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-primary-600">
                        {product.price} <span className="text-base">SEK</span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-text-secondary">No products found in this category.</p>
          </div>
        )}
      </Container>
    </section>
  );
}
