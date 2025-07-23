"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

// Dummy data for employees
const employees = [
  { id: 1, name: "Mahnaz Dolatabadi", title: "Project Manager", image: "/images/employee-5.jpeg" },
  { id: 2, name: "Samaneh Iman", title: "Architect", image: "/images/employee-4.jpeg" },
  { id: 3, name: "Aniseh AzizZadeh", title: "Architect", image: "/images/employee-3.jpeg" },
  { id: 4, name: "Linda Mirian", title: "Architect", image: "/images/employee-2.jpeg" },
  { id: 5, name: "Fatemeh Sheibany", title: "Architect", image: "/images/employee-9.jpeg" },
  { id: 6, name: "Foad Bazghandi", title: "Architect", image: "/images/employee-7.jpeg" },
  { id: 7, name: "Homa Amini", title: "Architect", image: "/images/employee-8.jpeg" },
  { id: 8, name: "Shakila Sadeghian", title: "Architect", image: "/images/employee-1.jpeg" },
  { id: 9, name: "Ali Rezaei", title: "Designer", image: "/images/employee-7.jpeg" }, // Repeated
  { id: 10, name: "Sara Ahmadi", title: "Urban Planner", image: "/images/employee-5.jpeg" }, // Repeated
  { id: 11, name: "Mohammad Karimi", title: "Structural Engineer", image: "/images/employee-8.jpeg" }, // Repeated
  { id: 12, name: "Narges Hosseini", title: "Interior Designer", image: "/images/employee-4.jpeg" }, // Repeated
  { id: 13, name: "Kianoush Sadeghi", title: "Landscape Architect", image: "/images/employee-1.jpeg" }, // Repeated
  { id: 14, name: "Parisa Nazari", title: "Urban Designer", image: "/images/employee-3.jpeg" }, // Repeated
  { id: 15, name: "Reza Ghasemi", title: "Civil Engineer", image: "/images/employee-2.jpeg" }, // Repeated
  { id: 16, name: "Zahra Karimi", title: "Architectural Historian", image: "/images/employee-9.jpeg" }, // Repeated
  { id: 17, name: "Amir Hosseini", title: "BIM Specialist", image: "/images/employee-7.jpeg" }, // Repeated
  { id: 18, name: "Leila Ahmadi", title: "Sustainability Consultant", image: "/images/employee-5.jpeg" }, // Repeated
]

const EMPLOYEES_PER_PAGE = 12 // Changed from 16 to 12

const menuVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
}

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentEmployeePage, setCurrentEmployeePage] = useState(0)

  const totalEmployeePages = Math.ceil(employees.length / EMPLOYEES_PER_PAGE)
  const startIndex = currentEmployeePage * EMPLOYEES_PER_PAGE
  const currentEmployees = employees.slice(startIndex, startIndex + EMPLOYEES_PER_PAGE)

  const handleNextEmployeePage = () => {
    setCurrentEmployeePage((prev) => (prev + 1) % totalEmployeePages)
  }

  const handlePreviousEmployeePage = () => {
    setCurrentEmployeePage((prev) => (prev - 1 + totalEmployeePages) % totalEmployeePages)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="text-xl md:text-2xl font-bold">KH</div>
        </div>

        {/* Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 md:w-10 md:h-10" // Removed lg:hidden to make it always visible
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Vertical Divider Line (Desktop Only) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />

        {/* Left Side: Manager Section */}
        <section className="p-8 md:p-12 lg:px-24  lg:py-16 flex flex-col justify-center items-start lg:items-center text-left lg:text-left">
          <div className="max-w-lg lg:ml-">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-gray-900">
              KHAYYATZADEH AND PARTNER <br /> ARCHITECTURE STUDI
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Behind every iconic project is a talented team of international architects, designers and thinkers.
            </p>
            <Button variant="outline" className="text-base font-medium flex items-center gap-2 mb-12 bg-transparent">
              JOIN US <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="w-48 h-48 md:w-64 md:h-64 relative overflow-hidden rounded-lg mb-4">
              <Image
                src="/images/hasan-khayyat-zadeh.jpeg"
                alt="Hasan Khayyat Zadeh"
                fill
                className="object-cover grayscale"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Hasan Khayyat Zadeh</h3>
            <p className="text-sm text-gray-600">CEO</p>
          </div>
        </section>

        {/* Right Side: Other Employees Section */}
        <section className="p-8 md:p-12 lg:px-24 lg:py-16 flex flex-col justify-center items-start text-left">
          <div className="max-w-lg lg:ml-[18%]">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">A-Z</h2>
            <div className="relative">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {currentEmployees.map((employee) => (
                  <div key={employee.id} className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 relative overflow-hidden rounded-lg mb-2">
                      <Image
                        src={employee.image || "/placeholder.svg"}
                        alt={employee.name}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 leading-tight">{employee.name}</h3>
                    <p className="text-xs text-gray-600">{employee.title}</p>
                  </div>
                ))}
              </div>
              {totalEmployeePages > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
                    onClick={handlePreviousEmployeePage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-20 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
                    onClick={handleNextEmployeePage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
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
