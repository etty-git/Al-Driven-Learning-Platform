import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Users";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        message: "Please provide all required fields"
      });
    }

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this phone number already exists"
      });
    }

    const user = await User.create({ name, phone });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const userObj = user.toObject();

    return res.status(201).json({
      user: userObj,
      token
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {  name, phone } = req.body;

    if (!phone||!name) {
      return res.status(400).json({
        message: "Please provide the phone number and name"
      });
    }

    const user = await User.findOne({ phone , name});

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const userObj = user.toObject();

    return res.status(200).json({
      user: userObj,
      token
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};
const getbyId= async (req: Request, res: Response): Promise<Response> => {
    try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }

};
const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find();    
    return res.status(200).json(users);
    } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};
const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    
    try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    return res.status(200).json({
      message: "User deleted successfully"
    });
    } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
}
export default { createUser, loginUser, getbyId , getAllUsers, deleteUser}    