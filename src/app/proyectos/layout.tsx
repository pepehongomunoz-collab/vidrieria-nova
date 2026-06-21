import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Descubrí nuestros proyectos realizados en residencias, edificios corporativos, hoteles y locales comerciales. Más de 5.000 proyectos completados.",
}

export default function ProyectosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
