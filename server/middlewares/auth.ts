import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/Users";

type AuthRequest = Request & {
  user?: {
    id: string;
    name: string;
    phone: string;
    isAdmin: boolean;
  };
};

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "no token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await User.findById(decoded.id).select("name phone isAdmin");

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      phone: user.phone,
      isAdmin: Boolean(user.isAdmin),
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
};

export default auth;
