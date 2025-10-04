import Link from 'next/link'
import { APP_CONFIG, ROUTES } from '@/constants'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={ROUTES.HOME} className="flex items-center space-x-2">
              <span className="text-2xl">🐕</span>
              <h1 className="text-xl font-bold text-gray-900">
                {APP_CONFIG.name}
              </h1>
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link
              href={ROUTES.HOME}
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              ホーム
            </Link>
            <Link
              href={ROUTES.ADD_WALK}
              className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              新規記録
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

