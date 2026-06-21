"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import { syncUserProfile } from "@/services/user-service"
import type { UserProfile } from "@/config/admin"

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  configured: boolean
  isAdmin: boolean
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const googleProvider = new GoogleAuthProvider()
googleProvider.addScope("email")
googleProvider.addScope("profile")

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        try {
          const userProfile = await syncUserProfile(firebaseUser)
          setProfile(userProfile)
        } catch (err) {
          console.error("Error syncing user profile:", err)
          setProfile(null)
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const clearError = () => setError(null)

  const getErrorMessage = (code: string): string => {
    switch (code) {
      case "auth/email-already-in-use":
        return "Este email ya está registrado. Intentá iniciar sesión."
      case "auth/invalid-email":
        return "El email ingresado no es válido."
      case "auth/weak-password":
        return "La contraseña debe tener al menos 6 caracteres."
      case "auth/user-not-found":
        return "No existe una cuenta con este email."
      case "auth/wrong-password":
        return "Contraseña incorrecta."
      case "auth/invalid-credential":
        return "Email o contraseña incorrectos."
      case "auth/too-many-requests":
        return "Demasiados intentos. Esperá unos minutos."
      case "auth/popup-closed-by-user":
        return "Se cerró la ventana de inicio de sesión."
      case "auth/network-request-failed":
        return "Error de red. Verificá tu conexión a internet."
      default:
        return "Ocurrió un error. Intentá de nuevo."
    }
  }

  const checkConfig = () => {
    if (!isFirebaseConfigured || !auth) {
      setError("Firebase no está configurado. Agregá las credenciales en .env.local")
      return false
    }
    return true
  }

  const signInWithGoogle = async () => {
    if (!checkConfig()) return
    try {
      setError(null)
      await signInWithPopup(auth!, googleProvider)
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || ""
      if (code !== "auth/popup-closed-by-user") {
        setError(getErrorMessage(code))
      }
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    if (!checkConfig()) return
    try {
      setError(null)
      await signInWithEmailAndPassword(auth!, email, password)
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || ""
      setError(getErrorMessage(code))
    }
  }

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    if (!checkConfig()) return
    try {
      setError(null)
      const result = await createUserWithEmailAndPassword(auth!, email, password)
      await updateProfile(result.user, { displayName: name })
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || ""
      setError(getErrorMessage(code))
    }
  }

  const signOut = async () => {
    if (!auth) return
    try {
      setError(null)
      setProfile(null)
      await firebaseSignOut(auth)
    } catch {
      setError("Error al cerrar sesión.")
    }
  }

  const resetPassword = async (email: string) => {
    if (!checkConfig()) return
    try {
      setError(null)
      await sendPasswordResetEmail(auth!, email)
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || ""
      setError(getErrorMessage(code))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        configured: isFirebaseConfigured,
        isAdmin: profile?.role === "admin",
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        resetPassword,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
