"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Property } from "@/lib/types";

interface PropertyMapViewProps {
  properties: (Property & { coords: [number, number] })[];
  selectedId?: string | null;
}

export default function PropertyMapView({ properties, selectedId }: PropertyMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Initialize map
    try {
      mapInstance.current = L.map(mapRef.current, {
        preferCanvas: true,
      }).setView([39.5, 25], 4);

      // Add tile layer with proper attribution
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 2,
      }).addTo(mapInstance.current);
    } catch (e) {
      console.error("Map initialization error:", e);
      return;
    }

    // Add markers for each property
    properties.forEach((property) => {
      const [lat, lng] = property.coords;
      if (lat === 0 && lng === 0) return; // Skip invalid coords

      const icon = L.divIcon({
        html: `<div style="background:#0066cc;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.3);border:3px solid white;">📍</div>`,
        className: "",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      const marker = L.marker([lat, lng], { icon }).addTo(mapInstance.current!);

      const popupContent = `
        <div style="min-width: 200px; font-family: system-ui;">
          <h3 style="margin: 0 0 8px; font-weight: bold; font-size: 14px; color: #1e3a5f;">${property.title}</h3>
          <p style="margin: 0 0 8px; font-size: 13px; color: #666;">
            📍 ${property.city}, ${property.country}
          </p>
          <p style="margin: 0 0 8px; font-weight: bold; font-size: 14px; color: #0066cc;">
            €${property.price.toLocaleString()}
          </p>
          <p style="margin: 0 0 8px; font-size: 12px; color: #666;">
            🛏 ${property.bedrooms} bedrooms | 📈 ${property.expected_roi}% ROI
          </p>
          <a href="/properties/${property.id}" style="display: inline-block; margin-top: 8px; padding: 6px 12px; background: #0066cc; color: white; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: bold;">
            View Details
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current[property.id] = marker;
    });

    return () => {
      // Cleanup is handled by Leaflet
    };
  }, [properties]);

  // Handle selected property
  useEffect(() => {
    if (!selectedId || !markersRef.current[selectedId]) return;

    const marker = markersRef.current[selectedId];
    marker.openPopup();

    // Fly to marker
    if (mapInstance.current) {
      mapInstance.current.flyTo(marker.getLatLng(), 10, { duration: 1 });
    }
  }, [selectedId]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
