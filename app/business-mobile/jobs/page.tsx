"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Eye, MessageSquare, Calendar } from "lucide-react"

interface Job {
  id: string
  title: string
  category: string
  location: string
  status: "active" | "paused" | "closed"
  applicantCount: number
  viewCount: number
  createdAt: string
}

interface Applicant {
  id: string
  name: string
  age: number
  status: "pending" | "interview" | "hired" | "rejected"
  appliedAt: string
  jobId: string
}

export default function BusinessMobileJobsPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applicants">("jobs")
  const [jobs] = useState<Job[]>([
    {
      id: "1",
      title: "カフェスタッフ募集",
      category: "アルバイト",
      location: "津田沼駅",
      status: "active",
      applicantCount: 5,
      viewCount: 120,
      createdAt: "2024年1月15日",
    },
    {
      id: "2",
      title: "調理補助スタッフ",
      category: "アルバイト",
      location: "習志野市",
      status: "active",
      applicantCount: 3,
      viewCount: 85,
      createdAt: "2024年1月10日",
    },
  ])

  const [applicants] = useState<Applicant[]>([
    {
      id: "1",
      name: "田中太郎",
      age: 22,
      status: "pending",
      appliedAt: "2024年1月20日",
      jobId: "1",
    },
    {
      id: "2",
      name: "佐藤花子",
      age: 19,
      status: "interview",
      appliedAt: "2024年1月18日",
      jobId: "1",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#007aff] text-[#ffffff]"
      case "pending":
        return "bg-[#ff3b30] text-[#ffffff]"
      case "interview":
        return "bg-[#007aff] text-[#ffffff]"
      case "hired":
        return "bg-[#34c759] text-[#ffffff]"
      default:
        return "bg-[#666666] text-[#ffffff]"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "募集中"
      case "pending":
        return "書類選考中"
      case "interview":
        return "面接"
      case "hired":
        return "採用"
      case "rejected":
        return "不採用"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/business-mobile" className="w-24 h-8 bg-[#d9d9d9] rounded flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-semibold text-[#000000]">求人管理</h1>
        <div className="w-24"></div>
      </div>

      <div className="px-6">
        {/* Search */}
        <div className="relative mb-6">
          <div className="flex items-center bg-[#e5e5e5] rounded-full px-4 py-3">
            <Search className="w-5 h-5 text-[#666666] mr-3" />
            <input
              type="text"
              placeholder="求人・応募者を検索"
              className="flex-1 bg-transparent text-[#3c3c43] placeholder-[#666666] outline-none"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex-1 py-3 text-center font-medium border-b-2 ${
              activeTab === "jobs" ? "border-[#007aff] text-[#007aff]" : "border-[#e5e5e5] text-[#666666]"
            }`}
          >
            求人一覧
          </button>
          <button
            onClick={() => setActiveTab("applicants")}
            className={`flex-1 py-3 text-center font-medium border-b-2 ${
              activeTab === "applicants" ? "border-[#007aff] text-[#007aff]" : "border-[#e5e5e5] text-[#666666]"
            }`}
          >
            応募者管理
          </button>
        </div>

        {/* Content */}
        {activeTab === "jobs" ? (
          <div className="space-y-4">
            {/* Create Job Button */}
            <Link
              href="/business-mobile/jobs/create"
              className="flex items-center justify-center bg-[#007aff] text-[#ffffff] rounded-lg py-4 mb-6"
            >
              <Plus className="w-5 h-5 mr-2" />
              新規求人作成
            </Link>

            {/* Jobs List */}
            {jobs.map((job) => (
              <div key={job.id} className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-[#000000] mb-1">{job.title}</h3>
                    <p className="text-sm text-[#666666]">
                      {job.category} • {job.location}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                    {getStatusText(job.status)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm text-[#666666] mb-4">
                  <span>応募者: {job.applicantCount}件</span>
                  <span>閲覧数: {job.viewCount}</span>
                  <span>{job.createdAt}</span>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center bg-[#e5e5e5] text-[#000000] py-2 rounded">
                    <Eye className="w-4 h-4 mr-1" />
                    詳細
                  </button>
                  <button className="flex-1 flex items-center justify-center bg-[#007aff] text-[#ffffff] py-2 rounded">
                    編集
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Applicants List */}
            {applicants.map((applicant) => (
              <div key={applicant.id} className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-[#d9d9d9] rounded-full"></div>
                    <div>
                      <h3 className="font-medium text-[#000000]">{applicant.name}</h3>
                      <p className="text-sm text-[#666666]">{applicant.age}歳</p>
                      <p className="text-xs text-[#666666]">{applicant.appliedAt}応募</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(applicant.status)}`}>
                    {getStatusText(applicant.status)}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center bg-[#e5e5e5] text-[#000000] py-2 rounded">
                    <Eye className="w-4 h-4 mr-1" />
                    詳細
                  </button>
                  <button className="flex-1 flex items-center justify-center bg-[#007aff] text-[#ffffff] py-2 rounded">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    メッセージ
                  </button>
                  <button className="flex-1 flex items-center justify-center bg-[#34c759] text-[#ffffff] py-2 rounded">
                    <Calendar className="w-4 h-4 mr-1" />
                    面接
                  </button>
                </div>
              </div>
            ))}
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
          <div className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#007aff] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-xs text-[#007aff] font-medium">求人管理</span>
          </div>
          <Link href="/business-mobile/messages" className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#666666] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <span className="text-xs text-[#666666]">メッセージ</span>
          </Link>
          <Link href="/business-mobile/profile" className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#666666] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs text-[#666666]">マイページ</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
