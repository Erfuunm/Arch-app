"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Instagram, ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import JoinUsModal from "./JoinUsModal"

// Translation object for bilingual static text
const translations = {
  en: {
    contact: "Contact",
    getInTouch: "Get in touch",
    description: "Behind every iconic project is a talented team of international architects, designers and thinkers.",
    joinUs: "JOIN US",
    email: "Email",
    phone: "Phone",
    address: "Address",
    instagram: "Instagram",
    projects: "Projects",
    aboutUs: "About Us",
    addressValue: "No. 46.1, Unit 2, 10th Goya St, Malek Abad, Mashhad, Iran"
  },
  fa: {
    contact: "تماس",
    getInTouch: "با ما در تماس باشید",
    description: "پشت هر پروژه نمادین، تیمی با استعداد از معماران، طراحان و متفکران بین‌المللی قرار دارد.",
    joinUs: "به ما بپیوندید",
    email: "ایمیل",
    phone: "تلفن",
    address: "آدرس",
    instagram: "اینستاگرام",
    projects: "پروژه‌ها",
    aboutUs: "درباره ما",
    addressValue: "مشهد / ملک آباد – نبش گویا 10 پلاک 46.1 واحد 2"
  },
}

// Animation variants for smooth transitions
const menuVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
}

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function ContactPage() {
  const [lang, setLang] = useState<"en" | "fa">("en") // Language state
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col" 
      lang={lang}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6 bg-white/90 backdrop-blur-lg border-b border-gray-100/50 shadow-sm">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src="/images/Logo.png"
              alt="Company Icon"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            onClick={() => setLang(lang === "en" ? "fa" : "en")}
            className="text-sm"
          >
            {lang === "en" ? "EN/FA" : "FA/EN"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 md:w-12 md:h-12 hover:bg-gray-100/80 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main 
        className="flex-1 p-6 md:p-10 lg:p-16"
        style={{ direction: lang === "fa" ? "rtl" : "ltr" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Contact Details Card */}
          <motion.div 
            className="flex-1 bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-8 border border-white/30 min-h-[500px] flex flex-col justify-between"
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                {translations[lang].contact}
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 opacity-80">
                {translations[lang].getInTouch}
              </h2>

              <hr className="border-t border-gray-200/50 mb-6" />

              <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed font-light">
                {translations[lang].description}
              </p>
              <Button 
                className="text-base font-medium flex items-center gap-2 mb-6 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                {translations[lang].joinUs} <ArrowRight className="w-4 h-4" />
              </Button>

              <hr className="border-t border-gray-200/50 mb-6" />

              <div className="space-y-4 mt-8">
                <motion.div 
                  className="flex items-center gap-4 hover:bg-white/30 p-3 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div style={{ textAlign: lang === "fa" ? "right" : "left" }}>
                    <p className="text-sm text-gray-600">{translations[lang].email}</p>
                    <p className="text-base font-medium text-gray-900">khayyatzadeh@gmail.com</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 hover:bg-white/30 p-3 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div style={{ textAlign: lang === "fa" ? "right" : "left" }}>
                    <p className="text-sm text-gray-600">{translations[lang].phone}</p>
                    <p className="text-base font-medium text-gray-900">05136026460 - 09153159410</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 hover:bg-white/30 p-3 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div style={{ textAlign: lang === "fa" ? "right" : "left" }}>
                    <p className="text-sm text-gray-600">{translations[lang].address}</p>
                    <p className="text-base font-medium text-gray-900">{translations[lang].addressValue}</p>
                  </div>
                </motion.div>
               
              </div>
            </div>
          </motion.div>

          {/* Map Card */}
          <motion.div 
            className="flex-1 bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-8 border border-white/30 min-h-[500px] flex flex-col"
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4" style={{ textAlign: lang === "fa" ? "right" : "left" }}>
              {translations[lang].address}
            </h2>
            <div className="flex-1 relative rounded-lg overflow-hidden mt-12">
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1327.6255551101954!2d59.5454023852091!3d36.31376613633289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6c923e7f586005%3A0x6cada71e4ba9fe92!2sRazavi%20Khorasan%20Province%2C%20Mashhad%2C%20District%201%2C%20Gooya%2C%20Iran!5e0!3m2!1sen!2s!4v1758005639602!5m2!1sen!2s" width="600" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <p className="text-sm text-gray-600 mt-4" style={{ textAlign: lang === "fa" ? "right" : "left" }}>
              {translations[lang].address}: {translations[lang].addressValue}
            </p>
          </motion.div>
        </div>
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
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white/95 backdrop-blur-md shadow-lg z-50 p-6 flex flex-col"
            style={{ direction: "ltr" }}
          >
            <div className="flex justify-end mb-8">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-gray-100/80 rounded-full"
              >
                <X className="w-6 h-6 text-gray-700" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <Link href="/" passHref onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-xl hover:bg-gray-100/80 rounded-lg">
                  {translations[lang].projects}
                </Button>
              </Link>
              <Link href="/about" passHref onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-xl hover:bg-gray-100/80 rounded-lg">
                  {translations[lang].aboutUs}
                </Button>
              </Link>
              <Link href="/contact" passHref onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-xl hover:bg-gray-100/80 rounded-lg">
                  {translations[lang].contact}
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Join Us Modal */}
      <JoinUsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang={lang} />
    </div>
  )
}
