import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from "../features/auth/authSlice";
import { loadStoredJson, storageKeys } from "../utils/storage";

/**
 * טעינת משתמש שמור מה־localStorage
 */
const storedAuth = loadStoredJson(storageKeys.auth, {});

/**
 * מצב התחלתי של ה־Redux store
 */
const preloadedState = {
  auth: {
    user: storedAuth?.user || null,
    token: storedAuth?.token || localStorage.getItem("token"),
  },
};

/**
 * יצירת Redux store מרכזי
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;