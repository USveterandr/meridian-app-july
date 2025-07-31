import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function HelpPage() {
  const helpCategories = [
    {
      title: "Guías de Compra",
      description: "Recursos completos para guiarle en el proceso de comprar una propiedad en República Dominicana.",
      articles: [
        "Cómo comprar su primera propiedad",
        "Guía para inversionistas extranjeros",
        "Proceso de verificación de documentos",
        "Financiamiento para compradores"
      ],
      icon: "🏠"
    },
    {
      title: "Guías de Venta",
      description: "Todo lo que necesita saber para vender su propiedad de manera rápida y al mejor precio.",
      articles: [
        "Cómo preparar su propiedad para la venta",
        "Estrategias de precios efectivas",
        "Marketing para su propiedad",
        "Proceso de cierre de venta"
      ],
      icon: "💰"
    },
    {
      title: "Inversión",
      description: "Análisis y consejos para maximizar el retorno de su inversión inmobiliaria.",
      articles: [
        "Mejores zonas para invertir en 2025",
        "Análisis de rentabilidad de propiedades",
        "Inversión en propiedades comerciales",
        "Beneficios fiscales para inversionistas"
      ],
      icon: "📈"
    },
    {
      title: "Legal y Financiero",
      description: "Información sobre aspectos legales, financieros y fiscales de las transacciones inmobiliarias.",
      articles: [
        "Entendiendo los impuestos inmobiliarios",
        "Proceso de due diligence legal",
        "Estructuras corporativas para inversión",
        "Protección de activos inmobiliarios"
      ],
      icon: "⚖️"
    }
  ]

  const faqs = [
    {
      question: "¿Pueden los extranjeros comprar propiedades en República Dominicana?",
      answer: "Sí, los extranjeros pueden comprar propiedades en República Dominicana con los mismos derechos que los ciudadanos locales. No existen restricciones para la compra de bienes raíces por parte de extranjeros."
    },
    {
      question: "¿Cuánto tiempo toma el proceso de compra de una propiedad?",
      answer: "El proceso típico de compra toma entre 30 y 60 días. Esto incluye la negociación, due diligence, preparación de documentos y el cierre. Los plazos pueden variar dependiendo de la complejidad de la transacción."
    },
    {
      question: "¿Qué costos adicionales debo considerar al comprar una propiedad?",
      answer: "Además del precio de compra, debe considerar: impuestos de transferencia (3%), honorarios legales (1-2%), costos de registro (aproximadamente 1%), y comisiones de corretaje (generalmente pagadas por el vendedor, 3-5%)."
    },
    {
      question: "¿Ofrecen servicios de gestión de propiedades?",
      answer: "Sí, ofrecemos servicios completos de gestión de propiedades que incluyen: búsqueda de inquilinos, cobro de rentas, mantenimiento, reportes financieros y administración general de la propiedad."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Centro de Ayuda</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Encuentre respuestas a sus preguntas y acceda a recursos para guiarle en su viaje inmobiliario.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="py-8 bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar artículos, guías o preguntas..."
              className="w-full pl-12 pr-4 py-3 text-lg border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">🔍</span>
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Explorar por Categoría</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Nuestros recursos están organizados para ayudarle a encontrar rápidamente lo que necesita.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription className="text-slate-600">{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <div key={articleIndex} className="flex items-center text-sm text-slate-600 hover:text-amber-600">
                        <span className="mr-2">→</span>
                        {article}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Ver Todos los Artículos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Necesita Ayuda Inmediata?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Nuestro equipo de expertos está disponible para ayudarle con cualquier consulta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Chat en Vivo",
                description: "Chatee con un agente en tiempo real",
                action: "Iniciar Chat",
                badge: "Disponible 24/7"
              },
              {
                title: "Llamada Telefónica",
                description: "Hable con un especialista directamente",
                action: "Llamar Ahora",
                badge: "Respuesta Rápida"
              },
              {
                title: "Solicitud Personalizada",
                description: "Reciba una consulta personalizada",
                action: "Solicitar Consulta",
                badge: "Expertos Disponibles"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">{item.badge}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{item.description}</p>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    {item.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-lg text-slate-600">
              Respuestas a las preguntas más comunes sobre el mercado inmobiliario dominicano.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
