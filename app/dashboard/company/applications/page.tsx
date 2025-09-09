import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, ArrowLeft, Mail, Phone, GraduationCap } from "lucide-react"
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
  }
  job_seekers: {
    id: string
    display_name: string
    email: string
    phone: string | null
    school_name: string | null
    is_school_verified: boolean
    graduation_year: number | null
    major: string | null
    bio: string | null
    skills: string[] | null
  }
}

export default async function CompanyApplicationsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // 企業の求人への応募一覧を取得
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
        company_id
      ),
      job_seekers!inner (
        id,
        display_name,
        email,
        phone,
        school_name,
        is_school_verified,
        graduation_year,
        major,
        bio,
        skills
      )
    `)
    .eq("jobs.company_id", user.id)
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
            <Link href="/dashboard/company">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ダッシュボードに戻る
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-narashino-blue">応募者管理</h1>
            <p className="text-muted-foreground">求人への応募者を確認・管理できます</p>
          </div>
        </div>

        {/* 応募者一覧 */}
        <div className="space-y-6">
          {applications && applications.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">応募者一覧 {applications.length}件</h2>
              </div>

              <div className="grid gap-6">
                {applications.map((application) => (
                  <Card key={application.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>
                              {application.job_seekers.display_name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-lg">{application.job_seekers.display_name}</CardTitle>
                              {application.job_seekers.is_school_verified && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  学校認証済み
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              応募求人: {application.jobs.title} (
                              {getEmploymentTypeLabel(application.jobs.employment_type)})
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {application.job_seekers.email}
                              </div>
                              {application.job_seekers.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="w-4 h-4" />
                                  {application.job_seekers.phone}
                                </div>
                              )}
                              {application.job_seekers.school_name && (
                                <div className="flex items-center gap-1">
                                  <GraduationCap className="w-4 h-4" />
                                  {application.job_seekers.school_name}
                                  {application.job_seekers.graduation_year &&
                                    ` (${application.job_seekers.graduation_year}年卒業予定)`}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusLabel(application.status)}
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {new Date(application.applied_at).toLocaleDateString("ja-JP")}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* プロフィール情報 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {application.job_seekers.major && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">専攻・学科</h4>
                              <p className="text-sm text-muted-foreground">{application.job_seekers.major}</p>
                            </div>
                          )}
                          {application.job_seekers.skills && application.job_seekers.skills.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">スキル</h4>
                              <div className="flex flex-wrap gap-1">
                                {application.job_seekers.skills.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 自己紹介 */}
                        {application.job_seekers.bio && (
                          <div>
                            <h4 className="text-sm font-medium mb-1">自己紹介</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">{application.job_seekers.bio}</p>
                          </div>
                        )}

                        {/* 志望動機 */}
                        {application.cover_letter && (
                          <div>
                            <h4 className="text-sm font-medium mb-1">志望動機・自己PR</h4>
                            <p className="text-sm text-muted-foreground line-clamp-3">{application.cover_letter}</p>
                          </div>
                        )}

                        {/* アクションボタン */}
                        <div className="flex gap-2 pt-2">
                          <Button size="sm">詳細を見る</Button>
                          {application.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline">
                                書類選考に進む
                              </Button>
                              <Button size="sm" variant="outline">
                                面接に進む
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            メッセージを送る
                          </Button>
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
                <div className="text-muted-foreground mb-4">まだ応募者がいません</div>
                <Button asChild>
                  <Link href="/dashboard/company/jobs/create">求人を投稿して応募者を募集する</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
