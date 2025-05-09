import { motion } from "framer-motion";
import team from "../../assets/team.jpeg";
const TeamMember = ({ member }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="h-64 overflow-hidden">
        <motion.img
          src={team}
          alt={member.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
        <p className="text-[#1784ad] font-medium mb-3">{member.role}</p>
        <p className="text-gray-600">{member.bio}</p>
      </div>
    </motion.div>
  );
};

export default TeamMember;
