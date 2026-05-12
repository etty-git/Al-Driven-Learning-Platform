import express from "express";
const router = express.Router();
import PromptsController from "../controllers/PromptsController";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

router.post("/", auth, PromptsController.createPrompt);
router.get("/", auth, isAdmin, PromptsController.getPrompts);
router.get("/user/:id", auth, PromptsController.getPromptsByUserID);

module.exports = router;
