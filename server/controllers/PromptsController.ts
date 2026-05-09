import { Request, Response } from "express";
const Prompts = require("../models/Prompts");

import Sub_Category from "../models/Sub_categories";
import User from "../models/Users";
import Category from "../models/Categories";

import axios from "axios";

const createPrompt = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { sub_category_id, category_id, user_id } = req.body;

    if (!sub_category_id || !category_id || !user_id) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const subCategory = await Sub_Category.findById(sub_category_id);

    if (!subCategory) {
      return res.status(404).json({
        message: "Sub-category not found",
      });
    }

    const category = await Category.findById(category_id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
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
    return res.status(201).json({
      message: "Prompt created successfully",
      prompt,
      aiResponse: aiResponse.data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
const getResponses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const prompts = await Prompts.find();

    const responses = prompts.map((prompt: any) => prompt.response);

    return res.status(200).json({
      message: "Responses retrieved successfully",
      responses,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
const getResponsesByID = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {

    const { User_id } = req.body;

    if (!User_id) {
      return res.status(400).json({
        message: "Please provide a user ID",
      });
    }

    const prompts = await Prompts.find({
      user_id: User_id,
    });

    const responses = prompts.map(
      (prompt: any) => prompt.response
    );

    return res.status(200).json({
      message: "Responses retrieved successfully",
      responses,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
const getPromptsByUserID = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { User_id } = req.body;

    if (!User_id) {
      return res.status(400).json({
        message: "Please provide a user ID",
      });
    }
    const prompts = await Prompts.find({
      user_id: User_id,
    });
    if(!prompts || prompts.length === 0){
      return res.status(404).json({
        message: "No prompts found for this user",
      });
    }

    return res.status(200).json({
      message: "Prompts retrieved successfully",
      prompts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  } 
};
export default { createPrompt, getResponses, getResponsesByID, getPromptsByUserID };