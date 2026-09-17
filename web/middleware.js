import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


meow

meow2

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/api/auth/signin", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/todos"],
};
