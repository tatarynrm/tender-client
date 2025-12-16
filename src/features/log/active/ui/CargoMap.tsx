import { useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import { ICargo } from "./CargoCard";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";

// Кастомна іконка маркера
const customMarker = L.icon({
  iconUrl: markerIconPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

export function CargoMap({ cargo }: { cargo: ICargo }) {
  const mapRef = useRef<L.Map>(null!); // "!" щоб не було TypeScript помилки

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize(); // перерахунок розмірів карти після рендера
      }, 100); // невелика затримка допомагає, коли Drawer ще анімується
    }
  }, [cargo]);

  return (
    <MapContainer
      center={[
        cargo.crm_load_route_from[0]?.lat || 49,
        cargo.crm_load_route_from[0]?.lon || 24,
      ]}
      zoom={5}
      scrollWheelZoom
      className="w-full h-full rounded shadow"
      ref={mapRef} // замість whenCreated
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cargo.crm_load_route_from
        .filter((f) => f.lat !== undefined && f.lon !== undefined)
        .map((f, idx) => (
          <Marker
            key={`from-${idx}`}
            position={[f.lat!, f.lon!]}
            icon={customMarker}
          >
            <Popup>{f.city}</Popup>
          </Marker>
        ))}

      {cargo.crm_load_route_to
        .filter((t) => t.lat !== undefined && t.lon !== undefined)
        .map((t, idx) => (
          <Marker
            key={`to-${idx}`}
            position={[t.lat!, t.lon!]}
            icon={customMarker}
          >
            <Popup>{t.city}</Popup>
          </Marker>
        ))}

      <Polyline
        positions={[
          ...cargo.crm_load_route_from
            .filter((f) => f.lat !== undefined && f.lon !== undefined)
            .map((f) => [f.lat!, f.lon!] as [number, number]),
          ...cargo.crm_load_route_to
            .filter((t) => t.lat !== undefined && t.lon !== undefined)
            .map((t) => [t.lat!, t.lon!] as [number, number]),
        ]}
        pathOptions={{ color: "red", weight: 3 }}
      />
    </MapContainer>
  );
}
