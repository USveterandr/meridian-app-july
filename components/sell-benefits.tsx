import { Card, CardContent } from "@/components/ui/card"
import { Globe, Users, TrendingUp, Shield, Camera, Headphones } from "lucide-react"

export function SellBenefits() {
  const benefits = [
    {
      icon: Globe,
      title: "Exposición Internacional",
      description: "Tu propiedad será vista por inversionistas de todo el mundo",
      stats: "40+ países",
    },
    {
      icon: Users,
      title: "Compradores Verificados",
      description: "Solo inversionistas serios con documentación validada",
      stats: "1,200+ activos",
    },
    {
      icon: TrendingUp,
      title: "Precio Competitivo",
      description: "Análisis de mercado para optimizar el precio de venta",
      stats: "15% más valor",
    },
    {
      icon: Shield,
      title: "Proceso Seguro",
      description: "Verificación legal completa y proceso de escrow",
      stats: "100% seguro",
    },
    {
      icon: Camera,
      title: "Fotografía Profesional",
      description: "Servicio gratuito de fotografía profesional incluido",
      stats: "Sin costo extra",
    },
    {
      icon: Headphones,
      title: "Soporte Dedicado",
      description: "Asesor personal durante todo el proceso de venta",
      stats: "24/7 disponible",
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">¿Por Qué Elegir Meridian?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ofrecemos la mejor experiencia para vender tu propiedad de lujo con máxima rentabilidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-6">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 mb-4">{benefit.description}</p>
                <div className="text-2xl font-bold text-amber-600">{benefit.stats}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
