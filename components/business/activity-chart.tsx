export function ActivityChart() {
  return (
    <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#000000]">来店・お気に入り登録数の推移</h3>
        <select className="border border-[#e5e5e5] rounded px-3 py-1 text-sm text-[#666666]">
          <option>過去30日</option>
          <option>過去7日</option>
          <option>過去3ヶ月</option>
        </select>
      </div>

      {/* Chart placeholder */}
      <div className="h-64 bg-[#e5e5e5] rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#007aff] rounded-full mx-auto mb-4 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-[#ffffff]" />
          </div>
          <p className="text-[#666666]">グラフデータを読み込み中...</p>
        </div>
      </div>
    </div>
  )
}

import { TrendingUp } from "lucide-react"
