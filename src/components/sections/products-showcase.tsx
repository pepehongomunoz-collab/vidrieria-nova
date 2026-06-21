"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FadeIn } from "@/components/motion/fade-in"
import { TextReveal } from "@/components/motion/text-reveal"
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    title: "Ventanas de Aluminio",
    description: "Diseños modernos con máxima durabilidad y aislación.",
    href: "/catalogo/ventanas-aluminio",
    image: "/images/products/ventanas-aluminio.png",
  },
  {
    title: "Ventanas PVC",
    description: "Eficiencia energética superior con perfiles europeos.",
    href: "/catalogo/ventanas-pvc",
    image: "/images/products/ventanas-pvc.png",
  },
  {
    title: "DVH",
    description: "Doble vidriado hermético para confort térmico y acústico.",
    href: "/catalogo/dvh",
    image: "/images/products/dvh.png",
  },
  {
    title: "Vidrios Templados",
    description: "Seguridad y resistencia 5 veces superior al vidrio común.",
    href: "/catalogo/vidrios-templados",
    image: "/images/products/vidrio-templado.png",
  },
  {
    title: "Cerramientos",
    description: "Cerramos tu balcón o galería con elegancia y seguridad.",
    href: "/catalogo/cerramientos",
    image: "/images/products/cerramientos.png",
  },
  {
    title: "Mamparas",
    description: "Mamparas de baño en vidrio templado a medida.",
    href: "/catalogo/mamparas",
    image: "/images/products/mamparas.png",
  },
]

export function ProductsShowcase() {
  return (
    <section className="section-padding relative" id="products">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan">
              Catálogo
            </p>
          </FadeIn>
          <TextReveal
            text="Nuestros Productos"
            as="h2"
            className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl"
            delay={0.1}
          />
          <FadeIn delay={0.3}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Soluciones integrales en aluminio, PVC y vidrio para cada necesidad.
              Fabricación a medida con los más altos estándares de calidad.
            </p>
          </FadeIn>
        </div>

        {/* Product Grid */}
        <StaggerChildren
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {categories.map((category) => (
            <StaggerItem key={category.title}>
              <Link href={category.href} className="group block">
                <motion.div
                  className="relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:border-cyan/30 hover:shadow-premium"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-70" />

                    {/* Glass shine on hover */}
                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    <h3 className="font-heading text-lg font-semibold tracking-tight">
                      {category.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-cyan opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Ver productos
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
