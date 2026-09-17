import { NextResponse } from "next/server";
import { verifySession } from "./lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return NextResponse.next();
  }

  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname === "/api/registros" || pathname.startsWith("/api/registros/");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;

  if (!token || !(await verifySession(token))) {
    if (isAdminApi) {
      return NextResponse.json(
        { message: "No autorizado." },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/registros/:path*"
  ]
};
