'use client'
import { useState, useEffect } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Location {
  name: string;
  rating: number;
  latitude: number;
  longitude: number;
}

const locations: Location[] = [
  {
    name: "Zenith Bank Adenta Shopping Center",
    rating: 2.3,
    latitude: 5.6815,
    longitude: -0.2081,
  },
  {
    name: "Zenith Bank - Madina Branch",
    rating: 2.0,
    latitude: 5.686,
    longitude: -0.1648,
  },
  {
    name: "Zenith Bank ATM",
    rating: 2.0,
    latitude: 5.6742,
    longitude: -0.1706,
  },
];

// Helper function to calculate the Haversine distance
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

export default function LocationsList() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<"pending" | "granted" | "denied">(() => {
    // Retrieve the saved permission from localStorage
    return localStorage.getItem("locationPermission") as "pending" | "granted" | "denied" || "pending";
  });
  const [distances, setDistances] = useState<number[]>([]);

  useEffect(() => {
    if (locationPermission === "granted") {
      // Fetch user's geolocation
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          () => {
            setLocationPermission("denied");
            localStorage.setItem("locationPermission", "denied");
          }
        );
      } else {
        setLocationPermission("denied");
        localStorage.setItem("locationPermission", "denied");
      }
    }
  }, [locationPermission]);

  useEffect(() => {
    // Calculate distances once the user's location is fetched
    if (userLocation) {
      const calculatedDistances = locations.map((location) =>
        calculateDistance(userLocation.latitude, userLocation.longitude, location.latitude, location.longitude)
      );
      setDistances(calculatedDistances);
    }
  }, [userLocation]);

  const handlePermissionChange = (permission: "granted" | "denied") => {
    setLocationPermission(permission);
    localStorage.setItem("locationPermission", permission);
  };

  return (
    <div className="gap-3 w-full flex flex-col">
      <h1 className="text-paragraph-md-semibold">Locations</h1>

      {locationPermission === "pending" && (
        <div className="p-4 border rounded-lg bg-gray-50 flex flex-col items-center text-center">
          <p className="mb-4 text-gray-700">
            Would you like to share your location to see nearby locations and distances?
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => handlePermissionChange("granted")}
            >
              Share Location
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePermissionChange("denied")}
            >
              No, Thanks
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-5 w-full">
        {locations.map((location, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-5 gap-4 last:border-b-0"
          >
            <div className="flex items-start gap-3">
              <div className="p-1.5 border rounded-lg">
                <MapPin className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <h2 className="text-paragraph-sm-semibold mb-1 leading-tight">
                  {location.name}
                </h2>
                <div className="flex items-center gap-1">
                  <span className="text-paragraph-md-medium">
                    {location.rating.toFixed(1)}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(location.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300 fill-current"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  {locationPermission === "granted" &&
                    distances.length > 0 && (
                      <span className="text-paragraph-md-medium">
                        {distances[index].toFixed(1)} km
                      </span>
                    )}
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              size="md"
            >
              <ArrowUpRight className="h-4 w-4" />
              Directions
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}