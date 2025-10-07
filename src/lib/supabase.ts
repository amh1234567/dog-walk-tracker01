import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 型定義のエクスポート
export type Database = {
  public: {
    Tables: {
      walk02: {
        Row: {
          id: string
          date: string
          time: string
          distance: number
          note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          time: string
          distance: number
          note?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          time?: string
          distance?: number
          note?: string | null
          created_at?: string
        }
      }
    }
  }
}
