"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Menu, ArrowLeft, ArrowRight, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

// Translation object for bilingual static text
const translations = {
  en: {
    allType: "ALL TYPE",
    residential: "RESIDENTIAL",
    commercial: "COMMERCIAL",
    mixedUse: "MIXED USE",
    allLocations: "ALL LOCATIONS",
    allYears: "ALL YEARS",
    back: "Back",
    moreInfo: "MORE INFO",
    previousProject: "PREVIOUS PROJECT",
    nextProject: "NEXT PROJECT",
    keyInfo: "Key Info",
    type: "Type",
    status: "Status",
    timespan: "Time span",
    client: "Client",
    location: "Location",
    size: "Size",
    projectOverview: "Project Overview",
    projects: "Projects",
    aboutUs: "About Us",
    contact: "Contact",
    pageOf: "Page {current} of {total}",
    loadingText: "KHAYYATZADEH- AND- ASSOCIATES",
  },
  fa: {
    allType: "همه انواع",
    residential: "مسکونی",
    commercial: "تجاری",
    mixedUse: "چندمنظوره",
    allLocations: "همه مکان‌ها",
    allYears: "همه سال‌ها",
    back: "بازگشت",
    moreInfo: "اطلاعات بیشتر",
    previousProject: "پروژه قبلی",
    nextProject: "پروژه بعدی",
    keyInfo: "اطلاعات کلیدی",
    type: "نوع",
    status: "وضعیت",
    timespan: "بازه زمانی",
    client: "مشتری",
    location: "مکان",
    size: "اندازه",
    projectOverview: "نمای کلی پروژه",
    projects: "پروژه‌ها",
    aboutUs: "درباره ما",
    contact: "تماس",
    pageOf: "صفحه {current} از {total}",
    loadingText: "خیاط‌زاده و همکاران",
  },
}

// Animation variants for smooth transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const projectDetailVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

const loadingContainerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
}

const letterVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

const filterVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export default function ProjectsPage() {
  const [lang, setLang] = useState<"en" | "fa">("en")
  const [projects, setProjects] = useState<any[]>([])
  const [typeFilter, setTypeFilter] = useState("ALL TYPE")
  const [locationFilter, setLocationFilter] = useState("ALL LOCATIONS")
  const [yearFilter, setYearFilter] = useState("ALL YEARS")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Load projects based on language
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(lang === "en" ? "/data/projects_en.json" : "/data/projects_fa.json")
        const data = await response.json()
        const projectsWithoutId12 = data.filter((project: any) => project.id !== 12)
        setProjects(projectsWithoutId12)
      } catch (error) {
        console.error("Error loading projects:", error)
      }
    }
    loadProjects()
  }, [lang])

  // Handle loading screen timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle mouse movement for horizontal scrolling (desktop only)
  useEffect(() => {
    if (isMobile) return
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let isDragging = false
    let startX: number
    let scrollLeft: number

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      startX = e.pageX - scrollContainer.offsetLeft
      scrollLeft = scrollContainer.scrollLeft
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - scrollContainer.offsetLeft
      const walk = (x - startX) * 2
      scrollContainer.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    scrollContainer.addEventListener("mousedown", handleMouseDown)
    scrollContainer.addEventListener("mousemove", handleMouseMove)
    scrollContainer.addEventListener("mouseup", handleMouseUp)
    scrollContainer.addEventListener("mouseleave", handleMouseUp)

    return () => {
      scrollContainer.removeEventListener("mousedown", handleMouseDown)
      scrollContainer.removeEventListener("mousemove", handleMouseMove)
      scrollContainer.removeEventListener("mouseup", handleMouseUp)
      scrollContainer.removeEventListener("mouseleave", handleMouseUp)
    }
  }, [isMobile])

  // Handle mouse wheel for horizontal scrolling (desktop only)
  useEffect(() => {
    if (isMobile) return
    const container = scrollContainerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const scrollAmount = e.deltaY * 0.5
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [isMobile])

  // Handle arrow button scrolling
  const scrollLeft = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const typeMatch = typeFilter === "ALL TYPE" || project.type === typeFilter
      const locationMatch = locationFilter === "ALL LOCATIONS" || project.location === locationFilter
      const yearMatch = yearFilter === "ALL YEARS" || project.year.toString() === yearFilter
      return typeMatch && locationMatch && yearMatch
    })
  }, [projects, typeFilter, locationFilter, yearFilter])

  const PROJECTS_PER_PAGE = 16
  const totalProjects = Math.min(filteredProjects.length, PROJECTS_PER_PAGE * 3)
  const totalPages = Math.min(Math.ceil(totalProjects / PROJECTS_PER_PAGE), 3)

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId)
  }

  const handleBackToGrid = () => {
    setSelectedProject(null)
  }

  const handlePreviousProject = () => {
    if (selectedProject) {
      const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject)
      if (currentIndex === -1) return
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1
      setSelectedProject(filteredProjects[previousIndex].id)
    }
  }

  const handleNextProject = () => {
    if (selectedProject) {
      const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject)
      if (currentIndex === -1) return
      const nextIndex = currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0
      setSelectedProject(filteredProjects[nextIndex].id)
    }
  }

  const selectedProjectData = filteredProjects.find((p) => p.id === selectedProject)
  const otherProjects = filteredProjects.filter((p) => p.id !== selectedProject)

  const contentTextDirection = lang === "fa" ? "rtl" : "ltr"
  const contentFontFamily = lang === "fa" ? "Vazirmatn, sans-serif" : "Inter, sans-serif"
  const headerTextDirection = "ltr"
  const headerFontFamily = "Inter, sans-serif"

  const filterOptions = {
    type: [
      { value: "ALL TYPE", label: translations[lang].allType },
      { value: "RESIDENTIAL", label: translations[lang].residential },
      { value: "COMMERCIAL", label: translations[lang].commercial },
      { value: "MIXED USE", label: translations[lang].mixedUse },
    ],
    location: [
      { value: "ALL LOCATIONS", label: translations[lang].allLocations },
      { value: "MASHHAD", label: lang === "fa" ? "مشهد" : "MASHHAD" },
      { value: "TEHRAN", label: lang === "fa" ? "تهران" : "TEHRAN" },
      { value: "ISFAHAN", label: lang === "fa" ? "اصفهان" : "ISFAHAN" },
    ],
    year: [
      { value: "ALL YEARS", label: translations[lang].allYears },
      { value: "2025", label: "2025" },
      { value: "2024", label: "2024" },
      { value: "2023", label: "2023" },
    ],
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading-screen"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={loadingContainerVariants}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
          <motion.h1
            className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider flex flex-wrap justify-center px-4"
            style={{ direction: contentTextDirection, fontFamily: contentFontFamily }}
            variants={loadingContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {translations[lang].loadingText.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>
      ) : (
        <motion.div
          key="project-grid-view"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-white overflow-hidden"
          style={{ direction: contentTextDirection, fontFamily: contentFontFamily }}
        >
          <AnimatePresence mode="wait">
            {selectedProject && selectedProjectData ? (
              <motion.div
                key="project-detail-view"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={projectDetailVariants}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-white overflow-hidden"
                style={{ direction: contentTextDirection, fontFamily: contentFontFamily }}
              >
                <header
                  className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-white"
                  style={{ direction: headerTextDirection, fontFamily: headerFontFamily }}
                >
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
                  <div className="hidden lg:flex items-center gap-4">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[140px] rounded-full border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.type.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger className="w-[160px] rounded-full border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.location.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={yearFilter} onValueChange={setYearFilter}>
                      <SelectTrigger className="w-[140px] rounded-full border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.year.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => setLang(lang === "en" ? "fa" : "en")}
                      className="text-sm"
                    >
                      {lang === "en" ? "EN/FA" : "FA/EN"}
                    </Button>
                    <Button
                      onClick={handleBackToGrid}
                      className="flex items-center gap-2 text-white hover:bg-gray-800 hover:text-white"
                    >
                      {translations[lang].back}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 md:w-10 md:h-10"
                      onClick={() => setIsMenuOpen(true)}
                    >
                      <Menu className="w-5 h-5 md:w-6 md:h-6" />
                    </Button>
                  </div>
                </header>
                <div className="flex flex-wrap gap-2 p-4 md:p-6 pb-4 lg:hidden bg-white">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 md:w-10 md:h-10"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="w-5 h-5 md:w-6 md:h-6" />
                  </Button>
                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={filterVariants}
                        transition={{ duration: 0.3 }}
                        className="flex flex-wrap gap-2 w-full"
                      >
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                          <SelectTrigger className="w-full sm:w-[140px] rounded-full border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {filterOptions.type.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={locationFilter} onValueChange={setLocationFilter}>
                          <SelectTrigger className="w-full sm:w-[160px] rounded-full border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {filterOptions.location.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={yearFilter} onValueChange={setYearFilter}>
                          <SelectTrigger className="w-full sm:w-[140px] rounded-full border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {filterOptions.year.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="px-3 md:px-6 h-auto bg-[#f5f5f5]">
                  <div className="max-w-7xl mx-auto pb-10 pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-8">
                      <div className="hidden lg:block lg:col-span-2 lg:space-y-3 order-2 lg:order-1">
                        {otherProjects.slice(0, 6).map((project, index) => (
                          <div
                            key={`left-${project.id}-${index}`}
                            className="relative overflow-hidden rounded-lg cursor-pointer transition-all hover:scale-[1.02] bg-gray-100 shadow-sm border border-gray-200 h-24"
                            onClick={() => handleProjectClick(project.id)}
                          >
                            <div className="relative h-[calc(100%-42px)]">
                              <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.name}
                                fill
                                className="object-cover grayscale transition-all"
                              />
                            </div>
                            <div className="h-[42px] bg-gray-50 py-4 p-2 flex flex-col justify-center">
                              <h3 className="font-medium text-xs text-gray-900 leading-tight mb-0.5">{project.name}</h3>
                              <p className="text-xs text-gray-600">
                                {project.year} {project.location}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <motion.div
                        key={selectedProjectData.id}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={projectDetailVariants}
                        transition={{ duration: 0.3 }}
                        className="col-span-full lg:col-span-3 order-1 lg:order-2"
                      >
                        <div
                          className="relative overflow-hidden rounded-lg bg-gray-100 shadow-lg border border-gray-200"
                        >
                          <div className="relative h-60 sm:h-80 md:h-96 lg:h-[500px]">
                            <Image
                              src={selectedProjectData.detailImage || selectedProjectData.image || "/placeholder.svg"}
                              alt={selectedProjectData.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4 bg-white border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                              <div>
                                <h2 className="font-semibold text-lg text-gray-900 mb-1">{selectedProjectData.name}</h2>
                                <p className="text-sm text-gray-600">
                                  {selectedProjectData.year} {selectedProjectData.location}
                                </p>
                              </div>
                              <Link href={`/projects/${selectedProjectData.id}`} passHref>
                                <Button variant="outline" size="sm" className="text-sm bg-transparent mt-2 sm:mt-0">
                                  {translations[lang].moreInfo} <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                          <div className="p-4 bg-white">
                            <div className="grid grid-cols-1 gap-6">
                              <div>
                                <h3 className="font-semibold text-sm mb-4 text-gray-900">{translations[lang].keyInfo}</h3>
                                <div className="space-y-3 text-sm">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="font-medium text-gray-900">{translations[lang].type}</p>
                                      <p className="text-gray-600">{selectedProjectData.type}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900">{translations[lang].status}</p>
                                      <p className="text-gray-600">{selectedProjectData.status}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{translations[lang].timespan}</p>
                                    <p className="text-gray-600">{selectedProjectData.timespan}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="font-medium text-gray-900">{translations[lang].client}</p>
                                      <p className="text-gray-600">{selectedProjectData.client}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900">{translations[lang].location}</p>
                                      <p className="text-gray-600">{selectedProjectData.clientLocation}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{translations[lang].size}</p>
                                    <p className="text-gray-600">{selectedProjectData.size}</p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold text-sm mb-4 text-gray-900">{translations[lang].projectOverview}</h3>
                                <p className="text-sm text-gray-700 leading-relaxed">{selectedProjectData.overview}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                          <Button
                            variant="outline"
                            onClick={handlePreviousProject}
                            className="flex items-center gap-2 bg-transparent text-sm"
                          >
                            {lang === "fa" ? (
                              <>
                                {translations[lang].previousProject}
                                <ArrowRight className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                <ArrowLeft className="w-4 h-4" />
                                {translations[lang].previousProject}
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleNextProject}
                            className="flex items-center gap-2 bg-transparent text-sm"
                          >
                            {lang === "fa" ? (
                              <>
                                <ArrowLeft className="w-4 h-4" />
                                {translations[lang].nextProject}
                              </>
                            ) : (
                              <>
                                {translations[lang].nextProject}
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </motion.div>
                      <div className="hidden lg:block lg:col-span-2 lg:space-y-3 order-3 lg:order-3">
                        {otherProjects.slice(6, 12).map((project, index) => (
                          <div
                            key={`right-${project.id}-${index}`}
                            className="relative overflow-hidden rounded-lg cursor-pointer transition-all hover:scale-[1.02] bg-gray-100 shadow-sm border border-gray-200 h-24"
                            onClick={() => handleProjectClick(project.id)}
                          >
                            <div className="relative h-[calc(100%-42px)]">
                              <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.name}
                                fill
                                className="object-cover grayscale transition-all"
                              />
                            </div>
                            <div className="h-[42px] bg-gray-50 py-4 p-2 flex flex-col justify-center">
                              <h3 className="font-medium text-xs text-gray-900 leading-tight mb-0.5">{project.name}</h3>
                              <p className="text-xs text-gray-600">
                                {project.year} {project.location}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="project-grid-view"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.5 }}
                className="min-h-screen overflow-hidden"
                style={{ direction: contentTextDirection, fontFamily: contentFontFamily }}
              >
                <header
                  className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-white"
                  style={{ direction: headerTextDirection, fontFamily: headerFontFamily }}
                >
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
                  <div className="hidden lg:flex items-center gap-4">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[140px] rounded-full border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.type.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger className="w-[160px] rounded-full border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.location.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={yearFilter} onValueChange={setYearFilter}>
                      <SelectTrigger className="w-[140px] rounded-full border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.year.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      className="w-8 h-8 md:w-10 md:h-10 lg:hidden"
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                      <Filter className="w-5 h-5 md:w-6 md:h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 md:w-10 md:h-10"
                      onClick={() => setIsMenuOpen(true)}
                    >
                      <Menu className="w-5 h-5 md:w-6 md:h-6" />
                    </Button>
                  </div>
                </header>
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={filterVariants}
                      transition={{ duration: 0.3 }}
                      className="flex flex-wrap gap-2 p-4 md:p-6 pb-4 md:pb-8 lg:hidden bg-white"
                    >
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-full sm:w-[140px] rounded-full border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOptions.type.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger className="w-full sm:w-[160px] rounded-full border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOptions.location.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger className="w-full sm:w-[140px] rounded-full border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOptions.year.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}
                </AnimatePresence>
 <div className="relative">
  <div
    ref={scrollContainerRef}
    className={`px-3 md:px-6 bg-[#f5f5f5] ${isMobile ? 'overflow-y-auto' : 'overflow-x-auto overflow-y-hidden'}`}
    style={{ height: isMobile ? "auto" : "calc(100vh - 92px)", scrollBehavior: "smooth" }}
  >
    {isMobile ? (
      <div className="grid grid-cols-1 gap-3">
        {filteredProjects.map((project, index) => (
          <div
            key={`grid-${project.id}`}
            className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02] bg-gray-100 shadow-sm border border-gray-200"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="relative h-[180px]">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="h-[60px] bg-gray-50 p-3 flex flex-col items-center justify-center">
              <h3 className="font-medium text-sm text-gray-900 leading-tight mb-1">{project.name}</h3>
              <p className="text-xs text-gray-600">
                {project.year} {project.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-row gap-4">
        {Array.from({ length: totalPages }).map((_, pageIndex) => {
          const startIndex = pageIndex * PROJECTS_PER_PAGE
          const currProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE)
          return (
            <div
              key={`page-${pageIndex}`}
              className={`min-w-[calc(100vw-24px)] md:min-w-[calc(100vw-48px)] lg:min-w-[calc(100vw-108px)] ${lang === 'en' ? 'md:pr-5' : 'md:pl-5'} flex-shrink-0 snap-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mx-auto lg:mt-[2%]`}
              style={{ height: "calc(100vh - 172px)", overflowY: "hidden" }}
            >
              {currProjects.map((project, index) => {
                let gridClass = "col-span-1 row-span-1"
                let isPlaceholder = false

                if (index === 0) {
                  gridClass = "col-span-1 row-span-1 lg:col-span-1 lg:row-span-2"
                } else if (index === 1) {
                  isPlaceholder = true
                  gridClass = "col-span-1 row-span-1"
                } else if (index === 2) {
                  gridClass = "col-span-1 row-span-1 lg:col-span-2 lg:row-span-1"
                } else if (index === 3) {
                  gridClass = "col-span-1 row-span-3"
                } else if (index === 4) {
                  gridClass = "col-span-1 row-span-1 lg:col-span-1 lg:row-span-2"
                } else if (index === 5) {
                  gridClass = "col-span-1 row-span-1"
                } else if (index === 6) {
                  gridClass = "col-span-1 row-span-1 lg:col-span-2 lg:row-span-2"
                } else if (index === 7) {
                  gridClass = "col-span-1 row-span-1 hidden"
                } else if (index === 8) {
                  gridClass = "col-span-1 row-span-1"
                } else if (index === 9) {
                  gridClass = "col-span-1 row-span-2"
                } else if (index === 10) {
                  isPlaceholder = true
                  gridClass = "col-span-1 row-span-1"
                } else if (index === 11) {
                  isPlaceholder = true
                  gridClass = "col-span-1 row-span-1"
                } else if (index === 12) {
                  isPlaceholder = true
                  gridClass = "col-span-1 row-span-1"
                } else if (index === 13) {
                  gridClass = "col-span-1 row-span-1"
                } else if (index === 14) {
                  isPlaceholder = true
                  gridClass = "col-span-1 row-span-1"
                } else if (index === 15) {
                  gridClass = "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1"
                }

                if (isPlaceholder) {
                  return (
                    <div
                      key={`placeholder-${index}`}
                      className={`relative ${gridClass}`}
                    />
                  )
                }

                return (
                  <div
                    key={`grid-${project.id}`}
                    className={`group relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02] bg-gray-100 shadow-sm border border-gray-200 ${gridClass}`}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <div className="relative h-[180px] sm:h-[200px] md:h-[220px] lg:h-[calc(100%-30px)]">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="h-[60px] bg-gray-50 p-3 flex flex-col items-center justify-center">
                      <h3 className="font-medium text-sm text-gray-900 leading-tight mb-1">{project.name}</h3>
                      <p className="text-xs text-gray-600">
                        {project.year} {project.location}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )}
  </div>
  {!isMobile && (
    <>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 hover:bg-white shadow-md rounded-full w-10 h-10"
          onClick={scrollLeft}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 hover:bg-white shadow-md rounded-full w-10 h-10"
          onClick={scrollRight}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </>
  )}
</div>
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ type: "tween", duration: 0.3 }}
                      className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-lg z-50 p-6 flex flex-col"
                      style={{ direction: contentTextDirection, fontFamily: contentFontFamily }}
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}