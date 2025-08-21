"use client"
import type { Metadata } from 'next'
import './globals.css'
import { createContext, useContext, useState, ReactNode } from 'react'

// Define the LanguageContext type
interface LanguageContextType {
  lang: 'en' | 'fa';
  setLang: (lang: 'en' | 'fa') => void;
}

// Create LanguageContext
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// LanguageProvider component
function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<'en' | 'fa'>('en')

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to access language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const metadata: Metadata = {
  title: 'Arch App',
  description: 'Created by Nord Team',
  generator: 'Erfuun',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={useLanguage().lang}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}