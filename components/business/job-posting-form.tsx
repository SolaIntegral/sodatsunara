"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"

interface JobPostingFormProps {
  onBack: () => void
}

export function JobPostingForm({ onBack }: JobPostingFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    workType: "part-time",
    salaryMin: "",
    salaryMax: "",
    salaryType: "hourly",
    description: "",
    requirements: "",
    benefits: "",
    applicationDeadline: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Job posting data:", formData)
    onBack()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-[#007aff]" />
        </button>
        <h2 className="text-xl font-bold text-[#000000]">新規求人作成</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#000000] mb-4">基本情報</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">求人タイトル *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                placeholder="例: カフェスタッフ募集"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">カテゴリー *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                required
              >
                <option value="">選択してください</option>
                <option value="アルバイト">アルバイト</option>
                <option value="パート">パート</option>
                <option value="正社員">正社員</option>
                <option value="契約社員">契約社員</option>
                <option value="インターン">インターン</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">勤務地 *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                placeholder="例: 津田沼駅徒歩5分"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">雇用形態 *</label>
              <select
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                required
              >
                <option value="part-time">パートタイム</option>
                <option value="full-time">フルタイム</option>
                <option value="contract">契約</option>
                <option value="internship">インターンシップ</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#000000] mb-4">給与情報</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">最低給与</label>
              <input
                type="number"
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                placeholder="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">最高給与</label>
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                placeholder="1500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">給与タイプ</label>
              <select
                name="salaryType"
                value={formData.salaryType}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
              >
                <option value="hourly">時給</option>
                <option value="monthly">月給</option>
                <option value="annual">年収</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#000000] mb-4">詳細情報</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">仕事内容 *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                placeholder="具体的な仕事内容を記載してください"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">応募条件・資格</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={3}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                placeholder="必要な経験、資格、スキルなど"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">福利厚生・待遇</label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={3}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                placeholder="交通費支給、社会保険完備など"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">応募締切</label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className="border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-[#e5e5e5] rounded-lg text-[#666666] hover:bg-[#e5e5e5]"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 bg-[#007aff] text-[#ffffff] px-6 py-2 rounded-lg hover:bg-[#0056b3]"
          >
            <Save className="w-4 h-4" />
            <span>求人を公開</span>
          </button>
        </div>
      </form>
    </div>
  )
}
