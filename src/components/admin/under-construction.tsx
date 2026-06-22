"use client"

import { FadeIn } from "@/components/motion/fade-in"
import { Construction } from "lucide-react"

export function UnderConstruction({ title, description }: { title: string, description?: string }) {
  return (
    <FadeIn>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan/10 mb-6">
          <Construction className="h-10 w-10 text-cyan" />
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight mb-2">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {description || "Este módulo forma parte de las próximas fases de desarrollo del ERP y se encuentra actualmente en construcción."}
        </p>
      </div>
    </FadeIn>
  )
}
