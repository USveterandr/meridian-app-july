"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"

export function ContactForm() {
  return (
    <Card className="border-amber-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Envíanos un Mensaje</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nombre *</label>
            <Input placeholder="Tu nombre completo" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
            <Input type="email" placeholder="tu@email.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono</label>
            <Input placeholder="+1 (809) 555-0123" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">País</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu país" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">Estados Unidos</SelectItem>
                <SelectItem value="ca">Canadá</SelectItem>
                <SelectItem value="mx">México</SelectItem>
                <SelectItem value="es">España</SelectItem>
                <SelectItem value="fr">Francia</SelectItem>
                <SelectItem value="de">Alemania</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Consulta</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="¿En qué podemos ayudarte?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="investment">Oportunidades de Inversión</SelectItem>
              <SelectItem value="sell">Vender mi Propiedad</SelectItem>
              <SelectItem value="incentives">Incentivos Fiscales</SelectItem>
              <SelectItem value="legal">Consulta Legal</SelectItem>
              <SelectItem value="financing">Financiamiento</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Presupuesto de Inversión</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Rango de inversión" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300k-500k">$300K - $500K</SelectItem>
              <SelectItem value="500k-1m">$500K - $1M</SelectItem>
              <SelectItem value="1m-5m">$1M - $5M</SelectItem>
              <SelectItem value="5m-10m">$5M - $10M</SelectItem>
              <SelectItem value="10m+">$10M+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Mensaje *</label>
          <Textarea placeholder="Cuéntanos más sobre tus necesidades e intereses..." rows={4} />
        </div>

        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
        >
          <Send className="h-5 w-5 mr-2" />
          Enviar Mensaje
        </Button>

        <p className="text-sm text-slate-600 text-center">Nos pondremos en contacto contigo dentro de 24 horas</p>
      </CardContent>
    </Card>
  )
}
