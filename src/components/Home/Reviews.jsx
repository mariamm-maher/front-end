import { motion } from "framer-motion";
import ReviewCard from "./Review";
import { StarIcon } from "@heroicons/react/24/solid";

const reviews = [
  {
    id: 1,
    name: "Mariam Ali",
    role: "Travel Blogger",
    avatar: "/avatars/1.jpg",
    message:
      "This trip exceeded all expectations! The guides were incredibly knowledgeable and made every moment special.",
    rating: 5,
    date: "2 weeks ago",
    destination: "Bali Adventure",
  },
  {
    id: 2,
    name: "Omar H.",
    role: "Photographer",
    avatar: "/avatars/2.jpg",
    message:
      "Exceptional organization from start to finish. The local experiences were authentic and memorable.",
    rating: 4,
    date: "1 month ago",
    destination: "Japan Cultural Tour",
  },
  {
    id: 3,
    name: "Fatima Z.",
    role: "Frequent Traveler",
    avatar: "/avatars/3.jpg",
    message:
      "Beautiful destinations and mostly great experiences. The tour leaders were fantastic.",
    rating: 4,
    date: "3 weeks ago",
    destination: "European Highlights",
  },
  {
    id: 4,
    name: "Ahmed K.",
    role: "Business Executive",
    avatar: "/avatars/4.jpg",
    message:
      "The luxury experience was worth every penny. Attention to detail was remarkable.",
    rating: 5,
    date: "2 months ago",
    destination: "African Safari",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

function ReviewsSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#232e3a] mb-4">
            Travelers Reviews
          </h2>
          <div className="w-20 h-1 bg-[#1784ad] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear what our adventurers say about their experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reviews.map((review) => (
            <motion.div key={review.id} variants={itemVariants}>
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center bg-[#1784ad] rounded-lg px-8 py-3 shadow-md">
            <StarIcon className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="text-white font-medium">
              Average Rating: <strong>4.7</strong> (128 reviews)
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ReviewsSection;
