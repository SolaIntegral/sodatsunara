"use client"

import { LayoutDashboard, Building2, Megaphone, BarChart3, Users, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BusinessSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "ダッシュボード", href: "/business" },
    { icon: Building2, label: "企業ページ編集", href: "/business/company" },
    { icon: Megaphone, label: "お知らせ配信", href: "/business/announcements" },
    { icon: BarChart3, label: "地域データ分析", href: "/business/analytics" },
    { icon: Users, label: "求人・応募者管理", href: "/business/jobs" },
    { icon: Settings, label: "設定", href: "/business/settings" },
  ]

  return (
    <div className="w-64 bg-[#ffffff] border-r border-[#e5e5e5] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#e5e5e5]">
        <h2 className="text-xl font-bold text-[#000000]">そだつなら</h2>
        <p className="text-sm text-[#666666]">ビジネス管理</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-[#007aff] text-[#ffffff]" : "text-[#666666] hover:bg-[#e5e5e5] hover:text-[#000000]"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#e5e5e5]">
        <button className="flex items-center space-x-3 px-3 py-2 text-[#666666] hover:bg-[#e5e5e5] hover:text-[#000000] rounded-lg transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">ログアウト</span>
        </button>
      </div>
    </div>
  )
}
