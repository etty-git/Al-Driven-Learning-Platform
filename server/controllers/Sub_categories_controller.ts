import { Request, Response } from "express";
import * as Sub_categoriesService from "../services/Sub_categoriesService";

const createSubCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result = await Sub_categoriesService.createSubCategory(req.body);

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getSubCategories = async (
  req: Request<{ categoryId: string }>,
  res: Response
): Promise<Response> => {
  try {
    const result = await Sub_categoriesService.getSubCategoriesByCategoryId(
      req.params.categoryId
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteSubCategory = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const result = await Sub_categoriesService.deleteSubCategory(req.params.id);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export default { createSubCategory, getSubCategories, deleteSubCategory };
