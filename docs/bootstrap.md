# TravelEase — Local Development Setup

## Prerequisites

| Tool | Minimum version |
|---|---|
| Node.js | ≥ 20.9.0 |
| npm | ≥ 10 |
| PostgreSQL | Any recent version (local install or cloud, e.g. Railway) |
| Git | Any recent version |

---

## Steps

### 1. Clone the repository

```bash
git clone https://github.com/Tschiffer46/Travelease.git
cd Travelease
```

### 2. Install dependencies

```bash
npm install
```

> `npm install` automatically runs `prisma generate` via the `postinstall` script, so the Prisma client is ready to use immediately.

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in the following values:

| Variable | Value |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string, e.g. `postgresql://user:password@localhost:5432/travelease` |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Any random string — generate one with `openssl rand -base64 32` |
| `STRIPE_SECRET_KEY` | From the [Stripe dashboard](https://dashboard.stripe.com/test/apikeys) (use test keys locally) |
| `STRIPE_PUBLISHABLE_KEY` | From the Stripe dashboard |
| `OPENWEATHER_API_KEY` | From [openweathermap.org](https://openweathermap.org/api) — free tier works |

### 4. Push the database schema

```bash
npm run db:push
```

This applies all Prisma schema changes to your database without running migrations (suitable for development).

### 5. Seed the database

```bash
npm run db:seed
```

Seeds the database with 100+ sample travel products across multiple categories, plus brands, suppliers, and categories.

### 6. Start the development server

```bash
npm run dev
```

### 7. Open the app

Navigate to [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server (Next.js with Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm run db:push` | Push schema changes to DB (no migration files) |
| `npm run db:seed` | Seed with sample products |

---

## Admin Panel

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to access the PIM (Product Information Management) dashboard. From there you can:

- Create, edit, and delete **products** (with full PIM fields: SKU, EAN, slug, status, SEO meta, cost price, tax rate, volume discounts, etc.)
- Manage **suppliers**, **brands**, and **categories**

---

## Deployment to Railway

1. Push your code to GitHub.
2. In the [Railway dashboard](https://railway.app), create a new project and connect your GitHub repository.
3. Add a **PostgreSQL** plugin — Railway will inject `DATABASE_URL` automatically.
4. Set the remaining environment variables in the Railway project settings.
5. Deploy — Railway picks up `railway.json` automatically and runs:
   - **Build**: `npm ci && npm run build`
   - **Start**: `npm start`

See [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) for a detailed Railway deployment guide.
