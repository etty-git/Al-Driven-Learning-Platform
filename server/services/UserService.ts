import jwt from "jsonwebtoken";
import User from "../models/Users";

// יצירת טוקן + user response
const buildAuthResponse = (user: any) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return {
    user: user.toObject(),
    token,
  };
};

// יצירת משתמש חדש
export const createUser = async (data: any) => {
  const name = data.name?.trim();
  const phone = data.phone?.trim();

  if (!name || !phone) throw new Error("Please provide all required fields");

  const existingUser = await User.findOne({ phone });
  if (existingUser) throw new Error("User with this phone number already exists");

  const user = await User.create({ name, phone });
  return buildAuthResponse(user);
};

// התחברות משתמש
export const loginUser = async (data: any) => {
  const name = data.name?.trim();
  const phone = data.phone?.trim();

  if (!phone || !name) throw new Error("Please provide the phone number and name");

  const user = await User.findOne({ phone, name });
  if (!user) throw new Error("User not found");

  return buildAuthResponse(user);
};

// קבלת משתמש לפי ID
export const getbyId = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

// קבלת כל המשתמשים
export const getAllUsers = async () => {
  return await User.find();
};

// מחיקת משתמש
export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");

  return { message: "User deleted successfully" };
};

export default { createUser, loginUser, getbyId, getAllUsers, deleteUser };