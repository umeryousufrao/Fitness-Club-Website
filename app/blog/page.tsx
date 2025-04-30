"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import SectionTitle from "@/components/section-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All", "Strength Training", "Nutrition", "Weight Loss", "Cardio", "Recovery"]

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Strength Training Exercises for Beginners",
      excerpt: "Start your strength training journey with these fundamental exercises designed for beginners.",
      image: "/images/blog-1.png",
      category: "Strength Training",
      date: "May 15, 2023",
      author: "Alex Rodriguez",
    },
    {
      id: 2,
      title: "The Ultimate Guide to Protein: How Much Do You Really Need?",
      excerpt: "Discover the science behind protein requirements and how to optimize your intake for muscle growth.",
      image: "/images/blog-2.png",
      category: "Nutrition",
      date: "June 2, 2023",
      author: "Sarah Johnson",
    },
    {
      id: 3,
      title: "HIIT vs. Steady-State Cardio: Which is Better for Fat Loss?",
      excerpt:
        "Compare the benefits of high-intensity interval training and traditional cardio for optimal fat loss results.",
      image: "/images/blog-3.png",
      category: "Weight Loss",
      date: "June 18, 2023",
      author: "Michael Chen",
    },
    {
      id: 4,
      title: "Recovery Strategies: How to Maximize Your Rest Days",
      excerpt: "Learn effective recovery techniques to reduce soreness and improve performance between workouts.",
      image: "/images/blog-4.png",
      category: "Recovery",
      date: "July 5, 2023",
      author: "Jessica Williams",
    },
    {
      id: 5,
      title: "The Science of Muscle Growth: Understanding Hypertrophy",
      excerpt:
        "Explore the physiological mechanisms behind muscle growth and how to optimize your training for results.",
      image: "/images/blog-5.png",
      category: "Strength Training",
      date: "July 22, 2023",
      author: "David Thompson",
    },
    {
      id: 6,
      title: "Cardio Myths Debunked: Separating Fact from Fiction",
      excerpt: "Challenge common misconceptions about cardiovascular exercise and discover evidence-based approaches.",
      image: "/images/blog-6.png",
      category: "Cardio",
      date: "August 10, 2023",
      author: "Emma Rodriguez",
    },
  ]

  const fadeInUp = {
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
    <main className="bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionTitle title="Fitness Blog" subtitle="Expert advice and insights for your fitness journey" />
          </motion.div>

          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-16">
            <Image src="/images/blog-main.png" alt="Blog header" fill className="object-cover" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-end">
              <div className="p-8 md:p-12 max-w-2xl">
                <Badge className="bg-amber-500 text-black mb-4">Featured</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Transform Your Body and Mind: The Complete Guide to Holistic Fitness
                </h2>
                <p className="text-gray-200 mb-6">
                  Discover how integrating physical training, nutrition, and mental wellness creates lasting results.
                </p>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-auto md:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10 bg-gray-900 border-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="All" className="w-full md:w-auto">
                <TabsList className="bg-gray-900 p-1 h-auto flex flex-wrap">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 h-full flex flex-col">
                  <div className="relative h-48">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-amber-500 text-black">{post.category}</Badge>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{post.date}</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white">{post.title}</h3>
                    <p className="text-gray-400 mb-4 flex-grow">{post.excerpt}</p>

                    <Button variant="link" className="text-amber-500 p-0 justify-start">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  className={page === 1 ? "bg-amber-500 text-black" : "border-gray-700 text-gray-400"}
                  size="sm"
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
