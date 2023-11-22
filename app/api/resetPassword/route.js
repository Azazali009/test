import User from "@/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    const user = await User.findOne({
      passwordResetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "No user found or invalid token" },
        { status: 400 }
      );
    }
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
