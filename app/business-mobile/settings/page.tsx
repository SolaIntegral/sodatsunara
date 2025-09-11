"use client"

import Link from "next/link"
import {
  Settings,
  User,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  TrendingUp,
  Megaphone,
  Users,
  BarChart3,
} from "lucide-react"

export default function BusinessMobileSettingsPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/business-mobile" className="w-24 h-8 bg-[#d9d9d9] rounded flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-semibold text-[#000000]">設定</h1>
        <div className="w-24"></div>
      </div>

      <div className="px-6 space-y-6">
        {/* Account Section */}
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
          <h3 className="font-medium text-[#000000] mb-4">アカウント管理</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-3 border-b border-[#e5e5e5] last:border-b-0">
              <div className="flex items-center">
                <User className="w-5 h-5 text-[#666666] mr-3" />
                <span className="text-[#000000]">企業・店舗情報の編集</span>
              </div>
              <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between py-3 border-b border-[#e5e5e5] last:border-b-0">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-[#666666] mr-3" />
                <span className="text-[#000000]">契約プラン・お支払い</span>
              </div>
              <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between py-3">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-[#666666] mr-3" />
                <span className="text-[#000000]">通知設定</span>
              </div>
              <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
          <h3 className="font-medium text-[#000000] mb-4">サポート</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-3 border-b border-[#e5e5e5] last:border-b-0">
              <div className="flex items-center">
                <HelpCircle className="w-5 h-5 text-[#666666] mr-3" />
                <span className="text-[#000000]">ヘルプ・使い方ガイド</span>
              </div>
              <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between py-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#666666] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-[#000000]">お問い合わせ</span>
              </div>
              <svg className="w-5 h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Access to PC Version */}
        <div className="bg-[#007aff] text-[#ffffff] rounded-lg p-4">
          <h3 className="font-medium mb-2">PC版ダッシュボード</h3>
          <p className="text-sm opacity-80 mb-4">より詳細な分析とレポート機能をご利用いただけます</p>
          <Link href="/business" className="bg-[#ffffff] text-[#007aff] px-4 py-2 rounded font-medium text-sm">
            PC版を開く
          </Link>
        </div>

        {/* Logout */}
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
          <button className="w-full flex items-center justify-center py-3 text-[#ff3b30]">
            <LogOut className="w-5 h-5 mr-2" />
            <span>ログアウト</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] border-t border-[#e5e5e5]">
        <div className="flex justify-around py-2">
          <Link href="/business-mobile" className="flex flex-col items-center py-2 px-4">
            <TrendingUp className="w-6 h-6 text-[#666666] mb-1" />
            <span className="text-xs text-[#666666]">ダッシュボード</span>
          </Link>
          <Link href="/business-mobile/marketing" className="flex flex-col items-center py-2 px-4">
            <Megaphone className="w-6 h-6 text-[#666666] mb-1" />
            <span className="text-xs text-[#666666]">集客・販促</span>
          </Link>
          <Link href="/business-mobile/jobs" className="flex flex-col items-center py-2 px-4">
            <Users className="w-6 h-6 text-[#666666] mb-1" />
            <span className="text-xs text-[#666666]">求人・採用</span>
          </Link>
          <Link href="/business-mobile/analytics" className="flex flex-col items-center py-2 px-4">
            <BarChart3 className="w-6 h-6 text-[#666666] mb-1" />
            <span className="text-xs text-[#666666]">データ分析</span>
          </Link>
          <div className="flex flex-col items-center py-2 px-4">
            <Settings className="w-6 h-6 text-[#007aff] mb-1" />
            <span className="text-xs text-[#007aff] font-medium">設定</span>
          </div>
        </div>
      </div>
    </div>
  )
}
