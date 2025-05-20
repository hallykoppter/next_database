import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import ClientProvider from "@/libs/ClientProvider"
import "primeicons/primeicons.css"
import "primereact/resources/themes/lara-dark-blue/theme.css"
import { getSetting } from "@/libs/SettingsService"

const { setting } = await getSetting()

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "SKL |  " + setting?.nama_sekolah,
  description: "Informasi Keterangan Lulus SMPN 3 Rancah",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Aldrich&family=Baloo+Bhai+2:wght@400..800&family=Titan+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
