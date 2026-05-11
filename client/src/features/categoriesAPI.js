const {apiSlice} = require("../services/api");

export const sub_categoriesAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getSubCategories: build.query({
            query: () => "sub_categories",
            providesTags: ["Sub_categories"],
        }),

        createSubCategory: build.mutation({
            query: (subCategoryData) => ({
                url: "sub_categories",
                method: "POST",
                body: subCategoryData,
            }),
            invalidatesTags: ["Sub_categories"],
        }),
        deleteSubCategory: build.mutation({
            query: (id) => ({
                url: `sub_categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Sub_categories"],
        }),
    }),
    overrideExisting: false,
});
export const {
    useGetSubCategoriesQuery,
    useCreateSubCategoryMutation,
    useDeleteSubCategoryMutation,
} = sub_categoriesAPI;