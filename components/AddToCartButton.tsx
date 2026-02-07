'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAddToCart = async () => {
    if (product.stock < 1) return;

    setIsAdding(true);
    setMessage('');

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to add to cart');
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="text-lg font-semibold text-gray-900">
          Quantity:
        </label>
        <div className="flex items-center bg-white border-2 border-gray-200 rounded-full overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-5 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-bold text-xl"
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 text-center border-x-2 border-gray-200 py-3 text-lg font-bold text-gray-900 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-5 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-bold text-xl"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={isAdding || product.stock < 1}
          className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-4 px-8 rounded-full hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 text-lg"
        >
          {isAdding ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          ) : product.stock < 1 ? (
            'Out of Stock'
          ) : (
            'Add to Cart'
          )}
        </button>

        <button
          onClick={() => router.push('/cart')}
          className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:border-rose-500 hover:text-rose-600 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-center font-semibold ${
            message.includes('Failed')
              ? 'bg-red-50 text-red-700 border-2 border-red-200'
              : 'bg-green-50 text-green-700 border-2 border-green-200'
          }`}
        >
          {message.includes('Failed') ? (
            <span className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
              </svg>
              {message}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
              {message}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
