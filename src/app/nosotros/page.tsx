"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"
import { FadeIn } from "@/components/motion/fade-in"
import { TextReveal } from "@/components/motion/text-reveal"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import Image from "next/image"
import { Award, Users, Clock, Target, CheckCircle } from "lucide-react"

const stats = [
  { value: 20, suffix: "+", label: "Años de experiencia", icon: Clock },
  { value: 5000, suffix: "+", label: "Proyectos realizados", icon: Target },
  { value: 50, suffix: "+", label: "Profesionales", icon: Users },
  { value: 98, suffix: "%", label: "Clientes satisfechos", icon: Award },
]

const values = [
  {
    title: "Calidad Premium",
    description: "Utilizamos exclusivamente materiales de primera línea: perfiles Aluar y Rehau, vidrios Pilkington y Guardian Glass, herrajes importados de Europa.",
  },
  {
    title: "Fabricación Propia",
    description: "Nuestra planta de 2.000 m² cuenta con maquinaria CNC de última generación para garantizar precisión milimétrica en cada pieza.",
  },
  {
    title: "Asesoramiento Técnico",
    description: "Un equipo de ingenieros y arquitectos te guía desde el diseño hasta la instalación, asegurando la mejor solución para cada proyecto.",
  },
  {
    title: "Garantía Extendida",
    description: "Todos nuestros productos incluyen garantía de hasta 10 años. Servicio post-venta permanente y mantenimiento preventivo.",
  },
  {
    title: "Sustentabilidad",
    description: "Comprometidos con el medio ambiente: nuestros productos de aislación reducen hasta un 70% el consumo energético de climatización.",
  },
  {
    title: "Entrega a Todo el País",
    description: "Red de distribución nacional con entrega e instalación profesional en CABA, GBA, y principales ciudades del interior.",
  },
]

export default function NosotrosPage() {
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
                  Sobre Nosotros
                </p>
              </FadeIn>
              <TextReveal
                text="Más de 20 años creando espacios"
                as="h1"
                className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-6xl"
                delay={0.1}
              />
              <FadeIn delay={0.3}>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Somos una empresa argentina líder en la fabricación e instalación de
                  ventanas, vidrios y cerramientos. Combinamos artesanía tradicional con
                  tecnología de vanguardia para transformar cada espacio.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Image + Story */}
        <section className="section-padding pt-8">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <FadeIn direction="left">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/projects/corporate-park.png"
                    alt="Nuestra planta de fabricación"
                    width={700}
                    height={500}
                    className="h-auto w-full rounded-2xl object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 rounded-xl border border-border bg-card p-4 shadow-lg">
                    <p className="font-heading text-3xl font-bold text-cyan">2004</p>
                    <p className="text-xs text-muted-foreground">Año de fundación</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div>
                  <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                    Nuestra Historia
                  </h2>
                  <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Fundada en 2004 en Buenos Aires, <strong className="text-foreground">Vidriería Nova</strong> nació
                      con la visión de revolucionar la industria del vidrio y la carpintería en Argentina.
                    </p>
                    <p>
                      Lo que comenzó como un pequeño taller familiar se ha convertido en una empresa
                      referente del sector, con una planta de fabricación de 2.000 m², más de 50
                      profesionales especializados y presencia en todo el territorio nacional.
                    </p>
                    <p>
                      Hoy somos la elección preferida de arquitectos, constructoras y propietarios
                      que buscan la máxima calidad en ventanas, vidrios y cerramientos.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <div className="container-custom">
            <FadeIn>
              <div className="grid grid-cols-2 gap-8 rounded-2xl border border-border/50 bg-card/50 p-8 md:grid-cols-4 md:p-12">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="mx-auto mb-3 h-6 w-6 text-cyan" />
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      className="font-heading text-3xl font-bold tracking-tight md:text-4xl"
                    />
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-2xl text-center">
              <FadeIn>
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan">
                  Por qué elegirnos
                </p>
              </FadeIn>
              <TextReveal
                text="Nuestros Valores"
                as="h2"
                className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-5xl"
                delay={0.1}
              />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => (
                <FadeIn key={value.title} delay={0.05 * index}>
                  <div className="group rounded-2xl border border-border/50 bg-card/50 p-8 transition-all hover:border-cyan/30 hover:shadow-premium">
                    <CheckCircle className="h-6 w-6 text-cyan" />
                    <h3 className="mt-4 font-heading text-lg font-semibold">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
