import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
