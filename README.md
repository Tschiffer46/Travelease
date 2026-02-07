<<<<<<< HEAD
# TravelEase - Travel-Sized Beauty & Hygiene E-commerce Platform

## 🚨 NEVER USED TERMINAL BEFORE? START HERE! 🚨

### 👶 **[COMPLETE BEGINNERS GUIDE](COMPLETE_BEGINNERS_GUIDE.md)** ⭐⭐⭐

**Written for someone who has NEVER used Terminal/Command Line before!**

This guide explains:
- ✅ **What Terminal is** (it's NOT your web browser!)
- ✅ **WHERE to find Terminal** on your Mac/Windows/Linux
- ✅ **WHAT Terminal looks like** when you open it
- ✅ **WHERE to type commands** (exactly where to click)
- ✅ **Step-by-step instructions** with plain English explanations
- ✅ **Troubleshooting** for common beginner mistakes

**If you're confused about "where do I type this?" - read the Complete Beginners Guide first!**

---

## 🚨 SITE DEPLOYED BUT LOOKS BAD? (For Those Who Know Terminal)

**If your Railway site is live but shows no product images or looks unprofessional:**

### ⚠️ Railway Instructions Updated (January 2026)

**If you found the Railway dashboard instructions invalid, they've been FIXED!**

👉 **[READ ISSUE_RESOLVED.md](ISSUE_RESOLVED.md)** ⭐ **START HERE**

👉 **[READ UPDATED_INSTRUCTIONS.md](UPDATED_INSTRUCTIONS.md)** - Complete guide

**Quick Fix Using Railway CLI (5 min):**
```bash
npm install -g @railway/cli
railway login && railway link
railway run npm run db:seed
```

**Note:** Railway CLI is now the only recommended method. Dashboard UI changes frequently, so CLI is more reliable.

**Other Helpful Guides:**
- **[COMPLETE_BEGINNERS_GUIDE.md](COMPLETE_BEGINNERS_GUIDE.md)** - For absolute beginners (NEVER used Terminal)
- [FIX_YOUR_SITE_NOW.md](FIX_YOUR_SITE_NOW.md) - Environment variables + database (now corrected)
- [DATABASE_FIX_GUIDE.md](DATABASE_FIX_GUIDE.md) - Database details (now corrected)
- [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) - Environment help
- [SUMMARY.md](SUMMARY.md) - Complete overview

---

A modern, full-featured e-commerce platform built with Next.js 14+ for selling travel-sized hygiene and beauty products, specifically designed for Nordic travelers.

## 🌟 Features

### Core E-commerce
- **Product Catalog**: Browse 100+ travel-sized products across 4 categories
- **Smart Search & Filtering**: Find products by category, brand, price range
- **Shopping Cart**: Persistent cart with session management
- **Responsive Design**: Mobile-first, Scandinavian luxury aesthetic

### Unique Features
- **1-Liter Liquid Calculator**: Real-time TSA/EU compliance tracking
  - Visual indicator of total liquid volume
  - Warnings for exceeding 100ml per container or 1L total
  - Automatic liquid vs non-liquid product detection

- **Climate-Based Recommendations** (Planned)
  - Natural language destination input
  - Weather API integration
  - Smart product recommendations based on climate

- **Multi-Currency Support** (Planned)
  - SEK, NOK, DKK support
  - Automatic currency detection

### Admin Features (Planned)
- Product management (CRUD operations)
- Order management
- Analytics dashboard
- Supplier integration

## 🛠️ Technology Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, React 19
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Planned)
- **Payments**: Stripe (Planned)
- **Deployment**: Vercel-ready
=======
# TravelEase - Premium Travel-Sized Beauty & Hygiene E-commerce

A sophisticated Next.js e-commerce platform for travel-sized beauty and hygiene products, designed for Nordic travelers with a clean Scandinavian aesthetic.

![TravelEase Homepage](https://github.com/user-attachments/assets/b9ab4d7f-e302-4db5-a6cf-8fb2253ef669)

## ✨ Features

### Core E-commerce Functionality
- **Product Catalog**: Browse 100+ travel-sized products across 4 categories
- **Smart Search & Filtering**: Filter by category, brand, and price range
- **Shopping Cart**: Persistent cart with session management
- **Responsive Design**: Mobile-first, works beautifully on all devices

### Unique Travel Features
- **TSA Liquid Calculator**: Real-time tracking of liquid volume to stay compliant with TSA/EU 1L limits
- **Climate-Based Recommendations**: Get personalized product suggestions based on your destination's weather
- **Travel-Sized Focus**: Every product is optimized for carry-on luggage

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router) with React 19
- **Styling**: Tailwind CSS v4 with custom Scandinavian design system
- **Animations**: Framer Motion for smooth, elegant transitions
- **Icons**: Lucide React for consistent, beautiful iconography
- **Database**: PostgreSQL with Prisma ORM
- **Type Safety**: TypeScript throughout
- **Authentication**: NextAuth.js (planned)
- **Payments**: Stripe integration (planned)

## 🎨 Design System

The design follows a sophisticated Scandinavian minimalist aesthetic inspired by premium brands like Aesop and Muji:

