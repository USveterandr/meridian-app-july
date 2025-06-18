"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UserPlus, Upload, Eye, EyeOff, FileText, CheckCircle, X } from "lucide-react"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType, setAccountType] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<{
    identity: File | null
    income: File | null
  }>({
    identity: null,
    income: null,
  })

  const handleFileUpload = (type: "identity" | "income", event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
      if (!allowedTypes.includes(file.type)) {
        alert("Por favor sube un archivo válido (JPG, PNG, PDF)")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("El archivo debe ser menor a 5MB")
        return
      }

      setUploadedFiles((prev) => ({
        ...prev,
        [type]: file,
      }))
    }
  }

  const removeFile = (type: "identity" | "income") => {
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: null,
    }))
  }

  const triggerFileInput = (inputId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement
    input?.click()
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Crear Tu Cuenta</h2>
          <p className="text-xl text-slate-600">
            Completa el formulario para comenzar tu journey de inversión en República Dominicana
          </p>
        </div>

        <Card className="border-amber-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center">
              <UserPlus className="h-6 w-6 mr-2 text-amber-600" />
              Registro Gratuito
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Cuenta *</label>
              <Select onValueChange={setAccountType}>
                <SelectTrigger>
                  <SelectValue placeholder="¿Qué tipo de cuenta necesitas?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investor">Inversionista - Quiero comprar propiedades</SelectItem>
                  <SelectItem value="seller">Vendedor - Quiero vender mi propiedad</SelectItem>
                  <SelectItem value="both">Ambos - Comprar y vender</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nombre *</label>
                <Input placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Apellido *</label>
                <Input placeholder="Tu apellido" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <Input type="email" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono *</label>
                <Input placeholder="+1 (809) 555-0123" />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">País de Residencia *</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="do">🇩🇴 República Dominicana</SelectItem>
                    <SelectItem value="us">🇺🇸 Estados Unidos</SelectItem>
                    <SelectItem value="ca">🇨🇦 Canadá</SelectItem>
                    <SelectItem value="mx">🇲🇽 México</SelectItem>
                    <SelectItem value="es">🇪🇸 España</SelectItem>
                    <SelectItem value="fr">🇫🇷 Francia</SelectItem>
                    <SelectItem value="de">🇩🇪 Alemania</SelectItem>
                    <SelectItem value="other">🌍 Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ciudad</label>
                <Input placeholder="Tu ciudad" />
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña *</label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Mínimo 8 caracteres" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirmar Contraseña *</label>
                <div className="relative">
                  <Input type={showConfirmPassword ? "text" : "password"} placeholder="Repite tu contraseña" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Investment Preferences (conditional) */}
            {(accountType === "investor" || accountType === "both") && (
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Preferencias de Inversión</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Propiedad</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="¿Qué te interesa?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residencial de Lujo</SelectItem>
                        <SelectItem value="commercial">Comercial</SelectItem>
                        <SelectItem value="tourism">Turismo/Hoteles</SelectItem>
                        <SelectItem value="mixed">Mixto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Document Upload - FIXED */}
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Verificación de Identidad</h3>
              <p className="text-slate-600 mb-4 text-sm">
                Para cumplir con las regulaciones dominicanas, necesitamos verificar tu identidad
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Identity Document Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Documento de Identidad *</label>

                  {/* Hidden file input */}
                  <input
                    id="identity-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileUpload("identity", e)}
                    className="hidden"
                  />

                  {/* Upload button or file display */}
                  {!uploadedFiles.identity ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-dashed border-2 border-amber-300 hover:border-amber-500 hover:bg-amber-50"
                      onClick={() => triggerFileInput("identity-upload")}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Cédula/Pasaporte
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-green-800">{uploadedFiles.identity.name}</p>
                          <p className="text-xs text-green-600">
                            {(uploadedFiles.identity.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile("identity")}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-slate-500 mt-1">JPG, PNG o PDF (máx. 5MB)</p>
                </div>

                {/* Income Document Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Comprobante de Ingresos (Opcional)
                  </label>

                  {/* Hidden file input */}
                  <input
                    id="income-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileUpload("income", e)}
                    className="hidden"
                  />

                  {/* Upload button or file display */}
                  {!uploadedFiles.income ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-dashed border-2 border-slate-300 hover:border-slate-500 hover:bg-slate-50"
                      onClick={() => triggerFileInput("income-upload")}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Documento
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-green-800">{uploadedFiles.income.name}</p>
                          <p className="text-xs text-green-600">
                            {(uploadedFiles.income.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile("income")}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-slate-500 mt-1">JPG, PNG o PDF (máx. 5MB)</p>
                </div>
              </div>

              {/* Upload Instructions */}
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 mb-1">Documentos Aceptados:</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Cédula de identidad dominicana (ambos lados)</li>
                      <li>• Pasaporte (página principal)</li>
                      <li>• Licencia de conducir (si aplica)</li>
                      <li>• Comprobante de ingresos (opcional pero recomendado)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  Acepto los{" "}
                  <a href="/terms" className="text-amber-600 hover:underline">
                    Términos y Condiciones
                  </a>{" "}
                  y la{" "}
                  <a href="/privacy" className="text-amber-600 hover:underline">
                    Política de Privacidad
                  </a>
                </label>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox id="marketing" />
                <label htmlFor="marketing" className="text-sm text-slate-600">
                  Quiero recibir alertas de nuevas oportunidades de inversión y actualizaciones del mercado
                </label>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox id="newsletter" />
                <label htmlFor="newsletter" className="text-sm text-slate-600">
                  Suscribirme al newsletter semanal con análisis de mercado y consejos de inversión
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 text-lg w-full md:w-auto"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Crear Mi Cuenta Gratis
              </Button>
              <p className="text-sm text-slate-600 mt-4">
                Tu cuenta será verificada en 24-72 horas. Recibirás un email de confirmación.
              </p>
            </div>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-slate-200">
              <p className="text-slate-600">
                ¿Ya tienes una cuenta?{" "}
                <a href="/login" className="text-amber-600 hover:underline font-semibold">
                  Iniciar Sesión
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
