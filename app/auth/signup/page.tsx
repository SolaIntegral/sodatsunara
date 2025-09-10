import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#000000] mb-2">そだつなら</h1>
          <p className="text-[#666666]">アカウントを作成して始めましょう</p>
        </div>

        <SignupForm />
      </div>
    </div>
  )
}
