"use client"

import { motion } from "framer-motion"

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  once?: boolean
}

export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  once = true,
}: TextRevealProps) {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay + i * 0.04,
      },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <Tag className={className} style={{ perspective: "600px" }}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-60px" }}
        className="inline-flex flex-wrap"
        aria-label={text}
      >
        {words.map((word, index) => (
          <motion.span
            variants={child}
            key={index}
            className="mr-[0.3em] inline-block"
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
