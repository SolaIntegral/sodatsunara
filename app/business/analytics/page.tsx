import { BusinessSidebar } from "@/components/business/business-sidebar"
import { RegionalMap } from "@/components/business/regional-map"
import { DataSummary } from "@/components/business/data-summary"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex">
      <BusinessSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#000000] mb-2">地域データ分析</h1>
          <p className="text-[#666666]">商圏の顧客特性やニーズをデータで把握し、経営戦略に活かしましょう</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RegionalMap />
          </div>
          <div>
            <DataSummary />
          </div>
        </div>
      </main>
    </div>
  )
}
