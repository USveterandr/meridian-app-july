"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Building2, Globe, Play, Calculator, Trophy, User, Sparkles } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useGamification } from "@/lib/gamification-context"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState("EN")
  const { state } = useGamification()

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇩🇴" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "ZH", name: "中文", flag: "🇨🇳" },
  ]

  return (
    <header className="relative bg-white/95 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Building2 className="h-8 w-8 text-amber-600 group-hover:text-amber-700 transition-colors" />
              <div className="absolute -inset-1 bg-amber-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Meridian
              </span>
              <span className="text-xs text-amber-600 font-medium">República Dominicana</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { name: "Inicio", href: "/", icon: null },
              { name: "Explorar", href: "/explore", icon: Play, isNew: true },
              { name: "Propiedades", href: "/properties", icon: null },
              { name: "Calculadora", href: "/calculator", icon: Calculator, isGamified: true },
              { name: "Vender", href: "/sell", icon: null },
              { name: "Invertir", href: "/invest", icon: null },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-700 hover:text-amber-600 font-medium transition-colors relative group flex items-center space-x-1"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.name}</span>
                {item.isNew && (
                  <Badge variant="destructive" className="text-xs px-1 py-0 ml-1 animate-pulse">
                    NEW
                  </Badge>
                )}
                {item.isGamified && (
                  <Sparkles className="h-3 w-3 text-purple-500 animate-pulse" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* User Level & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Level Indicator */}
            <Link href="/profile" className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all">
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-bold capitalize">{state.level}</span>
              <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                {state.totalPoints}
              </Badge>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-slate-700 hover:text-amber-600 hover:bg-amber-50">
                  <User className="h-4 w-4 mr-1" />
                  Mi Cuenta
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Mi Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login">Iniciar Sesión</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">Crear Cuenta</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* User Level for Mobile */}
              <Link href="/profile" className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span className="font-bold capitalize">Nivel {state.level}</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {state.totalPoints} pts
                </Badge>
              </Link>
              
              {[
                { name: "Inicio", href: "/", icon: null },
                { name: "🎮 Explorar", href: "/explore", icon: null },
                { name: "Propiedades", href: "/properties", icon: null },
                { name: "✨ Calculadora", href: "/calculator", icon: null },
                { name: "Vender", href: "/sell", icon: null },
                { name: "Invertir", href: "/invest", icon: null },
                { name: "Mi Perfil", href: "/profile", icon: null },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-slate-700 hover:text-amber-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700" asChild>
                  <Link href="/register">Crear Cuenta</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
