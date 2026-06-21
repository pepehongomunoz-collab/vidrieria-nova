// Admin email whitelist — these accounts get admin privileges automatically
export const ADMIN_EMAILS: string[] = [
  "munozalbelonicolas@gmail.com",
]

export type UserRole = "admin" | "customer"

export interface UserProfile {
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
  role: UserRole
  createdAt: string
  lastLoginAt: string
}
