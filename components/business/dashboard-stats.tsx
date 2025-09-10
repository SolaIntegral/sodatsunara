import { TrendingUp, Users, Heart, MessageSquare } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "今月の来店数",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "お気に入り登録",
      value: "456",
      change: "+8%",
      trend: "up",
      icon: Heart,
    },
    {
      title: "新着口コミ",
      value: "23",
      change: "+15%",
      trend: "up",
      icon: MessageSquare,
    },
    {
      title: "応募者数",
      value: "12",
      change: "+3%",
      trend: "up",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className="w-8 h-8 text-[#007aff]" />
            <span className="text-sm text-[#007aff] font-medium">{stat.change}</span>
          </div>
          <h3 className="text-2xl font-bold text-[#000000] mb-1">{stat.value}</h3>
          <p className="text-sm text-[#666666]">{stat.title}</p>
        </div>
      ))}
    </div>
  )
}
