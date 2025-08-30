"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { use } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

// Translation object for bilingual static text
const translations = {
  en: {
    projects: "Projects",
    aboutUs: "About Us",
    contact: "Contact",
    showDocument: "Show Document",
    projectOverview: "Project Overview",
    specifications: "Specifications",
    clientInfo: "Client Information",
    page: "Page",
    of: "of",
  },
  fa: {
    projects: "پروژه‌ها",
    aboutUs: "درباره ما",
    contact: "تماس",
    showDocument: "نمایش سند",
    projectOverview: "بررسی پروژه",
    specifications: "مشخصات",
    clientInfo: "اطلاعات مشتری",
    page: "صفحه",
    of: "از",
  },
}

// Re-defining projects data for this page for demonstration purposes.
const projects = [
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
    galleryImages: [
      "/images/armaghan.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/ershad.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/grownida.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/jawaher.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/grownida.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/ershad.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/jawaher.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/armaghan.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/grownida.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/ershad.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: 11,
    name: "Tabriz Convention Center",
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
    galleryImages: [
      "/images/jawaher.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: 13,
    name: "Kerman Solar Complex",
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
    galleryImages: [
      "/images/armaghan.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/grownida.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/ershad.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/jawaher.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/grownida.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
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
    galleryImages: [
      "/images/armaghan.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/grownida.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/ershad.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/jawaher.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/armaghan.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/grownida.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/ershad.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/jawaher.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/armaghan.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/grownida.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/ershad.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/jawaher.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/armaghan.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/grownida.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/ershad.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
    galleryImages: [
      "/images/jawaher.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
]

const menuVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params)
  const projectId = Number.parseInt(resolvedParams.id)
  const project = projects.find((p) => p.id === projectId)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lang, setLang] = useState<"en" | "fa">("en") // Language state
  const [modalPage, setModalPage] = useState(1)
  const totalModalPages = 3 // Adjust based on number of pages

  // Default filters for display, not functional on this page
  const [typeFilter, setTypeFilter] = useState("ALL TYPE")
  const [locationFilter, setLocationFilter] = useState("ALL LOCATIONS")
  const [yearFilter, setYearFilter] = useState("ALL YEARS")

  useEffect(() => {
    if (!project) {
      // Handle case where project is not found
      return
    }
    // Reset image index when project changes
    setCurrentImageIndex(0)
  }, [project])

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Project not found.</div>
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.galleryImages.length)
  }

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.galleryImages.length) % project.galleryImages.length)
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleNextModalPage = () => {
    setModalPage((prev) => Math.min(prev + 1, totalModalPages))
  }

  const handlePrevModalPage = () => {
    setModalPage((prev) => Math.max(prev - 1, 1))
  }

  const getProjectName = (name: string) => {
    if (lang === "fa") {
      return name
        .replace("Residential", "مسکونی")
        .replace("Complex", "مجتمع")
        .replace("Tower", "برج")
        .replace("Center", "مرکز")
        .replace("Plaza", "میدان")
        .replace("Innovation", "نوآوری")
        .replace("Cultural", "فرهنگی")
        .replace("Shopping", "خرید")
        .replace("Medical", "پزشکی")
        .replace("Business District", "منطقه تجاری")
        .replace("Heritage", "میراث")
        .replace("University Campus", "پردیس دانشگاهی")
        .replace("Convention", "کنفرانس")
        .replace("Solar", "خورشیدی")
        .replace("Sports", "ورزشی")
        .replace("Green", "سبز")
        .replace("Eco-Park", "پارک زیست‌محیطی")
        .replace("Port", "بندر")
        .replace("Desert Resort", "اقامتگاه بیابانی")
        .replace("Tech Park", "پارک فناوری")
        .replace("Religious", "مذهبی")
        .replace("Agricultural", "کشاورزی")
        .replace("Coastal", "ساحلی")
        .replace("Industrial Park", "پارک صنعتی")
        .replace("Mining", "معدن")
        .replace("Historical Renovation", "بازسازی تاریخی")
    }
    return name.toUpperCase()
  }

  const renderModalContent = () => {
    switch (modalPage) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{translations[lang].projectOverview}</h3>
            <p className="text-gray-600"><strong>Name:</strong> {getProjectName(project.name)}</p>
            <p className="text-gray-600"><strong>Year:</strong> {project.year}</p>
            <p className="text-gray-600"><strong>Location:</strong> {project.location}</p>
            <p className="text-gray-600">{project.overview}</p>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{translations[lang].specifications}</h3>
            <p className="text-gray-600"><strong>Type:</strong> {project.type}</p>
            <p className="text-gray-600"><strong>Status:</strong> {project.status}</p>
            <p className="text-gray-600"><strong>Timespan:</strong> {project.timespan}</p>
            <p className="text-gray-600"><strong>Size:</strong> {project.size}</p>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{translations[lang].clientInfo}</h3>
            <p className="text-gray-600"><strong>Client:</strong> {project.client}</p>
            <p className="text-gray-600"><strong>Client Location:</strong> {project.clientLocation}</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" lang={lang}>
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
          <div className="hidden sm:block text-sm md:text-base text-gray-600 ml-4">
            {translations[lang].projects} / {getProjectName(project.name)}
          </div>
        </div>

        {/* Filters in Header for Desktop */}
        <div className="hidden lg:ml-[-18%] lg:flex items-center gap-4">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px] rounded-full border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL TYPE">{lang === "fa" ? "همه انواع" : "ALL TYPE"}</SelectItem>
              <SelectItem value="RESIDENTIAL">{lang === "fa" ? "مسکونی" : "RESIDENTIAL"}</SelectItem>
              <SelectItem value="COMMERCIAL">{lang === "fa" ? "تجاری" : "COMMERCIAL"}</SelectItem>
              <SelectItem value="MIXED USE">{lang === "fa" ? "چندمنظوره" : "MIXED USE"}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[160px] rounded-full border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL LOCATIONS">{lang === "fa" ? "همه مکان‌ها" : "ALL LOCATIONS"}</SelectItem>
              <SelectItem value="MASHHAD">{lang === "fa" ? "مشهد" : "MASHHAD"}</SelectItem>
              <SelectItem value="TEHRAN">{lang === "fa" ? "تهران" : "TEHRAN"}</SelectItem>
              <SelectItem value="ISFAHAN">{lang === "fa" ? "اصفهان" : "ISFAHAN"}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[140px] rounded-full border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL YEARS">{lang === "fa" ? "همه سال‌ها" : "ALL YEARS"}</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select> 
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="outline"
            onClick={() => setLang(lang === "en" ? "fa" : "en")}
            className="text-sm"
          >
            {lang === "en" ? "EN/FA" : "FA/EN"}
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
        <div className="w-full max-w-5xl relative mb-4">
          {/* Main Project Image */}
          <div className="relative w calc(100% + 2rem) -mx-4 md:-mx-6 lg:mx-0 aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={project.galleryImages[currentImageIndex] || "/placeholder.svg"}
              alt={`${getProjectName(project.name)} image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Image Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
            onClick={handlePreviousImage}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full"
            onClick={handleNextImage}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Thumbnail Gallery */}
        <div className="w-full max-w-5xl overflow-x-auto pb-2">
          <div className="flex gap-2">
            {project.galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative flex-shrink-0 w-24 h-16 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                  index === currentImageIndex ? "border-gray-900" : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${getProjectName(project.name)} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Show Document Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-6 rounded-full border-gray-300 hover:bg-gray-100">
              {translations[lang].showDocument}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-6 rounded-lg shadow-xl bg-white" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
            <DialogHeader className="flex justify-between items-center mb-4">
              <DialogTitle>{getProjectName(project.name)}</DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="w-5 h-5" />
                </Button>
              </DialogClose>
            </DialogHeader>
            <div className="min-h-[300px] p-4 border border-gray-200 rounded-md bg-gray-50">
              {renderModalContent()}
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button variant="outline" onClick={handlePrevModalPage} disabled={modalPage === 1}>
                <ChevronLeft className="w-4 h-4 mr-2" /> {lang === "fa" ? "قبلی" : "Previous"}
              </Button>
              <span className="text-gray-600">
                {translations[lang].page} {modalPage} {translations[lang].of} {totalModalPages}
              </span>
              <Button variant="outline" onClick={handleNextModalPage} disabled={modalPage === totalModalPages}>
                {lang === "fa" ? "بعدی" : "Next"} <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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