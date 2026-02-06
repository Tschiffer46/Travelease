'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: string;
  size: string;
  imageUrl: string | null;
  category: string;
}

interface Recommendations {
  categories: string[];
  reasoning: string;
  temperature?: number;
  humidity?: number;
}

export default function DestinationSearch() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    destination: string;
    month?: string;
    recommendations: Recommendations;
    products: Product[];
    weatherAvailable: boolean;
  } | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError('Please enter a destination');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-primary-900 mb-4">
          Where are you traveling?
        </h2>
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Barcelona in July"
            className="flex-1 px-4 py-3 border border-primary-300 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-accent-600 text-white font-medium rounded-md hover:bg-accent-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Get Recommendations'}
          </button>
        </form>
        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Weather Info */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-primary-900 mb-2">
              Traveling to {results.destination}
              {results.month && ` in ${results.month.charAt(0).toUpperCase() + results.month.slice(1)}`}
            </h3>
            
            {results.weatherAvailable && results.recommendations.temperature !== undefined && (
              <div className="flex gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌡️</span>
                  <div>
                    <p className="text-sm text-primary-600">Temperature</p>
                    <p className="text-lg font-semibold text-primary-900">
                      {results.recommendations.temperature.toFixed(1)}°C
                    </p>
                  </div>
                </div>
                {results.recommendations.humidity !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💧</span>
                    <div>
                      <p className="text-sm text-primary-600">Humidity</p>
                      <p className="text-lg font-semibold text-primary-900">
                        {results.recommendations.humidity}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <p className="text-primary-700 leading-relaxed">
              {results.recommendations.reasoning}
            </p>

            {!results.weatherAvailable && (
              <p className="mt-3 text-sm text-primary-600 italic">
                Note: Live weather data not available. Showing general recommendations.
              </p>
            )}
          </div>

          {/* Recommended Products */}
          <div>
            <h3 className="text-2xl font-bold text-primary-900 mb-4">
              Recommended Products
            </h3>
            
            {results.products.length === 0 ? (
              <p className="text-primary-600 text-center py-8">
                No products found for these categories.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="aspect-square bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-primary-400 text-sm">No image</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-primary-900 group-hover:text-accent-700">
                        {product.name}
                      </h4>
                      <p className="text-xs text-primary-500 mt-1">{product.brand}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-lg font-semibold text-primary-900">
                          {formatPrice(product.price, product.currency)}
                        </p>
                        <p className="text-sm text-primary-600">{product.size}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
