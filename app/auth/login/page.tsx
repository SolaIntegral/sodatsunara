"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"job_seeker" | "company">("job_seeker")
  const router = useRouter()

  const handleDemoLogin = async (demoType: "job_seeker" | "company") => {
    console.log("[v0] デモログイン開始 - ユーザータイプ:", demoType)
    setIsLoading(true)

    try {
      const demoUser =
        demoType === "job_seeker"
          ? {
              id: "demo-student-001",
              email: "demo.student@toho-u.ac.jp",
              user_type: "job_seeker",
              name: "田中 太郎",
              is_demo: true,
              school_verified: true,
              school_name: "東邦大学",
              major: "情報工学科",
            }
          : {
              id: "demo-company-001",
              email: "demo.company@narashino-corp.jp",
              user_type: "company",
              name: "習志野商事株式会社",
              is_demo: true,
              company_verified: true,
              plan: "standard",
            }

      console.log("[v0] デモユーザー情報:", demoUser)

      localStorage.setItem("demo_mode", "true")
      localStorage.setItem("demo_user", JSON.stringify(demoUser))
      document.cookie = "demo_mode=true; path=/; max-age=86400"
      document.cookie = `demo_user_type=${demoType}; path=/; max-age=86400`

      console.log("[v0] ローカルストレージとクッキー設定完了")

      await new Promise((resolve) => setTimeout(resolve, 500))

      const redirectPath = demoType === "job_seeker" ? "/dashboard/job-seeker" : "/dashboard/company"
      console.log("[v0] リダイレクト実行:", redirectPath)

      try {
        router.push(redirectPath)
        console.log("[v0] router.push実行完了")
      } catch (routerError) {
        console.log("[v0] router.pushが失敗、window.location.hrefを使用")
        window.location.href = redirectPath
      }

      setTimeout(() => {
        if (window.location.pathname === "/auth/login") {
          console.log("[v0] フォールバックリダイレクト実行")
          window.location.replace(redirectPath)
        }
      }, 2000)
    } catch (error) {
      console.error("[v0] デモログインエラー:", error)
      setError("デモログインに失敗しました。再度お試しください。")
    } finally {
      setTimeout(() => setIsLoading(false), 1000)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      // ユーザータイプに応じてリダイレクト
      if (userType === "job_seeker") {
        router.push("/dashboard/job-seeker")
      } else {
        router.push("/dashboard/company")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "ログインに失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-narashino-blue mb-2">ならしごと</h1>
          <p className="text-muted-foreground">習志野市の地域密着型求人プラットフォーム</p>
        </div>

        <Card className="mb-6 border-2 border-future-orange/20 bg-gradient-to-r from-future-orange/5 to-narashino-blue/5">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-narashino-blue flex items-center justify-center gap-2">
              🚀 デモ体験
              <Badge variant="secondary" className="bg-future-orange text-white">
                無料
              </Badge>
            </CardTitle>
            <CardDescription>プラットフォームの機能をお試しください</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => handleDemoLogin("job_seeker")}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-narashino-blue to-narashino-blue/80 hover:from-narashino-blue/90 hover:to-narashino-blue/70 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    体験開始中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">🎓 学生・求職者として体験</div>
                )}
              </Button>

              <Button
                onClick={() => handleDemoLogin("company")}
                disabled={isLoading}
                variant="outline"
                className="w-full border-2 border-future-orange text-future-orange hover:bg-future-orange hover:text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-future-orange/30 border-t-future-orange rounded-full animate-spin" />
                    体験開始中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">🏢 企業・採用担当者として体験</div>
                )}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>• 学生デモ: 求人検索・応募・プロフィール管理</p>
              <p>• 企業デモ: 求人投稿・応募者管理・統計分析</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">ログイン</CardTitle>
            <CardDescription className="text-center">アカウントにログインしてください</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={userType}
              onValueChange={(value) => setUserType(value as "job_seeker" | "company")}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="job_seeker">求職者</TabsTrigger>
                <TabsTrigger value="company">企業</TabsTrigger>
              </TabsList>
              <TabsContent value="job_seeker" className="mt-4">
                <p className="text-sm text-muted-foreground text-center">学生・求職者の方はこちら</p>
              </TabsContent>
              <TabsContent value="company" className="mt-4">
                <p className="text-sm text-muted-foreground text-center">企業・採用担当者の方はこちら</p>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "ログイン中..." : "ログイン"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              アカウントをお持ちでない方は{" "}
              <Link href="/auth/signup" className="text-narashino-blue hover:underline font-medium">
                新規登録
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
