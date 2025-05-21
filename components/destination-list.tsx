"use client"
import Image from "next/image"
import { ChevronUp } from "lucide-react"
import { type Region, destinations } from "@/lib/data"
import { useRouter } from "next/navigation"

interface DestinationListProps {
  region: Region
  isOpen: boolean
  onToggle: () => void
}

export default function DestinationList({ region, isOpen, onToggle }: DestinationListProps) {
  const router = useRouter()

  const regionDestinations = destinations.filter((dest) => region.destinations.some((d) => d.id === dest.id))

  const handleDestinationClick = (id: string) => {
    router.push(`/place/${id}`)
  }

  return (
    <div
      className="bg-white rounded-t-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        maxHeight: isOpen ? "70vh" : "60px",
      }}
    >
      <button onClick={onToggle} className="w-full py-4 px-6 flex items-center justify-between bg-white">
        <span className="font-medium text-gray-800">
          {isOpen ? "Popular Destinations" : `${regionDestinations.length} Destinations in ${region.name}`}
        </span>
        <ChevronUp className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "" : "rotate-180"}`} />
      </button>

      <div className="overflow-y-auto max-h-[calc(70vh-60px)]">
        {regionDestinations.map((destination) => (
          <div
            key={destination.id}
            className="p-4 border-t border-gray-100 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleDestinationClick(destination.id)}
          >
            <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-gray-900">{destination.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{destination.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
