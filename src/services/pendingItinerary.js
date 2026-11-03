import { itineraryAPI } from "./api";

// An itinerary generated as a guest, waiting to be saved once the user signs in.
const PENDING_ITINERARY_KEY = "pendingItinerary";
export const PENDING_SAVED_KEY = "pendingItinerarySaved";

export const keepItineraryForLogin = (itinerary) => {
  try {
    sessionStorage.setItem(PENDING_ITINERARY_KEY, JSON.stringify(itinerary));
  } catch {
    // storage unavailable (private mode): the user can generate it again
  }
};

export const savePendingItinerary = async (user) => {
  let pending = null;
  try {
    pending = JSON.parse(sessionStorage.getItem(PENDING_ITINERARY_KEY));
  } catch {
    return;
  }
  if (!pending) return;
  try {
    await itineraryAPI.saveItinerary(user.id, pending);
    sessionStorage.removeItem(PENDING_ITINERARY_KEY);
    sessionStorage.setItem(PENDING_SAVED_KEY, pending.destination || "your trip");
  } catch (err) {
    console.error("Could not save the pending itinerary:", err);
  }
};
