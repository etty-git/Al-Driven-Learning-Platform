import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from "../features/auth/authSlice";
import { loadStoredJson, storageKeys } from "../utils/storage";

const storedAuth = loadStoredJson(storageKeys.auth, {});

const preloadedState = {
  auth: {
    user: storedAuth?.user || null,
    token: storedAuth?.token || localStorage.getItem("token"),
  },
};

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
