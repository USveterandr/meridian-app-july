'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface ProvidersProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function Providers({ children, ...props }: ProvidersProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
