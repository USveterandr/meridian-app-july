import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CommercialPage() {
  const properties = [
    {
      id: 1,
      title: "Edificio de Oficinas en Piantini",
      location: "Santo Domingo",
      price: "$8,500,000",
      type: "Oficinas",
      area: "2,500 m²",
      description: "Moderno edificio de oficinas clase A con 10 niveles, estacionamiento para 150 vehículos y tecnología de punta.",
      image: "/placeholder.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Local Comercial en BlueMall",
      location: "Santo Domingo",
      price: "$1,200,000",
      type: "Retail",
      area: "450 m²",
