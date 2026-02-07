'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '../../../components/AdminLayout';

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

interface Supplier {
  id: string;
  name: string;
}

interface PriceHistory {
  id: string;
  price: number;
  createdAt: string;
}

interface StockMovement {
  id: string;
  type: string;
  quantity: number;
  notes?: string;
  createdAt: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    slug: '',
    status: 'draft',
    shortDescription: '',
    longDescription: '',
    price: '',
    costPrice: '',
    compareAtPrice: '',
    currency: 'USD',
    taxRate: '0',
    size: '',
    sizeInMl: '',
    weight: '',
    isLiquid: false,
    stock: '0',
    minOrderQuantity: '1',
    maxOrderQuantity: '999',
    categoryId: '',
    brandId: '',
    supplierId: '',
    countryOfOrigin: '',
    ingredients: '',
    warnings: '',
    shelfLife: '',
    metaTitle: '',
    metaDescription: '',
    tags: '',
  });

  useEffect(() => {
    fetchData();
  }, [productId]);

  const fetchData = async () => {
    try {
      const [productRes, categoriesRes, brandsRes, suppliersRes, priceHistoryRes, stockMovementsRes] = await Promise.all([
        fetch(`/api/admin/products/${productId}`),
        fetch('/api/admin/categories'),
        fetch('/api/admin/brands'),
        fetch('/api/admin/suppliers'),
        fetch(`/api/admin/products/${productId}/price-history`).catch(() => ({ ok: false })),
        fetch(`/api/admin/products/${productId}/stock-movements`).catch(() => ({ ok: false })),
      ]);

      if (productRes.ok) {
        const product = await productRes.json();
        setFormData({
          name: product.name || '',
          sku: product.sku || '',
          slug: product.slug || '',
          status: product.status || 'draft',
          shortDescription: product.shortDescription || '',
          longDescription: product.longDescription || '',
          price: product.price?.toString() || '',
          costPrice: product.costPrice?.toString() || '',
          compareAtPrice: product.compareAtPrice?.toString() || '',
          currency: product.currency || 'USD',
          taxRate: product.taxRate?.toString() || '0',
          size: product.size || '',
          sizeInMl: product.sizeInMl?.toString() || '',
          weight: product.weight?.toString() || '',
          isLiquid: product.isLiquid || false,
          stock: product.stock?.toString() || '0',
          minOrderQuantity: product.minOrderQuantity?.toString() || '1',
          maxOrderQuantity: product.maxOrderQuantity?.toString() || '999',
          categoryId: product.categoryId || '',
          brandId: product.brandId || '',
          supplierId: product.supplierId || '',
          countryOfOrigin: product.countryOfOrigin || '',
          ingredients: product.ingredients || '',
          warnings: product.warnings || '',
          shelfLife: product.shelfLife?.toString() || '',
          metaTitle: product.metaTitle || '',
          metaDescription: product.metaDescription || '',
          tags: product.tags || '',
        });
      }

      if (categoriesRes.ok) setCategories(await categoriesRes.json());
      if (brandsRes.ok) setBrands(await brandsRes.json());
      if (suppliersRes.ok) setSuppliers(await suppliersRes.json());
      if (priceHistoryRes.ok) setPriceHistory(await priceHistoryRes.json());
      if (stockMovementsRes.ok) setStockMovements(await stockMovementsRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData({ ...formData, slug });
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) || 0,
          costPrice: formData.costPrice ? parseFloat(formData.costPrice) : undefined,
          compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : undefined,
          taxRate: parseFloat(formData.taxRate) || 0,
          sizeInMl: formData.sizeInMl ? parseFloat(formData.sizeInMl) : undefined,
          weight: parseFloat(formData.weight) || 0,
          stock: parseInt(formData.stock) || 0,
          minOrderQuantity: parseInt(formData.minOrderQuantity) || 1,
          maxOrderQuantity: parseInt(formData.maxOrderQuantity) || 999,
          shelfLife: formData.shelfLife ? parseInt(formData.shelfLife) : undefined,
        }),
      });

      if (response.ok) {
        alert('Product updated successfully!');
        router.push('/admin/products');
      } else {
        const error = await response.json();
        alert('Error: ' + (error.error || 'Failed to update product'));
      }
    } catch (error) {
      alert('Error updating product');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'description', label: 'Description' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'physical', label: 'Physical' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'relations', label: 'Relations' },
    { id: 'details', label: 'Details' },
    { id: 'seo', label: 'SEO' },
    { id: 'history', label: 'History' },
  ];

  if (loading) {
    return (
      <AdminLayout title="Edit Product">
        <div className="text-center py-12">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Product">
      <div className="max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="discontinued">Discontinued</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={generateSlug}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Auto-generate
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'description' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
                  <textarea
                    value={formData.longDescription}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.costPrice}
                      onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Compare At Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.compareAtPrice}
                      onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.taxRate}
                    onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeTab === 'physical' && (
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isLiquid}
                      onChange={(e) => setFormData({ ...formData, isLiquid: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Is Liquid Product</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <input
                      type="text"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 50ml, 100g"
                    />
                  </div>

                  {formData.isLiquid && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Size in ML</label>
                      <input
                        type="number"
                        value={formData.sizeInMl}
                        onChange={(e) => setFormData({ ...formData, sizeInMl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (g)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Quantity</label>
                    <input
                      type="number"
                      value={formData.minOrderQuantity}
                      onChange={(e) => setFormData({ ...formData, minOrderQuantity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Order Quantity</label>
                    <input
                      type="number"
                      value={formData.maxOrderQuantity}
                      onChange={(e) => setFormData({ ...formData, maxOrderQuantity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'relations' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    value={formData.brandId}
                    onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                  <select
                    value={formData.supplierId}
                    onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country of Origin</label>
                  <input
                    type="text"
                    value={formData.countryOfOrigin}
                    onChange={(e) => setFormData({ ...formData, countryOfOrigin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                  <textarea
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="List ingredients separated by commas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Warnings</label>
                  <textarea
                    value={formData.warnings}
                    onChange={(e) => setFormData({ ...formData, warnings: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Life (days)</label>
                  <input
                    type="number"
                    value={formData.shelfLife}
                    onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.metaTitle.length}/60 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="travel, skincare, organic"
                  />
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Price History</h3>
                  {priceHistory.length === 0 ? (
                    <p className="text-gray-500 text-sm">No price history available</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {priceHistory.map((item) => (
                            <tr key={item.id}>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                {formData.currency} {item.price.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Stock Movement Log</h3>
                  {stockMovements.length === 0 ? (
                    <p className="text-gray-500 text-sm">No stock movements recorded</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Quantity</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {stockMovements.map((movement) => (
                            <tr key={movement.id}>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                {new Date(movement.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                                  movement.type === 'IN'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {movement.type}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-sm font-semibold">
                                {movement.type === 'IN' ? '+' : '-'}{movement.quantity}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-500">
                                {movement.notes || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 bg-white rounded-lg shadow p-6">
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
