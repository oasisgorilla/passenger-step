import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Travel Guide",
  description: "Discover amazing travel destinations around the world",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&callback=initMap`}
          strategy="beforeInteractive" // 가능하면 "beforeInteractive"나 "lazyOnload" 중 선택
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}