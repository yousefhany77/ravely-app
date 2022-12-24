// middleware.ts
import { getAuth } from "firebase/auth";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { FirebaseApp } from "./firebase/firebase-init";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|plans|reauth|favicon.ico).*)",
  ],
};
export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("session")?.value;

  if (!cookie) {
    if (
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup") ||
      request.nextUrl.pathname.startsWith("/forgot-password") ||
      request.nextUrl.pathname.startsWith("/reauth") ||
      request.nextUrl.pathname === "/"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/login`);
  }

  if (cookie) {
    if (
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup") ||
      request.nextUrl.pathname.startsWith("/forgot-password") ||
      request.nextUrl.pathname === "/ffff"
    ) {
      console.log("redirecting to my space");
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_DOMAIN}/my-space`
      );
    }
    const test = check(cookie)
      .then((res) => {
        if (res === 401) {
          return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_DOMAIN}/reauth`
          );
        }

        return NextResponse.next();
      })
      .catch(() => NextResponse.next());
    return test.then((res) => res);
  }
}

const check = async (cookie: string | undefined) => {
  if (cookie) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/validate`,
      {
        method: "POST",
        body: cookie,
      }
    );

    return response.status;
  }
  return false;
};
