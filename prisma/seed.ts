import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  // Create products
  const products = [
    // Skincare
    {
      name: 'Moisturizing Face Cream',
      brand: 'Nivea',
      description: 'Hydrating face cream perfect for travel. Keeps skin soft and moisturized.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 89.00,
      currency: 'SEK',
      category: 'skincare',
      stock: 50,
    },
    {
      name: 'Sunscreen SPF 50',
      brand: 'La Roche-Posay',
      description: 'Travel-sized sunscreen for sensitive skin. Water-resistant formula.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 149.00,
      currency: 'SEK',
      category: 'skincare',
      stock: 40,
    },
    {
      name: 'Micellar Water',
      brand: 'Bioderma',
      description: 'Gentle makeup remover and cleanser in travel size.',
      size: '100ml',
      sizeInMl: 100,
      isLiquid: true,
      price: 79.00,
      currency: 'SEK',
      category: 'skincare',
      stock: 60,
    },
    {
      name: 'Lip Balm SPF 15',
      brand: 'Blistex',
      description: 'Protective lip balm with sun protection.',
      size: '4.25g',
      sizeInMl: null,
      isLiquid: false,
      price: 39.00,
      currency: 'SEK',
      category: 'skincare',
      stock: 100,
    },

    // Haircare
    {
      name: 'Travel Shampoo',
      brand: 'Pantene',
      description: 'Nourishing shampoo in travel-friendly size.',
      size: '90ml',
      sizeInMl: 90,
      isLiquid: true,
      price: 49.00,
      currency: 'SEK',
      category: 'haircare',
      stock: 75,
    },
    {
      name: 'Travel Conditioner',
      brand: 'Pantene',
      description: 'Moisturizing conditioner for all hair types.',
      size: '90ml',
      sizeInMl: 90,
      isLiquid: true,
      price: 49.00,
      currency: 'SEK',
      category: 'haircare',
      stock: 75,
    },
    {
      name: 'Dry Shampoo',
      brand: 'Batiste',
      description: 'Convenient dry shampoo spray for quick refreshes.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 59.00,
      currency: 'SEK',
      category: 'haircare',
      stock: 45,
    },
    {
      name: 'Hair Brush - Compact',
      brand: 'Tangle Teezer',
      description: 'Compact hair brush perfect for travel.',
      size: 'Compact',
      sizeInMl: null,
      isLiquid: false,
      price: 119.00,
      currency: 'SEK',
      category: 'haircare',
      stock: 30,
    },

    // Personal Hygiene
    {
      name: 'Travel Toothpaste',
      brand: 'Colgate',
      description: 'Fluoride toothpaste in TSA-approved size.',
      size: '75ml',
      sizeInMl: 75,
      isLiquid: true,
      price: 29.00,
      currency: 'SEK',
      category: 'personal hygiene',
      stock: 120,
    },
    {
      name: 'Compact Toothbrush',
      brand: 'Oral-B',
      description: 'Folding travel toothbrush with protective case.',
      size: 'Compact',
      sizeInMl: null,
      isLiquid: false,
      price: 49.00,
      currency: 'SEK',
      category: 'personal hygiene',
      stock: 80,
    },
    {
      name: 'Hand Sanitizer',
      brand: 'Dax',
      description: 'Antibacterial hand gel in travel size.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 25.00,
      currency: 'SEK',
      category: 'personal hygiene',
      stock: 150,
    },
    {
      name: 'Deodorant Roll-On',
      brand: 'Nivea',
      description: 'Travel-sized roll-on deodorant.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 39.00,
      currency: 'SEK',
      category: 'personal hygiene',
      stock: 90,
    },
    {
      name: 'Wet Wipes Pack',
      brand: 'Huggies',
      description: 'Convenient pack of cleansing wipes.',
      size: '20 wipes',
      sizeInMl: null,
      isLiquid: false,
      price: 35.00,
      currency: 'SEK',
      category: 'personal hygiene',
      stock: 100,
    },

    // Cosmetics
    {
      name: 'BB Cream SPF 30',
      brand: 'Garnier',
      description: 'All-in-one beauty balm with sun protection.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 99.00,
      currency: 'SEK',
      category: 'cosmetics',
      stock: 55,
    },
    {
      name: 'Mascara Mini',
      brand: 'Maybelline',
      description: 'Travel-sized mascara for voluminous lashes.',
      size: '4ml',
      sizeInMl: 4,
      isLiquid: true,
      price: 79.00,
      currency: 'SEK',
      category: 'cosmetics',
      stock: 70,
    },
    {
      name: 'Lip Gloss',
      brand: 'MAC',
      description: 'Moisturizing lip gloss with shine.',
      size: '5ml',
      sizeInMl: 5,
      isLiquid: true,
      price: 149.00,
      currency: 'SEK',
      category: 'cosmetics',
      stock: 40,
    },
    {
      name: 'Makeup Remover Wipes',
      brand: 'Simple',
      description: 'Gentle makeup remover wipes for sensitive skin.',
      size: '25 wipes',
      sizeInMl: null,
      isLiquid: false,
      price: 45.00,
      currency: 'SEK',
      category: 'cosmetics',
      stock: 85,
    },
    {
      name: 'Compact Mirror',
      brand: 'Travel Essential',
      description: 'Small folding mirror perfect for on-the-go touch-ups.',
      size: 'Pocket size',
      sizeInMl: null,
      isLiquid: false,
      price: 59.00,
      currency: 'SEK',
      category: 'cosmetics',
      stock: 50,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('Seeding completed successfully!');
  console.log(`Created ${products.length} products`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
