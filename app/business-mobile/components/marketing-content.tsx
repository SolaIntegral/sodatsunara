"use client"

import { useState } from "react"
import { Gift, Star, Plus, Edit, Trash2 } from "lucide-react"

export default function MarketingContent() {
  const [activeSection, setActiveSection] = useState("news")

  const [newsItems] = useState([
    { id: 1, title: "新メニュー「季節の特製ラーメン」登場！", date: "2024-01-15", views: 245 },
    { id: 2, title: "年末年始営業時間のお知らせ", date: "2024-01-10", views: 189 },
    { id: 3, title: "お客様感謝祭開催中", date: "2024-01-08", views: 312 },
  ])

  const [coupons] = useState([
    { id: 1, title: "ランチタイム10%OFF", usage: 23, limit: 100, expires: "2024-02-15" },
    { id: 2, title: "初回来店20%OFF", usage: 45, limit: 50, expires: "2024-01-31" },
    { id: 3, title: "リピーター限定5%OFF", usage: 12, limit: 200, expires: "2024-03-01" },
  ])

  const [reviews] = useState([
    {
      id: 1,
      customer: "田中様",
      rating: 5,
      comment: "とても美味しかったです！また来ます。",
      date: "2024-01-14",
      replied: false,
    },
    {
      id: 2,
      customer: "佐藤様",
      rating: 4,
      comment: "雰囲気が良くて居心地が良かったです。",
      date: "2024-01-13",
      replied: true,
    },
    {
      id: 3,
      customer: "山田様",
      rating: 5,
      comment: "スタッフの対応が素晴らしかったです。",
      date: "2024-01-12",
      replied: false,
    },
  ])

  return (
    <div className="px-6">
      {/* セクション選択タブ */}
      <div className="flex mb-6 bg-[#f8f9fa] rounded-lg p-1">
        <button
          onClick={() => setActiveSection("news")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
            activeSection === "news" ? "bg-[#ffffff] text-[#007aff] shadow-sm" : "text-[#666666]"
          }`}
        >
          ニュース投稿
        </button>
        <button
          onClick={() => setActiveSection("coupons")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
            activeSection === "coupons" ? "bg-[#ffffff] text-[#007aff] shadow-sm" : "text-[#666666]"
          }`}
        >
          クーポン管理
        </button>
        <button
          onClick={() => setActiveSection("reviews")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
            activeSection === "reviews" ? "bg-[#ffffff] text-[#007aff] shadow-sm" : "text-[#666666]"
          }`}
        >
          口コミ管理
        </button>
      </div>

      {/* ニュース投稿セクション */}
      {activeSection === "news" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#000000]">ニュース投稿</h3>
            <button className="bg-[#007aff] text-[#ffffff] px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              新規投稿
            </button>
          </div>
          <div className="space-y-3">
            {newsItems.map((item) => (
              <div key={item.id} className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-[#000000] flex-1">{item.title}</h4>
                  <div className="flex space-x-2 ml-4">
                    <button className="text-[#007aff]">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-[#ff3b30]">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-[#666666]">
                  <span>{item.date}</span>
                  <span>{item.views} 閲覧</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* クーポン管理セクション */}
      {activeSection === "coupons" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#000000]">クーポン管理</h3>
            <button className="bg-[#ff9500] text-[#ffffff] px-4 py-2 rounded-lg flex items-center">
              <Gift className="w-4 h-4 mr-2" />
              新規作成
            </button>
          </div>
          <div className="space-y-3">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-[#000000]">{coupon.title}</h4>
                  <div className="flex space-x-2">
                    <button className="text-[#007aff]">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-[#ff3b30]">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-[#666666] mb-2">
                  <span>
                    利用数: {coupon.usage}/{coupon.limit}
                  </span>
                  <span>期限: {coupon.expires}</span>
                </div>
                <div className="w-full bg-[#e5e5e5] rounded-full h-2">
                  <div
                    className="bg-[#34c759] h-2 rounded-full"
                    style={{ width: `${(coupon.usage / coupon.limit) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 口コミ管理セクション */}
      {activeSection === "reviews" && (
        <div>
          <h3 className="text-lg font-semibold text-[#000000] mb-4">口コミ管理</h3>
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <span className="font-medium text-[#000000] mr-2">{review.customer}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-[#ff9500] fill-current" : "text-[#e5e5e5]"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-[#666666]">{review.date}</span>
                </div>
                <p className="text-[#000000] mb-3">{review.comment}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${review.replied ? "text-[#34c759]" : "text-[#ff3b30]"}`}>
                    {review.replied ? "返信済み" : "未返信"}
                  </span>
                  {!review.replied && (
                    <button className="bg-[#007aff] text-[#ffffff] px-3 py-1 rounded text-sm">返信する</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
