import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import Link from "next/link"

export default function HotelsPage() {
  const properties = [
    {
      id: 1,
      title: "Resort de Lujo en Punta Cana",
      location: "Punta Cana",
      price: "$25,000,000",
      type: "Resort Playa",
      rooms: 150,
      area: "15,000 m²",
      description: "Exclusivo resort 5 estrellas frente a la playa con campo de golf, spa y todas las amenidades de lujo.",
      image: "/placeholder.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Hotel Boutique en Zona Colonial",
      location: "Santo Domingo",
      price: "$3,500,000",
      type: "Boutique",
      rooms: 25,
      area: "2,000 m²",
      description: "Encantador hotel boutique en edificio histórico, completamente renovado con diseño de autor y ambiente exclusivo.",
      image: "/placeholder.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Eco-Resort en Samaná",
      location: "Samaná",
      price: "$8,000,000",
      type: "Eco-Resort",
      rooms: 60,
      area: "25,000 m²",
      description: "Sostenible eco-resort integrado en la naturaleza, con cabañas de lujo y enfoque en turismo responsable.",
      image: "/placeholder.jpg",
      featured: true
    },
    {
      id: 4,
      title: "Hotel Urbano en Piantini",
      location: "Santo Domingo",
      price: "$12,000,000",
      type: "Negocios",
      rooms: 120,
      area: "8,000 m²",
      description: "Moderno hotel urbano con centro de convenciones, ideal para viajeros de negocios y eventos corporativos.",
      image: "/placeholder.jpg",
      featured: false
    },
    {
      id: 5,
      title: "Resort Todo Incluido en Puerto Plata",
      location: "Puerto Plata",
      price: "$18,000,000",
      type: "Todo Incluido",
      rooms: 300,
      area: "20,000 m²",
      description: "Gran resort todo incluido con múltiples piscinas, restaurantes y acceso directo a la playa de Playa Dorada.",
      image: "/placeholder.jpg",
      featured: false
    },
    {
      id: 6,
      title: "Boutique Hotel en Las Terrenas",
      location: "Las Terrenas",
      price: "$2,800,000",
      type: "Boutique",
      rooms: 18,
      area: "1,500 m²",
      description: "Acogedor hotel boutique a pocos pasos de la playa, conocido por su servicio personalizado y ambiente romántico.",
      image: "/placeholder.jpg",
      featured: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hoteles y Resorts</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Invierte en el próspero sector turístico de República Dominicana con nuestra selección exclusiva de hoteles y resorts de lujo.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <select aria-label="Filtrar por tipo de hotel" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Tipo de Propiedad</option>
              <option>Resort Playa</option>
              <option>Boutique</option>
              <option>Eco-Resort</option>
              <option>Negocios</option>
              <option>Todo Incluido</option>
            </select>
            <select aria-label="Filtrar por ubicación" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Ubicación</option>
              <option>Punta Cana</option>
              <option>Santo Domingo</option>
              <option>Puerto Plata</option>
              <option>Samaná</option>
              <option>Las Terrenas</option>
            </select>
            <select aria-label="Filtrar por precio" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Precio</option>
              <option>Hasta $5M</option>
              <option>$5M - $15M</option>
              <option>$15M - $25M</option>
              <option>$25M+</option>
            </select>
            <Button className="bg-amber-600 hover:bg-amber-700">Buscar Propiedades</Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Hoteles y Resorts Disponibles</h2>
            <p className="text-slate-600">{properties.length} propiedades encontradas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative">
                  <Image
                    src={property.image}
                    alt={property.title}
                    width={400}
                    height={250}
                    className="h-64 w-full object-cover"
                  />
                  {property.featured && (
                    <Badge className="absolute top-4 left-4 bg-amber-600">Inversión Premium</Badge>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-lg shadow-lg">
                    <span className="text-lg font-bold text-slate-900">{property.price}</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{property.title}</CardTitle>
                  <CardDescription className="text-slate-600">{property.location} • {property.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{property.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-slate-600">
                    <div>
                      <span className="font-semibold">{property.rooms}</span> Habitaciones
                    </div>
                    <div>
                      <span className="font-semibold">{property.area}</span> Terreno
                    </div>
                    <div>
                      <span className="font-semibold">{property.type}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/properties/${property.id}`}>Ver Detalles</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Tourism Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Turismo en República Dominicana</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              El sector turístico dominicano continúa su crecimiento sostenido, posicionándose como líder en el Caribe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "10+ Millones", label: "Turistas Anuales" },
              { stat: "$8,000 Millones", label: "Ingresos Turísticos" },
              { stat: "7.5%", label: "Crecimiento Anual" },
              { stat: "#1", label: "Destino Caribeño" }
            ].map((item, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-amber-600 mb-2">{item.stat}</div>
                <div className="text-slate-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Interesado en Invertir en Hospitalidad?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestros expertos en hotelería pueden asesorarle en la identificación de oportunidades de inversión con alto potencial.
          </p>
          <Button variant="secondary" size="lg" className="text-amber-600 hover:bg-amber-50">
            Solicitar Consultoría
          </Button>
        </div>
      </div>
    </div>
  )
}
