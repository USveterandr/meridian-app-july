import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CareersPage() {
  const jobs = [
    {
      id: 1,
      title: "Agente Inmobiliario Senior",
      department: "Ventas",
      location: "Santo Domingo",
      type: "Tiempo Completo",
      description: "Buscamos un agente inmobiliario experimentado para unirse a nuestro equipo de élite. Debes tener un profundo conocimiento del mercado de lujo en República Dominicana y una red de contactos establecida.",
      requirements: [
        "Mínimo 5 años de experiencia en bienes raíces de lujo",
        "Licencia de agente inmobiliario vigente en República Dominicana",
        "Excelentes habilidades de comunicación y negociación",
        "Dominio de inglés y español"
      ]
    },
    {
      id: 2,
      title: "Especialista en Marketing Digital",
      department: "Marketing",
      location: "Remoto",
      type: "Tiempo Completo",
      description: "Buscamos un especialista en marketing digital para liderar nuestras estrategias de adquisición de clientes y fortalecer nuestra marca en el mercado internacional.",
      requirements: [
        "Experiencia comprobada en SEO, SEM y marketing en redes sociales",
        "Conocimiento de herramientas de analítica web (Google Analytics, etc.)",
        "Habilidad para crear contenido atractivo para audiencias de alto poder adquisitivo",
        "Inglés nativo o bilingüe"
      ]
    },
    {
      id: 3,
      title: "Asesor de Inversiones",
      department: "Inversiones",
      location: "Punta Cana",
      type: "Tiempo Completo",
      description: "Asesorar a clientes internacionales en oportunidades de inversión inmobiliaria en República Dominicana, proporcionando análisis de mercado y orientación estratégica.",
      requirements: [
        "Experiencia en consultoría de inversiones o banca privada",
        "Conocimiento profundo del mercado inmobiliario dominicano",
        "Capacidad para analizar informes financieros y de mercado",
        "Dominio de inglés y español"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Únete al Equipo de Meridian</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Buscamos talentos excepcionales que compartan nuestra pasión por el lujo, la excelencia y el servicio al cliente.
          </p>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Por qué trabajar en Meridian?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ofrecemos un entorno dinámico donde puedes crecer profesionalmente y trabajar en los proyectos más exclusivos del Caribe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Crecimiento Profesional",
                description: "Programas de desarrollo continuo y oportunidades de ascenso dentro de la organización."
              },
              {
                title: "Compensación Competitiva",
                description: "Salarios atractivos, comisiones generosas y bonos basados en desempeño."
              },
              {
                title: "Cultura Excepcional",
                description: "Un equipo colaborativo de profesionales apasionados en un ambiente de trabajo inspirador."
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

      {/* Open Positions */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Posiciones Abiertas</h2>
            <p className="text-lg text-slate-600">
              Explora nuestras oportunidades actuales y encuentra tu próximo desafío profesional.
            </p>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-lg">{job.department} • {job.location}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="mt-2 md:mt-0 w-fit">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{job.description}</p>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Requisitos:</h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <button className="mt-6 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                    Aplicar Ahora
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Proceso de Aplicación</h2>
            <p className="text-lg text-slate-600">
              Nuestro proceso de selección está diseñado para encontrar los mejores talentos del mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Aplicación", description: "Envía tu CV y carta de presentación a través de nuestro formulario." },
              { step: "2", title: "Entrevista Inicial", description: "Nuestro equipo de RRHH se pondrá en contacto para una primera entrevista." },
              { step: "3", title: "Evaluación Técnica", description: "Dependiendo del puesto, realizaremos pruebas técnicas o casos prácticos." },
              { step: "4", title: "Oferta Final", description: "Si todo va bien, te extenderemos una oferta para unirte a nuestro equipo." }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
