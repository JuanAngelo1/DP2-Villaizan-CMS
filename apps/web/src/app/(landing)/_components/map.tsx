"use client";

import { ControlledError, PuntoVenta, Response, ResponseModuloRedes } from "@web/types";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Button } from "@repo/ui/components/button";
import QRScanner from "./QRScanner";

const iceCreamIcon = L.icon({
  iconUrl: "/VillaizanLogoV.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const villaParadaIcon = L.icon({
  iconUrl: "/VillaParadaIcon.png", // Cambia esta ruta por la imagen de tu ícono
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
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
  const [villaParadas, setVillaParadas] = useState([]);

  const userIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    const fetchIceCreamShops = async () => {
      try {
        const response: Response<PuntoVenta[]> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/puntosventa`
        );
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
    const fetchVillaParadas = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/villaparada`);
        if (response.data.return === "Success") {
          setVillaParadas(response.data.result); // Guardamos las villaparadas
        } else {
          console.error("Error al obtener villaparadas:", response.data.message);
        }
      } catch (error) {
        console.error("Error al obtener villaparadas:", error);
      }
    };

    fetchVillaParadas();
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
      setZoom(
        location.latitude === iceCreamShops[0]?.latitud && location.longitude === iceCreamShops[0]?.longitud
          ? 14
          : 16
      );
    }
  }, [location, iceCreamShops]);

  const [selectedParadaId, setSelectedParadaId] = useState<number | null>(null);

  return (
    <section className="mt-20 min-h-[500px] bg-gradient-to-b p-6" id="mapa">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">🍦 Paletas Villaizan</h2>
          <p>Encuentra tu paletería más cercana</p>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
          {isLoading ? (
            <div className="flex h-[600px] w-full items-center justify-center bg-gray-50">
              <div className="space-y-3 text-center">
                <div className="animate-bounce text-4xl">🍦</div>
                <p className="animate-pulse text-gray-600">Cargando paleterías más cercanas...</p>
              </div>
            </div>
          ) : location ? (
            <div className="relative z-0 h-[600px]">
              <MapContainer
                center={[location.latitude, location.longitude]}
                zoom={zoom}
                className="h-full w-full"
              >
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
                  <Marker key={shop.id} position={[shop.latitud, shop.longitud]} icon={iceCreamIcon}>
                    <Popup className="custom-popup">
                      <h3 className="text-primary mb-1 text-lg font-bold"> 🏪 {shop.nombre}</h3>
                      <p className="my-0 text-sm text-gray-600">
                        <span className="font-semibold">{shop.direccion}</span>
                      </p>
                      {shop.nota && (
                        <p className="rounded bg-gray-100 p-1 text-xs italic text-gray-500">
                          <span className="font-semibold">Nota:</span> {shop.nota}
                        </p>
                      )}
                    </Popup>
                  </Marker>
                ))}
                {/* Marcadores para VillaParadas */}
                {villaParadas.map((parada) => (
                  <Marker
                    key={`villa-${parada.id}`} // Prefijo para evitar conflictos con otros marcadores
                    position={[parada.latitud, parada.longitud]} // Ubicación de la villaparada
                    icon={villaParadaIcon} // Ícono de villaparadas
                  >
                    <Popup className="mx-auto max-w-sm rounded-xl border p-0">
                      <h3 className="mb-2 border-b-2 border-red-100 pb-2 text-center text-2xl font-extrabold text-red-800">
                        * {parada.nombre} *
                      </h3>
                      <p className="mb-3 flex items-center justify-center font-medium text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-5 w-5 text-red-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {parada.direccion}
                      </p>
                      {parada.nota && (
                        <p className="mb-4 rounded-r-lg border-l-4 border-yellow-400 bg-yellow-50 p-3 text-sm text-yellow-700">
                          <span className="font-bold">Nota:</span>
                          <span className="italic"> {parada.nota}</span>
                        </p>
                      )}
                      <Button
                        className="mt-4 flex w-full transform items-center justify-center space-x-2 rounded-lg bg-red-700 py-3 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={() => setSelectedParadaId(parada.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v1m6 11h2a2 2 0 002-2v-3a2 2 0 00-2-2h-2v-1a4 4 0 00-8 0v1H6a2 2 0 00-2 2v3a2 2 0 002 2h2v-5a2 2 0 114 0v5"
                          />
                        </svg>
                        <span>Escanear QR</span>
                      </Button>

                      {/* Lector de QR */}
                      {selectedParadaId === parada.id && QRScanner && (
                        <QRScanner id_fruta={parada.id_fruta} villaparada={parada.id} />
                      )}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          ) : (
            <div className="flex h-[600px] w-full items-center justify-center">
              <p className="text-gray-600">{error || "Error al cargar el mapa"}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MapComponent;
