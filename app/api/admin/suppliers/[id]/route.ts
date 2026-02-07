import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const updateSupplierSchema = z.object({
  name: z.string().min(1).optional(),
  contactPerson: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  website: z.string().url().nullable().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string()
  }).nullable().optional(),
  paymentTerms: z.string().nullable().optional(),
  leadTimeDays: z.number().int().positive().nullable().optional(),
  notes: z.string().nullable().optional(),
  isActive: z.boolean().optional()
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateSupplierSchema.parse(body);

    // Check if supplier exists
    const existingSupplier = await prisma.supplier.findUnique({
      where: { id }
    });

    if (!existingSupplier) {
      return NextResponse.json(
        { error: 'Supplier not found' },
        { status: 404 }
      );
    }

    const updateData: any = { ...validatedData };
    if (validatedData.address !== undefined) {
      updateData.address = validatedData.address;
    }

    const supplier = await prisma.supplier.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(supplier);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Update supplier error:', error);
    return NextResponse.json(
      { error: 'Failed to update supplier' },
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

    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    if (!supplier) {
      return NextResponse.json(
        { error: 'Supplier not found' },
        { status: 404 }
      );
    }

    if (supplier._count.products > 0) {
      return NextResponse.json(
        { error: 'Cannot delete supplier with products' },
        { status: 400 }
      );
    }

    await prisma.supplier.delete({
      where: { id }
    });

    return NextResponse.json({ 
      message: 'Supplier deleted successfully'
    });
  } catch (error) {
    console.error('Delete supplier error:', error);
    return NextResponse.json(
      { error: 'Failed to delete supplier' },
      { status: 500 }
    );
  }
}
