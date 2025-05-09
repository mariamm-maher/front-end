import { motion } from "framer-motion";

import Hero from "../components/destinations/Hero";

import Destination from "../components/destinations/destination";
// Sample static data (replace with your actual data)
const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: "../assets/ad7.jpg",
    rating: 4.8,
    location: "Cyclades, Greece",
    trips: [
      { id: 1, name: "Sunset Cruise Experience", duration: 3, price: 299 },
      { id: 2, name: "Volcano & Hot Springs Tour", duration: 5, price: 450 },
      { id: 3, name: "Luxury Villa Stay", duration: 7, price: 1200 },
    ],
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "../assets/ad7.jpg",
    rating: 4.9,
    location: "Kansai Region, Japan",
    trips: [
      { id: 1, name: "Temple & Garden Tour", duration: 4, price: 350 },
      { id: 2, name: "Traditional Tea Ceremony", duration: 2, price: 150 },
    ],
  },
  // Add more destinations as needed
];

function Destinations() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero />

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Destination Gallery */}
        <div className="grid grid-cols-1  gap-8 auto-rows-[24rem]">
          {destinations.map((destination) => (
            <Destination key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Destinations;
