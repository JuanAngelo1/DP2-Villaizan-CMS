"use client";
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const iceCreamIcon = L.icon({
  iconUrl: '/VillaizanLogoV.png',
  iconSize: [30, 30], 
  iconAnchor: [30, 30], 
  popupAnchor: [0, -45],
  shadowSize: [41, 41], 
  shadowAnchor: [12, 41],
});

interface Location {
  latitude: number;
  longitude: number;
}

interface IceCreamShop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const ICE_CREAM_SHOPS: IceCreamShop[] = [
  {
    id: 1,
    name: "Heladería Número 1",
    latitude: -12.068047747785911,
    longitude: -77.07682286815331,
  },
  {
    id: 2,
    name: "Heladería Número 2",
    latitude: -12.068708725859823,
    longitude: -77.07760607316435,

  },
  {
    id: 3,
    name: "Heladería Número 3",
    latitude: -12.069931011070107,
    longitude: -77.0777556983681,
  }
];

const MapComponent: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [zoom, setZoom] = useState<number>(16);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

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
          setError("No se pudo acceder a la ubicación. Mostrando ubicación predeterminada.");
          setLocation({
            latitude: ICE_CREAM_SHOPS[0].latitude,
            longitude: ICE_CREAM_SHOPS[0].longitude
          });
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocalización no soportada por este navegador.");
      setLocation({
        latitude: ICE_CREAM_SHOPS[0].latitude,
        longitude: ICE_CREAM_SHOPS[0].longitude
      });
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="bg-gradient-to-b  min-h-[500px] p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            🍦 Heladerías Villaizan
          </h2>
          <p >
            Encuentra tu heladería más cercana
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="h-[600px] w-full flex items-center justify-center bg-gray-50">
              <div className="text-center space-y-3">
                <div className="animate-bounce text-4xl">🍦</div>
                <p className="text-gray-600 animate-pulse">Cargando heladerías más cercanas...</p>
              </div>
            </div>
          ) : location ? (
            <div className="h-[600px] relative">
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
                    <Popup className="custom-popup">
                      <div className="text-center">
                        <p className="font-semibold">Estoy aquí</p>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* Marcadores de heladerías */}
                {ICE_CREAM_SHOPS.map((shop) => (
                  <Marker
                    key={shop.id}
                    position={[shop.latitude, shop.longitude]}
                    icon={iceCreamIcon}
                  >
                    <Popup className="custom-popup">
                      <div className="p-3">
                        <h3 className="font-bold text-lg mb-2">{shop.name}</h3>
                        <div className="text-sm space-y-2">
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          ) : (
            <div className="h-[600px] w-full flex items-center justify-center bg-gray-50">
              <p className="text-gray-600">Error al cargar el mapa</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default MapComponent;
