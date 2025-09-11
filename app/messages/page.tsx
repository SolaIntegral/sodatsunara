import { MobileNavigation } from "@/components/mobile-navigation"
import { MessagesList } from "@/components/messages-list"
import { Search } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-background border-b border-border px-4 py-4">
        <h1 className="text-xl font-semibold text-foreground text-center">メッセージ</h1>
      </div>

      <div className="px-4 pt-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="メッセージを検索"
            className="w-full bg-muted rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground outline-none border-none"
          />
        </div>

        <MessagesList />
      </div>

      <MobileNavigation userType="citizen" />
    </div>
  )
}
