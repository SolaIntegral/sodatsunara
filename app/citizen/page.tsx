import { MobileNavigation } from "@/components/mobile-navigation"
import { SearchHeader } from "@/components/search-header"
import { RecommendedJobs } from "@/components/recommended-jobs"
import { NewJobPostings } from "@/components/new-job-postings"

export default function CitizenHomePage() {
  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Header with placeholder elements */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="w-24 h-8 bg-[#d9d9d9] rounded"></div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-8 bg-[#d9d9d9] rounded"></div>
          <div className="w-10 h-10 bg-[#d9d9d9] rounded-full"></div>
        </div>
      </div>

      <div className="px-6">
        <SearchHeader />

        {/* Hero section with carousel dots */}
        <div className="my-8">
          <div className="w-full h-48 bg-[#e5e5e5] rounded-lg mb-4"></div>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-[#000000] rounded-full"></div>
            <div className="w-2 h-2 bg-[#cccccc] rounded-full"></div>
            <div className="w-2 h-2 bg-[#cccccc] rounded-full"></div>
            <div className="w-2 h-2 bg-[#cccccc] rounded-full"></div>
          </div>
        </div>

        <RecommendedJobs />
        <NewJobPostings />
      </div>

      <MobileNavigation userType="citizen" />
    </div>
  )
}
