"use client"

import { useEffect, useRef } from "react"
import type { Region } from "@/lib/data"
import { useRouter } from "next/navigation"

interface MapDisplayProps {
  region: Region
}

export default function MapDisplay({ region }: MapDisplayProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    const initializeMap = () => {
      const { naver } = window as any
      if (!naver?.maps) return

      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(region.coordinates.lat, region.coordinates.lng),
        zoom: 13,
      })

      // Create markers
      region.destinations.forEach((dest) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(dest.coordinates.lat, dest.coordinates.lng),
          map,
          title: dest.title,
        })

        naver.maps.Event.addListener(marker, "click", () => {
          router.push(`/place/${dest.id}`)
        })
      })
    }

    // Wait for Naver Maps script to load
    if (!(window as any).naver?.maps) {
      const script = document.createElement("script")
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverClientId}`
      script.async = true
      script.onload = initializeMap
      document.head.appendChild(script)
    } else {
      initializeMap()
    }
  }, [region, router])

  return (
    <div className="w-full h-full bg-gray-200 rounded-xl overflow-hidden shadow-md relative">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}
