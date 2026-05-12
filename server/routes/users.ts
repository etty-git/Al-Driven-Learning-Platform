
import express, { Request, Response } from "express";
const router = express.Router();
import UserController from "../controllers/UserController";

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);

router.get("/register", (req: Request, res: Response) => {
  return res.status(405).json({
    message: "Use POST /api/users/register to create a user.",
  });
});

router.get("/login", (req: Request, res: Response) => {
  return res.status(405).json({
    message: "Use POST /api/users/login to login.",
  });
});

router.get("/:id", UserController.getbyId);
router.get("/", UserController.getAllUsers);
router.delete("/:id", UserController.deleteUser);
module.exports = router;