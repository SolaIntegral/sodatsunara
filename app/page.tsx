import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-primary flex flex-col">
      {/* Header */}
      <div className="flex justify-center items-center py-8">
        <h1 className="text-2xl font-bold text-main-primary">そだつなら</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-xl font-semibold text-text-primary mb-4">ご利用方法を選択してください</h2>
          <p className="text-text-secondary text-sm">習志野市の地域ビジネス支援プラットフォーム</p>
        </div>

        <div className="space-y-6">
          {/* Discover option */}
          <Link href="/discover" className="block">
            <div className="bg-card border-2 border-border-light rounded-xl p-6 hover:border-main-primary transition-colors shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">習志野市を発見</h3>
                  <p className="text-text-secondary text-sm">お店マップ・おすすめスポット</p>
                </div>
                <div className="w-12 h-12 bg-main-primary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Citizen option */}
          <Link href="/citizen" className="block">
            <div className="bg-card border-2 border-border-light rounded-xl p-6 hover:border-main-primary transition-colors shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">市民の方</h3>
                  <p className="text-text-secondary text-sm">お仕事を探す・地域情報を見る</p>
                </div>
                <div className="w-12 h-12 bg-main-primary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Business option */}
          <Link href="/business-mobile" className="block">
            <div className="bg-card border-2 border-border-light rounded-xl p-6 hover:border-main-primary transition-colors shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">事業者の方</h3>
                  <p className="text-text-secondary text-sm">求人掲載・事業者向けサービス</p>
                </div>
                <div className="w-12 h-12 bg-main-primary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-12">
          <p className="text-text-tertiary text-xs">習志野市公式 地域ビジネス支援プラットフォーム</p>
        </div>
      </div>
    </div>
  )
}
