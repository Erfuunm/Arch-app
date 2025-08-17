"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Instagram, ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const menuVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
}

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <Image
              src="/images/Logo.png"
              alt="Company Icon"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 md:w-10 md:h-10"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="w-5 h-5 md:w-6 h-6" />
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="max-w-2xl w-full text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Contact</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">Get in touch</h2>

          <hr className="border-t border-gray-200 mb-8" />

          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Behind every iconic project is a talented team of international architects, designers and thinkers.
          </p>
          <Button variant="outline" className="text-base font-medium flex items-center gap-2 mb-12 bg-transparent">
            JOIN US <ArrowRight className="w-4 h-4" />
          </Button>

          <hr className="border-t border-gray-200 mb-8" />

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-base font-medium text-gray-900">contact@pex-office.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-base font-medium text-gray-900">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-base font-medium text-gray-900">123 Architecture Ave, Design District</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Instagram className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Instagram</p>
                <p className="text-base font-medium text-gray-900">@pex-office</p>
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-200 mt-12" />
        </div>
      </main>

      {/* Navigation Menu Overlay (reused from app/page.tsx) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={menuVariants}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-lg z-50 p-6 flex flex-col"
          >
            <div className="flex justify-end mb-8">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <Link href="/" passHref onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-xl">
                  Projects
                </Button>
              </Link>
              <Link href="/about" passHref onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-xl">
                  About Us
                </Button>
              </Link>
              <Link href="/contact" passHref onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-xl">
                  Contact
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}