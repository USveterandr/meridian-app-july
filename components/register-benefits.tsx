import { Card, CardContent } from "@/components/ui/card"
import { Eye, Bell, TrendingUp, Users, Shield, Headphones } from "lucide-react"

export function RegisterBenefits() {
  const benefits = [
    {
      icon: Eye,
      title: "Acceso Exclusivo",
      description: "Ve propiedades antes que el público general",
      highlight: "Primero en ver",
    },
    {
      icon: Bell,
      title: "Alertas Personalizadas",
      description: "Notificaciones de nuevas oportunidades según tus criterios",
      highlight: "Notificaciones VIP",
    },
    {
      icon: TrendingUp,
      title: "Análisis de Mercado",
      description: "Reportes exclusivos y tendencias del mercado inmobiliario",
      highlight: "Datos premium",
    },
    {
      icon: Users,
      title: "Red de Contactos",
      description: "Conecta con otros inversionistas y profesionales",
      highlight: "Networking",
    },
    {
      icon: Shield,
      title: "Verificación Completa",
      description: "Todas las propiedades 100% verificadas legalmente",
      highlight: "Garantía legal",
    },
    {
      icon: Headphones,
      title: "Soporte Premium",
      description: "Asesor personal dedicado para tus inversiones",
      highlight: "Servicio VIP",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Beneficios Exclusivos</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Al registrarte en Meridian, obtienes acceso a beneficios únicos que no encontrarás en ninguna otra
            plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all group">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                    {benefit.highlight}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-16 bg-slate-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Meridian vs Competencia</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Característica</th>
                  <th className="text-center py-4 px-4 font-semibold text-amber-600">Meridian</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-600">Otros</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4">Comisión</td>
                  <td className="py-4 px-4 text-center font-bold text-green-600">3%</td>
                  <td className="py-4 px-4 text-center text-red-600">6%</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4">Verificación Legal</td>
                  <td className="py-4 px-4 text-center text-green-600">✓ 100%</td>
                  <td className="py-4 px-4 text-center text-red-600">✗ Limitada</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4">Tiempo de Verificación</td>
                  <td className="py-4 px-4 text-center font-bold text-green-600">24-72h</td>
                  <td className="py-4 px-4 text-center text-red-600">1-2 semanas</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4">Soporte Dedicado</td>
                  <td className="py-4 px-4 text-center text-green-600">✓ Personal</td>
                  <td className="py-4 px-4 text-center text-red-600">✗ Genérico</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Incentivos Fiscales</td>
                  <td className="py-4 px-4 text-center text-green-600">✓ Asesoría</td>
                  <td className="py-4 px-4 text-center text-red-600">✗ No incluido</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
