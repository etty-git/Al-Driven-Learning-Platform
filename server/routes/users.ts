import express, { Request, Response } from "express";
const router = express.Router();

import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

/**
 * הרשמה משתמש חדש
 */
router.post("/register", UserController.createUser);

/**
 * התחברות משתמש
 */
router.post("/login", UserController.loginUser);

/**
 * מניעת שימוש ב-GET להרשמה
 */
router.get("/register", (req: Request, res: Response) => {
  return res.status(405).json({
    message: "Use POST /api/users/register to create a user.",
  });
});

/**
 * מניעת שימוש ב-GET להתחברות
 */
router.get("/login", (req: Request, res: Response) => {
  return res.status(405).json({
    message: "Use POST /api/users/login to login.",
  });
});

/**
 * קבלת משתמש לפי ID (דורש התחברות)
 */
router.get("/:id", auth, UserController.getbyId);

/**
 * קבלת כל המשתמשים (רק אדמין)
 */
router.get("/", auth, isAdmin, UserController.getAllUsers);

/**
 * מחיקת משתמש (רק אדמין)
 */
router.delete("/:id", auth, isAdmin, UserController.deleteUser);

module.exports = router;