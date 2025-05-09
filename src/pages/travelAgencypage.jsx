import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import Hero from "../components/TravelAgencySinglePage/Hero";
import TripCard from "../components/TravelAgencySinglePage/TripCard";
import Contact from "../components/TravelAgencySinglePage/Contact";
import About from "../components/TravelAgencySinglePage/About";

const AboutAgency = () => {
  // Agency information - replace with actual data
  const agencyInfo = {
    name: "Paradise Travels",
    description:
      "Specializing in luxury and adventure travel experiences since 2008. We craft unforgettable journeys tailored to your dreams.",
    founded: "2008",
    headquarters: "123 Ocean View Road, Miami, FL 33139, USA",
    email: "contact@paradisetravels.com",
    phone: "+1 (800) 555-1234",
    workingHours: "Mon-Fri: 9AM - 6PM | Sat: 10AM - 4PM | Sun: Closed",
    socialMedia: {
      facebook: "paradisetravels",
      instagram: "paradisetravels",
      twitter: "paradise_travel",
      linkedin: "paradise-travels",
    },
    specialties: [
      "Luxury Vacations",
      "Adventure Tours",
      "Honeymoon Packages",
      "Family Getaways",
      "Corporate Retreats",
    ],
    paymentMethods: [
      "Credit Cards",
      "Bank Transfer",
      "PayPal",
      "Cryptocurrency",
    ],
  };

  const featuredTrips = [
    {
      id: 1,
      name: "Bali Luxury Retreat",
      image: "https://images.unsplash.com/photo-1518544866330-95b331ed9cd1",
      duration: "7 days",
      price: "$2,499",
      dates: "Jun 15 - Jun 22, 2023",
      groupSize: "Small group (max 12)",
      description:
        "Experience Bali's finest resorts and hidden gems with our luxury package",
      highlights: [
        "Private villa accommodation",
        "Personalized guided tours",
        "Spa treatments included",
        "Gourmet dining experiences",
      ],
    },
    {
      id: 2,
      name: "Greek Islands Adventure",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d",
      duration: "10 days",
      price: "$3,199",
      dates: "Jul 5 - Jul 15, 2023",
      groupSize: "Small group (max 15)",
      description: "Sail through the stunning Greek islands with expert guides",
      highlights: [
        "Private yacht charter",
        "Local culinary experiences",
        "Historical site visits",
        "Snorkeling and water sports",
      ],
    },
    {
      id: 3,
      name: "Japanese Cultural Immersion",
      image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3",
      duration: "14 days",
      price: "$4,299",
      dates: "Apr 1 - Apr 15, 2023 (Cherry Blossom Season)",
      groupSize: "Small group (max 10)",
      description: "Deep dive into Japan's rich culture and traditions",
      highlights: [
        "Tea ceremony with master",
        "Ryokan stays",
        "Samurai sword experience",
        "Tokyo and Kyoto exploration",
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero agencyInfo={agencyInfo} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Agency Information Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* About Text */}
            <About agencyInfo={agencyInfo} />
            {/* Contact Card */}
            <Contact agencyInfo={agencyInfo} />
          </div>
        </motion.section>

        {/* Featured Trips */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Our Signature Trips
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Handcrafted itineraries designed by our travel experts
          </p>
          <div className="grid grid-cols-1 gap-8">
            {featuredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutAgency;
