'use client'

import { useState } from 'react'
import { Activity, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Actividades', href: '#registrar' },
  { label: 'Indicadores', href: '#indicadores' },
  { label: 'Comunidad', href: '#comunidad' },
  { label: 'Alertas', href: '#alertas' },
  { label: 'Tabla de Trazabilidad', href: '#trazabilidad' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2" aria-label="CivicPulse, ir al inicio">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="size-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Civic<span className="text-accent">Pulse</span>
            </span>
            <span className="text-xs text-muted-foreground">Mun. Juan José Mora · Morón, Carabobo</span>
          </span>
        </a>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#registrar"
            className="hidden h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            Registrar actividad
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-foreground hover:bg-secondary lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Navegación móvil"
        className={cn('border-t border-border bg-card lg:hidden', open ? 'block' : 'hidden')}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2 sm:hidden">
            <a
              href="#registrar"
              onClick={() => setOpen(false)}
              className="flex h-10 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground"
            >
              Registrar actividad
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
