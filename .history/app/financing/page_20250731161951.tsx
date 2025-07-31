import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function FinancingPage() {
  const financingOptions = [
    {
      title: "Financiamiento para Compradores",
      description: "Opciones de financiamiento competitivas para la adquisición de propiedades residenciales y comerciales en República Dominicana.",
      features: [
        "Hasta 80% de financiamiento",
        "Tasas preferenciales",
        "Plazos flexibles hasta 25 años",
        "Aprobación rápida en 72 horas"
      ],
      type: "Residencial y Comercial"
    },
    {
      title: "Líneas de Crédito para Inversionistas",
      description: "Líneas de crédito revolving diseñadas para inversionistas que necesitan capital para múltiples oportunidades.",
      features: [
        "Líneas desde $500,000 USD",
        "Acceso a capital continuo",
        "Solo pagas intereses sobre lo utilizado",
        "Renovación automática"
      ],
      type: "Para Inversionistas"
    },
    {
      title: "Financiamiento para Desarrollo",
      description: "Financiamiento estructurado para proyectos de construcción y desarrollo inmobiliario a gran escala.",
      features: [
        "Financiamiento para tierra y construcción",
        "Desembolsos por etapas",
        "Asesoría en viabilidad de proyectos",
        "Hasta 70% del valor del proyecto"
      ],
      type: "Desarrolladores"
    },
    {
      title: "Refinanciamiento de Propiedades",
      description: "Mejore las condiciones de su financiamiento actual o acceda a capital adicional mediante el refinanciamiento.",
      features: [
        "Reducción de tasas de interés",
        "Obtención de capital adicional",
        "Extensión de plazos",
        "Sin penalidades por cancelación anticipada"
      ],
      type: "Propietarios Actuales"
    }
  ]

