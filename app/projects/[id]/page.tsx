"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
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
    page: "Page",
    of: "of",
  },
  fa: {
    projects: "پروژه‌ها",
    aboutUs: "درباره ما",
    contact: "تماس",
    showDocument: "نمایش سند",
    page: "صفحه",
    of: "از",
  },
}

// Updated projects data with Page 1, Page 2, Page 3 fields
const projects = [
  {
    id: 5,
    name: "ASPIRIN Medical Complex",
    "Page 1": "The ASPIRIN Medical Complex is a state-of-the-art healthcare facility in Mashhad, designed to integrate advanced medical technologies with sustainable architecture. It features a 40-story glass tower with a double-skin facade system.",
    "Page 2": "Type: Living, Sustainability | Status: Completed | Timespan: 2020-2025 | Size: 7,970 m²",
    "Page 3": "Client: Armaghan Development | Client Location: Rotterdam, NL",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/ASPIRIN Medical Complex/1.jpg",
      "/images/ASPIRIN Medical Complex/2.jpg",
      "/images/ASPIRIN Medical Complex/3.jpg",
      "/images/ASPIRIN Medical Complex/4.jpg",
      "/images/ASPIRIN Medical Complex/5.jpg",
      "/images/ASPIRIN Medical Complex/6.jpg",
      "/images/ASPIRIN Medical Complex/7.jpg",
      "/images/ASPIRIN Medical Complex/8.jpg",
      "/images/ASPIRIN Medical Complex/9.jpg",
      "/images/ASPIRIN Medical Complex/10.jpg",
      "/images/ASPIRIN Medical Complex/11.jpg",
      "/images/ASPIRIN Medical Complex/12.jpg",
      "/images/ASPIRIN Medical Complex/13.jpg",
      "/images/ASPIRIN Medical Complex/14.jpg",
      "/images/ASPIRIN Medical Complex/15.jpg",
      "/images/ASPIRIN Medical Complex/16.jpg",
      "/images/ASPIRIN Medical Complex/17.jpg",
    ],
  },
  {
    id: 2,
    name: "Ershad Twin Towers",
    "Page 1": "Ershad Twin Towers is a residential and mixed-use development in Mashhad, featuring modern architectural design with a focus on urban living and sustainability.",
    "Page 2": "Type: Residential, Mixed-Use | Status: Under Construction | Timespan: 2023-2025 | Size: 12,450 m²",
    "Page 3": "Client: Ershad Holdings | Client Location: Tehran, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    id: 20,
    name: "Grownida Innovation Center",
    "Page 1": "The Grownida Innovation Center is a hub for technological advancement in Mashhad, designed to foster innovation with cutting-edge facilities.",
    "Page 2": "Type: Commercial, Innovation | Status: Completed | Timespan: 2022-2025 | Size: 8,500 m²",
    "Page 3": "Client: Grownida Tech | Client Location: Mashhad, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/OFOGH Residential Complex/1.jpg",
      "/images/OFOGH Residential Complex/2.jpg",
      "/images/OFOGH Residential Complex/3.jpg",
      "/images/OFOGH Residential Complex/4.jpg",
      "/images/OFOGH Residential Complex/5.jpg",
      "/images/OFOGH Residential Complex/6.jpg",
      "/images/OFOGH Residential Complex/7.jpg",
      "/images/OFOGH Residential Complex/8.jpg",
      "/images/OFOGH Residential Complex/9.jpg",
      "/images/OFOGH Residential Complex/10.jpg",
      "/images/OFOGH Residential Complex/11.jpg",
      "/images/OFOGH Residential Complex/12.jpg",
      "/images/OFOGH Residential Complex/13.jpg",
      "/images/OFOGH Residential Complex/14.jpg",
      "/images/OFOGH Residential Complex/15.jpg",
      "/images/OFOGH Residential Complex/16.jpg",
    ],
  },
  {
    id: 9,
    name: "ALIS OFFICE Headquarter Building",
    "Page 1": "ALIS OFFICE Headquarter Building is a modern commercial office space in Mashhad, designed to accommodate corporate needs with sustainable design.",
    "Page 2": "Type: Commercial, Office | Status: Planning | Timespan: 2024-2026 | Size: 15,200 m²",
    "Page 3": "Client: Javaher Group | Client Location: Isfahan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/ALIS OFFICE Headquarter Building/2.jpg",
      "/images/ALIS OFFICE Headquarter Building/3.jpg",
      "/images/ALIS OFFICE Headquarter Building/4.jpg",
      "/images/ALIS OFFICE Headquarter Building/5.jpg",
      "/images/ALIS OFFICE Headquarter Building/6.jpg",
      "/images/ALIS OFFICE Headquarter Building/7.jpg",
      "/images/ALIS OFFICE Headquarter Building/8.jpg",
      "/images/ALIS OFFICE Headquarter Building/9.jpg",
    ],
  },
  {
    id: 4,
    name: "Binahayat residential Complex",
    "Page 1": "Binahayat Residential Complex is a cultural and public project in Mashhad, designed to enhance community living with modern amenities.",
    "Page 2": "Type: Cultural, Public | Status: Completed | Timespan: 2021-2024 | Size: 6,800 m²",
    "Page 3": "Client: Mashhad Municipality | Client Location: Mashhad, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/Binahayat residential Complex/2.jpg",
      "/images/Binahayat residential Complex/3.jpg",
      "/images/Binahayat residential Complex/4.jpg",
      "/images/Binahayat residential Complex/5.jpg",
      "/images/Binahayat residential Complex/binahayat (1).jpg",
      "/images/Binahayat residential Complex/binahayat (2).jpg",
      "/images/Binahayat residential Complex/binahayat (3).jpg",
      "/images/Binahayat residential Complex/binahayat (5).jpg",
      "/images/Binahayat residential Complex/binahayat (6).jpg",
      "/images/Binahayat residential Complex/binahayat (9).jpg",
      "/images/Binahayat residential Complex/binahayat (10).jpg",
      "/images/Binahayat residential Complex/binahayat (11).jpg",
      "/images/Binahayat residential Complex/binahayat (12).jpg",
      "/images/Binahayat residential Complex/binahayat (13).jpg",
      "/images/Binahayat residential Complex/binahayat (14).jpg",
      "/images/Binahayat residential Complex/binahayat (15).jpg",
      "/images/Binahayat residential Complex/binahayat (16).jpg",
      "/images/Binahayat residential Complex/binahayat (17).jpg",
      "/images/Binahayat residential Complex/binahayat (18).jpg",
      "/images/Binahayat residential Complex/binahayat (19).jpg",
      "/images/Binahayat residential Complex/binahayat (20).jpg",
      "/images/Binahayat residential Complex/binahayat (21).jpg",
      "/images/Binahayat residential Complex/binahayat (22).jpg",
      "/images/Binahayat residential Complex/binahayat (23).jpg",
      "/images/Binahayat residential Complex/binahayat (24).jpg",
      "/images/Binahayat residential Complex/binahayat (25).jpg",
      "/images/Binahayat residential Complex/binahayat (26).jpg",
      "/images/Binahayat residential Complex/binahayat (27).jpg",
      "/images/Binahayat residential Complex/binahayat (28).jpg",
      "/images/Binahayat residential Complex/binahayat (29).jpg",
      "/images/Binahayat residential Complex/binahayat (30).jpg",
      "/images/Binahayat residential Complex/binahayat (31).jpg",
    ],
  },
  {
    id: 6,
    name: "ASAYESH Residential complex",
    "Page 1": "ASAYESH Residential Complex in Tehran is a commercial and retail development focused on luxury living and shopping experiences.",
    "Page 2": "Type: Commercial, Retail | Status: Under Construction | Timespan: 2023-2024 | Size: 18,500 m²",
    "Page 3": "Client: Pardis Development | Client Location: Tehran, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/ASAYESH Residential complex/1.jpg",
      "/images/ASAYESH Residential complex/2.jpg",
      "/images/ASAYESH Residential complex/3.jpg",
      "/images/ASAYESH Residential complex/4.jpg",
      "/images/ASAYESH Residential complex/5.jpg",
      "/images/ASAYESH Residential complex/6.jpg",
      "/images/ASAYESH Residential complex/7.jpg",
      "/images/ASAYESH Residential complex/8.jpg",
      "/images/ASAYESH Residential complex/9.jpg",
      "/images/ASAYESH Residential complex/10.jpg",
      "/images/ASAYESH Residential complex/11.jpg",
      "/images/ASAYESH Residential complex/12.jpg",
      "/images/ASAYESH Residential complex/13.jpg",
    ],
  },
  {
    id: 7,
    name: "Grownida Innovation Center",
    "Page 1": "The Grownida Innovation Center is a healthcare and institutional project in Mashhad, designed to advance medical research and services.",
    "Page 2": "Type: Healthcare, Institutional | Status: Completed | Timespan: 2020-2023 | Size: 22,300 m²",
    "Page 3": "Client: Khorasan Health Ministry | Client Location: Mashhad, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/Grownida Innovation Center/1.jpg",
      "/images/Grownida Innovation Center/2.jpg",
      "/images/Grownida Innovation Center/3.jpg",
      "/images/Grownida Innovation Center/4.jpg",
      "/images/Grownida Innovation Center/5.jpg",
      "/images/Grownida Innovation Center/6.jpg",
      "/images/Grownida Innovation Center/7.jpg",
      "/images/Grownida Innovation Center/8.jpg",
    ],
  },
  {
    id: 8,
    name: "Tehran Business District",
    "Page 1": "Tehran Business District is a mixed-use commercial project aimed at creating a vibrant business hub in Tehran.",
    "Page 2": "Type: Commercial, Mixed-Use | Status: Planning | Timespan: 2024-2027 | Size: 45,200 m²",
    "Page 3": "Client: Tehran Development Corp | Client Location: Tehran, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    id: 47,
    name: "Shaghayegh Office Building",
    "Page 1": "Shaghayegh Office Building in Isfahan combines hospitality and heritage, preserving cultural elements while offering modern office spaces.",
    "Page 2": "Type: Hospitality, Heritage | Status: Completed | Timespan: 2021-2023 | Size: 12,800 m²",
    "Page 3": "Client: Isfahan Tourism Board | Client Location: Isfahan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/SHAMS 1 Residential Complex/1.jpg",
      "/images/SHAMS 1 Residential Complex/2.jpg",
      "/images/SHAMS 1 Residential Complex/3.jpg",
      "/images/SHAMS 1 Residential Complex/4.jpg",
      "/images/SHAMS 1 Residential Complex/5.jpg",
      "/images/SHAMS 1 Residential Complex/6.jpg",
      "/images/SHAMS 1 Residential Complex/7.jpg",
      "/images/SHAMS 1 Residential Complex/8.jpg",
      "/images/SHAMS 1 Residential Complex/9.jpg",
      "/images/SHAMS 1 Residential Complex/10.jpg",
    ],
  },
  {
    id: 22,
    name: "Aseman",
    "Page 1": "Aseman is an educational and institutional project in Shiraz, designed to support academic excellence and community engagement.",
    "Page 2": "Type: Educational, Institutional | Status: Under Construction | Timespan: 2022-2024 | Size: 28,600 m²",
    "Page 3": "Client: Shiraz University | Client Location: Shiraz, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/Aseman/1.jpg",
      "/images/Aseman/2.jpg",
      "/images/Aseman/3.jpg",
      "/images/Aseman/4.jpg",
      "/images/Aseman/5.jpg",
    ],
  },
  {
    id: 11,
    name: "Tabriz Convention Center",
    "Page 1": "Tabriz Convention Center is a commercial project designed to host large-scale events and conferences in Tabriz.",
    "Page 2": "Type: Convention, Commercial | Status: Planning | Timespan: 2024-2026 | Size: 19,400 m²",
    "Page 3": "Client: Tabriz Municipality | Client Location: Tabriz, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    "Page 1": "Kerman Solar Complex is a sustainability-focused industrial project aimed at harnessing solar energy in Kerman.",
    "Page 2": "Type: Industrial, Sustainability | Status: Completed | Timespan: 2021-2023 | Size: 35,600 m²",
    "Page 3": "Client: Kerman Energy Corp | Client Location: Kerman, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    "Page 1": "Qom Religious Center is a cultural and religious project designed to serve the spiritual needs of the community in Qom.",
    "Page 2": "Type: Religious, Cultural | Status: Under Construction | Timespan: 2023-2024 | Size: 14,200 m²",
    "Page 3": "Client: Qom Religious Authority | Client Location: Qom, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    id: 23,
    name: "PARDIS Villa complex",
    "Page 1": "PARDIS Villa Complex in Ahvaz is a sports and recreation project designed to promote active lifestyles and community engagement.",
    "Page 2": "Type: Sports, Recreation | Status: Completed | Timespan: 2020-2023 | Size: 42,800 m²",
    "Page 3": "Client: Ahvaz Sports Federation | Client Location: Ahvaz, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/PARDIS Villa complex/1.jpg",
      "/images/PARDIS Villa complex/2.jpg",
      "/images/PARDIS Villa complex/3.jpg",
      "/images/PARDIS Villa complex/4.jpg",
      "/images/PARDIS Villa complex/5.jpg",
      "/images/PARDIS Villa complex/6.jpg",
      "/images/PARDIS Villa complex/7.jpg",
      "/images/PARDIS Villa complex/8.jpg",
      "/images/PARDIS Villa complex/9.jpg",
    ],
  },
  {
    id: 16,
    name: "Rasht Green Tower",
    "Page 1": "Rasht Green Tower is an eco-friendly residential project in Rasht, designed with sustainable materials and energy-efficient systems.",
    "Page 2": "Type: Residential, Eco-Friendly | Status: Planning | Timespan: 2024-2027 | Size: 16,900 m²",
    "Page 3": "Client: Rasht Development | Client Location: Rasht, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    name: "ZEYTON no.1 Residential Complex",
    "Page 1": "ZEYTON no.1 Residential Complex in Ardabil is a public eco-friendly project aimed at sustainable urban living.",
    "Page 2": "Type: Public, Eco-Friendly | Status: Completed | Timespan: 2022-2024 | Size: 11,500 m²",
    "Page 3": "Client: Ardabil Municipality | Client Location: Ardabil, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/ZEYTON no.1 Residential Complex/1.jpg",
      "/images/ZEYTON no.1 Residential Complex/2.jpg",
      "/images/ZEYTON no.1 Residential Complex/3.jpg",
      "/images/ZEYTON no.1 Residential Complex/4.jpg",
      "/images/ZEYTON no.1 Residential Complex/5.jpg",
      "/images/ZEYTON no.1 Residential Complex/6.jpg",
      "/images/ZEYTON no.1 Residential Complex/7.jpg",
      "/images/ZEYTON no.1 Residential Complex/8.jpg",
      "/images/ZEYTON no.1 Residential Complex/9.jpg",
      "/images/ZEYTON no.1 Residential Complex/10.jpg",
      "/images/ZEYTON no.1 Residential Complex/11.jpg",
      "/images/ZEYTON no.1 Residential Complex/12.jpg",
      "/images/ZEYTON no.1 Residential Complex/13.jpg",
      "/images/ZEYTON no.1 Residential Complex/14.jpg",
      "/images/ZEYTON no.1 Residential Complex/15.jpg",
      "/images/ZEYTON no.1 Residential Complex/16.jpg",
    ],
  },
  {
    id: 18,
    name: "Houshyar Residential Complex",
    "Page 1": "Houshyar Residential Complex in Bandar Abbas is an industrial and maritime project designed to support coastal development.",
    "Page 2": "Type: Industrial, Maritime | Status: Planning | Timespan: 2025-2028 | Size: 58,200 m²",
    "Page 3": "Client: Ports Authority | Client Location: Bandar Abbas, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/Houshyar Residential/1.jpg",
      "/images/Houshyar Residential/2.jpg",
      "/images/Houshyar Residential/3.jpg",
      "/images/Houshyar Residential/4.jpg",
      "/images/Houshyar Residential/5.jpg",
      "/images/Houshyar Residential/6.jpg",
      "/images/Houshyar Residential/7.jpg",
      "/images/Houshyar Residential/8.jpg",
      "/images/Houshyar Residential/9.jpg",
      "/images/Houshyar Residential/10.jpg",
      "/images/Houshyar Residential/11.jpg",
      "/images/Houshyar Residential/12.jpg",
      "/images/Houshyar Residential/13.jpg",
      "/images/Houshyar Residential/14.jpg",
      "/images/Houshyar Residential/15.jpg",
      "/images/Houshyar Residential/16.jpg",
      "/images/Houshyar Residential/17.jpg",
      "/images/Houshyar Residential/18.jpg",
      "/images/Houshyar Residential/19.jpg",
      "/images/Houshyar Residential/20.jpg",
      "/images/Houshyar Residential/21.jpg",
      "/images/Houshyar Residential/22.jpg",
      "/images/Houshyar Residential/23.jpg",
    ],
  },
  {
    id: 19,
    name: "Yazd Desert Resort",
    "Page 1": "Yazd Desert Resort is a hospitality and tourism project designed to offer a unique desert experience in Yazd.",
    "Page 2": "Type: Hospitality, Tourism | Status: Under Construction | Timespan: 2023-2024 | Size: 21,500 m²",
    "Page 3": "Client: Yazd Tourism Board | Client Location: Yazd, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    id: 3,
    name: "ZEYTON no.2 Residential Complex",
    "Page 1": "ZEYTON no.2 Residential Complex in Hamadan is a technology and innovation project aimed at fostering cutting-edge urban solutions.",
    "Page 2": "Type: Technology, Innovation | Status: Planning | Timespan: 2025-2027 | Size: 33,400 m²",
    "Page 3": "Client: Hamadan Tech Authority | Client Location: Hamadan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/ZEYTON no.2 Residential Complex/1.jpg",
      "/images/ZEYTON no.2 Residential Complex/4.jpg",
      "/images/ZEYTON no.2 Residential Complex/5.jpg",
      "/images/ZEYTON no.2 Residential Complex/2.jpg",
      "/images/ZEYTON no.2 Residential Complex/3.jpg",
      "/images/ZEYTON no.2 Residential Complex/6.jpg",
    ],
  },
  {
    id: 21,
    name: "DANESH Residential Complex",
    "Page 1": "DANESH Residential Complex in Karaj is an urban residential project designed to enhance modern living standards.",
    "Page 2": "Type: Residential, Urban | Status: Under Construction | Timespan: 2023-2024 | Size: 26,800 m²",
    "Page 3": "Client: Karaj Development | Client Location: Karaj, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/DANESH Residential Complex/1.jpg",
      "/images/DANESH Residential Complex/2.jpg",
      "/images/DANESH Residential Complex/3.jpg",
      "/images/DANESH Residential Complex/4.jpg",
      "/images/DANESH Residential Complex/5.jpg",
      "/images/DANESH Residential Complex/6.jpg",
      "/images/DANESH Residential Complex/7.jpg",
      "/images/DANESH Residential Complex/8.jpg",
      "/images/DANESH Residential Complex/9.jpg",
      "/images/DANESH Residential Complex/10.jpg",
      "/images/DANESH Residential Complex/11.jpg",
      "/images/DANESH Residential Complex/12.jpg",
      "/images/DANESH Residential Complex/13.jpg",
    ],
  },
  {
    id: 40,
    name: "NILOUFAR Cancer Caring Center",
    "Page 1": "NILOUFAR Cancer Caring Center in Urmia is an environmental and research facility dedicated to advancing cancer care.",
    "Page 2": "Type: Environmental, Research | Status: Completed | Timespan: 2021-2023 | Size: 18,900 m²",
    "Page 3": "Client: Environmental Ministry | Client Location: Urmia, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/NILOUFAR Cancer Caring Center/1.jpg",
      "/images/NILOUFAR Cancer Caring Center/2.jpg",
      "/images/NILOUFAR Cancer Caring Center/3.jpg",
      "/images/NILOUFAR Cancer Caring Center/4.jpg",
      "/images/NILOUFAR Cancer Caring Center/5.jpg",
      "/images/NILOUFAR Cancer Caring Center/6.jpg",
      "/images/NILOUFAR Cancer Caring Center/7.jpg",
      "/images/NILOUFAR Cancer Caring Center/8.jpg",
      "/images/NILOUFAR Cancer Caring Center/9.jpg",
      "/images/NILOUFAR Cancer Caring Center/10.jpg",
      "/images/NILOUFAR Cancer Caring Center/11.jpg",
    ],
  },
  {
    id: 15,
    name: "EHSAN Hottel",
    "Page 1": "Zahedan Border Complex is a government and security project designed to enhance border infrastructure in Zahedan.",
    "Page 2": "Type: Government, Security | Status: Planning | Timespan: 2025-2027 | Size: 31,200 m²",
    "Page 3": "Client: Border Authority | Client Location: Zahedan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/EHSAN Hottel/1.jpg",
      "/images/EHSAN Hottel/2.jpg",
      "/images/EHSAN Hottel/3.jpg",
      "/images/EHSAN Hottel/4.jpg",
      "/images/EHSAN Hottel/5.jpg",
      "/images/EHSAN Hottel/6.jpg",
      "/images/EHSAN Hottel/7.jpg",
      "/images/EHSAN Hottel/8.jpg",
      "/images/EHSAN Hottel/9.jpg",
      "/images/EHSAN Hottel/10.jpg",
      "/images/EHSAN Hottel/11.jpg",
      "/images/EHSAN Hottel/12.jpg",
      "/images/EHSAN Hottel/13.jpg",
      "/images/EHSAN Hottel/14.jpg",
      "/images/EHSAN Hottel/15.jpg",
      "/images/EHSAN Hottel/16.jpg",
      "/images/EHSAN Hottel/17.jpg",
      "/images/EHSAN Hottel/18.jpg",
      "/images/EHSAN Hottel/19.jpg",
      "/images/EHSAN Hottel/20.jpg",
    ],
  },
  {
    id: 36,
    name: "Fajr 4 Commercial Complex",
    "Page 1": "Fajr 4 Commercial Complex in Gorgan is an agricultural research facility aimed at advancing sustainable farming practices.",
    "Page 2": "Type: Agricultural, Research | Status: Under Construction | Timespan: 2023-2024 | Size: 24,600 m²",
    "Page 3": "Client: Agriculture Ministry | Client Location: Gorgan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/Fajr 4 Commercial Complex/1.jpg",
      "/images/Fajr 4 Commercial Complex/2.jpg",
      "/images/Fajr 4 Commercial Complex/3.jpg",
      "/images/Fajr 4 Commercial Complex/4.jpg",
      "/images/Fajr 4 Commercial Complex/5.jpg",
      "/images/Fajr 4 Commercial Complex/6.jpg",
    ],
  },
  {
    id: 25,
    name: "Bushehr Coastal Resort",
    "Page 1": "Bushehr Coastal Resort is a hospitality project designed to offer a luxurious coastal experience in Bushehr.",
    "Page 2": "Type: Hospitality, Coastal | Status: Planning | Timespan: 2024-2026 | Size: 29,400 m²",
    "Page 3": "Client: Bushehr Tourism | Client Location: Bushehr, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    id: 49,
    name: "Rezvan Pilgrims’ Residence",
    "Page 1": "Rezvan Pilgrims’ Residence in Semnan is an industrial manufacturing project designed to support local industries.",
    "Page 2": "Type: Industrial, Manufacturing | Status: Completed | Timespan: 2021-2023 | Size: 52,800 m²",
    "Page 3": "Client: Semnan Industries | Client Location: Semnan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/Rezvan Pilgrims’ Residence/1.jpg",
      "/images/Rezvan Pilgrims’ Residence/2.jpg",
      "/images/Rezvan Pilgrims’ Residence/3.jpg",
    ],
  },
  {
    id: 42,
    name: "JAVAHER PLAZA Residential & Commerical Complex2",
    "Page 1": "JAVAHER PLAZA in Ilam is an educational campus project aimed at expanding academic facilities.",
    "Page 2": "Type: Educational, Campus | Status: Planning | Timespan: 2025-2028 | Size: 38,700 m²",
    "Page 3": "Client: Ilam University | Client Location: Ilam, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/1.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/2.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/3.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/4.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/5.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/6.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/7.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/8.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/9.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/10.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/11.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/12.jpg",
      "/images/JAVAHER PLAZA Residential & Commerical Complex2/13.jpg",
    ],
  },
  {
    id: 28,
    name: "Sanandaj Cultural Plaza",
    "Page 1": "Sanandaj Cultural Plaza is a community-focused cultural project in Sanandaj, designed to promote local arts and culture.",
    "Page 2": "Type: Cultural, Community | Status: Under Construction | Timespan: 2023-2024 | Size: 17,300 m²",
    "Page 3": "Client: Sanandaj Municipality | Client Location: Sanandaj, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    "Page 1": "Birjand Solar Farm is a renewable energy project aimed at harnessing solar power in Birjand.",
    "Page 2": "Type: Energy, Renewable | Status: Completed | Timespan: 2022-2023 | Size: 67,500 m²",
    "Page 3": "Client: Renewable Energy Corp | Client Location: Birjand, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    "Page 1": "Kish Island Resort is a hospitality project designed to offer a luxurious island getaway in Kish.",
    "Page 2": "Type: Hospitality, Island | Status: Planning | Timespan: 2025-2027 | Size: 41,200 m²",
    "Page 3": "Client: Kish Development | Client Location: Kish, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    name: "SHAMS II Residential Complex",
    "Page 1": "SHAMS II Residential Complex in Arak is an industrial project designed to support heavy industry development.",
    "Page 2": "Type: Industrial, Heavy | Status: Under Construction | Timespan: 2023-2024 | Size: 73,900 m²",
    "Page 3": "Client: Arak Industries | Client Location: Arak, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/SHAMS II Residential Complex/1.jpg",
      "/images/SHAMS II Residential Complex/2.jpg",
      "/images/SHAMS II Residential Complex/3.jpg",
      "/images/SHAMS II Residential Complex/4.jpg",
      "/images/SHAMS II Residential Complex/5.jpg",
      "/images/SHAMS II Residential Complex/6.jpg",
      "/images/SHAMS II Residential Complex/7.jpg",
      "/images/SHAMS II Residential Complex/8.jpg",
      "/images/SHAMS II Residential Complex/9.jpg",
      "/images/SHAMS II Residential Complex/10.jpg",
      "/images/SHAMS II Residential Complex/11.jpg",
      "/images/SHAMS II Residential Complex/12.jpg",
      "/images/SHAMS II Residential Complex/13.jpg",

    ],
  },
  {
    id: 32,
    name: "Zanjan Mining Center",
    "Page 1": "Zanjan Mining Center is an industrial project focused on mining operations in Zanjan.",
    "Page 2": "Type: Mining, Industrial | Status: Completed | Timespan: 2021-2023 | Size: 48,600 m²",
    "Page 3": "Client: Zanjan Mining Corp | Client Location: Zanjan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
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
    "Page 1": "Kashan Historical Renovation is a heritage project aimed at preserving and restoring historical structures in Kashan.",
    "Page 2": "Type: Heritage, Restoration | Status: Planning | Timespan: 2025-2026 | Size: 9,800 m²",
    "Page 3": "Client: Kashan Heritage | Client Location: Kashan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/PARDISAN 2 Commercial Building/1.jpg",
      "/images/PARDISAN 2 Commercial Building/2.jpg",
      "/images/PARDISAN 2 Commercial Building/3.jpg",
      "/images/PARDISAN 2 Commercial Building/4.jpg",
      "/images/PARDISAN 2 Commercial Building/5.jpg",
      "/images/PARDISAN 2 Commercial Building/6.jpg",
      "/images/PARDISAN 2 Commercial Building/7.jpg",
      "/images/PARDISAN 2 Commercial Building/8.jpg",
      "/images/PARDISAN 2 Commercial Building/9.jpg",
      "/images/PARDISAN 2 Commercial Building/10.jpg",
      "/images/PARDISAN 2 Commercial Building/11.jpg",
    ],
  },
  {
    id: 34,
    name: "SHAMS 1 Residential Complex",
    "Page 1": "SHAMS 1 Residential Complex in Kashan is a heritage restoration project focused on sustainable residential development.",
    "Page 2": "Type: Heritage, Restoration | Status: Planning | Timespan: 2025-2026 | Size: 9,800 m²",
    "Page 3": "Client: Kashan Heritage | Client Location: Kashan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/Shaghayegh Office Building/1.jpg",
      "/images/Shaghayegh Office Building/2.jpg",
      "/images/Shaghayegh Office Building/3.jpg",
      "/images/Shaghayegh Office Building/4.jpg",
      "/images/Shaghayegh Office Building/5.jpg",
      "/images/Shaghayegh Office Building/6.jpg",
      "/images/Shaghayegh Office Building/7.jpg",
      "/images/Shaghayegh Office Building/8.jpg",
      "/images/Shaghayegh Office Building/9.jpg",
      "/images/Shaghayegh Office Building/10.jpg",
      "/images/Shaghayegh Office Building/11.jpg",
      "/images/Shaghayegh Office Building/12.jpg",
      "/images/Shaghayegh Office Building/13.jpg",
    ],
  },
  {
    id: 39,
    name: "CHESHMANDAZ Residential Complex",
    "Page 1": "CHESHMANDAZ Residential Complex in Mashhad is a modern residential project designed for urban living with a focus on aesthetics and functionality.",
    "Page 2": "Type: Residential | Status: Design Stage | Timespan: 2021-2024 | Size: 1,430 m² | Built-up Area: 10,850 m²",
    "Page 3": "Client: Pariz Andish Zharf | Client Location: Hashemieh St, Mashhad | Team: Mohammad Akbari, Samaneh Iman, Mojtaba Pashaei",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/CHESHMANDAZ Residential Complex/1.jpg",
      "/images/CHESHMANDAZ Residential Complex/2.jpg",
      "/images/CHESHMANDAZ Residential Complex/4.jpg",
      "/images/CHESHMANDAZ Residential Complex/5.jpg",
      "/images/CHESHMANDAZ Residential Complex/6.jpg",
      "/images/CHESHMANDAZ Residential Complex/7.jpg",
      "/images/CHESHMANDAZ Residential Complex/8.jpg",
      "/images/CHESHMANDAZ Residential Complex/9.jpg",
      "/images/CHESHMANDAZ Residential Complex/10.jpg",
      "/images/CHESHMANDAZ Residential Complex/11.jpg",
      "/images/CHESHMANDAZ Residential Complex/12.jpg",
      "/images/CHESHMANDAZ Residential Complex/13.jpg",
      "/images/CHESHMANDAZ Residential Complex/14.jpg",
      "/images/CHESHMANDAZ Residential Complex/15.jpg",
      "/images/CHESHMANDAZ Residential Complex/16.jpg",
    ],
  },
  {
    id: 27,
    name: "CINAMA GHODS",
    "Page 1": "CINAMA GHODS in Kashan is a heritage restoration project aimed at preserving cultural landmarks through modern design.",
    "Page 2": "Type: Heritage, Restoration | Status: Planning | Timespan: 2025-2026 | Size: 9,800 m²",
    "Page 3": "Client: Kashan Heritage | Client Location: Kashan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/CINAMA GHODS/1.jpg",
      "/images/CINAMA GHODS/2.jpg",
      "/images/CINAMA GHODS/3.jpg",
      "/images/CINAMA GHODS/4.jpg",
      "/images/CINAMA GHODS/5.jpg",
      "/images/CINAMA GHODS/6.jpg",
      "/images/CINAMA GHODS/7.jpg",
      "/images/CINAMA GHODS/8.jpg",
      "/images/CINAMA GHODS/9.jpg",
      "/images/CINAMA GHODS/10.jpg",
    ],
  },
  {
    id: 43,
    name: "Residential No.101 (Mehrabi)",
    "Page 1": "Residential No.101 (Mehrabi) in Kashan is a heritage restoration project focused on sustainable residential development.",
    "Page 2": "Type: Heritage, Restoration | Status: Planning | Timespan: 2025-2026 | Size: 9,800 m²",
    "Page 3": "Client: Kashan Heritage | Client Location: Kashan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/Residential No.101 (Mehrabi)/1.jpg",
      "/images/Residential No.101 (Mehrabi)/2.jpg",
      "/images/Residential No.101 (Mehrabi)/3.jpg",
      "/images/Residential No.101 (Mehrabi)/4.jpg",
      "/images/Residential No.101 (Mehrabi)/5.jpg",
      "/images/Residential No.101 (Mehrabi)/6.jpg",
      "/images/Residential No.101 (Mehrabi)/7.jpg",
      "/images/Residential No.101 (Mehrabi)/8.jpg",
    ],
  },
  {
    id: 26,
    name: "Abuzar Residential",
    "Page 1": "Abuzar Residential in Kashan is a heritage restoration project designed to preserve historical architecture while enhancing modern living.",
    "Page 2": "Type: Heritage, Restoration | Status: Planning | Timespan: 2025-2026 | Size: 9,800 m²",
    "Page 3": "Client: Kashan Heritage | Client Location: Kashan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/Abuzar Residential/1.jpg",
      "/images/Abuzar Residential/2.jpg",
      "/images/Abuzar Residential/3.jpg",
      "/images/Abuzar Residential/4.jpg",
      "/images/Abuzar Residential/5.jpg",
      "/images/Abuzar Residential/6.jpg",
      "/images/Abuzar Residential/7.jpg",
      "/images/Abuzar Residential/8.jpg",
      "/images/Abuzar Residential/9.jpg",
      "/images/Abuzar Residential/10.jpg",
      "/images/Abuzar Residential/11.jpg",
      "/images/Abuzar Residential/12.jpg",
      "/images/Abuzar Residential/13.jpg",
      "/images/Abuzar Residential/14.jpg",
      "/images/Abuzar Residential/15.jpg",
      "/images/Abuzar Residential/16.jpg",
      "/images/Abuzar Residential/17.jpg",
      "/images/Abuzar Residential/18.jpg",
      "/images/Abuzar Residential/19.jpg",
      "/images/Abuzar Residential/20.jpg",
      "/images/Abuzar Residential/21.jpg",
      "/images/Abuzar Residential/22.jpg",
      "/images/Abuzar Residential/23.jpg",
      "/images/Abuzar Residential/24.jpg",
      "/images/Abuzar Residential/25.jpg",
      "/images/Abuzar Residential/26.jpg",
    ],
  },
  {
    id: 38,
    name: "Faregh-al-tahsilan residential",
    "Page 1": "Faregh-al-tahsilan Residential in Kashan is a heritage restoration project aimed at sustainable urban development.",
    "Page 2": "Type: Heritage, Restoration | Status: Planning | Timespan: 2025-2026 | Size: 9,800 m²",
    "Page 3": "Client: Kashan Heritage | Client Location: Kashan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/Faregh-al-tahsilan residential/1.jpg",
      "/images/Faregh-al-tahsilan residential/2.jpg",
      "/images/Faregh-al-tahsilan residential/3.jpg",
    ],
  },
  {
    id: 10,
    name: "Bajk Mixed-use Complex",
    "Page 1": "Bajk Mixed-use Complex in Kashan is a heritage restoration project combining residential and commercial spaces.",
    "Page 2": "Type: Heritage, Restoration | Status: Planning | Timespan: 2025-2026 | Size: 9,800 m²",
    "Page 3": "Client: Kashan Heritage | Client Location: Kashan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/JAVAHER2/1.jpg",
      "/images/JAVAHER2/2.jpg",
      "/images/JAVAHER2/3.jpg",
      "/images/JAVAHER2/4.jpg",
      "/images/JAVAHER2/5.jpg",
      "/images/JAVAHER2/6.jpg",
      "/images/JAVAHER2/7.jpg",
      "/images/JAVAHER2/8.jpg",
      "/images/JAVAHER2/9.jpg",
    ],
  },
  {
    id: 37,
    name: "Ebne Sina (Hasht Behesht) Medical & Office Complex",
    "Page 1": "Ebne Sina Medical & Office Complex in Kashan is a heritage restoration project integrating medical and office facilities.",
    "Page 2": "Type: Heritage, Restoration | Status: Planning | Timespan: 2025-2026 | Size: 9,800 m²",
    "Page 3": "Client: Kashan Heritage | Client Location: Kashan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/1.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/2.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/3.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/4.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/6.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/7.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/8.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/9.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/10.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/11.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/12.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/13.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/15.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/16.jpg",
      "/images/Ebne Sina (Hasht Behesht) Medical & Office Complex/17.jpg",
    ],
  },
  {
    id: 1,
    name: "ARMAGHAN Residential Complex",
    "Page 1": "ARMAGHAN Residential Complex in Kashan is a heritage restoration project focused on sustainable residential development.",
    "Page 2": "Type: Heritage, Restoration | Status: Planning | Timespan: 2025-2026 | Size: 9,800 m²",
    "Page 3": "Client: Kashan Heritage | Client Location: Kashan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/ARMAGHAN Residential Complex/1.jpg",
      "/images/ARMAGHAN Residential Complex/2.jpg",
      "/images/ARMAGHAN Residential Complex/3.jpg",
      "/images/ARMAGHAN Residential Complex/4.jpg",
      "/images/ARMAGHAN Residential Complex/5.jpg",
      "/images/ARMAGHAN Residential Complex/6.jpg",
      "/images/ARMAGHAN Residential Complex/7.jpg",
      "/images/ARMAGHAN Residential Complex/8.jpg",
      "/images/ARMAGHAN Residential Complex/9.jpg",
    ],
  },
  {
    id: 24,
    name: "OFOGH Residential Complex Lndscape",
    "Page 1": "OFOGH Residential Complex Landscape in Kashan is a heritage restoration project with a focus on sustainable landscaping.",
    "Page 2": "Type: Heritage, Restoration | Status: Planning | Timespan: 2025-2026 | Size: 9,800 m²",
    "Page 3": "Client: Kashan Heritage | Client Location: Kashan, IR",
    overview: "Situated on Hashemieh St, Mashhad, this residential project by Pariz Andish Zharf covers 1,430 m² of land with 10,850 m² built-up area. Design stage initiated in 2015.",
    galleryImages: [
      "/images/OFOGH Residential Complex Lndscape/1.jpg",
      "/images/OFOGH Residential Complex Lndscape/2.jpg",
      "/images/OFOGH Residential Complex Lndscape/3.jpg",
      "/images/OFOGH Residential Complex Lndscape/4.jpg",
      "/images/OFOGH Residential Complex Lndscape/5.jpg",
      "/images/OFOGH Residential Complex Lndscape/6.jpg",
      "/images/OFOGH Residential Complex Lndscape/7.jpg",
      "/images/OFOGH Residential Complex Lndscape/8.jpg",
      "/images/OFOGH Residential Complex Lndscape/10.jpg",
      "/images/OFOGH Residential Complex Lndscape/11.jpg",
      "/images/OFOGH Residential Complex Lndscape/12.jpg",
      "/images/OFOGH Residential Complex Lndscape/13.jpg",
      "/images/OFOGH Residential Complex Lndscape/14.jpg",
      "/images/OFOGH Residential Complex Lndscape/15.jpg",
      "/images/OFOGH Residential Complex Lndscape/16.jpg",
      "/images/OFOGH Residential Complex Lndscape/17.jpg",
      "/images/OFOGH Residential Complex Lndscape/18.jpg",
      "/images/OFOGH Residential Complex Lndscape/19.jpg",
      "/images/OFOGH Residential Complex Lndscape/20.jpg",
      "/images/OFOGH Residential Complex Lndscape/21.jpg",
    ],
  },
]

const menuVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const projectId = Number.parseInt(resolvedParams.id)
  const project = projects.find((p) => p.id === projectId)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lang, setLang] = useState<"en" | "fa">("en")
  const [modalPage, setModalPage] = useState(1)
  const totalModalPages = 3
  const router = useRouter();

  const [typeFilter, setTypeFilter] = useState("ALL TYPE")
  const [locationFilter, setLocationFilter] = useState("ALL LOCATIONS")
  const [yearFilter, setYearFilter] = useState("ALL YEARS")

  useEffect(() => {
    if (!project) {
      return
    }
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
            <h3 className="text-xl font-bold">Page 1</h3>
            <p className="text-gray-600">{project["Page 1"]}</p>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Page 2</h3>
            <p className="text-gray-600">{project["Page 2"]}</p>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Page 3</h3>
            <p className="text-gray-600">{project["Page 3"]}</p>
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
        <div className="hidden lg:ml-[-18%] items-center gap-4">
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
            onClick={() => router.push('/')}
            className="text-sm"
          >
            {lang === "en" ? "Back" : "بازگشت"}
          </Button>
          <Button
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
              className="object-contain"
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