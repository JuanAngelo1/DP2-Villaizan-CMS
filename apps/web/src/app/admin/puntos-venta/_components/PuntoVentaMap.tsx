// src/app/admin/puntos-venta/components/PuntoVentaMap.tsx

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function SetViewOnSelect({ selectedPoint }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPoint && selectedPoint.lat !== undefined && selectedPoint.lng !== undefined) {
      map.setView([selectedPoint.lat, selectedPoint.lng], 15);
    }
  }, [selectedPoint, map]);

  return null;
}

export default function PuntoVentaMap({ puntos, selectedPoint, onDragMarker }) {
  return (
    <MapContainer center={[-12.086, -77.070]} zoom={13} className="w-full h-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {puntos.map((punto) => (
        <Marker
          key={punto.id}
          position={[punto.lat, punto.lng]}
          icon={markerIcon}
        />
      ))}

      {selectedPoint && (
        <Marker
          position={[selectedPoint.lat, selectedPoint.lng]}
          icon={markerIcon}
          draggable={true}
          eventHandlers={{
            dragend: (event) => {
              const marker = event.target;
              const newLatLng = marker.getLatLng();
              onDragMarker(newLatLng.lat, newLatLng.lng);
            },
          }}
        />
      )}

      <SetViewOnSelect selectedPoint={selectedPoint} />
    </MapContainer>
  );
}