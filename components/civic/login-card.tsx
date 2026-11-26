'use client'

import { useState, type FormEvent } from 'react'
import { KeyRound, LogIn } from 'lucide-react'
import type { SessionUser } from '@/lib/civic-data'

type LoginCardProps = {
  onLogin: (sessionUser: SessionUser) => void
}

const fieldClass =
  'h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20'

export function LoginCard({ onLogin }: LoginCardProps) {
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('Coordinador de campo')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Valida que el nombre de usuario tenga longitud mínima y no sea solo espacios
  function validateSessionInput(rawName: string): string | null {
    const cleanName = rawName.trim()
    if (!cleanName) {
      return 'Ingresa tu nombre de usuario para iniciar sesión.'
    }
    if (cleanName.length < 3) {
      return 'El nombre de usuario debe tener al menos 3 caracteres.'
    }
    return null
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationError = validateSessionInput(username)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    setErrorMessage(null)
    onLogin({
      username: username.trim(),
      role: role.trim() || 'Operador',
    })
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <section
        aria-labelledby="login-heading"
        className="w-full rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <KeyRound className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h2 id="login-heading" className="text-lg font-semibold text-foreground">
              Acceso al panel operativo
            </h2>
            <p className="text-xs text-muted-foreground">
              Identifícate para registrar y auditar actividades comunitarias.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-username" className="text-sm font-medium text-foreground">
              Usuario
            </label>
            <input
              id="login-username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej. Andrea Pérez"
              autoComplete="username"
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-role" className="text-sm font-medium text-foreground">
              Rol operativo
            </label>
            <select
              id="login-role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={fieldClass}
            >
              <option value="Coordinador de campo">Coordinador de campo</option>
              <option value="Facilitador comunitario">Facilitador comunitario</option>
              <option value="Analista de seguimiento">Analista de seguimiento</option>
            </select>
          </div>

          {errorMessage && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/30"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Iniciar sesión
          </button>
        </form>
      </section>
    </div>
  )
}