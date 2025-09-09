"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

  const fillDemoCredentials = () => {
    if (userType === "job_seeker") {
      setEmail("demo.student@toho-u.ac.jp")
      setPassword("demo123456")
    } else {
      setEmail("demo.company@gmail.com")
      setPassword("demo123456")
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const demoUser = {
        id: userType === "job_seeker" ? "demo-student-001" : "demo-company-001",
        email: userType === "job_seeker" ? "demo.student@toho-u.ac.jp" : "demo.company@gmail.com",
        user_type: userType,
        name: userType === "job_seeker" ? "田中 太郎" : "株式会社サンプル",
        is_demo: true,
        school_verified: userType === "job_seeker" ? true : false,
      }

      // デモユーザー情報をローカルストレージに保存
      localStorage.setItem("demo_user", JSON.stringify(demoUser))
      localStorage.setItem("demo_mode", "true")

      // ユーザータイプに応じてリダイレクト
      if (userType === "job_seeker") {
        router.push("/dashboard/job-seeker")
      } else {
        router.push("/dashboard/company")
      }
    } catch (error: unknown) {
      setError("デモログインに失敗しました")
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

            <div className="mb-4 text-center space-y-2">
              <Button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full bg-future-orange text-white hover:bg-future-orange/90"
              >
                🚀 {userType === "job_seeker" ? "学生" : "企業"}デモアカウントでログイン
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={fillDemoCredentials}
                className="w-full bg-future-orange/10 border-future-orange text-future-orange hover:bg-future-orange hover:text-white"
              >
                📝 デモデータを入力
              </Button>
              <p className="text-xs text-muted-foreground">
                認証済みの{userType === "job_seeker" ? "学生" : "企業"}アカウントですぐに体験できます
              </p>
            </div>

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
