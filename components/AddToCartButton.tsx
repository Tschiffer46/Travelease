'use client';

import { useState } from 'react';

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
    <div>
      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="quantity" className="text-sm font-medium text-primary-900">
          Quantity:
        </label>
        <div className="flex items-center border border-primary-300 rounded-md">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-primary-700 hover:bg-primary-100"
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
            className="w-16 text-center border-x border-primary-300 py-2"
          />
          <button
            type="button"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-3 py-2 text-primary-700 hover:bg-primary-100"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isAdding || product.stock < 1}
        className="w-full bg-accent-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-accent-700 disabled:bg-primary-300 disabled:cursor-not-allowed transition-colors"
      >
        {isAdding ? 'Adding...' : product.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
      </button>

      {message && (
        <p
          className={`mt-2 text-sm ${
            message.includes('Failed') ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
