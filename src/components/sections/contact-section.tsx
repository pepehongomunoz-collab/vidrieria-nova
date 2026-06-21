"use client"

import { useState } from "react"
import { FadeIn } from "@/components/motion/fade-in"
import { TextReveal } from "@/components/motion/text-reveal"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfono",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: siteConfig.contact.address,
    href: "#",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun a Vie: 8:00 - 17:00 | Sáb: 9:00 - 13:00",
    href: "#",
  },
]

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section className="section-padding relative" id="contact">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan">
              Contacto
            </p>
          </FadeIn>
          <TextReveal
            text="¿Tenés un proyecto en mente?"
            as="h2"
            className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl"
            delay={0.1}
          />
          <FadeIn delay={0.3}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Escribinos y te respondemos en menos de 24 horas.
              Sin compromiso, con asesoramiento personalizado.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <FadeIn direction="left" className="space-y-6 lg:col-span-2">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-card transition-colors group-hover:border-cyan/30">
                  <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-cyan" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Map placeholder */}
            <FadeIn delay={0.4}>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border/50">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-muted/50 to-muted/30">
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-5 w-5 text-cyan" />
                    Mapa interactivo
                  </div>
                </div>
              </div>
            </FadeIn>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="right" className="lg:col-span-3">
            <div className="rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[400px] flex-col items-center justify-center text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                      <CheckCircle className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h3 className="mt-4 font-heading text-2xl font-bold">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Te responderemos en menos de 24 horas.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-2 block text-sm font-medium"
                        >
                          Nombre completo
                        </label>
                        <Input
                          id="contact-name"
                          placeholder="Tu nombre"
                          required
                          className="h-12 bg-background/50"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="mb-2 block text-sm font-medium"
                        >
                          Email
                        </label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="tu@email.com"
                          required
                          className="h-12 bg-background/50"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="mb-2 block text-sm font-medium"
                        >
                          Teléfono
                        </label>
                        <Input
                          id="contact-phone"
                          type="tel"
                          placeholder="+54 11 1234-5678"
                          className="h-12 bg-background/50"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="mb-2 block text-sm font-medium"
                        >
                          Asunto
                        </label>
                        <Input
                          id="contact-subject"
                          placeholder="¿En qué podemos ayudarte?"
                          required
                          className="h-12 bg-background/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-2 block text-sm font-medium"
                      >
                        Mensaje
                      </label>
                      <Textarea
                        id="contact-message"
                        placeholder="Contanos sobre tu proyecto..."
                        rows={5}
                        required
                        className="bg-background/50 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="h-12 w-full rounded-xl bg-cyan text-white hover:bg-cyan/90 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                        />
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Enviar Mensaje
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
