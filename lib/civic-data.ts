export type ActivityStatus = 'En curso' | 'Finalizado' | 'En revisión'

export type ActivityType =
  | 'Asamblea comunitaria'
  | 'Taller formativo'
  | 'Jornada de salud y apoyo'
  | 'Mesa de diálogo'
  | 'Jornada ambiental'

export type SessionUser = {
  username: string
  role: string
}

export type Activity = {
  id: string
  date: string
  name: string
  community: string
  activityType: ActivityType
  attendees: number
  user: string
  status: ActivityStatus
}

export type Commitment = {
  id: string
  title: string
  community: string
  dueDate: string
  owner: string
}

export const COMMUNITIES = [
  'Morón Centro',
  'Palma Sola',
  'Alpargatón',
  'Urama',
  'San Pablo',
  'Sanchón',
  'El Guarataro',
  'Canoabito',
] as const

export const ACTIVITY_TYPES: ActivityType[] = [
  'Asamblea comunitaria',
  'Taller formativo',
  'Jornada de salud y apoyo',
  'Mesa de diálogo',
  'Jornada ambiental',
]

export const COVERAGE_TARGET = COMMUNITIES.length

export const STATUSES: ActivityStatus[] = ['En curso', 'Finalizado', 'En revisión']

export const initialActivities: Activity[] = [
  {
    id: 'act-008',
    date: '2026-02-09',
    name: 'Asamblea vecinal de presupuesto participativo',
    community: 'Morón Centro',
    activityType: 'Asamblea comunitaria',
    attendees: 86,
    user: 'Lucía Méndez',
    status: 'En revisión',
  },
  {
    id: 'act-007',
    date: '2026-02-06',
    name: 'Taller de huertos urbanos',
    community: 'Alpargatón',
    activityType: 'Taller formativo',
    attendees: 34,
    user: 'Andrés Rivas',
    status: 'En curso',
  },
  {
    id: 'act-006',
    date: '2026-02-03',
    name: 'Jornada de salud preventiva',
    community: 'Palma Sola',
    activityType: 'Jornada de salud y apoyo',
    attendees: 142,
    user: 'Paola Ortiz',
    status: 'Finalizado',
  },
  {
    id: 'act-005',
    date: '2026-01-29',
    name: 'Mesa de diálogo juvenil',
    community: 'Urama',
    activityType: 'Mesa de diálogo',
    attendees: 41,
    user: 'Mateo Salazar',
    status: 'Finalizado',
  },
  {
    id: 'act-004',
    date: '2026-01-24',
    name: 'Limpieza comunitaria del río Morón',
    community: 'San Pablo',
    activityType: 'Jornada ambiental',
    attendees: 67,
    user: 'Carla Jiménez',
    status: 'En revisión',
  },
  {
    id: 'act-003',
    date: '2026-01-18',
    name: 'Capacitación en emprendimiento',
    community: 'Morón Centro',
    activityType: 'Taller formativo',
    attendees: 28,
    user: 'Andrés Rivas',
    status: 'Finalizado',
  },
]

export const commitments: Commitment[] = [
  {
    id: 'com-1',
    title: 'Entrega de informe trimestral a la Alcaldía de Juan José Mora',
    community: 'Todas',
    dueDate: '2026-02-13',
    owner: 'Coordinación general',
  },
  {
    id: 'com-2',
    title: 'Seguimiento a acuerdos de asamblea',
    community: 'Morón Centro',
    dueDate: '2026-02-16',
    owner: 'Lucía Méndez',
  },
]