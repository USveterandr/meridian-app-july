import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Shield, FileCheck, Globe } from "lucide-react"

export function GovernmentPartners() {
  const partners = [
    {
      name: "CONFOTUR",
      description: "Consejo Nacional de Fomento Turístico",
      role: "Incentivos turísticos y hoteleros",
      benefits: ["Exención IPI hasta 15 años", "Exención impuesto transferencia", "Aranceles reducidos"],
      icon: Building,
    },
    {
      name: "CNZFE",
      description: "Consejo Nacional de Zonas Francas de Exportación",
      role: "Administración de Zonas Francas",
      benefits: ["100% exención renta", "Exención ITBIS", "Facilidades aduaneras"],
      icon: Shield,
    },
    {
      name: "JCE",
      description: "Junta Central Electoral",
      role: "Verificación de identidad",
      benefits: ["Validación de cédulas", "Verificación de identidad", "Documentación oficial"],
      icon: FileCheck,
    },
    {
      name: "Jurisdicción Inmobiliaria",
      description: "Registro de Títulos",
      role: "Verificación de propiedades",
      benefits: ["Validación de títulos", "Historial de propiedad", "Certificaciones legales"],
      icon: Globe,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Socios Gubernamentales</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Trabajamos directamente con las instituciones oficiales para garantizar el cumplimiento legal y maximizar
            los beneficios para nuestros inversionistas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {partners.map((partner, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex-shrink-0">
                    <partner.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{partner.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        Oficial
                      </Badge>
                    </div>
                    <p className="text-slate-600 font-medium mb-2">{partner.description}</p>
                    <p className="text-slate-500 text-sm mb-4">{partner.role}</p>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Beneficios:</h4>
                      <ul className="space-y-1">
                        {partner.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-sm text-slate-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Verification Process */}
        <div className="bg-slate-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Proceso de Verificación Oficial</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Verificación JCE</h4>
              <p className="text-slate-600 text-sm">Validamos identidad con Junta Central Electoral</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Registro de Títulos</h4>
              <p className="text-slate-600 text-sm">Verificamos propiedad con Jurisdicción Inmobiliaria</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Aplicación Incentivos</h4>
              <p className="text-slate-600 text-sm">Gestionamos aplicación con CONFOTUR/CNZFE</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                4
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Certificación</h4>
              <p className="text-slate-600 text-sm">Obtienes certificación oficial de beneficios</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
