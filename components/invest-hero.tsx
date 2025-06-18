import { Button } from "@/components/ui/button"
import { TrendingUp, Shield, Globe, Calculator } from "lucide-react"

export function InvestHero() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Invierte en el
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Paraíso Caribeño
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            República Dominicana ofrece las mejores oportunidades de inversión inmobiliaria del Caribe. Descubre
            propiedades con alto potencial de rentabilidad y beneficios fiscales únicos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Ver Oportunidades
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg backdrop-blur-md"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculadora ROI
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">15-25% ROI</h3>
            <p className="text-slate-300">Retorno anual promedio</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Incentivos Fiscales</h3>
            <p className="text-slate-300">CONFOTUR y Zonas Francas</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Mercado Estable</h3>
            <p className="text-slate-300">Crecimiento sostenido</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Desde $300K</h3>
            <p className="text-slate-300">Inversión mínima</p>
          </div>
        </div>
      </div>
    </section>
  )
}
