'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
}

interface StockMovement {
  id: string;
  type: string;
  quantity: number;
  notes?: string;
  createdAt: string;
  product: Product;
}

const getMovementTypeColor = (type: string) => {
  switch (type) {
    case 'IN':
      return 'bg-green-100 text-green-800';
    case 'OUT':
      return 'bg-blue-100 text-blue-800';
    case 'DAMAGE':
      return 'bg-red-100 text-red-800';
    case 'RETURN':
      return 'bg-purple-100 text-purple-800';
    case 'ADJUSTMENT':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [lowStock, setLowStock] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    productId: '',
    type: 'IN',
    quantity: '',
    notes: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, movementsRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/stock-movements'),
      ]);

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
        setLowStock(productsData.filter((p: Product) => p.stock < 10));
      }

      if (movementsRes.ok) {
        setMovements(await movementsRes.json());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/stock-movements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          quantity: parseInt(formData.quantity),
        }),
      });

      if (response.ok) {
        alert('Stock movement recorded!');
        setFormData({ productId: '', type: 'IN', quantity: '', notes: '' });
        fetchData();
      } else {
        alert('Error recording stock movement');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error recording stock movement');
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Inventory Management">
        <div className="text-center py-12">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Inventory Management">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Stock Movement Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Stock Movement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product *</label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} (Stock: {product.stock})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="IN">Stock In</option>
                  <option value="OUT">Stock Out</option>
                  <option value="ADJUSTMENT">Adjustment</option>
                  <option value="RETURN">Return</option>
                  <option value="DAMAGE">Damage/Loss</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Record Movement
              </button>
            </form>
          </div>
        </div>

        {/* Stock Overview and Movements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Low Stock Alerts */}
          {lowStock.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-orange-900 mb-4">
                ⚠️ Low Stock Alerts ({lowStock.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lowStock.map((product) => (
                  <div key={product.id} className="bg-white rounded p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sku}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.stock === 0
                        ? 'bg-red-100 text-red-800'
                        : product.stock < 5
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.stock} left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stock Overview Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Stock Overview</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{product.stock}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock === 0
                            ? 'bg-red-100 text-red-800'
                            : product.stock < 10
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Stock Movements */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Stock Movements</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {movements.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        No stock movements yet
                      </td>
                    </tr>
                  ) : (
                    movements.map((movement) => (
                      <tr key={movement.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(movement.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {movement.product.name}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getMovementTypeColor(movement.type)}`}>
                            {movement.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold">
                          <span className={movement.type === 'IN' ? 'text-green-600' : 'text-red-600'}>
                            {movement.type === 'IN' ? '+' : '-'}{movement.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {movement.notes || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
