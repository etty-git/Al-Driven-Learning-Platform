import express from "express";
const router = express.Router();
import CategoriesController from "../controllers/CategoriesController";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

router.get("/", auth, CategoriesController.getCategories);
router.post("/", auth, isAdmin, CategoriesController.createCategory);
router.delete("/:id", auth, isAdmin, CategoriesController.deleteCategory);
module.exports = router;
