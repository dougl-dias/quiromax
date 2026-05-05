"use client"

import { Award, Users, Clock, Heart } from "lucide-react"

const stats = [
  { icon: Users, value: "+5.000", label: "Pacientes" },
  { icon: Award, value: "15+", label: "Anos de experiência" },
  { icon: Clock, value: "24h", label: "Suporte" },
  { icon: Heart, value: "98%", label: "Satisfação" },
]

export function About() {
  return (
    <section id="sobre" className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="flex h-full items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center gap-2 rounded-2xl bg-card p-6 shadow-sm"
                      >
                        <stat.icon className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </span>
                        <span className="text-center text-sm text-muted-foreground">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl bg-primary/5" />
            </div>
          </div>

          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Sobre nós
            </span>
            <h2 className="text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Dedicados à sua saúde e bem-estar
            </h2>
            <div className="flex flex-col gap-4 text-muted-foreground">
              <p className="leading-relaxed">
                A Quiromax é uma clínica especializada em quiropraxia, fundada com 
                a missão de proporcionar alívio das dores e melhorar a qualidade 
                de vida de nossos pacientes através de técnicas avançadas e 
                tratamentos personalizados.
              </p>
              <p className="leading-relaxed">
                Nossa equipe é formada por profissionais altamente qualificados e 
                certificados, comprometidos em oferecer um atendimento humanizado 
                e focado nas necessidades individuais de cada paciente.
              </p>
              <p className="leading-relaxed">
                Acreditamos que o corpo humano tem uma capacidade natural de cura, 
                e nosso papel é auxiliar nesse processo através de ajustes 
                quiroprático precisos e orientações para um estilo de vida saudável.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
