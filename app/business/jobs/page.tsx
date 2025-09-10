import { BusinessSidebar } from "@/components/business/business-sidebar"
import { JobManagement } from "@/components/business/job-management"

export default function BusinessJobsPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex">
      <BusinessSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#000000] mb-2">求人・応募者管理</h1>
          <p className="text-[#666666]">求人の掲載・管理と応募者とのやり取りを行います</p>
        </div>

        <JobManagement />
      </main>
    </div>
  )
}
