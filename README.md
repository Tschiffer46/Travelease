# TravelEase - Travel-Sized Beauty & Hygiene E-commerce Platform

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

## 📦 Installation

### Prerequisites
- Node.js 20.9.0+ (required for Next.js 16)
- PostgreSQL database
- npm or yarn

### Setup Steps

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
   OPENWEATHER_API_KEY="your-api-key"
   ```

4. **Set up the database**
   ```bash
   # Push the schema to your database
   npm run db:push
   
   # Seed the database with sample products
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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
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

## 🔐 Security

- Environment variables for sensitive data
- HTTPS in production
- CSRF protection
- Input validation with Zod
- SQL injection protection via Prisma

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Database management with [Prisma](https://www.prisma.io/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Note**: This is an MVP (Minimum Viable Product). Some features are still in development. See the project roadmap for upcoming features.
