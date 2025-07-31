import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function BuyerGuidePage() {
  const guideSteps = [
    {
      step: "1",
      title: "Definir Objetivos y Presupuesto",
      description: "Establezca claramente qué tipo de propiedad busca y cuánto está dispuesto a invertir.",
      details: [
        "Determine el propósito: inversión, residencia principal o vacacional",
        "Defina su rango de presupuesto incluyendo costos adicionales",
        "Identifique las características esenciales de la propiedad",
        "Considere el potencial de apreciación a largo plazo"
      ]
    },
    {
      step: "2",
      title: "Obtener Pre-Aprobación de Financiamiento",
      description: "Si requiere financiamiento, obtenga una pre-aprobación para saber su capacidad de compra.",
      details: [
        "Reúna su documentación financiera personal",
        "Compare tasas y condiciones de diferentes entidades",
        "Considere opciones para inversionistas extranjeros",
        "Entienda los requisitos de down payment"
      ]
    },
    {
      step: "3",
      title: "Buscar y Seleccionar Propiedades",
      description: "Explore el mercado y seleccione las propiedades que mejor se ajusten a sus criterios.",
      details: [
        "Trabaje con un agente inmobiliario especializado",
        "Utilice plataformas en línea y redes de contactos",
        "Visite propiedades en persona o virtualmente",
        "Evalúe la ubicación y amenities del área"
      ]
    },
    {
      step: "4",
      title: "Realizar Due Diligence",
      description: "Investigue exhaustivamente la propiedad seleccionada antes de hacer una oferta.",
      details: [
        "Verifique el estatus legal del título de propiedad",
        "Inspeccione físicamente la condición de la propiedad",
        "Revise permisos de construcción y regulaciones",
        "Investigue el mercado y precios comparables"
      ]
    },
    {
      step: "5",
      title: "Negociar y Hacer Oferta",
      description: "Presente una oferta formal y negocie los términos con el vendedor.",
      details: [
        "Determine una estrategia de precio basada en el mercado",
        "Incluya condiciones contingentes importantes",
        "Negocie plazos y formas de pago",
        "Considere incluir muebles o equipos en la oferta"
      ]
    },
    {
      step: "6",
      title: "Cierre de la Transacción",
      description: "Complete todos los trámites legales y financieros para finalizar la compra.",
      details: [
        "Firme el contrato de compraventa definitivo",
        "Realice el pago según lo acordado",
        "Registre la propiedad en su nombre",
        "Reciba las llaves y documentación final"
      ]
    }
  ]

  const costs = [
    {
      category: "Costos de Transacción",
      items: [
        { name: "Impuesto de Transferencia", percentage: "3%", description: "Sobre el valor de la propiedad" },
        { name: "Honorarios Legales", percentage: "1-2%", description: "Por servicios de abogado" },
        { name: "Costos de Registro", percentage: "~1%", description: "Para inscripción en Registro de Títulos" },
        { name: "Comisión de Corretaje", percentage: "3-5%", description: "Generalmente pagada por el vendedor" }
      ]
    },
    {
      category: "Costos de Financiamiento",
      items: [
        { name: "Intereses del Préstamo", percentage: "Variable", description: "Depende de la tasa y plazo" },
        { name: "Seguro de Hipoteca", percentage: "0.5-1%", description: "Anual sobre el saldo del préstamo" },
        { name: "Costos de Originación", percentage: "1-2%", description: "Fee por procesamiento del préstamo" },
        { name: "Avalúo de Propiedad", percentage: "Fijo", description: "$500 - $1,500 USD" }
      ]
    },
    {
      category: "Costos Posteriores a la Compra",
      items: [
