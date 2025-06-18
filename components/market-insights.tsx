import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Building, DollarSign } from "lucide-react"

export function MarketInsights() {
  const insights = [
    {
      title: "Crecimiento del Turismo",
      value: "+12.5%",
      description: "Aumento anual de visitantes internacionales",
      trend: "up",
      icon: Users,
    },
    {
      title: "Apreciación Inmobiliaria",
      value: "+8.3%",
      description: "Incremento promedio anual en valores",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Nuevos Desarrollos",
      value: "150+",
      description: "Proyectos aprobados en 2024",
      trend: "up",
      icon: Building,
    },
    {
      title: "Inversión Extranjera",
      value: "$2.8B",
      description: "Capital internacional en el sector",
      trend: "up",
      icon: DollarSign,
    },
  ]

  const marketData = [
    {
      region: "Punta Cana",
      avgPrice: "$450,000",
      growth: "+15%",
      demand: "Alta",
      roi: "18-22%",
    },
    {
      region: "Santo Domingo",
      avgPrice: "$320,000",
      growth: "+8%",
      demand: "Media",
      roi: "12-16%",
    },
    {
      region: "Puerto Plata",
      avgPrice: "$280,000",
      growth: "+12%",
      demand: "Alta",
      roi: "15-20%",
    },
    {
      region: "Samaná",
      avgPrice: "$380,000",
      growth: "+20%",
      demand: "Muy Alta",
      roi: "20-25%",
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Análisis de Mercado</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Datos actualizados del mercado inmobiliario dominicano para tomar decisiones informadas
          </p>
        </div>

        {/* Market Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {insights.map((insight, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg mb-4">
                  <insight.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{insight.value}</div>
                <div className="text-lg font-semibold text-slate-700 mb-1">{insight.title}</div>
                <div className="text-sm text-slate-600">{insight.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Regional Market Data */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Análisis Regional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 font-semibold text-slate-900">Región</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900">Precio Promedio</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900">Crecimiento</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900">Demanda</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900">ROI Esperado</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((data, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-4 font-medium text-slate-900">{data.region}</td>
                      <td className="py-4 px-4 text-slate-700">{data.avgPrice}</td>
                      <td className="py-4 px-4">
                        <span className="text-green-600 font-semibold">{data.growth}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            data.demand === "Muy Alta"
                              ? "bg-red-100 text-red-800"
                              : data.demand === "Alta"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {data.demand}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-amber-600">{data.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Market Trends */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Tendencias del Mercado 2024</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🏖️</div>
              <h4 className="font-semibold text-slate-900 mb-2">Turismo de Lujo</h4>
              <p className="text-slate-600 text-sm">
                Creciente demanda de propiedades vacacionales premium y resorts boutique
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🌱</div>
              <h4 className="font-semibold text-slate-900 mb-2">Sostenibilidad</h4>
              <p className="text-slate-600 text-sm">
                Proyectos eco-friendly con certificaciones ambientales tienen mayor demanda
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💼</div>
              <h4 className="font-semibold text-slate-900 mb-2">Trabajo Remoto</h4>
              <p className="text-slate-600 text-sm">
                Aumento en la demanda de propiedades para nómadas digitales y trabajo remoto
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
