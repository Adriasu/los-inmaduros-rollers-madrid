import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

const allowedOrigins = ['http://localhost:3000', 'https://los-inmaduros-rollers-madrid.vercel.app'];

// Public routes that don't require authentication
const publicRoutes = ['/sign-in(.*)', '/sign-up(.*)', '/', '/routesRoller(.*)', '/api/routes'];

function handleCORS(request) {
  const origin = request.headers.get('origin');
  const isAllowedOrigin = allowedOrigins.includes(origin);

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

export default clerkMiddleware((auth, request) => {
  const corsResponse = handleCORS(request);
  if (corsResponse.status === 204) {
    return corsResponse;
  }

  const path = request.nextUrl.pathname;
  if (!publicRoutes.some(route => path.match(new RegExp(`^${route}$`)))) {
    return auth().protect();
  }

  return corsResponse;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};