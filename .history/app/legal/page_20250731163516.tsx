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
    },
    {
      title: "Permisos y Licencias",
      description: "Gestión y obtención de todos los permisos necesarios para el desarrollo y operación de propiedades comerciales y residenciales.",
      features: [
        "Permisos de construcción",
        "Licencias de operación",
        "Permisos ambientales",
        "Regularización de construcciones"
      ]
    },
    {
      title: "Resolución de Conflictos",
      description: "Representación legal en disputas relacionadas con propiedades, incluyendo mediación, arbitraje y litigio.",
      features: [
        "Mediación y arbitraje",
        "Litigio inmobiliario",
        "Desalojos y recuperaciones",
        "Conflictos de límites y linderos"
      ]
    },
    {
      title: "Cumplimiento Normativo",
      description: "Aseguramiento de que todas las operaciones y propiedades cumplan con la legislación dominicana vigente.",
      features: [
        "Cumplimiento CONFOTUR",
        "Normativas de zona franca",
        "Regulaciones de turismo",
        "Leyes de extranjería"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Asesoría Legal Inmobiliaria</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Proteja su inversión con nuestro equipo de expertos legales especializados en derecho inmobiliario dominicano.
          </p>
        </div>
      </div>

      {/* Why Legal Advice */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Por Qué Necesita Asesoría Legal?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              El mercado inmobiliario dominicano tiene sus particularidades legales. Una asesoría adecuada es crucial para una inversión segura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Seguridad Jurídica",
                description: "Garantizamos que su inversión esté protegida por un marco legal sólido y documentación impecable."
              },
              {
                title: "Prevención de Riesgos",
                description: "Identificamos y mitigamos potenciales riesgos legales antes, durante y después de la transacción."
              },
              {
                title: "Optimización Fiscal",
                description: "Estructuramos sus inversiones para maximizar beneficios fiscales dentro del marco legal vigente."
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

      {/* Legal Services */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nuestros Servicios Legales</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ofrecemos un servicio integral de asesoría legal para todas sus necesidades inmobiliarias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Badge variant="outline" className="mr-2 mt-1 text-amber-600 border-amber-600">✓</Badge>
                        <span className="text-sm text-slate-600">{feature}</span>
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
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nuestro Proceso Legal</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Un método estructurado para garantizar la seguridad y éxito de su transacción inmobiliaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Consulta Inicial", description: "Evaluamos sus necesidades y objetivos de inversión." },
              { step: "2", title: "Due Diligence", description: "Investigación exhaustiva de la propiedad seleccionada." },
              { step: "3", title: "Estructuración", description: "Diseñamos la estructura legal y fiscal óptima." },
              { step: "4", title: "Cierre", description: "Gestionamos todo el proceso de cierre legal." }
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
            Nuestro equipo de abogados especializados está listo para asesorarle en su próxima inversión inmobiliaria.
          </p>
          <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
            Consultar con un Abogado
          </button>
        </div>
      </div>
    </div>
  )
}
