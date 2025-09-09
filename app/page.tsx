import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">な</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">ならしごと</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                サービスについて
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                お問い合わせ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            習志野市公式求人プラットフォーム
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            地域とつながる、
            <br />
            <span className="text-primary">未来をつくる</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance mb-12 max-w-2xl mx-auto">
            習志野市の学生と企業をつなぐ地域密着型求人プラットフォーム。
            認証済み学生制度と地域データ活用で、安心・安全なマッチングを実現します。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/jobs">お仕事を探す方はこちら</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/auth/signup?type=company">企業の方はこちら</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">3つの主要な魅力</h3>
            <p className="text-muted-foreground text-lg">ならしごとが選ばれる理由</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>手軽さ</CardTitle>
                <CardDescription>簡単登録で、すぐに求人検索・応募が可能</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  学校認証システムにより、信頼できる学生であることを証明。 企業も安心して採用活動を行えます。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>つながり</CardTitle>
                <CardDescription>地域の学生と企業をマッチング</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  習志野市内の企業と学生を直接つなぎ、 地域コミュニティの活性化に貢献します。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>発見</CardTitle>
                <CardDescription>地域データで新しい可能性を発見</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  習志野市のオープンデータを活用し、 地域の魅力や新しいビジネスチャンスを発見できます。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">登録学生数</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">参加企業数</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
              <div className="text-muted-foreground">マッチング成功数</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">満足度</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">今すぐ始めよう</h3>
          <p className="text-xl mb-8 opacity-90">習志野市での新しい出会いと機会が待っています</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Link href="/auth/signup?type=student">学生として登録</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/auth/signup?type=company">企業として登録</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">な</span>
                </div>
                <h4 className="font-bold">ならしごと</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                習志野市の学生と企業をつなぐ 地域密着型求人プラットフォーム
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">求職者向け</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/jobs" className="hover:text-foreground transition-colors">
                    求人検索
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup?type=student" className="hover:text-foreground transition-colors">
                    学生登録
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="hover:text-foreground transition-colors">
                    ログイン
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">企業向け</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/dashboard/company" className="hover:text-foreground transition-colors">
                    企業向けサービス
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup?type=company" className="hover:text-foreground transition-colors">
                    企業登録
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    料金プラン
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">サポート</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    ヘルプ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    利用規約
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 習志野市. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
