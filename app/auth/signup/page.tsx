"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface SchoolDomain {
  domain: string
  school_name: string
  school_type: string
}

export default function SignupPage() {
  const [userType, setUserType] = useState<"job_seeker" | "company">("job_seeker")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    phone: "",
    // 求職者用
    schoolEmail: "",
    schoolName: "",
    graduationYear: "",
    major: "",
    bio: "",
    // 企業用
    companyName: "",
    website: "",
    address: "",
    industry: "",
    companySize: "",
    description: "",
  })
  const [schoolDomains, setSchoolDomains] = useState<SchoolDomain[]>([])
  const [isSchoolEmail, setIsSchoolEmail] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // 学校ドメインを取得
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

    fetchSchoolDomains()
  }, [])

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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("パスワードが一致しません")
      setIsLoading(false)
      return
    }

    try {
      // Supabase認証でユーザー作成
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/verify-email`,
          data: {
            user_type: userType,
            display_name: formData.displayName,
          },
        },
      })

      if (authError) throw authError

      // 認証成功後、プロフィール作成は確認後に行う
      router.push("/auth/verify-email")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "登録に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoData = () => {
    if (userType === "job_seeker") {
      setFormData({
        ...formData,
        email: "demo.student@example.com",
        password: "demo123456",
        confirmPassword: "demo123456",
        displayName: "田中 太郎",
        schoolEmail: "student@cit.ac.jp",
        graduationYear: "2025",
        major: "情報工学科",
        bio: "プログラミングに興味があり、特にWebアプリケーション開発を学んでいます。習志野市でのインターンシップや新卒採用の機会を探しています。",
      })
    } else {
      setFormData({
        ...formData,
        email: "demo.company@example.com",
        password: "demo123456",
        confirmPassword: "demo123456",
        displayName: "佐藤 花子",
        companyName: "株式会社習志野テック",
        website: "https://narashino-tech.example.com",
        industry: "IT・ソフトウェア",
        companySize: "11-50",
        phone: "047-123-4567",
        address: "千葉県習志野市津田沼1-1-1",
        description:
          "習志野市を拠点とするIT企業です。地域密着型のシステム開発を行っており、学生の皆さんと一緒に成長していきたいと考えています。",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-narashino-blue mb-2">ならしごと</h1>
          <p className="text-muted-foreground">習志野市の地域密着型求人プラットフォーム</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">新規登録</CardTitle>
            <CardDescription className="text-center">アカウントを作成してください</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={userType}
              onValueChange={(value) => setUserType(value as "job_seeker" | "company")}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="job_seeker">求職者として登録</TabsTrigger>
                <TabsTrigger value="company">企業として登録</TabsTrigger>
              </TabsList>

              <div className="mt-4 text-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={fillDemoData}
                  className="bg-future-orange/10 border-future-orange text-future-orange hover:bg-future-orange hover:text-white"
                >
                  🎯 デモデータを入力
                </Button>
                <p className="text-xs text-muted-foreground mt-1">サンプルデータで動作を確認できます</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4 mt-6">
                {/* 共通フィールド */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">メールアドレス *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">{userType === "job_seeker" ? "お名前" : "担当者名"} *</Label>
                    <Input
                      id="displayName"
                      required
                      value={formData.displayName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">パスワード *</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">パスワード確認 *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>
                </div>

                <TabsContent value="job_seeker" className="space-y-4 mt-6">
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
                    <Label htmlFor="bio">自己紹介</Label>
                    <Textarea
                      id="bio"
                      placeholder="あなたの経験やスキル、興味のある分野について教えてください"
                      value={formData.bio}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="company" className="space-y-4 mt-6">
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
                </TabsContent>

                {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "登録中..." : "アカウントを作成"}
                </Button>
              </form>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              すでにアカウントをお持ちの方は{" "}
              <Link href="/auth/login" className="text-narashino-blue hover:underline font-medium">
                ログイン
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
