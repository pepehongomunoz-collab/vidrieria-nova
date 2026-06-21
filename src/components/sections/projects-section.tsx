"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FadeIn } from "@/components/motion/fade-in"
import { TextReveal } from "@/components/motion/text-reveal"
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children"

const projects = [
  {
    title: "Edificio Torre Platino",
    category: "Frentes Vidriados",
    description: "Fachada integral de DVH con carpintería de aluminio premium.",
    image: "/images/projects/torre-platino.png",
  },
  {
    title: "Residencia Lago Azul",
    category: "Cerramientos",
    description: "Cerramiento completo de balcón con vista panorámica al lago.",
    image: "/images/projects/lago-azul.png",
  },
  {
    title: "Oficinas Corporate Park",
    category: "Divisorias de Vidrio",
    description: "Sistema de divisorias en vidrio templado para espacios corporativos.",
    image: "/images/projects/corporate-park.png",
  },
  {
    title: "Hotel Boutique Lumière",
    category: "Mamparas Premium",
    description: "Mamparas de baño en vidrio templado con herrajes importados.",
    image: "/images/projects/hotel-lumiere.png",
  },
]

export function ProjectsSection() {
  return (
    <section className="section-padding relative" id="projects">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan">
              Proyectos
            </p>
          </FadeIn>
          <TextReveal
            text="Proyectos Realizados"
            as="h2"
            className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl"
            delay={0.1}
          />
          <FadeIn delay={0.3}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Descubrí algunos de nuestros trabajos más destacados en residencias,
              edificios corporativos y hoteles.
            </p>
          </FadeIn>
        </div>

        <StaggerChildren className="mt-16 grid gap-6 md:grid-cols-2" staggerDelay={0.1}>
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <motion.div
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <span className="mb-2 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-white/70">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
