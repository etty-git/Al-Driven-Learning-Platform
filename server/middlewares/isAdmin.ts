import { Request, Response, NextFunction } from "express";

/**
 * הרחבת טיפוס Request כדי לכלול user
 */
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; name: string; phone: string; isAdmin: boolean };
    }
  }
}

/**
 * middleware שמאפשר גישה רק למנהלים (admin)
 */
const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.isAdmin) {
    next();
    return;
  }

  res.status(403).json({
    message: "Access denied. Admins only.",
  });
};

export default isAdmin;