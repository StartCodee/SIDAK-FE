import { NextRequest, NextResponse } from 'next/server';

// Define the routes you want to protect and the login route
const protectedRoutes = ['/admin'];
const authRoute = '/auth';

// Middleware function
export function middleware(req: NextRequest) {
	const token = req.cookies.get('token'); // Retrieve the token from cookies

	// If the user tries to access the /auth route while authenticated, redirect them away
	if (req.nextUrl.pathname.startsWith(authRoute) && token) {
		return NextResponse.redirect(new URL('/admin', req.url)); // Redirect to /admin or another default route
	}

	// Check if the requested URL is a protected route
	if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
		// If the token is missing, redirect to login page
		if (!token) {
			return NextResponse.redirect(new URL('/auth', req.url));
		}
	}

	// Allow the request to proceed if the token exists or if it's not a protected route
	return NextResponse.next();
}

// Specify the routes where this middleware should be applied
export const config = {
	matcher: ['/admin/:path*', '/auth'],
};
