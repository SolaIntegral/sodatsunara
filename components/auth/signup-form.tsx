"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUpWithEmail } from "@/lib/auth"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    userType: "citizen" as "citizen" | "business",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("パスワードが一致しません")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("パスワードは6文字以上で入力してください")
      setLoading(false)
      return
    }

    try {
      await signUpWithEmail(formData.email, formData.password, formData.userType, formData.displayName)
      router.push("/auth/profile-setup") // Redirect to profile setup
    } catch (error: any) {
      setError("アカウント作成に失敗しました。もう一度お試しください。")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
      <h2 className="text-xl font-bold text-[#000000] mb-6 text-center">新規登録</h2>

      {error && <div className="bg-[#ff3b30] text-[#ffffff] p-3 rounded-lg mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">ユーザータイプ</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
            required
          >
            <option value="citizen">市民（求職者）</option>
            <option value="business">事業者</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">
            {formData.userType === "citizen" ? "お名前" : "事業者名"}
          </label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
            placeholder={formData.userType === "citizen" ? "山田太郎" : "株式会社○○"}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">メールアドレス</label>
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
          <label className="block text-sm font-medium text-[#000000] mb-2">パスワード</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 pr-10 text-[#000000] outline-none focus:border-[#007aff]"
              placeholder="6文字以上で入力"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-[#666666]" />
              ) : (
                <Eye className="w-4 h-4 text-[#666666]" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#000000] mb-2">パスワード確認</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-[#e5e5e5] rounded-lg px-3 py-2 text-[#000000] outline-none focus:border-[#007aff]"
            placeholder="パスワードを再入力"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#007aff] text-[#ffffff] py-2 rounded-lg font-medium hover:bg-[#0056b3] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "作成中..." : "アカウント作成"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#666666]">
          すでにアカウントをお持ちの方は{" "}
          <Link href="/auth/login" className="text-[#007aff] hover:underline">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  )
}
