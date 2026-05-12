import { Request, Response } from "express";
import * as CategoriesService from "../services/CategoriesService";
const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await CategoriesService.getCategories();
    return res.status(200).json(result);
  } catch (error: any) {
    console.log("🔥 ERROR:", error);
    return res.status(500).json({
      message: error.message || "Server error"
    });
  }
};
const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await CategoriesService.createCategory(req.body.name);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};
const deleteCategory = async (req: Request<{id: string}>, res: Response): Promise<Response> => {
  try { const result = await CategoriesService.deleteCategory(req.params.id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    }); 
  } 
};
export default { getCategories, createCategory, deleteCategory };
