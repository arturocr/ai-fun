import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Skip auth checks for public routes
  const publicPaths = [
    '/',
    '/api/location',
    '/api/weather',
    '/auth/login',
    '/auth/sign-up',
    '/auth/reset-password',
  ];

  if (publicPaths.some((path) => request.nextUrl.pathname === path)) {
    return NextResponse.next();
  }

  // For other routes, use the existing session management
  return await updateSession(request);
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  // Matcher defines which paths this middleware will run on
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
