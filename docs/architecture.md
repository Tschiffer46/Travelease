# TravelEase — System Architecture

## 1. Overview

TravelEase is a **Next.js 16 full-stack application** using the App Router. It is deployed as a single monolithic service on **Railway** and backed by a **PostgreSQL** database (also hosted on Railway).

- **Runtime**: Node.js ≥ 20.9.0
- **Framework**: Next.js 16 (App Router, React Server Components)
- **Language**: TypeScript throughout
- **Database**: PostgreSQL via Prisma ORM v5
- **Deployment**: Railway (primary), `vercel.json` present as secondary option

---

## 2. Directory Structure

```
Travelease/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin / PIM panel pages
│   ├── api/
│   │   ├── admin/          # Admin REST API routes (products, suppliers, brands, categories)
│   │   ├── cart/           # Cart API routes
│   │   └── recommendations/# Climate-based product recommendations
│   ├── cart/               # Cart page
│   ├── fonts/              # Local font files
│   ├── products/           # Product listing & detail pages
│   ├── globals.css         # Global styles (Tailwind base)
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Shared React components
│   ├── ui/                 # Primitive UI components
│   ├── AddToCartButton.tsx
│   ├── AirportRulesSection.tsx
│   ├── BackToTop.tsx
│   ├── DestinationInspirationSection.tsx
│   ├── DestinationSearch.tsx
│   ├── FeaturedProductsShowcase.tsx
│   ├── HeroSection.tsx
│   ├── Navigation.tsx
│   ├── ShopSection.tsx
│   └── ShoppingCart.tsx
├── lib/                    # Shared utilities / Prisma client
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script (100+ products)
├── public/                 # Static assets
├── docs/                   # Project documentation
├── railway.json            # Railway deployment config
├── vercel.json             # Vercel config (secondary)
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 3. Data Model

All models are defined in `prisma/schema.prisma`.

### Product (PIM-enhanced)
The core entity. Extended with full Product Information Management fields:
- **Identity**: `id`, `sku` (unique), `ean`, `slug` (unique), `name`
- **Content**: `description`, `shortDescription`, `longDescription`, `ingredients`, `warnings`, `shelfLife`
- **Pricing**: `price`, `costPrice`, `compareAtPrice`, `taxRate`, `currency`
- **Physical**: `size`, `sizeInMl`, `isLiquid`, `weight`, `dimensions`
- **Inventory**: `stock`, `minOrderQuantity`, `maxOrderQuantity`, `countryOfOrigin`
- **Status / visibility**: `status` (draft / active / discontinued / out_of_stock), `isActive`, `featured`, `sortOrder`, `tags`
- **SEO**: `metaTitle`, `metaDescription`
- **Relations**: `supplier`, `categoryRel`, `brandRel`, `productImages`, `volumeDiscounts`, `priceHistory`, `stockMovements`, `cartItems`, `orderItems`

### Supporting PIM Models
| Model | Purpose |
|---|---|
| `Supplier` | Vendor contact, payment terms, lead time |
| `Category` | Self-referential tree (parent / children) |
| `Brand` | Brand metadata, logo, country of origin |
| `ProductImage` | Multiple images per product, sort order, primary flag |
| `VolumeDiscount` | Quantity-based pricing tiers |
| `PriceHistory` | Audit log of price changes |
| `StockMovement` | Inventory adjustments (purchase, sale, return, write-off) |

### User & Auth (NextAuth.js tables)
| Model | Purpose |
|---|---|
| `User` | Core user record (email, name, hashed password, avatar) |
| `Account` | OAuth provider accounts linked to a User |
| `Session` | Database sessions managed by NextAuth |
| `VerificationToken` | Email verification / password reset tokens |

### Commerce
| Model | Purpose |
|---|---|
| `Cart` | Shopping cart, linked to a `User` or anonymous `sessionId` |
| `CartItem` | Line item: product + quantity |
| `Order` | Placed order with Stripe session ID, shipping/billing addresses |
| `OrderItem` | Snapshot of price and quantity at time of purchase |
| `Destination` | User's saved travel destination with weather/climate data |

---

## 4. API Routes

All routes live under `app/api/`.

### Cart — `/api/cart`
Handles cart read, add, update quantity, and remove item operations. Cart is identified by session cookie (anonymous) or authenticated user.

### Admin — `/api/admin/*`
REST endpoints for the PIM system:

| Route | Resource |
|---|---|
| `/api/admin/products` | Products CRUD |
| `/api/admin/suppliers` | Suppliers CRUD |
| `/api/admin/brands` | Brands CRUD |
| `/api/admin/categories` | Categories CRUD |

### Recommendations — `/api/recommendations`
Accepts a destination string, fetches current weather from OpenWeather API, and returns a curated list of relevant products (e.g., sunscreen for hot climates, lip balm for cold destinations).

---

## 5. Authentication

- **Library**: NextAuth.js v4 (`next-auth`)
- **Strategy**: Database sessions — session tokens stored in the `Session` table
- **Providers**: Credentials provider (username + hashed password) and OAuth providers (schema supports any NextAuth-compatible provider via the `Account` model)
- **Status**: Schema and package are fully set up; customer-facing sign-in/sign-up pages are in progress

---

## 6. External Services

| Service | Purpose | Status |
|---|---|---|
| **PostgreSQL on Railway** | Primary database | Live |
| **OpenWeather API** | Climate-based product recommendations | Live |
| **Stripe** | Payment processing (Checkout Sessions) | Installed, checkout in progress |

---

## 7. Deployment

**Platform**: Railway

**`railway.json` config:**
```json
{
  "build": { "buildCommand": "npm ci && npm run build" },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Required environment variables on Railway:**

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (auto-set by Railway PostgreSQL plugin) |
| `NEXTAUTH_URL` | Public app URL, e.g. `https://travelease.up.railway.app` |
| `NEXTAUTH_SECRET` | Random secret for signing JWTs / sessions |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `OPENWEATHER_API_KEY` | OpenWeather API key |

---

## 8. Design System

- **CSS Framework**: Tailwind CSS v4
- **Aesthetic**: Scandinavian minimalist, inspired by premium brands like Aesop and Muji
- **Typography**:
  - Headings: DM Serif Display (local font via `next/font`)
  - Body: Inter (local font via `next/font`)
- **Colour palette**:
  - Primary: Deep ocean blue `#1B4965`
  - Accent: Warm sand/gold `#DDA15E`
  - Background: Warm whites and subtle grays
- **Animations**: Framer Motion — subtle, performant transitions
- **Icons**: Lucide React
