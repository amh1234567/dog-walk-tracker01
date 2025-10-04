import { WalkStats } from '@/types/walk'
import { isSupabaseConfigured } from '@/lib/utils'

interface MainVisualProps {
  stats: WalkStats
}

export default function MainVisual({ stats }: MainVisualProps) {
  return (
    <div className="space-y-8">
      {/* Supabase設定未完了の通知 */}
      {!isSupabaseConfigured() && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Supabaseの設定が必要です
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  データの保存・取得を行うには、Supabaseの設定を完了してください。
                </p>
                <p className="mt-1">
                  <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">
                    .env.local
                  </code>
                  ファイルにSupabaseのURLとAPIキーを設定してください。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ヘッダーセクション */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          おかえりなさい！🐕
        </h1>
        <p className="text-lg text-gray-600">
          今日も愛犬との散歩を楽しみましょう
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg">📅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">今日の散歩回数</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.todaysWalks}回
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-lg">📊</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">総散歩回数</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalWalks}回
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-lg">🏃</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">総距離</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalDistance.toFixed(1)}km
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

