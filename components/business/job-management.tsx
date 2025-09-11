"use client"

import { useState } from "react"
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"
import { JobPostingForm } from "./job-posting-form"
import { ApplicationsList } from "./applications-list"

interface Job {
  id: string
  title: string
  category: string
  location: string
  workType: string
  status: "active" | "paused" | "closed"
  applicantCount: number
  createdAt: string
}

export function JobManagement() {
  const [activeTab, setActiveTab] = useState<"jobs" | "create" | "applications">("jobs")
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "カフェスタッフ募集",
      category: "アルバイト",
      location: "津田沼駅",
      workType: "part-time",
      status: "active",
      applicantCount: 5,
      createdAt: "2024年1月15日",
    },
    {
      id: "2",
      title: "調理補助スタッフ",
      category: "アルバイト",
      location: "習志野市",
      workType: "part-time",
      status: "active",
      applicantCount: 3,
      createdAt: "2024年1月10日",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#007aff] text-[#ffffff]"
      case "paused":
        return "bg-[#ff3b30] text-[#ffffff]"
      case "closed":
        return "bg-[#666666] text-[#ffffff]"
      default:
        return "bg-[#e5e5e5] text-[#666666]"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "募集中"
      case "paused":
        return "一時停止"
      case "closed":
        return "募集終了"
      default:
        return status
    }
  }

  if (activeTab === "create") {
    return <JobPostingForm onBack={() => setActiveTab("jobs")} />
  }

  if (activeTab === "applications" && selectedJob) {
    return <ApplicationsList jobId={selectedJob} onBack={() => setActiveTab("jobs")} />
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 text-[#666666] absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="求人を検索"
              className="bg-[#e5e5e5] rounded-lg pl-10 pr-4 py-2 text-[#000000] placeholder-[#666666] outline-none"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-[#e5e5e5] rounded-lg hover:bg-[#e5e5e5]">
            <Filter className="w-4 h-4 text-[#666666]" />
            <span className="text-[#666666]">フィルター</span>
          </button>
        </div>
        <button
          onClick={() => setActiveTab("create")}
          className="flex items-center space-x-2 bg-[#007aff] text-[#ffffff] px-4 py-2 rounded-lg hover:bg-[#0056b3]"
        >
          <Plus className="w-4 h-4" />
          <span>新規求人作成</span>
        </button>
      </div>

      {/* Jobs List */}
      <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#e5e5e5]">
              <tr>
                <th className="text-left p-4 font-medium text-[#000000]">求人タイトル</th>
                <th className="text-left p-4 font-medium text-[#000000]">カテゴリー</th>
                <th className="text-left p-4 font-medium text-[#000000]">勤務地</th>
                <th className="text-left p-4 font-medium text-[#000000]">ステータス</th>
                <th className="text-left p-4 font-medium text-[#000000]">応募者数</th>
                <th className="text-left p-4 font-medium text-[#000000]">作成日</th>
                <th className="text-left p-4 font-medium text-[#000000]">アクション</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-[#e5e5e5] hover:bg-[#e5e5e5]">
                  <td className="p-4">
                    <h3 className="font-medium text-[#000000]">{job.title}</h3>
                  </td>
                  <td className="p-4 text-[#666666]">{job.category}</td>
                  <td className="p-4 text-[#666666]">{job.location}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                      {getStatusText(job.status)}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        setSelectedJob(job.id)
                        setActiveTab("applications")
                      }}
                      className="text-[#007aff] hover:underline"
                    >
                      {job.applicantCount}件
                    </button>
                  </td>
                  <td className="p-4 text-[#666666]">{job.createdAt}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-[#d9d9d9] rounded">
                        <Eye className="w-4 h-4 text-[#666666]" />
                      </button>
                      <button className="p-1 hover:bg-[#d9d9d9] rounded">
                        <Edit className="w-4 h-4 text-[#666666]" />
                      </button>
                      <button className="p-1 hover:bg-[#d9d9d9] rounded">
                        <Trash2 className="w-4 h-4 text-[#ff3b30]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
