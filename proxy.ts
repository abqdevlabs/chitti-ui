import { NextRequest, NextResponse } from "next/server";
import { importSPKI, jwtVerify } from "jose";
import { ROLE_ROUTES, type Role } from "@/routes";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const token = req.cookies.get("accessToken")?.value;

  // Not logged in
  if (!token) {
    if (isPublic) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const publicKey = await importSPKI(
      process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY!.replace(/\\n/g, "\n"),
      "RS256",
    );
    const { payload } = await jwtVerify<{ role?: unknown }>(token, publicKey);

    const role = payload.role;

    if (role !== "admin" && role !== "member") {
      throw new Error("Invalid role claim");
    }

    const userRole: Role = role;

    // Logged in users shouldn't visit login/register
    if (isPublic) {
      return NextResponse.redirect(new URL(ROLE_ROUTES[userRole], req.url));
    }

    if (pathname.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL(ROLE_ROUTES.member, req.url));
    }

    if (pathname.startsWith("/member") && userRole !== "member") {
      return NextResponse.redirect(new URL(ROLE_ROUTES.admin, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("accessToken");
    return response;
  }
}

export const config = {
  matcher: [
    "/",
    "/login/:path*",
    "/register/:path*",
    "/redirect",
    "/admin/:path*",
    "/member/:path*",
  ],
};
