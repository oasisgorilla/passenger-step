"use client"

import { useState, useEffect, useRef } from "react"
import type { Region } from "@/lib/data"
import { useRouter } from "next/navigation"
import { destinations, relatedGroups } from "@/lib/data"
import { Loader } from "@googlemaps/js-api-loader"
import { createInfoWindowContent } from "@/components/map-info-window"
import type google from "google.maps"

interface MapDisplayProps {
  region: Region
}

export default function MapDisplay({ region }: MapDisplayProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const polylinesRef = useRef<google.maps.Polyline[]>([])
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const activeGroupRef = useRef<string | null>(null)
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"

  // Clean up function to remove markers and polylines
  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null))
      polylinesRef.current.forEach((line) => line.setMap(null))
      markersRef.current = []
      polylinesRef.current = []
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    // Clean up previous markers and polylines when region changes
    markersRef.current.forEach((marker) => marker.setMap(null))
    polylinesRef.current.forEach((line) => line.setMap(null))
    markersRef.current = []
    polylinesRef.current = []
    activeGroupRef.current = null

    const initializeMap = () => {
      try {
        const { google } = window as any
        if (!google?.maps) {
          setMapError("Google Maps failed to load")
          setIsLoading(false)
          return
        }

        setIsLoading(true)

        // Create map instance
        const mapOptions: google.maps.MapOptions = {
          center: {
            lat: region.coordinates.lat,
            lng: region.coordinates.lng,
          },
          zoom: 12,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          styles: [
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [{ color: "#ffffff" }, { lightness: 17 }],
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [{ color: "#c9b2a6" }, { lightness: 17 }, { weight: 1.2 }],
            },
          ],
        }

        const map = new google.maps.Map(mapRef.current, mapOptions)
        mapInstanceRef.current = map

        // Get full destination objects for this region
        const regionDestinations = destinations.filter((dest) => region.destinations.some((d) => d.id === dest.id))

        // Create a mapping of destination IDs to destination objects
        const destMap = Object.fromEntries(regionDestinations.map((d) => [d.id, d]))

        // Create custom marker icon
        const markerIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#10b981",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
          scale: 8,
        }

        const activeMarkerIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#0369a1",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
          scale: 10,
        }

        // Function to draw polylines for a related group
        const drawRelatedGroupPolylines = (groupId: string) => {
          // Clear existing polylines
          polylinesRef.current.forEach((line) => line.setMap(null))
          polylinesRef.current = []

          // Find the related group
          const group = relatedGroups.find((g) => g.id === groupId)
          if (!group) return

          // Reset all markers to default icon
          markersRef.current.forEach((marker) => {
            marker.setIcon(markerIcon)
          })

          // Get destinations in this group
          const groupDestinations = group.destinationIds.map((id) => destMap[id]).filter(Boolean)

          // Highlight markers in this group
          markersRef.current.forEach((marker) => {
            const destId = marker.get("destId")
            if (group.destinationIds.includes(destId)) {
              marker.setIcon({
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: group.color,
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#ffffff",
                scale: 9,
              })
            }
          })

          // Draw polylines between all destinations in the group
          for (let i = 0; i < groupDestinations.length; i++) {
            for (let j = i + 1; j < groupDestinations.length; j++) {
              const dest1 = groupDestinations[i]
              const dest2 = groupDestinations[j]

              const lineSymbol = {
                path: "M 0,-1 0,1",
                strokeOpacity: 1,
                scale: 3,
              }

              const polyline = new google.maps.Polyline({
                path: [
                  { lat: dest1.coordinates.lat, lng: dest1.coordinates.lng },
                  { lat: dest2.coordinates.lat, lng: dest2.coordinates.lng },
                ],
                map,
                geodesic: true,
                strokeColor: group.color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                icons: [
                  {
                    icon: lineSymbol,
                    offset: "0",
                    repeat: "15px",
                  },
                ],
              })

              polylinesRef.current.push(polyline)
            }
          }

          // Set active group
          activeGroupRef.current = groupId
        }

        // Function to clear all polylines and reset markers
        const clearRelatedGroups = () => {
          polylinesRef.current.forEach((line) => line.setMap(null))
          polylinesRef.current = []

          markersRef.current.forEach((marker) => {
            marker.setIcon(markerIcon)
          })

          activeGroupRef.current = null
        }

        // Add markers for each destination
        regionDestinations.forEach((dest) => {
          const marker = new google.maps.Marker({
            position: {
              lat: dest.coordinates.lat,
              lng: dest.coordinates.lng,
            },
            map,
            title: dest.title,
            icon: markerIcon,
            animation: google.maps.Animation.DROP,
          })

          // Store destination ID with marker for reference
          marker.set("destId", dest.id)

          // Create info window for each marker
          const infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(dest),
            pixelOffset: new google.maps.Size(0, -10),
            maxWidth: 220,
          })

          // Add click event listener
          marker.addListener("click", () => {
            router.push(`/place/${dest.id}`)
          })

          // Add mouseover event listener
          marker.addListener("mouseover", () => {
            // Change marker icon
            marker.setIcon(activeMarkerIcon)

            // Show info window
            infoWindow.open(map, marker)

            // If destination has related groups, show them
            if (dest.relatedGroupIds && dest.relatedGroupIds.length > 0) {
              // If there's only one group, show it
              if (dest.relatedGroupIds.length === 1) {
                drawRelatedGroupPolylines(dest.relatedGroupIds[0])
              }
              // If there are multiple groups, we could show the first one or implement a UI to select
              // For now, we'll show the first one that's not already active
              else {
                const groupToShow =
                  dest.relatedGroupIds.find((id) => id !== activeGroupRef.current) || dest.relatedGroupIds[0]
                drawRelatedGroupPolylines(groupToShow)
              }
            }
          })

          // Add mouseout event listener
          marker.addListener("mouseout", () => {
            // Reset marker icon
            marker.setIcon(markerIcon)

            // Close info window
            infoWindow.close()

            // We'll keep the polylines visible until another group is selected
            // or until the map is clicked
          })

          // Store marker reference for cleanup
          markersRef.current.push(marker)
        })

        // Add click listener to map to clear polylines
        map.addListener("click", () => {
          clearRelatedGroups()
        })

        // Fit map bounds to include all markers
        const bounds = new google.maps.LatLngBounds()
        regionDestinations.forEach((dest) => {
          bounds.extend({
            lat: dest.coordinates.lat,
            lng: dest.coordinates.lng,
          })
        })
        map.fitBounds(bounds, 50) // Add padding

        // Adjust zoom if too close
        const listener = google.maps.event.addListenerOnce(map, "idle", () => {
          if (map.getZoom() > 12) {
            map.setZoom(12)
          }
          setIsLoading(false)
        })
      } catch (error) {
        console.error("Error initializing map:", error)
        setMapError("Failed to initialize map")
        setIsLoading(false)
      }
    }

    // Load Google Maps API if not already loaded
    if (!(window as any).google?.maps) {
      const loader = new Loader({
        apiKey: googleMapsApiKey,
        version: "weekly",
        libraries: ["places"],
      })

      loader
        .load()
        .then(() => {
          initializeMap()
        })
        .catch((err) => {
          console.error("Failed to load Google Maps API", err)
          setMapError("Failed to load Google Maps API")
          setIsLoading(false)
        })
    } else {
      initializeMap()
    }

    // Cleanup function
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null))
      polylinesRef.current.forEach((line) => line.setMap(null))
    }
  }, [region, router, googleMapsApiKey])

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-2"></div>
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center p-4">
            <p className="text-red-500 mb-2">{mapError}</p>
            <p className="text-sm text-gray-600">Please check your API key or internet connection</p>
          </div>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full" />

      {/* Legend for related groups */}
      <div className="absolute bottom-3 left-3 bg-white/90 rounded-lg shadow-md p-2 max-w-[200px] text-xs">
        <h4 className="font-semibold mb-1">Travel Groups</h4>
        <div className="space-y-1 max-h-[100px] overflow-y-auto">
          {relatedGroups.map((group) => (
            <div key={group.id} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: group.color }}></div>
              <span className="truncate">{group.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
