import { motion } from "framer-motion";
import { FiGlobe, FiAward, FiUsers, FiHeart } from "react-icons/fi";
const stats = [
  {
    value: "10,000+",
    label: "Happy Travelers",
    icon: <FiUsers className="w-8 h-8" />,
  },
  {
    value: "50+",
    label: "Destinations",
    icon: <FiGlobe className="w-8 h-8" />,
  },
  {
    value: "15",
    label: "Years Experience",
    icon: <FiAward className="w-8 h-8" />,
  },
  {
    value: "98%",
    label: "Satisfaction Rate",
    icon: <FiHeart className="w-8 h-8" />,
  },
];
function Stats() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, staggerChildren: 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md p-8 mb-20"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        By The Numbers
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-gray-50 rounded-lg"
          >
            <div className="text-[#1784ad] mb-4 flex justify-center">
              {stat.icon}
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {stat.value}
            </h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Stats;
