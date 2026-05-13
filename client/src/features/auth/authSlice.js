import { createSlice } from "@reduxjs/toolkit";
import {
  loadStoredJson,
  removeStoredJson,
  saveStoredJson,
  storageKeys,
} from "../../utils/storage";

const storedAuth = loadStoredJson(storageKeys.auth);

const initialState = {
  user: storedAuth?.user || null,
  token: storedAuth?.token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      saveStoredJson(storageKeys.auth, {
        user: action.payload.user,
        token: action.payload.token,
      });
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      removeStoredJson(storageKeys.auth);
      removeStoredJson(storageKeys.membership);
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
