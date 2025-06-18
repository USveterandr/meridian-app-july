import { Button } from "@/components/ui/button"
import { Users, Award, Globe, Shield } from "lucide-react"

export function AboutHero() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Acerca de
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Meridian
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Somos la plataforma líder en inversiones inmobiliarias de lujo en República Dominicana. Conectamos
            inversionistas globales con las mejores oportunidades del Caribe.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg"
          >
            <Users className="h-5 w-5 mr-2" />
            Conoce al Equipo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">25+ Años</h3>
            <p className="text-slate-300">Experiencia en el mercado</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">40+ Países</h3>
            <p className="text-slate-300">Inversionistas internacionales</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Verificado</h3>
            <p className="text-slate-300">Propiedades certificadas</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">1,200+</h3>
            <p className="text-slate-300">Clientes satisfechos</p>
          </div>
        </div>
      </div>
    </section>
  )
}
