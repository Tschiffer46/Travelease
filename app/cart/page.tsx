'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice, calculateLiquidTotal, isWithinTSALimits, formatLiquidVolume } from '@/lib/utils';

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    currency: string;
    size: string;
    sizeInMl: number | null;
    isLiquid: boolean;
    imageUrl: string | null;
    stock: number;
  };
}

interface Cart {
  id: string;
  items: CartItem[];
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity }),
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await fetch(`/api/cart?itemId=${itemId}`, {
        method: 'DELETE',
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <p className="text-primary-600">Loading cart...</p>
      </div>
    );
  }

  const liquidItems = cart?.items.filter(item => item.product.isLiquid && item.product.sizeInMl) || [];
  const totalLiquidMl = calculateLiquidTotal(
    liquidItems.map(item => ({
      sizeInMl: item.product.sizeInMl || 0,
      quantity: item.quantity,
    }))
  );
  const tsaLimits = isWithinTSALimits(totalLiquidMl);

  const cartTotal = cart?.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Navigation */}
      <nav className="border-b border-primary-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-900">
              TravelEase
            </Link>
            <div className="flex items-baseline space-x-4">
              <Link href="/products" className="text-primary-700 hover:text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                Products
              </Link>
              <Link href="/cart" className="text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">Shopping Cart</h1>

        {!cart || cart.items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-primary-600 text-lg mb-4">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block bg-accent-600 text-white px-6 py-3 rounded-md hover:bg-accent-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent-100 to-accent-200 rounded-md flex items-center justify-center flex-shrink-0">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="text-xs text-primary-400">No image</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-primary-900">{item.product.name}</h3>
                        <p className="text-sm text-primary-600">{item.product.brand}</p>
                        <p className="text-sm text-primary-600 mt-1">{item.product.size}</p>
                        {item.product.isLiquid && item.product.sizeInMl && (
                          <span className="inline-block mt-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            Liquid ({item.product.sizeInMl}ml)
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary-900">
                          {formatPrice(item.product.price * item.quantity, item.product.currency)}
                        </p>
                        <p className="text-sm text-primary-600">
                          {formatPrice(item.product.price, item.product.currency)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-primary-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-primary-700 hover:bg-primary-100"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 border-x border-primary-300">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-3 py-1 text-primary-700 hover:bg-primary-100 disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-primary-900 mb-4">Order Summary</h2>

                {/* Liquid Calculator */}
                {liquidItems.length > 0 && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-md">
                    <h3 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"/>
                      </svg>
                      TSA Liquid Limits
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Total Liquids:</span>
                          <span className="font-medium">{formatLiquidVolume(totalLiquidMl)} / 1L</span>
                        </div>
                        <div className="w-full bg-primary-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              tsaLimits.isValid ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min((totalLiquidMl / 1000) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                      {!tsaLimits.isValid && (
                        <p className="text-xs text-red-600 font-medium">
                          ⚠️ Exceeds 1L TSA limit! Remove some liquid items.
                        </p>
                      )}
                      {liquidItems.some(item => (item.product.sizeInMl || 0) > 100) && (
                        <p className="text-xs text-yellow-600 font-medium">
                          ⚠️ Some items exceed 100ml per container limit
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-primary-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-primary-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-primary-200 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold text-primary-900">
                      <span>Total</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-accent-600 text-white text-center font-semibold py-3 px-6 rounded-md hover:bg-accent-700 transition-colors mb-3"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="block w-full text-center text-primary-700 hover:text-primary-900 font-medium py-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
