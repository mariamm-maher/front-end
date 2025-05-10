// Main SignupPage.jsx component
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUpUser } from "../services/AuthApi";
import AnimatedBackground from "../components/Auth/background";
import Step1 from "../components/TouristSignUp/StepOne";
import Step2 from "../components/TouristSignUp/StepTwo";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const TouristSignupMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      setIsSubmitting(false);
      toast.success("Signup successful! Please log in now.", {
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
      navigate("/login");
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast.error(error.message || "Signup failed.", {
        duration: 7000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
        },
        icon: "❌",
      });
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    nationality: "",
    profilePhoto: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

      setFormData((prev) => ({
        ...prev,
        profilePhoto: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const signupData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        nationality: formData.nationality,
        profilePicture: formData.profilePhoto || "",
      };

      // The image upload is now handled in the signUpUser function using Cloudinary
      await TouristSignupMutation.mutateAsync(signupData);
    } catch (error) {
      console.error("Signup failed:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedBackground>
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md px-6 py-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="flex items-center w-2/3">
                  <div
                    className={`h-2 rounded-full w-full ${
                      currentStep >= 1 ? "bg-[#1784ad]" : "bg-white/20"
                    }`}
                  ></div>
                  <div
                    className={`h-2 rounded-full w-full ${
                      currentStep >= 2 ? "bg-[#1784ad]" : "bg-white/20"
                    }`}
                  ></div>
                </div>
              </motion.div>

              <h1 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-white/80">
                {currentStep === 1
                  ? "Step 1: Basic Information"
                  : "Step 2: Personal Details"}
              </p>
            </div>

            {currentStep === 1 ? (
              <Step1
                formData={formData}
                handleChange={handleChange}
                onNext={handleNext}
              />
            ) : (
              <Step2
                formData={formData}
                handleChange={handleChange}
                photoPreview={photoPreview}
                handlePhotoChange={handlePhotoChange}
                onSubmit={handleSubmit}
                onBack={handleBack}
              />
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="px-8 pb-6 text-center"
            >
              <p className="text-white/60 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#1784ad] hover:text-emerald-200 font-medium transition-colors"
                >
                  Log in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default SignupPage;
