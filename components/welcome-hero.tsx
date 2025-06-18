"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, Clock, Shield, ArrowRight } from "lucide-react"

export function WelcomeHero() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const name = searchParams.get("name") || "Inversionista"

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            ¡Bienvenido a Meridian,
            <span className="block text-emerald-200">{name}!</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-8">
            Tu cuenta ha sido creada exitosamente. Hemos enviado un email de confirmación a{" "}
            <span className="font-semibold text-white">{email}</span>
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Mail className="h-8 w-8 text-emerald-200 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email Enviado</h3>
            <p className="text-emerald-100 text-sm">Revisa tu bandeja de entrada</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Clock className="h-8 w-8 text-emerald-200 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Verificación</h3>
            <p className="text-emerald-100 text-sm">24-72 horas</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Shield className="h-8 w-8 text-emerald-200 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Cuenta Segura</h3>
            <p className="text-emerald-100 text-sm">100% protegida</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold"
            onClick={() => (window.location.href = "/properties")}
          >
            Explorar Propiedades
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-4 text-lg backdrop-blur-md"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Ir al Panel
          </Button>
        </div>
      </div>
    </section>
  )
}
