"use client"

import { useAuth } from "@/providers/auth-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FadeIn } from "@/components/motion/fade-in"
import Link from "next/link"
import {
  Package, ShoppingCart, Users, Settings, TrendingUp,
  AlertCircle, Plus, ChevronRight
} from "lucide-react"

const adminStats = [
  { label: "Ventas Totales", value: "$1.2M", icon: TrendingUp, trend: "+12%" },
  { label: "Pedidos Nuevos", value: "24", icon: ShoppingCart, trend: "+5%" },
  { label: "Productos Activos", value: "22", icon: Package, trend: "0%" },
  { label: "Usuarios Registrados", value: "145", icon: Users, trend: "+18%" },
]

const adminModules = [
  {
    title: "Catálogo",
    description: "Gestionar productos, categorías y stock",
    icon: Package,
    href: "/admin/productos",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Pedidos",
    description: "Ver y actualizar estado de las ventas",
    icon: ShoppingCart,
    href: "/admin/pedidos",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Usuarios",
    description: "Administrar clientes y roles",
    icon: Users,
    href: "/admin/usuarios",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Configuración",
    description: "Ajustes generales de la tienda",
    icon: Settings,
    href: "/admin/configuracion",
    color: "text-slate-500",
    bg: "bg-slate-500/10",
  },
]

export default function AdminDashboardPage() {
  const { user } = useAuth()

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 md:pt-28 pb-16">
        <div className="container-custom">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight">
                  Panel de Administración
                </h1>
                <p className="text-muted-foreground mt-1">
                  Bienvenido de vuelta, {user?.displayName?.split(" ")[0] || "Admin"}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="inline-flex items-center justify-center rounded-xl bg-cyan px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Producto
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
              {adminStats.map((stat, i) => (
                <div key={i} className="rounded-2xl border border-border/50 bg-card/50 p-6">
                  <div className="flex items-center justify-between">
                    <stat.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                      {stat.trend}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold font-heading mt-1">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-heading text-xl font-bold mb-4">Módulos</h2>

            {/* Modules Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
              {adminModules.map((mod, i) => (
                <Link
                  key={i}
                  href={mod.href}
                  className="group flex flex-col justify-between rounded-2xl border border-border/50 bg-card/50 p-6 transition-all hover:border-cyan/30 hover:shadow-premium"
                >
                  <div>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${mod.bg}`}>
                      <mod.icon className={`h-6 w-6 ${mod.color}`} />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">{mod.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {mod.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-sm font-medium text-cyan">
                    Gestionar <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Alerts/Recent Activity */}
            <div className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden">
              <div className="border-b border-border/50 px-6 py-4 flex justify-between items-center bg-muted/20">
                <h3 className="font-heading font-semibold">Actividad Reciente</h3>
                <button className="text-sm text-cyan font-medium hover:underline">Ver todo</button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <p className="text-sm flex-1">Nuevo pedido #1042 realizado por Juan Pérez</p>
                  <span className="text-xs text-muted-foreground">Hace 10 min</span>
                </div>
                <div className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <p className="text-sm flex-1">Usuario registrado: Maria Gomez</p>
                  <span className="text-xs text-muted-foreground">Hace 1 hora</span>
                </div>
                <div className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <p className="text-sm flex-1">Stock bajo en Ventana Oscilobatiente Modena</p>
                  <span className="text-xs text-muted-foreground">Hace 3 horas</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
