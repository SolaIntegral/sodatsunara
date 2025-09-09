import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Users, Calendar, ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  employment_type: string
  location: string
  is_active: boolean
  view_count: number
  created_at: string
  application_deadline: string | null
  _count?: {
    applications: number
  }
}

export default async function CompanyJobsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // 企業の求人一覧を取得
  const { data: jobs } = await supabase
    .from("jobs")
    .select(`
      id,
      title,
      employment_type,
      location,
      is_active,
      view_count,
      created_at,
      application_deadline
    `)
    .eq("company_id", user.id)
    .order("created_at", { ascending: false })

  // 各求人の応募数を取得
  const jobsWithApplicationCount = await Promise.all(
    (jobs || []).map(async (job) => {
      const { count } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true })
        .eq("job_id", job.id)

      return {
        ...job,
        _count: { applications: count || 0 },
      }
    }),
  )

  const getEmploymentTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      full_time: "正社員",
      part_time: "アルバイト・パート",
      contract: "契約社員",
      internship: "インターンシップ",
      temporary: "派遣・臨時",
    }
    return labels[type] || type
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/company">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ダッシュボードに戻る
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-narashino-blue">求人管理</h1>
            <p className="text-muted-foreground">投稿した求人の管理と編集</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/company/jobs/create">新しい求人を作成</Link>
          </Button>
        </div>

        {/* 求人一覧 */}
        <div className="space-y-6">
          {jobsWithApplicationCount && jobsWithApplicationCount.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">投稿済み求人 {jobsWithApplicationCount.length}件</h2>
              </div>

              <div className="grid gap-6">
                {jobsWithApplicationCount.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                            <Badge variant={job.is_active ? "secondary" : "outline"}>
                              {job.is_active ? "公開中" : "非公開"}
                            </Badge>
                            <Badge variant="outline">{getEmploymentTypeLabel(job.employment_type)}</Badge>
                          </div>
                          <p className="text-muted-foreground">{job.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/dashboard/company/jobs/${job.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-blue-500" />
                          <div>
                            <div className="font-semibold">{job.view_count || 0}</div>
                            <div className="text-xs text-muted-foreground">閲覧数</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-500" />
                          <div>
                            <div className="font-semibold">{job._count?.applications || 0}</div>
                            <div className="text-xs text-muted-foreground">応募者数</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <div>
                            <div className="text-sm">
                              {job.application_deadline
                                ? new Date(job.application_deadline).toLocaleDateString("ja-JP")
                                : "期限なし"}
                            </div>
                            <div className="text-xs text-muted-foreground">応募締切</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="text-sm">{new Date(job.created_at).toLocaleDateString("ja-JP")}</div>
                            <div className="text-xs text-muted-foreground">投稿日</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" asChild>
                          <Link href={`/jobs/${job.id}`}>求人を見る</Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/dashboard/company/jobs/${job.id}/applications`}>応募者を確認</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-muted-foreground mb-4">まだ求人が投稿されていません</div>
                <Button asChild>
                  <Link href="/dashboard/company/jobs/create">最初の求人を作成する</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
