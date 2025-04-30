"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import SectionTitle from "@/components/section-title"
import { Button } from "@/components/ui/button"
import TrainerCard from "@/components/trainer-card"

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const benefits = [
    "Personalized training programs",
    "Nutrition guidance and meal planning",
    "Progress tracking and regular assessments",
    "Access to premium equipment and facilities",
    "Flexible scheduling to fit your lifestyle",
  ]

  const trainers = [
    {
      name: "Alex Rodriguez",
      specialty: "Strength & Conditioning",
      image: "/images/trainer-1.png",
      bio: "With over 10 years of experience, Alex specializes in strength training and athletic performance.",
    },
    {
      name: "Sarah Johnson",
      specialty: "Nutrition & Weight Loss",
      image: "/images/trainer-2.png",
      bio: "Sarah combines nutrition science with effective training to help clients achieve sustainable weight loss.",
    },
    {
      name: "Michael Chen",
      specialty: "Functional Training",
      image: "/images/trainer-3.png",
      bio: "Michael focuses on functional movement patterns to improve everyday performance and prevent injuries.",
    },
  ]

  return (
    <main className="bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <SectionTitle title="About Us" subtitle="Our Story & Mission" alignment="left" />

              <motion.p
                className="text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Founded in 2015, Falaknz Gym has grown from a small local gym to a premium fitness destination. Our
                mission is to provide a supportive environment where individuals of all fitness levels can achieve their
                personal goals with expert guidance and state-of-the-art facilities.
              </motion.p>

              <motion.p
                className="text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                What sets us apart is our personalized approach to fitness. We believe that everyone's journey is
                unique, which is why our certified trainers create customized programs tailored to your specific needs
                and goals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button className="bg-amber-500 hover:bg-amber-600 text-black">Learn More</Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative h-[500px] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image src="/images/about-main.png" alt="About FLEX" fill className="object-cover" />

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              <motion.div
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 2,
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
              The <span className="text-amber-400">Falaknz Gym</span> Advantage
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">What makes our approach to fitness different</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-4"
            >
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={fadeIn} className="flex items-start gap-3 bg-gray-900 p-4 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-200">{benefit}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-2xl overflow-hidden"
            >
              <Image src="/images/benefits.png" alt="FLEX benefits" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
              Meet Our <span className="text-amber-400">Expert</span> Trainers
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our certified professionals are dedicated to helping you achieve your fitness goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TrainerCard
                  name={trainer.name}
                  specialty={trainer.specialty}
                  image={trainer.image}
                  bio={trainer.bio}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
