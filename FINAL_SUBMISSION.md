# 最終提出確認書

## 2025年度 ちばオープンデータハッカソン 提出物

**チーム**: Team G  
**プロジェクト名**: 習志野市オープンデータ活用プロジェクト  
**提出日**: 2025年9月10日  

---

## 1. 開発したアプリに関する情報

### アプリケーション概要
習志野市のオープンデータを活用した地域発見アプリケーション「そだつなら」を開発しました。市民が市内のお店や文化施設を発見し、地域経済の活性化に貢献することを目的としています。

### 主要機能
- **お店マップ**: インタラクティブな地図で市内の店舗を表示
- **おすすめ機能**: スコアリングシステムによるおすすめ店舗の表示
- **検索・フィルタ**: 店舗名・住所での検索、カテゴリ別フィルタリング
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応

### 活用したオープンデータ
- 習志野市文化施設データ（XLS形式）
- 6つの文化施設情報（習志野市民会館、習志野文化ホール等）
- 緯度経度情報、住所、電話番号等の詳細データ

---

## 2. Dockerイメージ

### イメージ情報
- **イメージ名**: `soraintegral/sodatunara-app:1.0`
- **Docker Hub URL**: https://hub.docker.com/r/soraintegral/sodatunara-app
- **公開設定**: Public ✅
- **サイズ**: 275MB
- **Digest**: `sha256:cffa72a75dc31ea5937c1a9a97fbb2e5cbc2d1d712bdb643eb7c918200264824`

### 使用方法
```bash
# イメージのプル
docker pull soraintegral/sodatunara-app:1.0

# コンテナの起動
docker run -d -p 3000:3000 soraintegral/sodatunara-app:1.0

# アクセス
# ブラウザで http://localhost:3000
```

---

## 3. 必要機能の一覧表

| 番号 | 機能の名称 | コードファイル名 | 行/文の数 | 出力先(ファイル名) | 備考(任意) |
|------|------------|------------------|-----------|-------------------|------------|
| 1 | ホームページ表示 | app/page.tsx | 95 | ブラウザ画面 | メインページ、3つのオプション表示 |
| 2 | 習志野市発見ページ表示 | app/discover/page.tsx | 267 | ブラウザ画面 | おすすめ・マップタブ切り替え |
| 3 | お店マップ表示 | components/shop-map.tsx | 174 | ブラウザ画面 | 地図上での店舗表示、フィルタリング |
| 4 | おすすめ店舗表示 | components/recommended-shops.tsx | 295 | ブラウザ画面 | カード形式表示、詳細モーダル |
| 5 | オープンデータ処理 | lib/open-data.ts | 202 | ブラウザ画面 | データ変換、スコアリング計算 |
| 6 | データベース処理 | data-processor/main.py | 158 | ターミナル | PostgreSQL接続、データ挿入 |
| 7 | 文化施設データ変換 | 未実装 | - | cultural_facilities.json | Python処理（手動実行済み） |

### 実装済み機能: 6件
### 未実装機能: 1件
### 総コード行数: 約1,200行（新規実装分）

---

## 4. Docker Compose構成

### クライアント・サーバ構成
```yaml
services:
  web:          # クライアント（フロントエンド）
    image: soraintegral/sodatunara-app:latest
    ports: ["3000:3000"]
    depends_on: [db]
    
  db:           # サーバ（データベース）
    image: postgres:15-alpine
    ports: ["5432:5432"]
    
  data-processor: # データ処理サービス
    build: Dockerfile.python
    depends_on: [db]
```

### ネットワーク構成
- **ネットワーク名**: `app-network`
- **ドライバ**: `bridge`
- **通信**: サービス名で相互通信（例: `db:5432`）

---

## 5. 技術仕様

### 使用技術
- **フレームワーク**: Next.js 14
- **言語**: TypeScript, Python
- **スタイリング**: Tailwind CSS
- **データベース**: PostgreSQL
- **コンテナ**: Docker, Docker Compose

### 開発環境
- **OS**: macOS
- **Docker**: Docker Desktop 4.45.0
- **Node.js**: 18.x
- **Python**: 3.11

---

## 6. 動作確認手順

### 1. 単一コンテナでの実行
```bash
# イメージのプル
docker pull soraintegral/sodatunara-app:1.0

# コンテナの起動
docker run -d -p 3000:3000 soraintegral/sodatunara-app:1.0

# アクセス確認
curl http://localhost:3000
```

### 2. Docker Composeでの実行
```bash
# 全サービスを起動
docker-compose up -d

# 起動確認
docker-compose ps

# アクセス確認
# ブラウザで http://localhost:3000
```

### 3. 機能確認
1. ホームページで「習志野市を発見」ボタンをクリック
2. おすすめタブで店舗カードが表示されることを確認
3. マップタブで地図が表示されることを確認
4. 検索・フィルタ機能の動作確認

---

## 7. 提出ファイル一覧

### 必須ファイル
- [x] `docker-compose.yml` - クライアント・サーバ構成
- [x] `Dockerfile` - フロントエンド用
- [x] `Dockerfile.python` - データ処理用
- [x] `requirements.txt` - Python依存関係
- [x] `data-processor/main.py` - データ処理スクリプト

### アプリケーションファイル
- [x] `app/` - Next.jsアプリケーション
- [x] `components/` - Reactコンポーネント
- [x] `lib/` - ライブラリ・ユーティリティ
- [x] `open-data/` - オープンデータ

### ドキュメント
- [x] `README.md` - プロジェクト概要
- [x] `SUBMISSION_GUIDE.md` - 提出手順書
- [x] `IMPLEMENTATION_DETAILS.md` - 実装詳細
- [x] `DEMO_INSTRUCTIONS.md` - デモ手順書
- [x] `FUNCTION_LIST.md` - 必要機能一覧表
- [x] `DOCKER_SUBMISSION_GUIDE.md` - Docker提出手順書
- [x] `REQUIREMENTS_CHECKLIST.md` - 要件チェックリスト
- [x] `FINAL_SUBMISSION.md` - この最終提出確認書

---

## 8. 審査担当者向け情報

### アクセス方法
1. **Docker Hub**: https://hub.docker.com/r/soraintegral/sodatunara-app
2. **イメージ名**: `soraintegral/sodatunara-app:1.0`
3. **実行コマンド**: `docker run -d -p 3000:3000 soraintegral/sodatunara-app:1.0`

### 確認ポイント
- [x] イメージが正常にプルできる
- [x] コンテナが正常に起動する
- [x] アプリケーションが正常に動作する
- [x] 主要機能が利用できる
- [x] レスポンシブデザインが適用される

---

## 9. まとめ

✅ **提出要件を完全に満たしています**:
- Dockerイメージの作成・公開完了
- 必要機能一覧表の作成完了
- クライアント・サーバ構成の実装完了
- 完全なドキュメント整備完了

このプロジェクトは、習志野市のオープンデータを活用して、市民が地域の魅力を発見し、地域経済の活性化に貢献することを目的としています。技術的な実装だけでなく、地域社会への貢献という観点からも価値のあるプロジェクトです。

---

**提出者**: Team G  
**連絡先**: Docker Hub (soraintegral)  
**提出日**: 2025年9月10日
