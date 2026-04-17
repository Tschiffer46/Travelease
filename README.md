# TravelEase — Premium Travel-Sized Beauty & Hygiene E-commerce

A full-stack Next.js e-commerce platform for travel-sized beauty and hygiene products, designed for Nordic travelers with a clean Scandinavian aesthetic. Deployed on **Railway**.

![TravelEase Homepage](https://github.com/user-attachments/assets/b9ab4d7f-e302-4db5-a6cf-8fb2253ef669)

## ✨ Features

### Core E-commerce
- **Product Catalog** — 100+ travel-sized products with filtering by category, brand, and price
- **PIM System** — full Product Information Management admin panel (SKU, EAN, slug, SEO meta, cost price, tax rate, volume discounts, price history, stock movements)
- **Shopping Cart** — persistent cart with session and user support
- **Admin Panel** — manage products, suppliers, brands, and categories at `/admin`

### Travel-Specific
- **TSA Liquid Calculator** — real-time tracking of liquid volume against TSA/EU 1 L limits
- **Climate-Based Recommendations** — personalised product suggestions via OpenWeather API
- **Destination Inspiration** — curated destination section on the homepage

### In Progress
- Full Stripe checkout flow
- Complete order management UI
- Customer-facing sign-in / sign-up pages

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, Framer Motion, Lucide React |
| Database | PostgreSQL + Prisma ORM v5 |
| Auth | NextAuth.js v4 — installed, schema live |
| Payments | Stripe v20 — installed, checkout in progress |
| Weather | OpenWeather API |
| Utilities | Zod, clsx, tailwind-merge |

## 🗂️ App Routes

| Route | Description |
|---|---|
| `/` | Homepage (Hero, Featured Products, Shop Section, Destination Inspiration, Airport Rules) |
| `/products` | Product catalog with filtering |
| `/cart` | Shopping cart |
| `/admin` | Admin / PIM panel |
| `/api/cart` | Cart REST API |
| `/api/admin/*` | Admin REST API (products, suppliers, brands, categories) |
| `/api/recommendations` | Climate-based product recommendations |

## 📦 Quick Start

See **[docs/bootstrap.md](docs/bootstrap.md)** for full local-development instructions.

```bash
git clone https://github.com/Tschiffer46/Travelease.git
cd Travelease
npm install                        # also runs prisma generate
cp .env.example .env.local         # fill in required variables
npm run db:push                    # push schema to PostgreSQL
npm run db:seed                    # seed 100+ products
npm run dev                        # http://localhost:3000
```

**Required environment variables:**

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | `http://localhost:3000` (dev) |
| `NEXTAUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `STRIPE_SECRET_KEY` | Stripe secret key (test or live) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `OPENWEATHER_API_KEY` | OpenWeather API key (free tier works) |

## 📝 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm run db:push` | Push schema changes to DB |
| `npm run db:seed` | Seed with sample products |

## 🚀 Deployment

TravelEase is deployed on **Railway**. See **[docs/RAILWAY_DEPLOYMENT.md](docs/RAILWAY_DEPLOYMENT.md)** for details.

- Build: `npm ci && npm run build`
- Start: `npm start`
- Health check: `/`
- Config: `railway.json`

## 🎨 Design System

Scandinavian minimalist aesthetic:

- **Typography**: DM Serif Display (headings) + Inter (body)
- **Colors**: deep ocean blue `#1B4965`, warm sand/gold `#DDA15E`, warm whites
- **Animations**: Framer Motion — subtle, smooth transitions

## 📚 Documentation

| Document | Description |
|---|---|
| [docs/architecture.md](docs/architecture.md) | System architecture, data model, API routes |
| [docs/bootstrap.md](docs/bootstrap.md) | Local development setup |
| [docs/RAILWAY_DEPLOYMENT.md](docs/RAILWAY_DEPLOYMENT.md) | Railway deployment guide |
| [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) | Environment variable reference |
| [ADMIN_API_DOCUMENTATION.md](ADMIN_API_DOCUMENTATION.md) | Admin REST API reference |
| [PIM_SYSTEM_SUMMARY.md](PIM_SYSTEM_SUMMARY.md) | PIM system overview |

## 📄 License

ISC — see LICENSE file for details.

---

**Made with ❤️ for travelers who pack smart**
