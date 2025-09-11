"use client"

import { useState } from "react"
import { ArrowLeft, MessageSquare, Check, X, Eye } from "lucide-react"

interface Application {
  id: string
  citizenName: string
  citizenEmail: string
  appliedAt: string
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected"
  coverLetter: string
}

interface ApplicationsListProps {
  jobId: string
  onBack: () => void
}

export function ApplicationsList({ jobId, onBack }: ApplicationsListProps) {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      citizenName: "田中太郎",
      citizenEmail: "tanaka@example.com",
      appliedAt: "2024年1月15日",
      status: "pending",
      coverLetter:
        "貴社の求人に興味を持ち、応募させていただきました。カフェでの接客経験があり、お客様とのコミュニケーションを大切にしています。",
    },
    {
      id: "2",
      citizenName: "佐藤花子",
      citizenEmail: "sato@example.com",
      appliedAt: "2024年1月14日",
      status: "reviewed",
      coverLetter: "地域のお店で働きたいと思い応募いたします。平日の夕方から働くことができます。",
    },
    {
      id: "3",
      citizenName: "山田次郎",
      citizenEmail: "yamada@example.com",
      appliedAt: "2024年1月13日",
      status: "interview",
      coverLetter: "飲食業界での経験を活かして、貴店で働かせていただきたいです。",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-[#ff3b30] text-[#ffffff]"
      case "reviewed":
        return "bg-[#007aff] text-[#ffffff]"
      case "interview":
        return "bg-[#595959] text-[#ffffff]"
      case "accepted":
        return "bg-[#007aff] text-[#ffffff]"
      case "rejected":
        return "bg-[#666666] text-[#ffffff]"
      default:
        return "bg-[#e5e5e5] text-[#666666]"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "未確認"
      case "reviewed":
        return "確認済み"
      case "interview":
        return "面接予定"
      case "accepted":
        return "採用"
      case "rejected":
        return "不採用"
      default:
        return status
    }
  }

  const updateApplicationStatus = (applicationId: string, newStatus: Application["status"]) => {
    setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button onClick={onBack} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-[#007aff]" />
        </button>
        <h2 className="text-xl font-bold text-[#000000]">応募者一覧</h2>
      </div>

      <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#e5e5e5] bg-[#e5e5e5]">
          <h3 className="font-medium text-[#000000]">カフェスタッフ募集 - {applications.length}件の応募</h3>
        </div>

        <div className="divide-y divide-[#e5e5e5]">
          {applications.map((application) => (
            <div key={application.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-[#000000]">{application.citizenName}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(application.status)}`}>
                      {getStatusText(application.status)}
                    </span>
                  </div>
                  <p className="text-sm text-[#666666] mb-1">{application.citizenEmail}</p>
                  <p className="text-sm text-[#666666]">応募日: {application.appliedAt}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-[#e5e5e5] rounded-lg">
                    <MessageSquare className="w-4 h-4 text-[#007aff]" />
                  </button>
                  <button className="p-2 hover:bg-[#e5e5e5] rounded-lg">
                    <Eye className="w-4 h-4 text-[#666666]" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-sm font-medium text-[#000000] mb-2">志望動機</h5>
                <p className="text-sm text-[#666666] bg-[#e5e5e5] p-3 rounded-lg">{application.coverLetter}</p>
              </div>

              {application.status === "pending" && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateApplicationStatus(application.id, "reviewed")}
                    className="flex items-center space-x-1 bg-[#007aff] text-[#ffffff] px-3 py-1 rounded text-sm hover:bg-[#0056b3]"
                  >
                    <Check className="w-4 h-4" />
                    <span>確認済みにする</span>
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(application.id, "interview")}
                    className="flex items-center space-x-1 bg-[#595959] text-[#ffffff] px-3 py-1 rounded text-sm hover:bg-[#3c3c43]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>面接に進む</span>
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(application.id, "rejected")}
                    className="flex items-center space-x-1 bg-[#ff3b30] text-[#ffffff] px-3 py-1 rounded text-sm hover:bg-[#d32f2f]"
                  >
                    <X className="w-4 h-4" />
                    <span>不採用</span>
                  </button>
                </div>
              )}

              {application.status === "interview" && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateApplicationStatus(application.id, "accepted")}
                    className="flex items-center space-x-1 bg-[#007aff] text-[#ffffff] px-3 py-1 rounded text-sm hover:bg-[#0056b3]"
                  >
                    <Check className="w-4 h-4" />
                    <span>採用</span>
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(application.id, "rejected")}
                    className="flex items-center space-x-1 bg-[#ff3b30] text-[#ffffff] px-3 py-1 rounded text-sm hover:bg-[#d32f2f]"
                  >
                    <X className="w-4 h-4" />
                    <span>不採用</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
