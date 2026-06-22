"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { FadeIn } from "@/components/motion/fade-in"
import { getProducts, deleteProduct } from "@/services/product-service"
import type { Product } from "@/types/product"
import {
  Plus, Search, MoreHorizontal, Edit, Trash2, Loader2,
  AlertCircle, Filter
} from "lucide-react"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error("Error cargando productos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteProduct(id)
        setProducts(products.filter(p => p.id !== id))
      } catch (error) {
        console.error("Error al eliminar:", error)
        alert("Error al eliminar el producto")
      }
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <FadeIn>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground mt-1">Gestiona el catálogo de tu tienda.</p>
        </div>
        <Link 
          href="/admin/productos/nuevo" 
          className="inline-flex items-center justify-center rounded-xl bg-cyan px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Link>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/20">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre o SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-lg border border-border/50 bg-background pl-10 pr-4 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium hover:bg-muted transition-colors w-full sm:w-auto justify-center">
            <Filter className="h-4 w-4" />
            Filtros
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Producto</th>
                <th className="px-6 py-4 font-medium">SKU</th>
                <th className="px-6 py-4 font-medium">Categoría</th>
                <th className="px-6 py-4 font-medium text-right">Precio</th>
                <th className="px-6 py-4 font-medium text-center">Stock</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-cyan mx-auto" />
                    <p className="mt-2 text-muted-foreground">Cargando catálogo...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground font-medium">No se encontraron productos.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border">
                          {product.images?.[0] ? (
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                              <Package className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div className="font-medium text-foreground line-clamp-2">
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {product.sku || "-"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <span className="inline-flex items-center rounded-full bg-cyan/10 px-2.5 py-0.5 text-xs font-medium text-cyan">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      ${product.price.toLocaleString("es-AR")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        product.stock > 10 ? "bg-emerald-500/10 text-emerald-500" : 
                        product.stock > 0 ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {product.stock} un.
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/productos/editar/${product.id}`}
                          className="p-2 text-muted-foreground hover:text-cyan transition-colors"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-border/50 bg-muted/20 flex items-center justify-between text-sm text-muted-foreground">
          <span>Mostrando {filteredProducts.length} productos</span>
        </div>
      </div>
    </FadeIn>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
