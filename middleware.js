import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  // const token = request.cookies.get("token")?.value;
  const tokenNextAuth = request.cookies.get("next-auth.session-token")?.value;
  const isPublicPath = path === "/" || path === "/register";

  if (isPublicPath && tokenNextAuth) {
    return NextResponse.rewrite(new URL("/movie", request.url));
  }
  if (!isPublicPath && !tokenNextAuth) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/movie", "/users"],
};
