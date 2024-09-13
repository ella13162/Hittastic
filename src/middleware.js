import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const username = request.cookies.get('username');

  if (!username && (pathname.startsWith('/protected') || pathname.startsWith('/search'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*', '/search/:path*'],
};