"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

const benefits = [
  "Alívio imediato de dores",
  "Profissionais certificados",
  "Atendimento personalizado",
]

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-secondary/50 to-background pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Sua saúde em primeiro lugar
              </span>
              <h1 className="text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Cuide da sua coluna, transforme sua vida
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                A Quiromax oferece tratamentos especializados em quiropraxia para 
                aliviar suas dores e melhorar sua qualidade de vida. Agende sua 
                consulta e sinta a diferença.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="group">
                <Link href="#agendamento">
                  Agendar Consulta
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#servicos">Conhecer Serviços</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-full w-full">
                  <svg
                    viewBox="0 0 400 400"
                    className="h-full w-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Spine illustration */}
                    <ellipse cx="200" cy="80" rx="30" ry="15" className="fill-primary/30" />
                    <ellipse cx="200" cy="110" rx="32" ry="16" className="fill-primary/35" />
                    <ellipse cx="200" cy="145" rx="34" ry="17" className="fill-primary/40" />
                    <ellipse cx="200" cy="180" rx="36" ry="18" className="fill-primary/45" />
                    <ellipse cx="200" cy="215" rx="38" ry="19" className="fill-primary/50" />
                    <ellipse cx="200" cy="250" rx="36" ry="18" className="fill-primary/55" />
                    <ellipse cx="200" cy="285" rx="34" ry="17" className="fill-primary/60" />
                    <ellipse cx="200" cy="320" rx="32" ry="16" className="fill-primary/65" />
                    <ellipse cx="200" cy="355" rx="30" ry="15" className="fill-primary/70" />
                    
                    {/* Connection lines */}
                    <path
                      d="M200 65 L200 370"
                      className="stroke-primary/20"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    
                    {/* Decorative circles */}
                    <circle cx="130" cy="200" r="40" className="fill-accent/10 stroke-accent/20" strokeWidth="1" />
                    <circle cx="270" cy="200" r="40" className="fill-accent/10 stroke-accent/20" strokeWidth="1" />
                  </svg>
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -left-4 top-1/4 rounded-xl bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">+5.000</p>
                    <p className="text-xs text-muted-foreground">Pacientes atendidos</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 bottom-1/4 rounded-xl bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg font-bold text-primary">98%</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Satisfação</p>
                    <p className="text-xs text-muted-foreground">dos pacientes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
