"use client"

import Link from "next/link"
import { jobCategories } from "@/lib/demo-data"

export function JobCategories() {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-[#000000] mb-4">カテゴリーから探す</h2>
      <div className="grid grid-cols-2 gap-4">
        {jobCategories.map((category, index) => (
          <Link
            key={index}
            href={`/citizen/search-results?category=${encodeURIComponent(category)}`}
            className="bg-[#ffffff] rounded-lg overflow-hidden border border-[#e5e5e5] hover:shadow-md transition-shadow"
          >
            <div
              className={`w-full h-32 ${index === 4 ? "bg-[#595959]" : "bg-[#d9d9d9]"} flex items-center justify-center`}
            >
              <span className="text-white text-sm font-medium">{category}</span>
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
        ))}
      </div>
    </div>
  )
}
