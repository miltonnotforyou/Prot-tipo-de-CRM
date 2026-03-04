import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')
  const isLoginPage = request.nextUrl.pathname === '/login'

  // If user is not authenticated and is not on the login page, redirect to login
  if (!authToken && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If user is authenticated and is on the login page, redirect to dashboard
  if (authToken && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Match all routes except api, _next/static, _next/image, and favicon.ico
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
