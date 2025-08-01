import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Scale, Shield, Gavel, Users, Building } from "lucide-react"

export default function LegalPage() {
  const services = [
    {
      icon: <Scale className="h-8 w-8 text-amber-600" />,
      title: "Consultoría Legal Inmobiliaria",
      description: "Asesoramiento experto en todas las etapas de las transacciones inmobiliarias, desde la negociación hasta el cierre.",
      features: [
        "Revisión de contratos de compraventa",
        "Análisis de títulos de propiedad",
        "Estructuración de sociedades de inversión",
        "Due diligence legal completa"
      ]
    },
    {
      icon: <Shield className="h-8 w-8 text-amber-600" />,
      title: "Cumplimiento Normativo",
      description: "Garantizamos que todas sus operaciones cumplan con las leyes y regulaciones dominicanas.",
      features: [
        "Verificación de permisos de construcción",
        "Cumplimiento CONFOTUR",
        "Regulaciones de zonas francas",
        "Normativas de extranjería"
      ]
    },
    {
      icon: <Gavel className="h-8 w-8 text-amber-600" />,
      title: "Resolución de Conflictos",
      description: "Representación legal en disputas y litigios relacionados con propiedades e inversiones.",
      features: [
        "Mediación y arbitraje",
        "Litigios contractuales",
        "Desalojos y recuperaciones",
        "Defensa de derechos de propiedad"
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-amber-600" />,
      title: "Inmigración y Residencia",
      description: "Asesoría legal para inversores extranjeros que buscan establecer residencia en República Dominicana.",
      features: [
        "Residencia por inversión",
        "Visas de rentista",
        "Ciudadanía por naturalización",
        "Reunificación familiar"
      ]
    },
    {
      icon: <Building className="h-8 w-8 text-amber-600" />,
      title: "Estructuración Corporativa",
      description: "Diseño de estructuras legales óptimas para maximizar beneficios y minimizar riesgos.",
      features: [
        "Constitución de sociedades",
        "Planificación sucesoria",
        "Fideicomisos inmobiliarios",
        "Joint ventures"
      ]
    },
    {
      icon: <FileText className="h-8 w-8 text-amber-600" />,
      title: "Documentación Legal",
      description: "Preparación y gestión de toda la documentación necesaria para sus transacciones.",
      features: [
        "Elaboración de contratos",
        "Poderes notariales",
        "Escrituras públicas",
        "Registro de propiedades"
      ]
    }
  ]

  const legalFramework = [
    {
      title: "Constitución Política",
      description: "Garantiza el derecho a la propiedad privada y establece los principios fundamentales del sistema legal dominicano."
    },
    {
      title: "Código Civil",
      description: "Regula las relaciones civiles, contratos, propiedad y obligaciones entre personas físicas y jurídicas."
    },
    {
      title: "Ley 108-05 sobre Registro Inmobiliario",
      description: "Establece el sistema de registro de títulos y garantiza la seguridad jurídica de las transacciones inmobiliarias."
    },
    {
      title: "Ley 158-01 sobre Fomento al Turismo",
      description: "Crea el régimen de incentivos fiscales CONFOTUR para proyectos turísticos y de inversión."
    },
    {
      title: "Ley General de Inmigración 285-04",
      description: "Regula la entrada, permanencia y residencia de extranjeros en el país."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Asesoría Legal</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Proteja su inversión con nuestro equipo de expertos legales especializados en derecho inmobiliario dominicano.
          </p>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nuestros Servicios Legales</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ofrecemos un servicio integral de asesoría legal para garantizar la seguridad y éxito de sus inversiones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {service.icon}
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <span className="text-amber-600 mr-2 mt-1 text-xs">•</span>
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Legal Framework */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Marco Legal Dominicano</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Conozca las principales leyes que regulan las inversiones inmobiliarias en República Dominicana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalFramework.map((item, index) => (
              <Card key={index} className="border-l-4 border-l-amber-600">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nuestro Proceso Legal</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Un método estructurado para garantizar la máxima seguridad en cada transacción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consulta Inicial",
                description: "Evaluamos sus necesidades y objetivos para definir la estrategia legal adecuada."
              },
              {
                step: "02",
                title: "Due Diligence",
                description: "Investigación exhaustiva de la propiedad y antecedentes legales."
              },
              {
                step: "03",
                title: "Estructuración",
                description: "Diseñamos la estructura legal y fiscal óptima para su inversión."
              },
              {
                step: "04",
                title: "Cierre y Seguimiento",
                description: "Gestionamos el cierre de la operación y proporcionamos soporte continuo."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesita Asesoría Legal Inmediata?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo de abogados especializados está listo para proteger su inversión.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-amber-600 hover:bg-amber-50">
              Agendar Consulta
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-amber-600">
              <a href="mailto:legal@meridian-dr.com">Enviar Email</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Legal Notice */}
      <div className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Aviso Legal</h3>
            <p className="text-slate-300 leading-relaxed">
              La información proporcionada en este sitio web tiene fines informativos generales y no constituye
              asesoramiento legal. La recepción de esta información no crea una relación abogado-cliente.
              No actúe sobre la base de esta información sin buscar asesoramiento legal profesional.
              Los resultados pasados no garantizan resultados futuros. Meridian República Dominicana y sus
              afiliados no se responsabilizan por las acciones tomadas basadas en la información aquí contenida.
            </p>
            <p className="text-slate-400 mt-6 text-sm">
              © 2024 Meridian República Dominicana. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
