"use client";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Car,
  Truck,
  Navigation,
  Info,
  Calendar,
} from "lucide-react";
import { locations } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";

const containerStyle = {
  width: "100%",
  height: "400px",
};

/**
 * LocationsPage Component
 *
 * Renders a page displaying store locations with interactive maps and location details.
 *
 * Features:
 * - Displays multiple store locations with detailed information
 * - Interactive Google Maps integration for each location
 * - Sticky sidebar navigation between locations
 * - Responsive layout that works on mobile and desktop
 *
 * @component
 * @requires @react-google-maps/api - For Google Maps integration
 * @requires google-maps-api-key - Environment variable for Google Maps API authentication
 *
 * @example
 * ```tsx
 * <LocationsPage />
 * ```
 *
 * @remarks
 * The component uses the following key functionalities:
 * - useJsApiLoader for Google Maps API loading
 * - useState for tracking active location
 * - useRef for scroll management
 * - useCallback for optimizing map-related functions
 *
 * State Management:
 * - activeLocation: Tracks currently selected location
 * - sectionRefs: Stores references to location sections for scrolling
 *
 * @returns A fully responsive page component with location information and interactive maps
 */
const LocationsPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
  });

  const [activeLocation, setActiveLocation] = useState<string | null>(
    "main-store"
  );
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId, sectionRefs, setActiveLocation);
  };

  const onLoad = useCallback(
    (map: google.maps.Map, location: { lat: number; lng: number }) => {
      const bounds = new window.google.maps.LatLngBounds({
        lat: location.lat,
        lng: location.lng,
      });
      map.fitBounds(bounds);
    },
    []
  );

  const onUnmount = useCallback(() => {
    // Cleanup if needed
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Our Locations</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Find a store near you! Below are our locations with their addresses,
            store hours, and a map.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-xl shadow-md border p-6">
              <h2 className="text-xl font-bold mb-4">Store Locations</h2>
              <ul className="space-y-2">
                {locations.map((location) => (
                  <li key={location.id}>
                    <button
                      onClick={() => handleScrollToSection(location.id)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeLocation === location.id
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-gray-100 "
                      }`}
                    >
                      <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium">
                        {location.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 rounded-lg bg-muted space-y-2">
                <h3 className="font-medium flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  Store Information
                </h3>
                <p className="text-sm ">
                  All our stores offer product returns, exchanges, and expert
                  advice from our staff.
                </p>
                <div className="mt-4">
                  <Link href="/customer_service">
                    <Button className="">
                      <Navigation className="h-4 w-4 mr-2" /> Learn About Our
                      Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-5 space-y-8">
            {locations.map((location) => (
              <div
                key={location.id}
                ref={(el) => {
                  sectionRefs.current[location.id] = el;
                }}
                className="rounded-xl border-2 overflow-hidden"
              >
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                    {location.name}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium mb-1">Address</h3>
                        <p className="">{location.address}</p>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(
                            location.address
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 flex items-center mt-2 text-sm hover:underline"
                        >
                          <Navigation className="h-4 w-4 mr-1" /> Get Directions
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium mb-1">Store Hours</h3>
                        <ul className=" space-y-1">
                          {location.hours.map((hour, i) => (
                            <li key={i}>{hour}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium mb-1">Contact</h3>
                        <p className="">
                          Phone:{" "}
                          <a
                            href={`tel:${location.phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {location.phone}
                          </a>
                        </p>
                        <p className="">
                          Email:{" "}
                          <a
                            href={`mailto:${location.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {location.email}
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium mb-1">Store Features</h3>
                        <ul className=" space-y-1">
                          {location.features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                              {feature.includes("parking") ? (
                                <Car className="h-4 w-4 mr-2 text-green-600" />
                              ) : feature.includes("pickup") ? (
                                <Truck className="h-4 w-4 mr-2 text-green-600" />
                              ) : (
                                <Calendar className="h-4 w-4 mr-2 text-green-600" />
                              )}
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="h-full w-full rounded-lg overflow-hidden border">
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: location.lat, lng: location.lng }}
                        zoom={14}
                        onLoad={(map) => onLoad(map, location)}
                        onUnmount={onUnmount}
                      >
                        {/* Child components, such as markers, info windows, etc. */}
                        <></>
                      </GoogleMap>
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <p>Loading map...</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 border-t">
                  <Button
                    onClick={() =>
                      window.open(`tel:${location.phone}`, "_self")
                    }
                    className=" w-full md:w-auto"
                  >
                    <Phone className="h-4 w-4 mr-2" /> Call This Location
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
