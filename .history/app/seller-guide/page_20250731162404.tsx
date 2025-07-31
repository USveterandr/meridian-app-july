import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function SellerGuidePage() {
  const guideSteps = [
    {
      step: "1",
      title: "Evaluación Inicial de la Propiedad",
      description: "Realice una evaluación objetiva de su propiedad para determinar su valor en el mercado actual.",
      details: [
        "Contrate un avalúo profesional",
        "Investigue precios de propiedades comparables",
        "Considere mejoras y reparaciones necesarias",
        "Evalúe la ubicación y amenities del área"
      ]
    },
    {
      step: "2",
      title: "Preparación de la Propiedad",
      description: "Prepare su propiedad para maximizar su atractivo y valor percibido.",
      details: [
        "Realice reparaciones y mantenimiento pendiente",
        "Despersonalice y descluttere los espacios",
        "Mejore el curb appeal (apariencia exterior)",
        "Considere home staging profesional"
      ]
    },
    {
      step: "3",
      title: "Establecimiento del Precio",
      description: "Determine una estrategia de precios competitiva basada en el análisis de mercado.",
      details: [
        "Analice el mercado actual y tendencias",
        "Considere el tiempo estimado de venta",
        "Establezca un margen para negociación",
        "Evite sobreprecionar la propiedad"
      ]
    },
    {
      step: "4",
      title: "Marketing y Promoción",
      description: "Implemente una estrategia de marketing efectiva para atraer compradores potenciales.",
      details: [
        "Fotografía y video profesional",
        "Listado en plataformas inmobiliarias premium",
        "Marketing en redes sociales y digitales",
        "Tours virtuales y open houses"
      ]
    },
    {
      step: "5",
      title: "Gestión de Visitas y Ofertas",
      description: "Coordine las visitas y evalúe las ofertas recibidas de manera estratégica.",
      details: [
        "Programe visitas de manera eficiente",
        "Requiera pre-calificación de compradores",
        "Evalúe cada oferta cuidadosamente",
        "Considere no solo el precio sino también las condiciones"
      ]
    },
    {
      step: "6",
      title: "Negociación y Cierre",
      description: "Negocie los términos finales y complete el proceso de venta.",
      details: [
        "Responda a las contingencias del comprador",
        "Negocie reparaciones o créditos",
        "Revise el contrato con su abogado",
        "Coordine la fecha de cierre y entrega"
      ]
    }
  ]

  const marketingStrategies = [
    {
      title: "Fotografía Profesional",
      description: "Imágenes de alta calidad son esenciales para captar la atención inicial de los compradores.",
      tips: [
        "Contrate un fotógrafo especializado en bienes raíces",
        "Incluya fotos de exteriores, interiores y amenities",
        "Use iluminación natural y ángulos favorables",
        "Considere fotografía aérea con dron"
      ]
    },
    {
      title: "Descripción Atractiva",
      description: "Una descripción detallada y persuasiva puede generar más interés y visitas.",
      tips: [
        "Destaque características únicas de la propiedad",
        "Mencione mejoras recientes y acabados de lujo",
        "Describa el estilo de vida que ofrece la propiedad",
        "Incluya información sobre la ubicación y comunidad"
      ]
    },
    {
      title: "Tours Virtuales",
      description: "Los tours virtuales permiten a los compradores explorar la propiedad desde cualquier lugar.",
      tips: [
        "Ofrezca un tour 360° de todas las habitaciones",
        "Incluya floor plans interactivos",
        "Asegure buena calidad de video y navegación",
        "Destaque características especiales con puntos de interés"
      ]
    },
    {
      title: "Marketing Digital",
      description: "Utilice canales digitales para alcanzar un público más amplio de compradores potenciales.",
      tips: [
        "Publique en redes sociales con anuncios segmentados",
        "Utilice SEO para mejorar la visibilidad online",
        "Cree una página web dedicada a la propiedad",
        "Envíe boletines a su base de contactos"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Guía del Vendedor</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Aprenda a vender su propiedad en República Dominicana rápidamente y al mejor precio posible.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Vender con Éxito</h2>
            <p className="text-lg text-slate-600">
              El mercado inmobiliario dominicano ofrece excelentes oportunidades para vendedores que saben 
              cómo presentar y promocionar sus propiedades. Con la estrategia correcta, puede maximizar 
              el valor de su propiedad y reducir el tiempo en el mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Mercado Activo",
                description: "Alta demanda de propiedades en zonas turísticas y urbanas."
              },
              {
                title: "Compradores Internacionales",
                description: "Interés creciente de inversores extranjeros en el país."
              },
              {
                title: "Valorización Constante",
                description: "Propiedades con tendencia a la apreciación a largo plazo."
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

      {/* Selling Process */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Proceso de Venta Paso a Paso</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Siga nuestra guía detallada para cada etapa del proceso de venta de su propiedad.
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
