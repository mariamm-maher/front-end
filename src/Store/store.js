import { configureStore } from "@reduxjs/toolkit";
import agencyFormReducer from "./AgencyFormSlice";

export const store = configureStore({
  reducer: {
    agencyForm: agencyFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Optional: if you need to store non-serializable data
    }),
});
