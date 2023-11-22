import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide us your email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: String,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  passwordResetToken: String,
  resetTokenExpiry: Date,
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
