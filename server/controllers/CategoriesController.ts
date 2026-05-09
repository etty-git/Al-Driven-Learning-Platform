import { Request, Response } from "express";
const Category = require('../models/Categories');
const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};
const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
    }   
    const category = new Category({ name });
    await category.save();
    return res.status(201).json(category);  
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
        }
};
const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  try {    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);  
    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }   return res.status(200).json({
        message: "Category deleted successfully"
    });
} catch (error) {    return res.status(500).json({
        message: "Server error"
    });
}};
export default { getCategories, createCategory, deleteCategory };
