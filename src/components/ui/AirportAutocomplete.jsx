import React, { useState, useRef, useEffect } from "react";

const AirportAutocomplete = ({
  value,
  onChange,
  placeholder = "Search airport or city...",
  className = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSelecting) return;

    if (inputValue.length > 2) {
      const timeoutId = setTimeout(() => {
        searchAirports(inputValue);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [inputValue, isSelecting]);

  const searchAirports = async (query) => {
    if (!query || query.length < 2 || isSelecting) return;

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/amadeus/airport-and-city-search?subType=AIRPORT&keyword=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) throw new Error("Failed to fetch airports");

      const data = await response.json();
      setSuggestions(data.data || []);
      setIsOpen(true);
    } catch (error) {
      console.error("Error searching airports:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedAirport(null);
    setIsSelecting(false);

    if (value === "") {
      onChange("");
    }
  };

  const handleSelect = (airport) => {
    setIsSelecting(true);
    setSelectedAirport(airport);
    setInputValue(formatAirportDisplay(airport));
    setSuggestions([]);
    setIsOpen(false);
    onChange(airport.iataCode);

    setTimeout(() => setIsSelecting(false), 100);
  };

  const handleFocus = () => {
    if (inputValue.length > 1 && !selectedAirport) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  const clearSelection = () => {
    setSelectedAirport(null);
    setInputValue("");
    setSuggestions([]);
    onChange("");
    inputRef.current?.focus();
  };

  const formatAirportDisplay = (airport) => {
    if (!airport) return "";
    return `${airport.address.cityName} (${airport.iataCode}) - ${airport.name}`;
  };

  const formatDetailedName = (detailedName) => {
    return detailedName.replace(/.*?:/, "").trim();
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`border-b border-gray-300 text-gray-900 text-sm block w-full p-2.5 focus:outline-none focus:border-blue-500 bg-transparent ${className}`}
          placeholder={placeholder}
        />
        {loading && (
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
        {selectedAirport && (
          <button
            type="button"
            onClick={clearSelection}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && (suggestions.length > 0 || loading) && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 shadow-lg mt-1 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <div className="text-sm mt-1">Searching airports...</div>
            </div>
          ) : (
            suggestions.map((airport) => (
              <button
                key={airport.id}
                type="button"
                onClick={() => handleSelect(airport)}
                className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 flex items-center">
                      {airport.address.cityName}
                      <span className="text-blue-600 ml-2 font-mono text-sm bg-blue-50 px-1 rounded">
                        {airport.iataCode}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {formatDetailedName(airport.detailedName)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {airport.address.countryName}
                      {airport.analytics?.travelers?.score && (
                        <span className="ml-2 text-orange-500">
                          • Popularity: {airport.analytics.travelers.score}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {isOpen &&
        !loading &&
        inputValue.length > 2 &&
        suggestions.length === 0 && (
          <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 shadow-lg mt-1 p-3 text-gray-500 text-sm">
            No airports found for "{inputValue}"
          </div>
        )}
    </div>
  );
};

export default AirportAutocomplete;
