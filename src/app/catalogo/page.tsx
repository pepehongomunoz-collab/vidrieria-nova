"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"
import { FadeIn } from "@/components/motion/fade-in"
import { TextReveal } from "@/components/motion/text-reveal"
import { products, categories } from "@/data/products"
import { useCartStore } from "@/store/cart-store"
import { formatCurrency } from "@/lib/utils"
import type { ProductCategory, SortOption } from "@/types/product"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import {
  Search, SlidersHorizontal, Grid3X3, List, ShoppingCart, Heart,
  ArrowUpDown, X, Check, Tag,
} from "lucide-react"

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "name-asc", label: "A - Z" },
  { value: "name-desc", label: "Z - A" },
]

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const cartItems = useCartStore((s) => s.items)
  const [addedId, setAddedId] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [searchQuery, selectedCategory, sortBy])

  const handleAddToCart = (product: typeof products[0]) => {
    addItem(product)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  const isInCart = (id: string) => cartItems.some((item) => item.product.id === id)

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 via-transparent to-transparent" />
          <div className="container-custom relative">
            <div className="mx-auto max-w-3xl text-center">
              <FadeIn>
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Tienda</p>
              </FadeIn>
              <TextReveal text="Catálogo de Productos" as="h1" className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-6xl" delay={0.1} />
              <FadeIn delay={0.3}>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {filteredProducts.length} productos disponibles. Fabricación a medida con envío a todo el país.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="sticky top-16 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl md:top-20">
          <div className="container-custom py-3">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 rounded-lg bg-muted/50 pl-10 pr-8 text-sm"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors ${showFilters ? "border-cyan bg-cyan/10 text-cyan" : "border-border/50 hover:bg-muted"}`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtrar
                {selectedCategory !== "all" && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan text-[10px] font-bold text-white">1</span>
                )}
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-10 rounded-lg border border-border/50 bg-background px-3 text-sm outline-none hover:bg-muted"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              {/* View toggle */}
              <div className="hidden items-center gap-1 rounded-lg border border-border/50 p-0.5 md:flex">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-md p-2 ${viewMode === "grid" ? "bg-muted" : ""}`}
                  aria-label="Vista grilla"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-md p-2 ${viewMode === "list" ? "bg-muted" : ""}`}
                  aria-label="Vista lista"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Category filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-3">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${selectedCategory === "all" ? "bg-cyan text-white" : "border border-border/50 hover:bg-muted"}`}
                    >
                      Todos ({products.length})
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${selectedCategory === cat.slug ? "bg-cyan text-white" : "border border-border/50 hover:bg-muted"}`}
                      >
                        {cat.name} ({products.filter((p) => p.category === cat.slug).length})
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Products */}
        <section className="section-padding pt-8">
          <div className="container-custom">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground/30" />
                <p className="font-heading text-xl font-semibold">No se encontraron productos</p>
                <p className="mt-2 text-sm text-muted-foreground">Probá con otro término de búsqueda o categoría.</p>
                <button onClick={() => { setSearchQuery(""); setSelectedCategory("all") }} className="mt-4 text-sm font-medium text-cyan hover:underline">
                  Limpiar filtros
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:border-cyan/30 hover:shadow-premium">
                        {/* Image */}
                        <Link href={`/catalogo/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                          <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                          {/* Badges */}
                          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                            {product.badge && (
                              <span className="rounded-full bg-cyan px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">{product.badge}</span>
                            )}
                            {product.originalPrice && (
                              <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                              </span>
                            )}
                          </div>

                          {/* Quick add */}
                          <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <button
                              onClick={(e) => { e.preventDefault(); handleAddToCart(product) }}
                              className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all ${addedId === product.id ? "bg-emerald-500 text-white" : isInCart(product.id) ? "bg-cyan/90 text-white" : "bg-white text-foreground hover:bg-cyan hover:text-white dark:bg-card"}`}
                              aria-label="Agregar al carrito"
                            >
                              {addedId === product.id ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                            </button>
                          </div>
                        </Link>

                        {/* Info */}
                        <div className="p-5">
                          <Link href={`/catalogo/${product.slug}`}>
                            <h3 className="font-heading text-sm font-semibold leading-tight line-clamp-2 hover:text-cyan transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="mt-1.5 text-xs text-muted-foreground line-clamp-1">
                            {product.shortDescription}
                          </p>
                          <div className="mt-3 flex items-end justify-between">
                            <div>
                              <span className="font-heading text-lg font-bold text-cyan">
                                {formatCurrency(product.price)}
                              </span>
                              {product.originalPrice && (
                                <span className="ml-2 text-xs text-muted-foreground line-through">
                                  {formatCurrency(product.originalPrice)}
                                </span>
                              )}
                            </div>
                            {product.inStock ? (
                              <span className="text-[10px] font-medium text-emerald-500">En stock</span>
                            ) : (
                              <span className="text-[10px] font-medium text-red-500">Agotado</span>
                            )}
                          </div>

                          {/* Add to cart button */}
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-lg text-xs font-semibold transition-all ${
                              addedId === product.id
                                ? "bg-emerald-500 text-white"
                                : isInCart(product.id)
                                ? "border border-cyan/30 bg-cyan/5 text-cyan hover:bg-cyan/10"
                                : "bg-cyan/10 text-cyan hover:bg-cyan hover:text-white"
                            }`}
                          >
                            {addedId === product.id ? (
                              <><Check className="h-3.5 w-3.5" /> ¡Agregado!</>
                            ) : isInCart(product.id) ? (
                              <><ShoppingCart className="h-3.5 w-3.5" /> Agregar más</>
                            ) : (
                              <><ShoppingCart className="h-3.5 w-3.5" /> Agregar al carrito</>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* List View */
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-cyan/30 hover:shadow-premium"
                    >
                      <div className="flex gap-0">
                        <Link href={`/catalogo/${product.slug}`} className="relative w-48 shrink-0 overflow-hidden md:w-64">
                          <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="256px" />
                          {product.badge && (
                            <span className="absolute left-3 top-3 rounded-full bg-cyan px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">{product.badge}</span>
                          )}
                        </Link>
                        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                          <div>
                            <Link href={`/catalogo/${product.slug}`}>
                              <h3 className="font-heading text-lg font-semibold hover:text-cyan transition-colors">{product.name}</h3>
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.shortDescription}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div>
                              <span className="font-heading text-xl font-bold text-cyan">{formatCurrency(product.price)}</span>
                              {product.originalPrice && (
                                <span className="ml-2 text-sm text-muted-foreground line-through">{formatCurrency(product.originalPrice)}</span>
                              )}
                            </div>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className={`flex h-10 items-center gap-2 rounded-lg px-5 text-sm font-semibold transition-all ${
                                addedId === product.id
                                  ? "bg-emerald-500 text-white"
                                  : "bg-cyan text-white hover:bg-cyan/90"
                              }`}
                            >
                              {addedId === product.id ? <><Check className="h-4 w-4" /> Agregado</> : <><ShoppingCart className="h-4 w-4" /> Agregar</>}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
