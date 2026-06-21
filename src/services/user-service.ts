import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { ADMIN_EMAILS, type UserRole, type UserProfile } from "@/config/admin"
import type { User } from "firebase/auth"

/**
 * Get or create a user profile in Firestore.
 * Automatically assigns 'admin' role if the email is in the whitelist.
 */
export async function syncUserProfile(user: User): Promise<UserProfile> {
  if (!db) throw new Error("Firestore not initialized")

  const userRef = doc(db, "users", user.uid)
  const userSnap = await getDoc(userRef)

  const role: UserRole = ADMIN_EMAILS.includes(user.email || "")
    ? "admin"
    : "customer"

  if (userSnap.exists()) {
    // Update last login and role (in case admin list changed)
    const existing = userSnap.data() as UserProfile
    const updated: Partial<UserProfile> = {
      lastLoginAt: new Date().toISOString(),
      displayName: user.displayName || existing.displayName,
      photoURL: user.photoURL || existing.photoURL,
      role, // Always re-check admin status
    }
    await setDoc(userRef, updated, { merge: true })
    return { ...existing, ...updated }
  }

  // Create new profile
  const newProfile: UserProfile = {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    role,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  }
  await setDoc(userRef, newProfile)
  return newProfile
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!db) return null

  const userRef = doc(db, "users", uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) return null
  return userSnap.data() as UserProfile
}
