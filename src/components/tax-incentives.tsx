"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Percent, 
  Calendar, 
  CheckCircle, 
  Star,
  FileText,
  TrendingUp,
  Shield,
  Clock
} from "lucide-react";

const taxIncentives = {
  zonasFrancas: {
    title: "Zonas Francas",
    subtitle: "Beneficios para empresas en zonas francas",
    description: "Aproveche los beneficios fiscales de las zonas francas dominicanas para maximizar su retorno de inversión.",
    duration: "Hasta 20 años",
    benefits: [
      {
        icon: Percent,
        title: "Exención de Impuesto sobre Renta",
        description: "100% exento del impuesto sobre la renta",
        highlight: true
      },
      {
        icon: Building2,
        title: "Exención de Impuesto de Construcción",
        description: "Exención total de impuestos sobre construcción",
        highlight: true
      },
      {
        icon: Percent,
        title: "Exención de IVA",
        description: "Exención del Impuesto al Valor Agregado (IVA)",
        highlight: true
      },
      {
        icon: Calendar,
        title: "Duración del Beneficio",
        description: "Beneficios renovables por hasta 20 años",
        highlight: false
      }
    ],
    requirements: [
      "Mínimo 80% de exportaciones",
      "Creación de empleos locales",
      "Cumplimiento de normas ambientales",
      "Inversión mínima requerida"
    ],
    highlights: [
      "Sin restricciones de repatriación de capital",
      "Proceso de aprobación simplificado",
      "Acceso a infraestructura premium",
      "Soporte gubernamental continuo"
    ]
  },
  confotur: {
    title: "Sector Turismo (CONFOTUR)",
    subtitle: "Beneficios para proyectos turísticos",
    description: "Beneficios fiscales para proyectos de turismo a través de la Ley de Incentivo al Turismo (CONFOTUR).",
    duration: "10 - 15 años",
    benefits: [
      {
        icon: Percent,
        title: "Exención de IPI",
        description: "100% exento del Impuesto sobre la Propiedad Inmobiliaria por 15 años",
        highlight: true
      },
      {
        icon: FileText,
        title: "Exención de Impuesto de Transferencia",
        description: "Exención del 3% de impuesto de transferencia",
        highlight: true
      },
      {
        icon: Percent,
        title: "Exención de Impuesto de Renta",
        description: "Exención total del impuesto sobre la renta por 10 años",
        highlight: true
      },
      {
        icon: Calendar,
        title: "Duración del Proyecto",
        description: "Beneficios por 10-15 años según tipo de proyecto",
        highlight: false
      }
    ],
    requirements: [
      "Inversión mínima de $10 millones",
      "Creación de empleos directos",
      "Categoría hotelera mínima 4 estrellas",
      "Ubicación en zona turística designada"
    ],
    highlights: [
      "Proceso de aprobación acelerado",
      "Beneficios para importaciones",
      "Exención de impuestos municipales",
      "Soporte legal y administrativo"
    ]
  }
};

export function TaxIncentives() {
  const [activeTab, setActiveTab] = useState("zonas-francas");

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Incentivos Fiscales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La República Dominicana ofrece beneficios fiscales atractivos para inversionistas extranjeros. 
            Maximice su retorno con nuestras ventajas competitivas.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger 
                value="zonas-francas" 
                className="text-lg py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Zonas Francas
              </TabsTrigger>
              <TabsTrigger 
                value="confotur" 
                className="text-lg py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Sector Turismo (CONFOTUR)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="zonas-francas" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                      <CardTitle className="text-2xl flex items-center gap-3">
                        <Building2 className="h-8 w-8" />
                        {taxIncentives.zonasFrancas.title}
                      </CardTitle>
                      <p className="text-blue-100">
                        {taxIncentives.zonasFrancas.subtitle}
                      </p>
                    </CardHeader>
                    <CardContent className="p-8">
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {taxIncentives.zonasFrancas.description}
                      </p>
                      
                      <div className="flex items-center gap-3 mb-6">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span className="text-lg font-semibold text-blue-600">
                          Duración: {taxIncentives.zonasFrancas.duration}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {taxIncentives.zonasFrancas.benefits.map((benefit, index) => {
                          const Icon = benefit.icon;
                          return (
                            <div 
                              key={index} 
                              className={`p-4 rounded-lg border-2 ${
                                benefit.highlight 
                                  ? 'border-green-200 bg-green-50' 
                                  : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <Icon className={`h-5 w-5 mt-0.5 ${
                                  benefit.highlight ? 'text-green-600' : 'text-gray-600'
                                }`} />
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    {benefit.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {benefit.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Requirements & Highlights */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gray-800 text-white rounded-t-lg">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Requisitos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {taxIncentives.zonasFrancas.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-yellow-600 text-white rounded-t-lg">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Destacados
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {taxIncentives.zonasFrancas.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <TrendingUp className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="confotur" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-green-600 text-white rounded-t-lg">
                      <CardTitle className="text-2xl flex items-center gap-3">
                        <Building2 className="h-8 w-8" />
                        {taxIncentives.confotur.title}
                      </CardTitle>
                      <p className="text-green-100">
                        {taxIncentives.confotur.subtitle}
                      </p>
                    </CardHeader>
                    <CardContent className="p-8">
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {taxIncentives.confotur.description}
                      </p>
                      
                      <div className="flex items-center gap-3 mb-6">
                        <Clock className="h-5 w-5 text-green-600" />
                        <span className="text-lg font-semibold text-green-600">
                          Duración: {taxIncentives.confotur.duration}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {taxIncentives.confotur.benefits.map((benefit, index) => {
                          const Icon = benefit.icon;
                          return (
                            <div 
                              key={index} 
                              className={`p-4 rounded-lg border-2 ${
                                benefit.highlight 
                                  ? 'border-green-200 bg-green-50' 
                                  : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <Icon className={`h-5 w-5 mt-0.5 ${
                                  benefit.highlight ? 'text-green-600' : 'text-gray-600'
                                }`} />
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    {benefit.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {benefit.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Requirements & Highlights */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gray-800 text-white rounded-t-lg">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Requisitos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {taxIncentives.confotur.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-yellow-600 text-white rounded-t-lg">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Destacados
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {taxIncentives.confotur.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <TrendingUp className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl p-12">
              <h3 className="text-3xl font-bold mb-4">
                ¿Listo para aprovechar estos incentivos?
              </h3>
              <p className="text-xl mb-8 text-blue-100">
                Nuestros expertos legales pueden ayudarle a navegar el proceso y maximizar sus beneficios fiscales
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Consultar con Experto
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Descargar Guía
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}