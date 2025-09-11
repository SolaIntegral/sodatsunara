import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center px-6 py-4 border-b border-[#e5e5e5]">
        <Link href="/messages">
          <ArrowLeft className="w-6 h-6 text-[#007aff] mr-4" />
        </Link>
        <div className="w-10 h-10 bg-[#d9d9d9] rounded-full mr-3"></div>
        <div>
          <h2 className="font-medium text-[#000000]">丸々商店</h2>
          <p className="text-sm text-[#666666]">個人経営 / 居酒屋 / アルバイト</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 px-6 py-4 space-y-4">
        <div className="flex justify-start">
          <div className="bg-[#e5e5e5] rounded-lg px-4 py-2 max-w-xs">
            <p className="text-[#000000]">応募ありがとうございます！</p>
            <p className="text-[#000000]">丸々商店の小林です。</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#595959] rounded-lg px-4 py-2 max-w-xs">
            <p className="text-[#ffffff]">ご連絡ありがとうございます。</p>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-[#e5e5e5]">
        <div className="flex items-center space-x-3">
          <Plus className="w-6 h-6 text-[#666666]" />
          <input
            type="text"
            placeholder="メッセージを入力"
            className="flex-1 bg-[#e5e5e5] rounded-full px-4 py-2 text-[#000000] placeholder-[#666666] outline-none"
          />
          <button className="bg-[#595959] text-[#ffffff] px-4 py-2 rounded-full font-medium">送信</button>
        </div>
      </div>
    </div>
  )
}
