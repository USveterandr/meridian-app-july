// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/providers';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meridian República Dominicana - Inversiones Inmobiliarias de Lujo',
  description:
    'Plataforma líder para inversiones inmobiliarias de lujo en República Dominicana. Solo 3% comisión, propiedades verificadas, incentivos fiscales.',
  generator: 'Meridian Real Estate Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}