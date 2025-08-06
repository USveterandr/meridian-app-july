import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import { AiChat } from '@/components/ai-chat'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meridian República Dominicana - Inversiones Inmobiliarias de Lujo',
  description: 'Plataforma líder para inversiones inmobiliarias de lujo en República Dominicana. Solo 3% comisión, propiedades verificadas, incentivos fiscales.',
  generator: 'Meridian Real Estate Platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <AiChat />
        </Providers>
      </body>
    </html>
  )
}
