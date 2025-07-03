import { Request, Response } from "express";
import { generateAccessToken } from "../../utils/generateToken";
import User from "../../model/UserSchema";

const isProduction = process.env.NODE_ENV === "production";

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, profilePic } = req.body;

    console.log(req.body);

    if (!username || !email || !password) {
      res.status(400).json({ message: "ALL fields are required" });
      return;
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password Must Be at least 6 character" });

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Invalid email Format " });
      return;
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      if (user.username === username) {
        res.status(400).json({ message: "Username is used already " });
        return;
      } else {
        res.status(400).json({ message: "email is used already " });
        return;
      }
    }

    const newUser = await User.create({
      username,
      email,
      password,
      profilePic,
      role,
    });

    const AccessToken = generateAccessToken((newUser._id as string).toString());

    res.cookie("accessToken", AccessToken, {
      httpOnly: true,
      secure: isProduction, // ✅ true only in production (HTTPS)
      sameSite: isProduction ? "none" : "lax", // ✅ "None" for cross-site production, "Lax" for local dev
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ success: true, message: "Successful Sign Up" });
  } catch (error) {
    console.log("Error at  sign up controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "user does not exists" });
      return;
    }
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Invalid Credential" });
      return;
    }
    const AccessToken = generateAccessToken((user._id as string).toString());

    res.cookie("accessToken", AccessToken, {
      httpOnly: true,
      secure: isProduction, // ✅ true only in production (HTTPS)
      sameSite: isProduction ? "none" : "lax", // ✅ "None" for cross-site production, "Lax" for local dev
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Successful login" });
  } catch (error) {
    console.log("Error at accessToken login controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
export const Logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res.json({ message: "logged out" });
  } catch (error) {
    console.log("Error at  logout controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
