import type { Metadata, Viewport } from 'next';
import { Providers } from '@/components/providers';
// import { MobileOptimizations } from '@/components/mobile-optimizations';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Meridian República Dominicana - Inversiones Inmobiliarias de Lujo',
  description: 'Plataforma líder para inversiones inmobiliarias de lujo en República Dominicana. Solo 3% comisión, propiedades verificadas, incentivos fiscales.',
  generator: 'Meridian Real Estate Platform',
  keywords: 'real estate, luxury, investment, Dominican Republic, property, ROI, calculator',
  authors: [{ name: 'Meridian Real Estate' }],
  creator: 'Meridian Real Estate',
  publisher: 'Meridian Real Estate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://meridian-rd.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Meridian República Dominicana - Inversiones Inmobiliarias de Lujo',
    description: 'Plataforma líder para inversiones inmobiliarias de lujo en República Dominicana.',
    url: 'https://meridian-rd.com',
    siteName: 'Meridian Real Estate',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meridian Real Estate Platform',
      },
    ],
    locale: 'es_DO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meridian República Dominicana',
    description: 'Inversiones inmobiliarias de lujo en República Dominicana.',
    images: ['/images/og-image.jpg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Meridian RD',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#f59e0b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children = null,
}: {
  children: React.ReactNode | null;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Meridian RD" />
        <meta name="msapplication-TileColor" content="#f59e0b" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icon-16x16.png" />
        <link rel="apple-touch-icon" href="/images/icon-192x192.png" />
        <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#f59e0b" />
      </head>
      <body className="font-sans safe-area-top safe-area-bottom">
        {/* <MobileOptimizations /> */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}