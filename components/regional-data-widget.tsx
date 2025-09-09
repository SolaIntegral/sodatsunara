import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar } from "lucide-react"

export async function RegionalDataWidget() {
  const supabase = await createClient()

  // 地域イベントを取得
  const { data: events } = await supabase
    .from("regional_events")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true })
    .limit(3)

  // 地域データを取得
  const { data: regionalData } = await supabase
    .from("regional_data")
    .select("data_type, data_content")
    .eq("is_active", true)

  const populationData = regionalData?.find((d) => d.data_type === "population")?.data_content
  const businessData = regionalData?.find((d) => d.data_type === "business")?.data_content
  const educationData = regionalData?.find((d) => d.data_type === "education")?.data_content

  return (
    <div className="space-y-6">
      {/* 地域統計 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            習志野市の概要
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {populationData && (
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {populationData.total_population?.toLocaleString()}人
                </div>
                <div className="text-sm text-muted-foreground">総人口</div>
              </div>
            )}
            {businessData && (
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {businessData.total_businesses?.toLocaleString()}社
                </div>
                <div className="text-sm text-muted-foreground">事業所数</div>
              </div>
            )}
            {educationData && (
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  {educationData.total_students?.toLocaleString()}人
                </div>
                <div className="text-sm text-muted-foreground">学生数</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 地域イベント */}
      {events && events.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              注目のイベント
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event: any) => (
                <div key={event.id} className="border-l-4 border-future-orange pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{new Date(event.start_date).toLocaleDateString("ja-JP")}</Badge>
                        <span className="text-sm text-muted-foreground">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
