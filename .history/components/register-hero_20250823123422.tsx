"use client"

// import { Button } from "@/components/ui/button"
import { UserPlus, Shield, Globe, Zap } from "lucide-react"
export function RegisterHero() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Únete a
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Meridian
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Regístrate gratis y accede a las mejores oportunidades de inversión inmobiliaria en República Dominicana.
            Proceso de verificación en 24-72 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg"
              onClick={() => {
                const formSection = document.querySelector('form');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Crear Cuenta Gratis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg backdrop-blur-md"
              asChild
            >
              <a href="/login">
                <Shield className="h-5 w-5 mr-2" />
                ¿Ya tienes cuenta?
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Gratis</h3>
            <p className="text-slate-300">Sin costos de registro</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Verificación Rápida</h3>
            <p className="text-slate-300">24-72 horas</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Acceso Global</h3>
            <p className="text-slate-300">Desde cualquier país</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-xl mb-4">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Soporte Dedicado</h3>
            <p className="text-slate-300">Asesor personal</p>
          </div>
        </div>
      </div>
    </section>
  )
}
