import { MapPin, Layers } from "lucide-react"

export function RegionalMap() {
  return (
    <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#000000]">インタラクティブマップ</h3>
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-[#666666]" />
          <select className="border border-[#e5e5e5] rounded px-3 py-1 text-sm text-[#666666]">
            <option>人口統計</option>
            <option>周辺施設</option>
            <option>地域イベント</option>
          </select>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="h-96 bg-[#e5e5e5] rounded-lg flex items-center justify-center relative">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-[#007aff] mx-auto mb-4" />
          <p className="text-[#666666]">習志野市エリアマップ</p>
        </div>

        {/* Sample data points */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-[#007aff] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#ff3b30] rounded-full"></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-[#007aff] rounded-full"></div>
      </div>

      <div className="mt-4 flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#007aff] rounded-full"></div>
          <span className="text-[#666666]">高密度エリア</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#ff3b30] rounded-full"></div>
          <span className="text-[#666666]">競合店舗</span>
        </div>
      </div>
    </div>
  )
}
