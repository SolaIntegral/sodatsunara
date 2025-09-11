"use client"

import { useState } from "react"
import { Bell, X } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "message" | "job" | "system"
  timestamp: Date
  read: boolean
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 hover:bg-[#e5e5e5] rounded-lg"
      >
        <Bell className="w-6 h-6 text-[#666666]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#ff3b30] text-[#ffffff] text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#ffffff] border border-[#e5e5e5] rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-[#e5e5e5]">
            <h3 className="font-medium text-[#000000]">通知</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-[#666666]">新しい通知はありません</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-[#e5e5e5] hover:bg-[#e5e5e5] cursor-pointer ${
                    !notification.read ? "bg-[#e5e5e5]/50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-[#000000] text-sm">{notification.title}</h4>
                      <p className="text-sm text-[#666666] mt-1">{notification.message}</p>
                      <p className="text-xs text-[#666666] mt-2">{notification.timestamp.toLocaleString("ja-JP")}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeNotification(notification.id)
                      }}
                      className="p-1 hover:bg-[#d9d9d9] rounded"
                    >
                      <X className="w-4 h-4 text-[#666666]" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
