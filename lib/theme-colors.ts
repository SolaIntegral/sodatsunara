/**
 * テーマカラー定義
 * 習志野市オープンデータ活用プロジェクト用
 */

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
} as const;

/**
 * Tailwind CSS用のカスタムカラー定義
 */
export const tailwindColors = {
  colors: {
    // ベースカラー
    'base-primary': themeColors.base.primary,
    'base-secondary': themeColors.base.secondary,
    'base-tertiary': themeColors.base.tertiary,
    
    // メインカラー
    'main-primary': themeColors.main.primary,
    'main-secondary': themeColors.main.secondary,
    'main-tertiary': themeColors.main.tertiary,
    'main-light': themeColors.main.light,
    
    // アクセントカラー
    'accent-primary': themeColors.accent.primary,
    'accent-secondary': themeColors.accent.secondary,
    'accent-tertiary': themeColors.accent.tertiary,
    'accent-light': themeColors.accent.light,
    
    // テキストカラー
    'text-primary': themeColors.text.primary,
    'text-secondary': themeColors.text.secondary,
    'text-tertiary': themeColors.text.tertiary,
    'text-inverse': themeColors.text.inverse,
    
    // 状態カラー
    'status-success': themeColors.status.success,
    'status-warning': themeColors.status.warning,
    'status-error': themeColors.status.error,
    'status-info': themeColors.status.info,
    
    // ボーダーカラー
    'border-light': themeColors.border.light,
    'border-medium': themeColors.border.medium,
    'border-dark': themeColors.border.dark,
  }
};

/**
 * CSS変数として使用するカラー定義
 */
export const cssVariables = {
  '--color-base-primary': themeColors.base.primary,
  '--color-base-secondary': themeColors.base.secondary,
  '--color-base-tertiary': themeColors.base.tertiary,
  
  '--color-main-primary': themeColors.main.primary,
  '--color-main-secondary': themeColors.main.secondary,
  '--color-main-tertiary': themeColors.main.tertiary,
  '--color-main-light': themeColors.main.light,
  
  '--color-accent-primary': themeColors.accent.primary,
  '--color-accent-secondary': themeColors.accent.secondary,
  '--color-accent-tertiary': themeColors.accent.tertiary,
  '--color-accent-light': themeColors.accent.light,
  
  '--color-text-primary': themeColors.text.primary,
  '--color-text-secondary': themeColors.text.secondary,
  '--color-text-tertiary': themeColors.text.tertiary,
  '--color-text-inverse': themeColors.text.inverse,
  
  '--color-status-success': themeColors.status.success,
  '--color-status-warning': themeColors.status.warning,
  '--color-status-error': themeColors.status.error,
  '--color-status-info': themeColors.status.info,
  
  '--color-border-light': themeColors.border.light,
  '--color-border-medium': themeColors.border.medium,
  '--color-border-dark': themeColors.border.dark,
} as const;
