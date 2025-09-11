# テーマカラー更新ドキュメント

## 更新概要

習志野市オープンデータ活用プロジェクトのテーマカラーを、指定されたカラーコードに基づいて更新しました。

## 新しいテーマカラー

### ベースカラー: #FDFDEF (オフホワイト)
- **用途**: サイト全体の背景色
- **効果**: 温かみのある白で、目に優しく落ち着いた印象
- **使用箇所**: 
  - Webサイト全体の背景
  - 記事やコンテンツの本文エリア
  - カード型コンテンツの背景

### メインカラー: #00B7AC (ティール)
- **用途**: ブランドイメージを印象付ける主要な色
- **効果**: 信頼感やプロフェッショナルな雰囲気
- **使用箇所**:
  - ヘッダーとフッター
  - グローバルナビゲーション
  - 見出し (h2, h3など)
  - アイコン
  - アクティブになっているメニュー項目

### アクセントカラー: #B8D632 (ライムグリーン)
- **用途**: ユーザーの注意を引き、特定のアクションを促す
- **効果**: 最も目立つ色で、使いすぎないことがポイント
- **使用箇所**:
  - 購入や問い合わせなどのCTA (コールトゥアクション) ボタン
  - テキストリンク
  - 注目させたいバナーや通知
  - フォームの送信ボタン

## 実装詳細

### 1. テーマカラー定義ファイル
- **ファイル**: `lib/theme-colors.ts`
- **内容**: カラーコードの定義とTailwind CSS用の設定

### 2. Tailwind CSS設定
- **ファイル**: `tailwind.config.js`
- **内容**: カスタムカラーの追加とアニメーション設定

### 3. グローバルCSS更新
- **ファイル**: `app/globals.css`
- **内容**: CSS変数の更新とベーススタイルの適用

### 4. コンポーネント更新
- **ホームページ**: `app/page.tsx`
- **発見ページ**: `app/discover/page.tsx`
- **その他のコンポーネント**: 順次更新予定

## カラーパレット詳細

```typescript
export const themeColors = {
  // ベースカラー: #FDFDEF (オフホワイト)
  base: {
    primary: '#FDFDEF',    // サイト全体の背景
    secondary: '#F9F9F9',  // カード型コンテンツの背景
    tertiary: '#F5F5F5',   // セクション区切り
  },
  
  // メインカラー: #00B7AC (ティール)
  main: {
    primary: '#00B7AC',    // ヘッダー、フッター、ナビゲーション
    secondary: '#009B8F',  // ホバー状態
    tertiary: '#007A70',   // アクティブ状態
    light: '#E6F7F6',      // ライトバージョン
  },
  
  // アクセントカラー: #B8D632 (ライムグリーン)
  accent: {
    primary: '#B8D632',    // CTAボタン、リンク
    secondary: '#A3C02A',  // ホバー状態
    tertiary: '#8FA822',   // アクティブ状態
    light: '#F0F8E6',      // ライトバージョン
  },
  
  // テキストカラー
  text: {
    primary: '#2C3E50',    // メインテキスト
    secondary: '#5A6C7D',  // サブテキスト
    tertiary: '#8A9BA8',   // 補助テキスト
    inverse: '#FFFFFF',    // 白背景上のテキスト
  },
  
  // 状態カラー
  status: {
    success: '#27AE60',    // 成功
    warning: '#F39C12',    // 警告
    error: '#E74C3C',      // エラー
    info: '#3498DB',       // 情報
  },
  
  // ボーダーカラー
  border: {
    light: '#E8E8E8',      // 薄いボーダー
    medium: '#D0D0D0',     // 中程度のボーダー
    dark: '#B0B0B0',       // 濃いボーダー
  }
};
```

## 使用方法

### Tailwind CSSクラス
```html
<!-- ベースカラー -->
<div className="bg-base-primary">背景</div>
<div className="bg-base-secondary">カード背景</div>

<!-- メインカラー -->
<div className="bg-main-primary text-white">メイン要素</div>
<div className="text-main-primary">メインテキスト</div>

<!-- アクセントカラー -->
<button className="bg-accent-primary text-white">CTAボタン</button>
<a className="text-accent-primary">リンク</a>

<!-- テキストカラー -->
<h1 className="text-text-primary">見出し</h1>
<p className="text-text-secondary">本文</p>
```

### CSS変数
```css
.custom-element {
  background-color: var(--color-base-primary);
  color: var(--color-main-primary);
  border: 1px solid var(--color-border-light);
}
```

## 更新されたファイル一覧

### 新規作成
- `lib/theme-colors.ts` - テーマカラー定義
- `tailwind.config.js` - Tailwind CSS設定
- `THEME_COLOR_UPDATE.md` - このドキュメント

### 更新
- `app/globals.css` - グローバルスタイル
- `app/page.tsx` - ホームページ
- `app/discover/page.tsx` - 発見ページ

## デザイン原則

### 1. 階層性
- **ベースカラー**: 最も多く使用（約70%）
- **メインカラー**: 重要な要素に使用（約20%）
- **アクセントカラー**: 最小限に使用（約10%）

### 2. アクセシビリティ
- コントラスト比を考慮した色の組み合わせ
- 色覚異常者にも配慮した配色

### 3. 一貫性
- 全ページで統一されたカラーパレット
- コンポーネント間での色の使い分け

## 今後の拡張

### 1. ダークモード対応
- ダークテーマ用のカラーパレット追加
- 自動切り替え機能の実装

### 2. カスタマイズ機能
- ユーザーがテーマカラーを選択可能
- 地域ごとのカスタムカラー

### 3. アニメーション
- カラートランジションの追加
- ホバーエフェクトの強化

## まとめ

新しいテーマカラーにより、習志野市オープンデータ活用プロジェクトはより洗練された外観と使いやすさを実現しました。クリーンで開放的な印象を与えつつ、重要なアクションを際立たせる配色となっています。
