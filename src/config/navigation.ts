export const navigation = {
  main: [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Proyectos", href: "/proyectos" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contacto" },
  ],
  categories: [
    { name: "Ventanas de Aluminio", href: "/catalogo/ventanas-aluminio", icon: "grid-2x2" },
    { name: "Ventanas PVC", href: "/catalogo/ventanas-pvc", icon: "frame" },
    { name: "Vidrios Laminados", href: "/catalogo/vidrios-laminados", icon: "layers" },
    { name: "Vidrios Templados", href: "/catalogo/vidrios-templados", icon: "shield" },
    { name: "DVH", href: "/catalogo/dvh", icon: "square-stack" },
    { name: "Cerramientos", href: "/catalogo/cerramientos", icon: "maximize" },
    { name: "Frentes Vidriados", href: "/catalogo/frentes-vidriados", icon: "panel-left" },
    { name: "Espejos", href: "/catalogo/espejos", icon: "scan" },
    { name: "Mamparas", href: "/catalogo/mamparas", icon: "door-open" },
    { name: "A Medida", href: "/catalogo/a-medida", icon: "ruler" },
  ],
  footer: {
    products: [
      { name: "Ventanas de Aluminio", href: "/catalogo/ventanas-aluminio" },
      { name: "Ventanas PVC", href: "/catalogo/ventanas-pvc" },
      { name: "Vidrios Templados", href: "/catalogo/vidrios-templados" },
      { name: "DVH", href: "/catalogo/dvh" },
      { name: "Cerramientos", href: "/catalogo/cerramientos" },
      { name: "Mamparas", href: "/catalogo/mamparas" },
    ],
    company: [
      { name: "Nosotros", href: "/nosotros" },
      { name: "Proyectos", href: "/proyectos" },
      { name: "Blog", href: "/blog" },
      { name: "Preguntas Frecuentes", href: "/faq" },
      { name: "Contacto", href: "/contacto" },
    ],
    legal: [
      { name: "Términos y Condiciones", href: "/terminos" },
      { name: "Política de Privacidad", href: "/privacidad" },
      { name: "Política de Devoluciones", href: "/devoluciones" },
    ],
  },
} as const
