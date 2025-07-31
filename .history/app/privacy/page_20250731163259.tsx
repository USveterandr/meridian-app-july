import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Información que Recopilamos",
      subsections: [
        {
          subtitle: "Información Personal",
          content: [
            "Cuando se registra en Meridian, podemos recopilar información de identificación personal como su nombre, dirección de correo electrónico, número de teléfono, y dirección física.",
            "Si utiliza nuestros servicios para comprar, vender o alquilar propiedades, podemos recopilar información adicional como documentos de identificación, información financiera y detalles de la propiedad."
          ]
        },
        {
          subtitle: "Información de Uso",
          content: [
            "Recopilamos automáticamente información sobre su interacción con nuestro sitio web y servicios, incluyendo su dirección IP, tipo de navegador, páginas visitadas, tiempo de navegación y otros datos de diagnóstico.",
            "Utilizamos cookies y tecnologías similares para rastrear su actividad y mejorar su experiencia en nuestro sitio."
          ]
        },
        {
          subtitle: "Información de Dispositivo",
          content: [
            "Recopilamos información sobre el dispositivo que utiliza para acceder a nuestros servicios, incluyendo但不限于 el tipo de dispositivo, sistema operativo, identificadores de dispositivo y datos sobre su red."
          ]
        }
      ]
    },
    {
      title: "2. Cómo Utilizamos su Información",
      content: [
        "Utilizamos la información recopilada para:",
        "Proporcionar, mantener y mejorar nuestros servicios.",
        "Procesar transacciones y enviar información relacionada, incluyendo但不限于 confirmaciones y facturas.",
        "Comunicarnos con usted sobre su cuenta, transacciones o actualizaciones de nuestros servicios.",
        "Personalizar su experiencia y ofrecer contenido relevante.",
        "Analizar tendencias y administrar nuestro sitio web.",
        "Detectar, prevenir y abordar problemas técnicos o de seguridad.",
        "Cumplir con obligaciones legales y regulatorias."
      ]
    },
    {
      title: "3. Compartir Información con Terceros",
      content: [
        "No vendemos, alquilamos ni comercializamos su información personal a terceros. Sin embargo, podemos compartir información en las siguientes circunstancias:",
        "Con proveedores de servicios que nos ayudan a operar nuestro negocio (ej. procesadores de pagos, servicios de email, alojamiento web), sujetos a estrictas obligaciones de confidencialidad.",
        "Cuando sea requerido por ley, regulación o proceso legal.",
        "Para proteger nuestros derechos, privacidad, seguridad o propiedad, o los de nuestros usuarios o terceros.",
        "En conexión con una transacción corporativa, como una fusión, venta de activos o adquisición.",
        "Con su consentimiento explícito."
      ]
    },
    {
      title: "4. Seguridad de los Datos",
      content: [
        "Implementamos medidas de seguridad técnicas y organizativas razonables para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.",
        "Estas medidas incluyen cifrado de datos, controles de acceso seguros y auditorías de seguridad regulares.",
        "Sin embargo, ningún sistema de transmisión por internet o almacenamiento electrónico es 100% seguro. Por lo tanto, no podemos garantizar una seguridad absoluta."
      ]
    },
    {
      title: "5. Sus Derechos de Privacidad",
      content: [
        "Dependiendo de su jurisdicción, usted puede tener ciertos derechos respecto a sus datos personales, incluyendo但不限于:",
        "Acceder a la información personal que tenemos sobre usted.",
        "Solicitar la corrección o actualización de sus datos.",
        "Solicitar la eliminación de sus datos personales.",
        "Oponerse al procesamiento de sus datos.",
        "Solicitar la portabilidad de sus datos.",
        "Para ejercer estos derechos, por favor contáctenos en privacy@meridian-dr.com."
      ]
    },
    {
      title: "6. Retención de Datos",
      content: [
        "Conservaremos su información personal solo durante el tiempo que sea necesario para cumplir con los fines para los cuales fue recopilada, incluyendo但不限于 para cumplir con obligaciones legales, contables o de reporte.",
        "Los criterios utilizados para determinar nuestros períodos de retención incluyen la naturaleza del servicio, la duración de nuestra relación con usted y las obligaciones legales aplicables."
      ]
    },
    {
      title: "7. Enlaces a Sitios de Terceros",
      content: [
        "Nuestro servicio puede contener enlaces a sitios web de terceros. Esta Política de Privacidad no se aplica a estos sitios externos.",
        "No somos responsables de las prácticas de privacidad de dichos sitios. Le recomendamos revisar las políticas de privacidad de cada sitio web de terceros que visite."
      ]
    },
    {
      title: "8. Privacidad de los Niños",
      content: [
        "Nuestro servicio no está dirigido a menores de 18 años. No recopilamos conscientemente información personal de niños menores de 18 años.",
        "Si nos enteramos de que hemos recopilado información personal de un niño sin consentimiento parental verificable, tomaremos medidas para eliminar esa información."
      ]
    },
    {
      title: "9. Cambios a esta Política",
      content: [
        "Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos de cualquier cambio publicando la nueva política en esta página y actualizando la fecha de 'Última actualización'.",
        "Le recomendamos revisar periódicamente esta Política de Privacidad para estar informado sobre cómo protegemos su información."
      ]
    },
    {
      title: "10. Contacto",
      content: [
        "Si tiene preguntas o preocupaciones sobre esta Política de Privacidad o nuestras prácticas de datos, por favor contáctenos en:",
        "Email: privacy@meridian-dr.com",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Política de Privacidad</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            En Meridian, valoramos su privacidad y estamos comprometidos a proteger sus datos personales.
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

      {/* Privacy Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => (
              <Card key={index} className="mb-8 border-l-4 border-l-amber-600">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {section.subsections ? (
                    <div className="space-y-6">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex}>
                          <h3 className="text-xl font-semibold text-slate-800 mb-3">{subsection.subtitle}</h3>
                          <div className="space-y-3">
                        {subsection.content.map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-slate-700 leading-relaxed">
                            {paragraph}
                          </p>
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-slate-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Box */}
          <Card className="mt-12 bg-slate-100 border-slate-300">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Puntos Clave de Privacidad</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-700">
                <li>• Recopilamos información necesaria para proporcionar nuestros servicios.</li>
                <li>• No vendemos su información personal a terceros.</li>
                <li>• Implementamos medidas de seguridad robustas para proteger sus datos.</li>
                <li>• Usted tiene derechos sobre sus datos personales y puede ejercerlos.</li>
                <li>• Conservamos sus datos solo durante el tiempo necesario.</li>
                <li>• Nos comprometemos a la transparencia en nuestras prácticas de privacidad.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">¿Preguntas sobre su Privacidad?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Si tiene alguna pregunta sobre cómo manejamos sus datos, no dude en contactarnos.
          </p>
          <a 
            href="mailto:privacy@meridian-dr.com" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
          >
            Contactar al Oficial de Privacidad
          </a>
        </div>
      </div>
    </div>
  )
}
