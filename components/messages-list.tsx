"use client"

import Link from "next/link"
import { demoMessages } from "@/lib/demo-data"

export function MessagesList() {
  return (
    <div className="space-y-1">
      {demoMessages.map((message) => (
        <Link
          key={message.id}
          href={`/citizen/chat/${message.id}`}
          className="flex items-center space-x-3 py-4 px-2 hover:bg-[#f8f8f8] rounded-lg transition-colors active:bg-[#f0f0f0]"
        >
          {/* アバター - LINE風の丸いアバター */}
          <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex-shrink-0 flex items-center justify-center shadow-sm">
            <span className="text-white text-lg font-semibold">{message.companyName.charAt(0)}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-[#000000] truncate">{message.companyName}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#999999] flex-shrink-0">
                  {new Date(message.timestamp).toLocaleDateString("ja-JP", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                {message.unread && <div className="w-2 h-2 bg-[#ff3b30] rounded-full flex-shrink-0"></div>}
              </div>
            </div>
            <p className="text-sm text-[#666666] truncate">{message.lastMessage}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
