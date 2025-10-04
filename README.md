# Dog Walk Tracker

犬の散歩記録を管理するNext.jsアプリケーションです。

## 機能

- 📅 散歩記録の追加（日付、時間、距離、メモ）
- 📋 散歩記録の一覧表示
- 🗑️ 散歩記録の削除
- 📊 統計情報の表示（今日の散歩回数、総散歩回数、総距離）

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **バックエンド**: Supabase
- **データベース**: PostgreSQL (Supabase)

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseプロジェクトの設定

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. プロジェクトのURLとAPIキーを取得
3. `.env.local`ファイルを作成し、以下の内容を追加：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. データベーステーブルの作成

SupabaseのSQLエディタで以下のSQLを実行：

```sql
-- walksテーブルの作成
CREATE TABLE walks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  distance DECIMAL(5,2) NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) の有効化
ALTER TABLE walks ENABLE ROW LEVEL SECURITY;

-- 全ユーザーが読み書きできるポリシーを作成
CREATE POLICY "Enable all operations for all users" ON walks
  FOR ALL USING (true);
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## プロジェクト構造

```
project-root/
├─ public/
│   ├─ favicon.ico
│   ├─ images/
│   │  ├─ dogwalk-logo.png        # アプリ用ロゴ（任意）
│   │  └─ ogp.png
│   ├─ fonts/
│   ├─ icons/
│   └─ robots.txt
│
├─ src/
│   ├─ app/
│   │  ├─ layout.tsx              # 共通レイアウト
│   │  ├─ page.tsx                # トップページ（記録一覧）
│   │  └─ add-walk/
│   │      └─ page.tsx            # 散歩追加ページ
│   │
│   ├─ components/
│   │  ├─ WalkCard.tsx            # 記録カード
│   │  ├─ WalkForm.tsx            # 記録フォーム
│   │  ├─ Header.tsx
│   │  ├─ MainVisual.tsx
│   │  ├─ Content2.tsx
│   │  ├─ AnimatedImage.tsx
│   │  ├─ LoadingSpinner.tsx
│   │  ├─ ui/
│   │  └─ common/
│   │
│   ├─ lib/
│   │  ├─ supabaseClient.ts       # Supabase接続
│   │  ├─ api.ts                  # 散歩データ取得/追加API
│   │  ├─ utils.ts
│   │  └─ auth.ts
│   │
│   ├─ hooks/
│   │  └─ useScrollPosition.ts
│   │
│   ├─ styles/
│   │  ├─ globals.css
│   │  └─ variables.css
│   │
│   ├─ constants/
│   │  └─ index.ts
│   │
│   └─ types/
│       └─ walk.ts
│
├─ .env.local                     # Supabase接続キー
├─ .gitignore
├─ eslint.config.mjs
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.mjs
├─ README.md
└─ tsconfig.json
```

## 使用方法

1. **ホームページ**: 今日の散歩回数や統計情報を確認
2. **新規記録**: 「新規記録」ボタンから散歩の詳細を入力
3. **記録一覧**: 過去の散歩記録を確認・削除

## ライセンス

MIT License
