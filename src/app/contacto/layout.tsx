import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a Vidriería Nova. Solicitá tu presupuesto sin compromiso. Te respondemos en menos de 24 horas.",
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
