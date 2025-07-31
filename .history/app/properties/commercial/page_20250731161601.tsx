import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CommercialPage() {
  const properties = [
    {
      id: 1,
      title: "Edificio de Oficinas en Piantini",
      location: "Santo Domingo",
      price: "$8,500,000",
      type: "Oficinas",
      area: "2,500 m²",
      description: "Moderno edificio de oficinas clase A con 10 niveles, estacionamiento para 150 vehículos y tecnología de punta.",
      image: "/placeholder.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Local Comercial en BlueMall",
      location: "Santo Domingo",
      price: "$1,200,000",
      type: "Retail",
      area: "450 m²",
      description: "Espacio comercial premium en uno de los centros comerciales más exclusivos de Santo Domingo, con alto flujo de peatones.",
      image: "/placeholder.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Centro de Distribución en Las Américas",
      location: "Santo Domingo",
      price: "$4,000,000",
      type: "Industrial",
      area: "8,000 m²",
      description: "Amplio centro de distribución estratégicamente ubicado cerca del aeropuerto y principales autopistas.",
      image: "/placeholder.jpg",
      featured: true
    },
    {
      id: 4,
      title: "Hotel Boutique en Zona Colonial",
      location: "Santo Domingo",
      price: "$3,200,000",
      type: "Hospitalidad",
      area: "1,800 m²",
      description: "Encantador hotel boutique de 20 habitaciones en edificio histórico, completamente renovado con acabados de lujo.",
      image: "/placeholder.jpg",
      featured: false
    },
    {
      id: 5,
      title: "Oficinas Corporativas en Torre Empresarial",
      location: "Santo Domingo",
      price: "$2,800,000",
      type: "Oficinas",
      area: "1,200 m²",
      description: "Piso completo de oficinas corporativas en torre de lujo con vistas panorámicas y servicios premium.",
      image: "/placeholder.jpg",
      featured: false
    },
    {
      id: 6,
      title: "Restaurante en Punta Cana",
      location: "Punta Cana",
      price: "$950,000",
      type: "Restaurantes",
      area: "350 m²",
      description: "Restaurante completamente equipado en zona turística de alta demanda, con licencia de licores y clientela establecida.",
      image: "/placeholder.jpg",
      featured: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Propiedades Comerciales</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Oportunidades de inversión en propiedades comerciales estratégicas con alto potencial de rendimiento en República Dominicana.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <select aria-label="Filtrar por tipo de propiedad" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Tipo de Propiedad</option>
              <option>Oficinas</option>
              <option>Retail</option>
              <option>Industrial</option>
              <option>Hospitalidad</option>
              <option>Restaurantes</option>
            </select>
            <select aria-label="Filtrar por ubicación" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Ubicación</option>
              <option>Santo Domingo</option>
              <option>Punta Cana</option>
              <option>Santiago</option>
              <option>La Romana</option>
            </select>
            <select aria-label="Filtrar por precio" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600">
              <option>Precio</option>
              <option>Hasta $1M</option>
              <option>$1M - $3M</option>
              <option>$3M - $5M</option>
              <option>$5M+</option>
            </select>
            <Button className="bg-amber-600 hover:bg-amber-700">Buscar Propiedades</Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Propiedades Comerciales Disponibles</h2>
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
                    <Badge className="absolute top-4 left-4 bg-amber-600">Oportunidad Única</Badge>
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
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-600">
                    <div>
                      <span className="font-semibold">{property.area}</span> Construidos
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

      {/* Investment Info Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Invierta con Confianza</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              El mercado comercial dominicano ofrece excelentes oportunidades de crecimiento y rentabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Crecimiento Económico",
                description: "República Dominicana muestra un crecimiento económico sostenido, impulsando la demanda de espacios comerciales."
              },
              {
                title: "Ubicación Estratégica",
                description: "Acceso a mercados internacionales y excelente conectividad a través de sus puertos y aeropuertos."
              },
              {
                title: "Estabilidad Legal",
                description: "Marco legal favorable para inversiones extranjeras con protección al capital y beneficios fiscales."
              }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-amber-600">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Busca Asesoría Especializada?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos en bienes raíces comerciales está listo para ayudarle a encontrar la inversión perfecta.
          </p>
          <Button variant="secondary" size="lg" className="text-amber-600 hover:bg-amber-50">
            Contactar a un Experto
          </Button>
        </div>
      </div>
    </div>
  )
}
