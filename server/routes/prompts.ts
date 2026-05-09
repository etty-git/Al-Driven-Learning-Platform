import express from "express";
const router = express.Router();
import PromptsController from "../controllers/PromptsController";

router.post("/", PromptsController.createPrompt);
router.get("/responses", PromptsController.getResponses);
router.get("/responses/:id", PromptsController.getResponsesByID);
router.get("/user/:id", PromptsController.getPromptsByUserID);
export default router;