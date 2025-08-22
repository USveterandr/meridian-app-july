"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Upload, X, CheckCircle, FileText } from "lucide-react"
import Image from 'next/image';

export function PropertyUploadForm() {
  const [images, setImages] = useState<File[]>([])
  const [documents, setDocuments] = useState<{
    cedula: File | null
    titulo: File | null
  }>({
    cedula: null,
    titulo: null,
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/")
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      return isValidType && isValidSize
    })

    setImages((prev) => [...prev, ...validFiles].slice(0, 10)) // Max 10 images
  }

  const handleDocumentUpload = (type: "cedula" | "titulo", event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
      if (!allowedTypes.includes(file.type)) {
        alert("Por favor sube un archivo válido (JPG, PNG, PDF)")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("El archivo debe ser menor a 5MB")
        return
      }

      setDocuments((prev) => ({
        ...prev,
        [type]: file,
      }))
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const removeDocument = (type: "cedula" | "titulo") => {
    setDocuments((prev) => ({
      ...prev,
      [type]: null,
    }))
  }

  const triggerFileInput = (inputId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement
    input?.click()
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

            {/* Images Upload - FIXED */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fotos de la Propiedad *</label>

              {/* Hidden file input */}
              <input
                id="images-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Images Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`Foto ${index + 1}`}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Upload Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => triggerFileInput("images-upload")}
                  className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                  disabled={images.length >= 10}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {images.length === 0 ? "Subir Fotos" : `Agregar Más (${images.length}/10)`}
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-2">Máximo 10 fotos, 10MB cada una</p>
            </div>

            {/* Documents - FIXED */}
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Documentos Requeridos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cedula Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Cédula de Identidad *</label>

                  <input
                    id="cedula-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleDocumentUpload("cedula", e)}
                    className="hidden"
                  />

                  {!documents.cedula ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-dashed border-2 border-amber-300 hover:border-amber-500 hover:bg-amber-50"
                      onClick={() => triggerFileInput("cedula-upload")}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Cédula
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-green-800">{documents.cedula.name}</p>
                          <p className="text-xs text-green-600">
                            {(documents.cedula.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument("cedula")}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Titulo Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Título de Propiedad *</label>

                  <input
                    id="titulo-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleDocumentUpload("titulo", e)}
                    className="hidden"
                  />

                  {!documents.titulo ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-dashed border-2 border-amber-300 hover:border-amber-500 hover:bg-amber-50"
                      onClick={() => triggerFileInput("titulo-upload")}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Título
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-green-800">{documents.titulo.name}</p>
                          <p className="text-xs text-green-600">
                            {(documents.titulo.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument("titulo")}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Document Instructions */}
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 mb-1">Documentos Requeridos:</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Cédula de identidad (ambos lados en un archivo)</li>
                      <li>• Título de propiedad registrado</li>
                      <li>• Documentos deben estar vigentes y legibles</li>
                      <li>• Formatos aceptados: JPG, PNG, PDF (máx. 5MB)</li>
                    </ul>
                  </div>
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
