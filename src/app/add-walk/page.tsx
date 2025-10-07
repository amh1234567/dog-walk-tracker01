import WalkForm from '@/components/WalkForm'

export default function AddWalkPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">新しい散歩記録</h1>
        <p className="text-gray-600 mt-1">
          愛犬との散歩の詳細を記録しましょう
        </p>
      </div>

      <WalkForm />  {/* ← ここでWalkFormコンポーネントを呼び出している */}
    </div>
  )
}








