import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function BuyerGuidePage() {
  const guideSteps = [
    {
      step: "1",
      title: "Definir Objetivos y Presupuesto",
      description: "Establezca claramente qué tipo de propiedad busca y cuánto está dispuesto a invertir.",
      details: [
        "Determine el propósito: inversión, residencia principal o vacacional",
        "Defina su rango de presupuesto incluyendo costos adicionales",
        "Identifique las características esenciales de la propiedad",
        "Considere el potencial de apreciación a largo plazo"
      ]
    },
    {
      step: "2",
      title: "Obtener Pre-Aprobación de Financiamiento",
      description: "Si requiere financiamiento, obtenga una pre-aprobación para saber su capacidad de compra.",
      details: [
        "Reúna su documentación financiera personal",
        "Compare tasas y condiciones de diferentes entidades",
        "Considere opciones para inversionistas extranjeros",
        "Entienda los requisitos de down payment"
      ]
    },
    {
      step: "3",
      title: "Buscar y Seleccionar Propiedades",
      description: "Explore el mercado y seleccione las propiedades que mejor se ajusten a sus criterios.",
      details: [
        "Trabaje con un agente inmobiliario especializado",
        "Utilice plataformas en línea y redes de contactos",
        "Visite propiedades en persona o virtualmente",
        "Evalúe la ubicación y amenities del área"
      ]
    },
    {
      step: "4",
      title: "Realizar Due Diligence",
      description: "Investigue exhaustivamente la propiedad seleccionada antes de hacer una oferta.",
      details: [
        "Verifique el estatus legal del título de propiedad",
        "Inspeccione físicamente la condición de la propiedad",
        "Revise permisos de construcción y regulaciones",
        "Investigue el mercado y precios comparables"
      ]
    },
    {
      step: "5",
      title: "Negociar y Hacer Oferta",
      description: "Presente una oferta formal y negocie los términos con el vendedor.",
      details: [
        "Determine una estrategia de precio basada en el mercado",
        "Incluya condiciones contingentes importantes",
        "Negocie plazos y formas de pago",
        "Considere incluir muebles o equipos en la oferta"
      ]
    },
    {
      step: "6",
      title: "Cierre de la Transacción",
      description: "Complete todos los trámites legales y financieros para finalizar la compra.",
      details: [
        "Firme el contrato de compraventa definitivo",
        "Realice el pago según lo acordado",
        "Registre la propiedad en su nombre",
        "Reciba las llaves y documentación final"
      ]
    }
  ]

  const costs = [
    {
      category: "Costos de Transacción",
      items: [
        { name: "Impuesto de Transferencia", percentage: "3%", description: "Sobre el valor de la propiedad" },
        { name: "Honorarios Legales", percentage: "1-2%", description: "Por servicios de abogado" },
        { name: "Costos de Registro", percentage: "~1%", description: "Para inscripción en Registro de Títulos" },
        { name: "Comisión de Corretaje", percentage: "3-5%", description: "Generalmente pagada por el vendedor" }
      ]
    },
    {
      category: "Costos de Financiamiento",
      items: [
        { name: "Intereses del Préstamo", percentage: "Variable", description: "Depende de la tasa y plazo" },
        { name: "Seguro de Hipoteca", percentage: "0.5-1%", description: "Anual sobre el saldo del préstamo" },
        { name: "Costos de Originación", percentage: "1-2%", description: "Fee por procesamiento del préstamo" },
        { name: "Avalúo de Propiedad", percentage: "Fijo", description: "$500 - $1,500 USD" }
      ]
    },
    {
      category: "Costos Posteriores a la Compra",
      items: [
        { name: "Impuesto Predial", percentage: "1%", description: "Anual sobre el valor tasado" },
        { name: "Seguro de Propiedad", percentage: "Variable", description: "Depende del valor y ubicación" },
        { name: "Mantenimiento", percentage: "1-2%", description: "Anual sobre el valor de la propiedad" },
        { name: "Servicios Públicos", percentage: "Variable", description: "Electricidad, agua, internet, etc." }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Guía del Comprador</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Una guía completa para comprar propiedades en República Dominicana de manera segura y exitosa.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Comprar en República Dominicana</h2>
            <p className="text-lg text-slate-600">
              República Dominicana ofrece un mercado inmobiliario atractivo para inversores locales e internacionales. 
              Con una economía estable, crecimiento turístico constante y leyes que favorecen la inversión extranjera, 
              el país se ha convertido en un destino privilegiado para la compra de propiedades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Seguridad Jurídica",
                description: "Sistema legal que protege los derechos de propiedad de inversores extranjeros."
              },
              {
                title: "Crecimiento de Valor",
                description: "Propiedades con alto potencial de apreciación en zonas de alto desarrollo."
              },
              {
                title: "Calidad de Vida",
                description: "Excelente clima, playas paradisíacas y cultura vibrante."
              }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-amber-600">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Buying Process */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Proceso de Compra Paso a Paso</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Siga nuestra guía detallada para cada etapa del proceso de compra de su propiedad.
            </p>
          </div>

          <div className="space-y-8">
            {guideSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <CardDescription className="text-slate-600 mt-2">{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <Badge variant="outline" className="mr-2 mt-1 text-amber-600 border-amber-600">✓</Badge>
                        <span className="text-sm text-slate-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Costs Breakdown */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Costos a Considerar</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Conozca todos los costos asociados con la compra de una propiedad en República Dominicana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {costs.map((costCategory, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-amber-600">{costCategory.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costCategory.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="border-l-2 border-amber-200 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-slate-900">{item.name}</h4>
                            <p className="text-sm text-slate-600">{item.description}</p>
                          </div>
                          <Badge variant="secondary">{item.percentage}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Consejos para Compradores</h2>
            <p className="text-lg text-slate-600">
              Recomendaciones de expertos para una compra exitosa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Trabaje siempre con un agente inmobiliario certificado",
              "Visite múltiples propiedades antes de tomar una decisión",
              "No apresure el proceso de due diligence",
              "Considere el potencial de alquiler para propiedades de inversión",
              "Negocie siempre los términos y condiciones",
              "Manténgase informado sobre las tendencias del mercado",
              "Verifique la reputación del constructor o vendedor",
              "Considere los costos de mantenimiento a largo plazo"
            ].map((tip, index) => (
              <div key={index} className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1">💡</span>
                <span className="text-slate-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Comprar su Propiedad?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestros expertos están listos para guiarle en cada paso del proceso de compra.
          </p>
          <Button variant="secondary" size="lg" className="text-amber-600 hover:bg-amber-50">
            Contactar a un Agente
          </Button>
        </div>
      </div>
