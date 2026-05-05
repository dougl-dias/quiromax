"use client"

import { Check } from "lucide-react"

const benefits = [
  {
    title: "Alívio de Dores",
    description: "Tratamentos eficazes para eliminar dores na coluna, pescoço e articulações.",
  },
  {
    title: "Melhora da Postura",
    description: "Correção postural para prevenir problemas futuros e melhorar sua aparência.",
  },
  {
    title: "Mais Mobilidade",
    description: "Aumento da amplitude de movimento e flexibilidade das articulações.",
  },
  {
    title: "Redução do Estresse",
    description: "Técnicas que promovem relaxamento e equilíbrio do sistema nervoso.",
  },
  {
    title: "Prevenção de Lesões",
    description: "Fortalecimento e alinhamento corporal para evitar futuras lesões.",
  },
  {
    title: "Qualidade de Vida",
    description: "Melhora geral na disposição, sono e bem-estar diário.",
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Benefícios
            </span>
            <h2 className="text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Por que escolher a quiropraxia?
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A quiropraxia é uma abordagem natural e eficaz para tratar diversos 
              problemas de saúde, focando na causa raiz dos sintomas ao invés de 
              apenas mascarar a dor.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Nossos tratamentos são personalizados para cada paciente, garantindo 
              os melhores resultados possíveis para sua condição específica.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group flex flex-col gap-3 rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                  <Check className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
