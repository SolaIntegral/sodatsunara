import { MobileNavigation } from "@/components/mobile-navigation"
import { SearchHeader } from "@/components/search-header"
import { RecommendedJobs } from "@/components/recommended-jobs"
import { RecommendedShops } from "@/components/recommended-shops"
import { AdCarousel } from "@/components/ad-carousel"

export default function CitizenHomePage() {
  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      <div className="px-6 pt-6">
        <SearchHeader />

        <div className="my-8">
          <AdCarousel />
        </div>

        <RecommendedJobs />
        <RecommendedShops />
      </div>

      <MobileNavigation userType="citizen" />
    </div>
  )
}