- **Colors**: 
  - Primary: Deep ocean blue (#1B4965)
  - Accent: Warm sand/gold (#DDA15E)
  - Background: Warm whites and subtle grays
  - Text: Rich charcoal tones
- **Typography**: 
  - Headings: DM Serif Display for elegance
  - Body: Inter for clarity and readability
- **Spacing**: Generous whitespace for a premium feel
- **Interactions**: Subtle, smooth animations that feel natural
>>>>>>> copilot/create-ecommerce-website

## 📦 Installation

### Prerequisites
<<<<<<< HEAD
- Node.js 20.9.0+ (required for Next.js 16)
- PostgreSQL database
- npm or yarn

### Setup Steps
=======
- Node.js 20.9.0 or higher
- PostgreSQL database
- npm or yarn

### Quick Start
>>>>>>> copilot/create-ecommerce-website

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tschiffer46/Travelease.git
   cd Travelease
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/travelease"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
<<<<<<< HEAD
   OPENWEATHER_API_KEY="your-api-key"
=======
>>>>>>> copilot/create-ecommerce-website
   ```

4. **Set up the database**
   ```bash
<<<<<<< HEAD
   # Push the schema to your database
   npm run db:push
   
   # Seed the database with sample products
=======
   npm run db:push
>>>>>>> copilot/create-ecommerce-website
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
Travelease/
<<<<<<< HEAD
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── cart/            # Cart management endpoints
│   ├── products/            # Product pages
│   │   ├── [id]/           # Product detail page
│   │   └── page.tsx        # Product listing
│   ├── cart/                # Shopping cart page
│   ├── checkout/            # Checkout flow (planned)
│   ├── admin/               # Admin dashboard (planned)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # Reusable React components
│   └── AddToCartButton.tsx
├── lib/                     # Utility functions
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Helper functions
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding script
├── public/                  # Static assets
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Design System

The application follows a Scandinavian luxury aesthetic:

- **Colors**: 
  - Neutral tones (whites, grays, beiges)
  - Accent: Warm earth tones
- **Typography**: Clean, modern sans-serif (Geist)
- **Layout**: Spacious, minimalist, high contrast
- **Mobile-first**: Fully responsive across all devices

## 📊 Database Schema

Key models:
- **Product**: Product catalog with liquid tracking
- **Cart & CartItem**: Session-based shopping cart
- **Order & OrderItem**: Order management (planned)
- **User**: User authentication (planned)
- **Destination**: Saved travel destinations (planned)

## 🚀 Deployment

### Railway (Recommended)

**Quick deployment in 5 minutes!**

1. **Sign up** at https://railway.app
2. **Deploy from GitHub** - Select your repository
3. **Add PostgreSQL** - Built-in database service
4. **Set environment variables** - Add required variables
5. **Deploy** - Automatic build and deployment

📖 **See [RAILWAY_QUICKSTART.md](RAILWAY_QUICKSTART.md) for step-by-step guide**

🔧 **Having issues?** See [RAILWAY_TROUBLESHOOTING.md](RAILWAY_TROUBLESHOOTING.md) or [RAILWAY_QUICK_FIX.md](RAILWAY_QUICK_FIX.md)

### Alternative: Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Other Platforms

The application can also be deployed to:
- **Vercel** - See original configuration in `vercel.json`
- **Heroku** - Use included `Procfile`
- **Any Node.js host** - Standard Next.js deployment

## 🔧 Development

### Available Scripts
=======
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx    # Button with variants
│   │   ├── Card.tsx      # Card component
│   │   ├── Badge.tsx     # Badge/tag component
│   │   └── Container.tsx # Layout container
│   ├── Navigation.tsx     # Main navigation
│   └── ...
├── lib/                   # Utility functions
├── prisma/               # Database schema
│   ├── schema.prisma     # Prisma schema
│   └── seed.ts           # Database seeding
├── public/               # Static assets
└── tailwind.config.ts    # Tailwind configuration
```

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy TravelEase is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy!

### Alternative Platforms

TravelEase can also be deployed to:
- Railway
- Heroku
- Any Node.js hosting platform

## 📝 Available Scripts
>>>>>>> copilot/create-ecommerce-website

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
<<<<<<< HEAD
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

### Adding New Products

Run the seed script or use the admin dashboard (coming soon):

```bash
npm run db:seed
```

## 🌐 Localization

Currently supports:
- English (default)

Planned:
- Swedish (Svenska)
- Norwegian (Norsk)
- Danish (Dansk)

=======
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

>>>>>>> copilot/create-ecommerce-website
## 🔐 Security

- Environment variables for sensitive data
- HTTPS in production
- CSRF protection
- Input validation with Zod
- SQL injection protection via Prisma

<<<<<<< HEAD
## 📱 Browser Support
=======
## 🌐 Browser Support
>>>>>>> copilot/create-ecommerce-website

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome)

## 🤝 Contributing

1. Fork the repository
<<<<<<< HEAD
2. Create a feature branch
3. Commit your changes
4. Push to the branch
=======
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
>>>>>>> copilot/create-ecommerce-website
5. Open a Pull Request

## 📄 License

ISC License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
<<<<<<< HEAD
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Database management with [Prisma](https://www.prisma.io/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Note**: This is an MVP (Minimum Viable Product). Some features are still in development. See the project roadmap for upcoming features.
=======
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Prisma](https://www.prisma.io/)
- Icons from [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ for travelers who pack smart**
>>>>>>> copilot/create-ecommerce-website
