"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { LogIn, Eye, EyeOff, Building2 } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

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
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <Input type="email" placeholder="tu@email.com" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Tu contraseña" />
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
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm text-slate-600">
              Recordarme
            </label>
          </div>
          <a href="/forgot-password" className="text-sm text-amber-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
        >
          <LogIn className="h-5 w-5 mr-2" />
          Iniciar Sesión
        </Button>

        <div className="text-center pt-4 border-t border-slate-200">
          <p className="text-slate-600">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-amber-600 hover:underline font-semibold">
              Registrarse Gratis
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
