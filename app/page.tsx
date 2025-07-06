"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles, Globe } from "lucide-react"

export default function ForeverFestPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 265,
    hours: 19,
    minutes: 37,
    seconds: 7,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #101048 0%, #DE1ACE 100%)",
      }}
    >
      {/* Navigation */}
      <nav className="flex justify-center items-center py-6 px-4">
        <div className="flex space-x-8 text-white font-bold text-sm md:text-base">
          <a href="#" className="hover:text-pink-300 transition-colors">
            HOME
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            OUR STORY
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            RSVP
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            REGISTRY
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            FAQS
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            TRAVEL
          </a>
        </div>
      </nav>

      {/* Header with Names and Skyline */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <div className="text-white text-lg font-light tracking-wider">SEAN & EVA</div>
        </div>

        {/* City Skyline */}
        <div className="flex justify-center mb-6">
          <svg width="200" height="40" viewBox="0 0 200 40" className="text-white fill-current opacity-60">
            <rect x="10" y="20" width="8" height="20" />
            <rect x="20" y="15" width="6" height="25" />
            <rect x="28" y="25" width="4" height="15" />
            <rect x="35" y="10" width="10" height="30" />
            <rect x="48" y="18" width="6" height="22" />
            <rect x="58" y="12" width="8" height="28" />
            <rect x="70" y="22" width="5" height="18" />
            <rect x="80" y="8" width="12" height="32" />
            <rect x="95" y="16" width="7" height="24" />
            <rect x="105" y="20" width="6" height="20" />
            <rect x="115" y="14" width="9" height="26" />
            <rect x="128" y="18" width="5" height="22" />
            <rect x="138" y="12" width="8" height="28" />
            <rect x="150" y="24" width="6" height="16" />
            <rect x="160" y="16" width="7" height="24" />
            <rect x="170" y="20" width="5" height="20" />
            <rect x="180" y="18" width="8" height="22" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative">
        {/* Disco Balls */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 md:left-20">
            <Globe className="w-16 h-16 md:w-24 md:h-24 text-pink-400 opacity-80" />
            <Sparkles className="w-4 h-4 text-white absolute -top-2 -right-2" />
          </div>
          <div className="absolute top-20 right-10 md:right-20">
            <Globe className="w-12 h-12 md:w-16 md:h-16 text-purple-300 opacity-70" />
            <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1" />
          </div>
          <div className="absolute bottom-40 left-5 md:left-16">
            <Globe className="w-10 h-10 md:w-14 md:h-14 text-white opacity-60" />
          </div>
          <div className="absolute bottom-60 right-5 md:right-16">
            <Globe className="w-20 h-20 md:w-28 md:h-28 text-pink-300 opacity-75" />
            <Sparkles className="w-5 h-5 text-white absolute -top-2 -right-2" />
          </div>
        </div>

        {/* Presents Text */}
        <div className="text-white text-xl md:text-2xl font-light italic mb-4">Presents</div>

        {/* Forever Fest Title */}
        <div className="relative mb-8">
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text mb-6"
            style={{
              backgroundImage: "linear-gradient(45deg, #DE1ACE, #FCADE7, #DE1ACE)",
            }}
          >
            FOREVER FEST
          </h1>

          {/* Couple Photo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-40 md:w-48 md:h-60 bg-gray-300 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=240&width=192"
                alt="Sean and Eva"
                width={192}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* City Skyline Bottom */}
        <div className="flex justify-center mb-8 mt-20">
          <svg width="400" height="60" viewBox="0 0 400 60" className="text-white fill-current opacity-40">
            <rect x="20" y="30" width="12" height="30" />
            <rect x="35" y="25" width="8" height="35" />
            <rect x="46" y="35" width="6" height="25" />
            <rect x="55" y="20" width="15" height="40" />
            <rect x="75" y="28" width="9" height="32" />
            <rect x="88" y="18" width="12" height="42" />
            <rect x="105" y="33" width="7" height="27" />
            <rect x="118" y="12" width="18" height="48" />
            <rect x="140" y="24" width="10" height="36" />
            <rect x="155" y="30" width="8" height="30" />
            <rect x="168" y="21" width="13" height="39" />
            <rect x="185" y="27" width="7" height="33" />
            <rect x="198" y="18" width="12" height="42" />
            <rect x="215" y="36" width="9" height="24" />
            <rect x="230" y="24" width="10" height="36" />
            <rect x="245" y="30" width="7" height="30" />
            <rect x="258" y="27" width="12" height="33" />
            <rect x="275" y="22" width="8" height="38" />
            <rect x="288" y="29" width="11" height="31" />
            <rect x="305" y="25" width="9" height="35" />
            <rect x="320" y="31" width="6" height="29" />
            <rect x="332" y="19" width="14" height="41" />
            <rect x="350" y="26" width="10" height="34" />
            <rect x="365" y="32" width="8" height="28" />
            <rect x="378" y="28" width="12" height="32" />
          </svg>
        </div>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 text-white">
          <div className="text-left md:text-right">
            <div className="text-6xl md:text-8xl font-black mb-2" style={{ color: "#FCADE7" }}>
              MARCH
            </div>
            <div className="text-6xl md:text-8xl font-black" style={{ color: "#FCADE7" }}>
              2026<span className="text-4xl md:text-6xl italic font-light text-white">28</span>
            </div>
          </div>
          <div className="text-left space-y-2">
            <div className="text-2xl md:text-3xl font-bold">6:00 PM-11:00 PM</div>
            <div className="text-lg md:text-xl">DEC on Dragon 1414 Dragon St</div>
            <div className="text-lg md:text-xl">Dallas, TX, 75207</div>
            <div className="text-lg md:text-xl font-semibold">Attire: Funky Formal</div>
          </div>
        </div>

        {/* Description */}
        <div className="text-white text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          <p className="mb-4">{"We're getting married! From the dance floor to forever,"}</p>
          <p className="mb-4">we would love for you to join us celebrate our love.</p>
          <p className="text-sm md:text-base italic">
            **You MUST RSVP to recieve your Forever Fest wrist bands to enter the event**.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { value: timeLeft.days, label: "DAYS" },
              { value: timeLeft.hours, label: "HOURS" },
              { value: timeLeft.minutes, label: "MINUTES" },
              { value: timeLeft.seconds, label: "SECONDS" },
            ].map((item, index) => (
              <div key={index} className="rounded-lg p-4" style={{ backgroundColor: "#FDF0DA" }}>
                <div className="text-3xl md:text-4xl font-black" style={{ color: "#D14600" }}>
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm md:text-base font-bold" style={{ color: "#DE1ACE" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RSVP Button */}
        <div className="pb-12">
          <Button
            size="lg"
            className="text-2xl md:text-3xl font-black px-12 py-6 rounded-lg border-4 border-black hover:scale-105 transition-transform"
            style={{
              backgroundColor: "#DE1ACE",
              color: "#101048",
            }}
          >
            RSVP
          </Button>
        </div>
      </div>
    </div>
  )
}
