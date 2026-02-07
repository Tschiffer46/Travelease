import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  parentId: z.string().optional(),
  imageUrl: z.string().url().optional(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true)
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeInactive = searchParams.get('includeInactive') === 'true';

    const where = includeInactive ? {} : { isActive: true };

    // Get all categories with their children
    const categories = await prisma.category.findMany({
      where: { ...where, parentId: null },
      orderBy: { sortOrder: 'asc' },
      include: {
        children: {
          where,
          orderBy: { sortOrder: 'asc' },
          include: {
            children: {
              where,
              orderBy: { sortOrder: 'asc' },
              include: {
                _count: {
                  select: { products: true }
                }
              }
            },
            _count: {
              select: { products: true }
            }
          }
        },
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('List categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = categorySchema.parse(body);

    // Check if slug already exists
    const existingSlug = await prisma.category.findUnique({
      where: { slug: validatedData.slug }
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    // Validate parent exists if parentId is provided
    if (validatedData.parentId) {
      const parent = await prisma.category.findUnique({
        where: { id: validatedData.parentId }
      });

      if (!parent) {
        return NextResponse.json(
          { error: 'Parent category not found' },
          { status: 400 }
        );
      }
    }

    const category = await prisma.category.create({
      data: validatedData,
      include: {
        parent: true,
        children: true,
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
