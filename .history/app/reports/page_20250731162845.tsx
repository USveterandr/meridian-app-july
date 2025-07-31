import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ReportsPage() {
  const marketReports = [
    {
      id: 1,
      title: "Análisis del Mercado 2024: Tendencias y Proyecciones",
      category: "Análisis General",
      date: "Enero 2024",
      description: "Un análisis exhaustivo del comportamiento del mercado inmobiliario dominicano durante 2023 y las proyecciones para 2024. Incluye datos de precios, volumen de transacciones y zonas emergentes.",
      highlights: [
        "Crecimiento promedio de precios: 8.5%",
        "Aumento en demanda de propiedades de lujo: 15%",
        "Zonas con mayor potencial de apreciación",
        "Impacto del turismo en el mercado residencial"
      ],
      price: "Gratis",
      featured: true
    },
    {
      id: 2,
      title: "Guía de Inversión en Punta Cana y Bávaro",
      category: "Análisis Regional",
      date: "Diciembre 2023",
      description: "Análisis detallado del mercado en la zona turística más importante del país. Incluye rentabilidad por tipo de propiedad, análisis de competencia y oportunidades de inversión.",
      highlights: [
        "Rentabilidad promedio en alquileres: 6-9%",
        "Precio promedio por m² en zona turística",
        "Ocupación hotelera y su impacto",
        "Proyectos de desarrollo anunciados"
      ],
      price: "$49 USD"
    },
    {
      id: 3,
      title: "Mercado de Propiedades Comerciales en Santo Domingo",
      category: "Sector Específico",
      date: "Noviembre 2023",
      description: "Estudio especializado sobre el mercado de oficinas, locales comerciales y espacios industriales en la capital. Incluye análisis de vacancia, rendimientos y tendencias.",
      highlights: [
        "Tasa de vacancia en oficinas clase A: 7%",
        "Rendimientos promedio en centros comerciales",
        "Zonas de mayor crecimiento corporativo",
        "Impacto del trabajo remoto en la demanda"
      ],
      price: "$79 USD"
    },
    {
      id: 4,
      title: "CONFOTUR y Beneficios Fiscales para Inversionistas",
      category: "Legal y Fiscal",
      date: "Octubre 2023",
      description: "Guía completa sobre los beneficios fiscales disponibles para inversionistas inmobiliarios en República Dominicana, incluyendo un análisis detallado de la ley CONFOTUR.",
      highlights: [
        "Proyectos aprobados bajo CONFOTUR",
        "Proceso de solicitud de beneficios",
        "Comparativo de rentabilidad con y sin beneficios",
        "Casos de estudio de éxito"
      ],
      price: "$39 USD"
    },
    {
      id: 5,
      title: "Sostenibilidad y Construcción Verde en RD",
      category: "Tendencias",
      date: "Septiembre 2023",
      description: "Análisis del crecimiento de la construcción sostenible en República Dominicana, certificaciones disponibles y el impacto en el valor de las propiedades.",
      highlights: [
        "Propiedades con certificación LEED/EDGE",
        "Ahorro energético en construcciones verdes",
        "Demanda del mercado por propiedades sostenibles",
        "Incentivos gubernamentales para construcción verde"
      ],
      price: "$59 USD"
    },
    {
      id: 6,
      title: "Mercado de Lujo: Propiedades Premium en RD",
      category: "Segmento Específico",
      date: "Agosto 2023",
      description: "Análisis exclusivo del mercado de propiedades de lujo en República Dominicana, incluyendo perfiles de compradores, zonas preferidas y tendencias de diseño.",
      highlights: [
        "Perfil del comprador de propiedades de lujo",
        "Zonas exclusivas y sus características",
        "Tendencias en amenities premium",
        "Precios récord y transacciones destacadas"
      ],
      price: "$99 USD"
    }
  ]

  const subscriptionPlans = [
    {
      name: "Básico",
      price: "$0",
      period: "mes",
      features: [
        "Acceso a reportes gratuitos",
        "Resúmenes mensuales del mercado",
        "Newsletter informativo",
        "Acceso a artículos básicos"
      ],
      cta: "Suscribirse Gratis",
      popular: false
    },
    {
      name: "Profesional",
      price: "$29",
      period: "mes",
      features: [
        "Todo lo del plan Básico",
        "1 reporte premium al mes",
        "Análisis de zonas específicas",
        "Webinars exclusivos",
        "Soporte por email"
      ],
      cta: "Comenzar Prueba Gratis",
      popular: true
    },
    {
      name: "Empresarial",
      price: "$99",
      period: "mes",
      features: [
        "Todo lo del plan Profesional",
        "Acceso ilimitado a todos los reportes",
        "Datos personalizados a medida",
        "Consultas con analistas",
        "API de datos para integración"
      ],
      cta: "Contactar Ventas",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Reportes de Mercado</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Acceda a análisis exhaustivos, datos actualizados e informes especializados del mercado inmobiliario dominicano.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Buscar reportes..."
              className="flex-1"
            />
            <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Todas las Categorías</option>
              <option>Análisis General</option>
              <option>Análisis Regional</option>
              <option>Sector Específico</option>
              <option>Legal y Fiscal</option>
              <option>Tendencias</option>
            </select>
            <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Ordenar por Fecha</option>
              <option>Más Populares</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Report */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge className="mb-4 bg-amber-600 text-white">Reporte Destacado</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Análisis del Mercado 2024</h2>
            <p className="text-lg text-slate-600 max-w-3xl">
              Nuestro reporte más completo y solicitado. Obtenga una visión detallada del estado actual del mercado 
              y las proyecciones para el próximo año.
            </p>
          </div>
          <Card className="bg-gradient-to-r from-amber-50 to-slate-50 border-amber-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    Análisis del Mercado 2024: Tendencias y Proyecciones
                  </CardTitle>
                  <CardDescription className="text-base">
                    Análisis General • Enero 2024
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-amber-600">Gratis</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6">
                Un análisis exhaustivo del comportamiento del mercado inmobiliario dominicano durante 2023 y las 
                proyecciones para 2024. Incluye datos de precios, volumen de transacciones y zonas emergentes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  "Crecimiento promedio de precios: 8.5%",
                  "Aumento en demanda de propiedades de lujo: 15%",
                  "Zonas con mayor potencial de apreciación",
                  "Impacto del turismo en el mercado residencial"
                ].map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span className="text-sm text-slate-700">{highlight}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                Descargar Reporte Gratuito
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Reports */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Todos los Reportes</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore nuestra completa biblioteca de informes de mercado y análisis especializados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketReports.filter(report => !report.featured).map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{report.category}</Badge>
                    <span className="text-sm text-slate-500">{report.date}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight">{report.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {report.description}
                  </CardDescription>
                  <div className="space-y-2 mb-6">
                    {report.highlights.slice(0, 3).map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-amber-600 mr-2 mt-1 text-xs">•</span>
                        <span className="text-xs text-slate-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-amber-600">{report.price}</span>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Planes de Suscripción</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Acceda a contenido exclusivo y manténgase informado con nuestras suscripciones flexibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-amber-600 shadow-xl' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-amber-600 text-white px-4 py-1">Más Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-slate-600">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="text-amber-600 mr-2">✓</span>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesita un Reporte Personalizado?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ofrecemos análisis a medida para inversores y empresas que requieren información específica del mercado.
          </p>
          <Button variant="secondary" size="lg" className="text-amber-600 hover:bg-amber-50">
            Solicitar Reporte a Medida
          </Button>
        </div>
      </div>
    </div>
  )
}
