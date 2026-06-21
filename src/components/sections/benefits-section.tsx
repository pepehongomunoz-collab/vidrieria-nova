"use client"

import { FadeIn } from "@/components/motion/fade-in"
import { TextReveal } from "@/components/motion/text-reveal"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { Thermometer, Volume2, Shield, Sparkles } from "lucide-react"

const benefits = [
  {
    icon: Thermometer,
    title: "Aislación Térmica",
    description:
      "Nuestros DVH y ventanas de PVC reducen hasta un 70% la pérdida de temperatura, manteniendo tu hogar confortable todo el año.",
    stat: 70,
    statSuffix: "%",
    statLabel: "menos pérdida térmica",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Volume2,
    title: "Aislación Acústica",
    description:
      "Reducción de hasta 45 decibeles de ruido exterior. Tu espacio, tu tranquilidad.",
    stat: 45,
    statSuffix: "dB",
    statLabel: "reducción de ruido",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Shield,
    title: "Seguridad Garantizada",
    description:
      "Vidrios templados con resistencia 5x superior al vidrio común. Certificados bajo normas IRAM.",
    stat: 5,
    statSuffix: "x",
    statLabel: "más resistente",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Sparkles,
    title: "Durabilidad Premium",
    description:
      "Materiales de primera calidad con garantía extendida. Diseñados para durar más de 25 años.",
    stat: 25,
    statSuffix: "+",
    statLabel: "años de garantía",
    color: "text-cyan",
    bgColor: "bg-cyan/10",
  },
]

export function BenefitsSection() {
  return (
    <section className="section-padding relative overflow-hidden" id="benefits">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan">
              Beneficios
            </p>
          </FadeIn>
          <TextReveal
            text="¿Por qué elegirnos?"
            as="h2"
            className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl"
            delay={0.1}
          />
          <FadeIn delay={0.3}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Cada producto está diseñado para maximizar confort, seguridad y
              eficiencia energética en tu espacio.
            </p>
          </FadeIn>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <FadeIn
              key={benefit.title}
              delay={0.1 + index * 0.1}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-border hover:shadow-premium">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${benefit.bgColor} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>

                    {/* Stat */}
                    <div className="mt-4 flex items-baseline gap-2">
                      <AnimatedCounter
                        target={benefit.stat}
                        suffix={benefit.statSuffix}
                        className={`font-heading text-4xl font-bold ${benefit.color}`}
                      />
                      <span className="text-xs text-muted-foreground">
                        {benefit.statLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative gradient */}
                <div
                  className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${benefit.bgColor} opacity-50 blur-3xl transition-opacity group-hover:opacity-80`}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
