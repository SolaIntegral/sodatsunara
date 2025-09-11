# そだつなら - デプロイメントガイド

## 概要
習志野市の地域ビジネス支援プラットフォーム「そだつなら」のデプロイメント手順です。

## 前提条件
- Docker がインストールされていること
- Docker Compose が利用可能であること

## クイックスタート

### 1. Docker Hubからイメージを取得
```bash
docker pull soraintegral/sodatunara-app:latest
```

### 2. Docker Composeで起動
```bash
docker-compose up -d
```

### 3. アクセス確認
ブラウザで `http://localhost:3000` にアクセス

## 環境変数の設定

### 本番環境用の環境変数
以下の環境変数を設定してください：

```bash
# Firebase設定（本番環境）
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 環境変数ファイルの作成
```bash
# .env.local ファイルを作成
cat > .env.local << EOF
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
EOF
```

## 本番環境でのデプロイ

### 1. サーバーでの準備
```bash
# リポジトリのクローン
git clone https://github.com/SolaIntegral/sodatsunara.git
cd sodatsunara

# 環境変数の設定
cp .env.example .env.local
# .env.local を編集してFirebase設定を追加
```

### 2. Docker Composeで起動
```bash
# バックグラウンドで起動
docker-compose up -d

# ログの確認
docker-compose logs -f

# ステータス確認
docker-compose ps
```

### 3. 停止・再起動
```bash
# 停止
docker-compose down

# 再起動
docker-compose up -d

# イメージの更新
docker-compose pull
docker-compose up -d
```

## トラブルシューティング

### ポートが使用中の場合
```bash
# 使用中のポートを確認
lsof -i :3000

# プロセスを停止
kill -9 [PID]
```

### ログの確認
```bash
# コンテナのログを確認
docker-compose logs sodatsunara-app

# リアルタイムでログを確認
docker-compose logs -f sodatsunara-app
```

### コンテナの再ビルド
```bash
# イメージを再ビルド
docker-compose build --no-cache

# 起動
docker-compose up -d
```

## セキュリティ

### 本番環境での注意事項
1. 環境変数ファイル（`.env.local`）は適切に保護してください
2. Firebase設定は本番環境用のものを使用してください
3. 定期的にイメージを更新してください

### ファイアウォール設定
```bash
# ポート3000を開放（必要に応じて）
sudo ufw allow 3000
```

## 監視・メンテナンス

### ヘルスチェック
```bash
# アプリケーションの状態確認
curl -f http://localhost:3000 || exit 1
```

### ログローテーション
```bash
# Docker Composeでログサイズを制限
# docker-compose.yml に以下を追加：
# logging:
#   driver: "json-file"
#   options:
#     max-size: "10m"
#     max-file: "3"
```

## サポート

問題が発生した場合は、以下の情報とともにサポートに連絡してください：
- Docker のバージョン
- エラーログ
- 環境変数の設定状況
- 実行したコマンド
