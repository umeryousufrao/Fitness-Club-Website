"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Dumbbell, Clock, Heart, CreditCard } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import { Button } from "@/components/ui/button"

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.png"
            alt="Gym background"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-[1]"></div>

        <div className="relative z-10 flex flex-col items-start justify-center h-full container mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl mb-4 flex items-center text-amber-400 font-medium"
            >
              <span className="inline-block w-8 h-0.5 bg-amber-400 mr-2"></span>
              With Best Trainers
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-white mb-8 font-display leading-tight"
            >
              BUILD YOUR <span className="text-amber-400">PERFECT</span> BODY SHAPE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-gray-300 text-lg mb-8 max-w-lg"
            >
              Join our premium fitness club and transform your physique with personalized training programs and
              state-of-the-art equipment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                Become a member
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button variant="outline" size="lg" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
                View pricing
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-amber-400 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={targetRef} className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div style={{ opacity, y }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
              Why Choose <span className="text-amber-400">Falaknz Gym</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We offer premium facilities and expert guidance to help you achieve your fitness goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock className="h-10 w-10" />,
                title: "Flexible Schedule",
                description: "Train on your own time with 24/7 access to our state-of-the-art facilities.",
              },
              {
                icon: <Dumbbell className="h-10 w-10" />,
                title: "Premium Equipment",
                description: "Access top-of-the-line fitness equipment designed for maximum results.",
              },
              {
                icon: <Heart className="h-10 w-10" />,
                title: "Expert Guidance",
                description: "Our certified trainers create personalized plans for your fitness journey.",
              },
              {
                icon: <CreditCard className="h-10 w-10" />,
                title: "Membership Benefits",
                description: "Enjoy exclusive perks including nutrition plans and recovery sessions.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInVariants}
              >
                <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
              What Our <span className="text-amber-400">Members</span> Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real results from real people who transformed their lives with Falaknz Gym
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Member since 2021",
                image: "/images/testimonial-1.png",
                rating: 5,
                text: "The trainers at Falaknz Gym completely transformed my approach to fitness. I've lost 30 pounds and gained confidence I never thought possible.",
              },
              {
                name: "Michael Chen",
                role: "Member since 2020",
                image: "/images/testimonial-2.png",
                rating: 5,
                text: "As someone who was intimidated by gyms, Falaknz Gym provided the supportive environment I needed. The 24/7 access fits perfectly with my busy schedule.",
              },
              {
                name: "Jessica Williams",
                role: "Member since 2022",
                image: "/images/testimonial-3.png",
                rating: 5,
                text: "The personalized training programs and nutrition guidance have helped me achieve results I couldn't get on my own. Worth every penny!",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInVariants}
              >
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role}
                  image={testimonial.image}
                  rating={testimonial.rating}
                  text={testimonial.text}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image src="/images/cta-background.png" alt="CTA background" fill className="object-cover" />
        </div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-[1]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6 font-display"
            >
              Start Your Fitness Journey <span className="text-amber-400">Today</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-lg mb-8"
            >
              Join Falaknz Gym now and get a free personal training session with one of our expert trainers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                Become a member
              </Button>

              <Button variant="outline" size="lg" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
                Book a tour
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
