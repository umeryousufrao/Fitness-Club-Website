"use client"

import type React from "react"

import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    weight: "",
    email: "",
    phone: "",
    dob: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!")
    setFormData({
      name: "",
      gender: "",
      weight: "",
      email: "",
      phone: "",
      dob: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full p-4 bg-transparent border border-white/30 text-white placeholder-white/70 text-center"
          required
        />
      </div>

      <div>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder="Enter your Gender"
          className="w-full p-4 bg-transparent border border-white/30 text-white placeholder-white/70 text-center"
          required
        />
      </div>

      <div>
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Enter your Weight"
          className="w-full p-4 bg-transparent border border-white/30 text-white placeholder-white/70 text-center"
          required
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your Email"
          className="w-full p-4 bg-transparent border border-white/30 text-white placeholder-white/70 text-center"
          required
        />
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your Phone Number"
          className="w-full p-4 bg-transparent border border-white/30 text-white placeholder-white/70 text-center"
          required
        />
      </div>

      <div>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          placeholder="Enter your date of Birth"
          className="w-full p-4 bg-transparent border border-white/30 text-white placeholder-white/70 text-center"
          required
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-16 rounded-md transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
