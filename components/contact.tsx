'use client'

import { ChangeEvent, useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Endereço',
    content: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP'
  },
  {
    icon: Phone,
    title: 'Telefone',
    content: '(11) 99999-9999'
  },
  {
    icon: Mail,
    title: 'E-mail',
    content: 'contato@quiromax.com.br'
  },
  {
    icon: Clock,
    title: 'Horário',
    content: 'Seg-Sex: 8h às 20h | Sáb: 8h às 14h'
  }
]

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [phone, setPhone] = useState('')

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(event.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <section id='contato' className='bg-background py-20 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <span className='mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary'>
            Contato
          </span>
          <h2 className='text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl'>
            Entre em contato conosco
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Tire suas dúvidas ou envie uma mensagem. Nossa equipe está pronta para atendê-lo.
          </p>
        </div>

        <div className='grid gap-8 lg:grid-cols-2'>
          <div className='grid gap-4 sm:grid-cols-2'>
            {contactInfo.map((info) => (
              <Card key={info.title} className='border-none bg-muted/50 shadow-none'>
                <CardContent className='flex flex-col gap-4 p-6'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10'>
                    <info.icon className='h-6 w-6 text-primary' />
                  </div>
                  <div>
                    <h3 className='font-medium text-foreground'>{info.title}</h3>
                    <p className='mt-1 text-sm text-muted-foreground'>{info.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className='border-none bg-card shadow-lg'>
            <CardContent className='p-6 lg:p-8'>
              {isSubmitted ? (
                <div className='flex h-full flex-col items-center justify-center gap-4 py-8 text-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
                    <Send className='h-8 w-8 text-primary' />
                  </div>
                  <h3 className='text-xl font-semibold text-foreground'>Mensagem enviada!</h3>
                  <p className='text-muted-foreground'>Agradecemos seu contato. Retornaremos em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor='name'>Nome completo</FieldLabel>
                      <Input name='name' id='name' type='text' placeholder='Seu nome' autoComplete='name' required />
                    </Field>
                    <div className='grid gap-4 sm:grid-cols-2'>
                      <Field>
                        <FieldLabel htmlFor='email'>E-mail</FieldLabel>
                        <Input
                          type='email'
                          name='email'
                          id='email'
                          placeholder='seu@email.com'
                          autoComplete='email'
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor='phone'>Telefone</FieldLabel>
                        <Input
                          type='tel'
                          name='phone'
                          id='phone'
                          placeholder='(11) 99999-9999'
                          autoComplete='tel'
                          inputMode='numeric'
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                        />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor='message'>Mensagem</FieldLabel>
                      <Textarea name='message' id='message' placeholder='Como podemos ajudá-lo?' rows={4} required />
                    </Field>
                  </FieldGroup>

                  <Button type='submit' className='w-full bg-primary hover:bg-primary/90' disabled={isLoading}>
                    {isLoading ? (
                      <span className='flex items-center gap-2'>
                        <span className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
                        Enviando...
                      </span>
                    ) : (
                      <span className='flex items-center gap-2'>
                        <Send className='w-4 h-4' />
                        Enviar mensagem
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
