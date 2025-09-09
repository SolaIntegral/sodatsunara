"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface SchoolDomain {
  domain: string
  school_name: string
  school_type: string
}

export default function CompleteProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [userType, setUserType] = useState<"job_seeker" | "company">("job_seeker")
  const [schoolDomains, setSchoolDomains] = useState<SchoolDomain[]>([])
  const [isSchoolEmail, setIsSchoolEmail] = useState(false)
  const [formData, setFormData] = useState({
    // 求職者用
    phone: "",
    birthDate: "",
    gender: "",
    address: "",
    schoolEmail: "",
    schoolName: "",
    graduationYear: "",
    major: "",
    bio: "",
    skills: "",
    interests: "",
    // 企業用
    companyName: "",
    website: "",
    industry: "",
    companySize: "",
    description: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)
      setUserType(user.user_metadata?.user_type || "job_seeker")
    }

    const fetchSchoolDomains = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("school_domains")
        .select("domain, school_name, school_type")
        .eq("is_active", true)

      if (data) {
        setSchoolDomains(data)
      }
    }

    getUser()
    fetchSchoolDomains()
  }, [router])

  useEffect(() => {
    // 学校メールアドレスかチェック
    if (formData.schoolEmail) {
      const domain = formData.schoolEmail.split("@")[1]
      const schoolDomain = schoolDomains.find((sd) => sd.domain === domain)
      setIsSchoolEmail(!!schoolDomain)
      if (schoolDomain) {
        setFormData((prev) => ({ ...prev, schoolName: schoolDomain.school_name }))
      }
    } else {
      setIsSchoolEmail(false)
    }
  }, [formData.schoolEmail, schoolDomains])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      if (userType === "job_seeker") {
        const { error } = await supabase.from("job_seekers").insert({
          id: user.id,
          display_name: user.user_metadata?.display_name || "",
          email: user.email || "",
          phone: formData.phone,
          birth_date: formData.birthDate || null,
          gender: formData.gender || null,
          address: formData.address,
          school_email: formData.schoolEmail,
          school_name: formData.schoolName,
          is_school_verified: isSchoolEmail,
          graduation_year: formData.graduationYear ? Number.parseInt(formData.graduationYear) : null,
          major: formData.major,
          bio: formData.bio,
          skills: formData.skills ? formData.skills.split(",").map((s) => s.trim()) : [],
          interests: formData.interests ? formData.interests.split(",").map((s) => s.trim()) : [],
        })

        if (error) throw error
        router.push("/dashboard/job-seeker")
      } else {
        const { error } = await supabase.from("companies").insert({
          id: user.id,
          company_name: formData.companyName,
          email: user.email || "",
          phone: formData.phone,
          website: formData.website,
          address: formData.address,
          industry: formData.industry,
          company_size: formData.companySize,
          description: formData.description,
        })

        if (error) throw error
        router.push("/dashboard/company")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "プロフィール作成に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-narashino-blue mb-2">ならしごと</h1>
          <p className="text-muted-foreground">プロフィールを完成させましょう</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {userType === "job_seeker" ? "求職者プロフィール作成" : "企業プロフィール作成"}
            </CardTitle>
            <CardDescription className="text-center">
              {userType === "job_seeker"
                ? "あなたの情報を入力して、企業からのスカウトを受けやすくしましょう"
                : "企業情報を入力して、求職者にアピールしましょう"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {userType === "job_seeker" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">電話番号</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">生年月日</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">性別</Label>
                      <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">男性</SelectItem>
                          <SelectItem value="female">女性</SelectItem>
                          <SelectItem value="other">その他</SelectItem>
                          <SelectItem value="prefer_not_to_say">回答しない</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">住所</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolEmail">
                      学校メールアドレス（任意）
                      {isSchoolEmail && (
                        <Badge variant="secondary" className="ml-2">
                          認証対象
                        </Badge>
                      )}
                    </Label>
                    <Input
                      id="schoolEmail"
                      type="email"
                      placeholder="student@university.ac.jp"
                      value={formData.schoolEmail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, schoolEmail: e.target.value }))}
                    />
                    {isSchoolEmail && (
                      <p className="text-sm text-green-600">✓ {formData.schoolName}として認証されます</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">卒業予定年</Label>
                      <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, graduationYear: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}年
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="major">専攻・学科</Label>
                      <Input
                        id="major"
                        value={formData.major}
                        onChange={(e) => setFormData((prev) => ({ ...prev, major: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">スキル（カンマ区切り）</Label>
                    <Input
                      id="skills"
                      placeholder="例: JavaScript, React, デザイン"
                      value={formData.skills}
                      onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">興味のある分野（カンマ区切り）</Label>
                    <Input
                      id="interests"
                      placeholder="例: Web開発, マーケティング, 接客"
                      value={formData.interests}
                      onChange={(e) => setFormData((prev) => ({ ...prev, interests: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">自己紹介</Label>
                    <Textarea
                      id="bio"
                      placeholder="あなたの経験やスキル、興味のある分野について教えてください"
                      value={formData.bio}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">会社名 *</Label>
                    <Input
                      id="companyName"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">ウェブサイト</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://example.com"
                        value={formData.website}
                        onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">業界</Label>
                      <Input
                        id="industry"
                        value={formData.industry}
                        onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companySize">従業員数</Label>
                      <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, companySize: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10名</SelectItem>
                          <SelectItem value="11-50">11-50名</SelectItem>
                          <SelectItem value="51-200">51-200名</SelectItem>
                          <SelectItem value="201-1000">201-1000名</SelectItem>
                          <SelectItem value="1000+">1000名以上</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">電話番号</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">所在地</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">会社紹介</Label>
                    <Textarea
                      id="description"
                      placeholder="会社の事業内容や特徴について教えてください"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </>
              )}

              {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "作成中..." : "プロフィールを作成"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
