'use client'

import { useState } from 'react'
import { CalendarDays, Layers, MapPin, Search, UserRound, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  ACTIVITY_TYPES,
  STATUSES,
  type Activity,
  type ActivityStatus,
  type ActivityType,
} from '@/lib/civic-data'
import { formatDate } from '@/lib/format'

const STATUS_STYLES: Record<ActivityStatus, string> = {
  'En curso': 'bg-info/12 text-info',
  Finalizado: 'bg-success/12 text-success',
  'En revisión': 'bg-warning/15 text-warning-foreground',
}

type TraceabilityTableProps = {
  activities: Activity[]
}

function StatusBadge({ status }: { status: ActivityStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap',
        STATUS_STYLES[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  )
}

// Filtra las filas por estatus, tipo de actividad y texto de búsqueda
function filterActivities(
  activities: Activity[],
  statusFilter: ActivityStatus | 'Todos',
  typeFilter: ActivityType | 'Todos',
  searchQuery: string,
): Activity[] {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return activities.filter((item) => {
    const matchesStatus = statusFilter === 'Todos' || item.status === statusFilter
    const matchesType = typeFilter === 'Todos' || item.activityType === typeFilter
    const matchesQuery =
      !normalizedQuery ||
      [item.name, item.community, item.user, item.activityType].some((field) =>
        String(field ?? '').toLowerCase().includes(normalizedQuery),
      )

    return matchesStatus && matchesType && matchesQuery
  })
}

export function TraceabilityTable({ activities }: TraceabilityTableProps) {
  const [statusFilter, setStatusFilter] = useState<ActivityStatus | 'Todos'>('Todos')
  const [typeFilter, setTypeFilter] = useState<ActivityType | 'Todos'>('Todos')
  const [searchQuery, setSearchQuery] = useState('')

  const visibleRows = filterActivities(activities, statusFilter, typeFilter, searchQuery)

  const countForStatus = (statusOption: ActivityStatus | 'Todos') =>
    statusOption === 'Todos'
      ? activities.length
      : activities.filter((item) => item.status === statusOption).length

  return (
    <section
      id="trazabilidad"
      aria-labelledby="table-heading"
      className="scroll-mt-24 rounded-xl border border-border bg-card shadow-sm"
    >
      <div className="flex flex-col gap-4 border-b border-border p-4 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id="table-heading" className="text-base font-semibold text-foreground sm:text-lg">
            Tabla de trazabilidad
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Historial acumulado de intervenciones comunitarias.
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="table-search" className="sr-only">
              Buscar actividad
            </label>
            <input
              id="table-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar actividad, comunidad, usuario..."
              className="h-11 w-full rounded-lg border border-input bg-background pr-3 pl-9 text-base placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20 sm:h-9 sm:w-56 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="activity-type-filter" className="sr-only">
              Filtrar por tipo de actividad
            </label>
            <select
              id="activity-type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ActivityType | 'Todos')}
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20 sm:h-9"
            >
              <option value="Todos">Todos los tipos</option>
              {ACTIVITY_TYPES.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
          </div>

          <div
            role="group"
            aria-label="Filtrar por estatus"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:gap-1 sm:rounded-lg sm:bg-secondary sm:p-1"
          >
            {(['Todos', ...STATUSES] as const).map((statusOption) => (
              <button
                key={statusOption}
                type="button"
                aria-pressed={statusFilter === statusOption}
                onClick={() => setStatusFilter(statusOption)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors sm:rounded-md sm:border-0 sm:px-3 sm:py-1.5 sm:text-xs',
                  statusFilter === statusOption
                    ? 'border-primary bg-primary text-primary-foreground sm:bg-card sm:text-foreground sm:shadow-sm'
                    : 'border-border bg-background text-muted-foreground hover:text-foreground sm:bg-transparent',
                )}
              >
                {statusOption}
                <span
                  className={cn(
                    'rounded-full px-1.5 text-xs tabular-nums sm:hidden',
                    statusFilter === statusOption ? 'bg-primary-foreground/20' : 'bg-secondary',
                  )}
                >
                  {countForStatus(statusOption)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className="flex flex-col divide-y divide-border md:hidden" aria-label="Actividades registradas">
        {visibleRows.map((item) => (
          <li key={item.id} className="flex flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm leading-snug font-semibold text-foreground text-pretty">
                {item.name}
              </p>
              <StatusBadge status={item.status} />
            </div>
            <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
              <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
                <dt className="sr-only">Fecha</dt>
                <dd className="truncate tabular-nums">{formatDate(item.date)}</dd>
              </div>
              <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
                <Users className="size-3.5 shrink-0" aria-hidden="true" />
                <dt className="sr-only">Asistentes</dt>
                <dd className="truncate tabular-nums">{item.attendees} asistentes</dd>
              </div>
              <div className="col-span-2 flex min-w-0 items-center gap-1.5 text-foreground">
                <Layers className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                <dt className="sr-only">Tipo de actividad</dt>
                <dd className="truncate">{item.activityType}</dd>
              </div>
              <div className="col-span-2 flex min-w-0 items-center gap-1.5 text-foreground">
                <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                <dt className="sr-only">Comunidad</dt>
                <dd className="truncate">{item.community}</dd>
              </div>
              <div className="col-span-2 flex min-w-0 items-center gap-1.5 text-foreground">
                <UserRound className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                <dt className="sr-only">Usuario</dt>
                <dd className="truncate">{item.user}</dd>
              </div>
            </dl>
          </li>
        ))}
        {visibleRows.length === 0 && (
          <li className="px-4 py-10 text-center text-sm text-muted-foreground">
            No se encontraron actividades con los filtros seleccionados.
          </li>
        )}
      </ul>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60 text-xs tracking-wide text-muted-foreground uppercase">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Fecha</th>
              <th scope="col" className="px-6 py-3 font-medium">Actividad</th>
              <th scope="col" className="px-6 py-3 font-medium">Tipo de actividad</th>
              <th scope="col" className="px-6 py-3 font-medium">Comunidad</th>
              <th scope="col" className="px-6 py-3 font-medium">Usuario</th>
              <th scope="col" className="px-6 py-3 font-medium">Estatus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visibleRows.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-secondary/40">
                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground tabular-nums">
                  {formatDate(item.date)}
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.attendees} asistentes</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground">{item.activityType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground">{item.community}</td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground">{item.user}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
            {visibleRows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-muted-foreground">
                  No se encontraron actividades con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}