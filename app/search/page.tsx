import { SearchHeader } from "@/components/search-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { JobCategories } from "@/components/job-categories"
import { ShopCategories } from "@/components/shop-categories"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-6 space-y-8">
        <SearchHeader />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">求人を探す</h2>
          <JobCategories />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">お店を探す</h2>
          <ShopCategories />
        </div>
      </div>

      <MobileNavigation userType="citizen" />
    </div>
  )
}
