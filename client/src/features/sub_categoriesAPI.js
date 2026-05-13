import { api } from "../services/api";

/**
 * RTK Query endpoints עבור Sub Categories
 */
export const sub_categoriesAPI = api.injectEndpoints({
  endpoints: (build) => ({
    /**
     * קבלת תתי־קטגוריות לפי ID של קטגוריה
     */
    getSubCategoriesById: build.query({
      query: (categoryId) => `sub_categories/${categoryId}`,
      providesTags: ["SubCategory"],
    }),

    /**
     * יצירת תת־קטגוריה חדשה
     */
    createSubCategory: build.mutation({
      query: (subCategoryData) => ({
        url: "sub_categories",
        method: "POST",
        body: subCategoryData,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    /**
     * מחיקת תת־קטגוריה
     */
    deleteSubCategory: build.mutation({
      query: (id) => ({
        url: `sub_categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSubCategoriesByIdQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = sub_categoriesAPI;