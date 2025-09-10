"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { demoMessages } from "@/lib/demo-data"
import { Button } from "@/components/ui/button"

interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const [message, setMessage] = useState("")
  const conversation = demoMessages.find((m) => m.id === params.id)

  if (!conversation) {
    return <div>チャットが見つかりません</div>
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log("[v0] Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5] bg-[#ffffff]">
        <Link href="/messages" className="p-2">
          <ArrowLeft className="w-6 h-6 text-[#000000]" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#d9d9d9] rounded-full"></div>
          <h1 className="font-medium text-[#000000]">{conversation.companyName}</h1>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4">
        {/* Company Message */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-[#d9d9d9] rounded-full flex-shrink-0"></div>
          <div className="bg-[#f0f0f0] rounded-lg p-3 max-w-[80%]">
            <p className="text-[#000000]">{conversation.lastMessage}</p>
          </div>
        </div>

        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-[#007aff] rounded-lg p-3 max-w-[80%]">
            <p className="text-white">ご連絡ありがとうございます。</p>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-[#e5e5e5] bg-[#ffffff]">
        <div className="flex items-center gap-3">
          <button className="p-2">
            <Plus className="w-6 h-6 text-[#666666]" />
          </button>
          <div className="flex-1 flex items-center bg-[#f0f0f0] rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="メッセージを入力"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[#000000] placeholder-[#666666]"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>
          <Button onClick={handleSendMessage} className="bg-[#595959] hover:bg-[#404040] text-white rounded-full p-3">
            送信
          </Button>
        </div>
      </div>
    </div>
  )
}
