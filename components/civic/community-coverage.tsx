import { MapPin, Users, CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { COMMUNITIES, type Activity } from '@/lib/civic-data'

type CommunityCoverageProps = {
  activities: Activity[]
}

export function CommunityCoverage({ activities }: CommunityCoverageProps) {
  const totals = COMMUNITIES.map((community) => {
    const items = activities.filter((a) => a.community === community)
    return {
      community,
      count: items.length,
      attendees: items.reduce((sum, a) => sum + a.attendees, 0),
    }
  }).sort((a, b) => b.attendees - a.attendees)

  const max = Math.max(1, ...totals.map((t) => t.attendees))
  const totalAttendees = totals.reduce((sum, t) => sum + t.attendees, 0)
  const reached = totals.filter((t) => t.count > 0).length

  return (
    <section
      id="comunidad"
      aria-labelledby="community-heading"
      className="scroll-mt-24 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MapPin className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="community-heading" className="text-base font-semibold text-foreground sm:text-lg">
              Alcance por comunidad
            </h2>
            <p className="text-xs text-muted-foreground">Municipio Juan José Mora</p>
          </div>
        </div>
      </div>

      <dl className="mb-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-secondary/60 p-3">
          <dt className="text-xs text-muted-foreground">Beneficiarios</dt>
          <dd className="text-xl font-semibold text-foreground tabular-nums">{totalAttendees}</dd>
        </div>
        <div className="rounded-lg bg-secondary/60 p-3">
          <dt className="text-xs text-muted-foreground">Comunidades activas</dt>
          <dd className="text-xl font-semibold text-foreground tabular-nums">
            {reached}
            <span className="text-sm font-normal text-muted-foreground">/{totals.length}</span>
          </dd>
        </div>
      </dl>

      <ol className="flex flex-col gap-2">
        {totals.map(({ community, count, attendees }, index) => {
          const percent = Math.round((attendees / max) * 100)
          const isTop = index === 0 && count > 0
          return (
            <li
              key={community}
              className={cn(
                'rounded-lg border p-3',
                isTop ? 'border-primary/30 bg-primary/5' : 'border-border',
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums',
                    isTop ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground',
                  )}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{community}</p>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground tabular-nums">
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3" aria-hidden="true" />
                      {attendees}
                      <span className="sr-only">beneficiarios</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarCheck className="size-3" aria-hidden="true" />
                      {count} {count === 1 ? 'actividad' : 'actividades'}
                    </span>
                  </div>
                </div>
                <span className="shrink-0 text-sm font-semibold text-foreground tabular-nums">{percent}%</span>
              </div>
              <div
                className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Alcance relativo de ${community}`}
              >
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
