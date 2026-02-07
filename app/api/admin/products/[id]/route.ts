import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  brand: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  size: z.string().min(1).optional(),
  sizeInMl: z.number().optional(),
  isLiquid: z.boolean().optional(),
  price: z.number().positive().optional(),
  costPrice: z.number().positive().optional(),
  compareAtPrice: z.number().positive().optional(),
  currency: z.string().optional(),
  category: z.string().min(1).optional(),
  status: z.enum(['draft', 'active', 'discontinued', 'out_of_stock']).optional(),
  stock: z.number().int().min(0).optional(),
  featured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  imageUrl: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  ean: z.string().optional(),
  weight: z.number().positive().optional(),
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    depth: z.number().positive()
  }).optional(),
  taxRate: z.number().optional(),
  minOrderQuantity: z.number().int().positive().optional(),
  maxOrderQuantity: z.number().int().positive().optional(),
  countryOfOrigin: z.string().optional(),
  ingredients: z.string().optional(),
  warnings: z.string().optional(),
  shelfLife: z.string().optional(),
  sortOrder: z.number().int().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  supplierId: z.string().optional(),
  categoryId: z.string().optional(),
  brandId: z.string().optional()
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        supplier: true,
        categoryRel: true,
        brandRel: true,
        productImages: {
          orderBy: { sortOrder: 'asc' }
        },
        volumeDiscounts: {
          where: { isActive: true },
          orderBy: { minQuantity: 'asc' }
        },
        priceHistory: {
          orderBy: { createdAt: 'desc' },
          take: 20
        },
        stockMovements: {
          orderBy: { createdAt: 'desc' },
          take: 50
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateProductSchema.parse(body);

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if SKU is being changed and if it conflicts
    if (validatedData.sku && validatedData.sku !== existingProduct.sku) {
      const skuConflict = await prisma.product.findFirst({
        where: { sku: validatedData.sku, NOT: { id } }
      });

      if (skuConflict) {
        return NextResponse.json(
          { error: 'SKU already exists' },
          { status: 400 }
        );
      }
    }

    // Check if slug is being changed and if it conflicts
    if (validatedData.slug && validatedData.slug !== existingProduct.slug) {
      const slugConflict = await prisma.product.findFirst({
        where: { slug: validatedData.slug, NOT: { id } }
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    // Create price history entry if price changed
    if (validatedData.price && validatedData.price !== existingProduct.price) {
      await prisma.priceHistory.create({
        data: {
          productId: id,
          price: validatedData.price,
          costPrice: validatedData.costPrice ?? existingProduct.costPrice,
          reason: 'Price update'
        }
      });
    }

    const product = await prisma.product.update({
      where: { id },
      data: validatedData,
      include: {
        supplier: true,
        categoryRel: true,
        brandRel: true,
        productImages: true,
        volumeDiscounts: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Soft delete by setting isActive to false
    await prisma.product.update({
      where: { id },
      data: { 
        isActive: false,
        status: 'discontinued'
      }
    });

    return NextResponse.json({ 
      message: 'Product soft deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
