import Link from "next/link"
import { Logo } from "@/components/logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex justify-center items-center py-8">
        <Logo width={160} height={52} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">ご利用方法を選択してください</h2>
          <p className="text-muted-foreground text-sm">習志野市の地域ビジネス支援プラットフォーム</p>
        </div>

        <div className="space-y-6">
          {/* Citizen option */}
          <Link href="/citizen" className="block">
            <div className="bg-background border-2 border-border rounded-xl p-6 hover:border-primary transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">市民の方</h3>
                  <p className="text-muted-foreground text-sm">お仕事を探す・地域情報を見る</p>
                </div>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
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
            <div className="bg-background border-2 border-border rounded-xl p-6 hover:border-primary transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">事業者の方</h3>
                  <p className="text-muted-foreground text-sm">求人掲載・事業者向けサービス</p>
                </div>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
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
          <p className="text-muted-foreground text-xs">習志野市公式 地域ビジネス支援プラットフォーム</p>
        </div>
      </div>
    </div>
  )
}
