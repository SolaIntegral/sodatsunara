"use client"

import { useState } from "react"
import { Building, Bell, Users, CreditCard, HelpCircle, LogOut } from "lucide-react"

export default function SettingsContent() {
  const [notifications, setNotifications] = useState({
    newApplications: true,
    newReviews: true,
    couponUsage: false,
    systemUpdates: true,
  })

  const [businessInfo] = useState({
    name: "丸々商店",
    category: "個人経営 / 居酒屋 / アルバイト",
    address: "習志野市津田沼1-1-1",
    phone: "047-123-4567",
    email: "info@marumaru-shop.com",
    hours: "11:00-22:00",
    closedDays: "月曜日",
  })

  return (
    <div className="px-6">
      {/* 企業情報セクション */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-[#007aff]" />
          企業情報
        </h3>
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#666666]">店舗名</label>
              <div className="text-[#000000] font-medium">{businessInfo.name}</div>
            </div>
            <div>
              <label className="text-sm text-[#666666]">カテゴリ</label>
              <div className="text-[#000000]">{businessInfo.category}</div>
            </div>
            <div>
              <label className="text-sm text-[#666666]">住所</label>
              <div className="text-[#000000]">{businessInfo.address}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#666666]">電話番号</label>
                <div className="text-[#000000]">{businessInfo.phone}</div>
              </div>
              <div>
                <label className="text-sm text-[#666666]">営業時間</label>
                <div className="text-[#000000]">{businessInfo.hours}</div>
              </div>
            </div>
            <button className="w-full bg-[#007aff] text-[#ffffff] py-2 rounded-lg">企業情報を編集</button>
          </div>
        </div>
      </div>

      {/* 通知設定セクション */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-[#ff9500]" />
          通知設定
        </h3>
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#000000]">新規応募通知</span>
              <button
                onClick={() => setNotifications({ ...notifications, newApplications: !notifications.newApplications })}
                className={`w-12 h-6 rounded-full ${notifications.newApplications ? "bg-[#34c759]" : "bg-[#e5e5e5]"} relative`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.newApplications ? "translate-x-6" : "translate-x-0.5"}`}
                ></div>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#000000]">新規口コミ通知</span>
              <button
                onClick={() => setNotifications({ ...notifications, newReviews: !notifications.newReviews })}
                className={`w-12 h-6 rounded-full ${notifications.newReviews ? "bg-[#34c759]" : "bg-[#e5e5e5]"} relative`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.newReviews ? "translate-x-6" : "translate-x-0.5"}`}
                ></div>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#000000]">クーポン利用通知</span>
              <button
                onClick={() => setNotifications({ ...notifications, couponUsage: !notifications.couponUsage })}
                className={`w-12 h-6 rounded-full ${notifications.couponUsage ? "bg-[#34c759]" : "bg-[#e5e5e5]"} relative`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.couponUsage ? "translate-x-6" : "translate-x-0.5"}`}
                ></div>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#000000]">システム更新通知</span>
              <button
                onClick={() => setNotifications({ ...notifications, systemUpdates: !notifications.systemUpdates })}
                className={`w-12 h-6 rounded-full ${notifications.systemUpdates ? "bg-[#34c759]" : "bg-[#e5e5e5]"} relative`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.systemUpdates ? "translate-x-6" : "translate-x-0.5"}`}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* その他の設定 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#000000] mb-4">その他</h3>
        <div className="space-y-3">
          <button className="w-full bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-[#007aff] mr-3" />
              <span className="text-[#000000]">アカウント管理</span>
            </div>
            <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-[#ff9500] mr-3" />
              <span className="text-[#000000]">料金プラン</span>
            </div>
            <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <HelpCircle className="w-5 h-5 text-[#34c759] mr-3" />
              <span className="text-[#000000]">ヘルプ・サポート</span>
            </div>
            <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full bg-[#ffffff] border border-[#ff3b30] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <LogOut className="w-5 h-5 text-[#ff3b30] mr-3" />
              <span className="text-[#ff3b30]">ログアウト</span>
            </div>
            <svg className="w-5 h-5 text-[#ff3b30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
