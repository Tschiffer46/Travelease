// Core product interface for storefront (backward compatible)
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Skincare' | 'Haircare' | 'Hygiene' | 'Cosmetics';
  size: string;
  price: number; // SEK
  image?: string;
  description?: string;
  // Extended fields (optional for backward compatibility)
  sku?: string;
  slug?: string;
  shortDescription?: string;
  status?: string;
  featured?: boolean;
  stock?: number;
  compareAtPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

// Full PIM Product interface for admin
export interface PIMProduct {
  id: string;
  name: string;
  brand: string; // backward compat
  category: string; // backward compat
  description: string;
  size: string;
  sizeInMl: number | null;
  isLiquid: boolean;
  price: number;
  currency: string;
  imageUrl: string | null;
  images: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  
  // PIM fields
  sku: string;
  ean: string | null;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  status: string;
  featured: boolean;
  tags: string[];
  weight: number | null;
  dimensions: any;
  costPrice: number | null;
  compareAtPrice: number | null;
  taxRate: number;
  minOrderQuantity: number;
  maxOrderQuantity: number | null;
  countryOfOrigin: string | null;
  ingredients: string | null;
  warnings: string | null;
  shelfLife: string | null;
  isActive: boolean;
  sortOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
  
  // Relations
  supplierId: string | null;
  categoryId: string | null;
  brandId: string | null;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: any;
  paymentTerms: string | null;
  leadTimeDays: number | null;
  notes: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  website: string | null;
  logoUrl: string | null;
  countryOfOrigin: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
  createdAt: Date;
}

export interface VolumeDiscount {
  id: string;
  productId: string;
  minQuantity: number;
  maxQuantity: number | null;
  discountPercent: number | null;
  discountPrice: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceHistory {
  id: string;
  productId: string;
  price: number;
  costPrice: number | null;
  changedBy: string | null;
  reason: string | null;
  createdAt: Date;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: string;
  quantity: number;
  reference: string | null;
  notes: string | null;
  createdAt: Date;
}
