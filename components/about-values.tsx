import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Zap, Globe, Award, Heart } from "lucide-react"

export function AboutValues() {
  const values = [
    {
      icon: Shield,
      title: "Transparencia Total",
      description: "Verificación completa de todas las propiedades y documentación legal al 100%",
    },
    {
      icon: Users,
      title: "Servicio Personalizado",
      description: "Asesoría dedicada con expertos locales que entienden tus necesidades específicas",
    },
    {
      icon: Zap,
      title: "Innovación Tecnológica",
      description: "Plataforma de vanguardia que simplifica el proceso de inversión inmobiliaria",
    },
    {
      icon: Globe,
      title: "Alcance Global",
      description: "Conectamos inversionistas de todo el mundo con las mejores oportunidades locales",
    },
    {
      icon: Award,
      title: "Excelencia Comprobada",
      description: "25 años de experiencia y más de $2.8B en transacciones exitosas",
    },
    {
      icon: Heart,
      title: "Compromiso Social",
      description: "Contribuimos al desarrollo sostenible y responsable de República Dominicana",
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Nuestros Valores</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Los principios que guían cada decisión y acción en Meridian
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
