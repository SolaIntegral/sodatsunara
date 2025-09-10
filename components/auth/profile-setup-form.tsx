"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { updateUserProfile } from "@/lib/auth"

export function ProfileSetupForm() {
  const { user, userProfile } = useAuth()
  const [formData, setFormData] = useState({
    // Citizen fields
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    // Business fields
    businessName: "",
    businessType: "",
    businessAddress: "",
    businessPhone: "",
    businessDescription: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (userProfile?.businessName) {
      setFormData((prev) => ({
        ...prev,
        businessName: userProfile.displayName,
      }))
    }
  }, [userProfile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    try {
      const updateData: any = {
        profileComplete: true,
      }

      if (userProfile?.userType === "citizen") {
        updateData.firstName = formData.firstName
        updateData.lastName = formData.lastName
        updateData.phone = formData.phone
        updateData.dateOfBirth = formData.dateOfBirth
      } else {
        updateData.businessName = formData.businessName
        updateData.businessType = formData.businessType
        updateData.businessAddress = formData.businessAddress
        updateData.businessPhone = formData.businessPhone
        updateData.businessDescription = formData.businessDescription
      }

      await updateUserProfile(user.uid, updateData)

      // Redirect based on user type
      if (userProfile?.userType === "business") {
        router.push("/business")
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Profile update failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!userProfile) {
    return <div className="text-center">読み込み中...</div>
  }

  return (
    <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {userProfile.userType === "citizen" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">姓</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                  placeholder="山田"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">名</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                  placeholder="太郎"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">電話番号</label>
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
              <label className="block text-sm font-medium text-[#000000] mb-2">生年月日</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                required
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">事業者名</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                placeholder="株式会社○○"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">業種</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                required
              >
                <option value="">選択してください</option>
                <option value="restaurant">飲食業</option>
                <option value="retail">小売業</option>
                <option value="service">サービス業</option>
                <option value="manufacturing">製造業</option>
                <option value="other">その他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">事業所住所</label>
              <input
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                placeholder="習志野市○○町1-2-3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">事業所電話番号</label>
              <input
                type="tel"
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleChange}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                placeholder="047-123-4567"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">事業内容</label>
              <textarea
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleChange}
                rows={4}
                className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
                placeholder="事業の詳細を記載してください"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#007aff] text-[#ffffff] py-3 rounded-lg font-medium hover:bg-[#0056b3] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "保存中..." : "プロフィールを完了"}
        </button>
      </form>
    </div>
  )
}
