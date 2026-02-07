import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
