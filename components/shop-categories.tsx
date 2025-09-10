"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { shopCategories } from "@/lib/demo-data"

const categoryImages = {
  レストラン: "/shop-categories/restaurant.jpg",
  カフェ: "/shop-categories/cafe.jpg",
  ショッピング: "/shop-categories/shopping.jpg",
  美容・健康: "/shop-categories/beauty.jpg",
  エンターテイメント: "/shop-categories/entertainment.jpg",
  サービス: "/shop-categories/service.jpg",
  カフェ・喫茶店: "/shop-categories/cafe-coffee.jpg",
  ラーメン: "/shop-categories/ramen.jpg",
  観光・レジャー: "/shop-categories/tourism.jpg",
  温泉・スパ: "/shop-categories/spa.jpg",
  文化・芸術: "/shop-categories/culture.jpg",
  スポーツ・フィットネス: "/shop-categories/sports.jpg",
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
            <div className="bg-[#f8f9fa] border border-[#e5e5e5] rounded-lg p-4 text-center hover:bg-[#e9ecef] transition-colors">
              <div className="w-full h-24 relative overflow-hidden rounded-lg mb-3">
                <Image
                  src={
                    categoryImages[category as keyof typeof categoryImages] ||
                    "/placeholder.svg?height=96&width=150&query=shop category" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg"
                  }
                  alt={category}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium text-[#000000]">{category}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
