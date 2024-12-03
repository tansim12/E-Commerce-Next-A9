import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./Service/Auth/auth.service";

const AuthRoutes = ["/login", "/register"];
const roleBaseRoute = {
  user: [/^\/user/],
  admin: [/^\/admin/],
  vendor: [/^\/vendor/],
  common: [/^\/profile/], // common route for both users and admins
};

type TRole = keyof typeof roleBaseRoute;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fetch the current user
  const user = await getCurrentUser();

  // Check if user is not authenticated and request is for Auth routes
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    // Redirect to login if not authenticated
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // If the user is authenticated, check their role and allow access accordingly
  const userRole = user?.role as TRole;

  if (userRole && roleBaseRoute[userRole]) {
    const routes = roleBaseRoute[userRole];

    // Check if the requested route matches user/admin-specific or common routes
    if (
      routes.some((route) => route.test(pathname)) ||
      roleBaseRoute.common.some((route) => route.test(pathname)) // allow access to `/profile/:page*` for both
    ) {
      return NextResponse.next();
    }

    // Redirect to homepage if trying to access unauthorized routes
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Default case: if none of the conditions match, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/profile/:page*",
    "/user/:page*",
    "/admin/:page*",
    "/vendor/:page*",
    "/login",
    "/register",
  ],
};
