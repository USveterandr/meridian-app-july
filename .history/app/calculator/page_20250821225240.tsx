import { InvestmentCalculatorGameified } from '@/components/investment-calculator-gamified'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora de Inversión ROI - Meridian DR | República Dominicana',
  description: 'Calcula el ROI de tu inversión inmobiliaria en República Dominicana. Herramienta gamificada con incentivos fiscales y análisis detallado.',
  keywords: 'calculadora ROI, inversión inmobiliaria, República Dominicana, rentabilidad, bienes raíces, Punta Cana'
}

export default function CalculatorPage() {
  return (
    <div className=\"min-h-screen bg-gradient-to-br from-gray-50 to-blue-50\">
      <Header />
      <main className=\"pt-20\">
        <InvestmentCalculatorGameified />
      </main>
      <Footer />
    </div>
  )
}
