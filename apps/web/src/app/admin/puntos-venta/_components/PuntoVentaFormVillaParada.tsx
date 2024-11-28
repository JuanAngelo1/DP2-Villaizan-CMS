import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Search } from "lucide-react";

export default function PuntoVentaFormVillaParada({ selectedPoint, onSave, onCancel, onMapUpdate }) {
  const [nombre, setNombre] = useState(selectedPoint?.nombre || "");
  const [direccion, setDireccion] = useState(selectedPoint?.direccion || "");
  const [lat, setLat] = useState(selectedPoint?.lat || -12.086);
  const [lng, setLng] = useState(selectedPoint?.lng || -77.07);
  const [nota, setNota] = useState(selectedPoint?.nota || "");

  useEffect(() => {
    if (selectedPoint) {
      setLat(selectedPoint.lat);
      setLng(selectedPoint.lng);
      setDireccion(selectedPoint.direccion);
      setNota(selectedPoint.nota);
      setNombre(selectedPoint.nombre);
    }
  }, [selectedPoint]);

  const handleAddressSearch = async () => {
    const geocodedPosition = await geocodeAddress(direccion);
    if (geocodedPosition) {
      setLat(geocodedPosition.lat);
      setLng(geocodedPosition.lng);
      onMapUpdate(geocodedPosition.lat, geocodedPosition.lng); // Actualiza el mapa y formulario
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: selectedPoint?.id, nombre, direccion, lat, lng, nota });
     setNombre("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="text-sm font-medium">Nombre del Punto</label>
        <Input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-sm font-medium">Dirección</label>
          <div className="flex gap-2">
          <Input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Ingrese la dirección"
            />
          <Button type="button" onClick={handleAddressSearch}>
            <Search className="h-4 w-4" />
          </Button>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <div>
          <label className="text-sm font-medium">Latitud</label>
          <Input type="number" value={lat} readOnly />
        </div>

        <div>
          <label className="text-sm font-medium">Longitud</label>
          <Input type="number" value={lng} readOnly />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Nota</label>
        <Input
          type="text"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Nota opcional"
        />
      </div>

      <div className="flex space-x-2">
        <Button type="button" variant="outline" className="w-1/2" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit"  className="w-1/2">
          Guardar
        </Button>
      </div>
    </form>
  );
}

// Función de geocodificación para obtener latitud y longitud desde la dirección
async function geocodeAddress(address) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
    return null;
  } catch (error) {
    console.error("Error en la geocodificación:", error);
    return null;
  }
}

// Función de geocodificación inversa para obtener la dirección desde latitud y longitud
async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data?.display_name || "";
  } catch (error) {
    console.error("Error en la geocodificación inversa:", error);
    return "";
  }
}
