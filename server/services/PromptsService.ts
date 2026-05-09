
const Prompts = require("../models/Prompts");

import Sub_Category from "../models/Sub_categories";
import User from "../models/Users";
import Category from "../models/Categories";

import axios from "axios";

export const createPrompt = async (data: any) => {

    const { sub_category_id, category_id, user_id } = data;

    if (!sub_category_id || !category_id || !user_id) {
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
        sub_category: subCategory.name,
        category: category.name,
        user: user.name,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
        },
      }
    );

    // שמירה למסד נתונים
    const prompt = await Prompts.create({
      sub_category_id,
      category_id,
      user_id,
      response: aiResponse.data.response,
    });

    // תשובה אחת בלבד
    return {
      message: "Prompt created successfully",
      prompt,
      aiResponse: aiResponse.data,
    };
  
};
export const getResponses = async ()=> {

    const prompts = await Prompts.find();

    const responses = prompts.map((prompt: any) => prompt.response);

    return {
      message: "Responses retrieved successfully",
      responses,
    };

  } 
   

export const getResponsesByID = async (User_id: string)=>{
 

    if (!User_id) {
        throw new Error("Please provide a user ID");
    }

    const prompts = await Prompts.find({
      user_id: User_id,
    });

    const responses = prompts.map(
      (prompt: any) => prompt.response
    );

    return {
      message: "Responses retrieved successfully",
      responses,
    };

  
};
export const getPromptsByUserID = async (id: string) => {

  if (!id) {
    throw new Error("Please provide a user ID");
  }

  const prompts = await Prompts.find({
    user_id: id,
  });

  return {
    message: "Prompts retrieved successfully",
    prompts,
  };
};