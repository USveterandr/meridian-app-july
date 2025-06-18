"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, Users, MessageCircle, ExternalLink } from "lucide-react"

export function WelcomeResources() {
  const resources = [
    {
      icon: BookOpen,
      title: "Guía del Inversionista",
      description: "Todo lo que necesitas saber sobre inversiones en RD",
      action: "Descargar PDF",
      href: "/resources/investor-guide.pdf",
      color: "bg-blue-500",
    },
    {
      icon: Video,
      title: "Video Tutorial",
      description: "Aprende a usar la plataforma en 10 minutos",
      action: "Ver Video",
      href: "/tutorials/getting-started",
      color: "bg-red-500",
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Únete a nuestro grupo de inversionistas",
      action: "Unirse",
      href: "/community",
      color: "bg-green-500",
    },
    {
      icon: MessageCircle,
      title: "Soporte",
      description: "¿Tienes preguntas? Estamos aquí para ayudarte",
      action: "Contactar",
      href: "/contact",
      color: "bg-purple-500",
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Recursos para Comenzar</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Mientras esperas la verificación, puedes explorar estos recursos útiles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {resources.map((resource, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all group">
              <CardContent className="p-6 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${resource.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  <resource.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{resource.title}</h3>
                <p className="text-slate-600 mb-4 text-sm">{resource.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full hover:bg-slate-900 hover:text-white"
                  onClick={() => window.open(resource.href, "_blank")}
                >
                  {resource.action}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">¿Listo para Explorar?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Aunque tu cuenta esté en proceso de verificación, puedes comenzar a explorar propiedades y familiarizarte
            con nuestra plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => (window.location.href = "/properties")}
            >
              Ver Propiedades
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900"
              onClick={() => (window.location.href = "/invest")}
            >
              Oportunidades de Inversión
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
