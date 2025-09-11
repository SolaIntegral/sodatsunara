"use client"

import { useState } from "react"
import { Plus, Edit, Eye, MessageSquare } from "lucide-react"

export default function JobsContent() {
  const [activeSection, setActiveSection] = useState("jobs")

  const [jobPostings] = useState([
    { id: 1, title: "ホールスタッフ募集", status: "公開中", applicants: 12, views: 245, posted: "2024-01-10" },
    { id: 2, title: "キッチンスタッフ募集", status: "公開中", applicants: 8, views: 189, posted: "2024-01-08" },
    { id: 3, title: "アルバイト募集（土日のみ）", status: "下書き", applicants: 0, views: 0, posted: "2024-01-15" },
  ])

  const [applicants] = useState([
    { id: 1, name: "田中 太郎", job: "ホールスタッフ募集", status: "書類選考中", applied: "2024-01-14", age: 22 },
    { id: 2, name: "佐藤 花子", job: "ホールスタッフ募集", status: "面接予定", applied: "2024-01-13", age: 25 },
    { id: 3, name: "山田 次郎", job: "キッチンスタッフ募集", status: "採用決定", applied: "2024-01-12", age: 28 },
    { id: 4, name: "鈴木 美咲", job: "キッチンスタッフ募集", status: "書類選考中", applied: "2024-01-11", age: 24 },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "公開中":
        return "text-[#34c759]"
      case "下書き":
        return "text-[#ff9500]"
      case "書類選考中":
        return "text-[#007aff]"
      case "面接予定":
        return "text-[#ff9500]"
      case "採用決定":
        return "text-[#34c759]"
      default:
        return "text-[#666666]"
    }
  }

  return (
    <div className="px-6">
      {/* セクション選択タブ */}
      <div className="flex mb-6 bg-[#f8f9fa] rounded-lg p-1">
        <button
          onClick={() => setActiveSection("jobs")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
            activeSection === "jobs" ? "bg-[#ffffff] text-[#007aff] shadow-sm" : "text-[#666666]"
          }`}
        >
          求人管理
        </button>
        <button
          onClick={() => setActiveSection("applicants")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
            activeSection === "applicants" ? "bg-[#ffffff] text-[#007aff] shadow-sm" : "text-[#666666]"
          }`}
        >
          応募者管理
        </button>
      </div>

      {/* 求人管理セクション */}
      {activeSection === "jobs" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#000000]">求人投稿管理</h3>
            <button className="bg-[#007aff] text-[#ffffff] px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              新規投稿
            </button>
          </div>
          <div className="space-y-3">
            {jobPostings.map((job) => (
              <div key={job.id} className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#000000] mb-1">{job.title}</h4>
                    <span className={`text-sm font-medium ${getStatusColor(job.status)}`}>{job.status}</span>
                  </div>
                  <button className="text-[#007aff] ml-4">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-[#000000]">{job.applicants}</div>
                    <div className="text-xs text-[#666666]">応募者</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#000000]">{job.views}</div>
                    <div className="text-xs text-[#666666]">閲覧数</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#666666]">{job.posted}</div>
                    <div className="text-xs text-[#666666]">投稿日</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 応募者管理セクション */}
      {activeSection === "applicants" && (
        <div>
          <h3 className="text-lg font-semibold text-[#000000] mb-4">応募者管理</h3>
          <div className="space-y-3">
            {applicants.map((applicant) => (
              <div key={applicant.id} className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#000000]">
                      {applicant.name} ({applicant.age}歳)
                    </h4>
                    <p className="text-sm text-[#666666] mb-1">{applicant.job}</p>
                    <span className={`text-sm font-medium ${getStatusColor(applicant.status)}`}>
                      {applicant.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-[#007aff]">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-[#34c759]">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666666]">応募日: {applicant.applied}</span>
                  {applicant.status === "書類選考中" && (
                    <div className="flex space-x-2">
                      <button className="bg-[#34c759] text-[#ffffff] px-3 py-1 rounded text-sm">面接へ</button>
                      <button className="bg-[#ff3b30] text-[#ffffff] px-3 py-1 rounded text-sm">不採用</button>
                    </div>
                  )}
                  {applicant.status === "面接予定" && (
                    <div className="flex space-x-2">
                      <button className="bg-[#34c759] text-[#ffffff] px-3 py-1 rounded text-sm">採用</button>
                      <button className="bg-[#ff3b30] text-[#ffffff] px-3 py-1 rounded text-sm">不採用</button>
                    </div>
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
