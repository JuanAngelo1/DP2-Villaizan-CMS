"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { PuntoVenta, Response } from "@web/types";

const iceCreamIcon = L.icon({
  iconUrl: '/VillaizanLogoV.png',
  iconSize: [30, 30], 
  iconAnchor: [15, 30], 
  popupAnchor: [0, -30],
});

interface Location {
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [zoom, setZoom] = useState<number>(16);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iceCreamShops, setIceCreamShops] = useState<PuntoVenta[]>([]);

  const userIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    const fetchIceCreamShops = async () => {
      try {
        const response: Response<PuntoVenta[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/puntosventa`);
        if (response.data.status === "Error") throw new Error(response.data.message);

        setIceCreamShops(response.data.result);
      } catch (error) {
        console.error("Error al obtener datos de heladerías:", error);
        setError("Error al cargar los puntos de venta desde el servidor.");
      }
    };

    fetchIceCreamShops();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setIsLoading(false);
        },
        (error) => {
          let errorMsg = "No se pudo acceder a la ubicación. Mostrando ubicación predeterminada.";
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = "Permiso de ubicación denegado. Mostrando ubicación predeterminada.";
          }
          setError(errorMsg);
          if (iceCreamShops.length > 0) {
            setLocation({ latitude: iceCreamShops[0].latitud, longitude: iceCreamShops[0].longitud });
          }
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocalización no soportada por este navegador.");
      if (iceCreamShops.length > 0) {
        setLocation({ latitude: iceCreamShops[0].latitud, longitude: iceCreamShops[0].longitud });
      }
      setIsLoading(false);
    }
  }, [iceCreamShops]);

  useEffect(() => {
    if (location) {
      setZoom(location.latitude === iceCreamShops[0]?.latitud && location.longitude === iceCreamShops[0]?.longitud ? 14 : 16);
    }
  }, [location, iceCreamShops]);

  return (
    <section className="bg-gradient-to-b min-h-[500px] p-6" id="mapa">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">🍦 Paletas Villaizan</h2>
          <p>Encuentra tu paletería más cercana</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="h-[600px] w-full flex items-center justify-center bg-gray-50">
              <div className="text-center space-y-3">
                <div className="animate-bounce text-4xl">🍦</div>
                <p className="text-gray-600 animate-pulse">Cargando paleterías más cercanas...</p>
              </div>
            </div>
          ) : location ? (
            <div className="h-[600px] relative z-0">
              <MapContainer center={[location.latitude, location.longitude]} zoom={zoom} className="h-full w-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {location && (
                  <Marker position={[location.latitude, location.longitude]} icon={userIcon}>
                    <Popup>
                      <p className="font-semibold">Estoy aquí</p>
                    </Popup>
                  </Marker>
                )}

                {/* Marcadores de puntos de venta */}
                {iceCreamShops.map((shop) => (
                  <Marker
                    key={shop.id}
                    position={[shop.latitud, shop.longitud]}
                    icon={iceCreamIcon}
                  >
                    <Popup className="custom-popup">
                        <h3 className="font-bold text-lg text-primary mb-1"> 🏪 {shop.nombre}</h3>
                        <p className="text-sm text-gray-600 my-0">
                          <span className="font-semibold">{shop.direccion}</span>
                        </p>
                        {shop.nota && (
                          <p className="italic text-xs text-gray-500 bg-gray-100 rounded p-1">
                            <span className="font-semibold">Nota:</span> {shop.nota}
                          </p>
                        )}
                    </Popup>

                  </Marker>
                ))}
              </MapContainer>
            </div>
          ) : (
            <div className="h-[600px] w-full flex items-center justify-center bg-gray-50">
              <p className="text-gray-600">{error || "Error al cargar el mapa"}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MapComponent;
