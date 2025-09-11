import { ProfileSetupForm } from "@/components/auth/profile-setup-form"

export default function ProfileSetupPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#000000] mb-2">プロフィール設定</h1>
          <p className="text-[#666666]">より良いサービスを提供するため、詳細情報を入力してください</p>
        </div>

        <ProfileSetupForm />
      </div>
    </div>
  )
}
