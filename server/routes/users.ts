
import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController";

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/:id", UserController.getbyId);
router.get("/", UserController.getAllUsers);
router.delete("/:id", UserController.deleteUser);
export default router;