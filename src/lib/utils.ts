import { Walk } from '@/types/walk'

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatTime = (timeString: string): string => {
  return timeString.slice(0, 5) // HH:MM形式で表示
}

export const formatDistance = (distance: number): string => {
  return `${distance.toFixed(1)}km`
}

export const isSupabaseConfigured = (): boolean => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key'
  )
}

export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0]
}

export const getCurrentTimeString = (): string => {
  return new Date().toTimeString().slice(0, 5)
}

export const calculateTotalDistance = (walks: Walk[]): number => {
  return walks.reduce((sum, walk) => sum + walk.distance, 0)
}

export const getTodaysWalks = (walks: Walk[]): Walk[] => {
  const today = getTodayString()
  return walks.filter(walk => walk.date === today)
}

export const sortWalksByDate = (walks: Walk[]): Walk[] => {
  return [...walks].sort((a, b) => {
    const dateA = new Date(a.date + 'T' + a.time)
    const dateB = new Date(b.date + 'T' + b.time)
    return dateB.getTime() - dateA.getTime()
  })
}


