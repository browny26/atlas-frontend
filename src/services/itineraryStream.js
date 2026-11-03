import { itineraryAPI } from "./api";

/**
 * Generates an itinerary with Server-Sent Events: `onDay` is called for each day as soon
 * as the AI has written it, so the user sees the plan appear progressively.
 * Resolves with the final itinerary (authoritative: it replaces the streamed days).
 *
 * EventSource only supports GET, so the stream is read from fetch() manually.
 * If streaming is not available, it falls back to the classic POST /generate.
 */
export async function generateItineraryStream(data, handlers = {}) {
  const token = localStorage.getItem("token");
  let response = await openStream(data, token);

  // Generation is public: an expired session must not block it, so retry anonymously.
  if (response?.status === 401 && token) {
    response = await openStream(data, null);
  }
  if (!response || response.status === 404 || response.status === 405) {
    return generateWithoutStreaming(data);
  }
  if (!response.ok || !response.body) {
    throw new Error(await errorMessage(response));
  }
  return readEvents(response, handlers);
}

/** The token is optional: when present, rate limits apply per user instead of per IP. */
async function openStream(data, token) {
  try {
    return await fetch(
      `${import.meta.env.VITE_BE_URL}/v1/api/itinerary/generate/stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      }
    );
  } catch {
    return null; // network error: try the classic endpoint
  }
}

async function readEvents(response, { onDay, onStatus }) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    // SSE allows CRLF line endings. A trailing "\r" may be the first half of a "\r\n"
    // split across two chunks, so only complete pairs are normalized.
    buffer = (buffer + decoder.decode(value, { stream: true })).replace(
      /\r\n/g,
      "\n"
    );

    // Events are separated by a blank line.
    let separator;
    while ((separator = buffer.indexOf("\n\n")) !== -1) {
      const rawEvent = buffer.slice(0, separator);
      buffer = buffer.slice(separator + 2);
      const { event, payload } = parseEvent(rawEvent);
      if (!payload) continue;

      if (event === "day") onDay?.(payload);
      else if (event === "status") onStatus?.(payload.message);
      else if (event === "result") return payload.itinerary;
      else if (event === "error") throw new Error(payload.message);
    }
  }
  throw new Error("The itinerary generation was interrupted. Please try again.");
}

function parseEvent(rawEvent) {
  let event = "message";
  const data = [];
  for (const line of rawEvent.split("\n")) {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    else if (line.startsWith("data:")) data.push(line.slice(5).trim());
  }
  try {
    return { event, payload: data.length ? JSON.parse(data.join("")) : null };
  } catch {
    return { event, payload: null };
  }
}

async function errorMessage(response) {
  if (response.status === 429) {
    return "Too many itinerary requests. Please wait a moment and try again.";
  }
  try {
    const body = await response.json();
    return body.message || "Failed to generate itinerary";
  } catch {
    return "Failed to generate itinerary";
  }
}

async function generateWithoutStreaming(data) {
  const res = await itineraryAPI.generateItinerary(data);
  if (!res.data?.success) throw new Error("Failed to generate itinerary");
  return res.data.itinerary;
}
