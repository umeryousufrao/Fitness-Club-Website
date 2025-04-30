"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  image: string
  rating: number
  text: string
}

export default function TestimonialCard({ name, role, image, rating, text }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-900 border border-gray-800 p-6 rounded-xl h-full flex flex-col"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>

        <div>
          <h4 className="font-bold text-white">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>

      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "text-amber-500 fill-amber-500" : "text-gray-600"}`} />
        ))}
      </div>

      <p className="text-gray-300 italic flex-grow">{text}</p>
    </motion.div>
  )
}
