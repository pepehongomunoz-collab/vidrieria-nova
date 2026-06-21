"use client"

import { FadeIn } from "@/components/motion/fade-in"

const brands = [
  "Aluar",
  "Hydro",
  "Rehau",
  "Pilkington",
  "Guardian Glass",
  "Vasa",
  "Rotonda",
  "Technal",
]

export function BrandsSection() {
  return (
    <section className="py-16 relative overflow-hidden" id="brands">
      <div className="container-custom">
        <FadeIn>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Trabajamos con las mejores marcas
          </p>
        </FadeIn>
      </div>

      {/* Marquee */}
      <div className="relative mt-10">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="flex overflow-hidden">
          <div
            className="flex shrink-0 items-center gap-12"
            style={{
              animation: "marquee 30s linear infinite",
            }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex h-16 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-card/30 px-8 font-heading text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                {brand}
              </div>
            ))}
          </div>
          <div
            className="flex shrink-0 items-center gap-12"
            style={{
              animation: "marquee 30s linear infinite",
            }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`dup-${index}`}
                className="flex h-16 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-card/30 px-8 font-heading text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
