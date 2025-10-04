import Link from 'next/link'
import { walkApi } from '@/lib/api'
import { WalkStats } from '@/types/walk'
import MainVisual from '@/components/MainVisual'
import Content2 from '@/components/Content2'
import { ROUTES } from '@/constants'

export default async function HomePage() {
  const [stats, todaysWalks] = await Promise.all([
    walkApi.getWalkStats(),
    walkApi.getTodaysWalks(),
  ])

  return (
    <div className="space-y-8">
      <MainVisual stats={stats} />
      <Content2 todaysWalks={todaysWalks} />

      {/* アクションボタン */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={ROUTES.ADD_WALK}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <span className="mr-2">➕</span>
          新しい散歩記録を追加
        </Link>
        <Link
          href={ROUTES.WALKS}
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <span className="mr-2">📋</span>
          すべての散歩記録を見る
        </Link>
      </div>
    </div>
  )
}
