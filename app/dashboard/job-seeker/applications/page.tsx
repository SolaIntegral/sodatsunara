import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Building, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Application {
  id: string
  status: string
  cover_letter: string | null
  applied_at: string
  jobs: {
    id: string
    title: string
    employment_type: string
    location: string
    companies: {
      company_name: string
    }
  }
}

export default async function ApplicationsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: applications } = await supabase
    .from("applications")
    .select(`
      id,
      status,
      cover_letter,
      applied_at,
      jobs!inner (
        id,
        title,
        employment_type,
        location,
        companies!inner (
          company_name
        )
      )
    `)
    .eq("job_seeker_id", user.id)
    .order("applied_at", { ascending: false })

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      pending: "応募中",
      reviewing: "書類選考中",
      interview: "面接予定",
      accepted: "採用決定",
      rejected: "不採用",
      withdrawn: "辞退",
    }
    return labels[status] || status
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: "bg-blue-100 text-blue-800",
      reviewing: "bg-yellow-100 text-yellow-800",
      interview: "bg-purple-100 text-purple-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      withdrawn: "bg-gray-100 text-gray-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

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
            <Link href="/dashboard/job-seeker">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ダッシュボードに戻る
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-narashino-blue">応募履歴</h1>
            <p className="text-muted-foreground">あなたの応募状況を確認できます</p>
          </div>
        </div>

        {/* 応募履歴一覧 */}
        <div className="space-y-6">
          {applications && applications.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">応募履歴 {applications.length}件</h2>
              </div>

              <div className="grid gap-6">
                {applications.map((application) => (
                  <Card key={application.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-narashino-blue">
                              <Link href={`/jobs/${application.jobs.id}`} className="hover:underline">
                                {application.jobs.title}
                              </Link>
                            </h3>
                            <Badge className={getStatusColor(application.status)}>
                              {getStatusLabel(application.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {application.jobs.companies.company_name}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {application.jobs.location}
                            </div>
                            <Badge variant="outline">{getEmploymentTypeLabel(application.jobs.employment_type)}</Badge>
                          </div>
                          {application.cover_letter && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-1">志望動機・自己PR</h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">{application.cover_letter}</p>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            応募日: {new Date(application.applied_at).toLocaleDateString("ja-JP")}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm" asChild>
                            <Link href={`/jobs/${application.jobs.id}`}>求人詳細</Link>
                          </Button>
                          {application.status === "pending" && (
                            <Button size="sm" variant="outline">
                              応募を取り下げ
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-muted-foreground mb-4">まだ応募履歴がありません</div>
                <Button asChild>
                  <Link href="/jobs">求人を探す</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
