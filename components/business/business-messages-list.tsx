"use client"

import { useState } from "react"
import { Search, MessageSquare } from "lucide-react"
import { BusinessChatWindow } from "./business-chat-window"

interface Conversation {
  id: string
  citizenName: string
  citizenAvatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  jobTitle?: string
}

export function BusinessMessagesList() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      citizenName: "田中太郎",
      lastMessage: "応募について質問があります",
      lastMessageTime: "10:30",
      unreadCount: 2,
      jobTitle: "アルバイト募集",
    },
    {
      id: "2",
      citizenName: "佐藤花子",
      lastMessage: "ありがとうございました",
      lastMessageTime: "昨日",
      unreadCount: 0,
      jobTitle: "パート募集",
    },
    {
      id: "3",
      citizenName: "山田次郎",
      lastMessage: "面接の件でご連絡いたします",
      lastMessageTime: "2日前",
      unreadCount: 1,
      jobTitle: "正社員募集",
    },
  ])

  return (
    <div className="flex w-full h-screen">
      {/* Conversations List */}
      <div className="w-80 border-r border-[#e5e5e5] flex flex-col">
        <div className="p-6 border-b border-[#e5e5e5]">
          <h2 className="text-xl font-bold text-[#000000] mb-4">メッセージ</h2>
          <div className="relative">
            <Search className="w-5 h-5 text-[#666666] absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="メッセージを検索"
              className="w-full bg-[#e5e5e5] rounded-lg pl-10 pr-4 py-2 text-[#000000] placeholder-[#666666] outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-[#e5e5e5] cursor-pointer hover:bg-[#e5e5e5] transition-colors ${
                selectedConversation === conversation.id ? "bg-[#e5e5e5]" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-[#d9d9d9] rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-[#000000] truncate">{conversation.citizenName}</h3>
                    <span className="text-xs text-[#666666]">{conversation.lastMessageTime}</span>
                  </div>
                  {conversation.jobTitle && <p className="text-xs text-[#007aff] mb-1">{conversation.jobTitle}</p>}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#666666] truncate">{conversation.lastMessage}</p>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-[#ff3b30] text-[#ffffff] text-xs rounded-full px-2 py-1 ml-2">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedConversation ? (
          <BusinessChatWindow
            conversationId={selectedConversation}
            citizenName={conversations.find((c) => c.id === selectedConversation)?.citizenName || ""}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-[#e5e5e5]">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <p className="text-[#666666]">メッセージを選択してください</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
