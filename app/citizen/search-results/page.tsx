"use client"

import { Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Filter } from "lucide-react"
import { demoJobs } from "@/lib/demo-data"
import { MobileNavigation } from "@/components/mobile-navigation"

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const category = searchParams.get("category")

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

    if (category) {
      filtered = filtered.filter((job) => job.category === category)
    }

    return filtered
  }, [query, category])

  const searchTitle = query ? `"${query}"の検索結果` : category ? `${category}の求人` : "検索結果"

  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5]">
        <Link href="/citizen" className="p-2">
          <ArrowLeft className="w-6 h-6 text-[#000000]" />
        </Link>
        <h1 className="font-medium text-[#000000]">{searchTitle}</h1>
        <button className="p-2">
          <Filter className="w-6 h-6 text-[#000000]" />
        </button>
      </div>

      <div className="p-6">
        <p className="text-[#666666] mb-6">{filteredJobs.length}件の求人が見つかりました</p>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Link
              key={job.id}
              href={`/citizen/jobs/${job.id}`}
              className="block bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-[#d9d9d9] rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-[#666666] text-xs">{job.category}</span>
                </div>
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
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#666666] mb-4">該当する求人が見つかりませんでした</p>
            <Link href="/citizen" className="text-[#007aff] underline">
              ホームに戻る
            </Link>
          </div>
        )}
      </div>

      <MobileNavigation />
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
