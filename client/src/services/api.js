import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * כתובת בסיס של ה־API
 */
export const API_BASE_URL = "http://localhost:7001/api";

/**
 * RTK Query בסיסי לכל ה־API של האפליקציה
 * כולל הוספת טוקן אוטומטית לכל בקשה
 */
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Sub_categories", "Categories", "Prompts"],
  endpoints: () => ({}),
});