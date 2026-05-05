"use client"

import Link from "next/link"
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Ajuste Quiroprático", href: "#servicos" },
    { label: "Tratamento de Cefaleia", href: "#servicos" },
    { label: "Reabilitação Postural", href: "#servicos" },
    { label: "Quiropraxia Esportiva", href: "#servicos" },
  ],
  company: [
    { label: "Sobre Nós", href: "#sobre" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Contato", href: "#contato" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-xl font-bold text-primary-foreground">Q</span>
              </div>
              <span className="font-serif text-2xl font-bold text-background">
                Quiromax
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-background/70">
              Cuidando da sua saúde e bem-estar com tratamentos especializados 
              em quiropraxia.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-background">Serviços</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-background">Empresa</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-background">Contato</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-background/70">
                  Av. Paulista, 1000 - Bela Vista, São Paulo - SP
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-background/70">(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-background/70">
                  contato@quiromax.com.br
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 sm:flex-row">
          <p className="text-sm text-background/50">
            {new Date().getFullYear()} Quiromax. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-background/50 transition-colors hover:text-background"
            >
              Política de Privacidade
            </Link>
            <Link
              href="#"
              className="text-sm text-background/50 transition-colors hover:text-background"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
