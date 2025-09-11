/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ベースカラー: #FDFDEF (オフホワイト)
        'base-primary': '#FDFDEF',
        'base-secondary': '#F9F9F9',
        'base-tertiary': '#F5F5F5',
        
        // メインカラー: #00B7AC (ティール)
        'main-primary': '#00B7AC',
        'main-secondary': '#009B8F',
        'main-tertiary': '#007A70',
        'main-light': '#E6F7F6',
        
        // アクセントカラー: #B8D632 (ライムグリーン)
        'accent-primary': '#B8D632',
        'accent-secondary': '#A3C02A',
        'accent-tertiary': '#8FA822',
        'accent-light': '#F0F8E6',
        
        // テキストカラー
        'text-primary': '#2C3E50',
        'text-secondary': '#5A6C7D',
        'text-tertiary': '#8A9BA8',
        'text-inverse': '#FFFFFF',
        
        // 状態カラー
        'status-success': '#27AE60',
        'status-warning': '#F39C12',
        'status-error': '#E74C3C',
        'status-info': '#3498DB',
        
        // ボーダーカラー
        'border-light': '#E8E8E8',
        'border-medium': '#D0D0D0',
        'border-dark': '#B0B0B0',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
