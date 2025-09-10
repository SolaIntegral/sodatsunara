"use client"

import { useState } from "react"
import { MapPin, Filter } from "lucide-react"

interface Location {
  id: string
  name: string
  type: "shop" | "facility" | "job"
  category: string
  lat: number
  lng: number
  address: string
  image?: string
}

interface RecommendedItem {
  id: string
  type: "job" | "shop"
  title: string
  location: string
  coordinates: { lat: number; lng: number }
}

interface DiscoverMapProps {
  locations: Location[]
  selectedLocationId?: string | null
  recommendedItems?: RecommendedItem[]
}

export function DiscoverMap({ locations, selectedLocationId, recommendedItems }: DiscoverMapProps) {
  const [selectedType, setSelectedType] = useState<string>("all")

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "shop":
        return "🏪"
      case "facility":
        return "🏢"
      case "job":
        return "💼"
      default:
        return "📍"
    }
  }

  const filteredLocations = selectedType === "all" ? locations : locations.filter((loc) => loc.type === selectedType)

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          {[
            { key: "all", label: "すべて" },
            { key: "shop", label: "お店" },
            { key: "facility", label: "施設" },
            { key: "job", label: "求人" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedType(filter.key)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedType === filter.key ? "bg-[#007aff] text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="w-full h-80 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">習志野市内の場所</p>
            <p className="text-gray-400 text-xs mt-1">地図機能は準備中です</p>
          </div>
        </div>
      </div>

      <div className="p-4 max-h-60 overflow-y-auto">
        <h3 className="font-semibold text-sm mb-3">
          {selectedType === "all"
            ? "すべての場所"
            : selectedType === "shop"
              ? "お店"
              : selectedType === "facility"
                ? "施設"
                : "求人"}
          ({filteredLocations.length}件)
        </h3>
        <div className="space-y-2">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                selectedLocationId === location.id
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="text-lg">{getLocationIcon(location.type)}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{location.name}</p>
                <p className="text-xs text-gray-500">{location.category}</p>
                <p className="text-xs text-gray-400">{location.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
