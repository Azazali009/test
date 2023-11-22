import { sendMail } from "@/helpers/sendMail";
import { connectDb } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
const { NextResponse } = require("next/server");

connectDb();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already exist!" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const savedUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json(
      { message: "User added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
