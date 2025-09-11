# Docker提出手順書

## 概要

習志野市オープンデータ活用プロジェクトをDockerコンテナとして提出するための手順書です。

## 前提条件

- Docker Desktop がインストールされていること
- Docker Compose が利用可能であること
- プロジェクトファイルが準備されていること

## 提出ファイル構成

```
sodatunara/
├── Dockerfile                 # Dockerイメージ定義
├── docker-compose.yml         # Docker Compose設定
├── .dockerignore             # Docker除外ファイル
├── package.json              # Node.js依存関係
├── next.config.mjs           # Next.js設定
├── tsconfig.json             # TypeScript設定
├── tailwind.config.js        # Tailwind CSS設定
├── postcss.config.mjs        # PostCSS設定
├── app/                      # Next.jsアプリケーション
├── components/               # Reactコンポーネント
├── lib/                      # ライブラリ・ユーティリティ
├── open-data/                # オープンデータ
├── public/                   # 静的ファイル
├── styles/                   # スタイルファイル
├── contexts/                 # Reactコンテキスト
├── data/                     # データファイル
├── SUBMISSION_GUIDE.md       # 提出手順書
├── IMPLEMENTATION_DETAILS.md # 実装詳細
├── DEMO_INSTRUCTIONS.md      # デモ手順書
├── FUNCTION_LIST.md          # 必要機能一覧表
└── README.md                 # プロジェクト概要
```

## Docker設定ファイル

### 1. Dockerfile

```dockerfile
# Node.js 18の公式イメージを使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci --only=production

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# ポート3000を公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]
```

### 2. docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./open-data:/app/open-data:ro
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 3. .dockerignore

```
node_modules
npm-debug.log
.next
.git
.gitignore
README.md
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.vercel
.DS_Store
*.log
```

## 提出手順

### ステップ1: プロジェクトの準備

```bash
# プロジェクトディレクトリに移動
cd /Users/sora/develop/sodatunara

# 必要なファイルが存在することを確認
ls -la Dockerfile docker-compose.yml
```

### ステップ2: Dockerイメージのビルド

```bash
# Dockerイメージをビルド
docker build -t sodatunara-app .

# ビルドが成功したことを確認
docker images | grep sodatunara-app
```

### ステップ3: Docker Composeでの起動

```bash
# Docker Composeでアプリケーションを起動
docker-compose up -d

# 起動状況を確認
docker-compose ps
```

### ステップ4: 動作確認

```bash
# アプリケーションが起動していることを確認
curl http://localhost:3000

# ログを確認
docker-compose logs web
```

### ステップ5: 停止とクリーンアップ

```bash
# アプリケーションを停止
docker-compose down

# イメージを削除（必要に応じて）
docker rmi sodatunara-app
```

## 提出用ファイルの準備

### 1. アーカイブの作成

```bash
# プロジェクト全体をアーカイブ
tar -czf sodatunara-submission.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude=*.log \
  .

# アーカイブの内容を確認
tar -tzf sodatunara-submission.tar.gz | head -20
```

### 2. 提出ファイル一覧

```
sodatunara-submission.tar.gz
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.mjs
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── discover/
│       └── page.tsx
├── components/
│   ├── shop-map.tsx
│   └── recommended-shops.tsx
├── lib/
│   └── open-data.ts
├── open-data/
│   ├── processed/
│   │   └── cultural_facilities.json
│   └── README.md
├── public/
├── styles/
├── contexts/
├── data/
├── SUBMISSION_GUIDE.md
├── IMPLEMENTATION_DETAILS.md
├── DEMO_INSTRUCTIONS.md
├── FUNCTION_LIST.md
└── README.md
```

## 評価者向け実行手順

### 1. アーカイブの展開

```bash
# アーカイブを展開
tar -xzf sodatunara-submission.tar.gz
cd sodatunara
```

### 2. Dockerでの起動

```bash
# Docker Composeで起動
docker-compose up -d

# 起動確認
docker-compose ps
```

### 3. アプリケーションの確認

```bash
# ブラウザで http://localhost:3000 にアクセス
# または curl で確認
curl http://localhost:3000
```

### 4. 機能の確認

1. ホームページで「習志野市を発見」ボタンをクリック
2. おすすめタブで店舗カードが表示されることを確認
3. マップタブで地図が表示されることを確認
4. 検索・フィルタ機能の動作確認

## トラブルシューティング

### よくある問題と解決方法

#### 1. ビルドエラー

```bash
# キャッシュをクリアして再ビルド
docker build --no-cache -t sodatunara-app .
```

#### 2. ポート競合

```bash
# 別のポートを使用
docker-compose up -d --scale web=1 -p 3001:3000
```

#### 3. メモリ不足

```bash
# Docker Desktopのメモリ設定を増やす
# または、軽量なイメージを使用
```

#### 4. ファイル権限エラー

```bash
# ファイル権限を修正
chmod -R 755 .
```

## パフォーマンス最適化

### 1. マルチステージビルド

```dockerfile
# ビルドステージ
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 本番ステージ
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

### 2. イメージサイズの最適化

```dockerfile
# Alpine Linuxを使用
FROM node:18-alpine

# 不要なファイルを削除
RUN rm -rf /var/cache/apk/*

# マルチステージビルドで不要な依存関係を除外
```

## セキュリティ考慮事項

### 1. 非rootユーザーでの実行

```dockerfile
# 非rootユーザーを作成
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# ユーザーを切り替え
USER nextjs
```

### 2. 環境変数の管理

```yaml
# docker-compose.yml
environment:
  - NODE_ENV=production
  - NEXT_PUBLIC_API_URL=${API_URL}
```

## 監視とログ

### 1. ヘルスチェック

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### 2. ログ管理

```bash
# ログの確認
docker-compose logs -f web

# ログの保存
docker-compose logs web > app.log
```

## まとめ

この手順書に従って、習志野市オープンデータ活用プロジェクトをDockerコンテナとして提出できます。評価者は提供された手順で簡単にアプリケーションを起動し、機能を確認できます。
