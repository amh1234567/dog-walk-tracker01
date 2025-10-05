import Link from 'next/link'
import { Walk } from '@/types/walk'
import { formatTime } from '@/lib/utils'
import { ROUTES } from '@/constants'

interface Content2Props {
  todaysWalks: Walk[]
}

export default function Content2({ todaysWalks }: Content2Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          今日の散歩記録
        </h2>
      </div>
      <div className="p-6">
        {todaysWalks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-2">🚶‍♂️</div>
            <p className="text-gray-500">今日はまだ散歩記録がありません</p>
            <p className="text-sm text-gray-400 mt-1">
              最初の散歩記録を追加してみましょう！
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysWalks.map((walk) => (
              <div
                key={walk.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">
                    {formatTime(walk.time)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {walk.distance}km
                  </span>
                  {walk.note && (
                    <span className="text-sm text-gray-500">
                      {walk.note}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


