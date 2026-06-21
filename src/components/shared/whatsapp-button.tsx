"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"

export function WhatsAppButton() {
  const phoneNumber = siteConfig.contact.whatsapp
  const message = encodeURIComponent(
    "¡Hola! Me gustaría obtener más información sobre sus productos."
  )
  const href = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow hover:shadow-xl hover:shadow-[#25D366]/20"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
      {/* Pulse ring */}
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/30" style={{ animationDuration: "2s" }} />
    </motion.a>
  )
}
