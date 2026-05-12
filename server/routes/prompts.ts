import express from "express";
const router = express.Router();
import PromptsController from "../controllers/PromptsController";

router.post("/", PromptsController.createPrompt);
router.get("/prompts", PromptsController.getPrompts);
router.get("/prompts/:id", PromptsController.getPromptsByID);
router.get("/user/:id", PromptsController.getPromptsByUserID);
module.exports = router;