import express from "express";
const router = express.Router();

import CategoriesController from "../controllers/CategoriesController";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

/**
 * קבלת כל הקטגוריות (דורש התחברות)
 */
router.get("/", auth, CategoriesController.getCategories);

/**
 * יצירת קטגוריה (רק אדמין)
 */
router.post("/", auth, isAdmin, CategoriesController.createCategory);

/**
 * מחיקת קטגוריה לפי ID (רק אדמין)
 */
router.delete("/:id", auth, isAdmin, CategoriesController.deleteCategory);

module.exports = router;