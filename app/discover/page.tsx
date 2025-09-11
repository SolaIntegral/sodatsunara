"use client"

import { useState } from "react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { DiscoverMap } from "@/components/discover-map"
import { mapLocations } from "@/lib/map-data"
import { Search } from "lucide-react"

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
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-6 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="キーワードを検索"
            className="w-full bg-card rounded-full pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground outline-none shadow-sm border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="px-4 mb-6">
        <DiscoverMap
          locations={mapLocations}
          selectedLocationId={selectedLocation}
          recommendedItems={recommendedItems}
        />
      </div>

      <div className="px-4 mb-6">
        <h3 className="text-foreground font-semibold text-lg mb-4">おすすめ</h3>
        <div className="space-y-3">
          {recommendedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="bg-card rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md active:scale-[0.98] transition-all border border-border"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="text-foreground font-medium mb-2 text-base">{item.title}</h4>
                  <span className="inline-block bg-muted text-muted-foreground text-sm px-3 py-1.5 rounded-full">
                    {item.location}
                  </span>
                </div>
                <div className="ml-4">
                  <span className="bg-primary/10 text-primary text-sm px-3 py-1.5 rounded-full font-medium">
                    {item.type === "job" ? "求人" : "お店"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MobileNavigation userType="citizen" />
    </div>
  )
}
