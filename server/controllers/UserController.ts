import { Request, Response } from "express";
import * as UserService from "../services/UserService";
const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await UserService.createUser(req.body);

    return res.status(201).json(result);

  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await UserService.loginUser(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
    }


const getbyId= async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const result = await UserService.getbyId(req.params.id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }

};
const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await UserService.getAllUsers();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};
const deleteUser = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  try {
    const result = await UserService.deleteUser(req.params.id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};
     
export default { createUser, loginUser, getbyId , getAllUsers, deleteUser}    