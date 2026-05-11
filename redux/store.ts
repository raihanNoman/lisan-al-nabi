import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slice/app";
import practiceSlice from "./slice/practice";
import quoteSlice from "./slice/quote";
// import trainingSlice from "./training/training-slice";
// import wordTrainingSlice from "./training/word-training-slice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    quote: quoteSlice,
    practice: practiceSlice,
    // wordTraining: wordTrainingSlice,
    // training: trainingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
