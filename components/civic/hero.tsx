import Link from "next/link"
import { ArrowRight, BarChart3, CheckCircle2, FileSpreadsheet, ShieldCheck } from "lucide-react"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-16 text-white sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Columna izquierda: Texto principal y botones */}
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-300">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Gestión operativa de participación ciudadana
            </div>

            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:leading-[1.12]">
              Convierte los reportes dispersos de tus voluntarios en métricas claras y trazables.
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
              CivicPulse unifica la información de campo de cada iniciativa comunitaria en un solo
              panel: registra actividades, mide el alcance real y da seguimiento a cada compromiso
              sin hojas de cálculo sueltas.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#registrar"
                className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
              >
                Registrar Nueva Actividad
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#indicadores"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Ver indicadores
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-slate-300 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-sky-400" />
                Reportes de campo centralizados
              </span>
              <span className="inline-flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-sky-400" />
                Métricas en tiempo real
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sky-400" />
                Trazabilidad completa
              </span>
            </div>
          </div>

          {/* Columna derecha: Fotografía de jornada comunitaria */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/60 shadow-2xl shadow-slate-950/60">
                <img
                  src="/hero-comunidad.jpg"
                  alt="Jornada comunitaria con niños y voluntarios bajo toldos azules"
                  className="h-80 w-full object-cover object-center sm:h-96 lg:h-[430px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/15 bg-slate-900/90 px-4 py-3 shadow-lg backdrop-blur-md sm:absolute sm:-bottom-5 sm:left-4 sm:right-4 sm:mt-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-white sm:text-sm">
                    Registro y seguimiento en campo
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    Actividades y alcance consolidados en un solo lugar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
