import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explorá nuestra línea completa de ventanas de aluminio, PVC, vidrios templados, DVH, cerramientos, mamparas y espejos. Fabricación a medida con calidad premium.",
}

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
