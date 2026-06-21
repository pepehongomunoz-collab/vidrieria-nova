"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"
import { useAuth } from "@/providers/auth-provider"
import { FadeIn } from "@/components/motion/fade-in"
import { TextReveal } from "@/components/motion/text-reveal"
import { Button } from "@/components/ui/button"
import {
  Loader2, User, Mail, ShoppingBag, Heart, Clock,
  LogOut, ChevronRight, Settings, FileText,
} from "lucide-react"

const menuItems = [
  { icon: ShoppingBag, label: "Mis Pedidos", description: "Ver historial de compras", href: "#" },
  { icon: Heart, label: "Favoritos", description: "Productos guardados", href: "#" },
  { icon: FileText, label: "Presupuestos", description: "Presupuestos solicitados", href: "#" },
  { icon: Clock, label: "Historial", description: "Actividad reciente", href: "#" },
  { icon: Settings, label: "Configuración", description: "Datos de cuenta y preferencias", href: "#" },
]

export default function MiCuentaPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center pt-20">
          <Loader2 className="h-8 w-8 animate-spin text-cyan" />
        </main>
        <Footer />
      </>
    )
  }

  if (!user) return null

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28">
        <div className="container-custom">
          {/* Profile Header */}
          <FadeIn>
            <div className="flex flex-col items-center gap-6 rounded-2xl border border-border/50 bg-card/50 p-8 md:flex-row md:p-10">
              {/* Avatar */}
              <div className="relative">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || "Avatar"}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full border-2 border-cyan/30 object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-cyan/60">
                    <User className="h-8 w-8 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-background bg-emerald-500" />
              </div>

              <div className="text-center md:text-left">
                <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                  {user.displayName || "Usuario"}
                </h1>
                <div className="mt-1 flex items-center justify-center gap-2 text-sm text-muted-foreground md:justify-start">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Miembro desde {user.metadata.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString("es-AR", { month: "long", year: "numeric" })
                    : "hoy"}
                </p>
              </div>

              <div className="md:ml-auto">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Menu Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item, index) => (
              <FadeIn key={item.label} delay={0.05 * index}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-6 transition-all hover:border-cyan/30 hover:shadow-premium"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan/10 transition-colors group-hover:bg-cyan/20">
                    <item.icon className="h-5 w-5 text-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold">{item.label}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Empty state for orders */}
          <FadeIn delay={0.3}>
            <div className="mt-8 rounded-2xl border border-border/50 bg-card/50 p-12 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <h2 className="mt-4 font-heading text-xl font-bold">Aún no tenés pedidos</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Explorá nuestro catálogo y hacé tu primer compra.
              </p>
              <Link
                href="/catalogo"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan/90"
              >
                Ver Catálogo <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
