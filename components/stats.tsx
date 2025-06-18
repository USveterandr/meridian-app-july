import { TrendingUp, Users, Shield, MapPin, DollarSign, Clock } from "lucide-react"

export function Stats() {
  const stats = [
    {
      icon: DollarSign,
      value: "$2.8B+",
      label: "Volumen de Ventas",
      description: "En transacciones inmobiliarias",
      color: "text-amber-600",
    },
    {
      icon: Users,
      value: "1,200+",
      label: "Inversionistas Activos",
      description: "Compradores verificados",
      color: "text-blue-600",
    },
    {
      icon: Shield,
      value: "100%",
      label: "Propiedades Verificadas",
      description: "Con JCE y Jurisdicción Inmobiliaria",
      color: "text-green-600",
    },
    {
      icon: MapPin,
      value: "32",
      label: "Provincias",
      description: "Cobertura nacional completa",
      color: "text-purple-600",
    },
    {
      icon: TrendingUp,
      value: "3%",
      label: "Comisión",
      description: "vs 6% de la competencia",
      color: "text-orange-600",
    },
    {
      icon: Clock,
      value: "24-72h",
      label: "Verificación",
      description: "Proceso de aprobación",
      color: "text-red-600",
    },
  ]

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Números que Hablan</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            La plataforma de confianza para inversiones inmobiliarias en República Dominicana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 transition-all group-hover:-translate-y-2">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 ${stat.color} bg-white/10`}
                >
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-slate-200 mb-2">{stat.label}</div>
                <div className="text-slate-400">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-amber-600/10 border border-amber-600/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">🇩🇴 Enfoque en República Dominicana</h3>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              Somos la única plataforma especializada exclusivamente en el mercado inmobiliario dominicano, con
              conocimiento profundo de las regulaciones locales, incentivos fiscales y oportunidades de inversión.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
