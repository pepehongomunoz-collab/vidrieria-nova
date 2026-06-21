"use client"

import { FadeIn } from "@/components/motion/fade-in"
import { TextReveal } from "@/components/motion/text-reveal"
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children"
import { ClipboardList, Ruler, Factory, Truck, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Consultá",
    description: "Contactanos y contanos qué necesitás. Te asesoramos sin compromiso.",
  },
  {
    number: "02",
    icon: Ruler,
    title: "Medimos",
    description: "Un técnico visita tu espacio para tomar medidas precisas.",
  },
  {
    number: "03",
    icon: Factory,
    title: "Fabricamos",
    description: "Producción a medida en nuestra planta con los mejores materiales.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Entregamos",
    description: "Entrega e instalación profesional con garantía incluida.",
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Garantizamos",
    description: "Soporte post-venta y garantía extendida en todos nuestros productos.",
  },
]

export function ProcessSection() {
  return (
    <section className="section-padding relative" id="process">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan">
              Proceso
            </p>
          </FadeIn>
          <TextReveal
            text="¿Cómo trabajamos?"
            as="h2"
            className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl"
            delay={0.1}
          />
          <FadeIn delay={0.3}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Un proceso simple y transparente de principio a fin.
            </p>
          </FadeIn>
        </div>

        <StaggerChildren
          className="relative mt-16 grid gap-6 md:grid-cols-5"
          staggerDelay={0.1}
        >
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-[3.5rem] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="group relative flex flex-col items-center text-center">
                {/* Number + Icon */}
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-card transition-all duration-300 group-hover:border-cyan/30 group-hover:shadow-lg group-hover:shadow-cyan/5">
                    <step.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-cyan" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-cyan text-[10px] font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[200px] text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
