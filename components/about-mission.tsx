import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Heart } from "lucide-react"

export function AboutMission() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Nuestra Misión</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Democratizar el acceso a inversiones inmobiliarias de lujo en República Dominicana, ofreciendo
            transparencia, seguridad y rentabilidad excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Misión</h3>
              <p className="text-slate-600">
                Facilitar inversiones inmobiliarias seguras y rentables en República Dominicana, conectando
                inversionistas globales con oportunidades excepcionales.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Visión</h3>
              <p className="text-slate-600">
                Ser la plataforma de referencia para inversiones inmobiliarias de lujo en el Caribe, reconocida por
                nuestra transparencia y excelencia.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Valores</h3>
              <p className="text-slate-600">
                Transparencia, integridad, excelencia en el servicio y compromiso con el desarrollo sostenible de
                República Dominicana.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Story */}
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 mb-6 text-center">Nuestra Historia</h3>
            <div className="prose prose-lg mx-auto text-slate-600">
              <p className="mb-6">
                Fundada en 1999, Meridian nació de la visión de democratizar el acceso a inversiones inmobiliarias de
                lujo en República Dominicana. Nuestros fundadores, con más de 25 años de experiencia en el sector
                inmobiliario caribeño, identificaron la necesidad de una plataforma que combinara transparencia,
                tecnología y conocimiento local.
              </p>
              <p className="mb-6">
                A lo largo de los años, hemos facilitado más de $2.8 mil millones en transacciones inmobiliarias,
                ayudando a más de 1,200 inversionistas de 40 países diferentes a encontrar su lugar en el paraíso
                dominicano. Nuestro enfoque en la verificación legal completa y el cumplimiento regulatorio nos ha
                posicionado como la plataforma más confiable del mercado.
              </p>
              <p>
                Hoy, Meridian continúa innovando con tecnología de vanguardia, manteniendo nuestro compromiso con la
                excelencia y la satisfacción del cliente. Nuestro equipo multidisciplinario de expertos en bienes
                raíces, abogados especializados y asesores financieros trabaja incansablemente para ofrecer las mejores
                oportunidades de inversión en el Caribe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
