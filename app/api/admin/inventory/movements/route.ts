import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const stockMovementSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  type: z.enum(['purchase', 'sale', 'adjustment', 'return', 'write_off'], {
    message: 'Invalid movement type'
  }),
  quantity: z.number().int().refine(val => val !== 0, {
    message: 'Quantity cannot be zero'
  }),
  reference: z.string().optional(),
  notes: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = stockMovementSchema.parse(body);

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId },
      select: { id: true, stock: true, name: true }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Calculate new stock level
    const newStock = product.stock + validatedData.quantity;

    if (newStock < 0) {
      return NextResponse.json(
        { error: `Insufficient stock. Current: ${product.stock}, Requested: ${Math.abs(validatedData.quantity)}` },
        { status: 400 }
      );
    }

    // Determine new status based on stock level
    let newStatus: string | undefined;
    if (newStock === 0) {
      newStatus = 'out_of_stock';
    } else if (product.stock === 0 && newStock > 0) {
      // If stock was 0 and now increasing, set back to active
      newStatus = 'active';
    }

    // Create stock movement and update product stock in a transaction
    const updateData: { stock: number; status?: string } = { stock: newStock };
    if (newStatus) {
      updateData.status = newStatus;
    }

    const [movement, updatedProduct] = await prisma.$transaction([
      prisma.stockMovement.create({
        data: validatedData,
        include: {
          product: {
            select: { id: true, name: true, sku: true }
          }
        }
      }),
      prisma.product.update({
        where: { id: validatedData.productId },
        data: updateData
      })
    ]);

    return NextResponse.json({
      movement,
      updatedStock: updatedProduct.stock
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Create stock movement error:', error);
    return NextResponse.json(
      { error: 'Failed to create stock movement' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const productId = searchParams.get('productId') || '';
    const type = searchParams.get('type') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';

    const skip = (page - 1) * limit;

    const where: any = {};

    if (productId) {
      where.productId = productId;
    }

    if (type) {
      where.type = type;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    const [movements, total] = await Promise.all([
      prisma.stockMovement.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          product: {
            select: { 
              id: true, 
              name: true, 
              sku: true,
              stock: true
            }
          }
        }
      }),
      prisma.stockMovement.count({ where })
    ]);

    return NextResponse.json({
      movements,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('List stock movements error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock movements' },
      { status: 500 }
    );
  }
}
