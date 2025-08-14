import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
     const token = req.cookies.get('token')?.value;

     const pathname = req.nextUrl.pathname;

     const isProtected = pathname.startsWith('/hello') || pathname.startsWith('/admin') || pathname.startsWith('/dashboard');

     if(pathname === '/user/login' && token) {
          return NextResponse.redirect(new URL('/hello', req.url));
     }

     if(pathname === '/user/register' && token) {
          return NextResponse.redirect(new URL("/hello", req.url));
     }

     if(!token && isProtected) {
          return NextResponse.redirect(new URL('/user/login', req.url));
     }

     if(token && pathname === '/user/verify-otp') {
          return NextResponse.redirect(new URL("/user/dashboard", req.url));
     }

     return NextResponse.next();
}

export const config = {
  matcher: ['/user/login', '/hello/:path*', '/admin/:path*', '/user/register', '/user/dashboard', '/user/verify-otp'],
}