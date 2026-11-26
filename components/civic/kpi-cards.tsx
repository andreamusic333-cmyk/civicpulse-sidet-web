import { CheckCircle2, MapPinned, Users, CalendarCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Kpi = {
  label: string
  value: string
  detail: string
  icon: LucideIcon
  progress?: number
}

type KpiCardsProps = {
  beneficiaries: number
  activitiesCount: number
  coveredCommunities: number
  coverageTarget: number
  completionRate: number
}

export function KpiCards({
  beneficiaries,
  activitiesCount,
  coveredCommunities,
  coverageTarget,
  completionRate,
}: KpiCardsProps) {
  const coverage = Math.round((coveredCommunities / coverageTarget) * 100)

  const kpis: Kpi[] = [
    {
      label: 'Beneficiarios alcanzados',
      value: beneficiaries.toLocaleString('es'),
      detail: 'Suma de asistentes registrados',
      icon: Users,
    },
    {
      label: 'Actividades registradas',
      value: activitiesCount.toString(),
      detail: 'Intervenciones en el periodo',
      icon: CalendarCheck,
    },
    {
      label: 'Cobertura de actividades',
      value: `${coverage}%`,
      detail: `${coveredCommunities} de ${coverageTarget} comunidades`,
      icon: MapPinned,
      progress: coverage,
    },
    {
      label: 'Tasa de finalización',
      value: `${completionRate}%`,
      detail: 'Actividades con estatus finalizado',
      icon: CheckCircle2,
      progress: completionRate,
    },
  ]

  return (
    <section id="indicadores" aria-labelledby="kpi-heading" className="scroll-mt-24">
      <h2 id="kpi-heading" className="sr-only">
        Indicadores clave
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ label, value, detail, icon: Icon, progress }) => (
          <li key={label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground tabular-nums" aria-live="polite">
              {value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
            {progress !== undefined && (
              <div
                className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={label}
              >
                <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
