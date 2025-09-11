"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Megaphone, Star, Eye, Users, TrendingUp } from "lucide-react"

export default function BusinessMobileMarketingPage() {
  const [activeTab, setActiveTab] = useState<"company" | "news" | "coupons" | "reviews">("company")

  const [companyStats] = useState({
    pageViews: 1250,
    favorites: 45,
    followers: 128,
  })

  const [recentNews] = useState([
    { id: 1, title: "新メニュー「季節の天ぷら」登場！", date: "2024年1月20日", views: 45 },
    { id: 2, title: "週末限定セール開催中", date: "2024年1月18日", views: 32 },
  ])

  const [activeCoupons] = useState([
    { id: 1, title: "ドリンク1杯サービス", usage: 15, limit: 50, expires: "2024年2月29日" },
    { id: 2, title: "会計から10%OFF", usage: 8, limit: 30, expires: "2024年2月15日" },
  ])

  const [recentReviews] = useState([
    {
      id: 1,
      author: "田中さん",
      rating: 5,
      comment: "とても美味しかったです！",
      date: "2024年1月19日",
      replied: false,
    },
    {
      id: 2,
      author: "佐藤さん",
      rating: 4,
      comment: "雰囲気が良くて居心地が良いです",
      date: "2024年1月17日",
      replied: true,
    },
  ])

  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/business-mobile" className="w-24 h-8 bg-[#d9d9d9] rounded flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-semibold text-[#000000]">集客・販促</h1>
        <div className="w-24"></div>
      </div>

      <div className="px-6">
        {/* Tabs */}
        <div className="flex mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("company")}
            className={`flex-shrink-0 px-4 py-3 text-center font-medium border-b-2 ${
              activeTab === "company" ? "border-[#007aff] text-[#007aff]" : "border-[#e5e5e5] text-[#666666]"
            }`}
          >
            企業ページ
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`flex-shrink-0 px-4 py-3 text-center font-medium border-b-2 ${
              activeTab === "news" ? "border-[#007aff] text-[#007aff]" : "border-[#e5e5e5] text-[#666666]"
            }`}
          >
            ニュース投稿
          </button>
          <button
            onClick={() => setActiveTab("coupons")}
            className={`flex-shrink-0 px-4 py-3 text-center font-medium border-b-2 ${
              activeTab === "coupons" ? "border-[#007aff] text-[#007aff]" : "border-[#e5e5e5] text-[#666666]"
            }`}
          >
            クーポン管理
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-shrink-0 px-4 py-3 text-center font-medium border-b-2 ${
              activeTab === "reviews" ? "border-[#007aff] text-[#007aff]" : "border-[#e5e5e5] text-[#666666]"
            }`}
          >
            口コミ管理
          </button>
        </div>

        {/* Content */}
        {activeTab === "company" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 text-center">
                <Eye className="w-6 h-6 text-[#007aff] mx-auto mb-2" />
                <div className="text-lg font-bold text-[#000000]">{companyStats.pageViews}</div>
                <div className="text-xs text-[#666666]">ページ閲覧</div>
              </div>
              <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 text-center">
                <Star className="w-6 h-6 text-[#ff9500] mx-auto mb-2" />
                <div className="text-lg font-bold text-[#000000]">{companyStats.favorites}</div>
                <div className="text-xs text-[#666666]">お気に入り</div>
              </div>
              <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 text-center">
                <Users className="w-6 h-6 text-[#34c759] mx-auto mb-2" />
                <div className="text-lg font-bold text-[#000000]">{companyStats.followers}</div>
                <div className="text-xs text-[#666666]">フォロワー</div>
              </div>
            </div>

            {/* Company Page Edit */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#000000]">企業ページ編集</h3>
                <Edit className="w-5 h-5 text-[#007aff]" />
              </div>
              <p className="text-sm text-[#666666] mb-4">お客様が「行きたい！」と思うページを作成しましょう</p>
              <div className="space-y-2">
                <button className="w-full bg-[#e5e5e5] text-[#000000] py-3 rounded-lg text-left px-4">
                  商品・サービス紹介を編集
                </button>
                <button className="w-full bg-[#e5e5e5] text-[#000000] py-3 rounded-lg text-left px-4">
                  メニュー表を更新
                </button>
                <button className="w-full bg-[#e5e5e5] text-[#000000] py-3 rounded-lg text-left px-4">
                  フォトギャラリーを管理
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "news" && (
          <div className="space-y-6">
            {/* Create News */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <h3 className="font-medium text-[#000000] mb-4">新しいニュースを投稿</h3>
              <textarea
                placeholder="今日のランチ、新商品入荷、店長の近況など..."
                className="w-full bg-[#e5e5e5] rounded-lg p-3 text-[#000000] placeholder-[#666666] outline-none resize-none"
                rows={4}
              />
              <button className="w-full bg-[#007aff] text-[#ffffff] py-3 rounded-lg mt-3">ニュースを投稿</button>
            </div>

            {/* Recent News */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <h3 className="font-medium text-[#000000] mb-4">投稿履歴</h3>
              <div className="space-y-3">
                {recentNews.map((news) => (
                  <div key={news.id} className="border-b border-[#e5e5e5] pb-3 last:border-b-0">
                    <div className="text-sm font-medium text-[#000000] mb-1">{news.title}</div>
                    <div className="flex justify-between text-xs text-[#666666]">
                      <span>{news.date}</span>
                      <span>閲覧数: {news.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "coupons" && (
          <div className="space-y-6">
            {/* Create Coupon */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <h3 className="font-medium text-[#000000] mb-4">新しいクーポンを作成</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="クーポン名（例：ドリンク1杯サービス）"
                  className="w-full bg-[#e5e5e5] rounded-lg p-3 text-[#000000] placeholder-[#666666] outline-none"
                />
                <input
                  type="number"
                  placeholder="利用上限数"
                  className="w-full bg-[#e5e5e5] rounded-lg p-3 text-[#000000] placeholder-[#666666] outline-none"
                />
                <input type="date" className="w-full bg-[#e5e5e5] rounded-lg p-3 text-[#000000] outline-none" />
                <button className="w-full bg-[#ff9500] text-[#ffffff] py-3 rounded-lg">クーポンを発行</button>
              </div>
            </div>

            {/* Active Coupons */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <h3 className="font-medium text-[#000000] mb-4">発行中のクーポン</h3>
              <div className="space-y-3">
                {activeCoupons.map((coupon) => (
                  <div key={coupon.id} className="border border-[#e5e5e5] rounded-lg p-3">
                    <div className="text-sm font-medium text-[#000000] mb-2">{coupon.title}</div>
                    <div className="flex justify-between text-xs text-[#666666] mb-2">
                      <span>
                        利用数: {coupon.usage}/{coupon.limit}
                      </span>
                      <span>期限: {coupon.expires}</span>
                    </div>
                    <div className="w-full bg-[#e5e5e5] rounded-full h-2">
                      <div
                        className="bg-[#ff9500] h-2 rounded-full"
                        style={{ width: `${(coupon.usage / coupon.limit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Reviews List */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <h3 className="font-medium text-[#000000] mb-4">口コミ管理</h3>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border border-[#e5e5e5] rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-[#000000] mr-2">{review.author}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < review.rating ? "text-[#ff9500] fill-current" : "text-[#e5e5e5]"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-[#666666]">{review.date}</span>
                    </div>
                    <p className="text-sm text-[#000000] mb-3">{review.comment}</p>
                    {!review.replied ? (
                      <button className="bg-[#007aff] text-[#ffffff] px-4 py-2 rounded text-sm">返信する</button>
                    ) : (
                      <span className="text-xs text-[#34c759]">返信済み</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] border-t border-[#e5e5e5]">
        <div className="flex justify-around py-2">
          <Link href="/business-mobile" className="flex flex-col items-center py-2 px-4">
            <TrendingUp className="w-6 h-6 text-[#666666] mb-1" />
            <span className="text-xs text-[#666666]">ダッシュボード</span>
          </Link>
          <div className="flex flex-col items-center py-2 px-4">
            <Megaphone className="w-6 h-6 text-[#007aff] mb-1" />
            <span className="text-xs text-[#007aff] font-medium">集客・販促</span>
          </div>
          <Link href="/business-mobile/jobs" className="flex flex-col items-center py-2 px-4">
            <Users className="w-6 h-6 text-[#666666] mb-1" />
            <span className="text-xs text-[#666666]">求人・採用</span>
          </Link>
          <Link href="/business-mobile/analytics" className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#666666] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="text-xs text-[#666666]">データ分析</span>
          </Link>
          <Link href="/business-mobile/settings" className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#666666] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs text-[#666666]">設定</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
