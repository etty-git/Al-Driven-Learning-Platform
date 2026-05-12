import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; name: string; phone: string; isAdmin: boolean };
    }
  }
}

const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  if (req.user && req.user.isAdmin) {
    next();
    return;
  }

  res.status(403).json({
    message: "Access denied. Admins only."
  });
};

export default isAdmin;
