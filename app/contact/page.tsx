"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import SectionTitle from "@/components/section-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "male",
    weight: "",
    dob: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, gender: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: "",
          email: "",
          phone: "",
          gender: "male",
          weight: "",
          dob: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: "info@falaknzgym.com",
      link: "mailto:info@falaknzgym.com",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      details: "123 Fitness Ave, Downtown",
      link: "https://maps.google.com",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Hours",
      details: "Mon-Fri: 6AM-10PM, Sat-Sun: 8AM-8PM",
      link: null,
    },
  ]

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

  return (
    <main className="bg-black text-white relative min-h-screen">
      <div className="absolute inset-0 z-0 opacity-30">
        <Image src="/images/contact-background.png" alt="Background" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionTitle title="Contact Us" subtitle="Get in touch with our team" dark={true} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-amber-400">Get In Touch</h3>

              <div className="grid gap-6">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-amber-500/10 p-3 rounded-full text-amber-400">{item.icon}</div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-400 hover:text-amber-400 transition-colors"
                          target={item.link.startsWith("http") ? "_blank" : undefined}
                          rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {item.details}
                        </a>
                      ) : (
                        <p className="text-gray-400">{item.details}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-amber-400">Follow Us</h3>
                <div className="flex gap-4">
                  {["facebook", "twitter", "instagram", "youtube"].map((social, i) => (
                    <motion.a
                      key={social}
                      href={`https://${social}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-amber-400 hover:bg-gray-700 transition-all"
                      whileHover={{ y: -5, scale: 1.1 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.5 + i * 0.1 },
                      }}
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-amber-400">Send Us a Message</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/20 text-green-400 p-6 rounded-lg text-center"
                >
                  <svg
                    className="w-12 h-12 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p>Thank you for contacting us. We'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="bg-gray-800/50 border-gray-700 mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="bg-gray-800/50 border-gray-700 mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-300">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                        className="bg-gray-800/50 border-gray-700 mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300">Gender</Label>
                      <RadioGroup
                        value={formState.gender}
                        onValueChange={handleRadioChange}
                        className="flex gap-4 mt-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="text-gray-300">
                            Male
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="text-gray-300">
                            Female
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="weight" className="text-gray-300">
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={formState.weight}
                        onChange={handleChange}
                        placeholder="Enter your weight"
                        required
                        className="bg-gray-800/50 border-gray-700 mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="dob" className="text-gray-300">
                        Date of Birth
                      </Label>
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formState.dob}
                        onChange={handleChange}
                        required
                        className="bg-gray-800/50 border-gray-700 mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-300">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us about your fitness goals or any questions you have"
                      className="bg-gray-800/50 border-gray-700 mt-1 h-32"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
