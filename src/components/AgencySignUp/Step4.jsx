import { motion } from "framer-motion";
import { FiGlobe } from "react-icons/fi";
import { useSelector } from "react-redux";

const Step4 = ({ handleChange }) => {
  const { formData } = useSelector((state) => state.agencyForm);

  return (
    <>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="col-span-2"
      >
        <h3 className="text-lg font-medium text-white mb-3">
          Social Media Links (Optional)
        </h3>

        <div className="space-y-4">
          <div className="relative">
            <FiGlobe className="absolute left-3 top-3 text-white/60" />
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
              placeholder="Website URL"
            />
          </div>

          <div className="relative">
            <FiGlobe className="absolute left-3 top-3 text-white/60" />
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
              placeholder="Facebook Page"
            />
          </div>

          <div className="relative">
            <FiGlobe className="absolute left-3 top-3 text-white/60" />
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
              placeholder="Instagram Profile"
            />
          </div>

          <div className="relative">
            <FiGlobe className="absolute left-3 top-3 text-white/60" />
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
              placeholder="Twitter Profile"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Step4;
