"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface TrainerCardProps {
  name: string
  specialty: string
  image: string
  bio: string
}

export default function TrainerCard({ name, specialty, image, bio }: TrainerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-64">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-amber-400">{specialty}</p>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-300 mb-6 flex-grow">{bio}</p>

        <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full">Book a Session</Button>
      </div>
    </motion.div>
  )
}
