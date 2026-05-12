import express from "express";
const router = express.Router();
import CategoriesController from "../controllers/CategoriesController";
router.get("/", CategoriesController.getCategories);
router.post("/", CategoriesController.createCategory);
router.delete("/:id", CategoriesController.deleteCategory);
module.exports = router;