import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from 'next/image';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "El Futuro del Mercado Inmobiliario de Lujo en República Dominicana",
      excerpt: "Análisis de las tendencias emergentes y las oportunidades de inversión en el sector de bienes raíces de alto nivel para el 2025 y más allá.",
      author: "Carlos Rodríguez",
      date: "25 de Julio, 2025",
      category: "Análisis de Mercado",
      readTime: "8 min read",
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      title: "Guía Completa de Incentivos Fiscales CONFOTUR para Inversionistas Extranjeros",
      excerpt: "Todo lo que necesitas saber sobre los beneficios fiscales de la Ley CONFOTUR y cómo aprovecharlos para tu próxima inversión inmobiliaria.",
      author: "Ana Martínez",
      date: "18 de Julio, 2025",
      category: "Legal y Fiscal",
      readTime: "12 min read",
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      title: "Top 5 Zonas de Punta Cana para Invertir en Propiedades de Lujo",
      excerpt: "Descubrimos las áreas más exclusivas y con mayor potencial de revalorización en el principal destino turístico del Caribe.",
      author: "Miguel Santos",
      date: "10 de Julio, 2025",
      category: "Destinos",
      readTime: "6 min read",
      image: "/placeholder.jpg"
    },
    {
      id: 4,
      title: "Proceso de Compra de Propiedades para Extranjeros en República Dominicana",
      excerpt: "Una guía paso a paso sobre los requisitos legales, documentación necesaria y el proceso completo para adquirir bienes raíces como extranjero.",
      author: "Laura Gómez",
      date: "3 de Julio, 2025",
      category: "Guías",
      readTime: "10 min read",
      image: "/placeholder.jpg"
    },
    {
      id: 5,
      title: "Inversión en Hoteles y Resorts: Oportunidades en el Creciente Sector Turístico",
      excerpt: "Exploramos las oportunidades de inversión en el sector hotelero dominicano, impulsado por el constante crecimiento del turismo internacional.",
      author: "Roberto Díaz",
      date: "28 de Junio, 2025",
      category: "Inversiones",
      readTime: "9 min read",
      image: "/placeholder.jpg"
    },
    {
      id: 6,
      title: "Sostenibilidad y Bienes Raíces: El Auge de las Construcciones Ecológicas de Lujo",
      excerpt: "Cómo la sostenibilidad se está convirtiendo en un factor clave en el mercado inmobiliario de lujo y qué significa para los inversionistas.",
      author: "Elena Fernández",
      date: "20 de Junio, 2025",
      category: "Tendencias",
      readTime: "7 min read",
      image: "/placeholder.jpg"
    }
  ]

  const categories = [
    "Todas",
    "Análisis de Mercado",
    "Legal y Fiscal",
    "Destinos",
    "Guías",
    "Inversiones",
    "Tendencias"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog de Meridian</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Expertos en inversión inmobiliaria comparten insights, análisis y guías sobre el mercado de lujo en República Dominicana.
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Últimas Publicaciones</h2>
                <div className="space-y-8">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="md:flex">
                        <div className="md:shrink-0">
                          <Image
                            className="h-48 w-full object-cover md:h-full md:w-48"
                            width={192}
                            height={144}
                            src={post.image}
                            alt={post.title}
                          />
                        </div>
                        <div className="p-8">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{post.category}</Badge>
                            <span className="text-sm text-slate-500">{post.readTime}</span>
                          </div>
                          <CardTitle className="text-xl mb-2 leading-tight">
                            <Link href={`/blog/${post.id}`} className="hover:text-amber-600 transition-colors">
                              {post.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-slate-600 mb-4">
                            {post.excerpt}
                          </CardDescription>
                          <div className="flex items-center text-sm text-slate-500">
                            <span>Por {post.author}</span>
                            <span className="mx-2">•</span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Categories */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Categorías</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <Badge key={index} variant="outline" className="hover:bg-amber-600 hover:text-white cursor-pointer">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Artículos Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-semibold text-slate-900 mb-1 hover:text-amber-600 cursor-pointer">
                          <Link href={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-slate-500">{post.date} • {post.readTime}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Suscríbete a Nuestro Newsletter</CardTitle>
                  <CardDescription>
                    Recibe las últimas noticias y análisis del mercado inmobiliario de lujo directamente en tu correo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <input
                      type="email"
                      placeholder="Tu correo electrónico"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      Suscribirse
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
