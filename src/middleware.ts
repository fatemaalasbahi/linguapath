import type { NextRequest } from "next/server";

import { auth } from "@/lib/auth/server";

const authMiddleware = auth.middleware({
  loginUrl: "/sign-in",
});

export default function middleware(request: NextRequest) {
  if (request.headers.has("Next-Action")) {
    return;
  }

  return authMiddleware(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/exam-goals/:path*", "/assessment/:path*", "/study-plan/:path*"],
};
