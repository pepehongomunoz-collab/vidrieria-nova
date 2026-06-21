import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guías técnicas, tendencias y consejos sobre ventanas, vidrios, DVH, cerramientos y mamparas. Mantenete informado con Vidriería Nova.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
