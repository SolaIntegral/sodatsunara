"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, Users, Eye, MessageSquare, Megaphone, Gift, Star } from "lucide-react"

import MarketingContent from "./components/marketing-content"
import JobsContent from "./components/jobs-content"
import AnalyticsContent from "./components/analytics-content"
import SettingsContent from "./components/settings-content"

export default function BusinessMobilePage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const [kpiData] = useState({
    pageViews: 1250,
    pageViewsChange: "+15%",
    favorites: 45,
    favoritesChange: "+8%",
    couponUsage: 23,
    couponUsageChange: "+12%",
    newReviews: 3,
    newReviewsChange: "+2",
  })

  const [todaysTasks] = useState([
    { id: 1, type: "review", message: "新しい口コミに返信が必要です", count: 2 },
    { id: 2, type: "message", message: "未読メッセージがあります", count: 5 },
    { id: 3, type: "applicant", message: "応募者の対応が必要です", count: 3 },
  ])

  const renderContent = () => {
    switch (activeTab) {
      case "marketing":
        return <MarketingContent />
      case "jobs":
        return <JobsContent />
      case "analytics":
        return <AnalyticsContent />
      case "settings":
        return <SettingsContent />
      default:
        return (
          <div className="px-6">
            {/* 最重要指標（KPI）セクション */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#000000] mb-4">今月の売上指標</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-[#007aff]" />
                    <span className="text-xs text-[#34c759] font-medium">{kpiData.pageViewsChange}</span>
                  </div>
                  <div className="text-2xl font-bold text-[#000000]">{kpiData.pageViews}</div>
                  <div className="text-xs text-[#666666]">ページ閲覧数</div>
                </div>

                <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="w-5 h-5 text-[#ff3b30]" />
                    <span className="text-xs text-[#34c759] font-medium">{kpiData.favoritesChange}</span>
                  </div>
                  <div className="text-2xl font-bold text-[#000000]">{kpiData.favorites}</div>
                  <div className="text-xs text-[#666666]">お気に入り登録</div>
                </div>

                <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Gift className="w-5 h-5 text-[#ff9500]" />
                    <span className="text-xs text-[#34c759] font-medium">{kpiData.couponUsageChange}</span>
                  </div>
                  <div className="text-2xl font-bold text-[#000000]">{kpiData.couponUsage}</div>
                  <div className="text-xs text-[#666666]">クーポン利用数</div>
                </div>

                <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <MessageSquare className="w-5 h-5 text-[#5856d6]" />
                    <span className="text-xs text-[#34c759] font-medium">{kpiData.newReviewsChange}</span>
                  </div>
                  <div className="text-2xl font-bold text-[#000000]">{kpiData.newReviews}</div>
                  <div className="text-xs text-[#666666]">新着口コミ</div>
                </div>
              </div>
            </div>

            {/* 今日のタスクセクション */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#000000] mb-4">今日のタスク</h2>
              <div className="space-y-3">
                {todaysTasks.map((task) => (
                  <div key={task.id} className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {task.type === "review" && <Star className="w-5 h-5 text-[#ff9500] mr-3" />}
                        {task.type === "message" && <MessageSquare className="w-5 h-5 text-[#007aff] mr-3" />}
                        {task.type === "applicant" && <Users className="w-5 h-5 text-[#34c759] mr-3" />}
                        <span className="text-sm text-[#000000]">{task.message}</span>
                      </div>
                      <div className="w-6 h-6 bg-[#ff3b30] rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{task.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ショートカット機能セクション */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#000000] mb-4">クイックアクション</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab("marketing")}
                  className="bg-[#007aff] text-[#ffffff] rounded-lg p-4 block w-full text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Megaphone className="w-6 h-6 mr-3" />
                      <div>
                        <div className="font-medium">今日のニュースを投稿</div>
                        <div className="text-sm opacity-80">お客様に最新情報をお届け</div>
                      </div>
                    </div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("marketing")}
                  className="bg-[#ff9500] text-[#ffffff] rounded-lg p-4 block w-full text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Gift className="w-6 h-6 mr-3" />
                      <div>
                        <div className="font-medium">クーポンを発行</div>
                        <div className="text-sm opacity-80">来店促進キャンペーン</div>
                      </div>
                    </div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("marketing")}
                  className="bg-[#34c759] text-[#ffffff] rounded-lg p-4 block w-full text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-6 h-6 mr-3" />
                      <div>
                        <div className="font-medium">口コミに返信する</div>
                        <div className="text-sm opacity-80">お客様との信頼関係を構築</div>
                      </div>
                    </div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Header with back button */}
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/" className="w-24 h-8 bg-[#d9d9d9] rounded flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-semibold text-[#000000]">
          {activeTab === "dashboard" && "売上向上ダッシュボード"}
          {activeTab === "marketing" && "集客・販促"}
          {activeTab === "jobs" && "求人・採用"}
          {activeTab === "analytics" && "データ分析"}
          {activeTab === "settings" && "設定"}
        </h1>
        <div className="w-24"></div>
      </div>

      <div className="flex-1 overflow-y-auto">{renderContent()}</div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] border-t border-[#e5e5e5]">
        <div className="flex justify-around py-2">
          <button onClick={() => setActiveTab("dashboard")} className="flex flex-col items-center py-2 px-4">
            <TrendingUp className={`w-6 h-6 mb-1 ${activeTab === "dashboard" ? "text-[#007aff]" : "text-[#666666]"}`} />
            <span className={`text-xs ${activeTab === "dashboard" ? "text-[#007aff] font-medium" : "text-[#666666]"}`}>
              ダッシュボード
            </span>
          </button>
          <button onClick={() => setActiveTab("marketing")} className="flex flex-col items-center py-2 px-4">
            <Megaphone className={`w-6 h-6 mb-1 ${activeTab === "marketing" ? "text-[#007aff]" : "text-[#666666]"}`} />
            <span className={`text-xs ${activeTab === "marketing" ? "text-[#007aff] font-medium" : "text-[#666666]"}`}>
              集客・販促
            </span>
          </button>
          <button onClick={() => setActiveTab("jobs")} className="flex flex-col items-center py-2 px-4">
            <Users className={`w-6 h-6 mb-1 ${activeTab === "jobs" ? "text-[#007aff]" : "text-[#666666]"}`} />
            <span className={`text-xs ${activeTab === "jobs" ? "text-[#007aff] font-medium" : "text-[#666666]"}`}>
              求人・採用
            </span>
          </button>
          <button onClick={() => setActiveTab("analytics")} className="flex flex-col items-center py-2 px-4">
            <svg
              className={`w-6 h-6 mb-1 ${activeTab === "analytics" ? "text-[#007aff]" : "text-[#666666]"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className={`text-xs ${activeTab === "analytics" ? "text-[#007aff] font-medium" : "text-[#666666]"}`}>
              データ分析
            </span>
          </button>
          <button onClick={() => setActiveTab("settings")} className="flex flex-col items-center py-2 px-4">
            <svg
              className={`w-6 h-6 mb-1 ${activeTab === "settings" ? "text-[#007aff]" : "text-[#666666]"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={`text-xs ${activeTab === "settings" ? "text-[#007aff] font-medium" : "text-[#666666]"}`}>
              設定
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
