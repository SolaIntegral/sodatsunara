"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Building, Users } from "lucide-react"

export default function JobSeekerDashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const isDemoMode = typeof window !== "undefined" && localStorage.getItem("demo_mode") === "true"

      if (isDemoMode) {
        const demoUser = JSON.parse(localStorage.getItem("demo_user") || "{}")
        setProfile({
          display_name: demoUser.name || "田中 太郎",
          is_school_verified: demoUser.user_type === "job_seeker",
          email: demoUser.email || "demo.student@toho-u.ac.jp",
        })
        setLoading(false)
        return
      }

      // 通常のSupabase認証
      const supabase = createClient()
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
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
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    if (typeof window !== "undefined" && localStorage.getItem("demo_mode") === "true") {
      localStorage.removeItem("demo_mode")
      localStorage.removeItem("demo_user")
      window.location.href = "/auth/login"
    } else {
      // 通常のログアウト処理
      router.push("/auth/login")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-narashino-blue mx-auto mb-4"></div>
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
            <p className="text-muted-foreground">求職者ダッシュボード</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            ログアウト
          </Button>
        </div>

        {/* ウェルカムセクション */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              こんにちは、{profile.display_name}さん！
              {profile.is_school_verified && (
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
                <div className="text-2xl font-bold text-narashino-blue">2</div>
                <div className="text-sm text-muted-foreground">応募中の求人</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-future-orange">1</div>
                <div className="text-sm text-muted-foreground">スカウト</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">3</div>
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
                  <div
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => (window.location.href = "/jobs")}
                  >
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

                  <div
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => (window.location.href = "/jobs")}
                  >
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

                <Button
                  className="w-full mt-4 bg-transparent"
                  variant="outline"
                  onClick={() => (window.location.href = "/jobs")}
                >
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
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-narashino-blue rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Webデザイナー（アルバイト）に応募しました</p>
                      <p className="text-xs text-muted-foreground">2時間前</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">カフェスタッフをお気に入りに追加しました</p>
                      <p className="text-xs text-muted-foreground">1日前</p>
                    </div>
                  </div>
                </div>
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
                    <Badge className="bg-orange-100 text-orange-800">80%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">プロフィール写真</span>
                    <Badge variant="secondary">完了</Badge>
                  </div>
                  <Button size="sm" className="w-full bg-narashino-blue hover:bg-narashino-blue/90">
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
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/jobs")}
                >
                  求人を検索
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/dashboard/job-seeker/applications")}
                >
                  応募履歴を見る
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
