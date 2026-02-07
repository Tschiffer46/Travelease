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

## 📦 Installation

### Prerequisites
- Node.js 20.9.0 or higher
- PostgreSQL database
- npm or yarn

### Quick Start

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
   ```

4. **Set up the database**
   ```bash
   npm run db:push
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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

## 🔐 Security

- Environment variables for sensitive data
- HTTPS in production
- CSRF protection
- Input validation with Zod
- SQL injection protection via Prisma

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

ISC License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Prisma](https://www.prisma.io/)
- Icons from [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ for travelers who pack smart**
