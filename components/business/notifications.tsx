import { Bell, Gift, TrendingUp, Users } from "lucide-react"

export function Notifications() {
  const notifications = [
    {
      icon: Gift,
      title: "補助金情報",
      message: "習志野市中小企業支援補助金の申請受付が開始されました",
      time: "2時間前",
      type: "info",
    },
    {
      icon: TrendingUp,
      title: "売上レポート",
      message: "先月の売上が前年同月比15%増加しました",
      time: "1日前",
      type: "success",
    },
    {
      icon: Users,
      title: "新規応募",
      message: "アルバイト求人に3件の新しい応募があります",
      time: "2日前",
      type: "info",
    },
  ]

  return (
    <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="w-5 h-5 text-[#007aff]" />
        <h3 className="text-lg font-bold text-[#000000]">運営からのお知らせ</h3>
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="flex space-x-3 p-3 rounded-lg bg-[#e5e5e5]">
            <notification.icon className="w-5 h-5 text-[#007aff] flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-[#000000] mb-1">{notification.title}</h4>
              <p className="text-sm text-[#666666] mb-2">{notification.message}</p>
              <span className="text-xs text-[#666666]">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-[#007aff] hover:underline">すべてのお知らせを見る</button>
    </div>
  )
}
