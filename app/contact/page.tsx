import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">な</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">ならしごと</h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">ログイン</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>新規登録</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">お問い合わせ</h1>
            <p className="text-xl text-muted-foreground">
              ご質問やご要望がございましたら、お気軽にお問い合わせください。
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>お問い合わせフォーム</CardTitle>
              <CardDescription>通常、1-2営業日以内にご返信いたします。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">お名前（姓）</Label>
                  <Input id="firstName" placeholder="山田" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">お名前（名）</Label>
                  <Input id="lastName" placeholder="太郎" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" type="email" placeholder="example@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">所属（任意）</Label>
                <Input id="organization" placeholder="会社名・学校名など" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">件名</Label>
                <Input id="subject" placeholder="お問い合わせの件名" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">お問い合わせ内容</Label>
                <Textarea id="message" placeholder="お問い合わせ内容をご記入ください" className="min-h-[120px]" />
              </div>

              <Button className="w-full">送信する</Button>
            </CardContent>
          </Card>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">運営事務局</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>習志野市 産業振興課</strong>
                  </p>
                  <p>〒275-8601</p>
                  <p>千葉県習志野市鷺沼2丁目1番1号</p>
                  <p>TEL: 047-453-7395</p>
                  <p>受付時間: 平日 8:30-17:15</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">よくある質問</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Q. 利用料金はかかりますか？</p>
                    <p className="text-muted-foreground">A. 求職者の方は完全無料でご利用いただけます。</p>
                  </div>
                  <div>
                    <p className="font-medium">Q. 学校認証はどのように行われますか？</p>
                    <p className="text-muted-foreground">
                      A. 学校のメールアドレスで登録いただくことで自動認証されます。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
