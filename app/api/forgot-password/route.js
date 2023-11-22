import { sendMail } from "@/helpers/sendMail";
import { connectDb } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

connectDb();
export async function POST(req) {
  try {
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("No user found with this email");
    }
    await sendMail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json(
      { message: "Link sent to your emial inbox" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
