
import Prompts from "../models/Prompts";

import Sub_Category from "../models/Sub_categories";
import User from "../models/Users";
import Category from "../models/Categories";

import axios from "axios";

export const createPrompt = async (data: any) => {

    const { sub_category_id, category_id, user_id, prompt } = data;

    if (!sub_category_id || !category_id || !user_id || !prompt) {
        throw new Error("Please provide all required fields");
    }

    const subCategory = await Sub_Category.findById(sub_category_id);

    if (!subCategory) {
        throw new Error("Sub-category not found");
    }

    const category = await Category.findById(category_id);

    if (!category) {
        throw new Error("Category not found");
    }

    const user = await User.findById(user_id);

    if (!user) {
        throw new Error("User not found");
    }

    // שליחה ל-AI API
    const aiResponse = await axios.post(
      process.env.AI_API_URL!,
      {
        model: "gpt-3.5-turbo", // or whatever model
        messages: [
          {
            role: "user",
            content: `Sub-category: ${subCategory.name}, Category: ${category.name}, User: ${user.name}, Prompt: ${prompt}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponseText = aiResponse.data.choices?.[0]?.message?.content || "No response from AI";

    // שמירה למסד נתונים
    const promptDoc = await Prompts.create({
      sub_category_id,
      category_id,
      user_id,
      prompt: prompt,
      response: aiResponseText,
    });

    // תשובה אחת בלבד
    return {
      message: "Prompt created successfully",
      prompt: promptDoc,
      aiResponse: aiResponseText,
    };
  
};
export const getPrompts = async ()=> {

    const prompts = await Prompts.find()
      .populate("user_id", "name phone isAdmin")
      .populate("category_id", "name")
      .populate("sub_category_id", "name")
      .sort({ createdAt: -1 });
    return {
      message: "Responses retrieved successfully",
      prompts,
    };

  } 
   
export const getPromptsByUserID = async (id: string) => {

  if (!id) {
    throw new Error("Please provide a user ID");
  }

  const prompts = await Prompts.find({ user_id: id })
    .populate("category_id", "name")
    .populate("sub_category_id", "name")
    .sort({ createdAt: -1 });

  return {
    message: "Prompts retrieved successfully",
    prompts,
  };
};
