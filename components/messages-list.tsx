"use client"

import Link from "next/link"
import { demoMessages } from "@/lib/demo-data"

export function MessagesList() {
  return (
    <div className="space-y-4">
      {demoMessages.map((message) => (
        <Link
          key={message.id}
          href={`/citizen/chat/${message.id}`}
          className="flex items-center space-x-4 py-2 hover:bg-[#f5f5f5] rounded-lg px-2 transition-colors"
        >
          <div className="w-12 h-12 bg-[#d9d9d9] rounded-full flex-shrink-0 flex items-center justify-center">
            <span className="text-[#666666] text-xs font-medium">{message.companyName.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-[#000000]">{message.companyName}</h3>
              <span className="text-xs text-[#666666]">
                {new Date(message.timestamp).toLocaleDateString("ja-JP", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <p className="text-sm text-[#666666] truncate">{message.lastMessage}</p>
            {message.unread && <div className="w-2 h-2 bg-[#007aff] rounded-full mt-1"></div>}
          </div>
        </Link>
      ))}

      {/* Floating action button */}
      <div className="fixed bottom-24 right-6">
        <button className="w-14 h-14 bg-[#595959] rounded-full flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 bg-[#ffffff] rounded-full"></div>
        </button>
      </div>
    </div>
  )
}
