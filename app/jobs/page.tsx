import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Building, Clock, Heart, Search } from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  description: string
  employment_type: string
  salary_min: number | null
  salary_max: number | null
  salary_type: string | null
  location: string
  remote_work: boolean
  is_student_friendly: boolean
  created_at: string
  companies: {
    company_name: string
    industry: string
  }
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("jobs")
    .select(`
      id,
      title,
      description,
      employment_type,
      salary_min,
      salary_max,
      salary_type,
      location,
      remote_work,
      is_student_friendly,
      created_at,
      companies!inner (
        company_name,
        industry
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  // 検索フィルター適用
  if (params.search) {
    query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%`)
  }

  if (params.employment_type && params.employment_type !== "all") {
    query = query.eq("employment_type", params.employment_type)
  }

  if (params.location && params.location !== "all") {
    query = query.ilike("location", `%${params.location}%`)
  }

  if (params.student_friendly === "true") {
    query = query.eq("is_student_friendly", true)
  }

  const { data: jobs, error } = await query

  if (error) {
    console.error("Error fetching jobs:", error)
  }

  const formatSalary = (job: Job) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-narashino-blue">求人検索</h1>
            <p className="text-muted-foreground">習志野市の地域密着型求人を探そう</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/job-seeker">ダッシュボードに戻る</Link>
          </Button>
        </div>

        {/* 検索・フィルターセクション */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              求人を検索
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form method="GET" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">キーワード</label>
                  <Input name="search" placeholder="職種、会社名、キーワード" defaultValue={params.search as string} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">雇用形態</label>
                  <Select name="employment_type" defaultValue={(params.employment_type as string) || "all"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="full_time">正社員</SelectItem>
                      <SelectItem value="part_time">アルバイト・パート</SelectItem>
                      <SelectItem value="contract">契約社員</SelectItem>
                      <SelectItem value="internship">インターンシップ</SelectItem>
                      <SelectItem value="temporary">派遣・臨時</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">勤務地</label>
                  <Select name="location" defaultValue={(params.location as string) || "all"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="津田沼">津田沼</SelectItem>
                      <SelectItem value="新津田沼">新津田沼</SelectItem>
                      <SelectItem value="京成津田沼">京成津田沼</SelectItem>
                      <SelectItem value="実籾">実籾</SelectItem>
                      <SelectItem value="大久保">大久保</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">学生歓迎</label>
                  <Select name="student_friendly" defaultValue={(params.student_friendly as string) || "false"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">すべて</SelectItem>
                      <SelectItem value="true">学生歓迎のみ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full md:w-auto">
                検索
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 求人一覧 */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">検索結果 {jobs?.length || 0}件</h2>
          </div>

          {jobs && jobs.length > 0 ? (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-narashino-blue">
                            <Link href={`/jobs/${job.id}`} className="hover:underline">
                              {job.title}
                            </Link>
                          </h3>
                          {job.is_student_friendly && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              学生歓迎
                            </Badge>
                          )}
                          {job.remote_work && <Badge variant="outline">リモートOK</Badge>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {job.companies.company_name}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {getEmploymentTypeLabel(job.employment_type)}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-semibold text-future-orange">{formatSalary(job)}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(job.created_at).toLocaleDateString("ja-JP")}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" asChild>
                          <Link href={`/jobs/${job.id}`}>詳細を見る</Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-muted-foreground mb-4">条件に合う求人が見つかりませんでした</div>
                <Button asChild>
                  <Link href="/jobs">すべての求人を見る</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
