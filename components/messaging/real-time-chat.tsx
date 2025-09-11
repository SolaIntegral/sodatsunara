"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, ArrowLeft } from "lucide-react"
import { subscribeToMessages, sendMessage, markMessagesAsRead } from "@/lib/messaging"
import type { Message } from "@/lib/messaging"

interface RealTimeChatProps {
  conversationId: string
  currentUserId: string
  currentUserType: "citizen" | "business"
  recipientName: string
  onBack?: () => void
}

export function RealTimeChat({
  conversationId,
  currentUserId,
  currentUserType,
  recipientName,
  onBack,
}: RealTimeChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = subscribeToMessages(conversationId, (newMessages) => {
      setMessages(newMessages)
      setLoading(false)

      // Mark messages as read
      markMessagesAsRead(conversationId, currentUserType)
    })

    return () => unsubscribe()
  }, [conversationId, currentUserType])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await sendMessage(conversationId, currentUserId, currentUserType, newMessage)
        setNewMessage("")
      } catch (error) {
        console.error("Failed to send message:", error)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[#666666]">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[#ffffff]">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-[#e5e5e5]">
        {onBack && (
          <button onClick={onBack} className="mr-3">
            <ArrowLeft className="w-6 h-6 text-[#007aff]" />
          </button>
        )}
        <div className="w-10 h-10 bg-[#d9d9d9] rounded-full mr-3"></div>
        <div>
          <h3 className="font-medium text-[#000000]">{recipientName}</h3>
          <p className="text-sm text-[#666666]">オンライン</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === currentUserId
          return (
            <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  isCurrentUser ? "bg-[#007aff] text-[#ffffff]" : "bg-[#e5e5e5] text-[#000000]"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${isCurrentUser ? "text-[#ffffff]/70" : "text-[#666666]"}`}>
                  {message.timestamp?.toDate?.()?.toLocaleTimeString("ja-JP", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || ""}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[#e5e5e5]">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="メッセージを入力..."
            className="flex-1 bg-[#e5e5e5] rounded-full px-4 py-2 text-[#000000] placeholder-[#666666] outline-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-[#007aff] text-[#ffffff] p-2 rounded-full hover:bg-[#0056b3] disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
