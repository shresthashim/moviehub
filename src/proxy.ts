import { clerkMiddleware } from "@clerk/nextjs/server";

// Next.js 16 renamed the `middleware` file convention to `proxy`.
export default clerkMiddleware();

export const config = {
  matcher: ["/favorites(.*)", "/api/user/fav(.*)"],
};
