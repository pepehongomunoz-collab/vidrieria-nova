"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"
import { FadeIn } from "@/components/motion/fade-in"
import { products } from "@/data/products"
import { useCartStore } from "@/store/cart-store"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  ShoppingCart, Check, Minus, Plus, ChevronRight, Truck,
  Shield, RotateCcw, MessageCircle, Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { Separator } from "@/components/ui/separator"

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

function ProductDetail({ product }: { product: typeof products[0] }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    openCart()
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Breadcrumb */}
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Inicio</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/catalogo" className="hover:text-foreground">Catálogo</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>

        {/* Product */}
        <section className="container-custom py-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <FadeIn direction="left">
              <div>
                {/* Main Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
                  <Image
                    src={product.images[selectedImage] || product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Badges */}
                  <div className="absolute left-4 top-4 flex flex-col gap-2">
                    {product.badge && (
                      <span className="rounded-full bg-cyan px-3 py-1 text-xs font-bold uppercase text-white">{product.badge}</span>
                    )}
                    {discount > 0 && (
                      <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">-{discount}%</span>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="mt-4 flex gap-3">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all ${
                          selectedImage === i ? "border-cyan" : "border-border/50 hover:border-border"
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Info */}
            <FadeIn direction="right">
              <div>
                {/* Category */}
                <Link
                  href={`/catalogo?category=${product.category}`}
                  className="inline-flex items-center rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan hover:bg-cyan/20 transition-colors"
                >
                  {product.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>

                <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight md:text-4xl">
                  {product.name}
                </h1>

                {/* Rating placeholder */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" style={{ color: i < 4 ? "oklch(0.72 0.12 85)" : "oklch(0.72 0.12 85 / 30%)" }} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(24 reseñas)</span>
                </div>

                {/* Price */}
                <div className="mt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-4xl font-bold text-cyan">
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {discount > 0 && (
                    <p className="mt-1 text-sm font-medium text-emerald-500">
                      Ahorrás {formatCurrency(product.originalPrice! - product.price)} ({discount}% OFF)
                    </p>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    Precio final. Hasta 12 cuotas sin interés.
                  </p>
                </div>

                <Separator className="my-6" />

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="mt-6">
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">
                    Especificaciones
                  </h3>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="rounded-lg bg-muted/50 px-4 py-3">
                        <p className="text-xs text-muted-foreground">{spec.label}</p>
                        <p className="mt-0.5 text-sm font-semibold">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Quantity + Add to cart */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Quantity */}
                  <div className="flex items-center gap-1 rounded-lg border border-border/50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-l-lg hover:bg-muted"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="flex h-11 w-12 items-center justify-center font-heading text-lg font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-11 w-11 items-center justify-center rounded-r-lg hover:bg-muted"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className={`h-11 flex-1 rounded-xl text-sm font-semibold transition-all ${
                      isAdded ? "bg-emerald-500 hover:bg-emerald-600" : "bg-cyan hover:bg-cyan/90"
                    } text-white`}
                  >
                    {isAdded ? (
                      <><Check className="mr-2 h-4 w-4" /> ¡Agregado al carrito!</>
                    ) : (
                      <><ShoppingCart className="mr-2 h-4 w-4" /> Agregar al Carrito</>
                    )}
                  </Button>
                </div>

                <Button
                  onClick={handleBuyNow}
                  variant="outline"
                  className="mt-3 h-11 w-full rounded-xl border-cyan text-cyan hover:bg-cyan/5"
                >
                  Comprar Ahora
                </Button>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(`Hola, me interesa el producto: ${product.name} (${formatCurrency(product.price)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366]/10 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                >
                  <MessageCircle className="h-4 w-4" fill="currentColor" />
                  Consultar por WhatsApp
                </a>

                {/* Trust badges */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { icon: Truck, label: "Envío a todo el país" },
                    { icon: Shield, label: "Garantía 10 años" },
                    { icon: RotateCcw, label: "Devolución 30 días" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-2 rounded-xl border border-border/50 p-3 text-center">
                      <Icon className="h-5 w-5 text-cyan" />
                      <span className="text-[10px] font-medium text-muted-foreground leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="section-padding">
            <div className="container-custom">
              <h2 className="font-heading text-2xl font-bold">Productos Relacionados</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => (
                  <Link key={p.id} href={`/catalogo/${p.slug}`} className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:border-cyan/30 hover:shadow-premium">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="25vw" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold line-clamp-1">{p.name}</h3>
                      <p className="mt-1 font-heading text-lg font-bold text-cyan">{formatCurrency(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
