import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mi Cuenta",
  description: "Gestioná tus pedidos, favoritos y configuración de cuenta en Vidriería Nova.",
}

export default function MiCuentaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
