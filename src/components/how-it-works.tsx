"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  UserCheck, 
  Smartphone, 
  ShieldCheck, 
  Handshake,
  Clock,
  CheckCircle
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserCheck,
    title: "Registro y Verificación",
    description: "Crea tu cuenta y completa el proceso de verificación de identidad. Validamos tu información para garantizar la seguridad de todas las transacciones.",
    timeframe: "24 - 72 horas",
    details: ["Verificación de identidad", "Validación de documentos", "Aprobación de cuenta"]
  },
  {
    step: "02",
    icon: Smartphone,
    title: "Publicar Propiedad",
    description: "Sube los detalles de tu propiedad fácilmente desde tu dispositivo. Agrega fotos, descripción y características en minutos.",
    timeframe: "Proceso inmediato",
    details: ["Fotos profesionales", "Descripción detallada", "Características y amenities"]
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "Verificación Legal",
    description: "Nuestro equipo legal revisa todos los documentos de la propiedad para asegurar que todo esté en orden y sin problemas.",
    timeframe: "48 - 96 horas",
    details: ["Título de propiedad", "Estudio de títulos", "Impuestos y gravámenes"]
  },
  {
    step: "04",
    icon: Handshake,
    title: "Transacción Segura",
    description: "Realiza la compra o venta con confianza a través de nuestro sistema de pago seguro y servicio de escrow.",
    timeframe: "Seguro garantizado",
    details: ["Pago seguro", "Servicio de escrow", "Asistencia legal"]
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Cómo Funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            El proceso simple y seguro para comprar y vender propiedades de lujo en República Dominicana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 mb-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {step.description}
                  </p>
                  
                  {/* Timeframe */}
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">
                      {step.timeframe}
                    </span>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
                )}
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="text-xl mb-8 text-blue-100">
              Únete a miles de inversionistas que ya confían en Meridian para sus transacciones inmobiliarias
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Crear Cuenta
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Ver Propiedades
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}