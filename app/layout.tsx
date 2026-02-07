import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/CartContext';

export const metadata: Metadata = {
  title: 'TravelEase - Travel-Sized Beauty & Hygiene Products',
  description: 'Premium travel-sized hygiene and beauty products from well-known brands for Nordic travelers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ 
      '--font-sans': 'Inter, system-ui, sans-serif',
      '--font-serif': 'DM Serif Display, Georgia, serif'
    } as React.CSSProperties}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@400&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
