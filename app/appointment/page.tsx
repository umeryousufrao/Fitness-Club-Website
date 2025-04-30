"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Clock, MapPin, ChevronLeft, ChevronRight, Calendar, CheckCircle, Dumbbell } from "lucide-react"
import SectionTitle from "@/components/section-title"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Appointment() {
  const [step, setStep] = useState(1)
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const trainers = [
    {
      id: "trainer1",
      name: "Alex Rodriguez",
      specialty: "Strength & Conditioning",
      image: "/images/trainer-1.png",
      experience: "10+ years",
      availability: "Mon-Fri: 8AM-4PM",
      bio: "Specializes in strength training and athletic performance enhancement",
    },
    {
      id: "trainer2",
      name: "Sarah Johnson",
      specialty: "Nutrition & Weight Loss",
      image: "/images/trainer-2.png",
      experience: "8 years",
      availability: "Mon-Sat: 10AM-6PM",
      bio: "Expert in nutrition science and sustainable weight loss programs",
    },
    {
      id: "trainer3",
      name: "Michael Chen",
      specialty: "Functional Training",
      image: "/images/trainer-3.png",
      experience: "12 years",
      availability: "Tue-Sun: 9AM-5PM",
      bio: "Focuses on functional movement patterns and injury prevention",
    },
  ]

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
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

  const handleTrainerSelect = (id: string) => {
    setSelectedTrainer(id)
  }

  const handleDateSelect = (date: number) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      // Submit form
      setFormSubmitted(true)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const renderCalendar = () => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    // Get the number of days in the month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    // Create an array of day numbers for the current month
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    // Add empty cells for days before the first day of the month
    const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => null)

    // Combine empty cells and days
    const calendarDays = [...emptyCells, ...days]

    return (
      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={i} className="text-center font-medium text-black/70 py-1">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => (
          <motion.div
            key={index}
            className={`text-center py-2 rounded-md ${
              day === null
                ? "invisible"
                : day === selectedDate
                  ? "bg-black text-amber-500 font-bold"
                  : "hover:bg-amber-500/20 cursor-pointer"
            }`}
            whileHover={day !== null ? { scale: 1.1 } : {}}
            whileTap={day !== null ? { scale: 0.95 } : {}}
            onClick={() => day !== null && handleDateSelect(day)}
          >
            {day}
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section with Parallax */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/appointment-hero.png" alt="Gym equipment" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionTitle title="Book Your Session" subtitle="Schedule with our expert trainers" dark={true} />
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </section>

      {/* Main Content */}
      <section ref={sectionRef} className="py-16 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 opacity-10">
          <Dumbbell size={300} />
        </div>
        <div className="absolute bottom-0 left-0 opacity-10 rotate-45">
          <Dumbbell size={200} />
        </div>

        <div className="container mx-auto px-4">
          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-between items-center relative">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-800 -z-10"></div>

              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: step >= i ? 1 : 0.5,
                    scale: step === i ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      step >= i ? "bg-amber-500 text-black" : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    {i}
                  </div>
                  <span className={`text-sm font-medium ${step >= i ? "text-amber-500" : "text-gray-500"}`}>
                    {i === 1 ? "Select Trainer" : i === 2 ? "Choose Date & Time" : "Your Details"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-xl overflow-hidden">
              <CardContent className="p-8">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-20 h-20 bg-amber-500 rounded-full mx-auto flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="h-10 w-10 text-black" />
                    </motion.div>

                    <h3 className="text-3xl font-bold mb-4 text-white">Booking Confirmed!</h3>
                    <p className="text-gray-300 mb-8 max-w-md mx-auto">
                      Your session has been scheduled successfully. We've sent a confirmation email with all the
                      details.
                    </p>

                    <Button
                      onClick={() => (window.location.href = "/")}
                      className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                    >
                      Return to Home
                    </Button>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="step1" initial="hidden" animate="visible" exit="exit" variants={fadeIn}>
                        <h3 className="text-2xl font-bold mb-8 text-amber-500">Select Your Trainer</h3>

                        <motion.div
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                          {trainers.map((trainer, index) => (
                            <motion.div
                              key={trainer.id}
                              variants={fadeIn}
                              custom={index}
                              whileHover={{ y: -5 }}
                              className={`bg-gray-800 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                selectedTrainer === trainer.id ? "border-amber-500" : "border-transparent"
                              }`}
                              onClick={() => handleTrainerSelect(trainer.id)}
                            >
                              <div className="relative">
                                <div className="relative h-48">
                                  <Image
                                    src={trainer.image || "/placeholder.svg"}
                                    alt={trainer.name}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                                </div>

                                {selectedTrainer === trainer.id && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-2 right-2 bg-amber-500 text-black p-1 rounded-full"
                                  >
                                    <CheckCircle className="h-5 w-5" />
                                  </motion.div>
                                )}
                              </div>

                              <div className="p-4">
                                <h4 className="font-bold text-lg text-white">{trainer.name}</h4>
                                <p className="text-amber-500 mb-2">{trainer.specialty}</p>

                                <div className="flex items-center text-sm text-gray-400 mb-2">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{trainer.availability}</span>
                                </div>

                                <p className="text-gray-300 text-sm">{trainer.bio}</p>

                                <div className="mt-3 inline-block bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                                  {trainer.experience} experience
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" initial="hidden" animate="visible" exit="exit" variants={fadeIn}>
                        <h3 className="text-2xl font-bold mb-8 text-amber-500">Choose Date & Time</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <div className="bg-gray-800 p-6 rounded-xl">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-white flex items-center">
                                  <Calendar className="mr-2 h-5 w-5 text-amber-500" />
                                  Select Date
                                </h4>
                                <span className="text-amber-500 text-sm">May 2023</span>
                              </div>

                              {renderCalendar()}
                            </div>

                            <div className="mt-6 bg-gray-800 p-4 rounded-xl">
                              <h4 className="font-bold text-white flex items-center mb-4">
                                <MapPin className="mr-2 h-5 w-5 text-amber-500" />
                                Location
                              </h4>

                              <Select defaultValue="main">
                                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                  <SelectItem value="main">Falaknz Gym - Downtown</SelectItem>
                                  <SelectItem value="north">North Branch</SelectItem>
                                  <SelectItem value="east">East Branch</SelectItem>
                                </SelectContent>
                              </Select>

                              <div className="mt-4 bg-gray-700 p-3 rounded-lg flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-amber-500" />
                                <span className="text-gray-300">123 Fitness Ave, Downtown</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="bg-gray-800 p-6 rounded-xl h-full">
                              <h4 className="font-bold text-white flex items-center mb-4">
                                <Clock className="mr-2 h-5 w-5 text-amber-500" />
                                Select Time
                              </h4>

                              <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((time, i) => (
                                  <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-3 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                                      selectedTime === time
                                        ? "bg-amber-500 text-black font-medium"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                    onClick={() => handleTimeSelect(time)}
                                  >
                                    {time}
                                  </motion.div>
                                ))}
                              </div>

                              {selectedTrainer && selectedDate && selectedTime && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-6 p-4 bg-gray-700 rounded-lg border border-amber-500/30"
                                >
                                  <h5 className="font-medium text-amber-500 mb-2">Your Selection</h5>
                                  <div className="text-gray-300 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span>Trainer:</span>
                                      <span className="text-white">
                                        {trainers.find((t) => t.id === selectedTrainer)?.name}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Date:</span>
                                      <span className="text-white">May {selectedDate}, 2023</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Time:</span>
                                      <span className="text-white">{selectedTime}</span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" initial="hidden" animate="visible" exit="exit" variants={fadeIn}>
                        <h3 className="text-2xl font-bold mb-8 text-amber-500">Your Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="name" className="text-gray-300 mb-2 block">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              className="bg-gray-800 border-gray-700 text-white focus:border-amber-500"
                              placeholder="Enter your full name"
                            />
                          </div>

                          <div>
                            <Label htmlFor="email" className="text-gray-300 mb-2 block">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              className="bg-gray-800 border-gray-700 text-white focus:border-amber-500"
                              placeholder="Enter your email"
                            />
                          </div>

                          <div>
                            <Label htmlFor="phone" className="text-gray-300 mb-2 block">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              className="bg-gray-800 border-gray-700 text-white focus:border-amber-500"
                              placeholder="Enter your phone number"
                            />
                          </div>

                          <div>
                            <Label className="text-gray-300 mb-2 block">Fitness Level</Label>
                            <RadioGroup defaultValue="beginner" className="flex flex-col space-y-2">
                              <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
                                <RadioGroupItem value="beginner" id="beginner" className="text-amber-500" />
                                <Label htmlFor="beginner" className="text-gray-300 cursor-pointer">
                                  Beginner
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
                                <RadioGroupItem value="intermediate" id="intermediate" className="text-amber-500" />
                                <Label htmlFor="intermediate" className="text-gray-300 cursor-pointer">
                                  Intermediate
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
                                <RadioGroupItem value="advanced" id="advanced" className="text-amber-500" />
                                <Label htmlFor="advanced" className="text-gray-300 cursor-pointer">
                                  Advanced
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="md:col-span-2">
                            <Label htmlFor="notes" className="text-gray-300 mb-2 block">
                              Special Requests or Notes
                            </Label>
                            <textarea
                              id="notes"
                              className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-3 h-24 focus:border-amber-500 focus:ring-amber-500"
                              placeholder="Any specific goals or health concerns we should know about?"
                            ></textarea>
                          </div>

                          <div className="md:col-span-2 bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
                            <h4 className="text-amber-500 font-medium mb-2 flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Booking Summary
                            </h4>

                            {selectedTrainer && selectedDate && selectedTime && (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="bg-gray-800 p-3 rounded-lg">
                                  <span className="text-gray-400 block">Trainer</span>
                                  <span className="text-white font-medium">
                                    {trainers.find((t) => t.id === selectedTrainer)?.name}
                                  </span>
                                </div>
                                <div className="bg-gray-800 p-3 rounded-lg">
                                  <span className="text-gray-400 block">Date</span>
                                  <span className="text-white font-medium">May {selectedDate}, 2023</span>
                                </div>
                                <div className="bg-gray-800 p-3 rounded-lg">
                                  <span className="text-gray-400 block">Time</span>
                                  <span className="text-white font-medium">{selectedTime}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex justify-between mt-8">
                      <Button
                        variant="outline"
                        onClick={handlePrevStep}
                        disabled={step === 1}
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>

                      <Button
                        onClick={handleNextStep}
                        disabled={(step === 1 && !selectedTrainer) || (step === 2 && (!selectedDate || !selectedTime))}
                        className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                      >
                        {step === 3 ? "Confirm Booking" : "Continue"}
                        {step !== 3 && <ChevronRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </AnimatePresence>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
