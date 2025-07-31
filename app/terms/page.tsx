import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TermsPage() {
  const sections = [
    {
      title: "1. Aceptación de los Términos",
      content: [
        "Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de los términos, entonces no puede acceder al servicio.",
        "Estos términos se aplican a todos los usuarios del sitio, incluyendo sin limitación a usuarios que son navegadores, proveedores, clientes, comerciantes y/o colaboradores de contenido."
      ]
    },
    {
      title: "2. Descripción del Servicio",
      content: [
        "Meridian República Dominicana (en adelante, 'Meridian') es una plataforma en línea que conecta a compradores, vendedores e inversores de propiedades inmobiliarias en República Dominicana.",
        "El servicio incluye la visualización de listados de propiedades, conexión con agentes inmobiliarios, acceso a informes de mercado y herramientas para facilitar transacciones inmobiliarias.",
        "Meridian no es una agencia de bienes raíces ni un corredor, sino una plataforma tecnológica que facilita la conexión entre partes interesadas."
      ]
    },
    {
      title: "3. Obligaciones del Usuario",
      content: [
        "Al utilizar el servicio, usted se compromete a:",
        "Proporcionar información veraz, precisa, completa y actualizada.",
        "Mantener la confidencialidad de su cuenta y contraseña.",
        "No utilizar el servicio para fines ilegales o no autorizados.",
        "No publicar contenido falso, engañoso, difamatorio o que viole derechos de propiedad intelectual.",
        "No realizar actividades que puedan dañar, deshabilitar o sobrecargar el servicio."
      ]
    },
    {
      title: "4. Propiedades y Listados",
      content: [
        "La información sobre propiedades es proporcionada por terceros, incluyendo agentes inmobiliarios y vendedores. Meridian no garantiza la exactitud, integridad o actualidad de dicha información.",
        "Los usuarios son responsables de verificar la información de las propiedades directamente con los proveedores y realizar su propia due diligence.",
        "Meridian se reserva el derecho de remover cualquier listado que considere inapropiado, falso o que viole estos términos."
      ]
    },
    {
      title: "5. Tarifas y Pagos",
      content: [
        "El acceso básico al sitio es gratuito. Algunos servicios premium, como reportes de mercado o características avanzadas, pueden requerir el pago de una suscripción o tarifa.",
        "Todas las tarifas serán claramente indicadas antes de que usted confirme su compra.",
        "Los pagos se procesan a través de terceros proveedores de servicios de pago. Meridian no almacena información de tarjetas de crédito.",
        "Las suscripciones se renuevan automáticamente a menos que sean canceladas antes del próximo período de facturación."
      ]
    },
    {
      title: "6. Propiedad Intelectual",
      content: [
        "Todo el contenido del sitio web, incluyendo但不限于 textos, gráficos, logos, imágenes y software, es propiedad de Meridian o sus proveedores y está protegido por leyes de propiedad intelectual.",
        "Se otorga a los usuarios una licencia limitada, no exclusiva e intransferible para acceder y utilizar el servicio para fines personales y no comerciales.",
        "Está prohibido reproducir, modificar, distribuir o crear trabajos derivados del contenido sin autorización expresa de Meridian."
      ]
    },
    {
      title: "7. Limitación de Responsabilidad",
      content: [
        "El servicio se proporciona 'tal cual' y 'según disponibilidad'. Meridian no otorga garantías de ningún tipo, expresas o implícitas, respecto del servicio.",
        "Meridian no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que surjan del uso o la incapacidad de usar el servicio.",
        "En ningún caso la responsabilidad total de Meridian excederá el monto pagado por el usuario, si lo hubiera, en los seis meses anteriores a la reclamación."
      ]
    },
    {
      title: "8. Indemnización",
      content: [
        "Usted acepta indemnizar y mantener indemne a Meridian, sus afiliados, funcionarios y empleados de cualquier reclamación, daño, responsabilidad, pérdida o gasto (incluyendo honorarios razonables de abogados) que surja de:",
        "Su uso del servicio.",
        "Su violación de estos términos.",
        "Su violación de los derechos de terceros, incluyendo但不限于 derechos de propiedad intelectual."
      ]
    },
    {
      title: "9. Privacidad",
      content: [
        "Su privacidad es importante para nosotros. Nuestra Política de Privacidad, que se incorpora por referencia a estos términos, describe cómo recopilamos, usamos y protegemos su información personal.",
        "Al utilizar el servicio, usted consiente el procesamiento de su información según lo descrito en la Política de Privacidad."
      ]
    },
    {
      title: "10. Modificaciones del Servicio",
      content: [
        "Meridian se reserva el derecho de modificar o discontinuar, temporal o permanentemente, el servicio (o cualquier parte de él) con o sin previo aviso.",
        "Meridian no será responsable ante usted ni ante ningún tercero por cualquier modificación, suspensión o discontinuación del servicio."
      ]
    },
    {
      title: "11. Terminación",
      content: [
        "Meridian puede, a su sola discreción, suspender o terminar su cuenta y el acceso al servicio por cualquier motivo, incluyendo但不限于:",
        "Incumplimiento de estos términos.",
        "Actividad sospechosa o fraudulenta.",
        "Inactividad prolongada de la cuenta.",
        "La terminación de su cuenta incluirá la desactivación o eliminación de su acceso al servicio."
      ]
    },
    {
      title: "12. Ley Aplicable y Jurisdicción",
      content: [
        "Estos términos se regirán e interpretarán de acuerdo con las leyes de la República Dominicana, sin considerar sus disposiciones de conflicto de leyes.",
        "Cualquier disputa que surja de o en relación con estos términos se resolverá en los tribunales competentes de Santo Domingo, República Dominicana."
      ]
    },
    {
      title: "13. Contacto",
      content: [
        "Si tiene preguntas sobre estos Términos de Servicio, por favor contáctenos en:",
        "Email: legal@meridian-dr.com",
        "Dirección: Santo Domingo, República Dominicana",
        "Fecha de última actualización: Enero 2024"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Términos de Servicio</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Por favor, lea estos términos y condiciones cuidadosamente antes de utilizar nuestro servicio.
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="py-6 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Badge variant="outline" className="text-amber-700 border-amber-700">
              Última actualización: Enero 2024
            </Badge>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => (
              <Card key={index} className="mb-8 border-l-4 border-l-amber-600">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-slate-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Box */}
          <Card className="mt-12 bg-slate-100 border-slate-300">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Resumen Clave</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-700">
                <li>• Usted es responsable de la veracidad de la información que proporciona.</li>
                <li>• Meridian no garantiza la exactitud de los listados de propiedades.</li>
                <li>• El uso del servicio para fines ilegales está estrictamente prohibido.</li>
                <li>• Los pagos por servicios premium son no reembolsables.</li>
                <li>• Meridian puede modificar o terminar el servicio en cualquier momento.</li>
                <li>• Cualquier disputa se regirá por las leyes de República Dominicana.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">¿Preguntas sobre nuestros Términos?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Si tiene alguna duda sobre estos Términos de Servicio, no dude en contactarnos.
          </p>
          <a 
            href="mailto:legal@meridian-dr.com" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
          >
            Contactar al Departamento Legal
          </a>
        </div>
      </div>
    </div>
  )
}
