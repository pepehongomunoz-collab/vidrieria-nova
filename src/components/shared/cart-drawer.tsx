"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCartStore } from "@/store/cart-store"
import { formatCurrency } from "@/lib/utils"
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice, totalSavings } = useCartStore()

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 p-6">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-cyan" />
                <h2 className="font-heading text-lg font-bold">Carrito</h2>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan text-xs font-bold text-white">
                  {totalItems()}
                </span>
              </div>
              <button onClick={closeCart} className="rounded-full p-2 hover:bg-muted" aria-label="Cerrar carrito">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground/30" />
                  <p className="font-heading text-lg font-semibold">Tu carrito está vacío</p>
                  <p className="mt-1 text-sm text-muted-foreground">Explorá nuestro catálogo y agregá productos.</p>
                  <Link href="/catalogo" onClick={closeCart} className="mt-6 inline-flex items-center rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-white hover:bg-cyan/90 transition-colors">
                    Ver Catálogo
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4 rounded-xl border border-border/50 bg-card/50 p-4"
                    >
                      {/* Image */}
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col">
                        <h3 className="text-sm font-semibold leading-tight line-clamp-2">
                          {item.product.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm font-bold text-cyan">
                            {formatCurrency(item.product.price)}
                          </span>
                          {item.product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatCurrency(item.product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Quantity controls */}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-lg border border-border/50">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-l-lg hover:bg-muted"
                              aria-label="Reducir cantidad"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="flex h-7 w-8 items-center justify-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-r-lg hover:bg-muted"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border/50 p-6">
                {totalSavings() > 0 && (
                  <div className="mb-3 flex items-center justify-between rounded-lg bg-emerald-500/10 px-4 py-2 text-sm">
                    <span className="text-emerald-600 dark:text-emerald-400">Ahorrás</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(totalSavings())}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-heading text-2xl font-bold">
                    {formatCurrency(totalPrice())}
                  </span>
                </div>

                <Link
                  href="/carrito"
                  onClick={closeCart}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan text-sm font-semibold text-white transition-colors hover:bg-cyan/90"
                >
                  Finalizar Compra <ArrowRight className="h-4 w-4" />
                </Link>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Envío y forma de pago en el siguiente paso
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
