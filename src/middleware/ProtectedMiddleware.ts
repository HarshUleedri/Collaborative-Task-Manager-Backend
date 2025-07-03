import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../model/UserSchema";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const ProtectedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      res.status(500).json("server config error of jwt env");
      return;
    }

    const decode = jwt.verify(accessToken, secret) as CustomJwtPayload;

    if (!decode || !decode.id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const user = await User.findOne({ _id: decode.id }).select("-password");

    if (!user) {
      res.status(401).json({ message: "doctor not found " });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error in protected middleware", error);
    res.status(401).json({ message: "Unauthenticated" });
  }
};
