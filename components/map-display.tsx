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
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    const initializeMap = () => {
      const { google } = window as any
      if (!google?.maps) return

      const map = new google.maps.Map(mapRef.current, {
        center: {
          lat: region.coordinates.lat,
          lng: region.coordinates.lng,
        },
        zoom: 13,
      })

      region.destinations.forEach((dest) => {
        const marker = new google.maps.Marker({
          position: {
            lat: dest.coordinates.lat,
            lng: dest.coordinates.lng,
          },
          map,
          title: dest.title,
        })

        marker.addListener("click", () => {
          router.push(`/place/${dest.id}`)
        })
      })
    }

    if (!(window as any).google?.maps) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`
      script.async = true
      script.defer = true
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
