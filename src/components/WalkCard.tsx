'use client'

import { useState } from 'react'
import { Walk } from '@/types/walk'
import { formatDate, formatTime } from '@/lib/utils'
import { walkApi } from '@/lib/api'

interface WalkCardProps {
  walk: Walk
  onWalkDeleted: () => void
}

export default function WalkCard({ walk, onWalkDeleted }: WalkCardProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!confirm('この散歩記録を削除しますか？')) return

    setDeletingId(walk.id)
    try {
      const result = await walkApi.deleteWalk(walk.id)
      
      if (result.success) {
        onWalkDeleted()
      } else {
        alert(result.error || '削除に失敗しました')
      }
    } catch (error) {
      console.error('削除エラー:', error)
      alert('削除に失敗しました')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {formatDate(walk.date)}
            </h3>
            <span className="text-sm text-gray-500">
              {formatTime(walk.time)}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {walk.distance}km
            </span>
          </div>
          {walk.note && (
            <p className="text-gray-600 text-sm mt-2">{walk.note}</p>
          )}
        </div>
        <button
          onClick={handleDelete}
          disabled={deletingId === walk.id}
          className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deletingId === walk.id ? '削除中...' : '削除'}
        </button>
      </div>
    </div>
  )
}


