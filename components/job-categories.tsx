"use client"

import Link from "next/link"
import Image from "next/image"
import { jobCategories } from "@/lib/demo-data"

const categoryImages = {
  "アルバイト": "/job-categories/part-time.jpg",
  "正社員": "/job-categories/full-time.jpg",
  "パート": "/job-categories/part-time-2.jpg",
  "契約社員": "/job-categories/contract.jpg",
  "派遣": "/job-categories/temporary.jpg",
  "インターン": "/job-categories/intern.jpg",
  "飲食・サービス": "/job-categories/food-service.jpg",
  "小売・販売": "/job-categories/retail.jpg",
  "事務・オフィスワーク": "/job-categories/office.jpg",
  "教育・講師": "/job-categories/education.jpg",
  "医療・介護": "/job-categories/healthcare.jpg",
  "配送・物流": "/job-categories/logistics.jpg",
  "製造・軽作業": "/job-categories/manufacturing-new.jpg",
  "IT・技術": "/job-categories/it-tech-new.jpg",
}

export function JobCategories() {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-[#000000] mb-4">カテゴリーから探す</h2>
      <div className="grid grid-cols-2 gap-4">
        {jobCategories.map((category, index) => {
          const imageUrl = categoryImages[category as keyof typeof categoryImages]

          return (
            <Link
              key={index}
              href={`/citizen/search-results?category=${encodeURIComponent(category)}`}
              className="bg-[#ffffff] rounded-lg overflow-hidden border border-[#e5e5e5] hover:shadow-md transition-shadow"
            >
              <div className="w-full h-32 relative overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
                {imageUrl && (
                  <Image src={imageUrl || "/placeholder.svg"} alt={category} fill className="object-cover" />
                )}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                >
                  <span
                    className="text-sm font-bold text-center px-2"
                    style={{ color: "#ffffff", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                  >
                    {category}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <span
                  className={`inline-block text-sm px-2 py-1 rounded ${
                    index === 4 ? "bg-[#ffffff] text-[#000000]" : "bg-[#e5e5e5] text-[#666666]"
                  }`}
                >
                  {category}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
