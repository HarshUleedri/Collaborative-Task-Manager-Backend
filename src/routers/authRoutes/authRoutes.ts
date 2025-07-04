import express, { Request, Response } from "express";
import {
  Login,
  Logout,
  SignUp,
} from "../../controllers/authController/authController";
import { ProtectedMiddleware } from "../../middleware/ProtectedMiddleware";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/me", ProtectedMiddleware, (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
});

export default router;
