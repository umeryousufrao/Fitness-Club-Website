"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Trainer {
  id: string
  name: string
  specialty: string
  image: string
  availability: string
}

interface AppointmentTrainerCardProps {
  trainer: Trainer
  isSelected: boolean
  onSelect: () => void
}

export default function AppointmentTrainerCard({ trainer, isSelected, onSelect }: AppointmentTrainerCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "cursor-pointer rounded-xl overflow-hidden border-2 transition-all",
        isSelected ? "border-black" : "border-transparent",
      )}
    >
      <div className="relative">
        <div className="relative h-48">
          <Image src={trainer.image || "/placeholder.svg"} alt={trainer.name} fill className="object-cover" />
        </div>

        {isSelected && (
          <div className="absolute top-2 right-2 bg-black text-amber-500 p-1 rounded-full">
            <Check className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className={cn("p-4 transition-colors", isSelected ? "bg-black text-white" : "bg-white/20 text-black")}>
        <h4 className="font-bold text-lg">{trainer.name}</h4>
        <p className={isSelected ? "text-amber-500" : "text-black/70"}>{trainer.specialty}</p>

        <div className="flex items-center mt-2 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <span>{trainer.availability}</span>
        </div>
      </div>
    </motion.div>
  )
}
