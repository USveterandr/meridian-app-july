import Link from "next/link"
import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const footerSections = [
    {
      title: "EMPRESA",
      links: [
        { name: "Acerca de Nosotros", href: "/about" },
        { name: "Contacto", href: "/contact" },
        { name: "Carreras", href: "/careers" },
        { name: "Prensa", href: "/press" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "PROPIEDADES",
      links: [
        { name: "Buscar Todas", href: "/properties" },
        { name: "Casas de Lujo", href: "/properties/houses" },
        { name: "Apartamentos", href: "/properties/apartments" },
        { name: "Propiedades Comerciales", href: "/properties/commercial" },
        { name: "Hoteles y Resorts", href: "/properties/hotels" },
      ],
    },
    {
      title: "SERVICIOS",
      links: [
        { name: "Vender Propiedad", href: "/sell" },
        { name: "Invertir", href: "/invest" },
        { name: "Incentivos Fiscales", href: "/incentives" },
        { name: "Asesoría Legal", href: "/legal" },
        { name: "Financiamiento", href: "/financing" },
      ],
    },
    {
      title: "SOPORTE",
      links: [
        { name: "Centro de Ayuda", href: "/help" },
        { name: "Guía del Comprador", href: "/buyer-guide" },
        { name: "Guía del Vendedor", href: "/seller-guide" },
        { name: "FAQ", href: "/faq" },
        { name: "Reportes de Mercado", href: "/reports" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Building2 className="h-8 w-8 text-amber-600" />
              <div>
                <span className="text-2xl font-bold">Meridian</span>
                <div className="text-xs text-amber-600">República Dominicana</div>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              La plataforma líder para inversiones inmobiliarias de lujo en República Dominicana. Conectamos
              inversionistas verificados con propiedades exclusivas a través de un proceso 100% seguro y transparente.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-slate-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">Santo Domingo, República Dominicana</span>
              </div>
              <div className="flex items-center text-slate-400">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+1 (809) 555-0123</span>
              </div>
              <div className="flex items-center text-slate-400">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">info@meridian-dr.com</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="p-2 bg-slate-800 rounded-lg hover:bg-amber-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Dominican Republic Specific Section */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-600 mb-4">🇩🇴 Información Legal República Dominicana</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400">
              <div>
                <h4 className="font-medium text-white mb-2">Verificación de Documentos</h4>
                <p>
                  Validamos con Junta Central Electoral (JCE) y Jurisdicción Inmobiliaria para garantizar la
                  autenticidad de todas las propiedades.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Cumplimiento Legal</h4>
                <p>
                  Operamos bajo las regulaciones dominicanas de bienes raíces y mantenemos los más altos estándares de
                  transparencia.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Incentivos Fiscales</h4>
                <p>
                  Información actualizada sobre CONFOTUR, Zonas Francas y otros beneficios para inversionistas
                  extranjeros.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 Meridian República Dominicana. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
                Términos de Servicio
              </Link>
              <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/legal" className="text-slate-400 hover:text-white text-sm transition-colors">
                Aviso Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
