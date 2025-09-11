"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Plus } from "lucide-react"
import { demoMessages } from "@/lib/demo-data"

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
      console.log("[v0] Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      {/* Header - LINE風のヘッダー */}
      <div className="flex items-center px-4 py-3 bg-[#ffffff] border-b border-[#e5e5e5]">
        <Link href="/messages" className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-[#007aff]" />
        </Link>
        <div className="flex items-center flex-1 ml-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm font-semibold">{conversation.companyName.charAt(0)}</span>
          </div>
          <div>
            <h1 className="font-semibold text-[#000000] text-lg">{conversation.companyName}</h1>
            <p className="text-xs text-[#666666]">オンライン</p>
          </div>
        </div>
      </div>

      {/* Chat Messages - LINE風のメッセージバブル */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* 相手のメッセージ */}
        <div className="flex items-end space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-semibold">{conversation.companyName.charAt(0)}</span>
          </div>
          <div className="bg-[#ffffff] rounded-2xl rounded-bl-md px-4 py-3 max-w-[75%] shadow-sm">
            <p className="text-[#000000] text-sm leading-relaxed">{conversation.lastMessage}</p>
            <p className="text-xs text-[#999999] mt-1">10:30</p>
          </div>
        </div>

        {/* 自分のメッセージ */}
        <div className="flex justify-end">
          <div className="bg-[#007aff] rounded-2xl rounded-br-md px-4 py-3 max-w-[75%]">
            <p className="text-white text-sm leading-relaxed">ご連絡ありがとうございます。</p>
            <p className="text-xs text-white/70 mt-1 text-right">10:32</p>
          </div>
        </div>

        {/* システムメッセージ */}
        <div className="flex justify-center">
          <div className="bg-[#e5e5e5] rounded-full px-3 py-1">
            <p className="text-xs text-[#666666]">今日</p>
          </div>
        </div>
      </div>

      {/* Message Input - LINE風の入力エリア */}
      <div className="bg-[#ffffff] border-t border-[#e5e5e5] px-4 py-3">
        <div className="flex items-end space-x-3">
          <button className="p-2 text-[#666666] hover:text-[#007aff] transition-colors">
            <Plus className="w-6 h-6" />
          </button>
          <div className="flex-1 flex items-end bg-[#f5f5f5] rounded-2xl px-4 py-2 min-h-[44px]">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="メッセージを入力"
              className="flex-1 bg-transparent outline-none text-[#000000] placeholder-[#999999] resize-none py-2 max-h-20"
              rows={1}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-[#007aff] text-white p-2 rounded-full hover:bg-[#0056b3] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
