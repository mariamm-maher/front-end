// validationHelpers.js
export const validateStep = (step, formData) => {
  const errors = {};

  if (step === 1) {
    if (!formData.agencyName.trim())
      errors.agencyName = "Agency name is required";
    if (!formData.phoneNumber.trim())
      errors.phoneNumber = "Phone number is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Invalid email format";
  }
  if (step === 2) {
    if (!formData.city.trim()) errors.city = "City is required";
  }
  if (step === 3) {
    // Validate password in step 3
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
      if (!passwordRegex.test(formData.password))
        errors.password =
          "Password must include uppercase letters, lowercase letters, numbers, and special characters";
    }
    // No validation for profile photo as it's optional
  }

  return errors;
};
