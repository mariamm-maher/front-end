import { motion } from "framer-motion";
import { FiUpload, FiImage } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useRef } from "react";

const Step4 = ({ handleChange, handlePhotoChange, photoPreview }) => {
  const { formData } = useSelector((state) => state.agencyForm);
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
        <h3 className="text-lg font-medium text-white mb-5">Profile Photo</h3>

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
            Click to upload your agency logo or profile photo
          </p>
          <p className="text-xs text-white/50 mt-1">
            Recommended: Square image, max 5MB
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Step4;
