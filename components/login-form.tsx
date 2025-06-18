"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { LogIn, Eye, EyeOff, Building2, Loader2 } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = () => {
    const errors: string[] = []

    if (!formData.email.trim()) errors.push("Email es requerido")
    if (!formData.password) errors.push("Contraseña es requerida")

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("Email no es válido")
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const errors = validateForm()
    if (errors.length > 0) {
      alert("Por favor corrige los siguientes errores:\n\n" + errors.join("\n"))
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Here you would normally send to your API
      console.log("Login submitted:", formData)

      // Success - redirect to dashboard
      alert("¡Inicio de sesión exitoso!\n\nRedirigiendo al panel de control...")

      // Reset form
      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      })

      // Redirect to dashboard
      // window.location.href = '/dashboard'
    } catch (error) {
      console.error("Error logging in:", error)
      alert("Email o contraseña incorrectos. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-amber-200 shadow-xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Building2 className="h-8 w-8 text-amber-600 mr-2" />
          <span className="text-2xl font-bold text-slate-900">Meridian</span>
        </div>
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <p className="text-slate-600">Accede a tu cuenta de inversionista</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="tu@email.com"
              className={!formData.email.trim() ? "border-red-300" : ""}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Tu contraseña"
                className={!formData.password ? "border-red-300" : ""}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm text-slate-600">
                Recordarme
              </label>
            </div>
            <a href="/forgot-password" className="text-sm text-amber-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Iniciando Sesión...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Iniciar Sesión
              </>
            )}
          </Button>

          <div className="text-center pt-4 border-t border-slate-200">
            <p className="text-slate-600">
              ¿No tienes una cuenta?{" "}
              <a href="/register" className="text-amber-600 hover:underline font-semibold">
                Registrarse Gratis
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
