"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"
import { FadeIn } from "@/components/motion/fade-in"
import { TextReveal } from "@/components/motion/text-reveal"
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children"
import Image from "next/image"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Edificio Torre Platino",
    category: "Frentes Vidriados",
    location: "Buenos Aires, CABA",
    year: "2024",
    description:
      "Fachada integral de DVH con carpintería de aluminio premium para un edificio de 18 pisos. Más de 2.000 m² de vidrio instalado con sistema de muro cortina.",
    image: "/images/projects/torre-platino.png",
  },
  {
    title: "Residencia Lago Azul",
    category: "Cerramientos",
    location: "Villa La Angostura, Neuquén",
    year: "2024",
    description:
      "Cerramiento completo de balcón con vista panorámica al lago. Ventanas oscilobatientes de PVC Rehau con DVH de control solar.",
    image: "/images/projects/lago-azul.png",
  },
  {
    title: "Oficinas Corporate Park",
    category: "Divisorias de Vidrio",
    location: "Nordelta, Buenos Aires",
    year: "2023",
    description:
      "Sistema de divisorias en vidrio templado 10mm para espacios corporativos. Diseño open-plan con privacidad acústica.",
    image: "/images/projects/corporate-park.png",
  },
  {
    title: "Hotel Boutique Lumière",
    category: "Mamparas Premium",
    location: "San Telmo, Buenos Aires",
    year: "2023",
    description:
      "Mamparas de baño en vidrio templado 8mm con herrajes importados italianos. 45 habitaciones equipadas con diseño minimalista.",
    image: "/images/projects/hotel-lumiere.png",
  },
  {
    title: "Complejo Residencial Altos del Sol",
    category: "Ventanas de Aluminio",
    location: "Córdoba Capital",
    year: "2023",
    description:
      "450 ventanas de aluminio línea Modena con DVH para un complejo de 6 torres. Aislación térmica y acústica certificada.",
    image: "/images/products/ventanas-aluminio.png",
  },
  {
    title: "Centro Comercial Plaza Nova",
    category: "Frentes Vidriados",
    location: "Rosario, Santa Fe",
    year: "2022",
    description:
      "Frente vidriado integral para 12 locales comerciales. Vidrio templado laminado con carpintería de aluminio anodizado negro.",
    image: "/images/products/cerramientos.png",
  },
]

export default function ProyectosPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 via-transparent to-transparent" />
          <div className="container-custom relative">
            <div className="mx-auto max-w-3xl text-center">
              <FadeIn>
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan">
                  Portfolio
                </p>
              </FadeIn>
              <TextReveal
                text="Proyectos Realizados"
                as="h1"
                className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-6xl"
                delay={0.1}
              />
              <FadeIn delay={0.3}>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Más de 5.000 proyectos completados en residencias, edificios corporativos,
                  hoteles y locales comerciales en todo el país.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding pt-8">
          <div className="container-custom">
            <StaggerChildren className="grid gap-8" staggerDelay={0.1}>
              {projects.map((project, index) => (
                <StaggerItem key={project.title}>
                  <motion.div
                    className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:shadow-premium"
                    whileHover={{ y: -2 }}
                  >
                    <div className={`grid gap-0 md:grid-cols-2 ${index % 2 === 1 ? "md:direction-rtl" : ""}`}>
                      {/* Image */}
                      <div className={`relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[400px] ${index % 2 === 1 ? "md:order-2" : ""}`}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
                      </div>

                      {/* Content */}
                      <div className={`flex flex-col justify-center p-8 md:p-12 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
                            {project.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{project.year}</span>
                        </div>

                        <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight md:text-3xl">
                          {project.title}
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                          📍 {project.location}
                        </p>

                        <p className="mt-4 text-muted-foreground leading-relaxed">
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
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
