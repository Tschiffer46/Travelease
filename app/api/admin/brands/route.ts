import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const brandSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  countryOfOrigin: z.string().optional(),
  isActive: z.boolean().default(true)
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeInactive = searchParams.get('includeInactive') === 'true';

    const where = includeInactive ? {} : { isActive: true };

    const brands = await prisma.brand.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json({ brands });
  } catch (error) {
    console.error('List brands error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = brandSchema.parse(body);

    // Check if slug already exists
    const existingSlug = await prisma.brand.findUnique({
      where: { slug: validatedData.slug }
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const brand = await prisma.brand.create({
      data: validatedData,
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Create brand error:', error);
    return NextResponse.json(
      { error: 'Failed to create brand' },
      { status: 500 }
    );
  }
}
