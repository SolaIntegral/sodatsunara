export interface DemoUser {
  id: string
  email: string
  user_type: "job_seeker" | "company"
  name: string
  is_demo: boolean
  school_verified?: boolean
}

export function isDemoMode(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("demo_mode") === "true"
}

export function getDemoUser(): DemoUser | null {
  if (typeof window === "undefined") return null
  const demoUserStr = localStorage.getItem("demo_user")
  return demoUserStr ? JSON.parse(demoUserStr) : null
}

export function clearDemoMode(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("demo_user")
  localStorage.removeItem("demo_mode")
}

export function setDemoMode(user: DemoUser): void {
  if (typeof window === "undefined") return
  localStorage.setItem("demo_user", JSON.stringify(user))
  localStorage.setItem("demo_mode", "true")
}
