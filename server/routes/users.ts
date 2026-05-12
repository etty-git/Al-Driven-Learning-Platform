
import express, { Request, Response } from "express";
const router = express.Router();
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

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

router.get("/:id", auth, UserController.getbyId);
router.get("/", auth, isAdmin, UserController.getAllUsers);
router.delete("/:id", auth, isAdmin, UserController.deleteUser);
module.exports = router;
