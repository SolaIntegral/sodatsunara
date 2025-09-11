"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Send, Plus } from "lucide-react"

interface Conversation {
  id: string
  citizenName: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  jobTitle?: string
}

interface Message {
  id: string
  text: string
  sender: "business" | "citizen"
  timestamp: string
}

export default function BusinessMobileMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      citizenName: "田中太郎",
      lastMessage: "応募について質問があります",
      lastMessageTime: "10:30",
      unreadCount: 2,
      jobTitle: "カフェスタッフ募集",
    },
    {
      id: "2",
      citizenName: "佐藤花子",
      lastMessage: "ありがとうございました",
      lastMessageTime: "昨日",
      unreadCount: 0,
      jobTitle: "調理補助スタッフ",
    },
    {
      id: "3",
      citizenName: "山田次郎",
      lastMessage: "面接の件でご連絡いたします",
      lastMessageTime: "2日前",
      unreadCount: 1,
      jobTitle: "カフェスタッフ募集",
    },
  ])

  const [messages] = useState<Message[]>([
    {
      id: "1",
      text: "応募ありがとうございます！\n丸々商店の小林です。",
      sender: "business",
      timestamp: "10:25",
    },
    {
      id: "2",
      text: "応募について質問があります",
      sender: "citizen",
      timestamp: "10:30",
    },
  ])

  const [templates] = useState([
    "面接のご案内をいたします。",
    "ありがとうございます。検討させていただきます。",
    "追加で質問がございましたらお気軽にお声がけください。",
  ])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // メッセージ送信処理
      setNewMessage("")
    }
  }

  if (selectedConversation) {
    const conversation = conversations.find((c) => c.id === selectedConversation)

    return (
      <div className="min-h-screen bg-[#ffffff] pb-20">
        {/* Chat Header */}
        <div className="flex items-center px-6 py-4 border-b border-[#e5e5e5]">
          <button onClick={() => setSelectedConversation(null)} className="mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-10 h-10 bg-[#d9d9d9] rounded-full mr-3"></div>
          <div className="flex-1">
            <h3 className="font-medium text-[#000000]">{conversation?.citizenName}</h3>
            <p className="text-sm text-[#666666]">{conversation?.jobTitle}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-6 py-4 space-y-4 mb-32">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "business" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === "business" ? "bg-[#007aff] text-[#ffffff]" : "bg-[#e5e5e5] text-[#000000]"
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === "business" ? "text-[#ffffff]/70" : "text-[#666666]"}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Templates */}
        <div className="px-6 py-2 border-t border-[#e5e5e5] bg-[#ffffff]">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => setNewMessage(template)}
                className="flex-shrink-0 bg-[#e5e5e5] text-[#000000] px-3 py-1 rounded-full text-sm"
              >
                {template}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="fixed bottom-20 left-0 right-0 px-6 py-4 bg-[#ffffff] border-t border-[#e5e5e5]">
          <div className="flex items-center space-x-2">
            <button className="p-2">
              <Plus className="w-5 h-5 text-[#666666]" />
            </button>
            <div className="flex-1 flex items-center bg-[#e5e5e5] rounded-full px-4 py-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="メッセージを入力"
                className="flex-1 bg-transparent outline-none text-[#000000] placeholder-[#666666]"
              />
            </div>
            <button onClick={handleSendMessage} className="bg-[#007aff] p-2 rounded-full">
              <Send className="w-5 h-5 text-[#ffffff]" />
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] border-t border-[#e5e5e5]">
          <div className="flex justify-around py-2">
            <Link href="/business-mobile" className="flex flex-col items-center py-2 px-4">
              <svg className="w-6 h-6 text-[#666666] mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span className="text-xs text-[#666666]">ホーム</span>
            </Link>
            <Link href="/business-mobile/jobs" className="flex flex-col items-center py-2 px-4">
              <svg className="w-6 h-6 text-[#666666] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-xs text-[#666666]">求人管理</span>
            </Link>
            <div className="flex flex-col items-center py-2 px-4">
              <svg className="w-6 h-6 text-[#007aff] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <span className="text-xs text-[#007aff] font-medium">メッセージ</span>
            </div>
            <Link href="/business-mobile/profile" className="flex flex-col items-center py-2 px-4">
              <svg className="w-6 h-6 text-[#666666] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-xs text-[#666666]">マイページ</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/business-mobile" className="w-24 h-8 bg-[#d9d9d9] rounded flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-semibold text-[#000000]">メッセージ</h1>
        <div className="w-24"></div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <div className="flex items-center bg-[#e5e5e5] rounded-full px-4 py-3">
          <Search className="w-5 h-5 text-[#666666] mr-3" />
          <input
            type="text"
            placeholder="メッセージを検索"
            className="flex-1 bg-transparent text-[#3c3c43] placeholder-[#666666] outline-none"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation.id)}
            className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 cursor-pointer hover:bg-[#e5e5e5]"
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] border-t border-[#e5e5e5]">
        <div className="flex justify-around py-2">
          <Link href="/business-mobile" className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#666666] mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs text-[#666666]">ホーム</span>
          </Link>
          <Link href="/business-mobile/jobs" className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#666666] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-xs text-[#666666]">求人管理</span>
          </Link>
          <div className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#007aff] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <span className="text-xs text-[#007aff] font-medium">メッセージ</span>
          </div>
          <Link href="/business-mobile/profile" className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#666666] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs text-[#666666]">マイページ</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
