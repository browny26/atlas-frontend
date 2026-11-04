import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useRef, useState } from "react";

// Leaflet resolves its default marker images from the CSS path, which breaks with
// bundlers: point it to the images imported through Vite instead.
const markerPin = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "12px",
};

const defaultCenter = {
  lat: 41.397158,
  lng: 2.160873,
};

const LOCATION_ERRORS = {
  1: "Location access was denied. You can allow it in your browser settings, or click on the map.",
  2: "Your location is not available right now. Click on the map instead.",
  3: "Finding your location took too long. Please try again, or click on the map.",
};

function ClickHandler({ onClick }) {
  useMapEvents({ click: (event) => onClick(event.latlng) });
  return null;
}

/**
 * Asks for the browser's location only when the user presses the button: the browser
 * shows its own permission prompt the first time.
 */
function LocateButton({ onLocate }) {
  const map = useMap();
  const ref = useRef(null);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");

  // Leaflet listens on the map's own DOM, before React: stop clicks on the button there,
  // or they would also move the marker under it.
  useEffect(() => {
    L.DomEvent.disableClickPropagation(ref.current);
  }, []);

  const locate = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support location. Click on the map instead.");
      return;
    }
    setLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);
        const point = { lat: coords.latitude, lng: coords.longitude };
        map.flyTo(point, 15);
        onLocate(point);
      },
      (err) => {
        setLocating(false);
        setError(LOCATION_ERRORS[err.code] || LOCATION_ERRORS[2]);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <div
      ref={ref}
      className="absolute top-3 right-3 z-[1000] flex max-w-xs flex-col items-end gap-2"
    >
      <button
        type="button"
        onClick={locate}
        disabled={locating}
        className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-md hover:bg-gray-50 disabled:cursor-wait disabled:opacity-70"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="3" />
          <path strokeLinecap="round" d="M12 2v3m0 14v3M2 12h3m14 0h3" />
          <circle cx="12" cy="12" r="7" />
        </svg>
        {locating ? "Locating..." : "Use my location"}
      </button>
      {error && (
        <p className="rounded-lg bg-white px-3 py-2 text-xs text-red-600 shadow-md">
          {error}
        </p>
      )}
    </div>
  );
}

export default function MapComponent({ onLocationSelect, initialMarker, radiusKm }) {
  const [marker, setMarker] = useState(initialMarker || null);

  const selectLocation = ({ lat, lng }) => {
    setMarker({ lat, lng });
    if (onLocationSelect) onLocationSelect({ lat, lng });
  };

  return (
    // "isolate" keeps Leaflet's z-indexes (up to 1000) below the app's dropdowns and modals
    <div className="relative isolate w-full">
      <MapContainer
        style={containerStyle}
        center={initialMarker || defaultCenter}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <ClickHandler onClick={selectLocation} />
        <LocateButton onLocate={selectLocation} />
        {marker && <Marker position={marker} icon={markerPin} />}
        {marker && radiusKm && (
          <Circle
            center={marker}
            radius={radiusKm * 1000}
            pathOptions={{ color: "#2563eb", weight: 1, fillOpacity: 0.08 }}
            interactive={false}
          />
        )}
      </MapContainer>
    </div>
  );
}
