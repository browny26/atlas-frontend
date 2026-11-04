// Free flight-price APIs are gone (Amadeus closed its self-service APIs in July 2026), so
// the search is handed to comparison sites with the route, dates and passengers prefilled.

/**
 * Checks a flight search before it is shown. Returns an error message, or null when valid.
 * yyyy-MM-dd strings compare correctly as text.
 */
export function validateFlightSearch({ origin, destination, departDate, returnDate }) {
  if (!origin || !destination || !departDate) {
    return "Please fill in origin, destination and departure date";
  }
  if (origin === destination) {
    return "The origin and destination airport must be different";
  }
  if (returnDate && returnDate < departDate) {
    return "The return date must be on or after the departure date";
  }
  return null;
}

const compact = (isoDate) => isoDate.slice(2).replaceAll("-", ""); // 2026-12-01 -> 261201

/**
 * @param {{origin: string, destination: string, departDate: string, returnDate?: string, adults?: number|string}} search
 *   IATA codes and yyyy-MM-dd dates
 * @returns {{provider: string, url: string}[]}
 */
export function flightSearchLinks({ origin, destination, departDate, returnDate, adults }) {
  const from = origin.toUpperCase();
  const to = destination.toUpperCase();
  const passengers = Math.min(9, Math.max(1, Number(adults) || 1));

  const googleQuery = `Flights from ${from} to ${to} on ${departDate}${
    returnDate ? ` through ${returnDate}` : " one way"
  } for ${passengers} adult${passengers > 1 ? "s" : ""}`;

  const skyscannerDates = returnDate
    ? `${compact(departDate)}/${compact(returnDate)}`
    : compact(departDate);

  const kayakDates = returnDate ? `${departDate}/${returnDate}` : departDate;
  const kayakPassengers = passengers > 1 ? `/${passengers}adults` : "";

  return [
    {
      provider: "Google Flights",
      url: `https://www.google.com/travel/flights?q=${encodeURIComponent(googleQuery)}`,
    },
    {
      provider: "Skyscanner",
      url: `https://www.skyscanner.net/transport/flights/${from.toLowerCase()}/${to.toLowerCase()}/${skyscannerDates}/?adultsv2=${passengers}`,
    },
    {
      provider: "Kayak",
      url: `https://www.kayak.com/flights/${from}-${to}/${kayakDates}${kayakPassengers}`,
    },
  ];
}
