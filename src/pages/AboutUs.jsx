import { motion } from "framer-motion";

import TeamMember from "../components/aboutUs/team";
import Hero from "../components/aboutUs/Hero";
import Stats from "../components/aboutUs/Stats";
const AboutUs = () => {
  const team = [
    {
      id: 1,
      name: "Mariam maher",
      role: "Founder & CEO",
      bio: "Passionate about sustainable travel with 20 years in the industry.",
      image: "/team/sarah.jpg",
    },
    {
      id: 2,
      name: "dannah safwat",
      role: "Head of Operations",
      bio: "Expert in logistics and creating seamless travel experiences.",
      image: "/team/michael.jpg",
    },
    {
      id: 3,
      name: "mariam And Dannah",
      role: "Travel Designer",
      bio: "Crafts personalized itineraries that exceed expectations.",
      image: "/team/emma.jpg",
    },
    {
      id: 4,
      name: "Dannah and mariam ",
      role: "Customer Experience",
      bio: "Ensures every traveler feels valued and supported.",
      image: "/team/david.jpg",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Our Team */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Meet The Team
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our passionate team of travel experts brings decades of combined
            experience to craft your perfect journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <Stats />
      </div>
    </div>
  );
};

export default AboutUs;
