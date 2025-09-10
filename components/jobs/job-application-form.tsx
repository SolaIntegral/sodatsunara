"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Send } from "lucide-react"

interface Job {
  id: string
  title: string
  businessName: string
}

interface JobApplicationFormProps {
  job: Job
  onBack: () => void
}

export function JobApplicationForm({ job, onBack }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle application submission
    console.log("Application data:", formData)
    // Show success message and redirect
    alert("応募が完了しました！")
    onBack()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="px-6">
      <div className="flex items-center py-4">
        <button onClick={onBack} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-[#007aff]" />
        </button>
        <h2 className="text-lg font-bold text-[#000000]">応募フォーム</h2>
      </div>

      <div className="mb-6 p-4 bg-[#e5e5e5] rounded-lg">
        <h3 className="font-medium text-[#000000]">{job.title}</h3>
        <p className="text-sm text-[#666666]">{job.businessName}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">お名前 *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
            placeholder="山田太郎"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">メールアドレス *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
            placeholder="example@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">電話番号 *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
            placeholder="090-1234-5678"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">志望動機 *</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={5}
            className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
            placeholder="応募理由や意気込みをお書きください"
            required
          />
        </div>

        <div className="pb-8">
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-[#007aff] text-[#ffffff] py-3 rounded-lg font-medium hover:bg-[#0056b3]"
          >
            <Send className="w-4 h-4" />
            <span>応募する</span>
          </button>
        </div>
      </form>
    </div>
  )
}
