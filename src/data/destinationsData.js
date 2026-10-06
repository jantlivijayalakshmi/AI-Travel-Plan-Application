// Master Destinations & Famous Landmarks Dataset for WanderSphere

export const DESTINATIONS = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    category: "Cultural",
    rating: 4.9,
    shortDescription: "The City of Light, world-renowned for art, fashion, gastronomy, and iconic monuments.",
    fullDescription: "Paris, France's cosmopolitan capital, is one of Europe's major cities and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond iconic landmarks like the Eiffel Tower and the 12th-century Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
    bestTime: "June to August & September to October",
    recommendedDays: "4-5 Days",
    currency: "Euro (€)",
    language: "French",
    coordinates: { lat: 48.8566, lon: 2.3522 },
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "eiffel-tower",
        name: "Eiffel Tower",
        description: "The magnificent wrought-iron lattice tower on the Champ de Mars, symbol of Paris.",
        category: "Architectural Marvel",
        location: "Champ de Mars, 5 Avenue Anatole France, Paris",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "louvre-museum",
        name: "Louvre Museum",
        description: "The world's largest art museum and historic monument, home to the Mona Lisa.",
        category: "Art & History",
        location: "Rue de Rivoli, 75001 Paris",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "arc-de-triomphe",
        name: "Arc de Triomphe",
        description: "Historic monument honoring those who fought for France, standing at the western end of the Champs-Élysées.",
        category: "Historic Monument",
        location: "Place Charles de Gaulle, 75008 Paris",
        image: "https://images.unsplash.com/photo-1509299349698-ab22323ae696?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    category: "Luxury",
    rating: 4.8,
    shortDescription: "A futuristic metropolis known for ultra-modern architecture, luxury shopping, and vibrant nightlife.",
    fullDescription: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline. At its foot lies Dubai Fountain, with jets and lights choreographed to music. On artificial islands just offshore is Atlantis, The Palm, a resort with water and marine-animal parks.",
    bestTime: "November to April",
    recommendedDays: "4-6 Days",
    currency: "UAE Dirham (AED)",
    language: "Arabic & English",
    coordinates: { lat: 25.2048, lon: 55.2708 },
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "burj-khalifa",
        name: "Burj Khalifa",
        description: "The world's tallest skyscraper with awe-inspiring observation decks and panoramic desert views.",
        category: "Skyscraper & Deck",
        location: "1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
        image: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "palm-jumeirah",
        name: "Palm Jumeirah",
        description: "An iconic tree-shaped artificial archipelago featuring opulent beachfront resorts and dining.",
        category: "Island & Resort",
        location: "Jumeirah Coastal Area, Dubai",
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "dubai-marina",
        name: "Dubai Marina",
        description: "An affluent canal city complex with high-rise residential towers, yachts, and alfresco dining.",
        category: "Waterfront & Nightlife",
        location: "Dubai Marina Promenade, Dubai",
        image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    category: "Beach",
    rating: 4.9,
    shortDescription: "Tropical paradise featuring lush rice terraces, sacred sea temples, volcanic mountains, and coral reefs.",
    fullDescription: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats.",
    bestTime: "April to October",
    recommendedDays: "5-7 Days",
    currency: "Indonesian Rupiah (IDR)",
    language: "Indonesian & Balinese",
    coordinates: { lat: -8.4095, lon: 115.1889 },
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "uluwatu-temple",
        name: "Uluwatu Temple",
        description: "Perched atop a steep cliff approximately 70 meters above the roaring Indian Ocean.",
        category: "Sacred Temple",
        location: "Pecatu, South Kuta, Badung Regency, Bali",
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "tegallalang-rice-terrace",
        name: "Tegallalang Rice Terrace",
        description: "Famous for its emerald-green terraced rice fields sculpted into steep hillsides.",
        category: "Nature & Heritage",
        location: "Jl. Raya Tegallalang, Gianyar, Bali",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "seminyak-beach",
        name: "Seminyak Beach",
        description: "Sophisticated beach area filled with sunset lounges, golden sand, and vibrant surf spots.",
        category: "Beach & Lounge",
        location: "Seminyak, Kuta, Badung Regency, Bali",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    category: "Urban",
    rating: 4.9,
    shortDescription: "A captivating mix of ultra-modern neon skyscrapers, historic temples, and world-class culinary delights.",
    fullDescription: "Tokyo, Japan's bustling capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amidst large public gardens. The city is famed for its vibrant street life, pop culture, electronic districts, and Michelin-starred dining.",
    bestTime: "March to May & September to November",
    recommendedDays: "5-7 Days",
    currency: "Japanese Yen (¥)",
    language: "Japanese",
    coordinates: { lat: 35.6762, lon: 139.6503 },
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "tokyo-tower",
        name: "Tokyo Tower",
        description: "Eiffel Tower-inspired communications and observation tower illuminated in bright orange and red.",
        category: "Landmark & Viewpoint",
        location: "4-2-8 Shibakoen, Minato City, Tokyo",
        image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "shibuya-crossing",
        name: "Shibuya Crossing",
        description: "The world's busiest pedestrian intersection surrounded by gigantic video screens and neon lights.",
        category: "Urban Culture",
        location: "Shibuya City, Tokyo",
        image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "senso-ji-temple",
        name: "Senso-ji Temple",
        description: "Tokyo's oldest and most significant Buddhist temple located in the charming historic Asakusa district.",
        category: "Historic Temple",
        location: "2-3-1 Asakusa, Taito City, Tokyo",
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    category: "Heritage",
    rating: 4.8,
    shortDescription: "A royal global metropolis steeped in two millennia of history, theater, museums, and royal parks.",
    fullDescription: "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic 'Big Ben' clock tower and Westminster Abbey, site of British monarch coronations. Across the River Thames, the London Eye observation wheel provides panoramic views of the South Bank cultural complex.",
    bestTime: "May to September",
    recommendedDays: "4-6 Days",
    currency: "British Pound (£)",
    language: "English",
    coordinates: { lat: 51.5074, lon: -0.1278 },
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "big-ben",
        name: "Big Ben & Westminster",
        description: "The iconic clock tower at the north end of the Houses of Parliament, a global symbol of Britain.",
        category: "Royal Heritage",
        location: "Westminster, London SW1A 0AA",
        image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "london-eye",
        name: "London Eye",
        description: "Europe's tallest cantilevered observation wheel on the South Bank of the River Thames.",
        category: "Attraction",
        location: "Riverside Building, County Hall, London",
        image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "tower-bridge",
        name: "Tower Bridge",
        description: "Historic Victorian bascule bridge featuring high-level glass walkways across the Thames.",
        category: "Architectural Icon",
        location: "Tower Bridge Rd, London SE1 2UP",
        image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    category: "Heritage",
    rating: 4.9,
    shortDescription: "The Eternal City, overflowing with ancient ruins, Renaissance art, magnificent fountains, and gelato.",
    fullDescription: "Rome, Italy's capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire. Vatican City, headquarters of the Roman Catholic Church, has St. Peter's Basilica and the Vatican Museums.",
    bestTime: "April to June & September to October",
    recommendedDays: "3-5 Days",
    currency: "Euro (€)",
    language: "Italian",
    coordinates: { lat: 41.9028, lon: 12.4964 },
    heroImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "colosseum",
        name: "The Colosseum",
        description: "The colossal stone amphitheater built under the Flavian emperors of the Roman Empire.",
        category: "Ancient Ruin",
        location: "Piazza del Colosseo, 1, 00184 Roma RM",
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "trevi-fountain",
        name: "Trevi Fountain",
        description: "Baroque masterpiece fountain where visitors toss coins to ensure their return to Rome.",
        category: "Baroque Fountain",
        location: "Piazza di Trevi, 00187 Roma RM",
        image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "vatican-city",
        name: "Vatican City & St. Peter's",
        description: "The heart of Catholicism home to Michelangelo's Sistine Chapel ceiling and grand square.",
        category: "Sacred & Art",
        location: "Vatican City, Rome",
        image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    region: "North America",
    category: "Urban",
    rating: 4.8,
    shortDescription: "The city that never sleeps, driven by Broadway theater, skyscraper skylines, and Central Park.",
    fullDescription: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park. Broadway theater is staged in neon-lit Times Square.",
    bestTime: "April to June & September to November",
    recommendedDays: "4-6 Days",
    currency: "US Dollar ($)",
    language: "English",
    coordinates: { lat: 40.7128, lon: -74.0060 },
    heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "statue-of-liberty",
        name: "Statue of Liberty",
        description: "A colossal neoclassical sculpture on Liberty Island symbolizing freedom and international friendship.",
        category: "National Monument",
        location: "Liberty Island, New York, NY 10004",
        image: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "central-park",
        name: "Central Park",
        description: "An 843-acre urban oasis in the heart of Manhattan featuring lakes, bridges, and walking paths.",
        category: "Urban Park",
        location: "Central Park, New York, NY",
        image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "times-square",
        name: "Times Square",
        description: "The bustling commercial and entertainment hub famous for its giant billboards and Broadway theaters.",
        category: "Entertainment",
        location: "Broadway & 7th Ave, New York, NY 10036",
        image: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    country: "India",
    region: "Asia",
    category: "Nature",
    rating: 4.7,
    shortDescription: "India's Silicon Valley and Garden City, famous for pleasant weather, green parks, and craft breweries.",
    fullDescription: "Bengaluru (also called Bangalore) is the capital of India's southern Karnataka state. The center of India's high-tech industry, the city is also known for its parks and nightlife. By Vidhana Soudha, a Neo-Dravidian legislative building, sits Cubbon Park. Former royal residences include 19th-century Bangalore Palace, modeled after England's Windsor Castle, and Tipu Sultan's Summer Palace.",
    bestTime: "October to February",
    recommendedDays: "3-4 Days",
    currency: "Indian Rupee (₹)",
    language: "Kannada & English",
    coordinates: { lat: 12.9716, lon: 77.5946 },
    heroImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80",
    famousPlaces: [
      {
        id: "lalbagh-botanical-garden",
        name: "Lalbagh Botanical Garden",
        description: "A 240-acre historic garden featuring a famous glass house inspired by London's Crystal Palace.",
        category: "Botanical Garden",
        location: "Mavalli, Bengaluru, Karnataka 560004",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "bangalore-palace",
        name: "Bangalore Palace",
        description: "A magnificent Tudor-style palace constructed by the Wadiyar Dynasty with sprawling grounds.",
        category: "Royal Heritage",
        location: "Vasanth Nagar, Bengaluru, Karnataka 560052",
        image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "cubbon-park",
        name: "Cubbon Park",
        description: "A landmark green lung in the heart of the city brimming with vibrant flora and historic colonial buildings.",
        category: "Nature Reserve",
        location: "Kasturba Road, Sampangi Rama Nagara, Bengaluru",
        image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

export const CATEGORIES = [
  "All",
  "Cultural",
  "Luxury",
  "Beach",
  "Urban",
  "Heritage",
  "Nature"
];

export const REGIONS = [
  "All",
  "Europe",
  "Asia",
  "Middle East",
  "North America"
];
