import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export  function middleware(request: NextRequest) {
  let url = request.url;
  
  let hasToken = request.cookies.get("token")?.value;
  if (!hasToken && url.includes("/")) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|login|_next/static|_next/image|favicon.ico).*)"],
};
