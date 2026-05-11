const {api} = require("../services/api");

export const promptsAPI = api.injectEndpoints({
  endpoints: (build) => ({
    
    getPrompts: build.query({
      query: () => "prompts",
      providesTags: ["Prompt"],
    }),

    createPrompt: build.mutation({
      query: (promptData) => ({
        url: "prompts",
        method: "POST",
        body: promptData,
      }),
      invalidatesTags: ["Prompt"],
    }),
getPromptsByID: build.query({
      query: (id) => `prompts/${id}`,
      providesTags: ["Prompt"],
    }),
    getPromptsByUserID: build.query({
      query: (id) => `prompts/user/${id}`,
      providesTags: ["Prompt"],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetPromptsQuery,
  useCreatePromptMutation,
  useGetPromptsByIDQuery,
  useGetPromptsByUserIDQuery,
} = promptsAPI;  