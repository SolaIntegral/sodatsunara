"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { shopCategories } from "@/lib/demo-data"

const categoryImages = {
  "レストラン": "/shop-categories/restaurant.jpg",
  "カフェ": "/shop-categories/cafe.jpg",
  "ショッピング": "/shop-categories/shopping.jpg",
  "美容・健康": "/shop-categories/beauty.jpg",
  "エンターテイメント": "/shop-categories/entertainment.jpg",
  "サービス": "/shop-categories/service.jpg",
  "カフェ・喫茶店": "/shop-categories/cafe-coffee.jpg",
  "ラーメン": "/shop-categories/ramen.jpg",
  "観光・レジャー": "/shop-categories/tourism.jpg",
  "温泉・スパ": "/shop-categories/spa.jpg",
  "文化・芸術": "/shop-categories/culture.jpg",
  "スポーツ・フィットネス": "/shop-categories/sports.jpg",
}

export function ShopCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {shopCategories.map((category) => (
          <Link
            key={category}
            href={`/citizen/search-results?category=${encodeURIComponent(category)}&type=shop`}
            className="block"
          >
            <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary">
              <div className="w-full h-28 relative overflow-hidden">
                <Image
                  src={
                    categoryImages[category as keyof typeof categoryImages] ||
                    `/placeholder.svg?height=112&width=200&query=${encodeURIComponent(category) || "/placeholder.svg"}`
                  }
                  alt={category}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <span className="text-sm font-semibold text-foreground">{category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
