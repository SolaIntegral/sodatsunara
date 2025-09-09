import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-narashino-blue mb-2">ならしごと</h1>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">メール認証</CardTitle>
            <CardDescription>登録ありがとうございます</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                ご登録いただいたメールアドレスに認証リンクを送信しました。
                メールをご確認いただき、認証を完了してください。
              </p>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p>メールが届かない場合は、以下をご確認ください：</p>
              <ul className="text-left space-y-1 ml-4">
                <li>• 迷惑メールフォルダをご確認ください</li>
                <li>• メールアドレスに誤りがないかご確認ください</li>
                <li>• しばらく時間をおいてから再度お試しください</li>
              </ul>
            </div>

            <Button asChild className="w-full">
              <Link href="/auth/complete-profile">プロフィール作成に進む</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
