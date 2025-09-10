"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface MockUser {
  uid: string
  email: string
  displayName: string
}

interface UserProfile {
  uid: string
  email: string
  displayName: string
  userType: "citizen" | "business"
  profileComplete: boolean
  createdAt: any
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
  businessName?: string
  businessType?: string
  businessAddress?: string
  businessPhone?: string
  businessDescription?: string
}

interface AuthContextType {
  user: MockUser | null
  userProfile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  const signOut = async () => {
    setUser(null)
    setUserProfile(null)
  }

  return <AuthContext.Provider value={{ user, userProfile, loading, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
