"use client"

import { useState } from "react"
import { FadeIn } from "@/components/motion/fade-in"
import { 
  Users, Search, Filter, Mail, Phone, Building2, 
  MoreHorizontal, Star, TrendingUp
} from "lucide-react"

const clients = [
  { id: "1", name: "Constructora Norte S.A.", type: "Empresa", email: "compras@norte.com", phone: "11-4567-8900", ltv: "$4.5M", lastOrder: "Ayer", status: "Vip" },
  { id: "2", name: "Arq. Estudio Design", type: "Arquitecto", email: "contacto@estudio.com", phone: "11-2345-6789", ltv: "$1.2M", lastOrder: "Hace 1 semana", status: "Activo" },
  { id: "3", name: "Juan Pérez", type: "Minorista", email: "juan@gmail.com", phone: "11-9876-5432", ltv: "$450k", lastOrder: "Hoy", status: "Nuevo" },
  { id: "4", name: "Hotel Lumiere", type: "Empresa", email: "admin@lumiere.com", phone: "11-5555-4444", ltv: "$8.9M", lastOrder: "Hace 2 meses", status: "Vip" },
]

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <FadeIn>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">CRM Clientes</h1>
          <p className="text-muted-foreground mt-1">Directorio de clientes, historial de compras y segmentación.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-xl bg-cyan px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan/90">
          <Users className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-cyan/10 rounded-xl"><Users className="h-6 w-6 text-cyan" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Clientes</p>
            <p className="text-2xl font-bold font-heading">1,248</p>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl"><Building2 className="h-6 w-6 text-emerald-500" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Empresas B2B</p>
            <p className="text-2xl font-bold font-heading">156</p>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl"><Star className="h-6 w-6 text-purple-500" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Clientes VIP</p>
            <p className="text-2xl font-bold font-heading">42</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/20">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-lg border border-border/50 bg-background pl-10 pr-4 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <Filter className="h-4 w-4" /> Tipo
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <TrendingUp className="h-4 w-4" /> LTV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Cliente</th>
                <th className="px-6 py-4 font-medium">Contacto</th>
                <th className="px-6 py-4 font-medium">Segmento</th>
                <th className="px-6 py-4 font-medium text-right">LTV (Valor Historico)</th>
                <th className="px-6 py-4 font-medium text-right">Última Compra</th>
                <th className="px-6 py-4 font-medium text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{client.name}</span>
                      <span className="text-xs text-muted-foreground mt-0.5">{client.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-muted-foreground hover:text-cyan transition-colors">
                        <Mail className="h-3.5 w-3.5" /> <span className="text-xs">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground hover:text-cyan transition-colors">
                        <Phone className="h-3.5 w-3.5" /> <span className="text-xs">{client.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      client.status === 'Vip' ? 'bg-purple-500/10 text-purple-500' : 
                      client.status === 'Nuevo' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {client.status === 'Vip' && <Star className="h-3 w-3 mr-1 fill-current" />}
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-cyan">
                    {client.ltv}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {client.lastOrder}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FadeIn>
  )
}
