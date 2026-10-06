// Google Gemini API Service for AI Travel Concierge & Structured Itinerary Generation

import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Google Generative AI instance if key exists
let genAI = null;
if (GEMINI_KEY && GEMINI_KEY.trim() !== "" && !GEMINI_KEY.includes("your_")) {
  try {
    genAI = new GoogleGenerativeAI(GEMINI_KEY);
  } catch (e) {
    console.warn("Failed to initialize GoogleGenerativeAI:", e);
  }
}

/**
 * Fallback Chat AI response generator for seamless offline / demo mode
 */
const getFallbackChatResponse = (userPrompt, destinationContext) => {
  const destName = destinationContext?.name || "your target destination";
  const promptLower = userPrompt.toLowerCase();

  if (promptLower.includes("how many days") || promptLower.includes("duration")) {
    return `For ${destName}, a 4 to 6-day trip is ideal! This gives you enough time to explore iconic landmarks in the morning, indulge in local cuisine for lunch, and experience vibrant evening culture without rushing.`;
  }
  if (promptLower.includes("food") || promptLower.includes("eat") || promptLower.includes("restaurant") || promptLower.includes("dish")) {
    return `When visiting ${destName}, make sure to try the authentic signature local dishes at neighborhood markets and top-rated local eateries. Ask locals for hidden culinary gems off the tourist track!`;
  }
  if (promptLower.includes("best time") || promptLower.includes("season") || promptLower.includes("weather") || promptLower.includes("when to visit")) {
    const bestTime = destinationContext?.bestTime || "spring and autumn";
    return `The absolute best time to visit ${destName} is around ${bestTime}, when the weather is pleasant, outdoor sightseeing is comfortable, and crowds are manageable.`;
  }
  if (promptLower.includes("budget") || promptLower.includes("cost") || promptLower.includes("expensive")) {
    return `Traveling in ${destName} can fit various budgets! Booking attraction tickets in advance and utilizing public transportation or walking tours will save you significant travel funds.`;
  }

  return `WanderSphere AI: ${destName} is an extraordinary location with rich culture, historic sites, and incredible sightseeing. Be sure to check out local famous attractions like ${destinationContext?.famousPlaces?.map(p => p.name).join(", ") || "the city center"}! What specific details would you like to plan next?`;
};

/**
 * Fallback Structured Itinerary generator
 */
const getFallbackItinerary = (destination, days = 3, interests = ["Sightseeing"]) => {
  const dayCount = parseInt(days, 10) || 3;
  const daysList = [];
  const interestText = interests.length > 0 ? interests.join(", ") : "General Exploration";

  const activityTemplates = [
    {
      morning: { title: "Iconic City Orientation & Landmarks", description: `Start Day 1 in ${destination} visiting top central landmarks and snapping photos before morning crowds arrive.` },
      afternoon: { title: "Local Culinary & Market Tour", description: `Indulge in authentic local food markets emphasizing ${interestText} and sample signature regional dishes.` },
      evening: { title: "Sunset Skyline & Waterfront Walk", description: "Unwind along picturesque waterfront promenades or high-altitude rooftop views with vibrant evening atmosphere." }
    },
    {
      morning: { title: "Cultural & Museum Deep Dive", description: `Explore premier museums, galleries, and historic architectural sites highlighting ${destination}'s legacy.` },
      afternoon: { title: "Neighborhood Exploration & Boutique Shopping", description: "Stroll through trendy artisan districts, local craft shops, and peaceful urban parks." },
      evening: { title: "Traditional Dinner & Performance", description: "Experience authentic local music, traditional dance, or fine dining at a renowned local venue." }
    },
    {
      morning: { title: "Nature Excursion & Scenic Vistas", description: "Head out to breathtaking botanical gardens, scenic hillsides, or serene coastlines for fresh air." },
      afternoon: { title: "Hidden Gems & Local Cafe Hopping", description: "Discover lesser-known courtyard cafes, historic tea rooms, and panoramic viewing spots." },
      evening: { title: "Farewell Gala & Night Market", description: "Conclude your memorable trip with souvenir shopping and a celebration dinner under neon lights." }
    }
  ];

  for (let i = 1; i <= dayCount; i++) {
    const templateIndex = (i - 1) % activityTemplates.length;
    const template = activityTemplates[templateIndex];

    daysList.push({
      dayNumber: i,
      title: `Day ${i}: ${destination} ${i === 1 ? 'Highlights' : i === 2 ? 'Culture & Gastronomy' : 'Nature & Secrets'}`,
      morning: {
        time: "09:00 AM - 12:30 PM",
        activity: template.morning.title,
        description: template.morning.description
      },
      afternoon: {
        time: "01:30 PM - 05:00 PM",
        activity: template.afternoon.title,
        description: template.afternoon.description
      },
      evening: {
        time: "06:30 PM - 09:30 PM",
        activity: template.evening.title,
        description: template.evening.description
      }
    });
  }

  return {
    destination,
    days: dayCount,
    interests,
    daysList
  };
};

/**
 * Chat with Gemini AI Travel Assistant
 */
export const chatWithTravelAI = async (userPrompt, destinationContext = null) => {
  if (!genAI) {
    // Return smart fallback answer
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate AI thinking delay
    return getFallbackChatResponse(userPrompt, destinationContext);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    let contextPrompt = "You are WanderSphere AI, an expert, enthusiastic travel assistant.";
    if (destinationContext) {
      contextPrompt += ` The user is currently viewing ${destinationContext.name}, ${destinationContext.country}. (Best time: ${destinationContext.bestTime}, Currency: ${destinationContext.currency}). Answer specifically and accurately about this destination. Keep answers structured, friendly, engaging, and concise (under 150 words).`;
    }

    const fullPrompt = `${contextPrompt}\n\nUser Question: ${userPrompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.warn("Gemini API call failed, falling back to smart AI response:", error);
    return getFallbackChatResponse(userPrompt, destinationContext);
  }
};

/**
 * Generate Structured Itinerary using Gemini AI
 */
export const generateStructuredItinerary = async (destination, days = 3, interests = []) => {
  const dayCount = parseInt(days, 10) || 3;

  if (!genAI) {
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate AI generation delay
    return getFallbackItinerary(destination, dayCount, interests);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const interestString = interests.length > 0 ? interests.join(", ") : "general sightseeing and culture";

    const prompt = `
Create a detailed ${dayCount}-day travel itinerary for ${destination} focusing on interests: ${interestString}.
Return ONLY valid JSON matching this exact structure without markdown backticks or commentary:
{
  "destination": "${destination}",
  "days": ${dayCount},
  "interests": ${JSON.stringify(interests)},
  "daysList": [
    {
      "dayNumber": 1,
      "title": "Short title for Day 1",
      "morning": {
        "time": "09:00 AM - 12:00 PM",
        "activity": "Specific activity name",
        "description": "Engaging 2-sentence description."
      },
      "afternoon": {
        "time": "01:30 PM - 05:00 PM",
        "activity": "Specific activity name",
        "description": "Engaging 2-sentence description."
      },
      "evening": {
        "time": "06:30 PM - 09:30 PM",
        "activity": "Specific activity name",
        "description": "Engaging 2-sentence description."
      }
    }
  ]
}
Ensure there are exactly ${dayCount} days in the daysList array.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean JSON response
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedData = JSON.parse(cleanedText);
    return parsedData;
  } catch (error) {
    console.warn("Gemini Itinerary Generation failed or parse error, using fallback itinerary:", error);
    return getFallbackItinerary(destination, dayCount, interests);
  }
};
