import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // or whatever type your userId should be
    }
  }
}
dotenv.config();

const app = express();

console.log(process.env.NODE_ENV);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : process.env.FRONTEND_URL,

    credentials: true,
  })
);

//api routes imports
import authRoutes from "./routers/authRoutes/authRoutes";
import { IUser } from "./model/UserSchema";

//api routes
app.get("/api/v1/testing", (req: Request, res: Response) => {
  res.send("working");
});
app.use("/api/v1/auth", authRoutes);

connectDB();

const PORT = process.env.PORT || "5000";

app.listen(PORT, () => console.log(`server is running on ${PORT} `));
