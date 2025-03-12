"use client";

import { cn } from "@/lib/utils";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const locations = [
  {
    name: "Main Store",
    address: "123 Main St, Cityville, CA 12345",
    hours: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 10:00 AM - 5:00 PM",
      "Sunday: Closed",
    ],
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    name: "Downtown Branch",
    address: "456 Downtown Ave, Cityville, CA 12346",
    hours: [
      "Monday - Friday: 8:00 AM - 7:00 PM",
      "Saturday: 10:00 AM - 4:00 PM",
      "Sunday: Closed",
    ],
    lat: 37.7849,
    lng: -122.4294,
  },
  {
    name: "Eastside Store",
    address: "789 Eastside Rd, Cityville, CA 12347",
    hours: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 11:00 AM - 4:00 PM",
      "Sunday: Closed",
    ],
    lat: 37.7949,
    lng: -122.4394,
  },
];

const LocationsPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
  });

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        Our Locations
      </h1>
      <p className="text-xl text-center mb-12">
        Find a store near you! Below are our locations with their addresses,
        store hours, and a map.
      </p>

      {/* Locations List */}
      <div className="">
        {locations.map((location, index) => (
          <div
            key={index}
            className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 py-10", {
              "border-b": index !== locations.length - 1,
            })}
          >
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semiboldnavigations">
                {location.name}
              </h2>
              <p className="text-lg mb-4">{location.address}</p>
              <p className="text-lg mb-4">Store Hours:</p>
              <ul className="list-disc list-inside text-lg mb-4">
                {location.hours.map((hour, i) => (
                  <li key={i}>{hour}</li>
                ))}
              </ul>
            </div>

            {/* Google Map for this location */}
            <div className="h-full w-full">
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
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
