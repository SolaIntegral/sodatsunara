import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-narashino-blue">分析・レポート</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">月間求人投稿数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">前月比 +12%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">月間応募数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,456</div>
            <p className="text-xs text-muted-foreground">前月比 +8%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">成約率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.4%</div>
            <p className="text-xs text-muted-foreground">前月比 +2.1%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">学生認証率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.9%</div>
            <p className="text-xs text-muted-foreground">認証済み学生の割合</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>人気職種ランキング</CardTitle>
            <CardDescription>応募数の多い職種トップ10</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { category: "接客・サービス", count: 456, growth: "+12%" },
                { category: "事務・オフィスワーク", count: 389, growth: "+8%" },
                { category: "IT・エンジニア", count: 234, growth: "+25%" },
                { category: "販売・営業", count: 198, growth: "+5%" },
                { category: "製造・軽作業", count: 167, growth: "-2%" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">{index + 1}</span>
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.count}件</span>
                    <Badge variant={item.growth.startsWith("+") ? "default" : "secondary"}>{item.growth}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>地域別求人分布</CardTitle>
            <CardDescription>習志野市内の地域別求人状況</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { area: "津田沼駅周辺", count: 89, percentage: "38%" },
                { area: "新習志野駅周辺", count: 67, percentage: "29%" },
                { area: "実籾駅周辺", count: 34, percentage: "15%" },
                { area: "大久保駅周辺", count: 28, percentage: "12%" },
                { area: "その他", count: 15, percentage: "6%" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{item.area}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.count}件</span>
                    <Badge variant="outline">{item.percentage}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>学校別利用状況</CardTitle>
          <CardDescription>認証済み学生の学校別分布</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { school: "日本大学生産工学部", students: 234, applications: 456 },
              { school: "千葉工業大学", students: 189, applications: 378 },
              { school: "習志野市立習志野高等学校", students: 156, applications: 234 },
              { school: "千葉県立津田沼高等学校", students: 123, applications: 189 },
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">{item.school}</h3>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>登録学生: {item.students}名</span>
                  <span>応募数: {item.applications}件</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
