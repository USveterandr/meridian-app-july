import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Globe, Users } from "lucide-react"

export function ContactInfo() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Teléfono Principal",
      details: ["+1 (809) 555-0123", "Lun-Vie 9AM-6PM EST"],
      action: "Llamar Ahora",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@meridian-dr.com", "Respuesta en 24 horas"],
      action: "Enviar Email",
    },
    {
      icon: MapPin,
      title: "Oficina Principal",
      details: ["Av. Winston Churchill", "Santo Domingo, República Dominicana"],
      action: "Ver Mapa",
    },
    {
      icon: Clock,
      title: "Horarios de Atención",
      details: ["Lunes a Viernes: 9:00 AM - 6:00 PM", "Sábados: 10:00 AM - 2:00 PM"],
      action: "Agendar Cita",
    },
  ]

  const offices = [
    {
      city: "Santo Domingo",
      address: "Av. Winston Churchill #25, Ensanche Piantini",
      phone: "+1 (809) 555-0123",
      manager: "Carlos Mendoza",
    },
    {
      city: "Punta Cana",
      address: "Boulevard Turístico del Este, Cap Cana",
      phone: "+1 (809) 555-0124",
      manager: "María González",
    },
    {
      city: "Puerto Plata",
      address: "Malecón de Puerto Plata #45",
      phone: "+1 (809) 555-0125",
      manager: "Roberto Silva",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactMethods.map((method, index) => (
          <Card key={index} className="border-amber-200 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg">
                  <method.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{method.title}</h3>
                  {method.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-slate-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Office Locations */}
      <Card className="border-amber-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-2 text-amber-600" />
            Nuestras Oficinas
          </h3>
          <div className="space-y-4">
            {offices.map((office, index) => (
              <div key={index} className="border-b border-slate-100 last:border-b-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-900">{office.city}</h4>
                    <p className="text-slate-600 text-sm">{office.address}</p>
                    <p className="text-slate-600 text-sm">{office.phone}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-amber-600 text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      {office.manager}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-2">¿Necesitas Ayuda Urgente?</h3>
          <p className="text-slate-600 mb-4">Para emergencias o consultas urgentes fuera del horario de oficina</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center">
              <Phone className="h-4 w-4 mr-2 text-amber-600" />
              <span className="font-semibold">+1 (809) 555-0199</span>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="h-4 w-4 mr-2 text-amber-600" />
              <span className="font-semibold">urgente@meridian-dr.com</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
