import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Building, Clock, Heart, Share2, ArrowLeft, Users, GraduationCap } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ApplyButton } from "@/components/apply-button"

interface JobDetail {
  id: string
  title: string
  description: string
  requirements: string | null
  benefits: string | null
  employment_type: string
  salary_min: number | null
  salary_max: number | null
  salary_type: string | null
  location: string
  remote_work: boolean
  work_schedule: string | null
  application_deadline: string | null
  required_skills: string[] | null
  preferred_skills: string[] | null
  experience_level: string | null
  education_level: string | null
  is_student_friendly: boolean
  view_count: number
  created_at: string
  companies: {
    company_name: string
    industry: string
    description: string | null
    website: string | null
    address: string | null
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: job, error } = await supabase
    .from("jobs")
    .select(`
      *,
      companies!inner (
        company_name,
        industry,
        description,
        website,
        address
      )
    `)
    .eq("id", id)
    .eq("is_active", true)
    .single()

  if (error || !job) {
    notFound()
  }

  // ビューカウントを増加
  await supabase
    .from("jobs")
    .update({ view_count: (job.view_count || 0) + 1 })
    .eq("id", id)

  // 現在のユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const formatSalary = (job: JobDetail) => {
    if (!job.salary_min && !job.salary_max) return "応相談"

    const formatAmount = (amount: number) => {
      if (job.salary_type === "hourly") return `時給${amount.toLocaleString()}円`
      if (job.salary_type === "daily") return `日給${amount.toLocaleString()}円`
      if (job.salary_type === "monthly") return `月給${amount.toLocaleString()}円`
      if (job.salary_type === "yearly") return `年収${amount.toLocaleString()}万円`
      return `${amount.toLocaleString()}円`
    }

    if (job.salary_min && job.salary_max) {
      return `${formatAmount(job.salary_min)}〜${formatAmount(job.salary_max)}`
    }
    return formatAmount(job.salary_min || job.salary_max || 0)
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

  const getExperienceLevelLabel = (level: string | null) => {
    const labels: { [key: string]: string } = {
      entry: "未経験OK",
      junior: "経験1-2年",
      mid: "経験3-5年",
      senior: "経験5年以上",
      executive: "管理職経験",
    }
    return level ? labels[level] || level : "不問"
  }

  const getEducationLevelLabel = (level: string | null) => {
    const labels: { [key: string]: string } = {
      high_school: "高校卒業以上",
      vocational: "専門学校卒業以上",
      associate: "短大卒業以上",
      bachelor: "大学卒業以上",
      master: "大学院修士課程修了以上",
      phd: "博士号取得者",
    }
    return level ? labels[level] || level : "不問"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/jobs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              求人一覧に戻る
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-narashino-blue">{job.title}</h1>
            <p className="text-muted-foreground">{job.companies.company_name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* 基本情報 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{getEmploymentTypeLabel(job.employment_type)}</Badge>
                      {job.is_student_friendly && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          学生歓迎
                        </Badge>
                      )}
                      {job.remote_work && <Badge variant="outline">リモートOK</Badge>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-future-orange">{formatSalary(job)}</div>
                    <div className="text-sm text-muted-foreground">閲覧数: {job.view_count}回</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-muted-foreground" />
                    <span>{job.companies.company_name}</span>
                  </div>
                  {job.work_schedule && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>{job.work_schedule}</span>
                    </div>
                  )}
                  {job.application_deadline && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span>応募締切: {new Date(job.application_deadline).toLocaleDateString("ja-JP")}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">仕事内容</h3>
                  <div className="whitespace-pre-wrap text-muted-foreground">{job.description}</div>
                </div>
              </CardContent>
            </Card>

            {/* 応募要件 */}
            {job.requirements && (
              <Card>
                <CardHeader>
                  <CardTitle>応募要件</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-muted-foreground">{job.requirements}</div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">経験レベル</span>
                      </div>
                      <span className="text-muted-foreground">{getExperienceLevelLabel(job.experience_level)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="w-4 h-4" />
                        <span className="font-medium">学歴</span>
                      </div>
                      <span className="text-muted-foreground">{getEducationLevelLabel(job.education_level)}</span>
                    </div>
                  </div>

                  {job.required_skills && job.required_skills.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">必須スキル</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.required_skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.preferred_skills && job.preferred_skills.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">歓迎スキル</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.preferred_skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* 待遇・福利厚生 */}
            {job.benefits && (
              <Card>
                <CardHeader>
                  <CardTitle>待遇・福利厚生</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-muted-foreground">{job.benefits}</div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* 応募ボタン */}
            <Card>
              <CardContent className="p-6">
                {user ? (
                  <ApplyButton jobId={job.id} />
                ) : (
                  <div className="space-y-4">
                    <Button asChild className="w-full" size="lg">
                      <Link href="/auth/login">ログインして応募</Link>
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">応募にはアカウント登録が必要です</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 企業情報 */}
            <Card>
              <CardHeader>
                <CardTitle>企業情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">{job.companies.company_name}</h4>
                  <p className="text-sm text-muted-foreground">{job.companies.industry}</p>
                </div>

                {job.companies.description && (
                  <div>
                    <p className="text-sm text-muted-foreground">{job.companies.description}</p>
                  </div>
                )}

                {job.companies.address && (
                  <div>
                    <h5 className="text-sm font-medium mb-1">所在地</h5>
                    <p className="text-sm text-muted-foreground">{job.companies.address}</p>
                  </div>
                )}

                {job.companies.website && (
                  <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                    <Link href={job.companies.website} target="_blank" rel="noopener noreferrer">
                      企業サイトを見る
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* 求人情報 */}
            <Card>
              <CardHeader>
                <CardTitle>求人情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">掲載日</span>
                  <span>{new Date(job.created_at).toLocaleDateString("ja-JP")}</span>
                </div>
                {job.application_deadline && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">応募締切</span>
                    <span>{new Date(job.application_deadline).toLocaleDateString("ja-JP")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">求人ID</span>
                  <span className="font-mono text-xs">{job.id.slice(0, 8)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
