import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiCreditCard,
  FiGlobe,
  FiMail,
  FiLock,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import AnimatedBackground from "../components/Auth/background";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from "../components/AgencySignUp/prograssBar";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  updateField,
  updatePaymentMethods,
  setStep,
  setValidationErrors,
  startSubmit,
  submitSuccess,
  submitError,
  resetForm,
} from "../Store/AgencyFormSlice";
import Step1 from "../components/AgencySignUp/Step1";
import Step2 from "../components/AgencySignUp/Step2";
import Step3 from "../components/AgencySignUp/Step3";
import Step4 from "../components/AgencySignUp/Step4";
import { validateStep } from "../helper/agencyValidate";
import { travelAgencySignUp } from "../services/AuthApi";

const TravelAgencySignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const { currentStep, formData, isSubmitting } = useSelector(
    (state) => state.agencyForm
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      dispatch(updatePaymentMethods({ method: value, isChecked: checked }));
    } else {
      dispatch(updateField({ field: name, value }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "Please select a valid image file (JPEG, PNG, GIF, or WebP).",
          {
            duration: 5000,
            position: "top-center",
          }
        );
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast.error("Image size must be less than 5MB.", {
          duration: 5000,
          position: "top-center",
        });
        return;
      }

      dispatch(updateField({ field: "profilePhoto", value: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const nextStep = () => {
    const errors = validateStep(currentStep, formData);
    if (Object.keys(errors).length === 0) {
      dispatch(setStep(currentStep + 1));
    } else {
      // Display validation errors as toast notifications
      dispatch(setValidationErrors(errors));

      // Show the first error as a toast
      const firstError = Object.values(errors)[0];
      toast.error(firstError, {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
        },
        icon: "❌",
      });
    }
  };

  const prevStep = () => {
    dispatch(setStep(currentStep - 1));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for validation errors on the final step
    const errors = validateStep(currentStep, formData);
    if (Object.keys(errors).length > 0) {
      dispatch(setValidationErrors(errors));
      // Show the first error as a toast
      const firstError = Object.values(errors)[0];
      toast.error(firstError, {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
        },
        icon: "❌",
      });
      return;
    }

    try {
      // Set loading state
      dispatch(startSubmit()); // Prepare the agency data
      const agencyData = {
        email: formData.email,
        password: formData.password,
        agencyName: formData.agencyName,
        city: formData.city,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
        contact: formData.phoneNumber, // Using phoneNumber as contact
        website: formData.website || "", // Ensure an empty string is sent if no website
        profilePicture: formData.profilePhoto || null, // Add the profile photo
      };

      // Call the API
      await travelAgencySignUp(agencyData); // Set success state
      dispatch(submitSuccess());

      // Show success message
      toast.success("Registration submitted successfully!", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "white",
          padding: "16px",
          borderRadius: "10px",
        },
        icon: "🎉",
      });
      dispatch(resetForm());

      // Redirect to registration success page
      navigate("/registration-success");
    } catch (error) {
      // Handle errors
      dispatch(submitError(error.message || "Registration failed"));

      toast.error(error.message || "Registration failed", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
        },
        icon: "❌",
      });
    }
  };

  return (
    <AnimatedBackground>
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-2xl px-6 py-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Agency Registration
              </h1>
              <p className="text-white/80">Step {currentStep} of 4</p>
              <ProgressBar />
            </div>

            <form onSubmit={handleSubmit} className="px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {" "}
                {currentStep === 1 && <Step1 handleChange={handleChange} />}
                {currentStep === 2 && <Step2 handleChange={handleChange} />}
                {currentStep === 3 && (
                  <Step3 handleChange={handleChange} />
                )}{" "}
                {currentStep === 4 && (
                  <Step4
                    handleChange={handleChange}
                    handlePhotoChange={handlePhotoChange}
                    photoPreview={photoPreview}
                  />
                )}
              </div>

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center py-3 px-6 rounded-xl font-medium text-white transition-all duration-300 space-x-2 bg-white/10 hover:bg-white/20 border border-white/20"
                  >
                    <FiChevronLeft />
                    <span>Back</span>
                  </motion.button>
                )}{" "}
                {currentStep < 4 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-auto flex items-center justify-center py-3 px-6 rounded-xl font-medium text-white transition-all duration-300 space-x-2 bg-gradient-to-r from-[#1784ad] to-teal-500 hover:from-[#1784ad] hover:to-teal-400 shadow-lg hover:shadow-[#1784ad]/30"
                  >
                    <span>Next</span>
                    <FiChevronRight />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-auto py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-[#1784ad] to-teal-500 hover:from-[#1784ad] hover:to-teal-400 shadow-lg hover:shadow-[#1784ad]/30 disabled:opacity-70"
                  >
                    {isSubmitting ? "Processing..." : "Register Agency"}
                  </motion.button>
                )}
              </div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="px-8 pb-6 text-center"
            >
              <p className="text-white/60 text-sm">
                Already have an agency account?{" "}
                <Link
                  to="/login"
                  className="text-[#1784ad] hover:text-emerald-200 font-medium transition-colors"
                >
                  Log in
                </Link>
              </p>
              <p className="text-white/60 text-sm">
                sign Up as Tourist{" "}
                <Link
                  to="/signup-user"
                  className="text-[#1784ad] hover:text-emerald-200 font-medium transition-colors"
                >
                  Tourist sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default TravelAgencySignUp;
