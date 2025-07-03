import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "Admin" | "Manager" | "Member";
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Member"],
      default: "Member",
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  const isPasswordCorrect = await bcrypt.compare(
    enteredPassword,
    this.password
  );
  return isPasswordCorrect;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
