"use client";
import { Button } from "@/components/ui/button";
import { locations } from "@/lib/constants/constants";
import { scrollToSection } from "@/lib/utils";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import {
  FaCalendar,
  FaCar,
  FaClock,
  FaInfo,
  FaMapPin,
  FaPhone,
  FaTruck,
} from "react-icons/fa";
import { MdAssistantNavigation } from "react-icons/md";

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
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-extrabold text-5xl">Our Locations</h1>
          <p className="mx-auto max-w-2xl text-xl">
            Find a store near you! Below are our locations with their addresses,
            store hours, and a map.
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-7">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="top-18 sticky shadow-md p-6 border rounded-xl">
              <h2 className="mb-4 font-bold text-xl">Store Locations</h2>
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
                      <FaMapPin className="flex-shrink-0 mr-2 w-5 h-5" />
                      <span className="font-medium text-sm">
                        {location.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 bg-muted mt-8 p-4 rounded-lg">
                <h3 className="flex items-center font-medium">
                  <FaInfo className="mr-2 w-4 h-4" />
                  Store Information
                </h3>
                <p className="text-sm">
                  All our stores offer product returns, exchanges, and expert
                  advice from our staff.
                </p>
                <div className="mt-4">
                  <Link href="/customer_service">
                    <Button>
                      <MdAssistantNavigation className="mr-2 w-4 h-4" /> Learn
                      About Our Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 lg:col-span-5">
            {locations.map((location) => (
              <div
                key={location.id}
                ref={(el) => {
                  sectionRefs.current[location.id] = el;
                }}
                className="border-2 rounded-xl overflow-hidden"
              >
                <div className="p-6 border-b">
                  <h2 className="flex items-center font-semibold text-2xl">
                    <FaMapPin className="mr-2 w-6 h-6 text-blue-600" />
                    {location.name}
                  </h2>
                </div>
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FaMapPin className="flex-shrink-0 mt-1 mr-3 w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="mb-1 font-medium">Address</h3>
                        <p>{location.address}</p>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(
                            location.address
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center mt-2 text-blue-600 text-sm hover:underline"
                        >
                          <MdAssistantNavigation className="mr-1 w-4 h-4" /> Get
                          Directions
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaClock className="flex-shrink-0 mt-1 mr-3 w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="mb-1 font-medium">Store Hours</h3>
                        <ul className="space-y-1">
                          {location.hours.map((hour, i) => (
                            <li key={i}>{hour}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaPhone className="flex-shrink-0 mt-1 mr-3 w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="mb-1 font-medium">Contact</h3>
                        <p>
                          Phone:{" "}
                          <a
                            href={`tel:${location.phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {location.phone}
                          </a>
                        </p>
                        <p>
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
                      <FaInfo className="flex-shrink-0 mt-1 mr-3 w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="mb-1 font-medium">Store Features</h3>
                        <ul className="space-y-1">
                          {location.features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                              {feature.includes("parking") ? (
                                <FaCar className="mr-2 w-4 h-4 text-green-600" />
                              ) : feature.includes("pickup") ? (
                                <FaTruck className="mr-2 w-4 h-4 text-green-600" />
                              ) : (
                                <FaCalendar className="mr-2 w-4 h-4 text-green-600" />
                              )}
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg w-full h-full overflow-hidden">
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
                      <div className="flex justify-center items-center bg-gray-100 w-full h-full">
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
                    className="w-full md:w-auto"
                  >
                    <FaPhone className="mr-2 w-4 h-4" /> Call This Location
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
