"use client"

import { FadeIn } from "@/components/motion/fade-in"
import { AnimatedCounter } from "@/components/shared/animated-counter"

const stats = [
  { value: 5000, suffix: "+", label: "Proyectos Realizados" },
  { value: 20, suffix: "+", label: "Años de Experiencia" },
  { value: 98, suffix: "%", label: "Clientes Satisfechos" },
  { value: 15000, suffix: "+", label: "m² Instalados" },
]

export function StatsSection() {
  return (
    <section className="py-16 relative" id="stats">
      {/* Top & bottom borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-custom">
        <FadeIn>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
