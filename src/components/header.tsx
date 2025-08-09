"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, User, LogIn } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("es");

  const toggleLanguage = () => {
    setCurrentLang(currentLang === "es" ? "en" : "es");
  };

  const navItems = [
    { label: { es: "Inicio", en: "Home" }, href: "/" },
    { label: { es: "Propiedades", en: "Properties" }, href: "#properties" },
    { label: { es: "Cómo Funciona", en: "How It Works" }, href: "#how-it-works" },
    { label: { es: "Incentivos Fiscales", en: "Tax Incentives" }, href: "#tax-incentives" },
    { label: { es: "Precios", en: "Pricing" }, href: "#pricing" },
    { label: { es: "Acerca de", en: "About" }, href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <span className="font-bold text-2xl text-gray-900">Meridian</span>
                <div className="text-xs text-blue-600 font-medium">
                  República Dominicana
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.label[currentLang as keyof typeof item.label]}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex text-gray-600 hover:text-blue-600"
            >
              <Globe className="h-4 w-4 mr-2" />
              {currentLang.toUpperCase()}
            </Button>

            {/* Auth buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                <LogIn className="h-4 w-4 mr-2" />
                {currentLang === "es" ? "Iniciar Sesión" : "Sign In"}
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <User className="h-4 w-4 mr-2" />
                {currentLang === "es" ? "Registrarse" : "Register"}
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 bg-white">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors px-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label[currentLang as keyof typeof item.label]}
                </Link>
              ))}
              <div className="flex items-center space-x-2 px-2 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {currentLang.toUpperCase()}
                </Button>
              </div>
              <div className="flex flex-col space-y-2 px-2 pt-2 border-t">
                <Button variant="ghost" size="sm" className="justify-start text-gray-600 hover:text-blue-600">
                  <LogIn className="h-4 w-4 mr-2" />
                  {currentLang === "es" ? "Iniciar Sesión" : "Sign In"}
                </Button>
                <Button size="sm" className="justify-start bg-blue-600 hover:bg-blue-700 text-white">
                  <User className="h-4 w-4 mr-2" />
                  {currentLang === "es" ? "Registrarse" : "Register"}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}