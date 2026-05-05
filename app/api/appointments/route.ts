import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'] as const

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data invalida.')

const appointmentSchema = z.object({
  date: dateSchema,
  time: z.enum(timeSlots, { message: 'Horário invalido.' }),
  name: z.string().trim().min(3, 'Informe seu nome completo.'),
  email: z.string().trim().email('Informe um e-mail valido.'),
  phone: z.string().trim().min(10, 'Informe um telefone valido.'),
  service: z.string().trim().min(1, 'Selecione um serviço.')
})

function dateRangeFromKey(dateKey: string) {
  const start = new Date(`${dateKey}T00:00:00.000Z`)
  const end = new Date(start)
  end.setUTCDate(end.getUTCDate() + 1)

  return { start, end }
}

function firstZodMessage(error: z.ZodError) {
  return error.issues[0]?.message || 'Dados inválidos.'
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = appointmentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: firstZodMessage(parsed.error) }, { status: 400 })
    }

    const { date, time, name, email, phone, service } = parsed.data
    const { start, end } = dateRangeFromKey(date)

    const exists = await prisma.appointment.findFirst({
      where: {
        date: {
          gte: start,
          lt: end
        },
        time
      }
    })

    if (exists) {
      return NextResponse.json({ error: 'Este horário acabou de ser ocupado. Escolha outro horário.' }, { status: 409 })
    }

    const appointment = await prisma.appointment.create({
      data: {
        date: start,
        time,
        name,
        email,
        phone,
        service
      }
    })

    return NextResponse.json({ appointment }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Nao foi possível criar o agendamento.' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')
    const parsed = dateSchema.safeParse(date)

    if (!parsed.success) {
      return NextResponse.json({ error: firstZodMessage(parsed.error) }, { status: 400 })
    }

    const { start, end } = dateRangeFromKey(parsed.data)
    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: start,
          lt: end
        }
      },
      select: {
        time: true
      }
    })

    return NextResponse.json({
      bookedTimes: appointments.map((appointment) => appointment.time)
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Nao foi possível buscar os horários.' }, { status: 500 })
  }
}
