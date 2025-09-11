import Link from "next/link"
import { Logo } from "@/components/logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex justify-center items-center py-8 px-6">
        <Logo width={200} height={65} />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pb-20 max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-3">ご利用方法を選択してください</h2>
          <p className="text-muted-foreground">習志野市の地域ビジネス支援プラットフォーム</p>
        </div>

        <div className="space-y-4">
          <Link href="/citizen" className="block">
            <div className="bg-card border-2 border-border rounded-2xl p-6 hover:border-primary hover:shadow-lg transition-all duration-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">市民の方</h3>
                  <p className="text-muted-foreground">お仕事を探す・地域情報を見る</p>
                </div>
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                  <svg
                    className="w-7 h-7 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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

          <Link href="/business-mobile" className="block">
            <div className="bg-card border-2 border-border rounded-2xl p-6 hover:border-primary hover:shadow-lg transition-all duration-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">事業者の方</h3>
                  <p className="text-muted-foreground">求人掲載・事業者向けサービス</p>
                </div>
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                  <svg
                    className="w-7 h-7 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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

        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">習志野市公式 地域ビジネス支援プラットフォーム</p>
        </div>
      </div>
    </div>
  )
}