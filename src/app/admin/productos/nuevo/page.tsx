"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FadeIn } from "@/components/motion/fade-in"
import { createProduct } from "@/services/product-service"
import {
  ArrowLeft, Save, Image as ImageIcon, Info, DollarSign, Package
} from "lucide-react"

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Basic State
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [category, setCategory] = useState("Ventanas")
  const [description, setDescription] = useState("")
  
  // Pricing & Inventory
  const [cost, setCost] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("0")

  // Calculated margin
  const costNum = parseFloat(cost) || 0
  const priceNum = parseFloat(price) || 0
  const margin = costNum > 0 && priceNum > costNum 
    ? ((priceNum - costNum) / priceNum) * 100 
    : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price) {
      alert("El nombre y el precio son obligatorios")
      return
    }

    try {
      setLoading(true)
      
      const newProduct = {
        name,
        description,
        price: priceNum,
        category,
        image: "/images/products/placeholder.png", // Por ahora placeholder, luego Storage
        images: ["/images/products/placeholder.png"],
        stock: parseInt(stock) || 0,
        sku,
        cost: costNum,
        margin: parseFloat(margin.toFixed(2)),
        features: [],
        rating: 5,
        reviews: 0
      }

      await createProduct(newProduct)
      router.push("/admin/productos")
      
    } catch (error) {
      console.error("Error creating product:", error)
      alert("Error al guardar el producto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <FadeIn>
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/productos"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight">Nuevo Producto</h1>
              <p className="text-sm text-muted-foreground mt-1">Completa los datos para agregar al catálogo.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/productos" className="px-4 py-2 text-sm font-medium hover:underline text-muted-foreground">
              Cancelar
            </Link>
            <button 
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-cyan px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan/90 disabled:opacity-50"
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Guardando..." : "Guardar Producto"}
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Principal (Izquierda) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Info Básica */}
            <div className="rounded-2xl border border-border/50 bg-card shadow-sm p-6">
              <h2 className="flex items-center gap-2 font-heading text-lg font-semibold mb-6">
                <Info className="h-5 w-5 text-cyan" /> Información Básica
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Nombre del Producto *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ej. Ventana Corrediza Modena"
                    className="w-full rounded-lg border border-border/50 bg-background px-4 py-2 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">Descripción</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe las características técnicas y beneficios..."
                    className="w-full rounded-lg border border-border/50 bg-background px-4 py-2 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Medios / Imágenes */}
            <div className="rounded-2xl border border-border/50 bg-card shadow-sm p-6">
              <h2 className="flex items-center gap-2 font-heading text-lg font-semibold mb-6">
                <ImageIcon className="h-5 w-5 text-cyan" /> Imágenes
              </h2>
              
              <div className="border-2 border-dashed border-border/60 rounded-xl p-10 text-center hover:bg-muted/30 transition-colors cursor-pointer">
                <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium">Haz clic o arrastra imágenes aquí</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG o WEBP (Máx. 5MB)</p>
              </div>
            </div>
          </div>

          {/* Columna Secundaria (Derecha) */}
          <div className="space-y-8">
            
            {/* Organización */}
            <div className="rounded-2xl border border-border/50 bg-card shadow-sm p-6">
              <h2 className="font-heading text-lg font-semibold mb-6">Organización</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Categoría</label>
                  <select 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-border/50 bg-background px-4 py-2 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                  >
                    <option value="Ventanas">Ventanas</option>
                    <option value="Puertas">Puertas</option>
                    <option value="Cerramientos">Cerramientos</option>
                    <option value="Mamparas">Mamparas</option>
                    <option value="Vidrios">Vidrios a Medida</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">SKU (Código interno)</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={e => setSku(e.target.value)}
                    placeholder="Ej. VEN-MOD-001"
                    className="w-full rounded-lg border border-border/50 bg-background px-4 py-2 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                  />
                </div>
              </div>
            </div>

            {/* Precios */}
            <div className="rounded-2xl border border-border/50 bg-card shadow-sm p-6">
              <h2 className="flex items-center gap-2 font-heading text-lg font-semibold mb-6">
                <DollarSign className="h-5 w-5 text-emerald-500" /> Precios
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Precio de Venta ($) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-border/50 bg-background px-4 py-2 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Costo ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={cost}
                      onChange={e => setCost(e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-lg border border-border/50 bg-background px-4 py-2 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Margen (%)</label>
                    <input
                      type="text"
                      readOnly
                      value={`${margin.toFixed(1)}%`}
                      className="w-full rounded-lg border border-border/50 bg-muted/50 px-4 py-2 text-sm text-muted-foreground cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inventario */}
            <div className="rounded-2xl border border-border/50 bg-card shadow-sm p-6">
              <h2 className="flex items-center gap-2 font-heading text-lg font-semibold mb-6">
                <Package className="h-5 w-5 text-amber-500" /> Inventario
              </h2>
              
              <div>
                <label className="block text-sm font-medium mb-1.5">Stock disponible</label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                  className="w-full rounded-lg border border-border/50 bg-background px-4 py-2 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                />
              </div>
            </div>

          </div>
        </div>
      </form>
    </FadeIn>
  )
}
