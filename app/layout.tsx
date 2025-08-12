import type React from "react"
import type { Metadata } from "next"
import { Inter, Kalam } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kalam",
})

export const metadata: Metadata = {
  title: "Happy Birthday - Personalized Celebration",
  description: "A beautiful, personalized birthday greeting experience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${kalam.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
