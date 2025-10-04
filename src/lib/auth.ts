// 認証関連のユーティリティ関数
// 現在はSupabaseの匿名認証を使用しているため、基本的な関数のみ

export const isAuthenticated = (): boolean => {
  // 現在は匿名認証のため、常にtrueを返す
  // 将来的に認証機能を追加する場合は、ここで認証状態をチェック
  return true
}

export const getCurrentUser = () => {
  // 現在は匿名認証のため、nullを返す
  // 将来的に認証機能を追加する場合は、現在のユーザー情報を返す
  return null
}

