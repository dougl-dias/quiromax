'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CalendarDays, Check, Clock, User } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ptBR } from 'date-fns/locale'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

const services = [
  'Ajuste Quiroprático',
  'Tratamento de Cefaleia',
  'Reabilitação Postural',
  'Alivio de Dor Lombar',
  'Quiropraxia Esportiva',
  'Terapia de Relaxamento',
  'Primeira Consulta'
]

const appointmentSchema = z.object({
  date: z.string().min(1, 'Selecione uma data.'),
  time: z.string().min(1, 'Selecione um horário.'),
  name: z.string().trim().min(3, 'Informe seu nome completo.'),
  email: z.string().trim().email('Informe um e-mail valido.'),
  phone: z.string().trim().min(10, 'Informe um telefone valido.'),
  service: z.string().min(1, 'Selecione um serviço.')
})

type AppointmentFormValues = z.infer<typeof appointmentSchema>

function formatDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function parseDateKey(dateKey?: string) {
  if (!dateKey) {
    return undefined
  }

  const [year, month, day] = dateKey.split('-').map(Number)

  if (!year || !month || !day) {
    return undefined
  }

  return new Date(year, month - 1, day)
}

export function Appointment() {
  const [step, setStep] = useState(1)
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [availabilityError, setAvailabilityError] = useState('')
  const [isLoadingTimes, setIsLoadingTimes] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      service: ''
    },
    mode: 'onTouched'
  })

  const values = form.watch()
  const selectedDate = parseDateKey(values.date)

  const availableTimeSlots = useMemo(() => timeSlots.filter((time) => !bookedTimes.includes(time)), [bookedTimes])

  const disabledDays = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return { before: today }
  }, [])

  useEffect(() => {
    if (!values.date) {
      setBookedTimes([])
      setAvailabilityError('')
      return
    }

    const controller = new AbortController()

    async function fetchAvailability() {
      try {
        setIsLoadingTimes(true)
        setAvailabilityError('')

        const res = await fetch(`/api/appointments?date=${values.date}`, {
          signal: controller.signal
        })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.error || 'Nao foi possível buscar os horários.')
        }

        const unavailableTimes = Array.isArray(data?.bookedTimes) ? data.bookedTimes : []
        setBookedTimes(unavailableTimes)

        if (values.time && unavailableTimes.includes(values.time)) {
          form.setValue('time', '', { shouldValidate: true })
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setBookedTimes([])
        setAvailabilityError(error instanceof Error ? error.message : 'Nao foi possível buscar os horários.')
      } finally {
        setIsLoadingTimes(false)
      }
    }

    fetchAvailability()

    return () => controller.abort()
  }, [form, values.date, values.time])

  const handleDateSelect = (nextDate?: Date) => {
    setSubmitError('')
    form.setValue('date', nextDate ? formatDateKey(nextDate) : '', {
      shouldDirty: true,
      shouldValidate: true
    })
    form.setValue('time', '', { shouldDirty: true, shouldValidate: true })
  }

  const handleProceedToStep2 = async () => {
    const isValid = await form.trigger(['date', 'time'])

    if (isValid) {
      setStep(2)
    }
  }

  const handleProceedToStep3 = async () => {
    const isValid = await form.trigger(['name', 'email', 'phone', 'service'])

    if (isValid) {
      setStep(3)
    }
  }

  const handleSubmit = async (data: AppointmentFormValues) => {
    setSubmitError('')

    try {
      setIsSubmitting(true)

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(result?.error || 'Erro ao criar agendamento.')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error(error)
      setSubmitError(error instanceof Error ? error.message : 'Erro ao criar agendamento.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    form.reset()
    setBookedTimes([])
    setAvailabilityError('')
    setSubmitError('')
    setStep(1)
    setIsSubmitted(false)
  }

  const canProceedToStep2 = Boolean(values.date && values.time) && !isLoadingTimes
  const canProceedToStep3 = Boolean(values.name && values.email && values.phone && values.service)

  return (
    <section id='agendamento' className='bg-linear-to-b from-muted/50 to-background py-20 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <span className='mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary'>
            Agendamento
          </span>
          <h2 className='text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl'>
            Agende sua consulta online
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Escolha a data e horário que melhor se adéquam a sua agenda. E rápido e fácil.
          </p>
        </div>

        <div className='mx-auto mb-12 max-w-2xl'>
          <div className='flex items-center justify-center gap-4'>
            {[
              { num: 1, label: 'Data e Horário', icon: CalendarDays },
              { num: 2, label: 'Seus Dados', icon: User },
              { num: 3, label: 'Confirmação', icon: Check }
            ].map((s, index) => (
              <div key={s.num} className='flex items-center'>
                <div className='flex flex-col items-center gap-2'>
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full transition-colors',
                      step >= s.num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <s.icon className='h-5 w-5' />
                  </div>
                  <span
                    className={cn(
                      'hidden text-sm font-medium sm:block',
                      step >= s.num ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={cn('mx-4 h-0.5 w-16 transition-colors', step > s.num ? 'bg-primary' : 'bg-muted')} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='mx-auto max-w-4xl'>
          {isSubmitted ? (
            <Card className='border-none bg-card shadow-lg'>
              <CardContent className='flex flex-col items-center gap-6 p-8 text-center lg:p-12'>
                <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
                  <Check className='h-10 w-10 text-primary' />
                </div>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-2xl font-bold text-foreground'>Agendamento confirmado!</h3>
                  <p className='text-muted-foreground'>
                    Seu agendamento foi realizado com sucesso. Voce recebera uma confirmação em breve.
                  </p>
                </div>
                <div className='flex flex-col gap-2 rounded-xl bg-muted/50 p-6 text-left'>
                  <div className='flex items-center gap-3'>
                    <CalendarDays className='h-5 w-5 text-primary' />
                    <span className='text-foreground'>
                      {selectedDate?.toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Clock className='h-5 w-5 text-primary' />
                    <span className='text-foreground'>{values.time}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <User className='h-5 w-5 text-primary' />
                    <span className='text-foreground'>{values.name}</span>
                  </div>
                </div>
                <Button onClick={handleReset} variant='outline'>
                  Fazer novo agendamento
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className='border-none bg-card shadow-lg'>
              <CardContent className='p-6 lg:p-8'>
                {step === 1 && (
                  <div className='flex flex-col gap-8'>
                    <div className='grid gap-8 lg:grid-cols-2'>
                      <div className='flex flex-col gap-4'>
                        <h3 className='flex items-center gap-2 text-lg font-semibold text-foreground'>
                          <CalendarDays className='h-5 w-5 text-primary' />
                          Selecione a data
                        </h3>
                        <div className='flex justify-center rounded-xl border border-border p-4'>
                          <Calendar
                            mode='single'
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            locale={ptBR}
                            disabled={[disabledDays, { dayOfWeek: [0] }]}
                            className='rounded-md'
                          />
                        </div>
                        <FieldError errors={[form.formState.errors.date]} />
                      </div>

                      <div className='flex flex-col gap-4'>
                        <h3 className='flex items-center gap-2 text-lg font-semibold text-foreground'>
                          <Clock className='h-5 w-5 text-primary' />
                          Selecione o horário
                        </h3>

                        {availabilityError && (
                          <Alert variant='destructive'>
                            <AlertCircle />
                            <AlertTitle>Erro ao buscar horários</AlertTitle>
                            <AlertDescription>{availabilityError}</AlertDescription>
                          </Alert>
                        )}

                        <div className='grid grid-cols-2 gap-3'>
                          {!values.date ? (
                            <p className='col-span-2 text-sm text-muted-foreground'>
                              Selecione uma data para ver os horários.
                            </p>
                          ) : isLoadingTimes ? (
                            <p className='col-span-2 text-sm text-muted-foreground'>Buscando horários disponíveis...</p>
                          ) : availableTimeSlots.length ? (
                            availableTimeSlots.map((time) => (
                              <button
                                key={time}
                                type='button'
                                onClick={() =>
                                  form.setValue('time', time, {
                                    shouldDirty: true,
                                    shouldValidate: true
                                  })
                                }
                                className={cn(
                                  'rounded-xl border border-border px-4 py-3 text-sm font-medium transition-all',
                                  values.time === time
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'bg-background text-foreground hover:border-primary/50 hover:bg-muted'
                                )}
                              >
                                {time}
                              </button>
                            ))
                          ) : (
                            <p className='col-span-2 text-sm text-muted-foreground'>
                              Nao ha horários disponíveis para esta data.
                            </p>
                          )}
                        </div>
                        <FieldError errors={[form.formState.errors.time]} />
                      </div>
                    </div>

                    <div className='flex justify-end'>
                      <Button onClick={handleProceedToStep2} disabled={!canProceedToStep2} size='lg'>
                        Continuar
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault()
                      handleProceedToStep3()
                    }}
                    className='flex flex-col gap-6'
                  >
                    <div className='rounded-xl bg-muted/50 p-4'>
                      <div className='flex flex-wrap items-center gap-4 text-sm'>
                        <div className='flex items-center gap-2'>
                          <CalendarDays className='h-4 w-4 text-primary' />
                          <span className='text-foreground'>
                            {selectedDate?.toLocaleDateString('pt-BR', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Clock className='h-4 w-4 text-primary' />
                          <span className='text-foreground'>{values.time}</span>
                        </div>
                      </div>
                    </div>

                    <FieldGroup>
                      <Field>
                        <FieldLabel>Nome completo</FieldLabel>
                        <Input
                          {...form.register('name')}
                          placeholder='Seu nome completo'
                          aria-invalid={!!form.formState.errors.name}
                        />
                        <FieldError errors={[form.formState.errors.name]} />
                      </Field>

                      <div className='grid gap-4 sm:grid-cols-2'>
                        <Field>
                          <FieldLabel>E-mail</FieldLabel>
                          <Input
                            {...form.register('email')}
                            type='email'
                            placeholder='seu@email.com'
                            aria-invalid={!!form.formState.errors.email}
                          />
                          <FieldError errors={[form.formState.errors.email]} />
                        </Field>

                        <Field>
                          <FieldLabel>Telefone</FieldLabel>
                          <Input
                            {...form.register('phone')}
                            type='tel'
                            placeholder='(11) 99999-9999'
                            aria-invalid={!!form.formState.errors.phone}
                          />
                          <FieldError errors={[form.formState.errors.phone]} />
                        </Field>
                      </div>

                      <Field>
                        <FieldLabel>Serviço desejado</FieldLabel>
                        <Controller
                          control={form.control}
                          name='service'
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger aria-invalid={!!form.formState.errors.service}>
                                <SelectValue placeholder='Selecione um serviço' />
                              </SelectTrigger>
                              <SelectContent>
                                {services.map((service) => (
                                  <SelectItem key={service} value={service}>
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FieldError errors={[form.formState.errors.service]} />
                      </Field>
                    </FieldGroup>

                    <div className='flex justify-between gap-4'>
                      <Button type='button' variant='outline' onClick={() => setStep(1)}>
                        Voltar
                      </Button>
                      <Button type='submit' disabled={!canProceedToStep3}>
                        Continuar
                      </Button>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <div className='flex flex-col gap-6'>
                    <h3 className='text-xl font-semibold text-foreground'>Confirme seu agendamento</h3>

                    {submitError && (
                      <Alert variant='destructive'>
                        <AlertCircle />
                        <AlertTitle>Nao foi possível confirmar</AlertTitle>
                        <AlertDescription>{submitError}</AlertDescription>
                      </Alert>
                    )}

                    <div className='flex flex-col gap-4 rounded-xl bg-muted/50 p-6'>
                      <div className='grid gap-4 sm:grid-cols-2'>
                        <div>
                          <p className='text-sm text-muted-foreground'>Data</p>
                          <p className='font-medium text-foreground'>
                            {selectedDate?.toLocaleDateString('pt-BR', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Horário</p>
                          <p className='font-medium text-foreground'>{values.time}</p>
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Nome</p>
                          <p className='font-medium text-foreground'>{values.name}</p>
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>E-mail</p>
                          <p className='font-medium text-foreground'>{values.email}</p>
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Telefone</p>
                          <p className='font-medium text-foreground'>{values.phone}</p>
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Serviço</p>
                          <p className='font-medium text-foreground'>{values.service}</p>
                        </div>
                      </div>
                    </div>

                    <div className='flex justify-between gap-4'>
                      <Button variant='outline' onClick={() => setStep(2)}>
                        Voltar
                      </Button>
                      <Button onClick={form.handleSubmit(handleSubmit)} disabled={isSubmitting} size='lg'>
                        {isSubmitting ? 'Confirmando...' : 'Confirmar agendamento'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
