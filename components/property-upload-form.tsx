"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Upload, X } from "lucide-react"

export function PropertyUploadForm() {
  const [images, setImages] = useState<string[]>([])

  const addImage = () => {
    setImages([...images, `/placeholder.svg?height=200&width=300&text=Foto ${images.length + 1}`])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Publica tu Propiedad</h2>
          <p className="text-xl text-slate-600">
            Completa el formulario y comienza a recibir ofertas de inversionistas verificados
          </p>
        </div>

        <Card className="border-amber-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Información de la Propiedad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Property Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Propiedad *</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa de Lujo</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="hotel">Hotel/Resort</SelectItem>
                    <SelectItem value="comercial">Propiedad Comercial</SelectItem>
                    <SelectItem value="golf">Campo de Golf</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Precio (USD) *</label>
                <Input placeholder="ej: 2,500,000" />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Provincia *</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="santo-domingo">Santo Domingo</SelectItem>
                    <SelectItem value="la-altagracia">La Altagracia</SelectItem>
                    <SelectItem value="puerto-plata">Puerto Plata</SelectItem>
                    <SelectItem value="samana">Samaná</SelectItem>
                    <SelectItem value="la-romana">La Romana</SelectItem>
                    <SelectItem value="santiago">Santiago</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ciudad *</label>
                <Input placeholder="ej: Punta Cana" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Código Postal</label>
                <Input placeholder="ej: 23000" />
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Habitaciones</label>
                <Input type="number" placeholder="0" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Baños</label>
                <Input type="number" placeholder="0" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Área (ft²)</label>
                <Input placeholder="ej: 5000" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Año de Construcción</label>
                <Input placeholder="ej: 2020" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Descripción de la Propiedad *</label>
              <Textarea
                placeholder="Describe tu propiedad, amenidades, ubicación, características especiales..."
                rows={4}
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fotos de la Propiedad *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addImage}
                  className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Tomar Foto
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addImage}
                  className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Archivo
                </Button>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Documentos Requeridos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Cédula de Identidad *</label>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Subir Cédula
                  </Button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Título de Propiedad *</label>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Subir Título
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nombre Completo *</label>
                <Input placeholder="Tu nombre completo" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono *</label>
                <Input placeholder="+1 (809) 555-0123" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
              <Input type="email" placeholder="tu@email.com" />
            </div>

            {/* Submit */}
            <div className="text-center pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 text-lg"
              >
                Publicar Propiedad
              </Button>
              <p className="text-sm text-slate-600 mt-4">Tu propiedad será revisada y publicada en 24-72 horas</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
