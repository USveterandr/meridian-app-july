import { Card, CardContent } from "@/components/ui/card"
import { Home, Building, Hotel, TreePine, Waves, Building2 } from "lucide-react"

export function PropertyTypes() {
  const propertyTypes = [
    {
      icon: Home,
      title: "Casas de Lujo",
      description: "Residencias exclusivas con acabados premium",
      count: "150+ propiedades",
    },
    {
      icon: Building,
      title: "Propiedades Comerciales",
      description: "Oficinas, locales y centros comerciales",
      count: "80+ propiedades",
    },
    {
      icon: Building2,
      title: "Complejos de Apartamentos",
      description: "Edificios residenciales y condominios",
      count: "120+ propiedades",
    },
    {
      icon: Hotel,
      title: "Hoteles y Resorts",
      description: "Propiedades turísticas y hoteleras",
      count: "45+ propiedades",
    },
    {
      icon: TreePine,
      title: "Campos de Golf",
      description: "Desarrollos residenciales con golf",
      count: "12+ propiedades",
    },
    {
      icon: Waves,
      title: "Villas Costeras",
      description: "Propiedades frente al mar y playas",
      count: "200+ propiedades",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Tipos de Propiedades</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Desde casas de lujo hasta resorts completos, encuentra la inversión perfecta para tu portfolio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertyTypes.map((type, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg"
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <type.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {type.title}
                </h3>
                <p className="text-slate-600 mb-4">{type.description}</p>
                <div className="text-sm text-amber-600 font-semibold">{type.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
