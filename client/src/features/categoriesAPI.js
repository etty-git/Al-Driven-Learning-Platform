import { api } from "../services/api";

/**
 * RTK Query endpoints עבור קטגוריות
 */
export const CategoriesAPI = api.injectEndpoints({
  endpoints: (build) => ({
    /**
     * קבלת כל הקטגוריות
     */
    getCategories: build.query({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),

    /**
     * יצירת קטגוריה חדשה
     */
    createCategory: build.mutation({
      query: (categoryData) => ({
        url: "/categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Categories"],
    }),

    /**
     * מחיקת קטגוריה
     */
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