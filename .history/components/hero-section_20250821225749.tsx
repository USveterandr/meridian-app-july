"use client"

import { Button } from "@/components/ui/button"
import { Search, DollarSign, Shield, Camera } from "lucide-react"
import Image from "next/image"


export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Dominican Republic Luxury Real Estate"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-emerald-600/20 backdrop-blur-md rounded-full text-amber-300 text-sm font-medium">
              🇩🇴 República Dominicana • Plataforma de Inversión Inmobiliaria
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Invierte en
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Propiedades de Lujo
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 mb-12 leading-relaxed">
            La única plataforma verificada para comprar y vender propiedades de lujo en República Dominicana.
            <span className="block mt-2 text-amber-300 font-semibold">Solo 3% de comisión vs 6% de la competencia</span>
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <Shield className="h-8 w-8 text-amber-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">100% Verificado</h3>
              <p className="text-slate-300 text-sm">Validación con JCE y Jurisdicción Inmobiliaria</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <DollarSign className="h-8 w-8 text-amber-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Incentivos Fiscales</h3>
              <p className="text-slate-300 text-sm">Información completa sobre beneficios tributarios</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <Camera className="h-8 w-8 text-amber-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Fácil Publicación</h3>
              <p className="text-slate-300 text-sm">Sube fotos y documentos desde tu móvil</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <a href="/sell">
                <Camera className="h-5 w-5 mr-2" />
                Publicar Propiedad
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg backdrop-blur-md"
              asChild
            >
              <a href="/properties">
                <Search className="h-5 w-5 mr-2" />
                Buscar Inversiones
              </a>
            </Button>
          </div>

          {/* Property Value Range */}
          <div className="mt-8 text-center">
            <p className="text-slate-300 text-lg">
              Propiedades desde <span className="text-amber-400 font-bold">$300K</span> hasta{" "}
              <span className="text-amber-400 font-bold">$500M</span>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
          <div className="text-2xl font-bold text-slate-900">3%</div>
          <div className="text-slate-600">Comisión</div>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
          <div className="text-2xl font-bold text-slate-900">24-72h</div>
          <div className="text-slate-600">Verificación</div>
        </div>
      </div>
    </section>
  )
}
