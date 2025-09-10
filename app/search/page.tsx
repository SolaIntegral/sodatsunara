import { SearchHeader } from "@/components/search-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { JobCategories } from "@/components/job-categories"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="w-24 h-8 bg-[#d9d9d9] rounded"></div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-8 bg-[#d9d9d9] rounded"></div>
          <div className="w-10 h-10 bg-[#d9d9d9] rounded-full"></div>
        </div>
      </div>

      <div className="px-6">
        <SearchHeader />
        <JobCategories />
      </div>

      <MobileNavigation />
    </div>
  )
}
