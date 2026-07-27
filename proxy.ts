import { NextResponse } from "next/server";
import { jwtVerify, importSPKI } from "jose";

const publicKeyPromise = importSPKI(
  process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY!,
  "RS256",
);

// Route groups
const FREE_ROUTES = [/^\/$/, /^\/about/, /^\/policy/];
const PUBLIC_ONLY_ROUTES = [/^\/login/, /^\/register/];
const ADMIN_ROUTES = [/^\/member/];
const MEMBER_ROUTES = [/^\/admin/];

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  // 🧠 0. ONLY run on real page navigation (CRITICAL FIX)
  const accept = req.headers.get("accept") || "";
  if (!accept.includes("text/html")) {
    return NextResponse.next();
  }

  // 🧠 1. Skip Next internals explicitly
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 🟢 2. FREE ROUTES
  if (FREE_ROUTES.some((r) => r.test(pathname))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("accessToken")?.value;

  let isAuthenticated = false;
  let role: string | null = null;

  // 🔐 3. VERIFY TOKEN
  if (token) {
    try {
      const publicKey = await publicKeyPromise;
      const { payload } = await jwtVerify(token, publicKey);
      console.log("PAYLAOD", payload);
      isAuthenticated = true;
      role = payload.role as string;
    } catch (err) {
      // 💀 kill broken token (prevents loops)
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("accessToken");
      console.log("ERROR ON JWT VERIFY", err);
      return res;
    }
  }

  // 🚪 4. PUBLIC ONLY (login/register)
  if (PUBLIC_ONLY_ROUTES.some((r) => r.test(pathname))) {
    if (isAuthenticated && role) {
      const redirectPath =
        role === "member" ? "/member/dashboard" : "/admin/dashboard";

      // 🛑 prevent redirect loop
      if (pathname === redirectPath) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    return NextResponse.next();
  }

  // 🧑‍🏫 5. INSTRUCTOR ROUTES
  if (ADMIN_ROUTES.some((r) => r.test(pathname))) {
    if (!isAuthenticated || !role) {
      if (pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      return NextResponse.next();
    }

    if (role !== "INSTRUCTOR") {
      const redirectPath = "/member/dashboard";

      if (pathname === redirectPath) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    return NextResponse.next();
  }

  // 🎓 6. member ROUTES
  if (MEMBER_ROUTES.some((r) => r.test(pathname))) {
    if (!isAuthenticated || !role) {
      if (pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      return NextResponse.next();
    }

    if (role !== "member") {
      const redirectPath = "/admin/dashboard";

      if (pathname === redirectPath) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

// ✅ matcher (still needed)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
