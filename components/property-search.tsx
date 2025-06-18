"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Home, DollarSign } from "lucide-react"

export function PropertySearch() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Ubicación (ej: Punta Cana)"
            className="pl-10 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <Select>
          <SelectTrigger className="focus:ring-amber-500">
            <Home className="h-4 w-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Tipo de Propiedad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="casa">Casa de Lujo</SelectItem>
            <SelectItem value="apartamento">Apartamento</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="hotel">Hotel/Resort</SelectItem>
            <SelectItem value="comercial">Comercial</SelectItem>
            <SelectItem value="golf">Campo de Golf</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="focus:ring-amber-500">
            <DollarSign className="h-4 w-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Precio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="300k-500k">$300K - $500K</SelectItem>
            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
            <SelectItem value="5m-10m">$5M - $10M</SelectItem>
            <SelectItem value="10m+">$10M+</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="focus:ring-amber-500">
            <SelectValue placeholder="Habitaciones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1+ Habitación</SelectItem>
            <SelectItem value="2">2+ Habitaciones</SelectItem>
            <SelectItem value="3">3+ Habitaciones</SelectItem>
            <SelectItem value="4">4+ Habitaciones</SelectItem>
            <SelectItem value="5">5+ Habitaciones</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white">
          <Search className="h-5 w-5 mr-2" />
          Buscar
        </Button>
      </div>
    </div>
  )
}
