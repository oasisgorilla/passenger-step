"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X, MapPin, Clock, Star } from "lucide-react"
import { destinations, type Destination } from "@/lib/data"

export default function PlacePage({ params }: { params: { id: string } }) {
  const [destination, setDestination] = useState<Destination | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const found = destinations.find((d) => d.id === params.id)
    if (found) {
      setDestination(found)
      // Trigger fade-in animation
      setTimeout(() => setIsVisible(true), 10)
    }
  }, [params.id])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => router.push("/"), 300)
  }

  if (!destination) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-md mx-4 rounded-xl overflow-hidden shadow-xl max-h-[90vh] flex flex-col transition-transform duration-300 transform"
        style={{ transform: isVisible ? "translateY(0)" : "translateY(50px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56">
          <Image src={destination.image || "/placeholder.svg"} alt={destination.title} fill className="object-cover" />
          <button onClick={handleClose} className="absolute top-4 right-4 bg-white/80 p-2 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-2">{destination.title}</h2>

          <div className="flex items-center mb-4 text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{destination.location}</span>
            <div className="mx-2">•</div>
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{destination.duration}</span>
            <div className="mx-2">•</div>
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            <span className="text-sm">{destination.rating}</span>
          </div>

          <p className="text-gray-700 mb-4">{destination.description}</p>

          <h3 className="font-semibold text-lg mb-2">Highlights</h3>
          <ul className="list-disc pl-5 mb-4">
            {destination.highlights.map((highlight, index) => (
              <li key={index} className="text-gray-700 mb-1">
                {highlight}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-lg mb-2">Best Time to Visit</h3>
          <p className="text-gray-700 mb-4">{destination.bestTimeToVisit}</p>

          <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
            Add to Itinerary
          </button>
        </div>
      </div>
    </div>
  )
}
