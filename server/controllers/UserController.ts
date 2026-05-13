import { Request, Response } from "express";
import * as UserService from "../services/UserService";

/**
 * יצירת משתמש חדש
 */
const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await UserService.createUser(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * התחברות משתמש
 */
const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await UserService.loginUser(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * קבלת משתמש לפי ID (אדמין או המשתמש עצמו)
 */
const getbyId = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user?.isAdmin && req.user?.id !== req.params.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const result = await UserService.getbyId(req.params.id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * קבלת כל המשתמשים
 */
const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await UserService.getAllUsers();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * מחיקת משתמש לפי ID
 */
const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const result = await UserService.deleteUser(req.params.id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export default { createUser, loginUser, getbyId, getAllUsers, deleteUser };