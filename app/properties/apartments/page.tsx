import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image';

export default function ApartmentsPage() {
  const properties = [
    {
      id: 1,
      title: "Penthouse en BlueMall Piantini",
      location: "Santo Domingo",
      price: "$1,800,000",
      bedrooms: 3,
      bathrooms: 3,
      area: "350 m²",
      description: "Exclusivo penthouse con terraza privada, piscina y vistas panorámicas a la ciudad. Ubicado en el corazón de Piantini.",
      image: "/placeholder.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Apartamento de Lujo en Cap Cana",
      location: "Punta Cana",
      price: "$950,000",
      bedrooms: 2,
      bathrooms: 2,
      area: "180 m²",
      description: "Amplio apartamento frente al mar con acceso a playa privada, campos de golf y todos los servicios de Cap Cana.",
      image: "/placeholder.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Loft Moderno en Zona Colonial",
      location: "Santo Domingo",
      price: "$450,000",
      bedrooms: 1,
      bathrooms: 1,
      area: "120 m²",
      description: "Loft de diseño industrial en edificio histórico, con alt techos y acabados de lujo en el centro de la Zona Colonial.",
      image: "/placeholder.jpg",
      featured: false
    },
    {
      id: 4,
      title: "Apartamento en Ágora Mall",
      location: "Santo Domingo",
      price: "$750,000",
      bedrooms: 2,
      bathrooms: 2,
      area: "200 m²",
      description: "Moderno apartamento en torre residencial de lujo con acceso directo al centro comercial Ágora Mall.",
      image: "/placeholder.jpg",
      featured: true
    },
    {
      id: 5,
      title: "Villa Apartment en Casa de Campo",
      location: "La Romana",
      price: "$1,200,000",
      bedrooms: 3,
      bathrooms: 3,
      area: "280 m²",
      description: "Espacioso apartamento tipo villa dentro del complejo Casa de Campo, con vistas al campo de golf Teeth of the Dog.",
      image: "/placeholder.jpg",
      featured: false
    },
    {
      id: 6,
      title: "Beachfront Apartment en Sosúa",
      location: "Puerto Plata",
      price: "$380,000",
      bedrooms: 2,
      bathrooms: 2,
      area: "150 m²",
      description: "Hermoso apartamento frente a la playa en Sosúa, con vistas impresionantes al océano y acceso a piscina comunitaria.",
      image: "/placeholder.jpg",
      featured: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Apartamentos de Lujo</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explora nuestra curada selección de apartamentos exclusivos en las mejores ubicaciones urbanas y costeras de República Dominicana.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <select aria-label="Filtrar por ubicación" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Ubicación</option>
              <option>Santo Domingo</option>
              <option>Punta Cana</option>
              <option>La Romana</option>
              <option>Puerto Plata</option>
            </select>
            <select aria-label="Filtrar por precio" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Precio</option>
              <option>$300,000 - $600,000</option>
              <option>$600,000 - $1,000,000</option>
              <option>$1,000,000 - $1,500,000</option>
              <option>$1,500,000+</option>
            </select>
            <select aria-label="Filtrar por habitaciones" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Habitaciones</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
            </select>
            <Button className="bg-amber-600 hover:bg-amber-700">Buscar Propiedades</Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Apartamentos Disponibles</h2>
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
                    <Badge className="absolute top-4 left-4 bg-amber-600">Destacado</Badge>
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
          <h2 className="text-3xl font-bold mb-4">¿Buscas algo específico?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestros asesores pueden ayudarte a encontrar el apartamento perfecto que se ajuste a tus necesidades y estilo de vida.
          </p>
          <Button variant="secondary" size="lg" className="text-amber-600 hover:bg-amber-50">
            Contactar a un Asesor
          </Button>
        </div>
      </div>
    </div>
  )
}
