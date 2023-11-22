import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://azazkhan:azazkhan@cluster0.rqw9loh.mongodb.net/next_Authentication"
    );
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB not connected");
  }
};
