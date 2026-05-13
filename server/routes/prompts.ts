import express from "express";
const router = express.Router();

import PromptsController from "../controllers/PromptsController";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

/**
 * יצירת prompt (משתמש מחובר)
 */
router.post("/", auth, PromptsController.createPrompt);

/**
 * קבלת כל הפרומפטים (רק אדמין)
 */
router.get("/", auth, isAdmin, PromptsController.getPrompts);

/**
 * קבלת פרומפטים לפי משתמש ספציפי
 */
router.get("/user/:id", auth, PromptsController.getPromptsByUserID);

module.exports = router;