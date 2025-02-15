import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_HOST } from "./lib/constants";

const protectedRoutes = [
  "/",
  "/monitors/",
  "/notifications/",
  "/status-pages/",
  "/settings/",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const headers = new Headers(request.headers);
  headers.set(
    "x-access-token",
    request.cookies.get("access_token")?.value || ""
  );
  let response = NextResponse.next({
    request: {
      headers: headers,
    },
  });

  if (protectedRoutes.includes(pathname)) {
    const refreshToken = request.cookies.get("refresh_token")?.value;
    const access_token = request.cookies.get("access_token")?.value;

    if (!refreshToken && !access_token) {
      return NextResponse.redirect(new URL("/auth/", request.url));
    }

    if (!access_token && refreshToken) {
      try {
        const res = await fetch(`${API_HOST}/api/auth/refresh-token`, {
          method: "POST",
          headers: {
            accept: "application/json",
            "refresh-token": refreshToken,
          },
        });
        if (res.ok) {
          const data = await res.json();
          response.cookies.set("access_token", data?.access_token);
          response.cookies.set("refresh_token", data?.refresh_token);
          response.headers.set("x-access-token", data?.access_token);
        }
      } catch (error) {
        return NextResponse.redirect(new URL("/auth/", request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
