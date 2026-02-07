import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive PIM seeding...');

  // Clear existing data in correct order
  console.log('🗑️  Clearing existing data...');
  await prisma.stockMovement.deleteMany();
  await prisma.priceHistory.deleteMany();
  await prisma.volumeDiscount.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.supplier.deleteMany();

  // Create Suppliers
  console.log('📦 Creating suppliers...');
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'Nordic Beauty Distribution AB',
      contactPerson: 'Anna Svensson',
      email: 'anna@nordicbeauty.se',
      phone: '+46 8 123 456',
      website: 'https://nordicbeauty.se',
      address: {
        street: 'Storgatan 12',
        city: 'Stockholm',
        postalCode: '111 22',
        country: 'Sweden',
      },
      paymentTerms: 'Net 30',
      leadTimeDays: 7,
      notes: 'Primary supplier for European cosmetics brands',
      isActive: true,
    },
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      name: 'European Cosmetics Import Ltd',
      contactPerson: 'Lars Nilsson',
      email: 'lars@eurocosmetics.com',
      phone: '+46 31 789 012',
      website: 'https://eurocosmetics.com',
      address: {
        street: 'Vasagatan 45',
        city: 'Gothenburg',
        postalCode: '411 37',
        country: 'Sweden',
      },
      paymentTerms: 'Net 60',
      leadTimeDays: 14,
      notes: 'Specializes in French and Italian brands',
      isActive: true,
    },
  });

  const supplier3 = await prisma.supplier.create({
    data: {
      name: 'Scandinavian Health & Care AS',
      contactPerson: 'Erik Hansen',
      email: 'erik@scanhealth.no',
      phone: '+47 22 456 789',
      website: 'https://scanhealth.no',
      address: {
        street: 'Karl Johans gate 22',
        city: 'Oslo',
        postalCode: '0159',
        country: 'Norway',
      },
      paymentTerms: 'Net 30',
      leadTimeDays: 10,
      notes: 'Hygiene and personal care products',
      isActive: true,
    },
  });

  // Create Categories
  console.log('🏷️  Creating categories...');
  const skincare = await prisma.category.create({
    data: {
      name: 'Skincare',
      slug: 'skincare',
      description: 'Face and body skincare products for travel',
      sortOrder: 1,
      isActive: true,
    },
  });

  const haircare = await prisma.category.create({
    data: {
      name: 'Haircare',
      slug: 'haircare',
      description: 'Shampoos, conditioners and hair treatments',
      sortOrder: 2,
      isActive: true,
    },
  });

  const hygiene = await prisma.category.create({
    data: {
      name: 'Hygiene',
      slug: 'hygiene',
      description: 'Personal hygiene and cleansing products',
      sortOrder: 3,
      isActive: true,
    },
  });

  const cosmetics = await prisma.category.create({
    data: {
      name: 'Cosmetics',
      slug: 'cosmetics',
      description: 'Makeup and beauty products',
      sortOrder: 4,
      isActive: true,
    },
  });

  // Create Brands
  console.log('🏢 Creating brands...');
  const pantene = await prisma.brand.create({
    data: {
      name: 'Pantene',
      slug: 'pantene',
      description: 'Professional haircare products',
      website: 'https://pantene.com',
      countryOfOrigin: 'USA',
      isActive: true,
    },
  });

  const tresemme = await prisma.brand.create({
    data: {
      name: 'TRESemmé',
      slug: 'tresemme',
      description: 'Salon-quality haircare',
      website: 'https://tresemme.com',
      countryOfOrigin: 'USA',
      isActive: true,
    },
  });

  const nivea = await prisma.brand.create({
    data: {
      name: 'Nivea',
      slug: 'nivea',
      description: 'German skincare and personal care brand',
      website: 'https://nivea.com',
      countryOfOrigin: 'Germany',
      isActive: true,
    },
  });

  const dove = await prisma.brand.create({
    data: {
      name: 'Dove',
      slug: 'dove',
      description: 'Personal care products',
      website: 'https://dove.com',
      countryOfOrigin: 'UK',
      isActive: true,
    },
  });

  const colgate = await prisma.brand.create({
    data: {
      name: 'Colgate',
      slug: 'colgate',
      description: 'Oral care products',
      website: 'https://colgate.com',
      countryOfOrigin: 'USA',
      isActive: true,
    },
  });

  const laRochePosay = await prisma.brand.create({
    data: {
      name: 'La Roche-Posay',
      slug: 'la-roche-posay',
      description: 'Dermatological skincare',
      website: 'https://laroche-posay.com',
      countryOfOrigin: 'France',
      isActive: true,
    },
  });

  const burtsBees = await prisma.brand.create({
    data: {
      name: "Burt's Bees",
      slug: 'burts-bees',
      description: 'Natural personal care products',
      website: 'https://burtsbees.com',
      countryOfOrigin: 'USA',
      isActive: true,
    },
  });

  const loccitane = await prisma.brand.create({
    data: {
      name: "L'Occitane",
      slug: 'loccitane',
      description: 'French luxury skincare',
      website: 'https://loccitane.com',
      countryOfOrigin: 'France',
      isActive: true,
    },
  });

  const neutrogena = await prisma.brand.create({
    data: {
      name: 'Neutrogena',
      slug: 'neutrogena',
      description: 'Dermatologist-recommended skincare',
      website: 'https://neutrogena.com',
      countryOfOrigin: 'USA',
      isActive: true,
    },
  });

  const sensodyne = await prisma.brand.create({
    data: {
      name: 'Sensodyne',
      slug: 'sensodyne',
      description: 'Sensitive teeth toothpaste',
      website: 'https://sensodyne.com',
      countryOfOrigin: 'UK',
      isActive: true,
    },
  });

  const rituals = await prisma.brand.create({
    data: {
      name: 'Rituals',
      slug: 'rituals',
      description: 'Luxury home and body cosmetics',
      website: 'https://rituals.com',
      countryOfOrigin: 'Netherlands',
      isActive: true,
    },
  });

  const bioderma = await prisma.brand.create({
    data: {
      name: 'Bioderma',
      slug: 'bioderma',
      description: 'French dermatological skincare',
      website: 'https://bioderma.com',
      countryOfOrigin: 'France',
      isActive: true,
    },
  });

  const batiste = await prisma.brand.create({
    data: {
      name: 'Batiste',
      slug: 'batiste',
      description: 'Dry shampoo specialists',
      website: 'https://batiste.com',
      countryOfOrigin: 'UK',
      isActive: true,
    },
  });

  const moroccanoil = await prisma.brand.create({
    data: {
      name: 'Moroccanoil',
      slug: 'moroccanoil',
      description: 'Argan oil-infused haircare',
      website: 'https://moroccanoil.com',
      countryOfOrigin: 'Israel',
      isActive: true,
    },
  });

  const labello = await prisma.brand.create({
    data: {
      name: 'Labello',
      slug: 'labello',
      description: 'Lip care products',
      website: 'https://labello.com',
      countryOfOrigin: 'Germany',
      isActive: true,
    },
  });

  // Create Products
  console.log('🛍️  Creating products...');

  // Product 1: Pantene Shampoo
  const product1 = await prisma.product.create({
    data: {
      name: 'Pro-V Daily Moisture Renewal Shampoo',
      brand: 'Pantene',
      brandId: pantene.id,
      category: 'Haircare',
      categoryId: haircare.id,
      description: 'Nourishing shampoo for daily moisture. Professional formula that restores hair moisture balance.',
      shortDescription: 'Nourishing shampoo for daily moisture',
      longDescription: 'Pro-V Daily Moisture Renewal Shampoo is a professional-grade formula designed to restore your hair\'s natural moisture balance. Enriched with Pro-Vitamin B5, it provides lasting hydration while gently cleansing. Perfect for travel in TSA-compliant size.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 49.00,
      costPrice: 25.00,
      compareAtPrice: 59.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-HC-PAN-001',
      slug: 'pantene-pro-v-daily-moisture-shampoo-50ml',
      stock: 75,
      status: 'active',
      featured: true,
      tags: ['haircare', 'shampoo', 'moisture', 'travel-size'],
      weight: 60,
      dimensions: { width: 40, height: 120, depth: 30 },
      minOrderQuantity: 1,
      maxOrderQuantity: 20,
      countryOfOrigin: 'Germany',
      shelfLife: '36 months',
      isActive: true,
      sortOrder: 1,
      metaTitle: 'Pantene Pro-V Daily Moisture Shampoo 50ml | TravelEase',
      metaDescription: 'Travel-sized Pantene Pro-V shampoo for daily moisture. TSA-compliant 50ml bottle perfect for carry-on luggage.',
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400',
      images: ['https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400'],
    },
  });

  // Product 2: TRESemmé Shampoo
  const product2 = await prisma.product.create({
    data: {
      name: 'Keratin Smooth Shampoo',
      brand: 'TRESemmé',
      brandId: tresemme.id,
      category: 'Haircare',
      categoryId: haircare.id,
      description: 'Professional-quality keratin smoothing shampoo that tames frizz and adds shine.',
      shortDescription: 'Professional keratin smoothing shampoo',
      longDescription: 'TRESemmé Keratin Smooth Shampoo delivers salon-quality results at home. Infused with keratin and marula oil, it transforms dry, frizzy hair into smooth, manageable locks. Travel-friendly 50ml size.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 59.00,
      costPrice: 30.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-HC-TRE-001',
      slug: 'tresemme-keratin-smooth-shampoo-50ml',
      stock: 60,
      status: 'active',
      featured: true,
      tags: ['haircare', 'shampoo', 'keratin', 'frizz-control'],
      weight: 62,
      dimensions: { width: 42, height: 118, depth: 32 },
      minOrderQuantity: 1,
      countryOfOrigin: 'UK',
      shelfLife: '36 months',
      isActive: true,
      sortOrder: 2,
      metaTitle: 'TRESemmé Keratin Smooth Shampoo 50ml | TravelEase',
      metaDescription: 'Professional keratin smoothing shampoo in travel size. Tame frizz and add shine on the go.',
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1608248597187-eb0c1f6970b7?w=400',
      images: ['https://images.unsplash.com/photo-1608248597187-eb0c1f6970b7?w=400'],
    },
  });

  // Product 3: Nivea Body Lotion
  const product3 = await prisma.product.create({
    data: {
      name: 'Express Body Lotion',
      brand: 'Nivea',
      brandId: nivea.id,
      category: 'Skincare',
      categoryId: skincare.id,
      description: 'Fast-absorbing moisturizing body lotion for soft, hydrated skin.',
      shortDescription: 'Fast-absorbing moisturizing lotion',
      longDescription: 'Nivea Express Body Lotion provides instant hydration without the greasy feel. Enriched with deep moisture serum and sea minerals, it absorbs in seconds leaving skin soft and smooth. Perfect for post-flight skin revival.',
      size: '75ml',
      sizeInMl: 75,
      isLiquid: true,
      price: 45.00,
      costPrice: 22.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-SC-NIV-001',
      slug: 'nivea-express-body-lotion-75ml',
      stock: 85,
      status: 'active',
      featured: true,
      tags: ['skincare', 'body-lotion', 'moisturizer', 'fast-absorbing'],
      weight: 85,
      dimensions: { width: 45, height: 110, depth: 35 },
      minOrderQuantity: 1,
      countryOfOrigin: 'Germany',
      warnings: 'For external use only',
      shelfLife: '30 months',
      isActive: true,
      sortOrder: 3,
      metaTitle: 'Nivea Express Body Lotion 75ml | TravelEase',
      metaDescription: 'Fast-absorbing body lotion in travel-friendly size. Hydrate your skin on the go.',
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
      images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400'],
    },
  });

  // Product 4: Dove Body Wash
  const product4 = await prisma.product.create({
    data: {
      name: 'Deep Moisture Body Wash',
      brand: 'Dove',
      brandId: dove.id,
      category: 'Hygiene',
      categoryId: hygiene.id,
      description: 'Gentle cleansing body wash with moisturizing cream.',
      shortDescription: 'Gentle cleansing with moisturizing cream',
      longDescription: 'Dove Deep Moisture Body Wash combines gentle cleansers with NutriumMoisture technology to nourish deep into the surface layers of your skin. Travel-sized convenience without compromising on luxury.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 39.00,
      costPrice: 20.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-HY-DOV-001',
      slug: 'dove-deep-moisture-body-wash-50ml',
      stock: 90,
      status: 'active',
      featured: false,
      tags: ['hygiene', 'body-wash', 'moisturizing', 'gentle'],
      weight: 58,
      dimensions: { width: 38, height: 115, depth: 28 },
      minOrderQuantity: 1,
      countryOfOrigin: 'UK',
      warnings: 'Avoid contact with eyes',
      shelfLife: '36 months',
      isActive: true,
      sortOrder: 4,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
      images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400'],
    },
  });

  // Product 5: Colgate Toothpaste
  const product5 = await prisma.product.create({
    data: {
      name: 'Total Original Toothpaste',
      brand: 'Colgate',
      brandId: colgate.id,
      category: 'Hygiene',
      categoryId: hygiene.id,
      description: 'Complete protection for teeth and gums in travel-friendly size.',
      shortDescription: 'Complete oral protection',
      longDescription: 'Colgate Total Original provides 12-hour antibacterial protection for a healthier mouth. Fights plaque, gingivitis, and cavities while freshening breath. Perfect travel size for carry-on luggage.',
      size: '20ml',
      sizeInMl: 20,
      isLiquid: true,
      price: 25.00,
      costPrice: 12.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-HY-COL-001',
      slug: 'colgate-total-original-toothpaste-20ml',
      stock: 120,
      status: 'active',
      featured: false,
      tags: ['hygiene', 'toothpaste', 'oral-care', 'antibacterial'],
      weight: 25,
      dimensions: { width: 30, height: 100, depth: 25 },
      minOrderQuantity: 1,
      countryOfOrigin: 'USA',
      ingredients: 'Aqua, Hydrated Silica, Glycerin, Sorbitol, PVM/MA Copolymer, Sodium Lauryl Sulfate, Aroma, Cellulose Gum, Sodium Hydroxide, Carrageenan, Sodium Fluoride, Triclosan, Sodium Saccharin, Limonene, CI 77891',
      warnings: 'Keep out of reach of children under 6 years',
      shelfLife: '36 months',
      isActive: true,
      sortOrder: 5,
      supplierId: supplier3.id,
      imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400',
      images: ['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400'],
    },
  });

  // Product 6: La Roche-Posay Sunscreen
  const product6 = await prisma.product.create({
    data: {
      name: 'Anthelios UV Mune SPF50+',
      brand: 'La Roche-Posay',
      brandId: laRochePosay.id,
      category: 'Skincare',
      categoryId: skincare.id,
      description: 'Very high protection sunscreen with advanced UVA/UVB filters.',
      shortDescription: 'Very high sun protection SPF50+',
      longDescription: 'La Roche-Posay Anthelios UV Mune 400 offers the highest level of UVA protection available. Revolutionary UV Mune 400 technology protects against ultra-long UVA rays. Lightweight, non-greasy formula perfect for daily use during travel.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 129.00,
      costPrice: 70.00,
      compareAtPrice: 149.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-SC-LRP-001',
      slug: 'la-roche-posay-anthelios-uv-mune-spf50-50ml',
      stock: 40,
      status: 'active',
      featured: true,
      tags: ['skincare', 'sunscreen', 'spf50', 'uva-protection', 'dermatologist-tested'],
      weight: 65,
      dimensions: { width: 45, height: 125, depth: 32 },
      minOrderQuantity: 1,
      countryOfOrigin: 'France',
      ingredients: 'Aqua, Diisopropyl Adipate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Glycerin, Propanediol',
      warnings: 'Avoid contact with eyes. Keep out of sun if product is not fully absorbed.',
      shelfLife: '12M after opening',
      isActive: true,
      sortOrder: 6,
      supplierId: supplier2.id,
      imageUrl: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400',
      images: ['https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400'],
    },
  });

  // Product 7: Nivea Sun
  const product7 = await prisma.product.create({
    data: {
      name: 'Sun Protect & Moisture SPF30',
      brand: 'Nivea',
      brandId: nivea.id,
      category: 'Skincare',
      categoryId: skincare.id,
      description: 'Water-resistant sun protection with moisturizing formula.',
      shortDescription: 'Water-resistant sun protection SPF30',
      longDescription: 'Nivea Sun Protect & Moisture SPF30 provides immediate and effective UVA/UVB protection. The caring formula with Vitamin E helps to keep your skin moisturized and protected. Water-resistant for up to 40 minutes.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 69.00,
      costPrice: 35.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-SC-NIV-002',
      slug: 'nivea-sun-protect-moisture-spf30-50ml',
      stock: 70,
      status: 'active',
      featured: true,
      tags: ['skincare', 'sunscreen', 'spf30', 'water-resistant', 'moisturizing'],
      weight: 62,
      dimensions: { width: 42, height: 115, depth: 30 },
      minOrderQuantity: 1,
      countryOfOrigin: 'Germany',
      warnings: 'Avoid intensive midday sun. Keep babies and young children out of direct sunlight.',
      shelfLife: '12M after opening',
      isActive: true,
      sortOrder: 7,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400',
      images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400'],
    },
  });

  // Product 8: Burt's Bees Lip Balm
  const product8 = await prisma.product.create({
    data: {
      name: 'Beeswax Lip Balm',
      brand: "Burt's Bees",
      brandId: burtsBees.id,
      category: 'Skincare',
      categoryId: skincare.id,
      description: '100% natural moisturizing lip balm with beeswax and vitamin E.',
      shortDescription: '100% natural moisturizing lip balm',
      longDescription: "Burt's Bees Beeswax Lip Balm is made with responsibly sourced beeswax and nourishing botanical oils. This classic formula provides long-lasting moisturization while softening and soothing dry lips. Compact size perfect for travel.",
      size: '4.25g',
      sizeInMl: null,
      isLiquid: false,
      price: 59.00,
      costPrice: 28.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-SC-BUR-001',
      slug: 'burts-bees-beeswax-lip-balm-4g',
      stock: 100,
      status: 'active',
      featured: false,
      tags: ['skincare', 'lip-balm', 'natural', 'beeswax', 'moisturizing'],
      weight: 10,
      dimensions: { width: 20, height: 70, depth: 20 },
      minOrderQuantity: 1,
      maxOrderQuantity: 50,
      countryOfOrigin: 'USA',
      ingredients: 'Cera Alba (Beeswax), Cocos Nucifera (Coconut) Oil, Helianthus Annuus (Sunflower) Seed Oil, Mentha Piperita (Peppermint) Oil, Lanolin, Tocopherol, Rosmarinus Officinalis (Rosemary) Leaf Extract, Glycine Soja (Soybean) Oil, Canola Oil, Limonene',
      warnings: 'For external use only',
      shelfLife: '36 months',
      isActive: true,
      sortOrder: 8,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1610873167013-4b25a4f4f4e7?w=400',
      images: ['https://images.unsplash.com/photo-1610873167013-4b25a4f4f4e7?w=400'],
    },
  });

  // Product 9: L'Occitane Hand Cream
  const product9 = await prisma.product.create({
    data: {
      name: 'Shea Butter Hand Cream',
      brand: "L'Occitane",
      brandId: loccitane.id,
      category: 'Skincare',
      categoryId: skincare.id,
      description: 'Intensive hand moisturizer enriched with 20% shea butter.',
      shortDescription: 'Intensive shea butter hand moisturizer',
      longDescription: "L'Occitane Shea Butter Hand Cream is enriched with 20% organic shea butter, honey, and sweet almond extract. This rich, velvety cream penetrates quickly to protect, nourish and moisturize hands. Travel-friendly tube for on-the-go care.",
      size: '30ml',
      sizeInMl: 30,
      isLiquid: false,
      price: 99.00,
      costPrice: 55.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-SC-LOC-001',
      slug: 'loccitane-shea-butter-hand-cream-30ml',
      stock: 55,
      status: 'active',
      featured: true,
      tags: ['skincare', 'hand-cream', 'shea-butter', 'luxury', 'moisturizing'],
      weight: 40,
      dimensions: { width: 35, height: 100, depth: 25 },
      minOrderQuantity: 1,
      countryOfOrigin: 'France',
      ingredients: 'Aqua/Water, Butyrospermum Parkii (Shea) Butter, Glycerin, Dimethicone, Cetearyl Alcohol',
      warnings: 'For external use only',
      shelfLife: '36 months',
      isActive: true,
      sortOrder: 9,
      supplierId: supplier2.id,
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'],
    },
  });

  // Product 10: Neutrogena Hand Cream
  const product10 = await prisma.product.create({
    data: {
      name: 'Norwegian Formula Hand Cream',
      brand: 'Neutrogena',
      brandId: neutrogena.id,
      category: 'Skincare',
      categoryId: skincare.id,
      description: 'Clinically proven hand relief for very dry hands.',
      shortDescription: 'Clinically proven dry hand relief',
      longDescription: 'Neutrogena Norwegian Formula Hand Cream is a highly concentrated formula that provides immediate relief and lasting moisture for even the driest hands. Dermatologist recommended and fragrance-free.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: false,
      price: 65.00,
      costPrice: 32.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-SC-NEU-001',
      slug: 'neutrogena-norwegian-formula-hand-cream-50ml',
      stock: 65,
      status: 'active',
      featured: false,
      tags: ['skincare', 'hand-cream', 'fragrance-free', 'dermatologist-tested'],
      weight: 58,
      dimensions: { width: 40, height: 95, depth: 30 },
      minOrderQuantity: 1,
      countryOfOrigin: 'Norway',
      warnings: 'For external use only',
      shelfLife: '36 months',
      isActive: true,
      sortOrder: 10,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'],
    },
  });

  // Product 11: Dove Deodorant
  const product11 = await prisma.product.create({
    data: {
      name: 'Original Deodorant Roll-On',
      brand: 'Dove',
      brandId: dove.id,
      category: 'Hygiene',
      categoryId: hygiene.id,
      description: '48-hour protection with moisturizers.',
      shortDescription: '48-hour protection deodorant',
      longDescription: 'Dove Original Deodorant Roll-On provides 48-hour protection against sweat and odor. Contains Dove 1/4 moisturizing cream to help care for delicate underarm skin. Alcohol-free formula.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 35.00,
      costPrice: 18.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-HY-DOV-002',
      slug: 'dove-original-deodorant-roll-on-50ml',
      stock: 90,
      status: 'active',
      featured: false,
      tags: ['hygiene', 'deodorant', 'roll-on', '48h-protection'],
      weight: 58,
      dimensions: { width: 38, height: 105, depth: 32 },
      minOrderQuantity: 1,
      countryOfOrigin: 'UK',
      warnings: 'Avoid contact with eyes. For external use only.',
      shelfLife: '30 months',
      isActive: true,
      sortOrder: 11,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400',
      images: ['https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400'],
    },
  });

  // Product 12: Sensodyne Toothpaste
  const product12 = await prisma.product.create({
    data: {
      name: 'Sensitive Repair Toothpaste',
      brand: 'Sensodyne',
      brandId: sensodyne.id,
      category: 'Hygiene',
      categoryId: hygiene.id,
      description: 'Clinically proven sensitivity relief toothpaste.',
      shortDescription: 'Sensitive teeth protection',
      longDescription: 'Sensodyne Repair & Protect toothpaste can actually repair sensitive areas of your teeth. With twice daily brushing, its clinically proven formula with NovaMin builds a repairing layer over the vulnerable areas of your teeth.',
      size: '20ml',
      sizeInMl: 20,
      isLiquid: true,
      price: 29.00,
      costPrice: 15.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-HY-SEN-001',
      slug: 'sensodyne-sensitive-repair-toothpaste-20ml',
      stock: 110,
      status: 'active',
      featured: false,
      tags: ['hygiene', 'toothpaste', 'sensitive-teeth', 'oral-care'],
      weight: 26,
      dimensions: { width: 28, height: 95, depth: 22 },
      minOrderQuantity: 1,
      countryOfOrigin: 'UK',
      ingredients: 'Glycerin, PEG-8, Hydrated Silica, Calcium Sodium Phosphosilicate (Novamin), Cocamidopropyl Betaine, Sodium Methyl Cocoyl Taurate, Aroma, Titanium Dioxide, Carbomer, Sodium Fluoride, Sodium Saccharin, Limonene',
      warnings: 'Not suitable for children under 12 years',
      shelfLife: '36 months',
      isActive: true,
      sortOrder: 12,
      supplierId: supplier3.id,
      imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400',
      images: ['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400'],
    },
  });

  // Product 13: Rituals Shower Gel
  const product13 = await prisma.product.create({
    data: {
      name: 'The Ritual of Sakura Shower Gel',
      brand: 'Rituals',
      brandId: rituals.id,
      category: 'Hygiene',
      categoryId: hygiene.id,
      description: 'Refreshing cherry blossom and rice milk shower gel.',
      shortDescription: 'Cherry blossom shower gel',
      longDescription: 'The Ritual of Sakura Shower Gel transforms your daily shower into a moment of pure relaxation. Based on the ancient Japanese art of enjoying the beauty of cherry blossoms, this shower gel contains organic rice milk and cherry blossom.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 79.00,
      costPrice: 40.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-HY-RIT-001',
      slug: 'rituals-sakura-shower-gel-50ml',
      stock: 50,
      status: 'active',
      featured: true,
      tags: ['hygiene', 'shower-gel', 'cherry-blossom', 'luxury', 'relaxing'],
      weight: 60,
      dimensions: { width: 40, height: 110, depth: 30 },
      minOrderQuantity: 1,
      countryOfOrigin: 'Netherlands',
      warnings: 'Avoid contact with eyes',
      shelfLife: '30 months',
      isActive: true,
      sortOrder: 13,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
      images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400'],
    },
  });

  // Product 14: Bioderma Micellar Water
  const product14 = await prisma.product.create({
    data: {
      name: 'Micellar Water',
      brand: 'Bioderma',
      brandId: bioderma.id,
      category: 'Skincare',
      categoryId: skincare.id,
      description: 'Gentle makeup remover and cleanser for sensitive skin.',
      shortDescription: 'Gentle micellar makeup remover',
      longDescription: 'Bioderma Sensibio H2O is the first and only dermatological micellar water perfectly compatible with the skin. It removes makeup from face and eyes, and cleanses and soothes sensitive skin. No rinse required.',
      size: '100ml',
      sizeInMl: 100,
      isLiquid: true,
      price: 89.00,
      costPrice: 48.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-SC-BIO-001',
      slug: 'bioderma-sensibio-micellar-water-100ml',
      stock: 60,
      status: 'active',
      featured: false,
      tags: ['skincare', 'micellar-water', 'makeup-remover', 'sensitive-skin', 'dermatological'],
      weight: 105,
      dimensions: { width: 50, height: 130, depth: 35 },
      minOrderQuantity: 1,
      countryOfOrigin: 'France',
      ingredients: 'Water (Aqua), PEG-6 Caprylic/Capric Glycerides, Fructooligosaccharides, Mannitol, Xylitol, Rhamnose, Cucumis Sativus (Cucumber) Fruit Extract, Propylene Glycol, Cetrimonium Bromide, Disodium EDTA',
      warnings: 'Avoid contact with eyes',
      shelfLife: '12M after opening',
      isActive: true,
      sortOrder: 14,
      supplierId: supplier2.id,
      imageUrl: 'https://images.unsplash.com/photo-1620916297897-5be4e4c2f5c7?w=400',
      images: ['https://images.unsplash.com/photo-1620916297897-5be4e4c2f5c7?w=400'],
    },
  });

  // Product 15: Batiste Dry Shampoo
  const product15 = await prisma.product.create({
    data: {
      name: 'Dry Shampoo Fresh',
      brand: 'Batiste',
      brandId: batiste.id,
      category: 'Haircare',
      categoryId: haircare.id,
      description: 'Instant refresh between washes with fresh scent.',
      shortDescription: 'Instant hair refresh dry shampoo',
      longDescription: 'Batiste Dry Shampoo Fresh is perfect for refreshing your hair between washes. Its waterless formula with a hint of fragrance removes oil and grease, leaving hair feeling clean and fresh. TSA-friendly travel size.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: false, // Aerosol
      price: 49.00,
      costPrice: 24.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-HC-BAT-001',
      slug: 'batiste-dry-shampoo-fresh-50ml',
      stock: 45,
      status: 'active',
      featured: false,
      tags: ['haircare', 'dry-shampoo', 'quick-refresh', 'oil-control'],
      weight: 55,
      dimensions: { width: 35, height: 120, depth: 35 },
      minOrderQuantity: 1,
      countryOfOrigin: 'UK',
      warnings: 'Extremely flammable aerosol. Pressurized container. Keep away from heat and open flame.',
      shelfLife: '36 months',
      isActive: true,
      sortOrder: 15,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400',
      images: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400'],
    },
  });

  // Product 16: Nivea After Sun
  const product16 = await prisma.product.create({
    data: {
      name: 'After Sun Moisturizing Lotion',
      brand: 'Nivea',
      brandId: nivea.id,
      category: 'Skincare',
      categoryId: skincare.id,
      description: 'Soothing after-sun care with aloe vera.',
      shortDescription: 'Soothing after-sun lotion',
      longDescription: 'Nivea After Sun Moisturizing Lotion provides instant soothing and 48h moisture to sun-exposed skin. Enriched with Aloe Vera and Avocado Oil, it helps regenerate the skin after sun exposure.',
      size: '100ml',
      sizeInMl: 100,
      isLiquid: true,
      price: 59.00,
      costPrice: 30.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-SC-NIV-003',
      slug: 'nivea-after-sun-moisturizing-lotion-100ml',
      stock: 55,
      status: 'active',
      featured: false,
      tags: ['skincare', 'after-sun', 'aloe-vera', 'soothing', 'moisturizing'],
      weight: 110,
      dimensions: { width: 50, height: 135, depth: 38 },
      minOrderQuantity: 1,
      countryOfOrigin: 'Germany',
      warnings: 'For external use only',
      shelfLife: '12M after opening',
      isActive: true,
      sortOrder: 16,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
      images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400'],
    },
  });

  // Product 17: Nivea Men Deodorant
  const product17 = await prisma.product.create({
    data: {
      name: 'Men Sensitive Deodorant',
      brand: 'Nivea',
      brandId: nivea.id,
      category: 'Hygiene',
      categoryId: hygiene.id,
      description: 'Gentle protection for sensitive skin.',
      shortDescription: 'Gentle men\'s deodorant',
      longDescription: 'Nivea Men Sensitive Deodorant provides reliable protection without alcohol. Enriched with Chamomile extract, it cares for sensitive skin while providing 48h effective protection.',
      size: '50ml',
      sizeInMl: 50,
      isLiquid: true,
      price: 39.00,
      costPrice: 20.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-HY-NIV-001',
      slug: 'nivea-men-sensitive-deodorant-50ml',
      stock: 75,
      status: 'active',
      featured: false,
      tags: ['hygiene', 'deodorant', 'men', 'sensitive-skin', '48h-protection'],
      weight: 58,
      dimensions: { width: 38, height: 108, depth: 32 },
      minOrderQuantity: 1,
      countryOfOrigin: 'Germany',
      warnings: 'For external use only',
      shelfLife: '30 months',
      isActive: true,
      sortOrder: 17,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400',
      images: ['https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400'],
    },
  });

  // Product 18: Moroccanoil Treatment
  const product18 = await prisma.product.create({
    data: {
      name: 'Argan Oil Hair Treatment',
      brand: 'Moroccanoil',
      brandId: moroccanoil.id,
      category: 'Haircare',
      categoryId: haircare.id,
      description: 'Nourishing argan oil formula for all hair types.',
      shortDescription: 'Nourishing argan oil treatment',
      longDescription: 'Moroccanoil Treatment is the product that pioneered oil-infused hair care. This lightweight formula detangles, speeds up blow-dry time and boosts shine. Rich in argan oil, antioxidants, and vitamin E.',
      size: '25ml',
      sizeInMl: 25,
      isLiquid: true,
      price: 149.00,
      costPrice: 80.00,
      compareAtPrice: 169.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-HC-MOR-001',
      slug: 'moroccanoil-argan-oil-hair-treatment-25ml',
      stock: 30,
      status: 'active',
      featured: true,
      tags: ['haircare', 'argan-oil', 'hair-treatment', 'shine', 'luxury'],
      weight: 35,
      dimensions: { width: 30, height: 85, depth: 25 },
      minOrderQuantity: 1,
      maxOrderQuantity: 10,
      countryOfOrigin: 'Israel',
      ingredients: 'Cyclopentasiloxane, Dimethicone, Cyclomethicone, Butylphenyl Methylpropional, Argania Spinosa Kernel Oil, Linseed (Linum Usitatissimum) Extract, Fragrance (Parfum)',
      warnings: 'For external use only',
      shelfLife: '36 months',
      isActive: true,
      sortOrder: 18,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1608248597187-eb0c1f6970b7?w=400',
      images: ['https://images.unsplash.com/photo-1608248597187-eb0c1f6970b7?w=400'],
    },
  });

  // Product 19: Dove Beauty Bar
  const product19 = await prisma.product.create({
    data: {
      name: 'Beauty Bar Travel Size',
      brand: 'Dove',
      brandId: dove.id,
      category: 'Hygiene',
      categoryId: hygiene.id,
      description: 'Gentle cleansing bar with moisturizing cream.',
      shortDescription: 'Gentle moisturizing beauty bar',
      longDescription: 'Dove Beauty Bar combines a gentle cleansing formula with Dove\'s signature 1/4 moisturizing cream to give you softer, smoother, more radiant-looking skin. Unlike ordinary soap, it won\'t dry your skin.',
      size: '50g',
      sizeInMl: null,
      isLiquid: false,
      price: 29.00,
      costPrice: 14.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-HY-DOV-003',
      slug: 'dove-beauty-bar-travel-size-50g',
      stock: 95,
      status: 'active',
      featured: false,
      tags: ['hygiene', 'soap', 'beauty-bar', 'moisturizing', 'gentle'],
      weight: 52,
      dimensions: { width: 60, height: 40, depth: 25 },
      minOrderQuantity: 1,
      maxOrderQuantity: 30,
      countryOfOrigin: 'UK',
      warnings: 'Avoid contact with eyes',
      shelfLife: '36 months',
      isActive: true,
      sortOrder: 19,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
      images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400'],
    },
  });

  // Product 20: Labello Lip Balm
  const product20 = await prisma.product.create({
    data: {
      name: 'Classic Care Lip Balm',
      brand: 'Labello',
      brandId: labello.id,
      category: 'Skincare',
      categoryId: skincare.id,
      description: 'Long-lasting lip care with vitamin E and natural oils.',
      shortDescription: 'Classic lip care with vitamin E',
      longDescription: 'Labello Classic Care provides long-lasting lip care and protection. Enriched with vitamin E and natural oils, it keeps your lips smooth and protected against dryness. Compact stick perfect for travel.',
      size: '4.8g',
      sizeInMl: null,
      isLiquid: false,
      price: 35.00,
      costPrice: 17.00,
      currency: 'SEK',
      taxRate: 25,
      sku: 'TE-SC-LAB-001',
      slug: 'labello-classic-care-lip-balm-5g',
      stock: 100,
      status: 'active',
      featured: false,
      tags: ['skincare', 'lip-balm', 'vitamin-e', 'lip-protection'],
      weight: 8,
      dimensions: { width: 18, height: 68, depth: 18 },
      minOrderQuantity: 1,
      maxOrderQuantity: 50,
      countryOfOrigin: 'Germany',
      ingredients: 'Octyldodecanol, Ricinus Communis Seed Oil, Cera Microcristallina, Cetyl Palmitate, Polyglyceryl-3 Diisostearate, Tocopheryl Acetate, Cera Alba',
      warnings: 'For external use only',
      shelfLife: '30 months',
      isActive: true,
      sortOrder: 20,
      supplierId: supplier1.id,
      imageUrl: 'https://images.unsplash.com/photo-1610873167013-4b25a4f4f4e7?w=400',
      images: ['https://images.unsplash.com/photo-1610873167013-4b25a4f4f4e7?w=400'],
    },
  });

  // Create Volume Discounts
  console.log('💰 Creating volume discounts...');
  await prisma.volumeDiscount.createMany({
    data: [
      {
        productId: product1.id,
        minQuantity: 3,
        maxQuantity: 5,
        discountPercent: 10,
        isActive: true,
      },
      {
        productId: product1.id,
        minQuantity: 6,
        maxQuantity: null,
        discountPercent: 15,
        isActive: true,
      },
      {
        productId: product6.id,
        minQuantity: 2,
        maxQuantity: null,
        discountPercent: 12,
        isActive: true,
      },
      {
        productId: product18.id,
        minQuantity: 2,
        maxQuantity: 3,
        discountPercent: 8,
        isActive: true,
      },
    ],
  });

  // Create Price History
  console.log('📊 Creating price history...');
  await prisma.priceHistory.createMany({
    data: [
      {
        productId: product1.id,
        price: 59.00,
        costPrice: 28.00,
        changedBy: 'Admin',
        reason: 'Initial price',
        createdAt: new Date('2024-01-01'),
      },
      {
        productId: product1.id,
        price: 49.00,
        costPrice: 25.00,
        changedBy: 'Admin',
        reason: 'Spring promotion',
        createdAt: new Date('2024-03-01'),
      },
      {
        productId: product6.id,
        price: 149.00,
        costPrice: 75.00,
        changedBy: 'Admin',
        reason: 'Initial price',
        createdAt: new Date('2024-01-01'),
      },
      {
        productId: product6.id,
        price: 129.00,
        costPrice: 70.00,
        changedBy: 'Admin',
        reason: 'Summer sale',
        createdAt: new Date('2024-06-01'),
      },
      {
        productId: product18.id,
        price: 169.00,
        costPrice: 85.00,
        changedBy: 'Admin',
        reason: 'Initial price',
        createdAt: new Date('2024-01-01'),
      },
      {
        productId: product18.id,
        price: 149.00,
        costPrice: 80.00,
        changedBy: 'Admin',
        reason: 'Competitive pricing adjustment',
        createdAt: new Date('2024-05-01'),
      },
    ],
  });

  // Create Stock Movements
  console.log('📦 Creating stock movements...');
  await prisma.stockMovement.createMany({
    data: [
      {
        productId: product1.id,
        type: 'purchase',
        quantity: 100,
        reference: 'PO-2024-001',
        notes: 'Initial stock from Nordic Beauty Distribution',
        createdAt: new Date('2024-01-15'),
      },
      {
        productId: product1.id,
        type: 'sale',
        quantity: -25,
        reference: 'Multiple orders',
        notes: 'Regular sales',
        createdAt: new Date('2024-02-01'),
      },
      {
        productId: product6.id,
        type: 'purchase',
        quantity: 50,
        reference: 'PO-2024-012',
        notes: 'Summer stock replenishment',
        createdAt: new Date('2024-05-01'),
      },
      {
        productId: product6.id,
        type: 'sale',
        quantity: -10,
        reference: 'Multiple orders',
        notes: 'Summer sales',
        createdAt: new Date('2024-06-15'),
      },
      {
        productId: product18.id,
        type: 'purchase',
        quantity: 40,
        reference: 'PO-2024-008',
        notes: 'Premium haircare stock',
        createdAt: new Date('2024-03-10'),
      },
      {
        productId: product18.id,
        type: 'sale',
        quantity: -10,
        reference: 'Multiple orders',
        notes: 'Luxury product sales',
        createdAt: new Date('2024-04-20'),
      },
      {
        productId: product5.id,
        type: 'purchase',
        quantity: 150,
        reference: 'PO-2024-003',
        notes: 'Hygiene products bulk order',
        createdAt: new Date('2024-01-20'),
      },
      {
        productId: product5.id,
        type: 'sale',
        quantity: -30,
        reference: 'Multiple orders',
        notes: 'High-demand item',
        createdAt: new Date('2024-03-01'),
      },
    ],
  });

  // Create Product Images
  console.log('🖼️  Creating product images...');
  await prisma.productImage.createMany({
    data: [
      {
        productId: product1.id,
        url: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800',
        altText: 'Pantene Pro-V Shampoo bottle',
        sortOrder: 1,
        isPrimary: true,
      },
      {
        productId: product6.id,
        url: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800',
        altText: 'La Roche-Posay Sunscreen',
        sortOrder: 1,
        isPrimary: true,
      },
      {
        productId: product18.id,
        url: 'https://images.unsplash.com/photo-1608248597187-eb0c1f6970b7?w=800',
        altText: 'Moroccanoil Treatment bottle',
        sortOrder: 1,
        isPrimary: true,
      },
    ],
  });

  console.log('✅ Seeding completed successfully!');
  console.log(`Created:
    - 3 suppliers
    - 4 categories
    - 15 brands
    - 20 products
    - 4 volume discounts
    - 6 price history entries
    - 8 stock movements
    - 3 product images`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
