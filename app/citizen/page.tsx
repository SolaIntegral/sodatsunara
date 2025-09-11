import { MobileNavigation } from "@/components/mobile-navigation"
import { SearchHeader } from "@/components/search-header"
import { RecommendedJobs } from "@/components/recommended-jobs"
import { RecommendedShops } from "@/components/recommended-shops"
import { AdCarousel } from "@/components/ad-carousel"

export default function CitizenHomePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-6 space-y-6">
        <SearchHeader />
        <AdCarousel />
        <RecommendedJobs />
        <RecommendedShops />
      </div>

      <MobileNavigation userType="citizen" />
    </div>
  )
}
