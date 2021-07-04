import { configureStore } from "@reduxjs/toolkit";
import { nytApi } from "./api/nytApi";

export const store = configureStore({
  reducer: {
    [nytApi.reducerPath]: nytApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nytApi.middleware),
});
