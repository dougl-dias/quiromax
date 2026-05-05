"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Maria Silva",
    role: "Professora",
    content:
      "Sofria com dores nas costas há anos. Depois de algumas sessões na Quiromax, minha vida mudou completamente. Recomendo a todos!",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Engenheiro",
    content:
      "O atendimento é excelente e os profissionais são muito competentes. Finalmente consegui me livrar das dores no pescoço.",
    rating: 5,
  },
  {
    name: "Ana Oliveira",
    role: "Atleta",
    content:
      "Como atleta, preciso manter meu corpo em perfeito estado. A Quiromax me ajuda a prevenir lesões e melhorar meu desempenho.",
    rating: 5,
  },
  {
    name: "Carlos Mendes",
    role: "Empresário",
    content:
      "Trabalho muitas horas sentado e isso prejudicava minha postura. O tratamento da Quiromax resolveu completamente meu problema.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="bg-muted/50 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Depoimentos
          </span>
          <h2 className="text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            O que nossos pacientes dizem
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Veja o que nossos pacientes têm a dizer sobre suas experiências 
            com a Quiromax.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-none bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {testimonial.content}
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
