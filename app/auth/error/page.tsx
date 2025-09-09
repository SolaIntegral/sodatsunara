import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AuthError() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-destructive">認証エラー</CardTitle>
          <CardDescription>認証処理中にエラーが発生しました</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            メールアドレスの確認やパスワードの入力に問題がある可能性があります。 もう一度お試しください。
          </p>

          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/auth/login">ログインページに戻る</Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/auth/signup">新規登録</Link>
            </Button>
          </div>

          <div className="text-center">
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              問題が解決しない場合はお問い合わせください
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
