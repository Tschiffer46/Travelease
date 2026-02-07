'use client';

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/CartContext';

interface FeaturedShowcaseProps {
  products: Product[];
}

export default function FeaturedProductsShowcase({ products }: FeaturedShowcaseProps) {
  const { addToCart } = useCart();

  // Select a curated set of featured products
  const featuredProducts = products.slice(0, 8);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Optional: Show a toast notification
  };

  return (
    <section id="featured" className="py-20 bg-white">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-text mb-4">
            Featured Travel Essentials
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Handpicked selection of premium travel-sized products from trusted brands
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="h-full flex flex-col">
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
                  <div className="text-6xl">
                    {product.category === 'Skincare' && '🧴'}
                    {product.category === 'Haircare' && '💇'}
                    {product.category === 'Hygiene' && '🧼'}
                    {product.category === 'Cosmetics' && '💄'}
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-1">
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-2">{product.brand}</p>
                  <p className="text-xs text-text-tertiary mb-4">{product.size}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-primary-600">
                        {product.price} SEK
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
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

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a 
            href="#shop"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-full border-2 border-primary-500 text-primary-500 hover:bg-primary-50 transition-all duration-200"
          >
            View All Products
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
