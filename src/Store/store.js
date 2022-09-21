import { configureStore } from "@reduxjs/toolkit";
import streamsReducer from "./streams";

export const store = configureStore({
  reducer: {
    streams: streamsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
