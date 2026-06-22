"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { Loader2 } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else if (!isAdmin) {
        router.push("/") // Redirigir a inicio si no es admin
      }
    }
  }, [user, isAdmin, loading, router])

  if (loading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-cyan" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      <div className="flex w-full flex-col md:pl-64">
        <AdminTopbar />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
