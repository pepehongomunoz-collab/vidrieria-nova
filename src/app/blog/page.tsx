"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"
import { FadeIn } from "@/components/motion/fade-in"
import { TextReveal } from "@/components/motion/text-reveal"
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { motion } from "framer-motion"

const posts = [
  {
    title: "DVH: Todo lo que necesitás saber sobre el Doble Vidriado Hermético",
    excerpt: "Descubrí cómo el DVH puede reducir tu consumo energético hasta un 70% y mejorar el confort acústico de tu hogar.",
    image: "/images/products/dvh.png",
    category: "Guía Técnica",
    date: "15 Jun 2026",
    readTime: "8 min",
    slug: "dvh-todo-lo-que-necesitas-saber",
  },
  {
    title: "Aluminio vs PVC: ¿Cuál es la mejor opción para tus ventanas?",
    excerpt: "Analizamos las ventajas y desventajas de cada material para ayudarte a tomar la mejor decisión.",
    image: "/images/products/ventanas-aluminio.png",
    category: "Comparativas",
    date: "10 Jun 2026",
    readTime: "6 min",
    slug: "aluminio-vs-pvc",
  },
  {
    title: "5 tendencias en cerramientos para 2026",
    excerpt: "Las últimas tendencias en diseño de cerramientos que están revolucionando la arquitectura residencial.",
    image: "/images/products/cerramientos.png",
    category: "Tendencias",
    date: "5 Jun 2026",
    readTime: "5 min",
    slug: "tendencias-cerramientos-2026",
  },
  {
    title: "Guía completa para elegir mamparas de baño",
    excerpt: "Tipos, medidas, vidrios y herrajes: todo lo que necesitás saber para elegir la mampara perfecta.",
    image: "/images/products/mamparas.png",
    category: "Guía Técnica",
    date: "28 May 2026",
    readTime: "7 min",
    slug: "guia-mamparas-bano",
  },
  {
    title: "Cómo mantener tus ventanas de aluminio como nuevas",
    excerpt: "Consejos prácticos de limpieza y mantenimiento para prolongar la vida útil de tus aberturas.",
    image: "/images/products/ventanas-pvc.png",
    category: "Mantenimiento",
    date: "20 May 2026",
    readTime: "4 min",
    slug: "mantenimiento-ventanas-aluminio",
  },
  {
    title: "Vidrio templado: seguridad y diseño en tu hogar",
    excerpt: "Por qué el vidrio templado es la opción más segura para mamparas, barandas y aplicaciones arquitectónicas.",
    image: "/images/products/vidrio-templado.png",
    category: "Seguridad",
    date: "12 May 2026",
    readTime: "5 min",
    slug: "vidrio-templado-seguridad",
  },
]

export default function BlogPage() {
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
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Blog</p>
              </FadeIn>
              <TextReveal
                text="Novedades y Consejos"
                as="h1"
                className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-6xl"
                delay={0.1}
              />
              <FadeIn delay={0.3}>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Guías técnicas, tendencias y consejos para tomar las mejores decisiones
                  en ventanas, vidrios y cerramientos.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="pb-8">
          <div className="container-custom">
            <FadeIn>
              <Link href={`/blog/${posts[0].slug}`} className="group block">
                <motion.div
                  className="grid overflow-hidden rounded-2xl border border-border/50 bg-card md:grid-cols-2"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[350px]">
                    <Image
                      src={posts[0].image}
                      alt={posts[0].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <span className="w-fit rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
                      {posts[0].category}
                    </span>
                    <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight md:text-3xl">
                      {posts[0].title}
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {posts[0].excerpt}
                    </p>
                    <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" /> {posts[0].date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" /> {posts[0].readTime}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-cyan">
                      Leer artículo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="section-padding pt-8">
          <div className="container-custom">
            <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
              {posts.slice(1).map((post) => (
                <StaggerItem key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <motion.div
                      className="overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:border-cyan/30 hover:shadow-premium"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm dark:bg-black/60 dark:text-white">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading text-lg font-semibold tracking-tight line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {post.readTime}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
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
