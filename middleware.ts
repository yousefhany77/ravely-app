// middleware.ts
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/plans",
};
export function middleware(request: NextRequest, event: NextFetchEvent) {
  const cookie = request.cookies.get("session")?.value;
  const test = check(cookie)
    .then((res) => {
      if (res !== 200) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_APP_DOMAIN}/login`
        );
      }
      return NextResponse.next();
    })
    .catch(() => NextResponse.next());
  return test.then((res) => res);
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
