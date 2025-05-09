import { FiStar } from "react-icons/fi";

function About({ agencyInfo }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
      <p className="text-gray-600 mb-6">
        Founded in {agencyInfo.founded}, {agencyInfo.name} has grown from a
        small local agency to an internationally recognized travel specialist.
        Our team of passionate travel experts handcrafts each itinerary to
        ensure unforgettable experiences.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Our Specialties
      </h3>
      <ul className="grid grid-cols-2 gap-3 mb-8">
        {agencyInfo.specialties.map((specialty, index) => (
          <li key={index} className="flex items-center">
            <FiStar className="text-[#1784ad] mr-2" />
            <span className="text-gray-700">{specialty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About;
