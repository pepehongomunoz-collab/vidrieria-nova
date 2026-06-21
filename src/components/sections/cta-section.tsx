"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"
import { MagneticButton } from "@/components/motion/magnetic-button"

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden" id="cta">
      <div className="container-custom relative">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-card via-card to-muted/30 p-12 md:p-20">
            {/* Background decorations */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan/10 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gold/10 blur-[80px]" />

            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative mx-auto max-w-3xl text-center">
              <motion.h2
                className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Transformá tu espacio{" "}
                <span className="text-gradient">hoy</span>
              </motion.h2>

              <motion.p
                className="mx-auto mt-6 max-w-xl text-muted-foreground leading-relaxed md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Solicitá tu presupuesto sin compromiso. Nuestros asesores te
                guiarán para encontrar la solución perfecta para tu proyecto.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <MagneticButton
                  className="group inline-flex items-center gap-2 rounded-full bg-cyan px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan/25"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Solicitar Presupuesto
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold transition-all hover:bg-muted"
                >
                  Explorar Catálogo
                </Link>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
