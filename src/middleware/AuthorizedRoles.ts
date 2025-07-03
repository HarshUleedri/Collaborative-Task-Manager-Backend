import { NextFunction, Request, Response } from "express";

export function authorizedRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role ?? "")) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
}
