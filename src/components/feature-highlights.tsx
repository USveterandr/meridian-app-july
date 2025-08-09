"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, TrendingUp, Upload } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Verificado",
    description: "Todas las propiedades pasan por un riguroso proceso de verificación",
    badge: "24 - 72h Verificación",
    color: "text-green-600"
  },
  {
    icon: TrendingUp,
    title: "Incentivos Fiscales",
    description: "Acceso a los mejores beneficios fiscales para inversionistas",
    badge: "Hasta 15 años de exenciones",
    color: "text-blue-600"
  },
  {
    icon: Upload,
    title: "Fácil Publicación",
    description: "Publica tu propiedad en minutos con nuestra plataforma intuitiva",
    badge: "Proceso simplificado",
    color: "text-purple-600"
  }
];

export function FeatureHighlights() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir Meridian?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La plataforma líder en inversiones inmobiliarias de lujo en República Dominicana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center ${feature.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                    {feature.badge}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Commission Highlight */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg">
            <span className="text-2xl font-bold">3% Comisión</span>
            <span className="text-blue-200">vs</span>
            <span className="text-lg line-through text-blue-200">6% competencia</span>
          </div>
        </div>
      </div>
    </section>
  );
}