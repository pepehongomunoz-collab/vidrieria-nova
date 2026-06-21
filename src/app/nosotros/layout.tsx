import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conocé la historia de Vidriería Nova. Más de 20 años liderando la fabricación e instalación de ventanas, vidrios y cerramientos premium en Argentina.",
}

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
