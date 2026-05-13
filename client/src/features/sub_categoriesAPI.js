import { api } from "../services/api";

export const sub_categoriesAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getSubCategoriesById: build.query({
      query: (categoryId) => `sub_categories/${categoryId}`,
      providesTags: ["SubCategory"],
    }),

    createSubCategory: build.mutation({
      query: (subCategoryData) => ({
        url: "sub_categories",
        method: "POST",
        body: subCategoryData,
      }),
      invalidatesTags: ["SubCategory"],
    }),

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
