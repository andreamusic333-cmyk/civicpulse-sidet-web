'use client'

import { useState } from 'react'
import { LogOut, UserCircle2 } from 'lucide-react'
import { ActivityForm, type ActivityFormValues } from './activity-form'
import { AlertsPanel } from './alerts-panel'
import { CommunityCoverage } from './community-coverage'
import { KpiCards } from './kpi-cards'
import { LoginCard } from './login-card'
import { TraceabilityTable } from './traceability-table'
import {
  COVERAGE_TARGET,
  commitments,
  initialActivities,
  type Activity,
  type SessionUser,
} from '@/lib/civic-data'

// Calcula los indicadores del panel de forma segura evitando divisiones por cero o datos nulos
function computeDashboardMetrics(activities: Activity[]) {
  const safeList = Array.isArray(activities) ? activities : []
  const beneficiaries = safeList.reduce((sum, item) => sum + (Number(item.attendees) || 0), 0)
  const coveredCommunities = new Set(
    safeList.map((item) => item.community).filter((name) => Boolean(name)),
  ).size
  const finishedCount = safeList.filter((item) => item.status === 'Finalizado').length
  const completionRate =
    safeList.length > 0 ? Math.round((finishedCount / safeList.length) * 100) : 0
  const pendingReviews = safeList.filter((item) => item.status === 'En revisión')

  return {
    beneficiaries,
    coveredCommunities,
    completionRate,
    pendingReviews,
  }
}

export function Dashboard() {
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null)
  const [activities, setActivities] = useState<Activity[]>(initialActivities)

  if (!sessionUser) {
    return <LoginCard onLogin={(user) => setSessionUser(user)} />
  }

  const { beneficiaries, coveredCommunities, completionRate, pendingReviews } =
    computeDashboardMetrics(activities)

  function handleAddActivity(values: ActivityFormValues) {
    const todayIsoDate = new Date().toISOString().slice(0, 10)
    const newRecord: Activity = {
      ...values,
      user: sessionUser?.username.trim() || values.user,
      id: `act-${Date.now()}`,
      date: todayIsoDate,
      status: 'En revisión',
    }

    setActivities((previous) => [newRecord, ...previous])
  }

  function handleApproveActivity(activityId: string) {
    setActivities((previous) =>
      previous.map((item) => (item.id === activityId ? { ...item, status: 'Finalizado' } : item)),
    )
  }

  function handleLogout() {
    setSessionUser(null)
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Panel operativo</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Resumen en tiempo real de las iniciativas de participación ciudadana.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-xl border border-border bg-card px-3.5 py-2 shadow-xs sm:self-auto">
          <UserCircle2 className="size-4 text-primary" aria-hidden="true" />
          <div className="text-xs">
            <p className="font-semibold text-foreground">{sessionUser.username}</p>
            <p className="text-muted-foreground">{sessionUser.role}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <LogOut className="size-3.5" aria-hidden="true" />
            Salir
          </button>
        </div>
      </div>

      <KpiCards
        beneficiaries={beneficiaries}
        activitiesCount={activities.length}
        coveredCommunities={coveredCommunities}
        coverageTarget={COVERAGE_TARGET}
        completionRate={completionRate}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ActivityForm currentUser={sessionUser} onSubmit={handleAddActivity} />
          <CommunityCoverage activities={activities} />
        </div>
        <AlertsPanel
          commitments={commitments}
          pendingReviews={pendingReviews}
          onApprove={handleApproveActivity}
        />
      </div>

      <TraceabilityTable activities={activities} />
    </div>
  )
}