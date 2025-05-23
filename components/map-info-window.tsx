import type { Destination } from "@/lib/data"

interface MapInfoWindowProps {
  destination: Destination
}

export function createInfoWindowContent(destination: Destination): string {

  return `
    <div class="p-3 min-w-[160px] max-w-[200px]">
      <h3 class="font-semibold text-base text-gray-900 mb-1">${destination.title}</h3>
      <p class="text-sm text-gray-600 mb-2">${destination.location}</p>
      <p class="text-xs text-blue-600 mb-2">Tap to view details</p>
      
    </div>
  `
}

// React component version for reference (not used in Google Maps)
export default function MapInfoWindow({ destination }: MapInfoWindowProps) {

  return (
    <div className="p-3 min-w-[160px] max-w-[200px] bg-white rounded-lg shadow-lg">
      <h3 className="font-semibold text-base text-gray-900 mb-1">{destination.title}</h3>
      <p className="text-xs text-blue-600 mb-2">Tap to view details</p>
    </div>
  )
}
