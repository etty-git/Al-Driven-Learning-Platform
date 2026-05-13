import express from "express";
const router = express.Router();

import Sub_categories_controller from "../controllers/Sub_categories_controller";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

/**
 * יצירת תת־קטגוריה (רק אדמין)
 */
router.post("/", auth, isAdmin, Sub_categories_controller.createSubCategory);

/**
 * קבלת תתי־קטגוריות לפי קטגוריה
 */
router.get("/:categoryId", auth, Sub_categories_controller.getSubCategories);

/**
 * מחיקת תת־קטגוריה (רק אדמין)
 */
router.delete("/:id", auth, isAdmin, Sub_categories_controller.deleteSubCategory);

module.exports = router;