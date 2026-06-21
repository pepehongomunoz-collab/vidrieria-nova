"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TextReveal } from "@/components/motion/text-reveal"
import { FadeIn } from "@/components/motion/fade-in"
import { MagneticButton } from "@/components/motion/magnetic-button"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      id="hero"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-background to-background dark:from-background dark:via-background" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-[30%] left-[15%] h-[500px] w-[500px] rounded-full opacity-30 blur-[100px] dark:opacity-15"
          style={{
            background: "radial-gradient(circle, oklch(0.80 0.14 200 / 40%) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full opacity-25 blur-[80px] dark:opacity-10"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.12 85 / 40%) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -25, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="container-custom relative z-10 pt-24 md:pt-32"
        style={{ y, opacity, scale }}
      >
        <div className="mx-auto max-w-5xl text-center">
          {/* Tag */}
          <FadeIn delay={0.1}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 text-xs font-medium text-cyan backdrop-blur-sm dark:border-border/50 dark:bg-muted/50 dark:text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              Más de 20 años transformando espacios
            </div>
          </FadeIn>

          {/* Main Heading */}
          <TextReveal
            text="Diseño que transforma espacios"
            as="h1"
            className="font-heading text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            delay={0.2}
          />

          {/* Subtitle */}
          <FadeIn delay={0.6} className="mx-auto mt-6 max-w-2xl">
            <p className="text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
              Ventanas, vidrios y cerramientos de{" "}
              <span className="text-gradient font-medium">última generación</span>{" "}
              para tu hogar y empresa. Fabricación a medida con calidad premium.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.8} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton
              className="group inline-flex items-center gap-2 rounded-full bg-cyan px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan/25"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Catálogo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold transition-all hover:bg-muted"
            >
              Solicitar Presupuesto
            </Link>
          </FadeIn>

          {/* Hero Image */}
          <FadeIn delay={1} className="relative mx-auto mt-16 max-w-5xl">
            <motion.div style={{ y: imageY }}>
              <div className="relative overflow-hidden rounded-2xl border border-border/30 shadow-premium">
                {/* Gradient border glow */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan/20 via-transparent to-gold/20 opacity-60" />
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero/hero-main.png"
                    alt="Fachada moderna con ventanas de aluminio y vidrio premium"
                    width={1200}
                    height={675}
                    className="h-auto w-full object-cover"
                    priority
                  />
                  {/* Glass reflection overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: 6,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
              {/* Bottom glow */}
              <div className="absolute -bottom-8 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl" />
            </motion.div>
          </FadeIn>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs tracking-widest uppercase">Explorar</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
