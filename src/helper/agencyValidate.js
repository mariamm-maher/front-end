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
    if (!formData.address.trim()) errors.address = "Address is required";
  }

  if (step === 3) {
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";

    if (!formData.confirmPassword)
      errors.confirmPassword = "Please confirm password";
    else if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords don't match";
  }

  return errors;
};
