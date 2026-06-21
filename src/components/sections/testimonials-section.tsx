"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { FadeIn } from "@/components/motion/fade-in"
import { TextReveal } from "@/components/motion/text-reveal"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    role: "Arquitecta",
    content:
      "La calidad de los cerramientos superó todas nuestras expectativas. El equipo fue profesional de principio a fin. Los recomiendo al 100%.",
    rating: 5,
  },
  {
    name: "Carlos Fernández",
    role: "Propietario - Edificio Palermo",
    content:
      "Instalamos DVH en todo el edificio y la diferencia en aislación térmica y acústica es notable. Excelente relación precio-calidad.",
    rating: 5,
  },
  {
    name: "Laura Martínez",
    role: "Diseñadora de Interiores",
    content:
      "Las mamparas de vidrio templado quedaron espectaculares. Trabajo impecable, medidas exactas y entrega en tiempo y forma.",
    rating: 5,
  },
  {
    name: "Roberto Sánchez",
    role: "Contratista",
    content:
      "Hace 5 años que trabajo con ellos en todos mis proyectos. La consistencia en calidad y cumplimiento es lo que más valoro.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])

  return (
    <section
      ref={containerRef}
      className="section-padding relative overflow-hidden"
      id="testimonials"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="container-custom relative">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan">
              Testimonios
            </p>
          </FadeIn>
          <TextReveal
            text="Lo que dicen nuestros clientes"
            as="h2"
            className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl"
            delay={0.1}
          />
        </div>
      </div>

      {/* Scrolling testimonials */}
      <motion.div className="mt-16 flex gap-6 px-4" style={{ x }}>
        {/* Double the testimonials for continuous feel */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <motion.div
            key={index}
            className="w-[350px] shrink-0 rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm md:w-[420px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
          >
            <Quote className="h-8 w-8 text-cyan/30" />

            {/* Stars */}
            <div className="mt-4 flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-gold text-gold"
                  style={{ color: "oklch(0.72 0.12 85)" }}
                />
              ))}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              &ldquo;{testimonial.content}&rdquo;
            </p>

            <div className="mt-6 flex items-center gap-3">
              {/* Avatar placeholder */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan/20 to-cyan/5 font-heading text-sm font-bold text-cyan">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
