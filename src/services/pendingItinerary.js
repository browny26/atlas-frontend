import { itineraryAPI } from "./api";

// An itinerary generated as a guest, waiting to be saved once the user signs in.
const PENDING_ITINERARY_KEY = "pendingItinerary";
// How that save went, read once by the dashboard: { status: "saved" | "failed", destination }.
const SAVE_OUTCOME_KEY = "pendingItinerarySaveOutcome";

// sessionStorage can throw (blocked storage, some private modes): everything here is optional.
const storage = {
  get(key) {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // the user can generate the itinerary again
    }
  },
  remove(key) {
    try {
      sessionStorage.removeItem(key);
    } catch {
      // nothing to clean up
    }
  },
};

const parse = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const keepItineraryForLogin = (itinerary) =>
  storage.set(PENDING_ITINERARY_KEY, JSON.stringify(itinerary));

const save = async (user) => {
  const pending = parse(storage.get(PENDING_ITINERARY_KEY));
  if (!pending) return null;

  const destination = pending.destination || "your trip";
  try {
    await itineraryAPI.saveItinerary(user.id, pending);
    storage.remove(PENDING_ITINERARY_KEY);
    storage.set(SAVE_OUTCOME_KEY, JSON.stringify({ status: "saved", destination }));
    return "saved";
  } catch (err) {
    // Keep the itinerary so the user can retry from the dashboard.
    console.error("Could not save the pending itinerary:", err);
    storage.set(SAVE_OUTCOME_KEY, JSON.stringify({ status: "failed", destination }));
    return "failed";
  }
};

let inFlight = null;

/**
 * Saves the guest itinerary to the user's account. Overlapping calls (a double submit of
 * the sign-in form) share the same request, so the itinerary is saved only once.
 * Never throws: a failed save is not a failed sign-in. Resolves to "saved", "failed",
 * or null when there was nothing to save.
 */
export const savePendingItinerary = (user) => {
  if (!inFlight) {
    inFlight = save(user).finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
};

/** Returns the outcome of the last save once, then forgets it. */
export const takeSaveOutcome = () => {
  const outcome = parse(storage.get(SAVE_OUTCOME_KEY));
  storage.remove(SAVE_OUTCOME_KEY);
  return outcome;
};
