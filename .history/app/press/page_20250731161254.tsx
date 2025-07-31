import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PressPage() {
  const pressReleases = [
    {
      id: 1,
      date: "15 de Julio, 2025",
      title: "Meridian Lanza Nueva Plataforma de Inversiones Inmobiliarias en República Dominicana",
      excerpt: "La innovadora plataforma conecta a inversionistas internacionales con propiedades de lujo exclusivas en las mejores ubicaciones del país.",
      category: "Lanzamiento de Producto"
    },
    {
      id: 2,
      date: "2 de Julio, 2025",
      title: "Meridian y Confotur Firman Alianza Estratégica para Promover Inversiones",
      excerpt: "La colaboración busca facilitar el proceso de inversión extranjera y promover los beneficios fiscales disponibles para inversionistas.",
      category: "Alianzas"
    },
    {
      id: 3,
      date: "20 de Junio, 2025",
      title: "Meridian Reporta Crecimiento del 300% en Inversiones durante el Primer Semestre",
      excerpt: "La demanda de propiedades de lujo en zonas como Punta Cana, Santo Domingo y La Romana impulsa el crecimiento exponencial de la plataforma.",
      category: "Resultados Financieros"
    },
    {
      id: 4,
      date: "5 de Junio, 2025",
      title: "Expertos Internacionales se Unen al Equipo Asesor de Meridian",
      excerpt: "La compañía fortalece su equipo con la incorporación de reconocidos profesionales en bienes raíces, finanzas y legal.",
      category: "Equipo"
    }
  ]

  const mediaKit = [
    {
      title: "Logotipo de Meridian",
      description: "Versión en alta resolución del logotipo oficial.",
      link: "#"
    },
    {
      title: "Fotografías de Propiedades",
      description: "Galería de imágenes de nuestras propiedades exclusivas.",
      link: "#"
    },
    {
      title: "Perfil Corporativo",
      description: "Información detallada sobre la empresa y su misión.",
      link: "#"
    },
    {
      title: "Hoja de Datos",
      description: "Estadísticas clave y datos de mercado.",
      link: "#"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sala de Prensa</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Mantente informado sobre las últimas noticias, lanzamientos y desarrollos de Meridian en el mercado inmobiliario de lujo.
          </p>
        </div>
      </div>

      {/* Contact Info for Press */}
      <div className="py-12 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Contacto para Medios</h2>
          <p className="text-lg mb-2">Para consultas de prensa, entrevistas y más información, contacta a:</p>
          <p className="text-xl font-semibold">Ana García • Directora de Comunicaciones</p>
          <p className="text-lg">press@meridian-dr.com • +1 (809) 555-0124</p>
        </div>
      </div>

      {/* Latest Press Releases */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Comunicados de Prensa</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Accede a nuestras noticias oficiales y mantente al día con los acontecimientos más importantes de Meridian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pressReleases.map((release) => (
              <Card key={release.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{release.category}</Badge>
                    <span className="text-sm text-slate-500">{release.date}</span>
                  </div>
                  <CardTitle className="text-xl leading-tight">{release.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-slate-600 mb-4">{release.excerpt}</p>
                  <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">
                    Leer más →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Media Kit */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Kit de Medios</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Descarga recursos oficiales de Meridian, incluyendo nuestro logotipo, imágenes de propiedades y más.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{item.description}</p>
                  <a href={item.link} className="text-amber-600 hover:text-amber-700 font-medium">
                    Descargar
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Media Coverage */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Apariciones en Medios</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Meridian ha sido destacada en importantes publicaciones nacionales e internacionales.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[
              { name: "El Dinero", logo: "/placeholder-logo.svg" },
              { name: "Listín Diario", logo: "/placeholder-logo.svg" },
              { name: "Forbes Latam", logo: "/placeholder-logo.svg" },
              { name: "Caribbean Journal", logo: "/placeholder-logo.svg" }
            ].map((media, index) => (
              <div key={index} className="flex justify-center">
                <div className="bg-white p-6 rounded-lg shadow-sm w-full h-32 flex items-center justify-center">
                  <span className="text-slate-500 font-semibold">{media.name}</span>
