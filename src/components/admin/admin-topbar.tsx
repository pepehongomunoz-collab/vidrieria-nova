"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/providers/auth-provider"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { 
  Bell, Search, LogOut, Info, AlertTriangle, 
  CheckCircle2, AlertCircle, Check, Trash2, BellOff 
} from "lucide-react"
import Image from "next/image"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: 'info' | 'warning' | 'success' | 'urgent'
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Orden Urgente",
    description: "La OT-2045 (Juan Pérez) requiere atención inmediata.",
    time: "Hace 5 min",
    type: "urgent",
    read: false,
  },
  {
    id: "2",
    title: "Stock Bajo de Perfiles",
    description: "Quedan menos de 10 barras de Perfil Modena Corrediza en almacén.",
    time: "Hace 1 hora",
    type: "warning",
    read: false,
  },
  {
    id: "3",
    title: "Control de Calidad Aprobado",
    description: "La OT-2042 ha pasado el control de calidad satisfactoriamente.",
    time: "Hace 2 horas",
    type: "success",
    read: true,
  },
  {
    id: "4",
    title: "Nuevo Pedido Web",
    description: "Se ha recibido un nuevo presupuesto a través del catálogo web.",
    time: "Hace 1 día",
    type: "info",
    read: true,
  }
]

export function AdminTopbar() {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const toggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n))
  }

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'urgent':
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
            <AlertCircle className="h-4 w-4" />
          </div>
        )
      case 'warning':
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <AlertTriangle className="h-4 w-4" />
          </div>
        )
      case 'success':
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        )
      default:
        return (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <Info className="h-4 w-4" />
          </div>
        )
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      {/* Search Bar */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar productos, pedidos o clientes (⌘K)..."
            className="h-10 w-full rounded-lg border border-border/50 bg-muted/50 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications Bell & Dropdown */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-muted/50 hover:bg-muted transition-all duration-200 ${isOpen ? 'scale-105 border-cyan text-cyan' : ''}`}
            aria-label="Notificaciones"
          >
            <Bell className={`h-4 w-4 transition-colors ${isOpen ? 'text-cyan' : 'text-muted-foreground'}`} />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background animate-pulse" />
            )}
          </button>

          {/* Dropdown Panel */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-3 w-80 sm:w-96 origin-top-right rounded-2xl border border-border/50 bg-background/95 p-2 shadow-xl backdrop-blur-md focus:outline-none animate-in fade-in-50 slide-in-from-top-3 duration-200 z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm">Notificaciones</span>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-cyan/10 px-2 py-0.5 text-[10px] font-bold text-cyan">
                      {unreadCount} nuevas
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-semibold text-cyan hover:text-cyan/80 transition-colors"
                  >
                    Marcar leídas
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-[320px] overflow-y-auto py-1 divide-y divide-border/30">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      onClick={(e) => toggleRead(notification.id, e as any)}
                      className={`group relative flex gap-3 p-3 hover:bg-muted/40 transition-colors rounded-xl cursor-pointer ${!notification.read ? 'bg-muted/20' : ''}`}
                    >
                      {getIcon(notification.type)}
                      <div className="flex-1 space-y-1 pr-6">
                        <div className="flex items-center gap-1.5">
                          <p className={`text-xs font-bold leading-none ${!notification.read ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                          )}
                        </div>
                        <p className="text-[11px] leading-snug text-muted-foreground">
                          {notification.description}
                        </p>
                        <p className="text-[9px] text-muted-foreground/60">
                          {notification.time}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => deleteNotification(notification.id, e)}
                          className="p-1 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                    <BellOff className="h-8 w-8 mb-2 stroke-[1.5]" />
                    <p className="text-xs font-medium">No hay notificaciones</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">Te avisaremos cuando pase algo importante.</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="border-t border-border/50 pt-2 px-1 flex justify-end">
                  <button
                    onClick={clearAll}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Limpiar todo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <ThemeToggle />

        <div className="h-6 w-px bg-border/50 mx-2" />

        <div className="flex items-center gap-3">
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-sm font-semibold">{user?.displayName?.split(" ")[0] || "Admin"}</span>
            <span className="text-xs text-muted-foreground">Administrador</span>
          </div>
          
          {user?.photoURL ? (
             <Image src={user.photoURL} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover border border-border" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan text-white">
              <span className="text-xs font-bold">
                {(user?.displayName || "A").charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

