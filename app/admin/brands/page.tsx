'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  _count?: { products: number };
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    logoUrl: '',
    website: '',
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/admin/brands');
      if (response.ok) {
        setBrands(await response.json());
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/brands/${editingId}` : '/api/admin/brands';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editingId ? 'Brand updated!' : 'Brand created!');
        setShowModal(false);
        setEditingId(null);
        setFormData({ name: '', slug: '', description: '', logoUrl: '', website: '' });
        fetchBrands();
      } else {
        alert('Error saving brand');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving brand');
    }
  };

  const handleEdit = (brand: Brand) => {
    setEditingId(brand.id);
    setFormData({
      name: brand.name,
      slug: brand.slug,
      description: brand.description || '',
      logoUrl: brand.logoUrl || '',
      website: brand.website || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;

    try {
      const response = await fetch(`/api/admin/brands/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Brand deleted!');
        fetchBrands();
      } else {
        alert('Error deleting brand');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting brand');
    }
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({ name: '', slug: '', description: '', logoUrl: '', website: '' });
    setShowModal(true);
  };

  if (loading) {
    return (
      <AdminLayout title="Brands">
        <div className="text-center py-12">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Brands"
      actions={
        <button
          onClick={openNewModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Brand
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No brands yet
          </div>
        ) : (
          brands.map((brand) => (
            <div key={brand.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {brand.logoUrl ? (
                    <img src={brand.logoUrl} alt={brand.name} className="w-12 h-12 rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center text-blue-600 font-bold">
                      {brand.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                    <p className="text-xs text-gray-500">{brand._count?.products || 0} products</p>
                  </div>
                </div>
              </div>

              {brand.description && (
                <p className="text-sm text-gray-600 mb-3">{brand.description}</p>
              )}

              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline block mb-3"
                >
                  {brand.website}
                </a>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  onClick={() => handleEdit(brand)}
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Brand' : 'New Brand'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                <input
                  type="url"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
