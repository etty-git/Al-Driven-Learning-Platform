import { api } from "../services/api";

export const CategoriesAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),

    createCategory: build.mutation({
      query: (categoryData) => ({
        url: "/categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = CategoriesAPI;