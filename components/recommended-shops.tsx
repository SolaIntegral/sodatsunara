"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const recommendedShops = [
  {
    id: 1,
    name: "カフェ・ド・津田沼",
    category: "カフェ・喫茶店",
    location: "津田沼駅",
    rating: 4.5,
    image: "/-----------.jpg",
    tags: ["WiFi完備", "電源あり", "静か"],
    description: "落ち着いた雰囲気でゆっくりできるカフェです",
  },
  {
    id: 2,
    name: "習志野ラーメン横丁",
    category: "ラーメン",
    location: "新津田沼駅",
    rating: 4.3,
    image: "/----------.jpg",
    tags: ["深夜営業", "駅近", "人気店"],
    description: "地元で愛される老舗ラーメン店",
  },
  {
    id: 3,
    name: "谷津干潟自然観察センター",
    category: "観光・レジャー",
    location: "谷津干潟",
    rating: 4.7,
    image: "/---------.jpg",
    tags: ["自然", "ファミリー", "教育"],
    description: "野鳥観察や自然学習ができる施設",
  },
  {
    id: 4,
    name: "イオンモール津田沼",
    category: "ショッピング",
    location: "津田沼駅",
    rating: 4.2,
    image: "/--------------.jpg",
    tags: ["大型店", "駐車場", "フードコート"],
    description: "ファッションからグルメまで何でも揃う",
  },
]

export function RecommendedShops() {
  const [viewAll, setViewAll] = useState(false)
  const displayShops = viewAll ? recommendedShops : recommendedShops.slice(0, 2)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">訪れるのにおすすめな店</h2>
        <button
          onClick={() => setViewAll(!viewAll)}
          className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
        >
          {viewAll ? "閉じる" : "すべて見る"}
        </button>
      </div>

      <div className="space-y-4">
        {displayShops.map((shop) => (
          <Link key={shop.id} href={`/shops/${shop.id}`}>
            <div className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-all duration-200 hover:border-primary/50">
              <div className="flex gap-4">
                <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={shop.image || "/placeholder.svg?height=80&width=80&query=shop"}
                    alt={shop.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <h3 className="font-semibold text-foreground text-base truncate">{shop.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full font-medium">
                      {shop.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{shop.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-muted-foreground">{shop.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{shop.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {shop.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
