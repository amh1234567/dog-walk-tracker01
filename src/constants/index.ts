export const APP_CONFIG = {
  name: 'Dog Walk Tracker',
  description: '犬の散歩記録を管理するアプリケーション',
  version: '1.0.0',
} as const

export const ROUTES = {
  HOME: '/',
  WALKS: '/walks',
  ADD_WALK: '/add-walk',
} as const

export const SUPABASE_CONFIG = {
  TABLE_NAME: 'walk02',
} as const


