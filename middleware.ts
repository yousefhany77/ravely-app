import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let url = request.url;
  const session = request.headers.get("cookie")?.split("session=")[1];
  let hasToken = !!session
  if (hasToken && url.includes("/login")) {
    console.log("redirecting  to  /");
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (hasToken === false && !url.includes("/login")) {
    console.log("redirecting  to  /login");
    return NextResponse.redirect("http://localhost:3000/login");
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|plans|signup|success|cancel-subscription|_next/image|favicon.ico).*)"],
};
