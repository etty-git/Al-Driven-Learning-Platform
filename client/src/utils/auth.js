import { loadStoredJson, removeStoredJson, storageKeys } from "./storage";

export const isLoggedIn = () => {
  return !!loadStoredJson(storageKeys.auth)?.token;
};

export const logoutUser = () => {
  removeStoredJson(storageKeys.auth);
  localStorage.removeItem("refreshToken");
};
