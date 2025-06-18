import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, MapPin, Calendar, DollarSign } from "lucide-react"
import Image from "next/image"

export function InvestmentOpportunities() {
  const opportunities = [
    {
      id: 1,
      title: "Resort Turístico Samaná",
      location: "Las Terrenas, Samaná",
      investment: "$2,500,000",
      roi: "22%",
      period: "5 años",
      type: "Turismo",
      image: "/placeholder.svg?height=300&width=400",
      description: "Complejo hotelero de 50 habitaciones con playa privada",
      highlights: ["Playa privada", "50 habitaciones", "Spa incluido", "CONFOTUR aprobado"],
    },
    {
      id: 2,
      title: "Desarrollo Residencial Punta Cana",
      location: "Cap Cana, Punta Cana",
      investment: "$5,000,000",
      roi: "18%",
      period: "7 años",
      type: "Residencial",
      image: "/placeholder.svg?height=300&width=400",
      description: "120 villas de lujo con campo de golf",
      highlights: ["120 villas", "Campo de golf", "Club house", "Marina privada"],
    },
    {
      id: 3,
      title: "Centro Comercial Santo Domingo",
      location: "Bella Vista, Santo Domingo",
      investment: "$8,000,000",
      roi: "15%",
      period: "10 años",
      type: "Comercial",
      image: "/placeholder.svg?height=300&width=400",
      description: "Plaza comercial de 15,000 m² en zona premium",
      highlights: ["15,000 m²", "80 locales", "Zona premium", "Parking 500 autos"],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Oportunidades de Inversión</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Proyectos seleccionados con alto potencial de rentabilidad y respaldo legal completo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
              <div className="relative">
                <Image
                  src={opportunity.image || "/placeholder.svg"}
                  alt={opportunity.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-600 text-white">{opportunity.type}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {opportunity.roi} ROI
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center text-slate-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{opportunity.location}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{opportunity.title}</h3>
                <p className="text-slate-600 mb-4">{opportunity.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-amber-600 mr-2" />
                    <div>
                      <div className="text-sm text-slate-600">Inversión</div>
                      <div className="font-bold text-slate-900">{opportunity.investment}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-amber-600 mr-2" />
                    <div>
                      <div className="text-sm text-slate-600">Período</div>
                      <div className="font-bold text-slate-900">{opportunity.period}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Características:</h4>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
          >
            Ver Todas las Oportunidades
          </Button>
        </div>
      </div>
    </section>
  )
}
