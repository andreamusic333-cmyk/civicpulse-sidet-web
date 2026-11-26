import { ArrowRight, BarChart3, ClipboardList, ShieldCheck } from 'lucide-react'

const HIGHLIGHTS = [
  { icon: ClipboardList, label: 'Reportes de campo centralizados' },
  { icon: BarChart3, label: 'Métricas en tiempo real' },
  { icon: ShieldCheck, label: 'Trazabilidad completa' },
]

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-[#0f2442] via-[#132f57] to-[#0b1b33] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(96,165,250,0.18),transparent_48%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pt-40 lg:pb-24">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/90 uppercase">
            <span className="size-1.5 rounded-full bg-sky-300" aria-hidden="true" />
            Gestión operativa de participación ciudadana
          </p>
          <h1 className="max-w-3xl text-pretty text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.65rem]">
            Convierte los reportes dispersos de tus voluntarios en métricas claras y trazables.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-blue-100/80 sm:text-lg">
            CivicPulse unifica la información de campo de cada iniciativa comunitaria en un solo panel: registra
            actividades, mide el alcance real y da seguimiento a cada compromiso sin hojas de cálculo sueltas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#registrar"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-sky-300 px-6 text-sm font-semibold text-[#0b1b33] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2442] sm:text-base"
            >
              Registrar Nueva Actividad
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#indicadores"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/25 bg-white/[0.04] px-6 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2442] sm:text-base"
            >
              Ver indicadores
            </a>
          </div>

          <ul className="mt-10 grid gap-4 border-t border-white/15 pt-5 sm:grid-cols-3 sm:gap-6">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm text-blue-100/80">
                <Icon className="size-4 shrink-0 text-sky-300" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
