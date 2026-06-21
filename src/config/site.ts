export const siteConfig = {
  name: "Vidriería Nova",
  description:
    "Fabricación y venta de ventanas de aluminio, PVC, vidrios laminados, templados, DVH, cerramientos, frentes vidriados, espejos y mamparas. Calidad premium y diseño de vanguardia.",
  url: "https://vidrerianova.com.ar",
  ogImage: "/images/og-image.jpg",
  creator: "Vidriería Nova",
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
    "vidriería",
    "argentina",
  ],
  contact: {
    phone: "+54 11 1234-5678",
    whatsapp: "5491112345678",
    email: "info@vidrerianova.com.ar",
    address: "Av. Principal 1234, Buenos Aires, Argentina",
  },
  social: {
    instagram: "https://instagram.com/vidrerianova",
    facebook: "https://facebook.com/vidrerianova",
    youtube: "https://youtube.com/@vidrerianova",
  },
} as const

export type SiteConfig = typeof siteConfig
