export const trips = [
  {
    id: 1,
    title: "Ancient Rome Discovery",
    agency: "Heritage Travel Co.",
    date: "2023-09-15",
    time: "08:00 AM",
    location: "Rome, Italy",
    price: 1299,
    rating: 4.8,
    duration: "7 days",
    description:
      "Explore the Colosseum, Vatican City, and other ancient wonders with expert guides.",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1592&q=80",
  },
  {
    id: 2,
    title: "Amazon Rainforest Expedition",
    agency: "Wild Adventures",
    date: "2023-10-05",
    time: "06:30 AM",
    location: "Manaus, Brazil",
    price: 1899,
    rating: 4.9,
    duration: "10 days",
    description:
      "Deep jungle trekking with wildlife experts and indigenous community visits.",
    image:
      "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 3,
    title: "Luxury Maldives Escape",
    agency: "Azure Vacations",
    date: "2023-11-12",
    time: "10:00 AM",
    location: "Malé, Maldives",
    price: 3499,
    rating: 4.7,
    duration: "5 days",
    description:
      "Overwater bungalows with private butler service and gourmet dining.",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
  },
  {
    id: 4,
    title: "Japanese Cultural Journey",
    agency: "East Asia Tours",
    date: "2023-09-28",
    time: "09:00 AM",
    location: "Kyoto, Japan",
    price: 2199,
    rating: 4.9,
    duration: "8 days",
    description:
      "Tea ceremonies, temple stays, and authentic cultural experiences.",
    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1753&q=80",
  },
  {
    id: 5,
    title: "Safari Adventure in Tanzania",
    agency: "Wildlife Expeditions",
    date: "2023-10-22",
    time: "07:00 AM",
    location: "Serengeti, Tanzania",
    price: 2799,
    rating: 4.8,
    duration: "9 days",
    description: "Witness the great migration and stay in luxury safari camps.",
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
  },
  {
    id: 6,
    title: "Northern Lights Expedition",
    agency: "Arctic Adventures",
    date: "2023-11-30",
    time: "06:00 PM",
    location: "Tromsø, Norway",
    price: 1999,
    rating: 4.6,
    duration: "6 days",
    description:
      "Chase the aurora borealis with expert photographers and guides.",
    image:
      "https://images.unsplash.com/photo-1518631438104-75a343974608?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
  },
];
export const destinations = [
  {
    id: 1,
    name: "Rome, Italy",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1592&q=80",
    rating: 4.8,
    description:
      "The Eternal City with ancient ruins, Renaissance art, and vibrant street life.",
    tripsAvailable: 24,
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Roman Forum"],
    continent: "europe",
    types: ["cultural", "city"],
    priceRange: [800, 2500],
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1518544866330-95b331ed9cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.9,
    description:
      "Tropical paradise with lush jungles, volcanic mountains, and iconic beaches.",
    tripsAvailable: 18,
    highlights: [
      "Ubud",
      "Uluwatu Temple",
      "Tegallalang Rice Terraces",
      "Mount Batur",
    ],
    continent: "asia",
    types: ["adventure", "beach"],
    priceRange: [600, 1800],
  },
  {
    id: 3,
    name: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1753&q=80",
    rating: 4.7,
    description:
      "Traditional Japanese culture with temples, tea houses, and cherry blossoms.",
    tripsAvailable: 15,
    highlights: [
      "Fushimi Inari Shrine",
      "Kinkaku-ji",
      "Arashiyama Bamboo Forest",
      "Gion District",
    ],
    continent: "asia",
    types: ["cultural"],
    priceRange: [1000, 3000],
  },
  {
    id: 4,
    name: "Santorini, Greece",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.9,
    description:
      "Stunning white-washed buildings with blue domes overlooking the Aegean Sea.",
    tripsAvailable: 12,
    highlights: [
      "Oia Sunset",
      "Red Beach",
      "Ancient Thera",
      "Santorini Caldera",
    ],
    continent: "europe",
    types: ["beach", "luxury"],
    priceRange: [1200, 3500],
  },
  {
    id: 5,
    name: "Serengeti, Tanzania",
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
    rating: 4.8,
    description:
      "Vast savannas teeming with wildlife and the great wildebeest migration.",
    tripsAvailable: 8,
    highlights: [
      "Great Migration",
      "Ngorongoro Crater",
      "Balloon Safari",
      "Big Five",
    ],
    continent: "africa",
    types: ["wildlife", "adventure"],
    priceRange: [1500, 5000],
  },
  {
    id: 6,
    name: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.6,
    description:
      "The city that never sleeps with iconic landmarks and cultural diversity.",
    tripsAvailable: 22,
    highlights: [
      "Statue of Liberty",
      "Central Park",
      "Times Square",
      "Broadway",
    ],
    continent: "americas",
    types: ["city"],
    priceRange: [900, 2800],
  },
];
export const continents = [
  { id: "all", label: "All Continents" },
  { id: "europe", label: "Europe" },
  { id: "asia", label: "Asia" },
  { id: "africa", label: "Africa" },
  { id: "americas", label: "Americas" },
  { id: "oceania", label: "Oceania" },
];

export const tripTypes = [
  { id: "all", label: "All Types" },
  { id: "cultural", label: "Cultural" },
  { id: "adventure", label: "Adventure" },
  { id: "beach", label: "Beach" },
  { id: "wildlife", label: "Wildlife" },
  { id: "city", label: "City Break" },
  { id: "luxury", label: "Luxury" },
];

export const priceRanges = [
  { id: "all", label: "Any Price", range: [0, 5000] },
  { id: "budget", label: "Budget (<$1000)", range: [0, 999] },
  { id: "midrange", label: "Mid-range ($1000-$2500)", range: [1000, 2500] },
  { id: "premium", label: "Premium ($2500+)", range: [2501, 5000] },
];

export const ratings = [
  { id: "all", label: "Any Rating", value: null },
  { id: "3plus", label: "3+ Stars", value: 3 },
  { id: "4plus", label: "4+ Stars", value: 4 },
  { id: "4.5plus", label: "4.5+ Stars", value: 4.5 },
];
