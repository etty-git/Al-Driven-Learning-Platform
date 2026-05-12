
import express from "express";
const router = express.Router();
import Sub_categories_controller from "../controllers/Sub_categories_controller";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

router.post("/", auth, isAdmin, Sub_categories_controller.createSubCategory);
router.get("/:categoryId", auth, Sub_categories_controller.getSubCategories);
router.delete("/:id", auth, isAdmin, Sub_categories_controller.deleteSubCategory);
module.exports = router;
