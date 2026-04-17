# TravelEase - Setup Guide

This guide will help you set up and deploy the TravelEase e-commerce platform.

## Prerequisites

Before you begin, make sure you have:

- **Node.js 20.9.0+** installed on your system (required for Next.js 16)
- **PostgreSQL database** (local or cloud-hosted)
- **OpenWeatherMap API key** (free tier available at https://openweathermap.org/api)
- **Stripe account** (for payment processing - optional for initial setup)
- **Git** installed

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Tschiffer46/Travelease.git
cd Travelease
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 16+
- React 19
- Tailwind CSS
- Prisma (database ORM)
- TypeScript

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure the following variables:

```env
# Database Configuration
# Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/travelease?schema=public"

# NextAuth Configuration (for future authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-one-with-openssl-rand-base64-32"

# Stripe Configuration (optional for now)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Weather API Configuration
# Get a free API key from https://openweathermap.org/api
OPENWEATHER_API_KEY="your-openweathermap-api-key"

# Environment
NODE_ENV="development"
```

### 4. Set Up the Database

#### Option A: Using Docker (Recommended)

If you have Docker installed, you can quickly spin up a PostgreSQL database:

```bash
docker run --name travelease-db \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_USER=travelease \
  -e POSTGRES_DB=travelease \
  -p 5432:5432 \
  -d postgres:15-alpine
```

Then update your `DATABASE_URL` in `.env`:
```
DATABASE_URL="postgresql://travelease:yourpassword@localhost:5432/travelease?schema=public"
```

#### Option B: Using Existing PostgreSQL

If you already have PostgreSQL installed:

1. Create a new database:
```sql
CREATE DATABASE travelease;
```

2. Update the `DATABASE_URL` in `.env` with your credentials

### 5. Initialize the Database

Push the database schema:

```bash
npm run db:push
```

This creates all necessary tables in your database.

### 6. Seed the Database

Populate the database with sample products:

```bash
npm run db:seed
```

This will add 18 sample products across 4 categories (skincare, haircare, personal hygiene, cosmetics).

### 7. Start the Development Server

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Exploring the Application

### Customer-Facing Pages

- **Homepage** (http://localhost:3000): Hero section with destination search
- **Products** (http://localhost:3000/products): Browse and filter products
- **Product Detail**: Click any product to see details
- **Shopping Cart** (http://localhost:3000/cart): View cart with TSA liquid calculator
- **Destination Search**: Enter "Barcelona in July" to see climate-based recommendations

### Admin Dashboard

- **Dashboard** (http://localhost:3000/admin): Overview with statistics
- **Product Management** (http://localhost:3000/admin/products): View all products
- **Order Management** (http://localhost:3000/admin/orders): View orders

> **Note**: Authentication is not yet implemented, so admin pages are publicly accessible in development.

## Testing Features

### 1. Test the Liquid Calculator

1. Navigate to http://localhost:3000/products
2. Add liquid products to your cart (look for the "Liquid" badge)
3. Go to http://localhost:3000/cart
4. The TSA Liquid Calculator shows:
   - Total liquid volume
   - Visual progress bar
   - Warnings if exceeding 1L limit

### 2. Test Destination Recommendations

1. Go to http://localhost:3000
2. Enter a destination like "Barcelona in July" or "Oslo in December"
3. Click "Get Recommendations"
4. See climate-based product recommendations

> **Note**: Weather data requires a valid OpenWeatherMap API key. Without it, you'll see general recommendations.

## Deployment to Railway

### Prerequisites

- Railway account (free tier available at https://railway.app)
- GitHub repository

### Quick Start (5 minutes)

1. **Go to Railway**:
   - Visit https://railway.app/new
   - Click "Deploy from GitHub repo"
   - Select the Travelease repository

2. **Add PostgreSQL**:
   - Click "+ New" in project dashboard
   - Select "Database" → "Add PostgreSQL"
   - Railway automatically creates DATABASE_URL

3. **Configure Environment Variables**:
   
   In Railway dashboard, go to Variables tab:
   
   ```env
   DATABASE_URL=postgresql://...  (auto-generated)
   NEXTAUTH_URL=https://your-app.up.railway.app
   NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
   OPENWEATHER_API_KEY=your-api-key
   NODE_ENV=production
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Get your live URL

5. **Initialize Database**:
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login and link
   railway login
   railway link
   
   # Initialize database
   railway run npm run db:push
   railway run npm run db:seed
   ```

📖 **For detailed instructions, see [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)**

### Alternative Deployment Options

The app can also be deployed to:
- **Vercel** - See `vercel.json` configuration
- **Heroku** - Use the included `Procfile`
- **Any Node.js hosting** - Standard Next.js deployment

### Recommended Database Providers

For production PostgreSQL databases:

- **Railway PostgreSQL**: Built-in with Railway, easiest setup
- **Supabase**: Free tier with good performance
- **Neon**: Serverless PostgreSQL with generous free tier
- **Render**: Simple PostgreSQL hosting

## Troubleshooting

### Build Errors

**"Prisma Client not found"**:
```bash
npx prisma generate
```

**"Module not found"**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Issues

**"Can't reach database server"**:
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env
- Check firewall settings

**"Database does not exist"**:
```bash
# Create the database first
createdb travelease
# Then run
npm run db:push
```

### Runtime Errors

**"OpenWeatherMap API error"**:
- Verify your API key is correct
- Check if you've exceeded the free tier limits
- The app will work without it, showing general recommendations

## Next Steps

### Implement Payment Processing

1. Set up Stripe account
2. Add Stripe keys to environment variables
3. Create checkout page (template provided in codebase)
4. Test with Stripe test cards

### Add Authentication

1. Configure NextAuth.js providers
2. Protect admin routes
3. Add user registration/login pages
4. Implement order history

### Customize Products

1. Access admin panel at /admin/products
2. Update product information
3. Add product images (use image URLs or upload to CDN)
4. Adjust stock levels

### Localization

1. Add language files (Swedish, Norwegian, Danish)
2. Implement currency detection
3. Add GDPR compliance features

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [OpenWeatherMap API](https://openweathermap.org/api)

## Support

For issues or questions:
1. Check the [GitHub Issues](https://github.com/Tschiffer46/Travelease/issues)
2. Review the README.md
3. Create a new issue with detailed information

---

**Happy coding! 🚀**
