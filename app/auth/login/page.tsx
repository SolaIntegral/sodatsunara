import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#000000] mb-2">そだつなら</h1>
          <p className="text-[#666666]">このまちの店で、買い、働き、未来をつなぐ</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
