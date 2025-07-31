import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FAQPage() {
  const faqCategories = [
    {
      name: "Compra de Propiedades",
      questions: [
        {
          question: "¿Pueden los extranjeros comprar propiedades en República Dominicana?",
          answer: "Sí, los extranjeros pueden comprar propiedades en República Dominicana con los mismos derechos que los ciudadanos locales. No existen restricciones para la compra de bienes raíces por parte de extranjeros, ya sea para residencia, inversión o vacaciones."
        },
        {
          question: "¿Cuánto tiempo toma el proceso de compra de una propiedad?",
          answer: "El proceso típico de compra toma entre 30 y 60 días. Esto incluye la negociación, due diligence (verificación legal), preparación de documentos y el cierre. Los plazos pueden variar dependiendo de la complejidad de la transacción y si se requiere financiamiento."
        },
        {
          question: "¿Qué costos adicionales debo considerar al comprar una propiedad?",
          answer: "Además del precio de compra, debe considerar: impuestos de transferencia (3%), honorarios legales (1-2%), costos de registro (aproximadamente 1%), y comisiones de corretaje (generalmente pagadas por el vendedor, 3-5%). También puede haber costos de avalúo y otros gastos administrativos."
        },
        {
          question: "¿Necesito un abogado para comprar una propiedad?",
          answer: "Sí, es altamente recomendable contratar un abogado especializado en derecho inmobiliario. El abogado realizará el due diligence, verificará los documentos, preparará el contrato y asegurará que la transacción cumpla con todas las leyes dominicanas."
        }
      ]
    },
    {
      name: "Venta de Propiedades",
      questions: [
        {
          question: "¿Cómo determino el precio de venta de mi propiedad?",
          answer: "El precio se determina mediante un avalúo profesional, análisis de propiedades comparables en la zona, condiciones del mercado actual, características únicas de la propiedad y tendencias del sector. Un agente inmobiliario experimentado puede ayudarle a establecer el precio óptimo."
        },
        {
          question: "¿Qué documentos necesito para vender mi propiedad?",
          answer: "Necesitará: título de propiedad original, cédula de identidad y electoral, certificado de no gravamen, planos de la propiedad, recibos de impuestos prediales al día, y si aplica, permisos de construcción y reglamentos de condominio."
        },
        {
          question: "¿Cuánto tiempo suele tomar vender una propiedad?",
          answer: "El tiempo promedio de venta varía según la ubicación, precio y condiciones del mercado. En zonas de alta demanda puede tomar de 1-3 meses, mientras que en áreas menos populares o propiedades de lujo puede tomar de 3-6 meses o más."
        },
        {
          question: "¿Debo hacer reparaciones antes de vender?",
          answer: "Depende del estado de la propiedad. Pequeñas reparaciones y mejoras cosméticas generalmente aumentan el atractivo y el valor de venta. Sin embargo, reparaciones mayores solo se recomiendan si el retorno de la inversión justifica el gasto."
        }
      ]
    },
    {
      name: "Inversión y Financiamiento",
      questions: [
        {
          question: "¿Qué opciones de financiamiento están disponibles para extranjeros?",
          answer: "Los extranjeros pueden acceder a financiamiento local a través de bancos dominicanos, aunque los requisitos pueden ser más estrictos. También existen opciones de financiamiento internacional, préstamos entre particulares y financiamiento directo de desarrolladores."
        },
        {
          question: "¿Cuáles son las mejores zonas para invertir en República Dominicana?",
          answer: "Las zonas más populares para inversión son: Punta Cana y Bávaro (turismo), Santo Domingo (sector financiero y corporativo), Santiago (sector industrial), Las Terrenas y Samaná (turismo ecológico), y Puerto Plata (re-emergente turística)."
        },
        {
          question: "¿Qué rentabilidad puedo esperar de una inversión inmobiliaria?",
          answer: "La rentabilidad varía según el tipo de propiedad y ubicación. En general, puede esperar un 4-8% anual en rentas residenciales, 6-10% en propiedades comerciales, y potencialmente mayor en proyectos de desarrollo o zonas de alto crecimiento."
        },
        {
          question: "¿Qué beneficios fiscales ofrecen las leyes CONFOTUR?",
          answer: "CONFOTUR ofrece exención del impuesto sobre la renta por 10 años, exención del impuesto de transferencia de bienes inmuebles en la primera compra, y exención del impuesto a los activos. Estos beneficios aplican para proyectos de turismo y desarrollo aprobados."
        }
      ]
    },
    {
      name: "Aspectos Legales",
      questions: [
        {
          question: "¿Cómo se registra una propiedad a mi nombre?",
          answer: "El registro se realiza en la Oficina de Registro de Títulos correspondiente. El proceso incluye la presentación del título de propiedad, pago de impuestos de transferencia, verificación legal por parte del registrador, y finalmente la inscripción del nuevo título a su nombre."
        },
        {
          question: "¿Qué es el due diligence inmobiliario?",
          answer: "Es un proceso de investigación exhaustiva para verificar el estatus legal de la propiedad. Incluye: verificación del título, búsqueda de gravámenes o embargos, revisión de permisos de construcción, cumplimiento de normativas municipales, y validación de límites y medidas."
        },
        {
          question: "¿Puedo comprar una propiedad estando en el extranjero?",
          answer: "Sí, puede comprar una propiedad desde el extranjero mediante un poder notarial. Muchos inversores otorgan poder a su abogado o a un representante de confianza para que realice la transacción en su nombre. También es posible viajar específicamente para el cierre."
        },
        {
          question: "¿Qué restricciones existen para propiedades en zona fronteriza?",
          answer: "La Constitución dominicana restringe la propiedad de terrenos en zona fronteriza (dentro de 50 km de la frontera) para extranjeros. Sin embargo, existen excepciones y mecanismos legales como la constitución de sociedades dominicanas que permiten la inversión en estas áreas."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Preguntas Frecuentes</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Encuentre respuestas a las preguntas más comunes sobre el mercado inmobiliario en República Dominicana.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="py-8 bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar preguntas..."
              className="w-full pl-12 pr-4 py-3 text-lg border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">🔍</span>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Preguntas por Categoría</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore nuestras respuestas organizadas por temas para encontrar rápidamente lo que busca.
            </p>
          </div>

          <div className="space-y-12">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{category.name}</h3>
                  <div className="w-20 h-1 bg-amber-600 rounded"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.questions.map((faq, faqIndex) => (
                    <Card key={faqIndex} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-start">
                          <Badge variant="outline" className="mr-3 mt-1 text-amber-600 border-amber-600">
                            Q
                          </Badge>
                          {faq.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
