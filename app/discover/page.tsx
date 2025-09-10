"use client"

import { useState } from "react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { DiscoverMap } from "@/components/discover-map"
import { mapLocations } from "@/lib/map-data"

export default function DiscoverPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const recommendedItems = [
    {
      id: "1",
      type: "job",
      title: "カフェスタッフ募集",
      location: "津田沼駅",
      coordinates: { lat: 35.6938, lng: 140.0063 },
    },
    {
      id: "2",
      type: "shop",
      title: "丸々商店",
      location: "習志野市役所前",
      coordinates: { lat: 35.6762, lng: 140.0261 },
    },
    {
      id: "3",
      type: "job",
      title: "配送ドライバー",
      location: "新津田沼駅",
      coordinates: { lat: 35.6951, lng: 140.0089 },
    },
  ]

  const handleItemClick = (item: any) => {
    setSelectedLocation(item.id)
    // 地図の中心を移動する処理は DiscoverMap コンポーネントに委譲
  }

  return (
    <div className="min-h-screen bg-[#e5e5e5] pb-20">
      <div className="px-6 pt-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="キーワードを検索"
            className="w-full bg-[#ffffff] rounded-full px-4 py-3 text-[#666666] placeholder-[#666666] outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Map Component - 画面の大部分を占める */}
      <div className="h-96 mb-6">
        <DiscoverMap
          locations={mapLocations}
          selectedLocationId={selectedLocation}
          recommendedItems={recommendedItems}
        />
      </div>

      <div className="px-6 mb-6">
        <h3 className="text-[#000000] font-medium mb-3">おすすめ</h3>
        <div className="space-y-3">
          {recommendedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="bg-[#ffffff] rounded-lg p-4 shadow-sm cursor-pointer active:bg-[#f5f5f5] transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-[#000000] font-medium mb-1">{item.title}</h4>
                  <span className="inline-block bg-[#e5e5e5] text-[#666666] text-sm px-3 py-1 rounded">
                    {item.location}
                  </span>
                </div>
                <div className="text-[#666666]">{item.type === "job" ? "求人" : "お店"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MobileNavigation userType="citizen" />
    </div>
  )
}
