import { Users, Building, Calendar, TrendingUp } from "lucide-react"

export function DataSummary() {
  const summaryData = [
    {
      icon: Users,
      title: "商圏人口",
      value: "45,678人",
      subtitle: "半径1km圏内",
    },
    {
      icon: Building,
      title: "競合店舗数",
      value: "12店舗",
      subtitle: "同業種",
    },
    {
      icon: Calendar,
      title: "地域イベント",
      value: "8件",
      subtitle: "今月開催予定",
    },
    {
      icon: TrendingUp,
      title: "成長率",
      value: "+5.2%",
      subtitle: "前年同期比",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
        <h3 className="text-lg font-bold text-[#000000] mb-6">分析サマリー</h3>

        <div className="space-y-4">
          {summaryData.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-[#e5e5e5] rounded-lg">
              <item.icon className="w-8 h-8 text-[#007aff]" />
              <div className="flex-1">
                <h4 className="font-medium text-[#000000]">{item.title}</h4>
                <p className="text-xl font-bold text-[#000000]">{item.value}</p>
                <p className="text-sm text-[#666666]">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
        <h3 className="text-lg font-bold text-[#000000] mb-4">おすすめアクション</h3>
        <div className="space-y-3">
          <div className="p-3 bg-[#e5e5e5] rounded-lg">
            <p className="text-sm text-[#000000]">近隣の大学生をターゲットにしたアルバイト求人を検討してみましょう</p>
          </div>
          <div className="p-3 bg-[#e5e5e5] rounded-lg">
            <p className="text-sm text-[#000000]">来月の地域イベントに合わせた特別メニューの企画をおすすめします</p>
          </div>
        </div>
      </div>
    </div>
  )
}
