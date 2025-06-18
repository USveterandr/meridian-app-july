import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail } from "lucide-react"
import Image from "next/image"

export function AboutTeam() {
  const team = [
    {
      name: "Carlos Mendoza",
      position: "CEO & Fundador",
      bio: "25 años de experiencia en bienes raíces del Caribe. MBA de Wharton.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "carlos@meridian-dr.com",
    },
    {
      name: "María González",
      position: "Directora de Operaciones",
      bio: "Experta en regulaciones inmobiliarias dominicanas. Abogada especializada.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "maria@meridian-dr.com",
    },
    {
      name: "Roberto Silva",
      position: "Director de Inversiones",
      bio: "15 años en mercados financieros internacionales. CFA charterholder.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "roberto@meridian-dr.com",
    },
    {
      name: "Ana Martínez",
      position: "Directora de Marketing",
      bio: "Especialista en marketing digital y relaciones internacionales.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "ana@meridian-dr.com",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Nuestro Equipo</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Profesionales experimentados comprometidos con tu éxito en el mercado inmobiliario dominicano
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-amber-600 font-semibold mb-3">{member.position}</p>
                <p className="text-slate-600 text-sm mb-6">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a
                    href={member.linkedin}
                    className="p-2 bg-slate-100 rounded-lg hover:bg-amber-600 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 bg-slate-100 rounded-lg hover:bg-amber-600 hover:text-white transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
