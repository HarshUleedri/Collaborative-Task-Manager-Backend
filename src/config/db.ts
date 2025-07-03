import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`MongoDB is connected ${conn.connection.host}`);
  } catch (error) {
    console.log("Error at connecting database", Error);
    process.exit(1);
  }
};
