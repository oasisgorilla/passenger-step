"use client"

import { ChevronDown } from "lucide-react"
import type { Region } from "@/lib/data"

interface RegionSelectorProps {
  regions: Region[]
  selectedRegion: string
  onRegionChange: (regionId: string) => void
}

export default function RegionSelector({ regions, selectedRegion, onRegionChange }: RegionSelectorProps) {
  const selected = regions.find((r) => r.id === selectedRegion)

  return (
    <div className="relative">
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="appearance-none w-full bg-white border border-gray-200 rounded-lg py-3 px-4 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
      >
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  )
}
