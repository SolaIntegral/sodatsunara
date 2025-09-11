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
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-accent px-6 pt-12 pb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">町田凌久</h1>
            <p className="text-white/80">習志野市在住</p>
          </div>
        </div>
      </div>

      <div className="bg-background border-b border-border">
        <div className="flex">
          {["お気に入り", "活動履歴", "設定"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 font-medium text-center ${
                activeTab === tab ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground"
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
                <Heart className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold text-foreground">私のお気に入り店舗</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {favoriteShops.map((shop) => (
                  <div key={shop.id} className="bg-card rounded-xl p-4 shadow-sm border border-border">
                    <div className="w-full h-20 bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">{shop.category}</span>
                    </div>
                    <h3 className="font-medium text-foreground text-sm mb-1">{shop.name}</h3>
                    <p className="text-xs text-muted-foreground">{shop.location}</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground ml-1">{shop.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 利用可能なクーポン */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-bold text-foreground">利用可能なクーポン</h2>
              </div>
              <div className="space-y-3">
                {availableCoupons.map((coupon) => (
                  <div key={coupon.id} className="bg-gradient-to-r from-accent to-accent/80 rounded-xl p-4 text-white">
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
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">お気に入り店舗からのお知らせ</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">カフェ</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">カフェ・ド・習志野</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        新メニュー「季節のフルーツタルト」が登場しました！
                      </p>
                      <span className="text-xs text-muted-foreground">2時間前</span>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">ラーメン</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">津田沼ラーメン横丁</h4>
                      <p className="text-sm text-muted-foreground mb-2">年末年始の営業時間変更のお知らせです</p>
                      <span className="text-xs text-muted-foreground">1日前</span>
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
                <MessageCircle className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-bold text-foreground">投稿した口コミ</h2>
              </div>
              <div className="space-y-4">
                {myReviews.map((review) => (
                  <div key={review.id} className="bg-card rounded-xl p-4 shadow-sm border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-foreground">{review.shopName}</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                    {review.reply && (
                      <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                        <p className="text-sm text-primary font-medium mb-1">店舗からの返信:</p>
                        <p className="text-sm text-muted-foreground">{review.reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 気になる求人リスト */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bookmark className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-bold text-foreground">気になる求人</h2>
              </div>
              <div className="space-y-3">
                {bookmarkedJobs.map((job) => (
                  <div key={job.id} className="bg-card rounded-xl p-4 shadow-sm border border-border">
                    <div className="flex space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-muted-foreground text-xs">{job.category}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{job.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{job.company}</p>
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">{job.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 応募した求人 */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">応募した求人</h2>
              </div>
              <div className="space-y-3">
                {appliedJobs.map((job, index) => (
                  <div key={job.id} className="bg-card rounded-xl p-4 shadow-sm border border-border">
                    <div className="flex space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-muted-foreground text-xs">{job.category}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{job.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">{job.location}</span>
                          <span
                            className={`text-xs px-2 py-1 rounded text-white ${
                              index === 0 ? "bg-green-500" : "bg-orange-500"
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
                <Settings className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-bold text-foreground">プロフィール・設定</h2>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left p-4 bg-card rounded-xl shadow-sm border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">ニックネーム・アイコン設定</span>
                    <span className="text-muted-foreground">→</span>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-card rounded-xl shadow-sm border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">興味・関心カテゴリ設定</span>
                    <span className="text-muted-foreground">→</span>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-card rounded-xl shadow-sm border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">通知設定</span>
                    <span className="text-muted-foreground">→</span>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-card rounded-xl shadow-sm border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">アカウント管理</span>
                    <span className="text-muted-foreground">→</span>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-card rounded-xl shadow-sm border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">プライバシー設定</span>
                    <span className="text-muted-foreground">→</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <MobileNavigation userType="citizen" />
    </div>
  )
}
