"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  Globe,
  Shield,
  FileText,
  HelpCircle,
  Users,
  TrendingUp
} from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Properties", href: "#properties" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "About Us", href: "#about" },
    { label: "Success Stories", href: "#success" }
  ],
  resources: [
    { label: "Investment Guide", href: "/guide" },
    { label: "Tax Information", href: "/tax-info" },
    { label: "Market Reports", href: "/reports" },
    { label: "Legal Resources", href: "/legal" },
    { label: "Blog", href: "/blog" }
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Support", href: "/contact" },
    { label: "Live Chat", href: "/chat" },
    { label: "Schedule Consultation", href: "/consultation" },
    { label: "FAQ", href: "/faq" }
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Compliance", href: "/compliance" }
  ]
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Avenida Winston Churchill 100, Santo Domingo, Dominican Republic"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (809) 123-4567"
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@investwithmeridian.com"
  }
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/meridian", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/meridian", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/meridian", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/meridian", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/meridian", label: "YouTube" }
];

export function Footer() {
  return (
    <footer className="bg-background border-t">
      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">M</span>
                </div>
                <span className="font-bold text-2xl">Meridian</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Premium real estate investment platform for the Dominican Republic. 
                Connecting global investors with exclusive opportunities in paradise.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">{contact.label}</div>
                        <div className="text-sm text-muted-foreground">{contact.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                Platform
              </h3>
              <ul className="space-y-2">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                Resources
              </h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                Support
              </h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                Legal
              </h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Newsletter */}
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <span className="font-medium">Stay Updated</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Get the latest investment opportunities and market insights
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Follow us:</span>
              </div>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                © 2024 Meridian Real Estate Investment Platform. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                  <span>15,000+ Investors</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                  <span>2,500+ Properties</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}