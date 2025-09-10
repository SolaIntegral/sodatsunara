"use client"

import { Suspense, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Filter } from "lucide-react"
import { demoJobs, demoShops } from "@/lib/demo-data"
import { MobileNavigation } from "@/components/mobile-navigation"

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const category = searchParams.get("category")
  const type = searchParams.get("type") // 'job' or 'shop'
  const [activeTab, setActiveTab] = useState<"jobs" | "shops">(type === "shop" ? "shops" : "jobs")

  const filteredJobs = useMemo(() => {
    let filtered = demoJobs

    if (query) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.location.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (category && activeTab === "jobs") {
      filtered = filtered.filter((job) => job.category === category)
    }

    return filtered
  }, [query, category, activeTab])

  const filteredShops = useMemo(() => {
    let filtered = demoShops

    if (query) {
      filtered = filtered.filter(
        (shop) =>
          shop.name.toLowerCase().includes(query.toLowerCase()) ||
          shop.category.toLowerCase().includes(query.toLowerCase()) ||
          shop.location.toLowerCase().includes(query.toLowerCase()) ||
          shop.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (category && activeTab === "shops") {
      filtered = filtered.filter((shop) => shop.category === category)
    }

    return filtered
  }, [query, category, activeTab])

  const searchTitle = query ? `"${query}"の検索結果` : category ? `${category}の検索結果` : "検索結果"
  const currentResults = activeTab === "jobs" ? filteredJobs : filteredShops
  const resultCount = currentResults.length

  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5]">
        <Link href="/search" className="p-2">
          <ArrowLeft className="w-6 h-6 text-[#000000]" />
        </Link>
        <h1 className="font-medium text-[#000000]">{searchTitle}</h1>
        <button className="p-2">
          <Filter className="w-6 h-6 text-[#000000]" />
        </button>
      </div>

      <div className="flex border-b border-[#e5e5e5]">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "jobs" ? "text-[#007aff] border-b-2 border-[#007aff]" : "text-[#666666]"
          }`}
        >
          求人 ({filteredJobs.length})
        </button>
        <button
          onClick={() => setActiveTab("shops")}
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "shops" ? "text-[#007aff] border-b-2 border-[#007aff]" : "text-[#666666]"
          }`}
        >
          お店 ({filteredShops.length})
        </button>
      </div>

      <div className="p-6">
        <p className="text-[#666666] mb-6">
          {resultCount}件の{activeTab === "jobs" ? "求人" : "お店"}が見つかりました
        </p>

        <div className="space-y-4">
          {activeTab === "jobs"
            ? filteredJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/citizen/jobs/${job.id}`}
                  className="block bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <img
                      src={job.image || "/placeholder.svg"}
                      alt={job.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-[#000000] mb-1">{job.title}</h3>
                      <p className="text-sm text-[#666666] mb-2">{job.company}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-[#e5e5e5] text-[#666666] text-xs px-2 py-1 rounded">{job.location}</span>
                        <span className="bg-[#e5e5e5] text-[#666666] text-xs px-2 py-1 rounded">{job.salary}</span>
                      </div>
                      <p className="text-sm text-[#666666] line-clamp-2">{job.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            : filteredShops.map((shop) => (
                <Link
                  key={shop.id}
                  href={`/shops/${shop.id}`}
                  className="block bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <img
                      src={shop.image || "/placeholder.svg"}
                      alt={shop.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-[#000000] mb-1">{shop.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-[#e5e5e5] text-[#666666] px-2 py-1 rounded">{shop.category}</span>
                        <span className="text-xs text-[#666666]">{shop.location}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-[#666666]">{shop.rating}</span>
                      </div>
                      <p className="text-sm text-[#666666] line-clamp-2">{shop.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {shop.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="text-xs bg-[#f0f0f0] text-[#595959] px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        {resultCount === 0 && (
          <div className="text-center py-12">
            <p className="text-[#666666] mb-4">
              該当する{activeTab === "jobs" ? "求人" : "お店"}が見つかりませんでした
            </p>
            <Link href="/search" className="text-[#007aff] underline">
              検索に戻る
            </Link>
          </div>
        )}
      </div>

      <MobileNavigation userType="citizen" />
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  )
}
