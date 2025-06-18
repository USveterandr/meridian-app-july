import { Button } from "@/components/ui/button"
import { FileText, Shield, DollarSign, Building } from "lucide-react"

export function IncentivesHero() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Incentivos Fiscales
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              República Dominicana
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Descubre todos los beneficios fiscales disponibles para inversionistas extranjeros. Desde CONFOTUR hasta
            Zonas Francas, maximiza tu inversión con incentivos únicos en el Caribe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg"
            >
              <FileText className="h-5 w-5 mr-2" />
              Guía Completa
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg backdrop-blur-md"
            >
              <Shield className="h-5 w-5 mr-2" />
              Consulta Legal
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">CONFOTUR</h3>
            <p className="text-slate-300">Hasta 15 años sin IPI</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Zonas Francas</h3>
            <p className="text-slate-300">100% exención renta</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Pensionados</h3>
            <p className="text-slate-300">Residencia expedita</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Energías Renovables</h3>
            <p className="text-slate-300">Ley 57-07</p>
          </div>
        </div>
      </div>
    </section>
  )
}
