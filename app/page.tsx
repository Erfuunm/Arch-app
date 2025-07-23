"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link" // Import Link
import { ChevronLeft, ChevronRight, Menu, ArrowLeft, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion" // Import framer-motion

const projects = [
  // Page 1 Projects (1-17) - Now 17 projects on the first page
  {
    id: 1,
    name: "Armaghan Residential Complex",
    year: "2025",
    location: "MASHHAD",
    image: "/images/armaghan.jpg",
    type: "Living, Sustainability",
    status: "Completed",
    timespan: "2020-2025",
    client: "Armaghan Development",
    clientLocation: "Rotterdam, NL",
    size: "7,970 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 2,
    name: "Ershad Twin Towers",
    year: "2025",
    location: "MASHHAD",
    image: "/images/ershad.jpg",
    type: "Residential, Mixed-Use",
    status: "Under Construction",
    timespan: "2023-2025",
    client: "Ershad Holdings",
    clientLocation: "Tehran, IR",
    size: "12,450 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 3,
    name: "Grownida Innovation Center",
    year: "2025",
    location: "MASHHAD",
    image: "/images/grownida.jpg",
    type: "Commercial, Innovation",
    status: "Completed",
    timespan: "2022-2025",
    client: "Grownida Tech",
    clientLocation: "Mashhad, IR",
    size: "8,500 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 4,
    name: "Javaher Plaza Tower",
    year: "2025",
    location: "MASHHAD",
    image: "/images/jawaher.jpg",
    type: "Commercial, Office",
    status: "Planning",
    timespan: "2024-2026",
    client: "Javaher Group",
    clientLocation: "Isfahan, IR",
    size: "15,200 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 5,
    name: "Mashhad Cultural Center",
    year: "2024",
    location: "MASHHAD",
    image: "/images/grownida.jpg",
    type: "Cultural, Public",
    status: "Completed",
    timespan: "2021-2024",
    client: "Mashhad Municipality",
    clientLocation: "Mashhad, IR",
    size: "6,800 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 6,
    name: "Pardis Shopping Complex",
    year: "2024",
    location: "TEHRAN",
    image: "/images/ershad.jpg",
    type: "Commercial, Retail",
    status: "Under Construction",
    timespan: "2023-2024",
    client: "Pardis Development",
    clientLocation: "Tehran, IR",
    size: "18,500 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 7,
    name: "Khorasan Medical Center",
    year: "2023",
    location: "MASHHAD",
    image: "/images/jawaher.jpg",
    type: "Healthcare, Institutional",
    status: "Completed",
    timespan: "2020-2023",
    client: "Khorasan Health Ministry",
    clientLocation: "Mashhad, IR",
    size: "22,300 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 8,
    name: "Tehran Business District",
    year: "2024",
    location: "TEHRAN",
    image: "/images/armaghan.jpg",
    type: "Commercial, Mixed-Use",
    status: "Planning",
    timespan: "2024-2027",
    client: "Tehran Development Corp",
    clientLocation: "Tehran, IR",
    size: "45,200 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 9,
    name: "Isfahan Heritage Hotel",
    year: "2023",
    location: "ISFAHAN",
    image: "/images/grownida.jpg",
    type: "Hospitality, Heritage",
    status: "Completed",
    timespan: "2021-2023",
    client: "Isfahan Tourism Board",
    clientLocation: "Isfahan, IR",
    size: "12,800 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 10,
    name: "Shiraz University Campus",
    year: "2024",
    location: "SHIRAZ",
    image: "/images/ershad.jpg",
    type: "Educational, Institutional",
    status: "Under Construction",
    timespan: "2022-2024",
    client: "Shiraz University",
    clientLocation: "Shiraz, IR",
    size: "28,600 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 11,
    name: "Tabriz Convention Center", // This project will now be col-span-1
    year: "2024",
    location: "TABRIZ",
    image: "/images/jawaher.jpg",
    type: "Convention, Commercial",
    status: "Planning",
    timespan: "2024-2026",
    client: "Tabriz Municipality",
    clientLocation: "Tabriz, IR",
    size: "19,400 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 13,
    name: "Kerman Solar Complex", // This project was at index 11, now shifted
    year: "2023",
    location: "KERMAN",
    image: "/images/armaghan.jpg",
    type: "Industrial, Sustainability",
    status: "Completed",
    timespan: "2021-2023",
    client: "Kerman Energy Corp",
    clientLocation: "Kerman, IR",
    size: "35,600 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 14,
    name: "Qom Religious Center",
    year: "2024",
    location: "QOM",
    image: "/images/grownida.jpg",
    type: "Religious, Cultural",
    status: "Under Construction",
    timespan: "2023-2024",
    client: "Qom Religious Authority",
    clientLocation: "Qom, IR",
    size: "14,200 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 15,
    name: "Ahvaz Sports Complex",
    year: "2023",
    location: "AHVAZ",
    image: "/images/ershad.jpg",
    type: "Sports, Recreation",
    status: "Completed",
    timespan: "2020-2023",
    client: "Ahvaz Sports Federation",
    clientLocation: "Ahvaz, IR",
    size: "42,800 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 16,
    name: "Rasht Green Tower",
    year: "2024",
    location: "RASHT",
    image: "/images/jawaher.jpg",
    type: "Residential, Eco-Friendly",
    status: "Planning",
    timespan: "2024-2027",
    client: "Rasht Development",
    clientLocation: "Rasht, IR",
    size: "16,900 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 17,
    name: "Ardabil Eco-Park",
    year: "2024",
    location: "ARDABIL",
    image: "/images/grownida.jpg",
    type: "Public, Eco-Friendly",
    status: "Completed",
    timespan: "2022-2024",
    client: "Ardabil Municipality",
    clientLocation: "Ardabil, IR",
    size: "11,500 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  // Page 2 Projects (18-33) - Adjusted IDs
  {
    id: 18,
    name: "Bandar Abbas Port Complex",
    year: "2025",
    location: "BANDAR ABBAS",
    image: "/images/armaghan.jpg",
    type: "Industrial, Maritime",
    status: "Planning",
    timespan: "2025-2028",
    client: "Ports Authority",
    clientLocation: "Bandar Abbas, IR",
    size: "58,200 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 19,
    name: "Yazd Desert Resort",
    year: "2024",
    location: "YAZD",
    image: "/images/grownida.jpg",
    type: "Hospitality, Tourism",
    status: "Under Construction",
    timespan: "2023-2024",
    client: "Yazd Tourism Board",
    clientLocation: "Yazd, IR",
    size: "21,500 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 20,
    name: "Hamadan Tech Park",
    year: "2025",
    location: "HAMADAN",
    image: "/images/ershad.jpg",
    type: "Technology, Innovation",
    status: "Planning",
    timespan: "2025-2027",
    client: "Hamadan Tech Authority",
    clientLocation: "Hamadan, IR",
    size: "33,400 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 21,
    name: "Karaj Residential Hub",
    year: "2024",
    location: "KARAJ",
    image: "/images/jawaher.jpg",
    type: "Residential, Urban",
    status: "Under Construction",
    timespan: "2023-2024",
    client: "Karaj Development",
    clientLocation: "Karaj, IR",
    size: "26,800 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 22,
    name: "Urmia Lake Center",
    year: "2023",
    location: "URMIA",
    image: "/images/armaghan.jpg",
    type: "Environmental, Research",
    status: "Completed",
    timespan: "2021-2023",
    client: "Environmental Ministry",
    clientLocation: "Urmia, IR",
    size: "18,900 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 23,
    name: "Zahedan Border Complex",
    year: "2025",
    location: "ZAHEDAN",
    image: "/images/grownida.jpg",
    type: "Government, Security",
    status: "Planning",
    timespan: "2025-2027",
    client: "Border Authority",
    clientLocation: "Zahedan, IR",
    size: "31,200 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 24,
    name: "Gorgan Agricultural Center",
    year: "2024",
    location: "GORGAN",
    image: "/images/ershad.jpg",
    type: "Agricultural, Research",
    status: "Under Construction",
    timespan: "2023-2024",
    client: "Agriculture Ministry",
    clientLocation: "Gorgan, IR",
    size: "24,600 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 25,
    name: "Bushehr Coastal Resort",
    year: "2024",
    location: "BUSHEHR",
    image: "/images/jawaher.jpg",
    type: "Hospitality, Coastal",
    status: "Planning",
    timespan: "2024-2026",
    client: "Bushehr Tourism",
    clientLocation: "Bushehr, IR",
    size: "29,400 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 26,
    name: "Semnan Industrial Park",
    year: "2023",
    location: "SEMNAN",
    image: "/images/armaghan.jpg",
    type: "Industrial, Manufacturing",
    status: "Completed",
    timespan: "2021-2023",
    client: "Semnan Industries",
    clientLocation: "Semnan, IR",
    size: "52,800 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 27,
    name: "Ilam University Complex",
    year: "2025",
    location: "ILAM",
    image: "/images/grownida.jpg",
    type: "Educational, Campus",
    status: "Planning",
    timespan: "2025-2028",
    client: "Ilam University",
    clientLocation: "Ilam, IR",
    size: "38,700 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 28,
    name: "Sanandaj Cultural Plaza",
    year: "2024",
    location: "SANANDAJ",
    image: "/images/ershad.jpg",
    type: "Cultural, Community",
    status: "Under Construction",
    timespan: "2023-2024",
    client: "Sanandaj Municipality",
    clientLocation: "Sanandaj, IR",
    size: "17,300 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 29,
    name: "Birjand Solar Farm",
    year: "2023",
    location: "BIRJAND",
    image: "/images/jawaher.jpg",
    type: "Energy, Renewable",
    status: "Completed",
    timespan: "2022-2023",
    client: "Renewable Energy Corp",
    clientLocation: "Birjand, IR",
    size: "67,500 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 30,
    name: "Kish Island Resort",
    year: "2025",
    location: "KISH",
    image: "/images/armaghan.jpg",
    type: "Hospitality, Island",
    status: "Planning",
    timespan: "2025-2027",
    client: "Kish Development",
    clientLocation: "Kish, IR",
    size: "41,200 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 31,
    name: "Arak Industrial Complex",
    year: "2024",
    location: "ARAK",
    image: "/images/grownida.jpg",
    type: "Industrial, Heavy",
    status: "Under Construction",
    timespan: "2023-2024",
    client: "Arak Industries",
    clientLocation: "Arak, IR",
    size: "73,900 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 32,
    name: "Zanjan Mining Center",
    year: "2023",
    location: "ZANJAN",
    image: "/images/ershad.jpg",
    type: "Mining, Industrial",
    status: "Completed",
    timespan: "2021-2023",
    client: "Zanjan Mining Corp",
    clientLocation: "Zanjan, IR",
    size: "48,600 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
  {
    id: 33,
    name: "Kashan Historical Renovation",
    year: "2025",
    location: "KASHAN",
    image: "/images/jawaher.jpg",
    type: "Heritage, Restoration",
    status: "Planning",
    timespan: "2025-2026",
    client: "Kashan Heritage",
    clientLocation: "Kashan, IR",
    size: "9,800 m²",
    overview:
      "This 40-story glass tower represents the pinnacle of sustainable urban architecture. The building features a revolutionary double-skin facade system that reduces energy consumption by 35% while maximizing natural light penetration. The design incorporates advanced smart building technologies and green roof systems.",
  },
]

// Remove project with id: 12
const projectsWithoutId12 = projects.filter((project) => project.id !== 12)

const PROJECTS_PER_PAGE = 16 // Updated to 17 for the first page

// Animation variants for smooth transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const projectDetailVariants = {
  initial: { opacity: 0, scale: 0.95 }, // Removed x, added scale
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export default function ProjectsPage() {
  const [typeFilter, setTypeFilter] = useState("ALL TYPE")
  const [locationFilter, setLocationFilter] = useState("ALL LOCATIONS")
  const [yearFilter, setYearFilter] = useState("ALL YEARS")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false) // State for menu visibility

  // Calculate total pages based on the new PROJECTS_PER_PAGE for the first page
  // and then 16 for subsequent pages (if applicable, though we only have 33 projects total)
  const totalProjects = projectsWithoutId12.length
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE) // This will be 2 pages (17 + 16)

  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const currentProjects = projectsWithoutId12.slice(startIndex, startIndex + PROJECTS_PER_PAGE)

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId)
  }

  const handleBackToGrid = () => {
    setSelectedProject(null)
  }

  const handlePreviousProject = () => {
    if (selectedProject) {
      const currentIndex = projectsWithoutId12.findIndex((p) => p.id === selectedProject)
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : projectsWithoutId12.length - 1
      setSelectedProject(projectsWithoutId12[previousIndex].id)
    }
  }

  const handleNextProject = () => {
    if (selectedProject) {
      const currentIndex = projectsWithoutId12.findIndex((p) => p.id === selectedProject)
      const nextIndex = currentIndex < projectsWithoutId12.length - 1 ? currentIndex + 1 : 0
      setSelectedProject(projectsWithoutId12[nextIndex].id)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const selectedProjectData = projectsWithoutId12.find((p) => p.id === selectedProject)

  // Create extended projects array for side columns in detail view
  const otherProjects = projectsWithoutId12.filter((p) => p.id !== selectedProject)

  return (
    <AnimatePresence mode="wait">
      {selectedProject && selectedProjectData ? (
        <motion.div
          key="project-detail-view"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.5 }} // Slower transition
          className="min-h-screen bg-white"
        >
          {/* Header */}
          <header className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-xl md:text-2xl font-bold">KH</div>
            </div>

            {/* Filters in Header for Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px] rounded-full border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL TYPE">ALL TYPE</SelectItem>
                  <SelectItem value="RESIDENTIAL">RESIDENTIAL</SelectItem>
                  <SelectItem value="COMMERCIAL">COMMERCIAL</SelectItem>
                  <SelectItem value="MIXED USE">MIXED USE</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[160px] rounded-full border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL LOCATIONS">ALL LOCATIONS</SelectItem>
                  <SelectItem value="MASHHAD">MASHHAD</SelectItem>
                  <SelectItem value="TEHRAN">TEHRAN</SelectItem>
                  <SelectItem value="ISFAHAN">ISFAFAN</SelectItem>
                </SelectContent>
              </Select>

              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[140px] rounded-full border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL YEARS">ALL YEARS</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleBackToGrid}
                className="flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 hover:text-white"
              >
              
                Back 
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 md:w-10 md:h-10"
                onClick={() => setIsMenuOpen(true)}
              >
               
              </Button>
            </div>
          </header>

          {/* Filters (hidden on desktop, visible on mobile/tablet) */}
          {/* Removed the "Back to Grid" button from here */}
          <div className="flex flex-wrap gap-2 p-4 md:p-6 pb-4 lg:hidden">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[140px] rounded-full border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL TYPE">ALL TYPE</SelectItem>
                <SelectItem value="RESIDENTIAL">RESIDENTIAL</SelectItem>
                <SelectItem value="COMMERCIAL">COMMERCIAL</SelectItem>
                <SelectItem value="MIXED USE">MIXED USE</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-[160px] rounded-full border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL LOCATIONS">ALL LOCATIONS</SelectItem>
                <SelectItem value="MASHHAD">MASHHAD</SelectItem>
                <SelectItem value="TEHRAN">TEHRAN</SelectItem>
                <SelectItem value="ISFAHAN">ISFAFAN</SelectItem>
              </SelectContent>
            </Select>

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full sm:w-[140px] rounded-full border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL YEARS">ALL YEARS</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project Detail View */}
          <div className="px-3 md:px-6 mt-[3%]">
            <div className="max-w-7xl mx-auto">
              {/* Main Grid with Featured Project */}
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-8">
                {/* Left Column (hidden on mobile/tablet, visible on desktop) */}
                <div className="hidden lg:block lg:col-span-2 lg:space-y-3 order-2 lg:order-1">
                  {otherProjects.slice(0, 6).map((project, index) => (
                    <div
                      key={`left-${project.id}-${index}`}
                      className="relative overflow-hidden rounded-lg cursor-pointer transition-all hover:scale-[1.02] bg-white shadow-sm border border-gray-100 h-24"
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

                {/* Center Featured Project (takes full width on mobile/tablet) */}
                <motion.div
                  key={selectedProjectData.id} // Key changes to trigger animation
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={projectDetailVariants}
                  transition={{ duration: 0.3 }} // Slower transition for project detail
                  className="col-span-full lg:col-span-3 order-1 lg:order-2"
                >
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200">
                    {/* Main Image */}
                    <div className="relative h-60 md:h-80">
                      <Image
                        src={selectedProjectData.image || "/placeholder.svg"}
                        alt={selectedProjectData.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Project Header */}
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
                            MORE INFO <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column - Key Info */}
                        <div>
                          <h3 className="font-semibold text-sm mb-4 text-gray-900">Key Info</h3>
                          <div className="space-y-3 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium text-gray-900">Type</p>
                                <p className="text-gray-600">{selectedProjectData.type}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Status</p>
                                <p className="text-gray-600">{selectedProjectData.status}</p>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Time span</p>
                              <p className="text-gray-600">{selectedProjectData.timespan}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium text-gray-900">Client</p>
                                <p className="text-gray-600">{selectedProjectData.client}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Location</p>
                                <p className="text-gray-600">{selectedProjectData.clientLocation}</p>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Size</p>
                              <p className="text-gray-600">{selectedProjectData.size}</p>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Project Overview */}
                        <div>
                          <h3 className="font-semibold text-sm mb-4 text-gray-900">Project Overview</h3>
                          <p className="text-sm text-gray-700 leading-relaxed">{selectedProjectData.overview}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-6">
                    <Button
                      variant="outline"
                      onClick={handlePreviousProject}
                      className="flex items-center gap-2 bg-transparent text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      PREVIOUS PROJECT
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleNextProject}
                      className="flex items-center gap-2 bg-transparent text-sm"
                    >
                      NEXT PROJECT
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>

                {/* Right Column (hidden on mobile/tablet, visible on desktop) */}
                <div className="hidden lg:block lg:col-span-2 lg:space-y-3 order-3 lg:order-3">
                  {otherProjects.slice(6, 12).map((project, index) => (
                    <div
                      key={`right-${project.id}-${index}`}
                      className="relative overflow-hidden rounded-lg cursor-pointer transition-all hover:scale-[1.02] bg-white shadow-sm border border-gray-100 h-24"
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

          {/* Bottom spacing */}
          <div className="h-20" />
        </motion.div>
      ) : (
        <motion.div
          key="project-grid-view"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.5 }} // Slower transition
          className="min-h-screen bg-white"
        >
          {/* Header */}
          <header className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-xl md:text-2xl font-bold">KH</div>
            </div>

            {/* Filters in Header for Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px] rounded-full border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL TYPE">ALL TYPE</SelectItem>
                  <SelectItem value="RESIDENTIAL">RESIDENTIAL</SelectItem>
                  <SelectItem value="COMMERCIAL">COMMERCIAL</SelectItem>
                  <SelectItem value="MIXED USE">MIXED USE</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[160px] rounded-full border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL LOCATIONS">ALL LOCATIONS</SelectItem>
                  <SelectItem value="MASHHAD">MASHHAD</SelectItem>
                  <SelectItem value="TEHRAN">TEHRAN</SelectItem>
                  <SelectItem value="ISFAHAN">ISFAHAN</SelectItem>
                </SelectContent>
              </Select>

              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[140px] rounded-full border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL YEARS">ALL YEARS</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </header>

          {/* Filters (visible on mobile/tablet, hidden on desktop) */}
          <div className="flex flex-wrap gap-2 p-4 md:p-6 pb-4 md:pb-8 lg:hidden">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[140px] rounded-full border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL TYPE">ALL TYPE</SelectItem>
                <SelectItem value="RESIDENTIAL">RESIDENTIAL</SelectItem>
                <SelectItem value="COMMERCIAL">COMMERCIAL</SelectItem>
                <SelectItem value="MIXED USE">MIXED USE</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-[160px] rounded-full border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL LOCATIONS">ALL LOCATIONS</SelectItem>
                <SelectItem value="MASHHAD">MASHHAD</SelectItem>
                <SelectItem value="TEHRAN">TEHRAN</SelectItem>
                <SelectItem value="ISFAHAN">ISFAHAN</SelectItem>
              </SelectContent>
            </Select>

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full sm:w-[140px] rounded-full border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL YEARS">ALL YEARS</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects Grid */}
          <div className="relative px-3 md:px-6 mt-8 md:mt-12">
            {/* Page Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Grid Container - Responsive layout */}
            <motion.div
              key={currentPage} // Key changes to trigger animation on page change
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }} // Slower transition for page change
              className="grid grid-cols-1 sm:grid-cols-2 lg:mt-[2%] md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-full px-[6%] mx-auto"
              style={{ height: "auto", minHeight: "calc(100vh - 220px)" }} // Allow height to be auto on smaller screens
            >
              {currentProjects.map((project, index) => {
                let gridClass = "col-span-1 row-span-1" // Default for mobile/tablet

                // Apply complex layout only on 'lg' breakpoint and above

                if (index === 0)
                  gridClass = "col-span-1 row-span-1 lg:col-span-1 lg:row-span-2" // Tall left
                else if (index === 1)
                  gridClass = "col-span-1 row-span-1" // Small (default)
                else if (index === 2)
                  gridClass = "col-span-1 row-span-1 lg:col-span-2 lg:row-span-1" // Wide
                else if (index === 3)
                  gridClass = "col-span-1 row-span-1" // Small (default)
                else if (index === 4)
                  gridClass = "col-span-1 row-span-1 lg:col-span-1 lg:row-span-2" // Tall right (Mashhad Cultural Center)
                else if (index === 5)
                  gridClass = "col-span-1 row-span-1" // Small (default)
                else if (index === 6)
                  gridClass = "col-span-1 row-span-1 lg:col-span-2 lg:row-span-2" // Large center
                else if (index === 7)
                  gridClass = "col-span-1 row-span-1" // Small (default)
                else if (index === 8)
                  gridClass = "col-span-1 row-span-1" // Small (Isfahan Heritage Hotel) (default)
                else if (index === 9)
                  gridClass = "col-span-1 row-span-1" // Small (Shiraz University Campus) (default)
                else if (index === 10)
                  gridClass = "col-span-1 row-span-1" // Small (Tabriz Convention Center) (default)
                else if (index === 11)
                  gridClass = "col-span-1 row-span-1" // Kerman Solar Complex (now col-span-1) (default)
                else if (index === 12)
                  gridClass = "col-span-1 row-span-1" // Qom Religious Center (default)
                else if (index === 13)
                  gridClass = "col-span-1 row-span-1" // Ahvaz Sports Complex (default)
                else if (index === 14)
                  gridClass = "col-span-1 row-span-1" // Rasht Green Tower (default)
                else if (index === 15) gridClass = "col-span-1 row-span-1 lg:col-span-3 lg:row-span-1" // Ardabil Eco-Park (now col-span-2 to fill the gap)

                return (
                  <div
                    key={`grid-${project.id}`}
                    className={`group relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02] bg-white shadow-sm border border-gray-100 ${gridClass}`}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <div className="relative h-[180px] sm:h-[200px] md:h-[220px] lg:h-[calc(100%-60px)]">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="h-[60px] bg-gray-50 p-3 flex flex-col justify-center">
                      <h3 className="font-medium text-sm text-gray-900 leading-tight mb-1">{project.name}</h3>
                      <p className="text-xs text-gray-600">
                        {project.year} {project.location}
                      </p>
                    </div>
                  </div>
                )
              })}
            </motion.div>

            {/* Page Indicator */}
            <div className="flex justify-center items-center mt-6 gap-4">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentPage === i + 1 ? "bg-gray-900" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-20" />

          {/* Navigation Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
