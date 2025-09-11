"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Settings, BarChart3, Megaphone, MapPin, Users, Calendar } from "lucide-react"

export default function BusinessMobileProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "analytics" | "announcements">("profile")

  const [companyData] = useState({
    name: "丸々商店",
    category: "個人経営 / 居酒屋 / アルバイト",
    address: "習志野市津田沼1-1-1",
    phone: "047-123-4567",
    description: "地域密着型の居酒屋です。アットホームな雰囲気でお客様をお迎えしています。",
    followers: 45,
    jobPostings: 3,
    totalViews: 1250,
  })

  const [analyticsData] = useState({
    demographics: {
      age20s: 35,
      age30s: 28,
      age40s: 22,
      age50plus: 15,
    },
    nearbyFacilities: [
      { name: "津田沼図書館", distance: "徒歩3分", type: "図書館" },
      { name: "津田沼駅", distance: "徒歩5分", type: "駅" },
      { name: "津田沼公園", distance: "徒歩7分", type: "公園" },
    ],
    upcomingEvents: [
      { name: "津田沼夏祭り", date: "7月15日", location: "津田沼駅前" },
      { name: "商店街セール", date: "7月20日", location: "津田沼商店街" },
    ],
  })

  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Status bar */}
      <div className="flex justify-between items-center px-6 py-2 text-sm font-medium">
        <span>9:41</span>
        <div className="w-20 h-6 bg-[#000000] rounded-full"></div>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-[#000000] rounded-full"></div>
            <div className="w-1 h-3 bg-[#000000] rounded-full"></div>
            <div className="w-1 h-3 bg-[#000000] rounded-full"></div>
            <div className="w-1 h-3 bg-[#666666] rounded-full"></div>
          </div>
          <div className="w-6 h-4 border-2 border-[#000000] rounded-sm">
            <div className="w-full h-full bg-[#000000] rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/business-mobile" className="w-24 h-8 bg-[#d9d9d9] rounded flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-semibold text-[#000000]">マイページ</h1>
        <button className="w-8 h-8 bg-[#d9d9d9] rounded flex items-center justify-center">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="px-6">
        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 text-center font-medium border-b-2 ${
              activeTab === "profile" ? "border-[#007aff] text-[#007aff]" : "border-[#e5e5e5] text-[#666666]"
            }`}
          >
            企業ページ
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 py-3 text-center font-medium border-b-2 ${
              activeTab === "analytics" ? "border-[#007aff] text-[#007aff]" : "border-[#e5e5e5] text-[#666666]"
            }`}
          >
            地域データ
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`flex-1 py-3 text-center font-medium border-b-2 ${
              activeTab === "announcements" ? "border-[#007aff] text-[#007aff]" : "border-[#e5e5e5] text-[#666666]"
            }`}
          >
            お知らせ
          </button>
        </div>

        {/* Content */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[#000000] mb-1">{companyData.name}</h2>
                  <p className="text-sm text-[#666666] mb-2">{companyData.category}</p>
                  <p className="text-sm text-[#666666] mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {companyData.address}
                  </p>
                  <p className="text-sm text-[#666666]">{companyData.phone}</p>
                </div>
                <button className="bg-[#007aff] text-[#ffffff] p-2 rounded">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-[#000000] mb-4">{companyData.description}</p>

              <div className="flex justify-between text-center">
                <div>
                  <div className="text-lg font-semibold text-[#000000]">{companyData.followers}</div>
                  <div className="text-xs text-[#666666]">フォロワー</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-[#000000]">{companyData.jobPostings}</div>
                  <div className="text-xs text-[#666666]">求人投稿</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-[#000000]">{companyData.totalViews}</div>
                  <div className="text-xs text-[#666666]">総閲覧数</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h3 className="font-medium text-[#000000]">クイックアクション</h3>

              <button className="w-full bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Edit className="w-5 h-5 text-[#007aff] mr-3" />
                  <span className="text-[#000000]">企業ページを編集</span>
                </div>
                <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Megaphone className="w-5 h-5 text-[#007aff] mr-3" />
                  <span className="text-[#000000]">お知らせを配信</span>
                </div>
                <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <Link
                href="/business"
                className="w-full bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-[#007aff] mr-3" />
                  <span className="text-[#000000]">PC版ダッシュボード</span>
                </div>
                <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Demographics */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <h3 className="font-medium text-[#000000] mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                周辺住民の年齢層
              </h3>
              <div className="space-y-3">
                {Object.entries(analyticsData.demographics).map(([age, percentage]) => (
                  <div key={age} className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">
                      {age === "age20s" ? "20代" : age === "age30s" ? "30代" : age === "age40s" ? "40代" : "50代以上"}
                    </span>
                    <div className="flex items-center">
                      <div className="w-20 h-2 bg-[#e5e5e5] rounded-full mr-2">
                        <div className="h-full bg-[#007aff] rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-[#000000]">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Facilities */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <h3 className="font-medium text-[#000000] mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                周辺施設情報
              </h3>
              <div className="space-y-3">
                {analyticsData.nearbyFacilities.map((facility, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-[#000000]">{facility.name}</div>
                      <div className="text-xs text-[#666666]">{facility.type}</div>
                    </div>
                    <div className="text-sm text-[#007aff]">{facility.distance}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <h3 className="font-medium text-[#000000] mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                今後のイベント
              </h3>
              <div className="space-y-3">
                {analyticsData.upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-[#000000]">{event.name}</div>
                      <div className="text-xs text-[#666666]">{event.location}</div>
                    </div>
                    <div className="text-sm text-[#007aff]">{event.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "announcements" && (
          <div className="space-y-6">
            {/* Create Announcement */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <h3 className="font-medium text-[#000000] mb-4">新しいお知らせを作成</h3>
              <textarea
                placeholder="フォロワーに向けてお知らせを入力してください..."
                className="w-full bg-[#e5e5e5] rounded-lg p-3 text-[#000000] placeholder-[#666666] outline-none resize-none"
                rows={4}
              />
              <button className="w-full bg-[#007aff] text-[#ffffff] py-3 rounded-lg mt-3">お知らせを配信</button>
            </div>

            {/* Recent Announcements */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <h3 className="font-medium text-[#000000] mb-4">配信履歴</h3>
              <div className="space-y-3">
                <div className="border-b border-[#e5e5e5] pb-3">
                  <div className="text-sm text-[#000000] mb-1">新メニュー「季節の天ぷら」を追加しました！</div>
                  <div className="text-xs text-[#666666]">2024年1月20日 • 閲覧数: 45</div>
                </div>
                <div className="border-b border-[#e5e5e5] pb-3">
                  <div className="text-sm text-[#000000] mb-1">週末限定セール開催中です</div>
                  <div className="text-xs text-[#666666]">2024年1月18日 • 閲覧数: 32</div>
                </div>
              </div>
            </div>
          </div>
        )}
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
          <Link href="/business-mobile/messages" className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#666666] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <span className="text-xs text-[#666666]">メッセージ</span>
          </Link>
          <div className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#007aff] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs text-[#007aff] font-medium">マイページ</span>
          </div>
        </div>
      </div>
    </div>
  )
}
