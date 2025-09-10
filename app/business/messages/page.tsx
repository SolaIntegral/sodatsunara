import { BusinessSidebar } from "@/components/business/business-sidebar"
import { BusinessMessagesList } from "@/components/business/business-messages-list"

export default function BusinessMessagesPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex">
      <BusinessSidebar />

      <main className="flex-1 flex">
        <BusinessMessagesList />
      </main>
    </div>
  )
}
