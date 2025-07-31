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
