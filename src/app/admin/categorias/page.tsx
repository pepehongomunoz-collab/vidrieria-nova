"use client"

import { useState } from "react"
import { FadeIn } from "@/components/motion/fade-in"
import { 
  Plus, Search, Edit, Trash2, FolderTree, Tag, GripVertical
} from "lucide-react"

const mockCategories = [
  { id: "1", name: "Ventanas", slug: "ventanas", count: 12, status: "Activo" },
  { id: "2", name: "Puertas", slug: "puertas", count: 8, status: "Activo" },
  { id: "3", name: "Cerramientos", slug: "cerramientos", count: 5, status: "Activo" },
  { id: "4", name: "Mamparas", slug: "mamparas", count: 6, status: "Inactivo" },
  { id: "5", name: "Vidrios a Medida", slug: "vidrios", count: 15, status: "Activo" },
]

export default function CategoriasPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = mockCategories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <FadeIn>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Categorías</h1>
          <p className="text-muted-foreground mt-1">Organiza tu catálogo por líneas de producto.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-xl bg-cyan px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan/90">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Categoría
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Jerarquía Visual */}
        <div className="rounded-2xl border border-border/50 bg-card shadow-sm p-6 lg:col-span-1">
          <h2 className="flex items-center gap-2 font-heading text-lg font-semibold mb-6">
            <FolderTree className="h-5 w-5 text-cyan" /> Jerarquía
          </h2>
          
          <div className="space-y-2">
            {mockCategories.map(cat => (
              <div key={cat.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer group">
                <GripVertical className="h-4 w-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Tag className="h-4 w-4 text-cyan" />
                <span className="text-sm font-medium flex-1">{cat.name}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabla de Gestión */}
        <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden lg:col-span-2">
          <div className="p-4 border-b border-border/50 bg-muted/20">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-lg border border-border/50 bg-background pl-10 pr-4 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Nombre</th>
                  <th className="px-6 py-4 font-medium">Slug</th>
                  <th className="px-6 py-4 font-medium text-center">Productos</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filtered.map((cat) => (
                  <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{cat.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">/{cat.slug}</td>
                    <td className="px-6 py-4 text-center">{cat.count}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        cat.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
                      }`}>
                        {cat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-muted-foreground hover:text-cyan transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </FadeIn>
  )
}
