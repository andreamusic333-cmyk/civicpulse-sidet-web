import { Dashboard } from '@/components/civic/dashboard'
import { Hero } from '@/components/civic/hero'
import { SiteHeader } from '@/components/civic/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Dashboard />
      </main>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
          © 2026 CivicPulse · Gestión operativa para el desarrollo comunitario
        </div>
      </footer>
    </>
  )
}
