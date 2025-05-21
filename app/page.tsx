"use client"

import { useState } from "react"
import RegionSelector from "@/components/region-selector"
import MapDisplay from "@/components/map-display"
import DestinationList from "@/components/destination-list"
import { regions, type Region } from "@/lib/data"

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0])
  const [isListOpen, setIsListOpen] = useState(false)

  const handleRegionChange = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId)
    if (region) {
      setSelectedRegion(region)
    }
  }

  const toggleList = () => {
    setIsListOpen(!isListOpen)
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col h-screen">
        <div className="mb-4">
          <RegionSelector regions={regions} selectedRegion={selectedRegion.id} onRegionChange={handleRegionChange} />
        </div>

        <div className="flex-grow relative mb-16">
          <MapDisplay region={selectedRegion} />
        </div>

        <div className="fixed bottom-0 left-0 right-0 flex justify-center">
          <div className="w-full max-w-md">
            <DestinationList region={selectedRegion} isOpen={isListOpen} onToggle={toggleList} />
          </div>
        </div>
      </div>
    </main>
  )
}
