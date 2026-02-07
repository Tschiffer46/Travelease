'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Checkout coming soon! This is a demo implementation.');
  };

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Open cart"
      >
        <ShoppingBag className="w-7 h-7" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 w-7 h-7 bg-accent-500 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 lg:w-[28rem] bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-serif font-bold text-text">Shopping Cart</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close cart"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm text-text-secondary">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-text-secondary text-lg mb-2">Your cart is empty</p>
                    <p className="text-sm text-text-tertiary">Add some products to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-4 p-4 bg-background rounded-lg"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center text-3xl">
                          {item.category === 'Skincare' && '🧴'}
                          {item.category === 'Haircare' && '💇'}
                          {item.category === 'Hygiene' && '🧼'}
                          {item.category === 'Cosmetics' && '💄'}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-text text-sm line-clamp-2 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-text-secondary mb-2">
                            {item.brand} • {item.size}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-semibold text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-bold text-primary-600">
                              {item.price * item.quantity} SEK
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex-shrink-0 p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors self-start"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-gray-200 bg-background-secondary">
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-text-secondary mb-2">
                      <span>Subtotal</span>
                      <span>{totalPrice} SEK</span>
                    </div>
                    <div className="flex items-center justify-between text-text-secondary mb-2">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex items-center justify-between text-xl font-bold text-text pt-2 border-t border-gray-300">
                      <span>Total</span>
                      <span>{totalPrice} SEK</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-colors mb-3"
                  >
                    Checkout
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-sm text-text-secondary hover:text-red-600 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
