import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LegalPage() {
  const services = [
    {
      title: "Due Diligence Inmobiliaria",
      description: "Investigación exhaustiva de la propiedad para verificar su estatus legal, histórico y posibles cargas o gravámenes.",
      features: [
        "Verificación de títulos de propiedad",
        "Análisis de registros públicos",
        "Evaluación de cargas y gravámenes",
        "Revisión de permisos de construcción"
      ]
    },
    {
      title: "Estructuración de Transacciones",
      description: "Diseño de la estructura legal más eficiente para tu inversión, considerando aspectos fiscales y de protección de activos.",
      features: [
        "Creación de sociedades locales",
        "Estructuración fiduciaria",
        "Planificación fiscal internacional",
        "Protección de activos y patrimonio"
      ]
    },
    {
      title: "Contratos y Negociación",
      description: "Elaboración y revisión de contratos de compra-venta, arrendamiento y otros acuerdos relacionados con propiedades.",
      features: [
        "Contratos de compra-venta",
        "Acuerdos de promesa de venta",
        "Contratos de arrendamiento",
        "Acuerdos de asociación"
      ]
    },
    {
      title: "Permisos y Licencias",
      description: "Gestión y obtención de todos los permisos necesarios para el desarrollo y operación de propiedades comerciales y residenciales.",
      features: [
        "Permisos de construcción",
        "Licencias de operación",
        "Permisos ambientales",
        "Regularización de construcciones"
      ]
    },
    {
      title: "Resolución de Conflictos",
      description: "Representación legal en disputas relacionadas con propiedades, incluyendo mediación, arbitraje y litigio.",
      features: [
        "Mediación y arbitraje",
        "Litigio inmobiliario",
        "Desalojos y recuperaciones",
        "Conflictos de límites y linderos"
      ]
    },
    {
      title: "Cumplimiento Normativo",
