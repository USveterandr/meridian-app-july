"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, FileCheck, Bell, TrendingUp } from "lucide-react"

export function WelcomeSteps() {
  const steps = [
    {
      step: 1,
      icon: Mail,
      title: "Confirma tu Email",
      description: "Revisa tu bandeja de entrada y haz clic en el enlace de confirmación",
      status: "pending",
      time: "Ahora",
    },
    {
      step: 2,
      icon: FileCheck,
      title: "Verificación de Documentos",
      description: "Nuestro equipo revisará tus documentos de identidad",
      status: "waiting",
      time: "24-72 horas",
    },
    {
      step: 3,
      icon: Bell,
      title: "Activación Completa",
      description: "Recibirás una notificación cuando tu cuenta esté completamente activa",
      status: "waiting",
      time: "Después de verificación",
    },
    {
      step: 4,
      icon: TrendingUp,
      title: "¡Comienza a Invertir!",
      description: "Accede a todas las funciones premium y oportunidades exclusivas",
      status: "waiting",
      time: "Una vez activada",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">¿Qué Sigue?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Sigue estos pasos para completar la activación de tu cuenta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      step.status === "pending"
                        ? "bg-amber-600"
                        : step.status === "completed"
                          ? "bg-green-600"
                          : "bg-slate-400"
                    }`}
                  >
                    {step.step}
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 mt-4 ${
                    step.status === "pending"
                      ? "bg-gradient-to-r from-amber-600 to-amber-700"
                      : step.status === "completed"
                        ? "bg-gradient-to-r from-green-600 to-green-700"
                        : "bg-gradient-to-r from-slate-400 to-slate-500"
                  }`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 mb-4">{step.description}</p>

                {/* Time */}
                <div
                  className={`text-sm font-semibold ${
                    step.status === "pending"
                      ? "text-amber-600"
                      : step.status === "completed"
                        ? "text-green-600"
                        : "text-slate-500"
                  }`}
                >
                  {step.time}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Email Check Reminder */}
        <div className="mt-16 bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <Mail className="h-12 w-12 text-amber-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-4">¡No Olvides Revisar tu Email!</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Hemos enviado un email de confirmación a tu dirección. Si no lo encuentras en tu bandeja de entrada, revisa
            la carpeta de spam o correo no deseado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open("https://gmail.com", "_blank")}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Abrir Gmail
            </button>
            <button
              onClick={() => window.open("https://outlook.com", "_blank")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Abrir Outlook
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
