# そだつなら (Sodatsunara) Platform

習志野市内の中小企業・個人商店の売上向上を支援する地域経済循環型ビジネス支援プラットフォーム

## 概要

「そだつなら」は、習志野市内の事業者と市民をつなぐプラットフォームです。

### 主な機能

- **市民向け機能**: 求人検索、企業情報閲覧、メッセージング
- **企業向け機能**: ダッシュボード、求人掲載、地域データ分析、マーケティング支援

## セットアップ

### 1. 環境変数の設定

`.env.example` を `.env.local` にコピーし、Firebase の設定値を入力してください。

\`\`\`bash
cp .env.example .env.local
\`\`\`

### 2. 開発環境での実行

\`\`\`bash
npm install
npm run dev
\`\`\`

### 3. Docker での実行

\`\`\`bash
# ビルド
docker-compose build

# 実行
docker-compose up -d
\`\`\`

## Firebase セットアップ

1. Firebase Console でプロジェクトを作成
2. Authentication, Firestore Database, Storage を有効化
3. Web アプリを追加し、設定値を `.env.local` に設定

## デプロイ

Docker を使用してデプロイできます。`docker-compose.yml` を使用して本番環境にデプロイしてください。
