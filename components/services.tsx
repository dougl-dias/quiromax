"use client"

import { Bone, Brain, Activity, Zap, HeartPulse, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Bone,
    title: "Ajuste Quiroprático",
    description:
      "Correção de desalinhamentos da coluna vertebral para restaurar a função normal do sistema nervoso e aliviar dores.",
  },
  {
    icon: Brain,
    title: "Tratamento de Cefaleia",
    description:
      "Técnicas específicas para aliviar dores de cabeça tensionais e enxaquecas causadas por problemas cervicais.",
  },
  {
    icon: Activity,
    title: "Reabilitação Postural",
    description:
      "Programa completo de exercícios e orientações para corrigir a postura e prevenir problemas futuros.",
  },
  {
    icon: Zap,
    title: "Alívio de Dor Lombar",
    description:
      "Tratamento focado na região lombar para eliminar dores crônicas e agudas na parte inferior das costas.",
  },
  {
    icon: HeartPulse,
    title: "Quiropraxia Esportiva",
    description:
      "Cuidados especializados para atletas, prevenindo lesões e otimizando o desempenho físico.",
  },
  {
    icon: Sparkles,
    title: "Terapia de Relaxamento",
    description:
      "Técnicas complementares para reduzir o estresse, tensão muscular e promover o bem-estar geral.",
  },
]

export function Services() {
  return (
    <section id="servicos" className="bg-muted/50 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Nossos Serviços
          </span>
          <h2 className="text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Tratamentos especializados para você
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Oferecemos uma variedade de serviços para atender às suas necessidades 
            de saúde e bem-estar.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group border-none bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">
                  <service.icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
