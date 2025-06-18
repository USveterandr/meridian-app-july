import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, FileCheck, Shield, CheckCircle } from "lucide-react"

export function RegisterProcess() {
  const steps = [
    {
      step: 1,
      icon: UserPlus,
      title: "Crear Cuenta",
      description: "Completa el formulario con tu información básica",
      time: "2 minutos",
      details: ["Nombre y email", "Contraseña segura", "País de residencia"],
    },
    {
      step: 2,
      icon: FileCheck,
      title: "Verificar Identidad",
      description: "Sube tu documento de identidad para verificación",
      time: "5 minutos",
      details: ["Cédula o pasaporte", "Foto clara", "Documento vigente"],
    },
    {
      step: 3,
      icon: Shield,
      title: "Validación JCE",
      description: "Verificamos tu identidad con las autoridades dominicanas",
      time: "24-72 horas",
      details: ["Verificación automática", "Validación oficial", "Proceso seguro"],
    },
    {
      step: 4,
      icon: CheckCircle,
      title: "Cuenta Activada",
      description: "¡Listo! Ya puedes acceder a todas las funciones premium",
      time: "Inmediato",
      details: ["Acceso completo", "Asesor asignado", "Alertas activadas"],
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Proceso de Registro</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Un proceso simple y seguro que te dará acceso completo a la plataforma en menos de 72 horas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-6 mt-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 mb-4">{step.description}</p>

                {/* Time */}
                <div className="text-sm font-semibold text-amber-600 mb-4">{step.time}</div>

                {/* Details */}
                <ul className="text-xs text-slate-500 space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center justify-center">
                      <div className="w-1 h-1 bg-amber-600 rounded-full mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Notice */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
          <div className="text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">🇩🇴 Verificación Oficial</h3>
            <p className="text-slate-600 max-w-3xl mx-auto">
              Trabajamos directamente con la Junta Central Electoral (JCE) y otras instituciones oficiales de República
              Dominicana para garantizar la autenticidad de todos nuestros usuarios. Tu información está protegida con
              los más altos estándares de seguridad.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
