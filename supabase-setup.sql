-- Dog Walk Tracker データベースセットアップ
-- SupabaseのSQLエディタで実行してください

-- walksテーブルの作成
CREATE TABLE walks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  distance DECIMAL(5,2) NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスの作成（パフォーマンス向上のため）
CREATE INDEX idx_walks_date ON walks(date DESC);
CREATE INDEX idx_walks_created_at ON walks(created_at DESC);

-- RLS (Row Level Security) の有効化
ALTER TABLE walks ENABLE ROW LEVEL SECURITY;

-- 全ユーザーが読み書きできるポリシーを作成
-- 注意: 本番環境では適切な認証とポリシーを設定してください
CREATE POLICY "Enable all operations for all users" ON walks
  FOR ALL USING (true);

-- テーブルのコメント
COMMENT ON TABLE walks IS '犬の散歩記録テーブル';
COMMENT ON COLUMN walks.date IS '散歩の日付';
COMMENT ON COLUMN walks.time IS '散歩の時間';
COMMENT ON COLUMN walks.distance IS '散歩の距離（km）';
COMMENT ON COLUMN walks.note IS '散歩のメモ（任意）';
COMMENT ON COLUMN walks.created_at IS 'レコード作成日時';

