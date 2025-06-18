"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Plane, Zap, Percent, FileText, Download } from "lucide-react"

export function TaxIncentives() {
  const incentives = [
    {
      category: "Zonas Francas",
      icon: Building,
      color: "bg-blue-500",
      benefits: [
        "100% exención de impuesto sobre la renta",
        "Exención de impuestos de construcción",
        "Exención de ITBIS (IVA)",
        "Exención de aranceles de importación",
        "Acceso a acuerdos de libre comercio",
      ],
      requirements: "Operar dentro de zonas francas autorizadas",
      duration: "Hasta 20 años renovables",
    },
    {
      category: "Sector Turismo (CONFOTUR)",
      icon: Plane,
      color: "bg-emerald-500",
      benefits: [
        "Exención del IPI (impuesto inmobiliario) hasta 15 años",
        "Exención del 3% de impuesto de transferencia",
        "Exención de impuesto sobre la renta hasta 10 años",
        "Exención de aranceles aduaneros",
        "Incentivos para proyectos hoteleros",
      ],
      requirements: "Proyectos turísticos aprobados por CONFOTUR",
      duration: "10-15 años según el proyecto",
    },
    {
      category: "Energías Renovables",
      icon: Zap,
      color: "bg-green-500",
      benefits: [
        "Incentivos fiscales para productores",
        "Exenciones para auto-generadores",
        "Reducción de aranceles para equipos",
        "Créditos fiscales transferibles",
        "Depreciación acelerada",
      ],
      requirements: "Proyectos de energía alternativa certificados",
      duration: "Según la Ley No. 57-07",
    },
    {
      category: "Pensionados e Inversionistas",
      icon: Percent,
      color: "bg-purple-500",
      benefits: [
        "Residencia expedita con inversión $200K+",
        "Exención de aranceles en bienes del hogar",
        "Exención de impuestos de transferencia",
        "Reducción de impuestos sobre dividendos",
        "Reducción de impuesto inmobiliario",
      ],
      requirements: "Inversión mínima de $200,000 USD",
      duration: "Permanente con renovación de residencia",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Incentivos Fiscales</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            República Dominicana ofrece atractivos incentivos fiscales para inversionistas extranjeros. Conoce todos los
            beneficios disponibles para maximizar tu inversión.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="tourism">Turismo</TabsTrigger>
            <TabsTrigger value="zones">Zonas Francas</TabsTrigger>
            <TabsTrigger value="renewable">Renovables</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {incentives.map((incentive, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${incentive.color}`}>
                        <incentive.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{incentive.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Beneficios Principales:</h4>
                        <ul className="space-y-1">
                          {incentive.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="text-sm text-slate-600 flex items-start">
                              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2 mt-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <Badge variant="secondary">{incentive.duration}</Badge>
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tourism">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-lg bg-emerald-500">
                      <Plane className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Ley CONFOTUR - Sector Turismo</CardTitle>
                      <p className="text-slate-600">Incentivos especiales para proyectos turísticos</p>
                    </div>
                  </div>
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Guía
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">Beneficios Fiscales:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 mt-2" />
                        <div>
                          <strong>Exención IPI:</strong> Hasta 15 años sin impuesto inmobiliario (1% anual)
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 mt-2" />
                        <div>
                          <strong>Transferencia:</strong> Exención del 3% de impuesto de transferencia
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 mt-2" />
                        <div>
                          <strong>Renta:</strong> Exención de impuesto sobre la renta hasta 10 años
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 mt-2" />
                        <div>
                          <strong>Importación:</strong> Exención de aranceles para materiales y equipos
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">Requisitos:</h4>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>• Proyecto turístico aprobado por CONFOTUR</li>
                        <li>• Inversión mínima según categoría del proyecto</li>
                        <li>• Cumplimiento de estándares ambientales</li>
                        <li>• Generación de empleos locales</li>
                        <li>• Mantenimiento de estándares de calidad</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zones">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-lg bg-blue-500">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Zonas Francas</CardTitle>
                    <p className="text-slate-600">Máximos beneficios fiscales para empresas</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h4 className="font-semibold text-slate-900 mb-4">Exenciones Completas:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2">Impuestos Directos</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Impuesto sobre la renta (100%)</li>
                          <li>• Impuestos de construcción</li>
                          <li>• Impuestos sobre activos</li>
                          <li>• Impuestos municipales</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h5 className="font-medium text-green-900 mb-2">Comercio Exterior</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Aranceles de importación</li>
                          <li>• Tasas aduaneras</li>
                          <li>• Impuestos de exportación</li>
                          <li>• ITBIS (IVA)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">Beneficios Adicionales:</h4>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <ul className="text-sm space-y-2">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                          Acceso a 40+ países con TLC
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                          Facilidades aduaneras
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                          Infraestructura especializada
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                          Servicios de apoyo
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="renewable">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-lg bg-green-500">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Energías Renovables - Ley 57-07</CardTitle>
                    <p className="text-slate-600">Incentivos para proyectos de energía limpia</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Para Productores:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2 mt-1.5" />
                          Exención de aranceles para equipos y materiales
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2 mt-1.5" />
                          Depreciación acelerada de activos
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2 mt-1.5" />
                          Créditos fiscales transferibles
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2 mt-1.5" />
                          Exención de ITBIS en equipos
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Para Auto-generadores:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2 mt-1.5" />
                          Reducción de impuestos sobre equipos
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2 mt-1.5" />
                          Incentivos para instalación
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2 mt-1.5" />
                          Medición neta disponible
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2 mt-1.5" />
                          Venta de excedentes
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3">Tecnologías Elegibles:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                          ☀️
                        </div>
                        <span className="text-green-800">Solar</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                          💨
                        </div>
                        <span className="text-green-800">Eólica</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                          💧
                        </div>
                        <span className="text-green-800">Hidráulica</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                          🌱
                        </div>
                        <span className="text-green-800">Biomasa</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <div className="bg-slate-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">¿Necesitas Asesoría Legal?</h3>
            <p className="text-slate-600 mb-6">
              Nuestros asesores especializados te ayudan a maximizar los beneficios fiscales para tu inversión
            </p>
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              <FileText className="h-5 w-5 mr-2" />
              Consulta Gratuita
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
