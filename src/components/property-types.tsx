"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Building, 
  Building2, 
  Hotel, 
  TreePine, 
  Waves,
  ArrowRight
} from "lucide-react";

const propertyTypes = [
  {
    icon: Home,
    title: "Residencias de Lujo",
    description: "Villas y mansiones exclusivas en las mejores ubicaciones",
    count: "150+ properties",
    color: "text-blue-600"
  },
  {
    icon: Building,
    title: "Propiedades Comerciales",
    description: "Espacios comerciales y oficinas en zonas estratégicas",
    count: "80+ properties",
    color: "text-green-600"
  },
  {
    icon: Building2,
    title: "Complejos de Apartamentos",
    description: "Apartamentos de lujo con amenities premium",
    count: "120+ properties",
    color: "text-purple-600"
  },
  {
    icon: Hotel,
    title: "Hoteles y Resorts",
    description: "Propiedades hoteleras y resorts de lujo",
    count: "45+ properties",
    color: "text-orange-600"
  },
  {
    icon: TreePine,
    title: "Comunidades Golf",
    description: "Propiedades en campos de golf de clase mundial",
    count: "12+ properties",
    color: "text-emerald-600"
  },
  {
    icon: Waves,
    title: "Villas Frente al Mar",
    description: "Propiedades de playa con vistas espectaculares",
    count: "200+ properties",
    color: "text-cyan-600"
  }
];

export function PropertyTypes() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Enfoque en República Dominicana
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra nuestra exclusiva selección de propiedades de lujo en todo el país
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertyTypes.map((property, index) => {
            const Icon = property.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 mb-6 rounded-full bg-gray-50 flex items-center justify-center ${property.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {property.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {property.count}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 group-hover:translate-x-1 transition-transform"
                    >
                      Ver más
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            Explorar Todas las Propiedades
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}