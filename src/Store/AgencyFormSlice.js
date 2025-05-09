import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  formData: {
    agencyName: "",
    phoneNumber: "",
    city: "",
    address: "",
    paymentMethods: [],
    facebook: "",
    instagram: "",
    twitter: "",
    website: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  validationErrors: {},
  isSubmitting: false,
};

const agencyFormSlice = createSlice({
  name: "agencyForm",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },

    updatePaymentMethods: (state, action) => {
      const { method, isChecked } = action.payload;
      if (isChecked) {
        state.formData.paymentMethods.push(method);
      } else {
        state.formData.paymentMethods = state.formData.paymentMethods.filter(
          (m) => m !== method
        );
      }
    },

    setStep: (state, action) => {
      state.currentStep = action.payload;
    },

    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },

    resetForm: () => initialState,

    startSubmit: (state) => {
      state.isSubmitting = true;
    },

    submitSuccess: (state) => {
      state.isSubmitting = false;
    },

    submitError: (state, action) => {
      state.isSubmitting = false;
      state.validationErrors = action.payload;
    },
  },
});

export const {
  updateField,
  updatePaymentMethods,
  setStep,
  setValidationErrors,
  resetForm,
  startSubmit,
  submitSuccess,
  submitError,
} = agencyFormSlice.actions;

export default agencyFormSlice.reducer;
