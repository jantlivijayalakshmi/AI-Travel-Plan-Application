// Unsplash API Service for Dynamic Destination & Landmark Photos

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = "https://api.unsplash.com/search/photos";

/**
 * Curated Fallback Image Repository for popular destinations & travel queries
 */
const DEFAULT_IMAGES = {
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
  tokyo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
  "new york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
  bengaluru: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  city: "https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=1200&q=80",
  generic: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
};

/**
 * Helper to match query string to default fallback image
 */
const getFallbackImage = (query) => {
  if (!query) return DEFAULT_IMAGES.generic;
  const qLower = query.toLowerCase();

  for (const [key, url] of Object.entries(DEFAULT_IMAGES)) {
    if (qLower.includes(key)) return url;
  }
  return DEFAULT_IMAGES.generic;
};

/**
 * Fetch dynamic image from Unsplash API by Search Query
 */
export const fetchDynamicImage = async (query, fallback = null) => {
  const fallbackUrl = fallback || getFallbackImage(query);

  if (!UNSPLASH_KEY || UNSPLASH_KEY.trim() === "" || UNSPLASH_KEY.includes("your_")) {
    return fallbackUrl;
  }

  try {
    const response = await fetch(
      `${BASE_URL}?query=${encodeURIComponent(query + " travel")}&per_page=1&orientation=landscape&client_id=${UNSPLASH_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular || data.results[0].urls.full || fallbackUrl;
    }

    return fallbackUrl;
  } catch (error) {
    console.warn(`Unsplash fetch failed for "${query}":`, error.message);
    return fallbackUrl;
  }
};
