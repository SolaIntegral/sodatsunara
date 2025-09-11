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
    <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {[
            { key: "all", label: "すべて" },
            { key: "shop", label: "お店" },
            { key: "facility", label: "施設" },
            { key: "job", label: "求人" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedType(filter.key)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedType === filter.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="w-full h-80 bg-muted/30 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium text-base mb-1">習志野市内の場所</p>
            <p className="text-muted-foreground text-sm">地図機能は準備中です</p>
          </div>
        </div>
      </div>

      <div className="p-4 max-h-60 overflow-y-auto">
        <h3 className="font-semibold text-sm mb-3 text-foreground">
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
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                selectedLocationId === location.id
                  ? "bg-primary/10 border-primary/20"
                  : "bg-card border-border hover:bg-muted/50"
              }`}
            >
              <div className="text-lg">{getLocationIcon(location.type)}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{location.name}</p>
                <p className="text-xs text-muted-foreground">{location.category}</p>
                <p className="text-xs text-muted-foreground/80">{location.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
