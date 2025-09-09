"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"job_seeker" | "company">("job_seeker")
  const router = useRouter()

  const handleDemoLogin = async () => {
    setIsLoading(true)

    try {
      const demoUser = {
        id: userType === "job_seeker" ? "demo-student-001" : "demo-company-001",
        email: userType === "job_seeker" ? "demo.student@toho-u.ac.jp" : "demo.company@gmail.com",
        user_type: userType,
        name: userType === "job_seeker" ? "田中 太郎" : "株式会社サンプル",
        is_demo: true,
        school_verified: userType === "job_seeker" ? true : false,
      }

      localStorage.setItem("demo_user", JSON.stringify(demoUser))
      localStorage.setItem("demo_mode", "true")

      // 少し遅延を追加してローディング状態を表示
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // ユーザータイプに応じてリダイレクト
      if (userType === "job_seeker") {
        router.push("/dashboard/job-seeker")
      } else {
        router.push("/dashboard/company")
      }
    } catch (error: unknown) {
      console.error("デモログインエラー:", error)
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
            <CardTitle className="text-2xl text-center">デモ体験</CardTitle>
            <CardDescription className="text-center">プラットフォームの機能をお試しください</CardDescription>
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
                <p className="text-sm text-muted-foreground text-center">学生・求職者向けの機能を体験</p>
              </TabsContent>
              <TabsContent value="company" className="mt-4">
                <p className="text-sm text-muted-foreground text-center">企業・採用担当者向けの機能を体験</p>
              </TabsContent>
            </Tabs>

            <div className="space-y-4">
              <Button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full bg-narashino-blue text-white hover:bg-narashino-blue/90 h-12 text-lg"
              >
                {isLoading ? "ログイン中..." : `🚀 ${userType === "job_seeker" ? "学生" : "企業"}デモで体験開始`}
              </Button>

              <div className="bg-future-orange/10 p-4 rounded-lg border border-future-orange/20">
                <p className="text-sm text-center text-muted-foreground mb-2">
                  <strong>デモアカウント情報</strong>
                </p>
                <div className="text-xs text-center space-y-1">
                  {userType === "job_seeker" ? (
                    <>
                      <p>👤 田中 太郎（東邦大学 情報工学科）</p>
                      <p>✅ 学校認証済み</p>
                      <p>📧 demo.student@toho-u.ac.jp</p>
                    </>
                  ) : (
                    <>
                      <p>🏢 株式会社サンプル</p>
                      <p>📍 習志野市津田沼1-1-1</p>
                      <p>📧 demo.company@gmail.com</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              実際のアカウントをお持ちの方は{" "}
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
