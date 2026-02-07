import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const DAYS_BACK = 30; // Configurable reporting period
    const startDate = new Date(Date.now() - DAYS_BACK * 24 * 60 * 60 * 1000);

    const [
      totalProducts,
      activeProducts,
      draftProducts,
      discontinuedProducts,
      lowStockProducts,
      recentOrders,
      recentMovements,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: 'active' } }),
      prisma.product.count({ where: { status: 'draft' } }),
      prisma.product.count({ where: { status: 'discontinued' } }),
      prisma.product.count({ where: { stock: { lte: 10 }, status: 'active' } }),
      prisma.order.findMany({
        where: {
          status: { in: ['pending', 'processing', 'shipped'] },
          createdAt: { gte: startDate }
        },
        select: { total: true, createdAt: true }
      }),
      prisma.stockMovement.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          product: {
            select: { name: true, sku: true }
          }
        }
      })
    ]);

    const totalRevenue = recentOrders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = recentOrders.length > 0 ? totalRevenue / recentOrders.length : 0;

    return NextResponse.json({
      products: {
        total: totalProducts,
        active: activeProducts,
        draft: draftProducts,
        discontinued: discontinuedProducts,
        lowStock: lowStockProducts
      },
      revenue: {
        last30Days: totalRevenue,
        averageOrderValue,
        orderCount: recentOrders.length
      },
      recentStockMovements: recentMovements
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
