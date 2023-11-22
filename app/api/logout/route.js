import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const res = NextResponse.json(
      { status: "Logout successfully" },
      { status: 200 }
    );

    // res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
