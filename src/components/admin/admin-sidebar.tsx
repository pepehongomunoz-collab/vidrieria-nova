"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  Settings, Tags, Factory, Truck, PieChart, Menu, X
} from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const adminNav = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Productos", href: "/admin/productos", icon: Package },
  { title: "Categorías", href: "/admin/categorias", icon: Tags },
  { title: "Pedidos", href: "/admin/pedidos", icon: ShoppingCart },
  { title: "Producción", href: "/admin/produccion", icon: Factory },
  { title: "Logística", href: "/admin/logistica", icon: Truck },
  { title: "Clientes", href: "/admin/clientes", icon: Users },
  { title: "Reportes", href: "/admin/reportes", icon: PieChart },
  { title: "Configuración", href: "/admin/configuracion", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const SidebarContent = () => (
    <>
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-border/50">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan text-white">
            <span className="font-bold text-sm">VN</span>
          </div>
          <span className="font-heading text-lg font-bold tracking-tight">Admin</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {adminNav.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-cyan/10 text-cyan"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-cyan" : "text-muted-foreground")} />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border/50">
        <div className="rounded-xl bg-gradient-to-br from-cyan/10 to-blue-500/10 p-4">
          <p className="text-xs font-semibold text-cyan">Plan Enterprise</p>
          <p className="text-xs text-muted-foreground mt-1">Capacidad ilimitada</p>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-cyan text-white shadow-xl md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-card shadow-2xl md:hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
