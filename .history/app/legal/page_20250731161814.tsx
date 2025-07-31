import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LegalPage() {
  const services = [
    {
      title: "Due Diligence Inmobiliaria",
      description: "Investigación exhaustiva de la propiedad para verificar su estatus legal, histórico y posibles cargas o gravámenes.",
      features: [
        "Verificación de títulos de propiedad",
        "Análisis de registros públicos",
        "Evaluación de cargas y gravámenes",
        "Revisión de permisos de construcción"
      ]
    },
    {
      title: "Estructuración de Transacciones",
      description: "Diseño de la estructura legal más eficiente para tu inversión, considerando aspectos fiscales y de protección de activos.",
      features: [
        "Creación de sociedades locales",
        "Estructuración fiduciaria",
        "Planificación fiscal internacional",
        "Protección de activos y patrimonio"
      ]
    },
    {
      title: "Contratos y Negociación",
      description: "Elaboración y revisión de contratos de compra-venta, arrendamiento y otros acuerdos relacionados con propiedades.",
      features: [
        "Contratos de compra-venta",
        "Acuerdos de promesa de venta",
        "Contratos de arrendamiento",
        "Acuerdos de asociación"
      ]
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
