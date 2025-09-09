import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Users, MessageSquare, TrendingUp } from "lucide-react"
import Link from "next/link"

export default async function CompanyDashboard() {
  const isDemoMode = typeof window !== "undefined" && localStorage.getItem("demo_mode") === "true"

  let profile: any = null
  let jobStats: any[] = []
  let applicationStats: any[] = []

  if (isDemoMode) {
    profile = {
      company_name: "株式会社習志野テック",
      verification_status: "approved",
      plan_type: "standard",
    }

    jobStats = [
      { id: 1, view_count: 45, is_active: true },
      { id: 2, view_count: 32, is_active: true },
      { id: 3, view_count: 28, is_active: false },
    ]

    applicationStats = [
      { id: 1, status: "pending" },
      { id: 2, status: "interview" },
      { id: 3, status: "accepted" },
      { id: 4, status: "pending" },
      { id: 5, status: "interview" },
    ]
  } else {
    const supabase = await createClient()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) {
      redirect("/auth/login")
    }

    const { data: profileData } = await supabase.from("companies").select("*").eq("id", user.id).single()
    profile = profileData

    if (!profile) {
      redirect("/auth/complete-profile")
    }

    // 企業の求人統計を取得
    const { data: jobStatsData } = await supabase
      .from("jobs")
      .select("id, view_count, is_active")
      .eq("company_id", user.id)
    jobStats = jobStatsData || []

    // 応募統計を取得
    const { data: applicationStatsData } = await supabase
      .from("applications")
      .select(`
        id,
        status,
        jobs!inner(company_id)
      `)
      .eq("jobs.company_id", user.id)
    applicationStats = applicationStatsData || []
  }

  const activeJobs = jobStats?.filter((job) => job.is_active).length || 0
  const totalViews = jobStats?.reduce((sum, job) => sum + (job.view_count || 0), 0) || 0
  const totalApplications = applicationStats?.length || 0
  const interviewCount = applicationStats?.filter((app) => app.status === "interview").length || 0
  const acceptedCount = applicationStats?.filter((app) => app.status === "accepted").length || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-narashino-blue">ならしごと</h1>
            <p className="text-muted-foreground">企業管理画面</p>
            {isDemoMode && (
              <Badge variant="outline" className="mt-1 bg-yellow-50 text-yellow-700 border-yellow-300">
                デモモード
              </Badge>
            )}
          </div>
          <Button variant="outline">ログアウト</Button>
        </div>

        {/* ウェルカムセクション */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {profile.company_name}
              <Badge
                variant={profile.verification_status === "approved" ? "secondary" : "outline"}
                className={profile.verification_status === "approved" ? "bg-green-100 text-green-800" : ""}
              >
                {profile.verification_status === "approved"
                  ? "認証済み"
                  : profile.verification_status === "pending"
                    ? "審査中"
                    : "未認証"}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {profile.plan_type}プラン
              </Badge>
            </CardTitle>
            <CardDescription>習志野市の優秀な人材と出会いましょう</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-narashino-blue">{activeJobs}</div>
                <div className="text-sm text-muted-foreground">公開中の求人</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-future-orange">{totalApplications}</div>
                <div className="text-sm text-muted-foreground">応募者数</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{interviewCount}</div>
                <div className="text-sm text-muted-foreground">面接予定</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{acceptedCount}</div>
                <div className="text-sm text-muted-foreground">採用決定</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* 求人管理 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>求人管理</CardTitle>
                    <CardDescription>公開中の求人と応募状況</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/dashboard/company/jobs/create">新しい求人を作成</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {activeJobs > 0 ? (
                  <div className="space-y-4">
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href="/dashboard/company/jobs">すべての求人を管理</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    まだ求人が投稿されていません
                    <div className="mt-4">
                      <Button asChild>
                        <Link href="/dashboard/company/jobs/create">最初の求人を作成する</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 最近の応募 */}
            <Card>
              <CardHeader>
                <CardTitle>最近の応募</CardTitle>
                <CardDescription>新しい応募者をチェックしましょう</CardDescription>
              </CardHeader>
              <CardContent>
                {totalApplications > 0 ? (
                  <div className="space-y-4">
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href="/dashboard/company/applications">すべての応募を確認</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">まだ応募がありません</div>
                )}
              </CardContent>
            </Card>

            {/* 分析データ */}
            <Card>
              <CardHeader>
                <CardTitle>採用活動の分析</CardTitle>
                <CardDescription>求人の効果を確認しましょう</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <Eye className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-lg font-semibold">{totalViews}</div>
                    <div className="text-xs text-muted-foreground">求人閲覧数</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <div className="text-lg font-semibold">{totalApplications}</div>
                    <div className="text-xs text-muted-foreground">応募者数</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <MessageSquare className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                    <div className="text-lg font-semibold">0</div>
                    <div className="text-xs text-muted-foreground">メッセージ</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                    <div className="text-lg font-semibold">
                      {totalViews > 0 ? Math.round((totalApplications / totalViews) * 100) : 0}%
                    </div>
                    <div className="text-xs text-muted-foreground">応募率</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* プラン情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">現在のプラン</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold capitalize">{profile.plan_type}</div>
                    <div className="text-sm text-muted-foreground">
                      {profile.plan_type === "free"
                        ? "無料プラン"
                        : profile.plan_type === "standard"
                          ? "スタンダードプラン"
                          : "パートナープラン"}
                    </div>
                  </div>

                  {profile.plan_type === "free" && (
                    <div className="space-y-2">
                      <div className="text-sm">• 求人投稿: 1件まで</div>
                      <div className="text-sm">• 応募者管理: 基本機能</div>
                      <Button size="sm" className="w-full">
                        プランをアップグレード
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* クイックアクション */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">クイックアクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/dashboard/company/jobs/create">求人を投稿</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/dashboard/company/applications">応募者を確認</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  スカウトを送信
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  分析レポート
                </Button>
              </CardContent>
            </Card>

            {/* サポート */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">サポート</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  よくある質問
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  お問い合わせ
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  利用ガイド
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
