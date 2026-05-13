import { api } from "../services/api";

/**
 * RTK Query endpoints עבור Prompts
 */
export const promptsAPI = api.injectEndpoints({
  endpoints: (build) => ({
    /**
     * קבלת כל הפרומפטים (אדמין)
     */
    getPrompts: build.query({
      query: () => "prompts",
      providesTags: ["Prompt"],
    }),

    /**
     * יצירת פרומפט חדש + קבלת תשובת AI
     */
    createPrompt: build.mutation({
      query: (promptData) => ({
        url: "prompts",
        method: "POST",
        body: promptData,
      }),
      invalidatesTags: ["Prompt"],
    }),

    /**
     * קבלת פרומפטים לפי משתמש
     */
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
  useGetPromptsByUserIDQuery,
} = promptsAPI;