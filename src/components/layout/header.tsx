"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingBag, Search, User, LogOut } from "lucide-react"
import { navigation } from "@/config/navigation"
import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { CartDrawer } from "@/components/shared/cart-drawer"
import { useCartStore } from "@/store/cart-store"
import { useAuth } from "@/providers/auth-provider"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const { openCart, totalItems } = useCartStore()
  const { user, signOut } = useAuth()

  useEffect(() => setMounted(true), [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileMenuOpen])

  // Close user menu on outside click
  useEffect(() => {
    if (!showUserMenu) return
    const handleClick = () => setShowUserMenu(false)
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [showUserMenu])

  const cartCount = mounted ? totalItems() : 0

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "glass-strong shadow-sm" : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-custom">
          <nav className="flex h-16 items-center justify-between md:h-20" aria-label="Main navigation">
            {/* Logo */}
            <Link href="/" className="group relative z-10 flex items-center gap-2" aria-label={siteConfig.name}>
              <div className="relative flex h-9 w-9 items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan to-cyan/60 opacity-90 transition-transform duration-300 group-hover:scale-110" />
                <svg viewBox="0 0 24 24" fill="none" className="relative h-5 w-5 text-white" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <span className="font-heading text-lg font-bold tracking-tight">
                {siteConfig.name.split(" ")[0]}
                <span className="text-cyan">{siteConfig.name.split(" ")[1] ? ` ${siteConfig.name.split(" ")[1]}` : ""}</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-1 md:flex">
              {navigation.main.map((item) => (
                <Link key={item.href} href={item.href} className="animated-underline relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-colors hover:bg-muted" aria-label="Buscar">
                <Search className="h-4 w-4" />
              </button>

              {/* Cart button */}
              <button
                onClick={openCart}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-colors hover:bg-muted"
                aria-label="Carrito de compras"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan text-[10px] font-bold text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* User button (desktop) */}
              {mounted && user ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowUserMenu(!showUserMenu) }}
                    className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-cyan/50 transition-all hover:border-cyan"
                    aria-label="Mi cuenta"
                  >
                    {user.photoURL ? (
                      <Image src={user.photoURL} alt="" width={36} height={36} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan to-cyan/60">
                        <span className="text-xs font-bold text-white">
                          {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 w-56 overflow-hidden rounded-xl border border-border/50 bg-background shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="border-b border-border/50 px-4 py-3">
                          <p className="text-sm font-semibold line-clamp-1">{user.displayName || "Usuario"}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{user.email}</p>
                        </div>
                        <div className="p-1">
                          {isAdmin && (
                            <Link
                              href="/admin"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-cyan transition-colors hover:bg-cyan/10"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <Settings className="h-4 w-4" />
                              Panel Admin
                            </Link>
                          )}
                          <Link
                            href="/mi-cuenta"
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="h-4 w-4" />
                            Mi Cuenta
                          </Link>
                          <button
                            onClick={() => { signOut(); setShowUserMenu(false) }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <LogOut className="h-4 w-4" />
                            Cerrar Sesión
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login" className="hidden h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-colors hover:bg-muted md:flex" aria-label="Mi cuenta">
                  <User className="h-4 w-4" />
                </Link>
              )}

              <button
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-colors hover:bg-muted md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Abrir menú"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <nav className="flex h-full flex-col items-center justify-center gap-6 p-8">
              {navigation.main.map((item, index) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}>
                  <Link href={item.href} className="font-heading text-3xl font-semibold tracking-tight transition-colors hover:text-cyan" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 flex flex-col items-center gap-4">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link href="/admin" className="flex items-center gap-2 rounded-full border border-cyan text-cyan px-6 py-3 text-sm font-medium transition-colors hover:bg-cyan/10" onClick={() => setIsMobileMenuOpen(false)}>
                        <Settings className="h-4 w-4" /> Panel Admin
                      </Link>
                    )}
                    <Link href="/mi-cuenta" className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="h-4 w-4" /> Mi Cuenta
                    </Link>
                    <button onClick={() => { signOut(); setIsMobileMenuOpen(false) }} className="text-sm font-medium text-red-500 mt-2">
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan/90" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="h-4 w-4" /> Iniciar Sesión
                  </Link>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}
