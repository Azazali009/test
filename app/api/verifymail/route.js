import { connectDb } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

connectDb();

export async function POST(req) {
  try {
    const { token } = await req.json();

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: "Token expired" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
