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
      <h2 className="text-lg font-bold text-foreground mb-4">カテゴリーから探す</h2>
      <div className="grid grid-cols-2 gap-4">
        {jobCategories.map((category, index) => {
          const imageUrl = categoryImages[category as keyof typeof categoryImages]

          return (
            <Link
              key={index}
              href={`/citizen/search-results?category=${encodeURIComponent(category)}`}
              className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-all duration-200 hover:border-primary"
            >
              <div className="w-full h-32 relative overflow-hidden">
                <Image
                  src={imageUrl || `/placeholder.svg?height=128&width=200&query=${encodeURIComponent(category)}`}
                  alt={category}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-center px-2 text-shadow">{category}</span>
                </div>
              </div>
              <div className="p-3">
                <span className="inline-block text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
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
