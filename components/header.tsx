'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#contato', label: 'Contato' }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary'>
                <span className='text-xl font-bold text-primary-foreground'>Q</span>
              </div>
              <span className='font-serif text-2xl font-bold text-foreground'>Quiromax</span>
            </div>
          </Link>

          <nav className='hidden items-center gap-8 md:flex'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className='hidden md:block'>
            <Button asChild>
              <Link href='#agendamento'>Agendar Consulta</Link>
            </Button>
          </div>

          <button
            className='flex h-10 w-10 items-center justify-center rounded-lg md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle menu'
          >
            {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn('overflow-hidden transition-all duration-300 md:hidden', isMenuOpen ? 'max-h-96' : 'max-h-0')}>
        <nav className='flex flex-col gap-4 bg-background px-4 pb-6'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className='mt-2'>
            <Link href='#agendamento' onClick={() => setIsMenuOpen(false)}>
              Agendar Consulta
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
