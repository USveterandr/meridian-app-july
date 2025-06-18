import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileCheck, Eye, Handshake } from "lucide-react"

export function SellProcess() {
  const steps = [
    {
      step: 1,
      icon: Upload,
      title: "Sube tu Propiedad",
      description: "Toma fotos con tu móvil y completa la información básica",
      time: "5 minutos",
    },
    {
      step: 2,
      icon: FileCheck,
      title: "Verificación de Documentos",
      description: "Validamos tu cédula y título de propiedad con las autoridades",
      time: "24-72 horas",
    },
    {
      step: 3,
      icon: Eye,
      title: "Publicación y Promoción",
      description: "Tu propiedad se publica y promociona a nuestra red de inversionistas",
      time: "Inmediato",
    },
    {
      step: 4,
      icon: Handshake,
      title: "Cierre de Venta",
      description: "Facilitamos el proceso de venta con nuestro sistema de escrow",
      time: "30-60 días",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Proceso Simple en 4 Pasos</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Desde la publicación hasta el cierre, te acompañamos en cada paso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                </div>

                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-6 mt-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 mb-4">{step.description}</p>
                <div className="text-sm font-semibold text-amber-600">{step.time}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
