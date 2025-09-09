"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    benefits: "",
    employment_type: "",
    salary_min: "",
    salary_max: "",
    salary_type: "hourly",
    location: "",
    remote_work: false,
    work_schedule: "",
    application_deadline: "",
    required_skills: "",
    preferred_skills: "",
    experience_level: "",
    education_level: "",
    is_student_friendly: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }

      // 企業プロフィールを確認
      const { data: company } = await supabase.from("companies").select("id, plan_type").eq("id", user.id).single()

      if (!company) {
        router.push("/auth/complete-profile")
        return
      }

      // プランによる求人投稿制限をチェック
      if (company.plan_type === "free") {
        const { count } = await supabase
          .from("jobs")
          .select("*", { count: "exact", head: true })
          .eq("company_id", user.id)
          .eq("is_active", true)

        if (count && count >= 1) {
          setError("無料プランでは1件までしか求人を投稿できません。プランをアップグレードしてください。")
          return
        }
      }

      // 求人を作成
      const { error: jobError } = await supabase.from("jobs").insert({
        company_id: user.id,
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements || null,
        benefits: formData.benefits || null,
        employment_type: formData.employment_type,
        salary_min: formData.salary_min ? Number.parseInt(formData.salary_min) : null,
        salary_max: formData.salary_max ? Number.parseInt(formData.salary_max) : null,
        salary_type: formData.salary_type,
        location: formData.location,
        remote_work: formData.remote_work,
        work_schedule: formData.work_schedule || null,
        application_deadline: formData.application_deadline || null,
        required_skills: formData.required_skills ? formData.required_skills.split(",").map((s) => s.trim()) : null,
        preferred_skills: formData.preferred_skills ? formData.preferred_skills.split(",").map((s) => s.trim()) : null,
        experience_level: formData.experience_level || null,
        education_level: formData.education_level || null,
        is_student_friendly: formData.is_student_friendly,
        is_active: true,
      })

      if (jobError) throw jobError

      router.push("/dashboard/company/jobs")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "求人の作成に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoJobData = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 30)
    const deadlineDate = tomorrow.toISOString().split("T")[0]

    setFormData({
      title: "Webデザイナー（学生アルバイト歓迎）",
      description:
        "習志野市の地域密着型IT企業で、Webサイトのデザイン・制作業務を担当していただきます。\n\n【具体的な業務内容】\n・企業サイトのデザイン制作\n・バナー・ロゴデザイン\n・UI/UXデザインの改善提案\n・クライアントとの打ち合わせ参加\n\n学生の方には実務経験を積みながら、将来のキャリア形成をサポートします。",
      requirements:
        "・Photoshop、Illustratorの基本操作ができる方\n・HTML/CSSの基礎知識がある方\n・コミュニケーション能力のある方\n・学習意欲の高い方\n\n※未経験者でもやる気のある方は歓迎します！",
      benefits:
        "・交通費全額支給\n・スキルアップ研修制度\n・正社員登用制度あり\n・MacBook貸与\n・フレックスタイム制\n・リモートワーク可（週2日まで）",
      employment_type: "part_time",
      salary_min: "1200",
      salary_max: "1800",
      salary_type: "hourly",
      location: "習志野市津田沼1-1-1（津田沼駅徒歩5分）",
      remote_work: true,
      work_schedule: "10:00-19:00の間で4-8時間（シフト制）",
      application_deadline: deadlineDate,
      required_skills: "Photoshop, Illustrator, HTML, CSS",
      preferred_skills: "Figma, JavaScript, React, デザイン思考",
      experience_level: "entry",
      education_level: "high_school",
      is_student_friendly: true,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/company/jobs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              求人管理に戻る
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-narashino-blue">新しい求人を作成</h1>
            <p className="text-muted-foreground">求人情報を入力してください</p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              求人情報
              <Button
                type="button"
                variant="outline"
                onClick={fillDemoJobData}
                className="bg-future-orange/10 border-future-orange text-future-orange hover:bg-future-orange hover:text-white"
              >
                🎯 デモデータを入力
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 基本情報 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">基本情報</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="title">求人タイトル *</Label>
                    <Input
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="例: Webデザイナー（学生アルバイト歓迎）"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employment_type">雇用形態 *</Label>
                    <Select
                      required
                      value={formData.employment_type}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, employment_type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full_time">正社員</SelectItem>
                        <SelectItem value="part_time">アルバイト・パート</SelectItem>
                        <SelectItem value="contract">契約社員</SelectItem>
                        <SelectItem value="internship">インターンシップ</SelectItem>
                        <SelectItem value="temporary">派遣・臨時</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">勤務地 *</Label>
                    <Input
                      id="location"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="例: 習志野市津田沼（津田沼駅徒歩5分）"
                    />
                  </div>
                </div>
              </div>

              {/* 給与情報 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">給与情報</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary_type">給与形態</Label>
                    <Select
                      value={formData.salary_type}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, salary_type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">時給</SelectItem>
                        <SelectItem value="daily">日給</SelectItem>
                        <SelectItem value="monthly">月給</SelectItem>
                        <SelectItem value="yearly">年収</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary_min">最低給与</Label>
                    <Input
                      id="salary_min"
                      type="number"
                      value={formData.salary_min}
                      onChange={(e) => setFormData((prev) => ({ ...prev, salary_min: e.target.value }))}
                      placeholder="1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary_max">最高給与</Label>
                    <Input
                      id="salary_max"
                      type="number"
                      value={formData.salary_max}
                      onChange={(e) => setFormData((prev) => ({ ...prev, salary_max: e.target.value }))}
                      placeholder="1500"
                    />
                  </div>
                </div>
              </div>

              {/* 仕事内容 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">仕事内容</h3>
                <div className="space-y-2">
                  <Label htmlFor="description">仕事内容 *</Label>
                  <Textarea
                    id="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="具体的な仕事内容を記載してください"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">応募要件</Label>
                  <Textarea
                    id="requirements"
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                    placeholder="必要なスキルや経験を記載してください"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="benefits">待遇・福利厚生</Label>
                  <Textarea
                    id="benefits"
                    rows={3}
                    value={formData.benefits}
                    onChange={(e) => setFormData((prev) => ({ ...prev, benefits: e.target.value }))}
                    placeholder="交通費支給、社会保険完備など"
                  />
                </div>
              </div>

              {/* 勤務条件 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">勤務条件</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="work_schedule">勤務時間</Label>
                    <Input
                      id="work_schedule"
                      value={formData.work_schedule}
                      onChange={(e) => setFormData((prev) => ({ ...prev, work_schedule: e.target.value }))}
                      placeholder="例: 9:00-18:00（フレックスタイム制）"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="application_deadline">応募締切</Label>
                    <Input
                      id="application_deadline"
                      type="date"
                      value={formData.application_deadline}
                      onChange={(e) => setFormData((prev) => ({ ...prev, application_deadline: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote_work"
                    checked={formData.remote_work}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, remote_work: checked as boolean }))}
                  />
                  <Label htmlFor="remote_work">リモートワーク可</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_student_friendly"
                    checked={formData.is_student_friendly}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, is_student_friendly: checked as boolean }))
                    }
                  />
                  <Label htmlFor="is_student_friendly">学生歓迎</Label>
                </div>
              </div>

              {/* スキル・経験 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">スキル・経験</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience_level">経験レベル</Label>
                    <Select
                      value={formData.experience_level}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, experience_level: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">未経験OK</SelectItem>
                        <SelectItem value="junior">経験1-2年</SelectItem>
                        <SelectItem value="mid">経験3-5年</SelectItem>
                        <SelectItem value="senior">経験5年以上</SelectItem>
                        <SelectItem value="executive">管理職経験</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education_level">学歴</Label>
                    <Select
                      value={formData.education_level}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, education_level: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high_school">高校卒業以上</SelectItem>
                        <SelectItem value="vocational">専門学校卒業以上</SelectItem>
                        <SelectItem value="associate">短大卒業以上</SelectItem>
                        <SelectItem value="bachelor">大学卒業以上</SelectItem>
                        <SelectItem value="master">大学院修士課程修了以上</SelectItem>
                        <SelectItem value="phd">博士号取得者</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="required_skills">必須スキル（カンマ区切り）</Label>
                    <Input
                      id="required_skills"
                      value={formData.required_skills}
                      onChange={(e) => setFormData((prev) => ({ ...prev, required_skills: e.target.value }))}
                      placeholder="例: HTML, CSS, JavaScript"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferred_skills">歓迎スキル（カンマ区切り）</Label>
                    <Input
                      id="preferred_skills"
                      value={formData.preferred_skills}
                      onChange={(e) => setFormData((prev) => ({ ...prev, preferred_skills: e.target.value }))}
                      placeholder="例: React, Node.js, デザイン経験"
                    />
                  </div>
                </div>
              </div>

              {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}

              <div className="flex gap-4">
                <Button type="button" variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/dashboard/company/jobs">キャンセル</Link>
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "作成中..." : "求人を作成"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
