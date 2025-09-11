import { BusinessSidebar } from "@/components/business/business-sidebar"
import { DashboardStats } from "@/components/business/dashboard-stats"
import { ActivityChart } from "@/components/business/activity-chart"
import { RecentReviews } from "@/components/business/recent-reviews"
import { Notifications } from "@/components/business/notifications"

export default function BusinessDashboard() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex">
      <BusinessSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#000000] mb-2">ダッシュボード</h1>
          <p className="text-[#666666]">事業の成長状況を確認し、次の戦略を立てましょう</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <DashboardStats />
            <ActivityChart />
            <RecentReviews />
          </div>

          {/* Sidebar Content */}
          <div className="space-y-8">
            <Notifications />
          </div>
        </div>
      </main>
    </div>
  )
}
