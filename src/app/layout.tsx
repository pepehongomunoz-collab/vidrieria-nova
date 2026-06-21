import type { Metadata } from "next"
import { inter, outfit } from "@/lib/fonts"
import { Providers } from "@/providers/app-providers"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://vidrerianova.com.ar"),
  title: {
    default: "Vidriería Nova | Ventanas, Vidrios y Cerramientos Premium",
    template: "%s | Vidriería Nova",
  },
  description:
    "Fabricación y venta de ventanas de aluminio, PVC, vidrios laminados, templados, DVH, cerramientos, frentes vidriados, espejos y mamparas. Calidad premium en Buenos Aires.",
  keywords: [
    "ventanas de aluminio",
    "ventanas PVC",
    "vidrios templados",
    "vidrios laminados",
    "DVH",
    "doble vidriado hermético",
    "cerramientos",
    "mamparas",
    "espejos",
    "vidriería Buenos Aires",
  ],
  authors: [{ name: "Vidriería Nova" }],
  creator: "Vidriería Nova",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://vidrerianova.com.ar",
    siteName: "Vidriería Nova",
    title: "Vidriería Nova | Ventanas, Vidrios y Cerramientos Premium",
    description:
      "Fabricación y venta de ventanas de aluminio, PVC, vidrios templados, DVH, cerramientos y mamparas con calidad premium.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vidriería Nova - Ventanas y Vidrios Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidriería Nova | Ventanas, Vidrios y Cerramientos Premium",
    description:
      "Fabricación y venta de ventanas de aluminio, PVC, vidrios templados, DVH, cerramientos y mamparas con calidad premium.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${outfit.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
