import { configureStore } from "@reduxjs/toolkit";
import { nytApi } from "./api/nytApi";

/**
 * Returns new store
 */
export const getNewStore = () =>
  configureStore({
    reducer: {
      [nytApi.reducerPath]: nytApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(nytApi.middleware),
  });
