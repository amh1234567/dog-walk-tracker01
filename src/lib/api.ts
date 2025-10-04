import { supabase } from './supabaseClient'
import { Walk, WalkFormData, WalkStats } from '@/types/walk'
import { isSupabaseConfigured, getTodayString, calculateTotalDistance, getTodaysWalks, sortWalksByDate } from './utils'

export const walkApi = {
  // すべての散歩記録を取得
  async getAllWalks(): Promise<Walk[]> {
    if (!isSupabaseConfigured()) {
      return []
    }

    try {
      const { data, error } = await supabase
        .from('walks')
        .select('*')
        .order('date', { ascending: false })
        .order('time', { ascending: false })

      if (error) {
        console.error('データ取得エラー:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('データ取得エラー:', error)
      return []
    }
  },

  // 今日の散歩記録を取得
  async getTodaysWalks(): Promise<Walk[]> {
    if (!isSupabaseConfigured()) {
      return []
    }

    const today = getTodayString()
    
    try {
      const { data, error } = await supabase
        .from('walks')
        .select('*')
        .eq('date', today)
        .order('time', { ascending: false })

      if (error) {
        console.error('データ取得エラー:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('データ取得エラー:', error)
      return []
    }
  },

  // 統計情報を取得
  async getWalkStats(): Promise<WalkStats> {
    if (!isSupabaseConfigured()) {
      return {
        todaysWalks: 0,
        totalWalks: 0,
        totalDistance: 0,
      }
    }

    try {
      const [todaysWalks, allWalks] = await Promise.all([
        this.getTodaysWalks(),
        this.getAllWalks(),
      ])

      return {
        todaysWalks: todaysWalks.length,
        totalWalks: allWalks.length,
        totalDistance: calculateTotalDistance(allWalks),
      }
    } catch (error) {
      console.error('統計取得エラー:', error)
      return {
        todaysWalks: 0,
        totalWalks: 0,
        totalDistance: 0,
      }
    }
  },

  // 新しい散歩記録を追加
  async addWalk(formData: WalkFormData): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabaseの設定が完了していません' }
    }

    try {
      const { error } = await supabase
        .from('walks')
        .insert([
          {
            date: formData.date,
            time: formData.time,
            distance: parseFloat(formData.distance),
            note: formData.note || null,
          },
        ])

      if (error) {
        console.error('保存エラー:', error)
        return { success: false, error: '保存に失敗しました' }
      }

      return { success: true }
    } catch (error) {
      console.error('保存エラー:', error)
      return { success: false, error: '保存に失敗しました' }
    }
  },

  // 散歩記録を削除
  async deleteWalk(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabaseの設定が完了していません' }
    }

    try {
      const { error } = await supabase
        .from('walks')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('削除エラー:', error)
        return { success: false, error: '削除に失敗しました' }
      }

      return { success: true }
    } catch (error) {
      console.error('削除エラー:', error)
      return { success: false, error: '削除に失敗しました' }
    }
  },
}

