import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// 環境変数が設定されていない場合はダミークライアントを作成
let supabase: any
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} catch (error) {
  // フォールバック用のダミークライアント
  supabase = {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: { message: 'Supabase not configured' } }),
      delete: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    })
  }
}

export { supabase }
