import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calculator, Users, BookOpen, Download, Play } from "lucide-react"

export function InvestorResources() {
  const resources = [
    {
      icon: FileText,
      title: "Guía del Inversionista",
      description: "Manual completo sobre inversión inmobiliaria en RD",
      type: "PDF",
      size: "2.5 MB",
      action: "Descargar",
    },
    {
      icon: Calculator,
      title: "Calculadora ROI",
      description: "Herramienta para calcular retorno de inversión",
      type: "Herramienta",
      size: "Online",
      action: "Usar Ahora",
    },
    {
      icon: BookOpen,
      title: "Marco Legal",
      description: "Leyes y regulaciones para inversionistas extranjeros",
      type: "PDF",
      size: "1.8 MB",
      action: "Descargar",
    },
    {
      icon: Users,
      title: "Webinar: Invertir en RD",
      description: "Sesión en vivo con expertos del mercado",
      type: "Video",
      size: "45 min",
      action: "Ver Ahora",
    },
  ]

  const faqs = [
    {
      question: "¿Cuál es la inversión mínima requerida?",
      answer:
        "La inversión mínima varía según el tipo de propiedad, pero generalmente comienza desde $300,000 USD para propiedades residenciales de lujo.",
    },
    {
      question: "¿Qué incentivos fiscales están disponibles?",
      answer:
        "República Dominicana ofrece varios incentivos como CONFOTUR para turismo, Zonas Francas, y beneficios para pensionados e inversionistas extranjeros.",
    },
    {
      question: "¿Cuánto tiempo toma el proceso de compra?",
      answer:
        "El proceso típico toma entre 30-60 días, incluyendo verificación legal, financiamiento y transferencia de título.",
    },
    {
      question: "¿Puedo obtener financiamiento local?",
      answer:
        "Sí, varios bancos locales ofrecen financiamiento para inversionistas extranjeros con condiciones competitivas.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Recursos para Inversionistas</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Herramientas y documentos esenciales para tomar decisiones de inversión informadas
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-4">
                  <resource.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{resource.title}</h3>
                <p className="text-slate-600 mb-4 text-sm">{resource.description}</p>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                  <span>{resource.type}</span>
                  <span>{resource.size}</span>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                >
                  {resource.action === "Descargar" ? (
                    <Download className="h-4 w-4 mr-2" />
                  ) : resource.action === "Ver Ahora" ? (
                    <Play className="h-4 w-4 mr-2" />
                  ) : (
                    <Calculator className="h-4 w-4 mr-2" />
                  )}
                  {resource.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Preguntas Frecuentes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-3">{faq.question}</h4>
                <p className="text-slate-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">¿Listo para Invertir?</h3>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Nuestro equipo de expertos está listo para ayudarte a encontrar la oportunidad de inversión perfecta
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-700"
              >
                Agendar Consulta
              </Button>
              <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50">
                Ver Oportunidades
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
