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
