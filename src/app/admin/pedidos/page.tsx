"use client"

import { useState } from "react"
import { FadeIn } from "@/components/motion/fade-in"
import { 
  Search, Filter, MoreHorizontal, FileText, Download, 
  MessageCircle, Clock, CheckCircle2, Factory, Truck
} from "lucide-react"

// Types for Kanban
type OrderStatus = 'pending' | 'paid' | 'production' | 'shipping' | 'delivered'

interface Order {
  id: string
  client: string
  date: string
  total: number
  status: OrderStatus
  items: number
}

const mockOrders: Order[] = [
  { id: "1042", client: "Juan Pérez", date: "Hoy, 10:30", total: 450000, status: "pending", items: 2 },
  { id: "1041", client: "Constructora Norte", date: "Hoy, 09:15", total: 1250000, status: "paid", items: 15 },
  { id: "1040", client: "María Gómez", date: "Ayer", total: 85000, status: "production", items: 1 },
  { id: "1039", client: "Arq. Estudio", date: "Ayer", total: 890000, status: "shipping", items: 8 },
  { id: "1038", client: "Carlos Ruiz", date: "Hace 2 días", total: 120000, status: "delivered", items: 3 },
]

const columns: { id: OrderStatus, title: string, icon: any, color: string, bg: string }[] = [
  { id: 'pending', title: 'Pendientes', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 'paid', title: 'Pagados', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'production', title: 'En Producción', icon: Factory, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'shipping', title: 'En Camino', icon: Truck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
]

export default function PedidosPage() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban')

  return (
    <FadeIn className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Pedidos</h1>
          <p className="text-muted-foreground mt-1">Gestiona el flujo de ventas, producción y entregas.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex rounded-lg border border-border/50 p-1 bg-muted/20">
            <button 
              onClick={() => setView('kanban')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === 'kanban' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Kanban
            </button>
            <button 
              onClick={() => setView('list')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Lista
            </button>
          </div>
          <button className="inline-flex items-center justify-center rounded-xl bg-cyan px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan/90">
            <FileText className="mr-2 h-4 w-4" />
            Crear Cotización
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8 shrink-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por cliente o # pedido..."
            className="h-10 w-full rounded-lg border border-border/50 bg-card pl-10 pr-4 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border/50 bg-card shadow-sm px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
          <Filter className="h-4 w-4" /> Filtros
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-border/50 bg-card shadow-sm px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
          <Download className="h-4 w-4" /> Exportar
        </button>
      </div>

      {view === 'kanban' ? (
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max h-full">
            {columns.map(col => {
              const colOrders = mockOrders.filter(o => o.status === col.id)
              
              return (
                <div key={col.id} className="w-[320px] flex flex-col h-full bg-muted/10 rounded-2xl p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${col.bg}`}>
                        <col.icon className={`h-4 w-4 ${col.color}`} />
                      </div>
                      <h3 className="font-semibold">{col.title}</h3>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {colOrders.length}
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    {colOrders.map(order => (
                      <div key={order.id} className="bg-card rounded-xl p-4 border border-border/50 shadow-sm cursor-grab active:cursor-grabbing hover:border-cyan/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-cyan bg-cyan/10 px-2 py-0.5 rounded-md">
                            #{order.id}
                          </span>
                          <button className="text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{order.client}</h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span>{order.date}</span>
                          <span>•</span>
                          <span>{order.items} ítems</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-border/50 pt-3">
                          <span className="font-semibold text-sm">${order.total.toLocaleString("es-AR")}</span>
                          <button className="p-1.5 rounded-md hover:bg-cyan/10 hover:text-cyan transition-colors text-muted-foreground" title="Contactar por WhatsApp">
                            <MessageCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden flex-1">
          {/* Table view placeholder */}
          <div className="p-12 text-center text-muted-foreground">
            Vista de lista en desarrollo.
          </div>
        </div>
      )}
    </FadeIn>
  )
}
