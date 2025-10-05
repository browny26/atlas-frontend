import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "12px",
};

const defaultCenter = {
  lat: 41.397158,
  lng: 2.160873,
};

export default function GoogleMapComponent({ onLocationSelect }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY, // la tua chiave
  });

  const [marker, setMarker] = useState(null);

  const handleClick = useCallback(
    (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarker({ lat, lng });
      onLocationSelect(lat, lng);
    },
    [onLocationSelect]
  );

  if (!isLoaded) return <p>Caricamento mappa...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={13}
      onClick={handleClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  );
}
