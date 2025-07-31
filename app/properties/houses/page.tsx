import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HousesPage() {
  const properties = [
    {
      id: 1,
      title: "Villa Oceanfront en Casa de Campo",
      location: "La Romana",
      price: "$3,500,000",
      bedrooms: 5,
      bathrooms: 6,
      area: "850 m²",
      description: "Exclusiva villa frente al mar con acceso privado a la playa, piscina infinita y vistas panorámicas al Caribe.",
      image: "/placeholder.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Mansión Moderna en Piantini",
      location: "Santo Domingo",
      price: "$2,800,000",
      bedrooms: 6,
      bathrooms: 7,
      area: "1,200 m²",
      description: "Lujosa mansión en uno de los barrios más exclusivos de Santo Domingo, con diseño de arquitecto de renombre.",
      image: "/placeholder.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Villa Tropical en Punta Cana",
      location: "Punta Cana",
      price: "$1,950,000",
      bedrooms: 4,
      bathrooms: 5,
      area: "650 m²",
      description: "Hermosa villa estilo tropical con jardín privado, piscina y a pocos pasos de las mejores playas de Bávaro.",
      image: "/placeholder.jpg",
      featured: false
    },
    {
      id: 4,
      title: "Hacienda de Lujo en Jarabacoa",
      location: "Jarabacoa",
      price: "$1,200,000",
      bedrooms: 4,
      bathrooms: 4,
      area: "5,000 m²",
      description: "Impresionante propiedad en las montañas con río propio, amplios jardines y vistas espectaculares al valle.",
      image: "/placeholder.jpg",
      featured: true
    },
    {
      id: 5,
      title: "Villa Contemporánea en Cap Cana",
      location: "Punta Cana",
      price: "$4,200,000",
      bedrooms: 7,
      bathrooms: 8,
      area: "950 m²",
      description: "Villa de diseño contemporáneo dentro de la comunidad exclusiva de Cap Cana, con acceso a campos de golf y playa privada.",
      image: "/placeholder.jpg",
      featured: true
    },
    {
      id: 6,
      title: "Casa Colonial en Zona Colonial",
      location: "Santo Domingo",
      price: "$950,000",
      bedrooms: 3,
      bathrooms: 3,
      area: "400 m²",
      description: "Casa histórica restaurada con encanto colonial, patio interior y ubicada en el corazón de la primera ciudad de América.",
      image: "/placeholder.jpg",
      featured: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Casas de Lujo</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Descubre nuestra exclusiva selección de residencias de lujo en las ubicaciones más prestigiosas de República Dominicana.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <select aria-label="Filtrar por ubicación" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Ubicación</option>
              <option>Punta Cana</option>
              <option>Santo Domingo</option>
              <option>La Romana</option>
              <option>Jarabacoa</option>
            </select>
            <select aria-label="Filtrar por precio" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Precio</option>
              <option>$500,000 - $1,000,000</option>
              <option>$1,000,000 - $2,000,000</option>
              <option>$2,000,000 - $3,000,000</option>
              <option>$3,000,000+</option>
            </select>
            <select aria-label="Filtrar por habitaciones" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Habitaciones</option>
              <option>3+</option>
              <option>4+</option>
              <option>5+</option>
              <option>6+</option>
            </select>
            <Button className="bg-amber-600 hover:bg-amber-700">Buscar Propiedades</Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Casas Disponibles</h2>
            <p className="text-slate-600">{properties.length} propiedades encontradas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-64 w-full object-cover"
                  />
                  {property.featured && (
                    <Badge className="absolute top-4 left-4 bg-amber-600">Destacada</Badge>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-lg shadow-lg">
                    <span className="text-lg font-bold text-slate-900">{property.price}</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{property.title}</CardTitle>
                  <CardDescription className="text-slate-600">{property.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{property.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-slate-600">
                    <div>
                      <span className="font-semibold">{property.bedrooms}</span> Habitaciones
                    </div>
                    <div>
                      <span className="font-semibold">{property.bathrooms}</span> Baños
                    </div>
                    <div>
                      <span className="font-semibold">{property.area}</span>
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

      {/* CTA Section */}
      <div className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tenemos acceso a propiedades exclusivas que no se anuncian públicamente. Contáctanos para una búsqueda personalizada.
          </p>
          <Button variant="secondary" size="lg" className="text-amber-600 hover:bg-amber-50">
            Contactar a un Asesor
          </Button>
        </div>
      </div>
    </div>
  )
}
