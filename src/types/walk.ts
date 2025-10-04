export interface Walk {
  id: string
  date: string
  time: string
  distance: number
  note: string | null
  created_at: string
}

export interface WalkFormData {
  date: string
  time: string
  distance: string
  note: string
}

export interface WalkStats {
  todaysWalks: number
  totalWalks: number
  totalDistance: number
}

