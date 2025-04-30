"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  subtitle?: string
  alignment?: "left" | "center" | "right"
  dark?: boolean
}

export default function SectionTitle({ title, subtitle, alignment = "center", dark = false }: SectionTitleProps) {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }

  return (
    <div className={cn("flex flex-col", alignmentClasses[alignment])}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn("text-lg mb-2", dark ? "text-amber-400" : "text-amber-500")}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          "text-4xl md:text-5xl font-bold font-display relative inline-block",
          dark ? "text-white" : "text-black",
        )}
      >
        {title}
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "30%" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            "absolute -bottom-3 h-1",
            alignment === "center"
              ? "left-1/2 transform -translate-x-1/2"
              : alignment === "left"
                ? "left-0"
                : "right-0",
            dark ? "bg-amber-400" : "bg-amber-500",
          )}
        />
      </motion.h2>
    </div>
  )
}
