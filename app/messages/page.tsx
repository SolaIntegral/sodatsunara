import { MobileNavigation } from "@/components/mobile-navigation"
import { MessagesList } from "@/components/messages-list"

export default function MessagesPage() {
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
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="メッセージを検索"
            className="w-full bg-[#e5e5e5] rounded-full px-4 py-3 text-[#666666] placeholder-[#666666] outline-none"
          />
        </div>

        <MessagesList />
      </div>

      <MobileNavigation />
    </div>
  )
}
