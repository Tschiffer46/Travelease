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
      imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1620916297897-5be4e4c2f5c7?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1620916297897-5be4e4c2f5c7?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1610873167013-4b25a4f4f4e7?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1610873167013-4b25a4f4f4e7?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1608248597187-eb0c1f6970b7?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1608248597281-a434e9d3e0e0?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1608248597281-a434e9d3e0e0?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1628497446868-6e2b6b5e0c7f?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1616014434825-0c2c4a5bf6f7?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1584930448949-b0a9e0d2c05e?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1584930448949-b0a9e0d2c05e?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1603484477859-abe6a73f9366?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1621368683969-ff3aed76cfae?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1621368683969-ff3aed76cfae?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
      ],
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
      imageUrl: 'https://images.unsplash.com/photo-1585338107529-13aff131d4a5?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1585338107529-13aff131d4a5?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
      ],
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
