"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Bed, Bath, Square, Eye } from "lucide-react"
import Image from "next/image"

export function PropertyGrid() {
  const properties = [
    {
      id: 1,
      title: "Villa Oceanfront Paradise",
      location: "Cap Cana, Punta Cana",
      price: "$2,850,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 6,
      baths: 7,
      sqft: "8,500",
      type: "Villa",
      featured: true,
      verified: true,
    },
    {
      id: 2,
      title: "Luxury Penthouse Suite",
      location: "Zona Colonial, Santo Domingo",
      price: "$1,200,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 3,
      baths: 4,
      sqft: "3,200",
      type: "Apartamento",
      featured: false,
      verified: true,
    },
    {
      id: 3,
      title: "Beachfront Resort Hotel",
      location: "Samaná Peninsula",
      price: "$15,500,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 45,
      baths: 50,
      sqft: "25,000",
      type: "Hotel",
      featured: true,
      verified: true,
    },
    {
      id: 4,
      title: "Modern Golf Course Villa",
      location: "Casa de Campo, La Romana",
      price: "$3,750,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 5,
      baths: 6,
      sqft: "6,800",
      type: "Villa",
      featured: false,
      verified: true,
    },
    {
      id: 5,
      title: "Commercial Plaza Complex",
      location: "Bella Vista, Santo Domingo",
      price: "$8,900,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 0,
      baths: 12,
      sqft: "15,000",
      type: "Comercial",
      featured: false,
      verified: true,
    },
    {
      id: 6,
      title: "Tropical Paradise Estate",
      location: "Las Terrenas, Samaná",
      price: "$4,200,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 8,
      baths: 9,
      sqft: "12,000",
      type: "Villa",
      featured: true,
      verified: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">{properties.length} Propiedades Encontradas</h2>
        <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500">
          <option>Ordenar por: Precio (Mayor a Menor)</option>
          <option>Precio (Menor a Mayor)</option>
          <option>Más Recientes</option>
          <option>Más Populares</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <Card
            key={property.id}
            className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg"
          >
            <div className="relative overflow-hidden">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {property.featured && <Badge className="bg-amber-600 hover:bg-amber-700 text-white">Destacada</Badge>}
                {property.verified && (
                  <Badge className="bg-green-600 hover:bg-green-700 text-white">✓ Verificada</Badge>
                )}
                <Badge variant="secondary">{property.type}</Badge>
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="p-2 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-slate-600 hover:text-red-500" />
                </button>
                <button className="p-2 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-colors">
                  <Eye className="h-5 w-5 text-slate-600" />
                </button>
              </div>

              {/* Price Overlay */}
              <div className="absolute bottom-4 left-4">
                <div className="bg-slate-900/80 backdrop-blur-md rounded-lg px-3 py-2">
                  <div className="text-2xl font-bold text-white">{property.price}</div>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center text-slate-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                {property.title}
              </h3>

              <div className="flex items-center justify-between text-slate-600 mb-6">
                {property.beds > 0 && (
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.beds}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.baths}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.sqft} ft²</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white">
                  Ver Detalles
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                >
                  Contactar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button
          size="lg"
          variant="outline"
          className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
        >
          Cargar Más Propiedades
        </Button>
      </div>
    </div>
  )
}
