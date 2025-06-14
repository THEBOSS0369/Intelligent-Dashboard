// src/app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Business Intelligence Dashboard',
  description: 'Advanced filtering system with real-time data interaction',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-gradient-to-b from-gray-50 to-white min-h-screen`}>
        <div className="animate-fade-in">
          {children}
        </div>
      </body>
    </html>
  );
}
