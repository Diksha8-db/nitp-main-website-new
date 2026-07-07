import axios from "axios";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const BASE_URL = BACKEND_API_URL.replace(/\/$/, "");
const REQUEST_TIMEOUT = 10_000; // 10 seconds

// Create a pre-configured Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

/**
 * Safely handles the axios request, uniformly logs errors, and returns data.
 */
async function handleFetch(config, fallbackValue, errorContext = {}) {
  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    let errorMessage = error.message;

    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      errorMessage = `Request timed out after ${REQUEST_TIMEOUT}ms`;
    } else if (error.response) {
      errorMessage = `API request failed (${error.response.status} ${error.response.statusText})`;
    }

    console.error("API Error:", {
      url: config.url,
      message: errorMessage,
      ...errorContext,
    });
    
    return fallbackValue;
  }
}

// --- Public API Functions ---
// Fetches all clubs.
export async function getClubs() {
  return await handleFetch({ url: "/api/club", params: { type: "all" } }, []);
}

// Fetches a specific club by its ID and explicitly arranges its member data by most recent session.
export async function getClub(id) {
  if (!id) return null;
  const clubData = await handleFetch({ url: "/api/club", params: { type: id } }, null, { id });

  // Arrange member session data if present
  if (clubData && clubData.members && typeof clubData.members === "object") {
    const sortedMembers = {};
    
    Object.keys(clubData.members)
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }))
      .forEach((key) => {
        sortedMembers[key] = clubData.members[key];
      });

    clubData.members = sortedMembers;
  }

  return clubData;
}

// Fetches all Events of a specific club by its ID.
export async function getEvents(clubId) {
  if (!clubId) return [];

  const data = await handleFetch({ url: "/api/club/events", params: { club: clubId } }, { data: [] }, { clubId });
  return data?.data || [];
}

// Fetches a specific Event by its ID.
export async function getEvent(id) {
  if (!id) return null;

  const data = await handleFetch({ url: "/api/club/event", params: { id } }, null, { id });
  return data?.data || null;
}