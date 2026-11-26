import { AlarmClock, Bell, FileSearch } from 'lucide-react'
import type { Activity, Commitment } from '@/lib/civic-data'
import { formatDate } from '@/lib/format'

type AlertsPanelProps = {
  commitments: Commitment[]
  pendingReviews: Activity[]
  onApprove: (id: string) => void
}

export function AlertsPanel({ commitments, pendingReviews, onApprove }: AlertsPanelProps) {
  const total = commitments.length + pendingReviews.length

  return (
    <section
      id="alertas"
      aria-labelledby="alerts-heading"
      className="scroll-mt-24 flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Bell className="size-5 text-primary" aria-hidden="true" />
          <h2 id="alerts-heading" className="text-lg font-semibold text-foreground">
            Alertas y tareas
          </h2>
        </div>
        <span className="rounded-full bg-warning/15 px-2.5 py-0.5 text-xs font-semibold text-warning-foreground tabular-nums">
          {total} activas
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {commitments.map((c) => (
          <li key={c.id} className="rounded-lg border-l-4 border-warning bg-warning/10 p-4">
            <div className="flex items-start gap-3">
              <AlarmClock className="mt-0.5 size-4 shrink-0 text-warning-foreground" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-wide text-warning-foreground uppercase">
                  Vence el {formatDate(c.dueDate)}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">{c.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {c.owner} · {c.community}
                </p>
              </div>
            </div>
          </li>
        ))}

        {pendingReviews.map((a) => (
          <li key={a.id} className="rounded-lg border-l-4 border-info bg-info/10 p-4">
            <div className="flex items-start gap-3">
              <FileSearch className="mt-0.5 size-4 shrink-0 text-info" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-wide text-info uppercase">Reporte pendiente de revisión</p>
                <p className="mt-1 text-sm font-medium text-foreground">{a.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {a.community} · {a.attendees} asistentes
                </p>
                <button
                  type="button"
                  onClick={() => onApprove(a.id)}
                  className="mt-3 inline-flex h-8 items-center rounded-md border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Aprobar reporte
                </button>
              </div>
            </div>
          </li>
        ))}

        {total === 0 && (
          <li className="rounded-lg bg-secondary p-4 text-center text-sm text-muted-foreground">
            No hay alertas pendientes.
          </li>
        )}
      </ul>
    </section>
  )
}
