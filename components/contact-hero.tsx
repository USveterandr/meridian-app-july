import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactHero() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contáctanos
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Estamos Aquí para Ayudarte
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Nuestro equipo de expertos está listo para responder tus preguntas y ayudarte a encontrar la oportunidad de
            inversión perfecta en República Dominicana.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            Llamar Ahora
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Teléfono</h3>
            <p className="text-slate-300">+1 (809) 555-0123</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-slate-300">info@meridian-dr.com</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Oficina</h3>
            <p className="text-slate-300">Santo Domingo, RD</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Horario</h3>
            <p className="text-slate-300">Lun-Vie 9AM-6PM</p>
          </div>
        </div>
      </div>
    </section>
  )
}
