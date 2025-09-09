import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardDescription } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
export default function CompaniesManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-narashino-blue">企業管理</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">認証待ち企業</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-muted-foreground">前週比 +3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">認証済み企業</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">156</div>
            <p className="text-xs text-muted-foreground">前週比 +8</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">アクティブ企業</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-narashino-blue">89</div>
            <p className="text-xs text-muted-foreground">今月求人投稿あり</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>企業一覧</CardTitle>
          <CardDescription>登録企業の管理と認証状況の確認</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "株式会社習志野テック", status: "pending", plan: "フリー", jobs: 0 },
              { name: "習志野商事株式会社", status: "approved", plan: "スタンダード", jobs: 5 },
              { name: "地域密着カフェ", status: "approved", plan: "フリー", jobs: 2 },
              { name: "習志野市民病院", status: "pending", plan: "パートナー", jobs: 0 },
            ].map((company, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium">{company.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={company.status === "approved" ? "default" : "secondary"}>
                      {company.status === "approved" ? "認証済み" : "認証待ち"}
                    </Badge>
                    <Badge variant="outline">{company.plan}</Badge>
                    <span className="text-sm text-muted-foreground">求人数: {company.jobs}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {company.status === "pending" && (
                    <>
                      <Button size="sm" variant="default">
                        承認
                      </Button>
                      <Button size="sm" variant="outline">
                        却下
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="ghost">
                    詳細
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
