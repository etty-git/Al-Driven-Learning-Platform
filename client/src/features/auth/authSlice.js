import { createSlice } from "@reduxjs/toolkit";
import {
  loadStoredJson,
  removeStoredJson,
  saveStoredJson,
  storageKeys,
} from "../../utils/storage";

/**
 * טעינת משתמש שמור מהאחסון המקומי
 */
const storedAuth = loadStoredJson(storageKeys.auth);

/**
 * מצב התחלתי של authentication
 */
const initialState = {
  user: storedAuth?.user || null,
  token: storedAuth?.token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * שמירת משתמש וטוקן לאחר התחברות/הרשמה
     */
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      saveStoredJson(storageKeys.auth, {
        user: action.payload.user,
        token: action.payload.token,
      });
    },

    /**
     * התנתקות משתמש + ניקוי אחסון
     */
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