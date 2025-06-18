import { Card, CardContent } from "@/components/ui/card"
import { UserCheck, Camera, Shield, DollarSign } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: UserCheck,
      title: "Registro y Verificación",
      description: "Regístrate y verifica tu identidad con cédula, pasaporte y documentos de propiedad",
      details: ["Verificación con JCE", "Validación de documentos", "Proceso 24-72 horas"],
    },
    {
      step: "02",
      icon: Camera,
      title: "Publicar Propiedad",
      description: "Toma fotos o súbelas desde tu móvil, completa la información de la propiedad",
      details: ["Fotos profesionales", "Descripción detallada", "Ubicación y características"],
    },
    {
      step: "03",
      icon: Shield,
      title: "Validación Legal",
      description: "Verificamos la propiedad con Jurisdicción Inmobiliaria y validamos la documentación",
      details: ["Verificación de título", "Historial legal", "Gravámenes y deudas"],
    },
    {
      step: "04",
      icon: DollarSign,
      title: "Transacción Segura",
      description: "Conectamos compradores verificados con vendedores a través de nuestro sistema de escrow",
      details: ["Depósito de buena fe", "Proceso de escrow", "Comisión del 3%"],
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">¿Cómo Funciona?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Un proceso simple y seguro para comprar y vender propiedades de lujo en República Dominicana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="absolute top-4 right-4 text-6xl font-bold text-amber-100">{step.step}</div>

                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-6">
                  <step.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 mb-4">{step.description}</p>

                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-slate-500 flex items-center">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
