import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
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

export default function GoogleMapComponent({
  onLocationSelect,
  initialMarker,
}) {
  const [marker, setMarker] = useState(initialMarker || null);

  const handleMapClick = (event) => {
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;
    setMarker({ lat, lng });
    if (onLocationSelect) onLocationSelect({ lat, lng });
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Map
        style={containerStyle}
        defaultCenter={defaultCenter}
        defaultZoom={13}
        onClick={handleMapClick}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
      >
        {marker && <AdvancedMarker position={marker} />}
      </Map>
    </APIProvider>
  );
}
