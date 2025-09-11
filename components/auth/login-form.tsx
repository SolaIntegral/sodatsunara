"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmail } from "@/lib/auth"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signInWithEmail(formData.email, formData.password)
      router.push("/") // Redirect to home page
    } catch (error: any) {
      setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
      <h2 className="text-xl font-bold text-[#000000] mb-6 text-center">ログイン</h2>

      {error && <div className="bg-[#ff3b30] text-[#ffffff] p-3 rounded-lg mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="パスワードを入力"
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#007aff] text-[#ffffff] py-2 rounded-lg font-medium hover:bg-[#0056b3] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#666666]">
          アカウントをお持ちでない方は{" "}
          <Link href="/auth/signup" className="text-[#007aff] hover:underline">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  )
}
