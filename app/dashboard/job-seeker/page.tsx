"use client"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Building, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function JobSeekerDashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [isDemo, setIsDemo] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      console.log("[v0] ダッシュボード認証チェック開始")

      const demoMode = localStorage.getItem("demo_mode")
      const demoUser = localStorage.getItem("demo_user")

      if (demoMode === "true" && demoUser) {
        console.log("[v0] デモモード検出")
        const parsedDemoUser = JSON.parse(demoUser)
        setProfile({
          display_name: parsedDemoUser.name,
          is_school_verified: parsedDemoUser.school_verified,
          email: parsedDemoUser.email,
        })
        setIsDemo(true)
        setLoading(false)
        return
      }

      // 通常のSupabase認証
      try {
        const supabase = await createClient()
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error || !user) {
          console.log("[v0] 認証エラー、ログインページにリダイレクト")
          router.push("/auth/login")
          return
        }

        const { data: profileData } = await supabase.from("job_seekers").select("*").eq("id", user.id).single()

        if (!profileData) {
          router.push("/auth/complete-profile")
          return
        }

        setProfile(profileData)
        setLoading(false)
      } catch (error) {
        console.error("[v0] 認証チェックエラー:", error)
        router.push("/auth/login")
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    if (isDemo) {
      localStorage.removeItem("demo_mode")
      localStorage.removeItem("demo_user")
      router.push("/auth/login")
    } else {
      // 通常のログアウト処理
      router.push("/auth/login")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-narashino-blue/30 border-t-narashino-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-narashino-blue">ならしごと</h1>
            <p className="text-muted-foreground">
              求職者ダッシュボード
              {isDemo && <span className="ml-2 text-future-orange font-medium">(デモモード)</span>}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            ログアウト
          </Button>
        </div>

        {/* ウェルカムセクション */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              こんにちは、{profile?.display_name}さん！
              {profile?.is_school_verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  学校認証済み
                </Badge>
              )}
            </CardTitle>
            <CardDescription>習志野市の地域密着型求人プラットフォームへようこそ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-narashino-blue">0</div>
                <div className="text-sm text-muted-foreground">応募中の求人</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-future-orange">0</div>
                <div className="text-sm text-muted-foreground">スカウト</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-muted-foreground">お気に入り</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* おすすめ求人 */}
            <Card>
              <CardHeader>
                <CardTitle>あなたにおすすめの求人</CardTitle>
                <CardDescription>プロフィールに基づいて厳選された求人です</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* サンプル求人 */}
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Webデザイナー（アルバイト）</h3>
                      <Badge variant="outline">NEW</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      習志野市のIT企業でWebデザインのお仕事です。学生歓迎！
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        株式会社テックナラシノ
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        習志野市津田沼
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        週3日〜
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">カフェスタッフ</h3>
                      <Badge variant="outline">急募</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      津田沼駅近くのおしゃれなカフェでスタッフ募集中！
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        カフェ・ド・ナラシノ
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        習志野市津田沼
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        未経験歓迎
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  すべての求人を見る
                </Button>
              </CardContent>
            </Card>

            {/* 最近の活動 */}
            <Card>
              <CardHeader>
                <CardTitle>最近の活動</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">まだ活動履歴がありません</div>
              </CardContent>
            </Card>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* プロフィール完成度 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">プロフィール完成度</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">基本情報</span>
                    <Badge variant="secondary">完了</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">履歴書</span>
                    <Badge variant="outline">未完了</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">プロフィール写真</span>
                    <Badge variant="outline">未完了</Badge>
                  </div>
                  <Button size="sm" className="w-full">
                    プロフィールを完成させる
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* クイックアクション */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">クイックアクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  求人を検索
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  履歴書を作成
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  企業をフォロー
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  イベント情報
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
