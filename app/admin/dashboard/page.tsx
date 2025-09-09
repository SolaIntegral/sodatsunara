import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Building, FileText, Calendar, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/admin/login")
  }

  // 管理者権限確認
  const { data: admin } = await supabase.from("admins").select("*").eq("id", user.id).single()

  if (!admin || !admin.is_active) {
    redirect("/admin/login")
  }

  // 統計データを取得
  const [
    { count: totalJobSeekers },
    { count: totalCompanies },
    { count: totalJobs },
    { count: totalApplications },
    { count: pendingCompanies },
  ] = await Promise.all([
    supabase.from("job_seekers").select("*", { count: "exact", head: true }),
    supabase.from("companies").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("applications").select("*", { count: "exact", head: true }),
    supabase.from("companies").select("*", { count: "exact", head: true }).eq("verification_status", "pending"),
  ])

  // 最近の活動を取得
  const { data: recentApplications } = await supabase
    .from("applications")
    .select(`
      id,
      applied_at,
      jobs!inner (
        title,
        companies!inner (
          company_name
        )
      ),
      job_seekers!inner (
        display_name
      )
    `)
    .order("applied_at", { ascending: false })
    .limit(5)

  const { data: recentCompanies } = await supabase
    .from("companies")
    .select("id, company_name, verification_status, created_at")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-narashino-blue">ならしごと 管理画面</h1>
            <p className="text-muted-foreground">習志野市運営者向けダッシュボード</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{admin.role}</Badge>
            <Button variant="outline">ログアウト</Button>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">求職者数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalJobSeekers || 0}</div>
              <p className="text-xs text-muted-foreground">登録済みユーザー</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">企業数</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCompanies || 0}</div>
              <p className="text-xs text-muted-foreground">認証待ち: {pendingCompanies || 0}件</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">公開求人数</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalJobs || 0}</div>
              <p className="text-xs text-muted-foreground">アクティブな求人</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総応募数</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications || 0}</div>
              <p className="text-xs text-muted-foreground">累計応募件数</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 最近の活動 */}
          <div className="space-y-6">
            {/* 最近の応募 */}
            <Card>
              <CardHeader>
                <CardTitle>最近の応募</CardTitle>
                <CardDescription>新しい応募活動</CardDescription>
              </CardHeader>
              <CardContent>
                {recentApplications && recentApplications.length > 0 ? (
                  <div className="space-y-4">
                    {recentApplications.map((application: any) => (
                      <div key={application.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{application.job_seekers.display_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {application.jobs.title} - {application.jobs.companies.company_name}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(application.applied_at).toLocaleDateString("ja-JP")}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">最近の応募はありません</p>
                )}
              </CardContent>
            </Card>

            {/* 企業認証待ち */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      企業認証待ち
                      {pendingCompanies && pendingCompanies > 0 && <AlertCircle className="h-4 w-4 text-orange-500" />}
                    </CardTitle>
                    <CardDescription>認証が必要な企業</CardDescription>
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/admin/companies">管理</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recentCompanies && recentCompanies.length > 0 ? (
                  <div className="space-y-4">
                    {recentCompanies
                      .filter((company: any) => company.verification_status === "pending")
                      .slice(0, 3)
                      .map((company: any) => (
                        <div key={company.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{company.company_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(company.created_at).toLocaleDateString("ja-JP")}
                            </p>
                          </div>
                          <Badge variant="outline">認証待ち</Badge>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">認証待ちの企業はありません</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 管理メニュー */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>管理メニュー</CardTitle>
                <CardDescription>システム管理機能</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/admin/companies">
                    <Building className="mr-2 h-4 w-4" />
                    企業管理・認証
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/admin/users">
                    <Users className="mr-2 h-4 w-4" />
                    ユーザー管理
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/admin/regional-data">
                    <FileText className="mr-2 h-4 w-4" />
                    地域データ管理
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/admin/events">
                    <Calendar className="mr-2 h-4 w-4" />
                    イベント管理
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/admin/analytics">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    分析・レポート
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 地域データ概要 */}
            <Card>
              <CardHeader>
                <CardTitle>習志野市データ概要</CardTitle>
                <CardDescription>地域の基本情報</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">人口</span>
                    <span className="font-medium">約175,000人</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">事業所数</span>
                    <span className="font-medium">約8,500社</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">学生数</span>
                    <span className="font-medium">約25,000人</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">主要駅</span>
                    <span className="font-medium">津田沼駅・新津田沼駅</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4 bg-transparent" asChild>
                  <Link href="/admin/regional-data">詳細データを見る</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
