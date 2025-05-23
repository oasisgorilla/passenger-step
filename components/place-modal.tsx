"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, MapPin, Clock, Star } from "lucide-react";
import { type Destination } from "@/lib/data";

export default function PlaceModal({
  destination,
}: {
  destination: Destination;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => router.push("/"), 300);
  };

  if (!destination) {
    return null;
  }

  const handleNaverDirection = () => {
    if (!navigator.geolocation) {
      alert("현재 위치를 가져올 수 없습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const slat = position.coords.latitude;
        const slng = position.coords.longitude;
        const sname = "현재 위치";
        const dlat = destination.coordinates.lat;
        const dlng = destination.coordinates.lng;
        const dname = destination.title;

        const isMobile = /iPhone|Android/i.test(navigator.userAgent);

        if (isMobile) {
          const appUrl = `nmap://route/public?slat=${slat}&slng=${slng}&sname=${encodeURIComponent(
            sname
          )}&dlat=${dlat}&dlng=${dlng}&dname=${encodeURIComponent(
            dname
          )}&appname=myapp`;
          window.location.href = appUrl;
        } else {
          const webUrl = `https://map.naver.com/p/directions/${slng},${slat},${encodeURIComponent(
            sname
          )},null,PLACE_POI/${dlng},${dlat},${encodeURIComponent(
            dname
          )},null,PLACE_POI/-/transit`;
          window.open(webUrl, "_blank");
        }
      },
      (err) => {
        alert("위치 정보를 가져올 수 없습니다: " + err.message);
      }
    );
  };

  const handleGoogleDirection = () => {
    if (!navigator.geolocation) {
      alert("현재 위치를 가져올 수 없습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const slat = position.coords.latitude;
        const slng = position.coords.longitude;
        const dlat = destination.coordinates.lat;
        const dlng = destination.coordinates.lng;

        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${slat},${slng}&destination=${dlat},${dlng}&travelmode=transit`;
        window.open(googleMapsUrl, "_blank");
      },
      (err) => {
        alert("위치 정보를 가져올 수 없습니다: " + err.message);
      }
    );
  };

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
          <Image
            src={destination.image || "/placeholder.svg"}
            alt={destination.title}
            fill
            className="object-cover"
          />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-white/80 p-2 rounded-full"
          >
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

          <div className="mt-4 grid grid-cols-2 gap-4">
            <button
              onClick={handleNaverDirection}
              className="bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Directions(Naver)
            </button>
            <button
              onClick={handleGoogleDirection}
              className="bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Directions(Google)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
