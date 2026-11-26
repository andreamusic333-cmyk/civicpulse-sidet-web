'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Plus, UserCheck } from 'lucide-react'
import {
  ACTIVITY_TYPES,
  COMMUNITIES,
  type ActivityType,
  type SessionUser,
} from '@/lib/civic-data'

export type ActivityFormValues = {
  name: string
  community: string
  activityType: ActivityType
  attendees: number
  user: string
}

type ActivityFormProps = {
  currentUser: SessionUser
  onSubmit: (values: ActivityFormValues) => void
}

const inputClass =
  'h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20 aria-invalid:border-destructive'

// Valida los campos de captura antes de crear el registro en el estado del panel
function validateActivityInput(payload: {
  name: string
  community: string
  activityType: string
  attendees: number
  user: string
}): Record<string, string> {
  const validationErrors: Record<string, string> = {}

  if (payload.name.length < 3) {
    validationErrors.name = 'Ingresa un nombre de al menos 3 caracteres.'
  }
  if (!payload.community) {
    validationErrors.community = 'Selecciona una comunidad.'
  }
  if (!payload.activityType) {
    validationErrors.activityType = 'Selecciona un tipo de actividad.'
  }
  if (!Number.isInteger(payload.attendees) || payload.attendees < 1 || payload.attendees > 5000) {
    validationErrors.attendees = 'Ingresa un número entero entre 1 y 5000.'
  }
  if (!payload.user.trim()) {
    validationErrors.user = 'No se detectó un usuario activo en la sesión.'
  }

  return validationErrors
}

export function ActivityForm({ currentUser, onSubmit }: ActivityFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const name = String(formData.get('name') ?? '').trim()
    const community = String(formData.get('community') ?? '')
    const activityType = String(formData.get('activityType') ?? '') as ActivityType
    const attendees = Number(formData.get('attendees'))
    const activeUsername = currentUser.username.trim()

    const nextErrors = validateActivityInput({
      name,
      community,
      activityType,
      attendees,
      user: activeUsername,
    })

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSuccess(null)
      return
    }

    onSubmit({
      name,
      community,
      activityType,
      attendees,
      user: activeUsername,
    })
    form.reset()
    setSuccess(`"${name}" se registró a nombre de ${activeUsername} y quedó pendiente de revisión.`)
  }

  return (
    <section
      id="registrar"
      aria-labelledby="form-heading"
      className="scroll-mt-24 rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="form-heading" className="text-lg font-semibold text-foreground">
            Registro de actividades
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Captura los datos de campo de la intervención realizada.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-foreground">
          <UserCheck className="size-3.5 text-primary" aria-hidden="true" />
          <span>
            Usuario: <strong>{currentUser.username}</strong>
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Nombre del evento
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ej. Asamblea vecinal de seguridad"
            className={inputClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="community" className="text-sm font-medium text-foreground">
            Comunidad
          </label>
          <select
            id="community"
            name="community"
            defaultValue=""
            className={inputClass}
            aria-invalid={Boolean(errors.community)}
            aria-describedby={errors.community ? 'community-error' : undefined}
          >
            <option value="" disabled>
              Selecciona una comunidad
            </option>
            {COMMUNITIES.map((communityName) => (
              <option key={communityName} value={communityName}>
                {communityName}
              </option>
            ))}
          </select>
          {errors.community && (
            <p id="community-error" className="text-xs text-destructive">
              {errors.community}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="activityType" className="text-sm font-medium text-foreground">
            Tipo de actividad
          </label>
          <select
            id="activityType"
            name="activityType"
            defaultValue=""
            className={inputClass}
            aria-invalid={Boolean(errors.activityType)}
            aria-describedby={errors.activityType ? 'activityType-error' : undefined}
          >
            <option value="" disabled>
              Selecciona el tipo de actividad
            </option>
            {ACTIVITY_TYPES.map((typeOption) => (
              <option key={typeOption} value={typeOption}>
                {typeOption}
              </option>
            ))}
          </select>
          {errors.activityType && (
            <p id="activityType-error" className="text-xs text-destructive">
              {errors.activityType}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="attendees" className="text-sm font-medium text-foreground">
            Número de asistentes
          </label>
          <input
            id="attendees"
            name="attendees"
            type="number"
            inputMode="numeric"
            min={1}
            max={5000}
            placeholder="0"
            className={inputClass}
            aria-invalid={Boolean(errors.attendees)}
            aria-describedby={errors.attendees ? 'attendees-error' : undefined}
          />
          {errors.attendees && (
            <p id="attendees-error" className="text-xs text-destructive">
              {errors.attendees}
            </p>
          )}
        </div>

        {errors.user && (
          <p role="alert" className="text-xs text-destructive sm:col-span-2">
            {errors.user}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p role="status" className="flex items-center gap-2 text-sm text-success">
            {success && (
              <>
                <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
                {success}
              </>
            )}
          </p>
          <button
            type="submit"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/30"
          >
            <Plus className="size-4" aria-hidden="true" />
            Registrar actividad
          </button>
        </div>
      </form>
    </section>
  )
}