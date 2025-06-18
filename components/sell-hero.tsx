import { Button } from "@/components/ui/button"
import { Camera, Shield, DollarSign, Clock } from "lucide-react"

export function SellHero() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Vende tu Propiedad con
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Solo 3% de Comisión
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            La plataforma más confiable para vender propiedades de lujo en República Dominicana. Proceso 100% verificado
            y máxima exposición a inversionistas internacionales.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg"
          >
            <Camera className="h-5 w-5 mr-2" />
            Publicar Mi Propiedad
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">3% Comisión</h3>
            <p className="text-slate-300">vs 6% de la competencia</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Verificado</h3>
            <p className="text-slate-300">Validación con JCE</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">24-72 Horas</h3>
            <p className="text-slate-300">Tiempo de aprobación</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Camera className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fácil Publicación</h3>
            <p className="text-slate-300">Desde tu móvil</p>
          </div>
        </div>
      </div>
    </section>
  )
}
