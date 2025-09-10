"use client"

import { useState } from "react"
import { Heart, Star, MessageCircle, Bookmark, Settings, Bell, User, Gift } from "lucide-react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { demoJobs, demoShops } from "@/lib/demo-data"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("お気に入り")

  const favoriteShops = demoShops.slice(0, 4)
  const availableCoupons = [
    { id: 1, shopName: "カフェ・ド・習志野", title: "コーヒー1杯無料", expiry: "2024/12/31まで", discount: "100円OFF" },
    { id: 2, shopName: "津田沼ラーメン横丁", title: "餃子サービス", expiry: "2024/12/25まで", discount: "餃子無料" },
    { id: 3, shopName: "習志野書店", title: "本10%OFF", expiry: "2024/12/20まで", discount: "10%OFF" },
  ]

  const myReviews = [
    {
      id: 1,
      shopName: "カフェ・ド・習志野",
      rating: 5,
      comment: "コーヒーがとても美味しかったです！",
      date: "2024/12/10",
      reply: "ありがとうございます！またお待ちしております。",
    },
    {
      id: 2,
      shopName: "津田沼ラーメン横丁",
      rating: 4,
      comment: "醤油ラーメンが絶品でした",
      date: "2024/12/08",
      reply: null,
    },
  ]

  const bookmarkedJobs = demoJobs.slice(0, 2)
  const appliedJobs = demoJobs.slice(2, 4)

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      <div className="bg-gradient-to-r from-[#007aff] to-[#5ac8fa] px-6 pt-12 pb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-[#007aff]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">町田凌久</h1>
            <p className="text-white/80">習志野市在住</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-[#e5e5e5]">
        <div className="flex">
          {["お気に入り", "活動履歴", "設定"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 font-medium text-center ${
                activeTab === tab ? "text-[#007aff] border-b-2 border-[#007aff] bg-[#f0f8ff]" : "text-[#666666]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {activeTab === "お気に入り" && (
          <div className="space-y-6">
            {/* お気に入り店舗リスト */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-[#ff3b30]" />
                <h2 className="text-lg font-bold text-[#000000]">私のお気に入り店舗</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {favoriteShops.map((shop) => (
                  <div key={shop.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e5e5]">
                    <div className="w-full h-20 bg-[#f0f0f0] rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-[#666666] text-sm">{shop.category}</span>
                    </div>
                    <h3 className="font-medium text-[#000000] text-sm mb-1">{shop.name}</h3>
                    <p className="text-xs text-[#666666]">{shop.location}</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-3 h-3 text-[#ffd700] fill-current" />
                      <span className="text-xs text-[#666666] ml-1">{shop.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 利用可能なクーポン */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="w-5 h-5 text-[#ff9500]" />
                <h2 className="text-lg font-bold text-[#000000]">利用可能なクーポン</h2>
              </div>
              <div className="space-y-3">
                {availableCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="bg-gradient-to-r from-[#ff9500] to-[#ffad33] rounded-xl p-4 text-white"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{coupon.title}</h3>
                        <p className="text-white/90 text-sm mb-2">{coupon.shopName}</p>
                        <p className="text-white/80 text-xs">{coupon.expiry}</p>
                      </div>
                      <div className="bg-white/20 rounded-lg px-3 py-2">
                        <span className="font-bold text-sm">{coupon.discount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 店舗からの新着情報フィード */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="w-5 h-5 text-[#007aff]" />
                <h2 className="text-lg font-bold text-[#000000]">お気に入り店舗からのお知らせ</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e5e5]">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-[#007aff] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">カフェ</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#000000] mb-1">カフェ・ド・習志野</h4>
                      <p className="text-sm text-[#666666] mb-2">新メニュー「季節のフルーツタルト」が登場しました！</p>
                      <span className="text-xs text-[#999999]">2時間前</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e5e5]">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-[#ff3b30] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">ラーメン</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#000000] mb-1">津田沼ラーメン横丁</h4>
                      <p className="text-sm text-[#666666] mb-2">年末年始の営業時間変更のお知らせです</p>
                      <span className="text-xs text-[#999999]">1日前</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "活動履歴" && (
          <div className="space-y-6">
            {/* 投稿した口コミ */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-5 h-5 text-[#34c759]" />
                <h2 className="text-lg font-bold text-[#000000]">投稿した口コミ</h2>
              </div>
              <div className="space-y-4">
                {myReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e5e5]">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-[#000000]">{review.shopName}</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-[#ffd700] fill-current" : "text-[#e5e5e5]"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-[#666666] mb-2">{review.comment}</p>
                    <span className="text-xs text-[#999999]">{review.date}</span>
                    {review.reply && (
                      <div className="mt-3 p-3 bg-[#f0f8ff] rounded-lg">
                        <p className="text-sm text-[#007aff] font-medium mb-1">店舗からの返信:</p>
                        <p className="text-sm text-[#666666]">{review.reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 気になる求人リスト */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bookmark className="w-5 h-5 text-[#ff9500]" />
                <h2 className="text-lg font-bold text-[#000000]">気になる求人</h2>
              </div>
              <div className="space-y-3">
                {bookmarkedJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e5e5]">
                    <div className="flex space-x-3">
                      <div className="w-12 h-12 bg-[#f0f0f0] rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-[#666666] text-xs">{job.category}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#000000] mb-1">{job.title}</h4>
                        <p className="text-sm text-[#666666] mb-1">{job.company}</p>
                        <span className="text-xs text-[#007aff] bg-[#f0f8ff] px-2 py-1 rounded">{job.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 応募した求人 */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-[#007aff]" />
                <h2 className="text-lg font-bold text-[#000000]">応募した求人</h2>
              </div>
              <div className="space-y-3">
                {appliedJobs.map((job, index) => (
                  <div key={job.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e5e5]">
                    <div className="flex space-x-3">
                      <div className="w-12 h-12 bg-[#f0f0f0] rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-[#666666] text-xs">{job.category}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#000000] mb-1">{job.title}</h4>
                        <p className="text-sm text-[#666666] mb-2">{job.company}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#007aff] bg-[#f0f8ff] px-2 py-1 rounded">{job.location}</span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              index === 0 ? "bg-[#34c759] text-white" : "bg-[#ff9500] text-white"
                            }`}
                          >
                            {index === 0 ? "面接予定" : "書類選考中"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "設定" && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-5 h-5 text-[#666666]" />
                <h2 className="text-lg font-bold text-[#000000]">プロフィール・設定</h2>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left p-4 bg-white rounded-xl shadow-sm border border-[#e5e5e5]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#000000] font-medium">ニックネーム・アイコン設定</span>
                    <span className="text-[#666666]">→</span>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-white rounded-xl shadow-sm border border-[#e5e5e5]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#000000] font-medium">興味・関心カテゴリ設定</span>
                    <span className="text-[#666666]">→</span>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-white rounded-xl shadow-sm border border-[#e5e5e5]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#000000] font-medium">通知設定</span>
                    <span className="text-[#666666]">→</span>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-white rounded-xl shadow-sm border border-[#e5e5e5]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#000000] font-medium">アカウント管理</span>
                    <span className="text-[#666666]">→</span>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-white rounded-xl shadow-sm border border-[#e5e5e5]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#000000] font-medium">プライバシー設定</span>
                    <span className="text-[#666666]">→</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <MobileNavigation />
    </div>
  )
}
