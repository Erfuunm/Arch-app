"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

// Translation object for bilingual static text
const translations = {
  en: {
    studioName: "KHAYYATZADEH AND PARTNER ARCHITECTURE STUDIO",
    description: "Behind every iconic project is a talented team of international architects, designers and thinkers.",
    joinUs: "JOIN US",
    ceo: "CEO",
    team: "Team Members",
    projects: "Projects",
    aboutUs: "About Us",
    contact: "Contact",
  },
  fa: {
    studioName: "استودیو معماری خیاط‌زاده و همکاران",
    description: "پشت هر پروژه نمادین، تیمی با استعداد از معماران، طراحان و متفکران بین‌المللی قرار دارد.",
    joinUs: "به ما بپیوندید",
    ceo: "مدیرعامل",
    team: "اعضای تیم",
    projects: "پروژه‌ها",
    aboutUs: "درباره ما",
    contact: "تماس",
  },
}

// Animation variants for smooth transitions
const menuVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
}

export default function AboutPage() {
  const [lang, setLang] = useState<"en" | "fa">("en") // Language state
  const [employees, setEmployees] = useState<any[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [employeePage, setEmployeePage] = useState(0)

  // Load employees based on language
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await fetch(lang === "en" ? "/data/employees_en.json" : "/data/employees_fa.json")
        const data = await response.json()
        setEmployees(data)
      } catch (error) {
        console.error("Error loading employees:", error)
      }
    }
    loadEmployees()
  }, [lang])

  // Sort employees: current first, then former
  const sortedEmployees = [
    ...employees.filter((employee) => employee.status === "current"),
    ...employees.filter((employee) => employee.status === "former")
  ]

  const EMPLOYEES_PER_PAGE = 9 // Increased to 9 to show more members

  // Pagination for employees
  const totalEmployeePages = Math.ceil(sortedEmployees.length / EMPLOYEES_PER_PAGE)
  const startIndex = employeePage * EMPLOYEES_PER_PAGE
  const employeesDisplay = sortedEmployees.slice(startIndex, startIndex + EMPLOYEES_PER_PAGE)

  const handleNextEmployeePage = () => {
    setEmployeePage((prev) => (prev + 1) % totalEmployeePages)
  }

  const handlePreviousEmployeePage = () => {
    setEmployeePage((prev) => (prev - 1 + totalEmployeePages) % totalEmployeePages)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" lang={lang}>
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <Image
              src="/images/Logo.png"
              alt="Company Icon"
              fill
              className="object-contain"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setLang(lang === "en" ? "fa" : "en")}
            className="text-sm"
          >
            {lang === "en" ? "فارسی" : "English"}
          </Button>
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
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Vertical Divider Lines (Desktop Only) */}
        <div className="hidden lg:block absolute left-1/3 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />
        <div className="hidden lg:block absolute left-3/3 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />

        {/* Left Side: Manager Section */}
        <section 
          className="p-8 md:p-12 lg:px-48 lg:py-16 flex flex-col justify-center items-start text-left"

        >
          <div className="max-w-lg">
            <h1 className="text-3xl md:text-4xl lg:text-3xl font-bold leading-tight mb-6 text-gray-900">
              {translations[lang].studioName}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              {translations[lang].description}
            </p>
            <Button variant="outline" className="text-base font-medium flex items-center gap-2 mb-12 bg-transparent">
              {translations[lang].joinUs} <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="w-64 h-64 md:w-80 md:h-80 relative overflow-hidden rounded-lg mb-4">
              <Image
                src="/images/hasan-khayyat-zadeh.jpeg"
                alt={lang === "fa" ? "حسن خیاط‌زاده" : "Hasan Khayyat Zadeh"}
                fill
                className="object-cover grayscale"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{lang === "fa" ? "حسن خیاط‌زاده" : "Hasan Khayyat Zadeh"}</h3>
            <p className="text-sm text-gray-600">{translations[lang].ceo}</p>
          </div>
        </section>

        {/* Middle: Team Members */}
        <section className="p-8 md:p-12  lg:px-0 lg:py-16 flex flex-col justify-center items-start text-left">
          <div className="max-w-2xl lg:ml-[5%]">
            <h2 className="text-2xl font-semibold mb-8 text-gray-900  md:ml-[-7%]">{translations[lang].team} : </h2>
            <div className="relative">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-20 md:gap-x-48 gap-y-8 mb-8">
                {employeesDisplay.map((employee) => (
                  <div key={employee.id} className="flex flex-col items-center text-center">
                    <div className="w-48 h-40 relative overflow-hidden rounded-lg mb-3">
                      <Image
                        src={employee.image || "/placeholder.svg"}
                        alt={employee.name}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>
                    <h3 className="text-base font-medium text-gray-900 leading-tight w-48">{employee.name}</h3>
                    <p className="text-sm text-gray-600 w-48">{employee.title}</p>
                  </div>
                ))}
              </div>
              {totalEmployeePages > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -left-24 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
                    onClick={handlePreviousEmployeePage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-24 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
                    onClick={handleNextEmployeePage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Right: Empty Section */}
        <section className="p-8 md:p-12 lg:px-24 lg:py-16 flex flex-col justify-center items-start text-left">
        </section>
      </main>

      {/* Navigation Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-lg z-50 p-6 flex flex-col"
            style={{ direction: "ltr" }}
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
                  {translations[lang].projects}
                </Button>
              </Link>
              <Link href="/about" passHref onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-xl">
                  {translations[lang].aboutUs}
                </Button>
              </Link>
              <Link href="/contact" passHref onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-xl">
                  {translations[lang].contact}
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}