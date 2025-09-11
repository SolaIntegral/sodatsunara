"use client"

import { Home, Search, MapPin, Mail, User } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface MobileNavigationProps {
  userType?: "citizen" | "business"
}

export function MobileNavigation({ userType = "citizen" }: MobileNavigationProps) {
  const pathname = usePathname()

  const homeHref = userType === "citizen" ? "/citizen" : "/business-mobile"

  const navItems = [
    { icon: Home, label: "ホーム", href: homeHref },
    { icon: Search, label: "さがす", href: "/search" },
    { icon: MapPin, label: "知る", href: "/discover" },
    { icon: Mail, label: "メッセージ", href: "/messages" },
    { icon: User, label: "マイページ", href: "/profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border pb-safe">
      <div className="flex justify-around py-3 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center py-2 px-3 min-w-0 flex-1 hover:bg-muted/50 rounded-lg transition-colors"
            >
              <item.icon className={`w-6 h-6 mb-1 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-xs ${isActive ? "text-primary font-medium" : "text-muted-foreground"} truncate`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
