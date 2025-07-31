import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FAQPage() {
  const faqCategories = [
    {
      name: "Compra de Propiedades",
      questions: [
        {
          question: "¿Pueden los extranjeros comprar propiedades en República Dominicana?",
          answer: "Sí, los extranjeros pueden comprar propiedades en República Dominicana con los mismos derechos que los ciudadanos locales. No existen restricciones para la compra de bienes raíces por parte de extranjeros, ya sea para residencia, inversión o vacaciones."
        },
        {
          question: "¿Cuánto tiempo toma el proceso de compra de una propiedad?",
          answer: "El proceso típico de compra toma entre 30 y 60 días. Esto incluye la negociación, due diligence (verificación legal), preparación de documentos y el cierre. Los plazos pueden variar dependiendo de la complejidad de la transacción y si se requiere financiamiento."
        },
        {
          question: "¿Qué costos adicionales debo considerar al comprar una propiedad?",
          answer: "Además del precio de compra, debe considerar: impuestos de transferencia (3%), honorarios legales (1-2%), costos de registro (aproximadamente 1%), y comisiones de corretaje (generalmente pagadas por el vendedor, 3-5%). También puede haber costos de avalúo y otros gastos administrativos."
        },
        {
          question: "¿Necesito un abogado para comprar una propiedad?",
          answer: "Sí, es altamente recomendable contratar un abogado especializado en derecho inmobiliario. El abogado realizará el due diligence, verificará los documentos, preparará el contrato y asegurará que la transacción cumpla con todas las leyes dominicanas."
        }
      ]
    },
    {
      name: "Venta de Propiedades",
      questions: [
        {
          question: "¿Cómo determino el precio de venta de mi propiedad?",
          answer: "El precio se determina mediante un avalúo profesional, análisis de propiedades comparables en la zona, condiciones del mercado actual, características únicas de la propiedad y tendencias del sector. Un agente inmobiliario experimentado puede ayudarle a establecer el precio óptimo."
        },
        {
          question: "¿Qué documentos necesito para vender mi propiedad?",
