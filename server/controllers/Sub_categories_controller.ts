import { Request, Response } from "express";
import Category from "../models/Categories";
import Sub_Category from "../models/Sub_categories";

const createSubCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({
        message: "Name and category ID are required"
      });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    const existingSubCategory = await Sub_Category.findOne({
      name,
      category: categoryId
    });

    if (existingSubCategory) {
      return res.status(400).json({
        message: "Sub-category with this name already exists in the specified category"
      });
    }

    const subCategory = await Sub_Category.create({
      name,
      category: categoryId
    });

    return res.status(201).json(subCategory);

  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};
const getSubCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { categoryId } = req.params;

    const subCategories = await Sub_Category.find({ category: categoryId });
 if(subCategories.length === 0){
    return res.status(404).json({
        message: "Sub-categories not found"
    });
 }
    return res.status(200).json(subCategories);
  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};
const deleteSubCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;  

    const subCategory = await Sub_Category.findByIdAndDelete(id);

    if (!subCategory) {
      return res.status(404).json({
        message: "Sub-category not found"
      });
    }

    return res.status(200).json({
      message: "Sub-category deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};

export default { createSubCategory, getSubCategories, deleteSubCategory };