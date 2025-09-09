import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BarChart3, Users, Building, GraduationCap, Train } from "lucide-react"
import Link from "next/link"

interface RegionalData {
  id: string
  data_type: string
  title: string
  description: string | null
  data_source: string | null
  data_content: any
  updated_at: string
}

export default async function RegionalDataPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/admin/login")
  }

  // 管理者権限確認
  const { data: admin } = await supabase.from("admins").select("id, is_active").eq("id", user.id).single()

  if (!admin || !admin.is_active) {
    redirect("/admin/login")
  }

  // 地域データを取得
  const { data: regionalData } = await supabase
    .from("regional_data")
    .select("*")
    .eq("is_active", true)
    .order("updated_at", { ascending: false })

  const getDataTypeIcon = (type: string) => {
    const icons: { [key: string]: any } = {
      population: Users,
      business: Building,
      education: GraduationCap,
      transportation: Train,
      events: BarChart3,
    }
    return icons[type] || BarChart3
  }

  const getDataTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      population: "人口統計",
      business: "事業所統計",
      education: "教育機関",
      transportation: "交通アクセス",
      events: "イベント",
    }
    return labels[type] || type
  }

  const formatDataContent = (data: any, type: string) => {
    if (!data) return null

    switch (type) {
      case "population":
        return (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">総人口:</span>
              <span className="font-medium ml-2">{data.total_population?.toLocaleString()}人</span>
            </div>
            <div>
              <span className="text-muted-foreground">世帯数:</span>
              <span className="font-medium ml-2">{data.households?.toLocaleString()}世帯</span>
            </div>
            {data.age_groups && (
              <div className="col-span-2">
                <span className="text-muted-foreground">年齢構成:</span>
                <div className="mt-1 space-y-1">
                  <div>0-14歳: {data.age_groups["0-14"]?.toLocaleString()}人</div>
                  <div>15-64歳: {data.age_groups["15-64"]?.toLocaleString()}人</div>
                  <div>65歳以上: {data.age_groups["65+"]?.toLocaleString()}人</div>
                </div>
              </div>
            )}
          </div>
        )
      case "business":
        return (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">総事業所数:</span>
                <span className="font-medium ml-2">{data.total_businesses?.toLocaleString()}社</span>
              </div>
              <div>
                <span className="text-muted-foreground">総従業員数:</span>
                <span className="font-medium ml-2">{data.total_employees?.toLocaleString()}人</span>
              </div>
            </div>
            {data.by_industry && (
              <div>
                <span className="text-muted-foreground">業界別事業所数:</span>
                <div className="mt-1 grid grid-cols-2 gap-1">
                  <div>製造業: {data.by_industry.manufacturing?.toLocaleString()}社</div>
                  <div>小売業: {data.by_industry.retail?.toLocaleString()}社</div>
                  <div>サービス業: {data.by_industry.services?.toLocaleString()}社</div>
                  <div>IT業: {data.by_industry.it?.toLocaleString()}社</div>
                </div>
              </div>
            )}
          </div>
        )
      case "education":
        return (
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground">総学生数:</span>
              <span className="font-medium ml-2">{data.total_students?.toLocaleString()}人</span>
            </div>
            {data.universities && (
              <div>
                <span className="text-muted-foreground">主要大学:</span>
                <div className="mt-1 space-y-1">
                  {data.universities.map((uni: any, index: number) => (
                    <div key={index}>
                      {uni.name}: {uni.students?.toLocaleString()}人
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <span className="text-muted-foreground">高等学校数:</span>
              <span className="font-medium ml-2">{data.high_schools}校</span>
            </div>
          </div>
        )
      case "transportation":
        return (
          <div className="space-y-3 text-sm">
            {data.stations && (
              <div>
                <span className="text-muted-foreground">主要駅:</span>
                <div className="mt-1 space-y-2">
                  {data.stations.map((station: any, index: number) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-3">
                      <div className="font-medium">{station.name}</div>
                      <div className="text-xs text-muted-foreground">路線: {station.lines?.join(", ")}</div>
                      <div className="text-xs text-muted-foreground">
                        1日平均利用者数: {station.daily_users?.toLocaleString()}人
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      default:
        return <pre className="text-xs text-muted-foreground overflow-auto">{JSON.stringify(data, null, 2)}</pre>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-narashino-blue/5 to-future-orange/5">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ダッシュボードに戻る
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-narashino-blue">地域データ管理</h1>
            <p className="text-muted-foreground">習志野市のオープンデータ・統計情報</p>
          </div>
          <Button>新しいデータを追加</Button>
        </div>

        {/* 地域データ一覧 */}
        <div className="space-y-6">
          {regionalData && regionalData.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">地域データ {regionalData.length}件</h2>
              </div>

              <div className="grid gap-6">
                {regionalData.map((data: RegionalData) => {
                  const IconComponent = getDataTypeIcon(data.data_type)
                  return (
                    <Card key={data.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <IconComponent className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{data.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{getDataTypeLabel(data.data_type)}</Badge>
                                {data.data_source && (
                                  <span className="text-sm text-muted-foreground">出典: {data.data_source}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            更新: {new Date(data.updated_at).toLocaleDateString("ja-JP")}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {data.description && <p className="text-muted-foreground mb-4">{data.description}</p>}

                        <div className="bg-gray-50 rounded-lg p-4">
                          {formatDataContent(data.data_content, data.data_type)}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            編集
                          </Button>
                          <Button size="sm" variant="outline">
                            データをエクスポート
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-muted-foreground mb-4">地域データがありません</div>
                <Button>最初のデータを追加する</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
