import { motion } from "framer-motion";
import { FiLock, FiEye, FiEyeOff, FiUpload, FiImage } from "react-icons/fi";
import { useState, useRef } from "react";

const Step3 = ({ formData, handleChange, handlePhotoChange, photoPreview }) => {
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="col-span-2"
      >
        <h3 className="text-lg font-medium text-white mb-5">
          Profile Photo (Optional)
        </h3>

        <div className="flex flex-col items-center justify-center">
          <div
            className="relative cursor-pointer mx-auto w-32 h-32 rounded-full overflow-hidden border-2 border-white/30 hover:border-[#1784ad] transition-all"
            onClick={triggerFileInput}
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-white/10">
                <FiImage className="text-white/60 text-4xl" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <FiUpload className="text-white text-xl" />
            </div>
          </div>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            accept="image/*"
            className="hidden"
          />
          <p className="text-sm text-white/60 mt-3">
            Click to upload your agency logo or profile photo (optional)
          </p>
          <p className="text-xs text-white/50 mt-1">
            Recommended: Square image, max 5MB
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center justify-center w-full"
      >
        <label className="block text-sm font-medium text-white/80 mb-2 self-start">
          Password *
        </label>
        <div className="relative w-full max-w-md">
          <FiLock className="absolute left-3 top-3 text-white/60" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-[#1784ad]/50 focus:border-transparent"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3"
          >
            {showPassword ? (
              <FiEyeOff className="text-white/60 hover:text-white/90 transition-colors" />
            ) : (
              <FiEye className="text-white/60 hover:text-white/90 transition-colors" />
            )}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Step3;
