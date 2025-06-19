import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import booksReducer from "../features/Books/bookSlice"
import authRdeducer from "../features/auth/auth";
import reviewReducer from "../features/review/reviewSlice";



const isDevelopment = import.meta.env.VITE_NODE_ENV === "development";


export const store = configureStore({
  reducer: {
    // Add your reducers here
    books:booksReducer,
    auth: authRdeducer,
    review: reviewReducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    isDevelopment
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
});
