"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

// Dummy data for employees
const employees = [
  { id: 1, name: "Mahnaz Dolatabadi", title: "Project Manager", image: "/images/employee-5.jpeg", status: "current" },
  { id: 2, name: "Samaneh Iman", title: "Architect", image: "/images/employee-4.jpeg", status: "current" },
  { id: 3, name: "Aniseh AzizZadeh", title: "Architect", image: "/images/employee-3.jpeg", status: "current" },
  { id: 4, name: "Linda Mirian", title: "Architect", image: "/images/employee-2.jpeg", status: "current" },
  { id: 5, name: "Fatemeh Sheibany", title: "Architect", image: "/images/employee-9.jpeg", status: "current" },
  { id: 6, name: "Foad Bazghandi", title: "Architect", image: "/images/employee-7.jpeg", status: "current" },
  { id: 7, name: "Homa Amini", title: "Architect", image: "/images/employee-8.jpeg", status: "current" },
  { id: 8, name: "Shakila Sadeghian", title: "Architect", image: "/images/employee-1.jpeg", status: "current" },
  { id: 9, name: "Ali Rezaei", title: "Designer", image: "/images/employee-7.jpeg", status: "current" },
  { id: 10, name: "Sara Ahmadi", title: "Urban Planner", image: "/images/employee-5.jpeg", status: "former" },
  { id: 11, name: "Mohammad Karimi", title: "Structural Engineer", image: "/images/employee-8.jpeg", status: "former" },
  { id: 12, name: "Narges Hosseini", title: "Interior Designer", image: "/images/employee-4.jpeg", status: "former" },
  { id: 13, name: "Kianoush Sadeghi", title: "Landscape Architect", image: "/images/employee-1.jpeg", status: "former" },
  { id: 14, name: "Parisa Nazari", title: "Urban Designer", image: "/images/employee-3.jpeg", status: "former" },
  { id: 15, name: "Reza Ghasemi", title: "Civil Engineer", image: "/images/employee-2.jpeg", status: "former" },
  { id: 16, name: "Zahra Karimi", title: "Architectural Historian", image: "/images/employee-9.jpeg", status: "former" },
  { id: 17, name: "Amir Hosseini", title: "BIM Specialist", image: "/images/employee-7.jpeg", status: "former" },
  { id: 18, name: "Leila Ahmadi", title: "Sustainability Consultant", image: "/images/employee-5.jpeg", status: "former" },
]

const currentEmployees = employees.filter((employee) => employee.status === "current")
const formerEmployees = employees.filter((employee) => employee.status === "former")

const EMPLOYEES_PER_PAGE = 6 // Kept at 6 to fit layout with larger photos

// Animation variants for smooth transitions
const menuVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
}

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentEmployeePage, setCurrentEmployeePage] = useState(0)
  const [formerEmployeePage, setFormerEmployeePage] = useState(0)

  // Pagination for current employees
  const totalCurrentEmployeePages = Math.ceil(currentEmployees.length / EMPLOYEES_PER_PAGE)
  const currentStartIndex = currentEmployeePage * EMPLOYEES_PER_PAGE
  const currentEmployeesDisplay = currentEmployees.slice(currentStartIndex, currentStartIndex + EMPLOYEES_PER_PAGE)

  // Pagination for former employees
  const totalFormerEmployeePages = Math.ceil(formerEmployees.length / EMPLOYEES_PER_PAGE)
  const formerStartIndex = formerEmployeePage * EMPLOYEES_PER_PAGE
  const formerEmployeesDisplay = formerEmployees.slice(formerStartIndex, formerStartIndex + EMPLOYEES_PER_PAGE)

  const handleNextCurrentEmployeePage = () => {
    setCurrentEmployeePage((prev) => (prev + 1) % totalCurrentEmployeePages)
  }

  const handlePreviousCurrentEmployeePage = () => {
    setCurrentEmployeePage((prev) => (prev - 1 + totalCurrentEmployeePages) % totalCurrentEmployeePages)
  }

  const handleNextFormerEmployeePage = () => {
    setFormerEmployeePage((prev) => (prev + 1) % totalFormerEmployeePages)
  }

  const handlePreviousFormerEmployeePage = () => {
    setFormerEmployeePage((prev) => (prev - 1 + totalFormerEmployeePages) % totalFormerEmployeePages)
  }

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
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 md:w-10 md:h-10"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 relative">
        {/* Vertical Divider Lines (Desktop Only) */}
        <div className="hidden lg:block absolute left-1/3 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />
        <div className="hidden lg:block absolute left-2/3 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />

        {/* Left Side: Manager Section */}
        <section className="p-8 md:p-12 lg:px-24 lg:py-16 flex flex-col justify-center items-start lg:items-center text-left lg:text-left">
          <div className="max-w-lg">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-gray-900">
              KHAYYATZADEH AND PARTNER <br /> ARCHITECTURE STUDI
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Behind every iconic project is a talented team of international architects, designers and thinkers.
            </p>
            <Button variant="outline" className="text-base font-medium flex items-center gap-2 mb-12 bg-transparent">
              JOIN US <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="w-64 h-64 md:w-80 md:h-80 relative overflow-hidden rounded-lg mb-4">
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

        {/* Middle: Current Team Members */}
        <section className="p-8 md:p-12 lg:px-24 lg:py-16 flex flex-col justify-center items-start text-left">
          <div className="max-w-lg lg:ml-[18%]">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Current Team Members</h2>
            <div className="relative">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-36 gap-y-6 mb-8">
                {currentEmployeesDisplay.map((employee) => (
                  <div key={employee.id} className="flex flex-col items-center text-center">
                    <div className="w-28 h-28 relative overflow-hidden rounded-lg mb-2">
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
              {totalCurrentEmployeePages > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
                    onClick={handlePreviousCurrentEmployeePage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-20 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
                    onClick={handleNextCurrentEmployeePage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Right: Former Team Members */}
        <section className="p-8 md:p-12 lg:px-24 lg:py-16 flex flex-col justify-center items-start text-left">
          <div className="max-w-lg lg:ml-[18%]">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Former Team Members</h2>
            <div className="relative">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-36 gap-y-6 mb-8">
                {formerEmployeesDisplay.map((employee) => (
                  <div key={employee.id} className="flex flex-col items-center text-center">
                    <div className="w-28 h-28 relative overflow-hidden rounded-lg mb-2">
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
              {totalFormerEmployeePages > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
                    onClick={handlePreviousFormerEmployeePage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-20 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
                    onClick={handleNextFormerEmployeePage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Navigation Menu Overlay */}
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