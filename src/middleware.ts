import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const rateLimitMap = new Map();

export async function middleware(request: NextRequest) {
  // Rate limiting
  const ip = request.ip ?? '127.0.0.1';
  const limit = parseInt(process.env.RATE_LIMIT_MAX || '100');
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW || '900000'); // 15 minutes
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 0, lastReset: Date.now() });
  }
  
  const clientData = rateLimitMap.get(ip);
  
  if (Date.now() - clientData.lastReset > windowMs) {
    clientData.count = 0;
    clientData.lastReset = Date.now();
  }
  
  if (clientData.count >= limit) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }
  
  clientData.count++;

  // Security headers
  const response = NextResponse.next();
  
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/api/user') ||
      request.nextUrl.pathname.startsWith('/api/properties')) {
    
    const token = await getToken({ req: request });
    
    if (!token) {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};