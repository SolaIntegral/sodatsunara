"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Building, Clock, Heart, Search } from "lucide-react"

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

const demoJobs: Job[] = [
  {
    id: "demo-1",
    title: "Webデザイナー（アルバイト）",
    description:
      "習志野市のIT企業でWebデザインのお仕事です。学生歓迎！未経験でも丁寧に指導します。PhotoshopやIllustratorの基本操作ができる方歓迎。",
    employment_type: "part_time",
    salary_min: 1200,
    salary_max: 1500,
    salary_type: "hourly",
    location: "習志野市津田沼",
    remote_work: true,
    is_student_friendly: true,
    created_at: "2025-01-08T10:00:00Z",
    companies: {
      company_name: "株式会社テックナラシノ",
      industry: "IT・Web",
    },
  },
  {
    id: "demo-2",
    title: "カフェスタッフ",
    description:
      "津田沼駅近くのおしゃれなカフェでスタッフ募集中！接客経験がなくても大丈夫です。明るく元気な方をお待ちしています。",
    employment_type: "part_time",
    salary_min: 1000,
    salary_max: 1200,
    salary_type: "hourly",
    location: "習志野市津田沼",
    remote_work: false,
    is_student_friendly: true,
    created_at: "2025-01-07T15:30:00Z",
    companies: {
      company_name: "カフェ・ド・ナラシノ",
      industry: "飲食・サービス",
    },
  },
  {
    id: "demo-3",
    title: "営業アシスタント",
    description: "地域密着型の不動産会社で営業アシスタントを募集しています。事務作業中心で、お客様対応もお任せします。",
    employment_type: "full_time",
    salary_min: 22,
    salary_max: 28,
    salary_type: "yearly",
    location: "習志野市大久保",
    remote_work: false,
    is_student_friendly: false,
    created_at: "2025-01-06T09:15:00Z",
    companies: {
      company_name: "習志野不動産株式会社",
      industry: "不動産",
    },
  },
  {
    id: "demo-4",
    title: "プログラマー（インターンシップ）",
    description: "大学生向けのプログラミングインターンシップです。React、Node.jsを使った開発経験を積めます。",
    employment_type: "internship",
    salary_min: 1500,
    salary_max: 2000,
    salary_type: "hourly",
    location: "習志野市新津田沼",
    remote_work: true,
    is_student_friendly: true,
    created_at: "2025-01-05T14:20:00Z",
    companies: {
      company_name: "株式会社デジタルソリューションズ",
      industry: "IT・Web",
    },
  },
]

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useState({
    search: "",
    employment_type: "all",
    location: "all",
    student_friendly: "false",
  })

  useEffect(() => {
    const fetchJobs = async () => {
      const isDemoMode = typeof window !== "undefined" && localStorage.getItem("demo_mode") === "true"

      if (isDemoMode) {
        setJobs(demoJobs)
        setLoading(false)
        return
      }

      // 通常のSupabase処理
      const supabase = createClient()
      const query = supabase
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

      const { data, error } = await query

      if (error) {
        console.error("Error fetching jobs:", error)
      } else {
        setJobs(data || [])
      }
      setLoading(false)
    }

    fetchJobs()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const isDemoMode = typeof window !== "undefined" && localStorage.getItem("demo_mode") === "true"

    if (isDemoMode) {
      let filteredJobs = demoJobs

      if (searchParams.search) {
        filteredJobs = filteredJobs.filter(
          (job) =>
            job.title.toLowerCase().includes(searchParams.search.toLowerCase()) ||
            job.description.toLowerCase().includes(searchParams.search.toLowerCase()) ||
            job.companies.company_name.toLowerCase().includes(searchParams.search.toLowerCase()),
        )
      }

      if (searchParams.employment_type !== "all") {
        filteredJobs = filteredJobs.filter((job) => job.employment_type === searchParams.employment_type)
      }

      if (searchParams.location !== "all") {
        filteredJobs = filteredJobs.filter((job) => job.location.includes(searchParams.location))
      }

      if (searchParams.student_friendly === "true") {
        filteredJobs = filteredJobs.filter((job) => job.is_student_friendly)
      }

      setJobs(filteredJobs)
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-narashino-blue mx-auto mb-4"></div>
          <p className="text-muted-foreground">求人を読み込み中...</p>
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
            <h1 className="text-3xl font-bold text-narashino-blue">求人検索</h1>
            <p className="text-muted-foreground">習志野市の地域密着型求人を探そう</p>
          </div>
          <Button onClick={() => (window.location.href = "/dashboard/job-seeker")}>ダッシュボードに戻る</Button>
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
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">キーワード</label>
                  <Input
                    placeholder="職種、会社名、キーワード"
                    value={searchParams.search}
                    onChange={(e) => setSearchParams({ ...searchParams, search: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">雇用形態</label>
                  <Select
                    value={searchParams.employment_type}
                    onValueChange={(value) => setSearchParams({ ...searchParams, employment_type: value })}
                  >
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
                  <Select
                    value={searchParams.location}
                    onValueChange={(value) => setSearchParams({ ...searchParams, location: value })}
                  >
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
                  <Select
                    value={searchParams.student_friendly}
                    onValueChange={(value) => setSearchParams({ ...searchParams, student_friendly: value })}
                  >
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
              <Button type="submit" className="w-full md:w-auto bg-narashino-blue hover:bg-narashino-blue/90">
                検索
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 求人一覧 */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">検索結果 {jobs.length}件</h2>
          </div>

          {jobs.length > 0 ? (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-narashino-blue">
                            <button
                              onClick={() => (window.location.href = `/jobs/${job.id}`)}
                              className="hover:underline text-left"
                            >
                              {job.title}
                            </button>
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
                        <Button
                          size="sm"
                          onClick={() => (window.location.href = `/jobs/${job.id}`)}
                          className="bg-narashino-blue hover:bg-narashino-blue/90"
                        >
                          詳細を見る
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
                <Button onClick={() => (window.location.href = "/jobs")}>すべての求人を見る</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
