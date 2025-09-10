import { SearchHeader } from "@/components/search-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { JobCategories } from "@/components/job-categories"
import { ShopCategories } from "@/components/shop-categories"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      <div className="px-6 pt-6">
        <SearchHeader />

        <div className="mt-6">
          <h2 className="text-lg font-bold text-[#000000] mb-4">求人を探す</h2>
          <JobCategories />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-[#000000] mb-4">お店を探す</h2>
          <ShopCategories />
        </div>
      </div>

      <MobileNavigation userType="citizen" />
    </div>
  )
}
