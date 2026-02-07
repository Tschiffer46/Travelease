import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

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
    <html lang="en" className={`${inter.variable} ${dmSerifDisplay.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
