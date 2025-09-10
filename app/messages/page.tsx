import { MobileNavigation } from "@/components/mobile-navigation"
import { MessagesList } from "@/components/messages-list"
import { Search } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Header - LINE風のシンプルなヘッダー */}
      <div className="bg-[#ffffff] border-b border-[#e5e5e5] px-4 py-4">
        <h1 className="text-xl font-semibold text-[#000000] text-center">メッセージ</h1>
      </div>

      <div className="px-4 pt-4">
        {/* 検索バー - LINE風のデザイン */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#999999]" />
          <input
            type="text"
            placeholder="メッセージを検索"
            className="w-full bg-[#f5f5f5] rounded-lg pl-10 pr-4 py-3 text-[#000000] placeholder-[#999999] outline-none border-none"
          />
        </div>

        <MessagesList />
      </div>

      <MobileNavigation />
    </div>
  )
}
