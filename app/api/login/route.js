import { connectDb } from "@/lib/mongodb";
import User from "@/models/user";
import jwt from "jsonwebtoken";

const { NextResponse } = require("next/server");

export async function POST(req) {
  try {
    await connectDb();
    const { email } = await req.json();
    const user = await User.findOne({ email });

    const response = NextResponse.json(
      { message: "Login successfully" },
      { status: 200 }
    );

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, "khdfskakj", { expiresIn: "1h" });

    // response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
