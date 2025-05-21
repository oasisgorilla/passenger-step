"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import type { Region } from "@/lib/data"
import { useRouter } from "next/navigation"

interface MapDisplayProps {
  region: Region
}

export default function MapDisplay({ region }: MapDisplayProps) {
  const router = useRouter()
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handlePinClick = (destinationId: string) => {
    router.push(`/place/${destinationId}`)
  }

  return (
    <div className="w-full h-full bg-gray-200 rounded-xl overflow-hidden shadow-md relative">
      {/* Map placeholder */}
      <div className="w-full h-full bg-[#e8f0f7] relative">
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        )}

        {/* Map image placeholder */}
        <div className="w-full h-full opacity-80">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ccdbe6" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map pins */}
        {mapLoaded &&
          region.destinations.map((dest) => (
            <button
              key={dest.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${dest.coordinates.x}%`, top: `${dest.coordinates.y}%` }}
              onClick={() => handlePinClick(dest.id)}
            >
              <div className="flex flex-col items-center">
                <div className="bg-emerald-500 text-white p-1 rounded-full shadow-md group-hover:bg-emerald-600 transition-colors">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="bg-white px-2 py-1 rounded-md shadow-md mt-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {dest.title}
                </div>
              </div>
            </button>
          ))}
      </div>
    </div>
  )
}
