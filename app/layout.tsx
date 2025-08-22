import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meridian República Dominicana - Inversiones Inmobiliarias de Lujo',
  description: 'Plataforma líder para inversiones inmobiliarias de lujo en República Dominicana. Solo 3% comisión, propiedades verificadas, incentivos fiscales.',
  generator: 'Meridian Real Estate Platform',
}

export default function RootLayout({
  children = null,
}: {
  children: React.ReactNode | null;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}