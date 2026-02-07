import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sku: z.string().min(1, 'SKU is required'),
  slug: z.string().min(1, 'Slug is required'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  size: z.string().min(1, 'Size is required'),
  sizeInMl: z.number().optional(),
  isLiquid: z.boolean().default(false),
  price: z.number().positive('Price must be positive'),
  costPrice: z.number().positive().optional(),
  compareAtPrice: z.number().positive().optional(),
  currency: z.string().default('SEK'),
  category: z.string().min(1, 'Category is required'),
  status: z.enum(['draft', 'active', 'discontinued', 'out_of_stock']).default('draft'),
  stock: z.number().int().min(0).default(0),
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  imageUrl: z.string().url().optional(),
  images: z.array(z.string().url()).default([]),
  tags: z.array(z.string()).default([]),
  ean: z.string().optional(),
  weight: z.number().positive().optional(),
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    depth: z.number().positive()
  }).optional(),
  taxRate: z.number().default(25),
  minOrderQuantity: z.number().int().positive().default(1),
  maxOrderQuantity: z.number().int().positive().optional(),
  countryOfOrigin: z.string().optional(),
  ingredients: z.string().optional(),
  warnings: z.string().optional(),
  shelfLife: z.string().optional(),
  sortOrder: z.number().int().default(0),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  supplierId: z.string().optional(),
  categoryId: z.string().optional(),
  brandId: z.string().optional()
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || '';
    const brand = searchParams.get('brand') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (status) {
      where.status = status;
    }

    if (category) {
      where.categoryId = category;
    }

    if (brand) {
      where.brandId = brand;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          supplier: { select: { id: true, name: true } },
          categoryRel: { select: { id: true, name: true, slug: true } },
          brandRel: { select: { id: true, name: true, slug: true } },
          productImages: {
            orderBy: { sortOrder: 'asc' },
            take: 1
          }
        }
      }),
      prisma.product.count({ where })
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('List products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = productSchema.parse(body);

    // Check if SKU already exists
    const existingSku = await prisma.product.findUnique({
      where: { sku: validatedData.sku }
    });

    if (existingSku) {
      return NextResponse.json(
        { error: 'SKU already exists' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingSlug = await prisma.product.findUnique({
      where: { slug: validatedData.slug }
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: validatedData,
      include: {
        supplier: true,
        categoryRel: true,
        brandRel: true,
        productImages: true
      }
    });

    // Create initial price history entry
    await prisma.priceHistory.create({
      data: {
        productId: product.id,
        price: product.price,
        costPrice: product.costPrice,
        reason: 'Initial price'
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
