'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Walk } from '@/types/walk'
import { walkApi } from '@/lib/api'
import WalkCard from '@/components/WalkCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { ROUTES } from '@/constants'

export default function WalksPage() {
  const [walks, setWalks] = useState<Walk[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWalks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await walkApi.getAllWalks()
      setWalks(data)
    } catch (err) {
      console.error('データ取得エラー:', err)
      setError('データの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWalks()
  }, [])

  const handleWalkDeleted = () => {
    fetchWalks()
  }

  if (loading) {
    return <LoadingSpinner text="散歩記録を読み込み中..." />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          エラーが発生しました
        </h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <button
          onClick={fetchWalks}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          再試行
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">散歩記録</h1>
          <p className="text-gray-600 mt-1">
            これまでの散歩記録を確認できます
          </p>
        </div>
        <Link
          href={ROUTES.ADD_WALK}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <span className="mr-2">➕</span>
          新規記録
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              記録一覧 ({walks.length}件)
            </h2>
            <div className="text-sm text-gray-500">
              日付順（新しい順）
            </div>
          </div>
        </div>
        <div className="p-6">
          {walks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🐕</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                散歩記録がありません
              </h3>
              <p className="text-gray-500">
                最初の散歩記録を追加してみましょう！
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {walks.map((walk) => (
                <WalkCard
                  key={walk.id}
                  walk={walk}
                  onWalkDeleted={handleWalkDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}