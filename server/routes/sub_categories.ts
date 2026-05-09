
import express from "express";
const router = express.Router();
import Sub_categories_controller from "../controllers/Sub_categories_controller";
router.post("/", Sub_categories_controller.createSubCategory);
router.get("/:categoryId", Sub_categories_controller.getSubCategories);
router.delete("/:id", Sub_categories_controller.deleteSubCategory);
export default router;
