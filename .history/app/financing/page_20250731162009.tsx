import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function FinancingPage() {
  const financingOptions = [
    {
      title: "Financiamiento para Compradores",
      description: "Opciones de financiamiento competitivas para la adquisición de propiedades residenciales y comerciales en República Dominicana.",
      features: [
        "Hasta 80% de financiamiento",
        "Tasas preferenciales",
        "Plazos flexibles hasta 25 años",
        "Aprobación rápida en 72 horas"
      ],
      type: "Residencial y Comercial"
    },
    {
      title: "Líneas de Crédito para Inversionistas",
      description: "Líneas de crédito revolving diseñadas para inversionistas que necesitan capital para múltiples oportunidades.",
      features: [
        "Líneas desde $500,000 USD",
        "Acceso a capital continuo",
        "Solo pagas intereses sobre lo utilizado",
        "Renovación automática"
      ],
      type: "Para Inversionistas"
    },
    {
      title: "Financiamiento para Desarrollo",
      description: "Financiamiento estructurado para proyectos de construcción y desarrollo inmobiliario a gran escala.",
      features: [
        "Financiamiento para tierra y construcción",
        "Desembolsos por etapas",
        "Asesoría en viabilidad de proyectos",
        "Hasta 70% del valor del proyecto"
      ],
      type: "Desarrolladores"
    },
    {
      title: "Refinanciamiento de Propiedades",
      description: "Mejore las condiciones de su financiamiento actual o acceda a capital adicional mediante el refinanciamiento.",
      features: [
        "Reducción de tasas de interés",
        "Obtención de capital adicional",
        "Extensión de plazos",
        "Sin penalidades por cancelación anticipada"
      ],
      type: "Propietarios Actuales"
    }
  ]

  const requirements = [
    {
      category: "Documentación Personal",
      items: [
        "Cédula de identidad y electoral",
        "Pasaporte vigente (si aplica)",
        "Comprobante de ingresos",
        "Referencias personales y comerciales"
      ]
    },
    {
      category: "Documentación de la Propiedad",
      items: [
        "Título de propiedad certificado",
        "Estudio de título actualizado",
        "Avalúo de la propiedad",
        "Planos y permisos de construcción"
      ]
    },
    {
      category: "Documentación Financiera",
      items: [
        "Estados de cuenta bancarios",
        "Declaraciones de impuestos",
        "Balance personal o corporativo",
        "Informe de crédito"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Financiamiento Inmobiliario</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Acceda a las mejores opciones de financiamiento para su inversión inmobiliaria en República Dominicana.
          </p>
        </div>
      </div>

      {/* Financing Options */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nuestras Opciones de Financiamiento</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Soluciones de financiamiento adaptadas a diferentes tipos de inversores y proyectos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financingOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <Badge variant="secondary">{option.type}</Badge>
                  </div>
                  <CardDescription className="text-slate-600">{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Badge variant="outline" className="mr-2 mt-1 text-amber-600 border-amber-600">✓</Badge>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">Solicitar Información</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Requisitos para Financiamiento</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Conozca la documentación necesaria para agilizar su proceso de aprobación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-amber-600">{req.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {req.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-amber-600 mr-2">•</span>
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Proceso de Financiamiento</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Un proceso transparente y eficiente para obtener el financiamiento que necesita.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: "1", title: "Solicitud", description: "Complete el formulario de solicitud inicial." },
              { step: "2", title: "Pre-Aprobación", description: "Reciba una pre-aprobación en 24 horas." },
              { step: "3", title: "Documentación", description: "Presente la documentación requerida." },
              { step: "4", title: "Evaluación", description: "Análisis de la propiedad y capacidad de pago." },
              { step: "5", title: "Aprobación", description: "Formalización y desembolso del financiamiento." }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Financiar su Próximo Proyecto?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestros expertos en financiamiento están listos para ayudarle a encontrar la mejor opción para sus necesidades.
          </p>
          <Button variant="secondary" size="lg" className="text-amber-600 hover:bg-amber-50">
            Solicitar Pre-Aprobación
          </Button>
        </div>
      </div>
    </div>
  )
}
