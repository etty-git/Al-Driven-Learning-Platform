import { api } from "../services/api";

export const usersAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),

    createUser: build.mutation({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    registerUser: build.mutation({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: build.mutation({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        body: data,
      }),
    }),

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
