"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PropertyFilters() {
  return (
    <div className="space-y-6">
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <h4 className="font-semibold mb-3">Rango de Precio</h4>
            <Slider defaultValue={[300000, 5000000]} max={50000000} min={300000} step={100000} className="mb-3" />
            <div className="flex justify-between text-sm text-slate-600">
              <span>$300K</span>
              <span>$50M+</span>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <h4 className="font-semibold mb-3">Tipo de Propiedad</h4>
            <div className="space-y-2">
              {["Casa de Lujo", "Villa", "Apartamento", "Hotel/Resort", "Comercial", "Campo de Golf"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={type} />
                  <label htmlFor={type} className="text-sm">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold mb-3">Ubicación</h4>
            <div className="space-y-2">
              {[
                "Punta Cana",
                "Santo Domingo",
                "Santiago",
                "Puerto Plata",
                "Samaná",
                "La Romana",
                "Bávaro",
                "Cap Cana",
              ].map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox id={location} />
                  <label htmlFor={location} className="text-sm">
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <h4 className="font-semibold mb-3">Habitaciones</h4>
            <div className="flex flex-wrap gap-2">
              {["1+", "2+", "3+", "4+", "5+", "6+"].map((beds) => (
                <Badge
                  key={beds}
                  variant="outline"
                  className="cursor-pointer hover:bg-amber-600 hover:text-white hover:border-amber-600"
                >
                  {beds}
                </Badge>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-semibold mb-3">Amenidades</h4>
            <div className="space-y-2">
              {[
                "Piscina",
                "Vista al Mar",
                "Jacuzzi",
                "Gimnasio",
                "Garaje",
                "Jardín",
                "Seguridad 24/7",
                "Aire Acondicionado",
              ].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox id={amenity} />
                  <label htmlFor={amenity} className="text-sm">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
            Aplicar Filtros
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
