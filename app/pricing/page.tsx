import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
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
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">料金プラン</h1>
          <p className="text-xl text-muted-foreground">企業様のニーズに合わせた3つのプランをご用意</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* フリープラン */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">フリープラン</CardTitle>
              <CardDescription>小規模企業・個人事業主向け</CardDescription>
              <div className="text-3xl font-bold">
                ¥0<span className="text-sm font-normal">/月</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">求人投稿 1件まで</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">基本的な応募者管理</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">メール通知</span>
                </li>
              </ul>
              <Button className="w-full" asChild>
                <Link href="/auth/signup?type=company&plan=free">今すぐ始める</Link>
              </Button>
            </CardContent>
          </Card>

          {/* スタンダードプラン */}
          <Card className="relative border-primary">
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">人気</Badge>
            <CardHeader>
              <CardTitle className="text-2xl">スタンダードプラン</CardTitle>
              <CardDescription>中小企業向け</CardDescription>
              <div className="text-3xl font-bold">
                ¥9,800<span className="text-sm font-normal">/月</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">求人投稿 10件まで</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">詳細な応募者管理</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">メッセージ機能</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">基本統計レポート</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">優先表示</span>
                </li>
              </ul>
              <Button className="w-full" asChild>
                <Link href="/auth/signup?type=company&plan=standard">今すぐ始める</Link>
              </Button>
            </CardContent>
          </Card>

          {/* パートナープラン */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">パートナープラン</CardTitle>
              <CardDescription>大企業・自治体向け</CardDescription>
              <div className="text-3xl font-bold">
                ¥29,800<span className="text-sm font-normal">/月</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">求人投稿 無制限</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">高度な応募者管理</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">地域データ活用機能</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">詳細統計・分析</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">専任サポート</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">カスタム機能</span>
                </li>
              </ul>
              <Button className="w-full" asChild>
                <Link href="/auth/signup?type=company&plan=partner">今すぐ始める</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">ご不明な点がございましたら、お気軽にお問い合わせください。</p>
          <Button variant="outline" asChild>
            <Link href="/contact">お問い合わせ</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
