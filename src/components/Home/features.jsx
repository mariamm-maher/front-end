import { motion } from "framer-motion";
import { useState } from "react";

// Sample images - replace with your actual imports
import feature1 from "../../assets/hiddenGem.jpg";
import feature2 from "../../assets/per.jpg";
import feature3 from "../../assets/book.jpg";

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      title: "Discover Hidden Gems",
      description:
        "Explore off-the-beaten-path destinations curated by our expert travel team. Our unique algorithms match you with locations tailored to your interests.",
      image: feature1,
      color: "#5c4664",
    },
    {
      title: "Personalized Itineraries",
      description:
        "Get custom travel plans designed around your preferences. We handle all the details so you can focus on the experience.",
      image: feature2,
      color: "#8b8178",
    },
    {
      title: "Seamless Booking",
      description:
        "Our integrated platform lets you book flights, hotels, and activities in one place with transparent pricing and no hidden fees.",
      image: feature3,
      color: "#1784ad",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge technology with human expertise to deliver
            unforgettable travel experiences.
          </p>
        </motion.div>

        {/* Features List */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-12`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-auto object-cover aspect-video"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-90"
                  style={{ backgroundColor: feature.color }}
                />
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2">
                <motion.div
                  whileHover={{ x: 5 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative"
                >
                  <div
                    className={`absolute -left-6 top-0 h-full w-1 rounded-full transition-all duration-300 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backgroundColor: feature.color }}
                  />
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{ color: feature.color }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    {feature.description}
                  </p>
                  <button
                    className="px-6 py-2 rounded-md font-medium transition-all duration-300 border-2 hover:shadow-lg"
                    style={{
                      borderColor: feature.color,
                      color: hoveredIndex === index ? "white" : feature.color,
                      backgroundColor:
                        hoveredIndex === index ? feature.color : "transparent",
                    }}
                  >
                    Learn More
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
