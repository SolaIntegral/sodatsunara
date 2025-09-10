"use client"

import { useState } from "react"
import Link from "next/link"

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
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#000000]">訪れるのにおすすめな店</h2>
        <button onClick={() => setViewAll(!viewAll)} className="text-sm text-[#007aff] font-medium">
          {viewAll ? "閉じる" : "すべて見る"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {displayShops.map((shop) => (
          <Link key={shop.id} href={`/shops/${shop.id}`}>
            <div className="bg-white rounded-lg border border-[#e5e5e5] p-4 active:bg-[#f8f9fa]">
              <div className="flex gap-3">
                <img
                  src={shop.image || "/placeholder.svg"}
                  alt={shop.name}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#000000] mb-1 truncate">{shop.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-[#e5e5e5] text-[#666666] px-2 py-1 rounded">{shop.category}</span>
                    <span className="text-xs text-[#666666]">{shop.location}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-[#666666]">{shop.rating}</span>
                  </div>
                  <p className="text-xs text-[#666666] mb-2 line-clamp-2">{shop.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {shop.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="text-xs bg-[#f0f0f0] text-[#595959] px-2 py-1 rounded">
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
