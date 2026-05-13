import { api } from "../services/api";

/**
 * RTK Query endpoints עבור Users
 */
export const usersAPI = api.injectEndpoints({
  endpoints: (build) => ({

    /**
     * קבלת משתמש לפי ID
     */
    getUser: build.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),

    /**
     * יצירת משתמש (admin / פנימי)
     */
    createUser: build.mutation({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * הרשמת משתמש חדש
     */
    registerUser: build.mutation({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * התחברות משתמש
     */
    loginUser: build.mutation({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        body: data,
      }),
    }),

    /**
     * מחיקת משתמש
     */
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useCreateUserMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
} = usersAPI;