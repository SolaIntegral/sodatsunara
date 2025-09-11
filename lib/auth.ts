import { auth, db } from "./firebase"

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  userType: "citizen" | "business"
  profileComplete: boolean
  createdAt: any
  // Citizen specific fields
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
  // Business specific fields
  businessName?: string
  businessType?: string
  businessAddress?: string
  businessPhone?: string
  businessDescription?: string
}

export async function signUpWithEmail(
  email: string,
  password: string,
  userType: "citizen" | "business",
  displayName: string,
): Promise<any> {
  try {
    const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth")
    const { doc, setDoc } = await import("firebase/firestore")

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    await updateProfile(user, { displayName })

    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      userType,
      profileComplete: false,
      createdAt: new Date(),
    }

    await setDoc(doc(db, "users", user.uid), userProfile)
    return user
  } catch (error) {
    console.error("Sign up failed:", error)
    throw new Error("アカウント作成に失敗しました")
  }
}

export async function signInWithEmail(email: string, password: string): Promise<any> {
  try {
    const { signInWithEmailAndPassword } = await import("firebase/auth")
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Sign in failed:", error)
    throw new Error("ログインに失敗しました")
  }
}

export async function signOutUser(): Promise<void> {
  try {
    const { signOut } = await import("firebase/auth")
    await signOut(auth)
  } catch (error) {
    console.error("Sign out failed:", error)
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const { doc, getDoc } = await import("firebase/firestore")
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error("Get user profile failed:", error)
    return null
  }
}

export async function updateUserProfile(uid: string, profileData: Partial<UserProfile>): Promise<void> {
  try {
    const { doc, updateDoc } = await import("firebase/firestore")
    await updateDoc(doc(db, "users", uid), profileData)
  } catch (error) {
    console.error("Update user profile failed:", error)
    throw new Error("プロフィール更新に失敗しました")
  }
}

export function onAuthStateChange(callback: (user: any) => void) {
  try {
    const { onAuthStateChanged } = require("firebase/auth")
    return onAuthStateChanged(auth, callback)
  } catch (error) {
    console.error("Auth state change listener failed:", error)
    callback(null)
    return () => {}
  }
}
