import jwt from "jsonwebtoken";
import User from "../models/Users";

export const createUser = async (data: any) => {
  
    const name = data.name?.trim();
    const phone = data.phone?.trim();

    if (!name || !phone) {
    throw new Error("Please provide all required fields");
    }   
    
    

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      throw new Error("User with this phone number already exists");
    }

    const user = await User.create({ name, phone });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const userObj = user.toObject();

    return {
      user: userObj,
      token
    };
   
};

export const loginUser = async (data: any) => {
  
    const name = data.name?.trim();
    const phone = data.phone?.trim();

    if (!phone||!name) {
      throw new Error("Please provide the phone number and name");
    }
    

    const user = await User.findOne({ phone , name});

    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const userObj = user.toObject();

    return {
      user: userObj,
      token
    };

  
};
export const getbyId= async (id: string) => {
    
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;

  

};
export const getAllUsers = async () => {

    const users = await User.find();    
    return users;
    
};
    
export const deleteUser = async (id: string) => {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new Error("User not found");
    }
    return {
      message: "User deleted successfully"
    };
};
  const logoutUser = async (data: any) => {
    const { id } = data;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    

    return {
      message: "User logged out successfully"
    }
  }
export default { createUser, loginUser, getbyId, getAllUsers, deleteUser, logoutUser };
  

