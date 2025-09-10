"use client"

import { useState } from "react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { demoJobs } from "@/lib/demo-data"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("履歴")
  const userJobs = demoJobs.slice(0, 3) // ユーザーの応募履歴として最初の3件を使用

  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Profile Header */}
      <div className="w-full h-64 bg-[#d9d9d9] flex items-center justify-center">
        <span className="text-[#666666]">プロフィール画像</span>
      </div>

      <div className="px-6 -mt-16 relative">
        <div className="w-24 h-24 bg-[#d9d9d9] rounded-full mb-4 flex items-center justify-center">
          <span className="text-[#666666] text-sm">町田</span>
        </div>

        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#000000] mb-1">町田凌久</h1>
          <p className="text-[#666666]">machiriku15</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e5e5e5] mb-6">
          {["履歴", "スキル", "設定"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab ? "text-[#000000] border-b-2 border-[#000000]" : "text-[#666666]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "履歴" && (
          <div className="space-y-4">
            {userJobs.map((job) => (
              <div key={job.id} className="flex space-x-4 p-3 bg-[#f8f8f8] rounded-lg">
                <div className="w-16 h-16 bg-[#d9d9d9] rounded flex-shrink-0 flex items-center justify-center">
                  <span className="text-[#666666] text-xs">{job.category}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[#000000] mb-1">{job.title}</h3>
                  <p className="text-sm text-[#666666] mb-1">{job.company}</p>
                  <span className="inline-block bg-[#e5e5e5] text-[#666666] text-xs px-2 py-1 rounded">
                    {job.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "スキル" && (
          <div className="space-y-4">
            <div className="p-4 bg-[#f8f8f8] rounded-lg">
              <h3 className="font-medium text-[#000000] mb-2">保有スキル</h3>
              <div className="flex flex-wrap gap-2">
                {["接客経験", "レジ操作", "コミュニケーション", "チームワーク"].map((skill) => (
                  <span key={skill} className="bg-[#007aff] text-white text-sm px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "設定" && (
          <div className="space-y-4">
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-[#f8f8f8] rounded-lg">
                <span className="text-[#000000]">プロフィール編集</span>
              </button>
              <button className="w-full text-left p-3 bg-[#f8f8f8] rounded-lg">
                <span className="text-[#000000]">通知設定</span>
              </button>
              <button className="w-full text-left p-3 bg-[#f8f8f8] rounded-lg">
                <span className="text-[#000000]">プライバシー設定</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <MobileNavigation />
    </div>
  )
}
