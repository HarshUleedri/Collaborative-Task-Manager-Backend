import { Request, Response } from "express";
import User from "../../model/UserSchema";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const users = await User.find();

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("Error at get single task", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
