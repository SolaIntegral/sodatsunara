"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Paperclip, MoreVertical } from "lucide-react"

interface Message {
  id: string
  content: string
  senderId: string
  senderType: "citizen" | "business"
  timestamp: string
}

interface BusinessChatWindowProps {
  conversationId: string
  citizenName: string
}

export function BusinessChatWindow({ conversationId, citizenName }: BusinessChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "こんにちは。アルバイトの件でご連絡いたします。",
      senderId: "citizen1",
      senderType: "citizen",
      timestamp: "10:00",
    },
    {
      id: "2",
      content: "応募ありがとうございます！丸々商店の小林です。",
      senderId: "business1",
      senderType: "business",
      timestamp: "10:05",
    },
    {
      id: "3",
      content: "面接の日程についてご相談したいのですが、いつ頃がよろしいでしょうか？",
      senderId: "citizen1",
      senderType: "citizen",
      timestamp: "10:10",
    },
    {
      id: "4",
      content: "来週の火曜日から木曜日の午後はいかがでしょうか？",
      senderId: "business1",
      senderType: "business",
      timestamp: "10:15",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        senderId: "business1",
        senderType: "business",
        timestamp: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5] bg-[#ffffff]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#d9d9d9] rounded-full"></div>
          <div>
            <h3 className="font-medium text-[#000000]">{citizenName}</h3>
            <p className="text-sm text-[#666666]">オンライン</p>
          </div>
        </div>
        <button className="p-2 hover:bg-[#e5e5e5] rounded-lg">
          <MoreVertical className="w-5 h-5 text-[#666666]" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderType === "business" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.senderType === "business" ? "bg-[#007aff] text-[#ffffff]" : "bg-[#e5e5e5] text-[#000000]"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p
                className={`text-xs mt-1 ${message.senderType === "business" ? "text-[#ffffff]/70" : "text-[#666666]"}`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-[#e5e5e5] bg-[#ffffff]">
        <div className="flex items-end space-x-3">
          <button className="p-2 hover:bg-[#e5e5e5] rounded-lg">
            <Paperclip className="w-5 h-5 text-[#666666]" />
          </button>
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="メッセージを入力..."
              className="w-full bg-[#e5e5e5] rounded-lg px-4 py-2 text-[#000000] placeholder-[#666666] outline-none resize-none"
              rows={1}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-[#007aff] text-[#ffffff] p-2 rounded-lg hover:bg-[#0056b3] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
