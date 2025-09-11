# 実装詳細ドキュメント

## アーキテクチャ概要

### システム構成
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   フロントエンド   │    │   データ処理層    │    │   オープンデータ   │
│   (Next.js)     │◄──►│   (TypeScript)  │◄──►│   (JSON/CSV)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### ディレクトリ構造
```
sodatunara/
├── app/
│   ├── discover/
│   │   └── page.tsx          # 発見ページ
│   └── page.tsx              # ホームページ（修正）
├── components/
│   ├── shop-map.tsx          # お店マップコンポーネント
│   └── recommended-shops.tsx # おすすめ店舗コンポーネント
├── lib/
│   └── open-data.ts          # オープンデータ処理ライブラリ
└── open-data/
    ├── csv/                  # CSV形式データ
    ├── xls/                  # Excel形式データ
    ├── json/                 # JSON形式データ
    └── processed/            # 処理済みデータ
        └── cultural_facilities.json
```

## コンポーネント設計

### 1. ShopMap コンポーネント

#### 機能
- 地図上での店舗表示
- カテゴリ別フィルタリング
- 店舗詳細情報の表示
- インタラクティブな操作

#### 主要なProps
```typescript
interface ShopMapProps {
  shops?: Shop[];
  selectedCategory?: string;
  onShopSelect?: (shop: Shop) => void;
}
```

#### 実装のポイント
- 簡易地図の実装（実際のプロダクションではGoogle Maps API推奨）
- レスポンシブデザイン対応
- ホバーエフェクトとアニメーション

### 2. RecommendedShops コンポーネント

#### 機能
- おすすめ店舗の表示
- スコアリングシステム
- お気に入り機能
- 詳細モーダル

#### 主要なProps
```typescript
interface RecommendedShopsProps {
  shops: Shop[];
  userPreferences?: {
    categories?: string[];
    priceRange?: string;
    location?: { lat: number; lng: number };
  };
}
```

#### 実装のポイント
- カード形式の美しいUI
- モーダルでの詳細表示
- お気に入り機能の実装

## データ処理

### 1. オープンデータの変換

#### XLS → JSON変換
```python
# 文化施設データの処理例
facilities = []
for i in range(3, len(df)):
    row = df.iloc[i]
    if pd.notna(row.iloc[2]):
        facility = {
            'id': int(row.iloc[1]) if pd.notna(row.iloc[1]) else i-2,
            'name': str(row.iloc[2]),
            'address': str(row.iloc[3]) if pd.notna(row.iloc[3]) else '',
            'latitude': float(row.iloc[4]) if pd.notna(row.iloc[4]) else None,
            'longitude': float(row.iloc[5]) if pd.notna(row.iloc[5]) else None,
            'phone': str(row.iloc[6]) if pd.notna(row.iloc[6]) else '',
            'category': '文化施設',
            'type': 'cultural'
        }
        facilities.append(facility)
```

### 2. データ拡張

#### 文化施設データの拡張
```typescript
export function convertCulturalFacilitiesToShops(facilities: CulturalFacility[]): Shop[] {
  return facilities.map(facility => ({
    ...facility,
    rating: Math.random() * 2 + 3, // 3-5のランダム評価
    description: getCulturalFacilityDescription(facility.name),
    openingHours: getCulturalFacilityHours(facility.name),
    features: getCulturalFacilityFeatures(facility.name),
    priceRange: '無料',
    popularItems: getCulturalFacilityPopularItems(facility.name)
  }));
}
```

## アルゴリズム

### 1. おすすめスコアリング

```typescript
const calculateShopScore = (shop: Shop, preferences?: any): number => {
  let score = 0;
  
  // 基本スコア（文化施設は高評価）
  if (shop.type === 'cultural') score += 10;
  
  // 評価スコア
  if (shop.rating) score += shop.rating * 2;
  
  // カテゴリマッチング
  if (preferences?.categories?.includes(shop.category)) score += 5;
  
  // ランダム要素（実際の実装では、ユーザーの行動履歴などを考慮）
  score += Math.random() * 3;
  
  return score;
};
```

### 2. 距離計算

```typescript
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // 地球の半径（km）
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
```

## UI/UX設計

### 1. デザインシステム

#### カラーパレット
- プライマリ: #007aff (青)
- セカンダリ: #34c759 (緑)
- アクセント: #ff9500 (オレンジ)
- テキスト: #000000, #666666, #3c3c43

#### タイポグラフィ
- フォント: Geist Sans
- 見出し: font-bold
- 本文: font-medium, font-normal

### 2. レスポンシブデザイン

#### ブレークポイント
- モバイル: < 768px
- タブレット: 768px - 1024px
- デスクトップ: > 1024px

#### 実装例
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* レスポンシブグリッド */}
</div>
```

## パフォーマンス最適化

### 1. データ読み込み
- 非同期データ読み込み
- ローディング状態の表示
- エラーハンドリング

### 2. レンダリング最適化
- React.memoの活用
- useMemo, useCallbackの使用
- 仮想化（大量データの場合）

### 3. バンドル最適化
- 動的インポート
- コード分割
- 画像最適化

## セキュリティ考慮事項

### 1. データ検証
- TypeScriptによる型安全性
- ランタイムでのデータ検証
- XSS対策

### 2. API設計
- 適切なHTTPステータスコード
- エラーレスポンスの統一
- レート制限の実装

## テスト戦略

### 1. 単体テスト
- コンポーネントテスト
- ユーティリティ関数テスト
- データ変換テスト

### 2. 統合テスト
- ページ全体のテスト
- API統合テスト
- ユーザーフローテスト

### 3. E2Eテスト
- 主要ユーザーフローのテスト
- クロスブラウザテスト
- モバイルテスト

## デプロイメント

### 1. 環境設定
- 開発環境
- ステージング環境
- 本番環境

### 2. CI/CD
- GitHub Actions
- 自動テスト
- 自動デプロイ

### 3. 監視
- パフォーマンス監視
- エラー監視
- ユーザー行動分析

## 今後の改善点

### 1. 技術的改善
- Google Maps API統合
- リアルタイムデータ更新
- PWA対応

### 2. 機能拡張
- ユーザーレビュー機能
- ソーシャル機能
- パーソナライゼーション

### 3. データ拡張
- より多くのオープンデータ活用
- リアルタイムデータ連携
- 外部API統合
