"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  userType?: "citizen" | "business"
}

export function ProtectedRoute({ children, requireAuth = true, userType }: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push("/auth/login")
        return
      }

      if (user && userProfile && !userProfile.profileComplete) {
        router.push("/auth/profile-setup")
        return
      }

      if (userType && userProfile && userProfile.userType !== userType) {
        // Redirect to appropriate dashboard
        if (userProfile.userType === "business") {
          router.push("/business")
        } else {
          router.push("/")
        }
        return
      }
    }
  }, [user, userProfile, loading, requireAuth, userType, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#666666]">読み込み中...</div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return null
  }

  if (user && userProfile && !userProfile.profileComplete) {
    return null
  }

  return <>{children}</>
}
