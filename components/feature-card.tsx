"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-900 border border-gray-800 p-8 rounded-xl flex flex-col items-center text-center h-full"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-amber-500/10 text-amber-500 p-4 rounded-full mb-6"
      >
        {icon}
      </motion.div>

      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>

      <p className="text-gray-400 mb-6 flex-grow">{description}</p>

      <Link
        href="#"
        className="group inline-flex items-center text-amber-500 font-medium hover:text-amber-400 transition-colors"
      >
        Learn More
        <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} className="ml-2">
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </Link>
    </motion.div>
  )
}
