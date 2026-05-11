const {api}

export const sub_categoriesAPI = api.injectEndpoints({
  endpoints: (build) => ({
    
    getSubCategories: build.query({
      query: () => "sub_categories",
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
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = sub_categoriesAPI;  