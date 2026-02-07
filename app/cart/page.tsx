'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
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
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-rose-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600 text-lg">Loading your cart...</p>
          </div>
        </div>
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
  const hasItemsOver100ml = liquidItems.some(item => (item.product.sizeInMl || 0) > 100);
  const exceeds1L = totalLiquidMl > 1000;
  const warning = totalLiquidMl > 800 && !exceeds1L;

  const cartTotal = cart?.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;
  const isEmpty = !cart?.items || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-lg text-gray-600">
            {isEmpty ? 'Your cart is empty' : `${cart.items.length} item${cart.items.length !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {isEmpty ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">Start shopping and add some products to your cart</p>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-rose-500 to-pink-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center overflow-hidden">
                        {item.product.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-5xl opacity-20">🧴</span>
                        )}
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.product.id}`}>
                        <p className="text-xs font-bold text-rose-600 uppercase tracking-wide mb-1">
                          {item.product.brand}
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-rose-600 transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>

                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          {item.product.size}
                        </span>
                        {item.product.isLiquid && (
                          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                            💧 Liquid
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(item.product.price * item.quantity, item.product.currency)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-gray-100 rounded-full">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
                            >
                              −
                            </button>
                            <span className="px-4 py-2 font-bold text-gray-900 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Remove item"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar - Summary & TSA Calculator */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatPrice(cartTotal, 'SEK')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(cartTotal, 'SEK')}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-full text-lg font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 mb-4">
                  Proceed to Checkout
                </button>

                <Link href="/products" className="block text-center text-gray-600 hover:text-rose-600 transition-colors font-medium">
                  Continue Shopping
                </Link>
              </div>

              {/* TSA Liquid Calculator */}
              {liquidItems.length > 0 && (
                <div className={`rounded-2xl shadow-lg p-6 ${
                  exceeds1L || hasItemsOver100ml 
                    ? 'bg-red-50 border-2 border-red-200' 
                    : warning 
                    ? 'bg-yellow-50 border-2 border-yellow-200' 
                    : 'bg-green-50 border-2 border-green-200'
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-3xl">✈️</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">TSA Liquid Calculator</h3>
                      <p className="text-sm text-gray-700">
                        Track your liquid volume for carry-on compliance
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-gray-700">Total Liquid Volume</span>
                      <span className="font-bold text-gray-900">{formatLiquidVolume(totalLiquidMl)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          exceeds1L 
                            ? 'bg-red-500' 
                            : warning 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((totalLiquidMl / 1000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0ml</span>
                      <span>1000ml (TSA limit)</span>
                    </div>
                  </div>

                  {exceeds1L && (
                    <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                      <p className="text-sm font-bold text-red-800">
                        ⚠️ Exceeds TSA 1L limit
                      </p>
                      <p className="text-xs text-red-700 mt-1">
                        Remove some liquid items to comply with carry-on regulations
                      </p>
                    </div>
                  )}

                  {hasItemsOver100ml && (
                    <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded mt-2">
                      <p className="text-sm font-bold text-red-800">
                        ⚠️ Contains items over 100ml
                      </p>
                      <p className="text-xs text-red-700 mt-1">
                        Individual containers must be 100ml or less
                      </p>
                    </div>
                  )}

                  {warning && !exceeds1L && !hasItemsOver100ml && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
                      <p className="text-sm font-bold text-yellow-800">
                        ⚠️ Approaching TSA limit
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        You have {(1000 - totalLiquidMl).toFixed(0)}ml remaining
                      </p>
                    </div>
                  )}

                  {!exceeds1L && !warning && !hasItemsOver100ml && (
                    <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
                      <p className="text-sm font-bold text-green-800">
                        ✓ TSA Compliant
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        Your liquids meet carry-on requirements
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
