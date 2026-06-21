import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Ingresá a tu cuenta de Vidriería Nova. Accedé a tus pedidos, favoritos y presupuestos personalizados.",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
